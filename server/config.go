package server

import "time"

// Config server options
type Config struct {
	SocketPort             int
	SocketReadDeadLine     time.Duration
	SocketReadBufferSize   int
	SocketWriteBufferSize  int
	SocketSessionCacheSize int
	SocketTxQueueLength    int
	SocketRPMLimit         int
	SocketGracefulTimeout  time.Duration
	AuthTimeout            time.Duration
	ClientInitSeq          uint64
	WSPort                 int
	WSAllowOrigin          bool
	WSWriteDeadLine        time.Duration
	WSPongTimeout          time.Duration
	WSPingPeriod           time.Duration
}

var config *Config

// InitConfig setup server configuration
func InitConfig(cfg *Config) {
	config = cfg
}
