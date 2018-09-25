package server

import "time"

// Config server options
type Config struct {
	// HTTPort number for HTTP to listen on
	HTTPPort int
	// SocketReadDeadLine duration
	SocketReadDeadLine time.Duration
	// SocketReadBufferSize in bytes
	SocketReadBufferSize int
	// SocketWriteBufferSize in bytes
	SocketWriteBufferSize int
	// SocketSessionCacheSize size of outgoing packet queue
	SocketSessionCacheSize int
	// SocketTxQueueLength size of incoming packet queue
	SocketTxQueueLength int
	// SocketRPMLimit request per minute limit
	SocketRPMLimit int
	// SocketGracefulTimeout seconds to wait for a connection close
	SocketGracefulTimeout time.Duration
	// AuthTimeout timeout duration before authentication
	AuthTimeout time.Duration
	// WSAllowOrigin allow origin
	WSAllowOrigin bool
	// WSWriteDeadLine websocket write timeout
	WSWriteDeadLine time.Duration
	// WSPongTimeout websocket pong timeout
	WSPongTimeout time.Duration
	// WSPingPeriod websocket ping interval
	WSPingPeriod time.Duration
}

var config *Config

// SetConfig setup server configuration
func SetConfig(cfg *Config) {
	config = cfg
}
