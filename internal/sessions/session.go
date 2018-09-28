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

package sessions

import (
	"crypto/rc4"
	"fmt"
	"net"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/master-g/gouno/api/pb"
	"github.com/master-g/gouno/internal/game"
	"github.com/master-g/gouno/pkg/lntime"
	"go.uber.org/zap"
)

// Flag holds session status flag bits
type Flag int32

const (
	// FlagKeyExchanged indicates the key exchange process has completed
	FlagKeyExchanged = 0x1
	// FlagEncrypted indicates the transmission of this session is encrypted
	FlagEncrypted = 0x2
	// FlagKicked indicates the client has been kicked out
	FlagKicked = 0x4
	// FlagAuth indicates the session has been authorized
	FlagAuth = 0x8
)

// Session holds the context of a client having conversation with agent
type Session struct {
	UID               uint64        // User id
	LastLogin         uint64        // Timestamp of last time login
	Token             string        // Session token generate at http login
	Die               chan struct{} // Session close signal, trigger by agent()
	flag              Flag          // Session flag
	IP                net.IP        // Client IP address
	Port              string        // Client Port
	Client            *game.Client  // Client in game server
	Encoder           *rc4.Cipher   // Encrypt
	Decoder           *rc4.Cipher   // Decrypt
	ClientSeq         uint64        // incoming packet sequence
	ServerSeq         uint64        // outgoing sequence
	Push              chan []byte   // Push channel for internal communication
	MQ                chan pb.Frame // MQ queue for packets from game
	ConnectTime       time.Time     // Timestamp of TCP connection established
	LastPacketTime    time.Time     // Timestamp of last packet arrived
	PacketCount       int           // Total packets received
	PacketCountPerMin int           // Packets received per minute
	RPMLimit          int           // Request per minute limit
}

// New returns a new session instance
func New(ip net.IP, port string, rpmLimit int) *Session {
	s := &Session{
		IP:       ip,
		Port:     port,
		Die:      make(chan struct{}),
		RPMLimit: rpmLimit,
	}

	return s
}

// Flag return session's flag
func (s *Session) Flag() Flag {
	return s.flag
}

// SetFlagKeyExchanged sets the key exchanged bit
func (s *Session) SetFlagKeyExchanged() *Session {
	s.flag |= FlagKeyExchanged
	return s
}

// ClearFlagKeyExchanged clears the key exchanged bit
func (s *Session) ClearFlagKeyExchanged() *Session {
	s.flag &^= FlagKeyExchanged
	return s
}

// IsFlagKeyExchangedSet return true if the key exchanged bit is set
func (s *Session) IsFlagKeyExchangedSet() bool {
	return s.flag&FlagKeyExchanged != 0
}

// SetFlagEncrypted sets the encrypted bit
func (s *Session) SetFlagEncrypted() *Session {
	s.flag |= FlagEncrypted
	return s
}

// ClearFlagEncrypted clears the encrypted bit
func (s *Session) ClearFlagEncrypted() *Session {
	s.flag &^= FlagEncrypted
	return s
}

// IsFlagEncryptedSet returns true if the encrypted bit is set
func (s *Session) IsFlagEncryptedSet() bool {
	return s.flag&FlagEncrypted != 0
}

// SetFlagKicked sets the kicked bit
func (s *Session) SetFlagKicked() *Session {
	s.flag |= FlagKicked
	return s
}

// ClearFlagKicked clears the kicked bit
func (s *Session) ClearFlagKicked() *Session {
	s.flag &^= FlagKicked
	return s
}

// IsFlagKickedSet returns true if the kicked bit is set
func (s *Session) IsFlagKickedSet() bool {
	return s.flag&FlagKicked != 0
}

// SetFlagAuth sets the auth bit
func (s *Session) SetFlagAuth() *Session {
	s.flag |= FlagAuth
	return s
}

// ClearFlagAuth clears the auth bit
func (s *Session) ClearFlagAuth() *Session {
	s.flag &^= FlagAuth
	return s
}

// IsFlagAuthSet returns true if the auth bit is set
func (s *Session) IsFlagAuthSet() bool {
	return s.flag&FlagAuth != 0
}

// NextSeq return next packet sequence number
func (s *Session) NextSeq() uint64 {
	s.ServerSeq++
	return s.ServerSeq
}

// CheckRPMLimitViolation returns true if session violates RPM limitation
func (s *Session) CheckRPMLimitViolation() bool {
	if s.PacketCountPerMin > s.RPMLimit {
		log.Info("RPM violation",
			zap.String("sess", s.String()),
			zap.Int("limit", s.RPMLimit),
			zap.Int("rate", s.PacketCountPerMin),
			zap.Int("total", s.PacketCount))
		return true
	}
	return false
}

// String interface
func (s *Session) String() string {
	return fmt.Sprintf("uid:%v, addr:%v:%v, flag:%v, token:%v, seq:%v(c), %v(s)", s.UID, s.IP.String(), s.Port, s.flag, s.Token, s.ClientSeq, s.ServerSeq)
}

// FetchLoop fetches streams from game service
func (s *Session) FetchLoop() {
	for {
		select {
		case frame := <-s.Client.Out:
			s.MQ <- frame
		case <-s.Die:
			log.Info("connection closed by logic, stop streaming", zap.String("sess", s.String()))
			return
		}
	}
}

// marshalHeader assemble response message into a S2CHeader and return its marshaled data
func (s *Session) marshalHeader(header *pb.S2CHeader, body []byte) (data []byte, err error) {
	header.Seq = s.NextSeq()
	header.Timestamp = lntime.Timestamp()
	header.Body = body

	data, err = proto.Marshal(header)
	if err != nil {
		log.Error("error while marshaling message error", zap.Error(err))
	}

	return
}

// ErrorResponse create a S2CHeader and fill with error information, then return its marshaled data
func (s *Session) ErrorResponse(cmd int32, status int32, msg string) []byte {
	header := &pb.S2CHeader{
		Cmd:    cmd,
		Status: status,
		Msg:    msg,
	}
	data, _ := s.marshalHeader(header, nil)
	return data
}

// Response create a S2CHeader and fill with response cmd and body
func (s *Session) Response(cmd int32, body []byte) []byte {
	header := &pb.S2CHeader{
		Cmd:    cmd,
		Status: int32(pb.StatusCode_STATUS_OK),
	}
	data, _ := s.marshalHeader(header, body)
	return data
}
