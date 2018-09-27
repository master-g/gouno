package server

import (
	"fmt"
	"net"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/master-g/gouno/sessions"
	"github.com/master-g/gouno/signal"
	"github.com/rs/cors"
	"go.uber.org/zap"
)

var upgrader websocket.Upgrader

var (
	wg *sync.WaitGroup
)

func init() {
	wg = &sync.WaitGroup{}
}

// WaitSocketShutdown wait for all client connection to close
func WaitSocketShutdown() {
	wg.Wait()
}

// StartWS start accepting websocket connections
func StartWS() {
	if config == nil {
		log.Fatal("nil config")
		return
	}

	upgrader = websocket.Upgrader{
		ReadBufferSize:  config.SocketReadBufferSize,
		WriteBufferSize: config.SocketWriteBufferSize,
		CheckOrigin: func(r *http.Request) bool {
			return config.WSAllowOrigin
		},
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		createWSConnection(w, r)
	})

	handler := cors.Default().Handler(mux)

	log.Info("http server listening", zap.Int("port", config.HTTPPort))

	err := http.ListenAndServe(fmt.Sprintf(":%v", config.HTTPPort), handler)
	if err != nil {
		log.Error("error while listen and serve http", zap.Error(err))
		signal.RequestInterrupt()
		return
	}
}

func createWSConnection(w http.ResponseWriter, r *http.Request) {
	select {
	case <-signal.InterruptChan:
		log.Info("server is about to shutdown, connection rejected")
		return
	default:
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Info("ws upgrade failed", zap.Error(err))
		return
	}
	go handleWSConnection(conn)
}

func handleWSConnection(conn *websocket.Conn) {
	// close connection when all is done
	defer conn.Close()

	// agent's input channel
	in := make(chan []byte)
	defer func() {
		close(in)
	}()

	// create a new session object for this connection
	host, port, err := net.SplitHostPort(conn.RemoteAddr().String())
	if err != nil {
		log.Error("error while parsing remote address", zap.String("addr", conn.RemoteAddr().String()), zap.Error(err))
		return
	}

	sess := sessions.New(net.ParseIP(host), port, config.SocketRPMLimit)
	log.Info("new WS connection", zap.String("sess", sess.String()))

	// create sender and start send loop
	out := NewSender(sess.Die, config.SocketTxQueueLength, config.SocketSessionCacheSize, func(data []byte) (n int, err error) {
		// send via websocket binary message, ignore 2 bytes of size info
		err = conn.WriteMessage(websocket.BinaryMessage, data[2:])
		n = len(data)
		return
	})
	go out.SendLoop()

	// start agent for packet processing
	wg.Add(1)
	go agent(wg, sess, in, out)

	// close connection immediately
	if config.SocketGracefulTimeout != 0 {
		go func() {
			<-sess.Die
			time.Sleep(config.SocketGracefulTimeout)
			conn.Close()
		}()
	}

	// read loop
	for {
		conn.SetReadDeadline(time.Now().Add(config.SocketReadDeadLine))
		_, message, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Info("ws connection close unexpected", zap.Error(err))
			} else {
				log.Info("ws connection closed", zap.Error(err))
			}
			sess.SetFlagKicked()
		}
		select {
		case in <- message:
		case <-sess.Die:
			// wait for session close in agent
			log.Info("connection closed by logic, stop reading from client", zap.String("sess", sess.String()))
			return
		}
	}
}
