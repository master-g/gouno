// Copyright © 2018 Project Lop Nur <project.lopnur@gmail.com>
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

package server

import (
	"encoding/binary"
	"errors"

	"go.uber.org/zap"
)

var (
	// ErrorSendEmptyPacket error while sending empty packet
	ErrorSendEmptyPacket = errors.New("sending invalid packet (nil)")
	// ErrorQueueFull error while tx queue is full
	ErrorQueueFull = errors.New("sending queue is full")
)

// ConnWriteFunc writes data to connection, for standard socket and web socket
type ConnWriteFunc func([]byte) (int, error)

// Sender send packets to the client
type Sender struct {
	ctrl    chan struct{} // exit signal
	pending chan []byte   // pending packets
	writer  ConnWriteFunc // connection writer function
	cache   []byte        // for combined syscall write
}

// NewSender create and returns a sender instance
func NewSender(ctrl chan struct{}, queueSize, sendCacheSize int, writer ConnWriteFunc) *Sender {
	return &Sender{
		ctrl:    ctrl,
		writer:  writer,
		pending: make(chan []byte, queueSize),
		cache:   make([]byte, sendCacheSize),
	}
}

// EnqueueOutgoing push data to the sender's pending channel
func (buf *Sender) EnqueueOutgoing(pkg []byte) error {
	if pkg == nil {
		return ErrorSendEmptyPacket
	}

	// queue the data for sending
	select {
	case buf.pending <- pkg:
	default:
		log.Warn("sending queue is full", zap.Error(ErrorQueueFull))
		return ErrorQueueFull
	}

	return nil
}

// actual send logic
func (buf *Sender) actualSend(data []byte) bool {
	// write packet size, uint16, (these 2 bytes are excluded)
	size := len(data)
	binary.BigEndian.PutUint16(buf.cache, uint16(size))
	copy(buf.cache[2:], data)

	// write data
	n, err := buf.writer(buf.cache[:size+2])
	if err != nil {
		log.Error("error while sending data", zap.Int("bytes", n), zap.Error(err))
		return false
	}

	return true
}

// SendLoop packets sending routine
func (buf *Sender) SendLoop() {
	for {
		select {
		case data := <-buf.pending: // dequeue data for sending
			buf.actualSend(data)
		case <-buf.ctrl: // control signal received
			// TODO
			// 1. how can we send last packet before close
			// 2. only send reason packet before close
			return
		}
	}
}
