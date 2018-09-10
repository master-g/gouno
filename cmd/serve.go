// Copyright © 2018 MG <mailtomasterg@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

package cmd

import (
	"net/http"
	"time"

	"github.com/lopnur/lnlog"
	"github.com/master-g/gouno/api"
	"github.com/master-g/gouno/config"
	"github.com/master-g/gouno/router"
	"github.com/master-g/gouno/server"
	"github.com/master-g/gouno/sessions"
	"github.com/master-g/gouno/signal"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var paramList = []config.Flag{
	{Name: "debug", Type: config.Bool, Shorthand: "", Value: false, Usage: "debug mode flag"},
	{Name: "profile.on", Type: config.Bool, Shorthand: "", Value: false, Usage: "profiling flag"},
	{Name: "profile.addr", Type: config.String, Shorthand: "", Value: "", Usage: "profiling address"},
	{Name: "ws.port", Type: config.Int, Shorthand: "", Value: 0, Usage: "http server port"},
	{Name: "ws.auth-timeout", Type: config.Int, Shorthand: "", Value: 30, Usage: "websocket auth timeout, in seconds"},
	{Name: "ws.read-timeout", Type: config.Int, Shorthand: "", Value: 180, Usage: "websocket read timeout, in seconds"},
	{Name: "ws.read-buffer-size", Type: config.Int, Shorthand: "", Value: 32768, Usage: "websocket read buffer size, in bytes"},
	{Name: "ws.write-buffer-size", Type: config.Int, Shorthand: "", Value: 32768, Usage: "websocket write buffer size, in bytes"},
	{Name: "ws.session-cache-size", Type: config.Int, Shorthand: "", Value: 32768, Usage: "send cache size per session, in bytes"},
	{Name: "ws.pending-queue-size", Type: config.Int, Shorthand: "", Value: 128, Usage: "pending packet queue size"},
	{Name: "ws.rpm-limit", Type: config.Int, Shorthand: "", Value: 60, Usage: "request per minute limit"},
	{Name: "ws.graceful-timeout", Type: config.Int, Shorthand: "", Value: 1, Usage: "graceful timeout before closing a connection, in seconds"},
	{Name: "ws.allow-origin", Type: config.Bool, Shorthand: "", Value: true, Usage: "allow origin"},
	{Name: "ws.write-timeout", Type: config.Int, Shorthand: "", Value: 10, Usage: "time allowed to write a message to the peer, in seconds"},
	{Name: "ws.pong-timeout", Type: config.Int, Shorthand: "", Value: 60, Usage: "time allowed to read the next pong message from the peer, in seconds"},
	{Name: "ws.ping-period", Type: config.Int, Shorthand: "", Value: 54, Usage: "send pings to peer with this period. Must be less than pong-timeout, in seconds"},
	{Name: "log.filename", Type: config.String, Shorthand: "", Value: "gouno.log", Usage: "Log output filename"},
	{Name: "log.max-size", Type: config.Int, Shorthand: "", Value: 32, Usage: "Maximum size for a log file, in megabytes"},
	{Name: "log.max-age", Type: config.Int, Shorthand: "", Value: 7, Usage: "Maximum number of days to retain rotated log files, in days"},
	{Name: "log.max-backups", Type: config.Int, Shorthand: "", Value: 3, Usage: "Maximum number of rotated log files to keep"},
	{Name: "log.localtime", Type: config.Bool, Shorthand: "", Value: true, Usage: "Use local time in rotated log filename, set false to use UTC time"},
	{Name: "log.compress", Type: config.Bool, Shorthand: "", Value: false, Usage: "Use gzip to compress rotated log file"},
}

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start gouno service",
	Long:  `Start gouno service`,
	Run: func(cmd *cobra.Command, args []string) {
		// start game service
		startService()
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// serveCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// bind flags with viper
	config.BindFlags(serveCmd, paramList)
}

func startService() {
	if viper.GetBool("debug") {
		lnlog.InitLogSystem(nil)
	} else {
		lnlog.InitLogSystem(&lnlog.Config{
			Filename:   viper.GetString("log.filename"),
			MaxSize:    viper.GetInt("log.max-size"),
			MaxAge:     viper.GetInt("log.max-age"),
			MaxBackups: viper.GetInt("log.max-backups"),
			LocalTime:  viper.GetBool("log.localtime"),
			Compress:   viper.GetBool("log.compress"),
		})
	}

	log := lnlog.NewLogger("MAIN")
	defer log.Sync()
	api.UseLogger(lnlog.NewLogger("API"))
	router.UseLogger(lnlog.NewLogger("ROUTER"))
	server.UseLogger(lnlog.NewLogger("SERVER"))
	sessions.UseLogger(lnlog.NewLogger("SESSIONS"))

	if viper.GetBool("profile.on") {
		// profiling
		go http.ListenAndServe(viper.GetString("profile.addr"), nil)
	}
	log.Sugar().Warn(viper.AllSettings())

	// init server config
	server.InitConfig(&server.Config{
		HTTPPort:               viper.GetInt("ws.port"),
		SocketReadDeadLine:     time.Duration(viper.GetInt("ws.read-timeout")) * time.Second,
		SocketReadBufferSize:   viper.GetInt("ws.read-buffer-size"),
		SocketWriteBufferSize:  viper.GetInt("ws.write-buffer-size"),
		SocketSessionCacheSize: viper.GetInt("ws.session-cache-size"),
		SocketTxQueueLength:    viper.GetInt("ws.pending-queue-size"),
		SocketRPMLimit:         viper.GetInt("ws.rpm-limit"),
		SocketGracefulTimeout:  time.Duration(viper.GetInt("ws.graceful-timeout")) * time.Second,
		AuthTimeout:            time.Duration(viper.GetInt("ws.auth-timeout")) * time.Second,
		WSAllowOrigin:          viper.GetBool("ws.allow-origin"),
		WSWriteDeadLine:        time.Duration(viper.GetInt("ws.write-timeout")) * time.Second,
		WSPongTimeout:          time.Duration(viper.GetInt("ws.pong-timeout")) * time.Second,
		WSPingPeriod:           time.Duration(viper.GetInt("ws.ping-period")) * time.Second,
	})

	// start ws server
	go server.StartWS()

	// capture system signal
	go signal.Start()

	// wait for exit
	<-signal.InterruptChan

	// wait for server to shutdown
	server.WaitSocketShutdown()

	log.Info("bye~")
}
