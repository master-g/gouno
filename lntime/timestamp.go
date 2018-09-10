package lntime

import "time"

// Timestamp returns current unix timestamp in milliseconds
func Timestamp() uint64 {
	return uint64(time.Now().UnixNano() / int64(time.Millisecond))
}
