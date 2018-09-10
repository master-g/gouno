package api

import "github.com/master-g/gouno/router"

// Handlers holds all the handlers
var Handlers []*router.Handler

// addHandler adds handler to handler list, should be done by handler's init function
func addHandler(h *router.Handler) {
	Handlers = append(Handlers, h)
}
