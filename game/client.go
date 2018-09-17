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

package game

import (
	"fmt"

	"github.com/master-g/gouno/proto/pb"
)

// Flag client status
type Flag uint32

const (
	// FlagPlaying indicates the client is playing
	FlagPlaying = 0x1
	// FlagOffline indicates the client is disconnected, shall be remove after the game is over
	FlagOffline = 0x2
	// FlagKicked indicates the client is safe to removed from game
	FlagKicked = 0x4
)

// Client holds client's uid and channels for communicate
type Client struct {
	// UID user unique ID
	UID uint64
	// In channel for receiving frames from session in agent
	In chan pb.Frame
	// Out channel for sending frames to session in agent
	Out chan pb.Frame
	// TID table ID, 0 for no table
	TID uint64
	// Die channel as signal to indicate game server to remove this client
	Die chan struct{}
	// client status flag
	flag Flag
}

// String interface
func (c *Client) String() string {
	return fmt.Sprintf("uid: %v, flag: %v", c.UID, c.flag)
}

// IsFlagPlayingSet returns true if the FlagPlaying is set
func (c Client) IsFlagPlayingSet() bool {
	return c.flag&FlagPlaying != 0
}

// ClearFlagPlaying clears the FlagPlaying bit
func (c *Client) ClearFlagPlaying() {
	c.flag &^= FlagPlaying
}

// SetFlagPlaying sets the FlagPlaying bit
func (c *Client) SetFlagPlaying() {
	c.flag |= FlagPlaying
}

// IsFlagOfflineSet returns true if the FlagOffline is set
func (c Client) IsFlagOfflineSet() bool {
	return c.flag&FlagOffline != 0
}

// ClearFlagOffline clears the FlagOffline bit
func (c *Client) ClearFlagOffline() {
	c.flag &^= FlagOffline
}

// SetFlagOffline sets the FlagOffline bit
func (c *Client) SetFlagOffline() {
	c.flag |= FlagOffline
}

// IsFlagKickedSet returns true if the FlagKicked is set
func (c Client) IsFlagKickedSet() bool {
	return c.flag&FlagKicked != 0
}

// ClearFlagKicked clears the FlagKicked bit
func (c *Client) ClearFlagKicked() {
	c.flag &^= FlagKicked
}

// SetFlagKicked sets the FlagKicked bit
func (c *Client) SetFlagKicked() {
	c.flag |= FlagKicked
}
