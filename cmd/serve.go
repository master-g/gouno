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

package cmd

import (
	"net/http"

	"github.com/lopnur/lnlog"
	"github.com/master-g/gouno/config"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var paramList = []config.Flag{
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

	if viper.GetBool("profile.on") {
		// profiling
		go http.ListenAndServe(viper.GetString("profile.addr"), nil)
	}
	log.Sugar().Warn(viper.AllSettings())

	log.Info("bye~")
}
