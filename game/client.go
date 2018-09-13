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
	// FlagWait indicates the client is waiting for a table
	FlagWait = 0x1
	// FlagOffline indicates the client is disconnected, shall be remove after the game is over
	FlagOffline = 0x2
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
	// client status flag
	flag Flag
}

// String interface
func (c *Client) String() string {
	return fmt.Sprintf("uid: %v, flag: %v", c.UID, c.flag)
}

// IsFlagWaitSet returns true if the FlagWait is set
func (c Client) IsFlagWaitSet() bool {
	return c.flag&FlagWait != 0
}

// ClearFlagWait clears the FlagWait bit
func (c *Client) ClearFlagWait() {
	c.flag &^= FlagWait
}

// SetFlagWait sets the FlagWait bit
func (c *Client) SetFlagWait() {
	c.flag |= FlagWait
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
