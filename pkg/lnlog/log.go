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

package lnlog

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

var (
	globalLogger *zap.Logger
	NopLogger    *zap.Logger
)

func init() {
	NopLogger = zap.NewNop()
}

// Config for log system
type Config struct {
	// Filename is the file to write logs to
	Filename string
	// MaxSize is the maximum size in megabytes for a single log file
	MaxSize int
	// MaxAge is the maximum number of days to retain old log files
	MaxAge int
	// MaxBackups is the maximum number of log files to retain
	MaxBackups int
	// LocalTime determines if the time used for formatting timestamp of the backup files
	LocalTime bool
	// Compress determines if the rotated log files should be compress using gzip
	Compress bool
}

// InitLogSystem with configuration
func InitLogSystem(cfg *Config) (logger *zap.Logger, level zap.AtomicLevel) {
	level = zap.NewAtomicLevel()
	if cfg == nil {
		core := zapcore.NewCore(
			zapcore.NewConsoleEncoder(zap.NewDevelopmentEncoderConfig()),
			zapcore.AddSync(os.Stdout),
			level,
		)
		logger = zap.New(core)
	} else {
		w := zapcore.AddSync(&lumberjack.Logger{
			Filename:   cfg.Filename,
			MaxSize:    cfg.MaxSize,
			MaxAge:     cfg.MaxAge,
			MaxBackups: cfg.MaxBackups,
			LocalTime:  cfg.LocalTime,
			Compress:   cfg.Compress,
		})
		core := zapcore.NewCore(
			zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig()),
			w,
			level,
		)
		logger = zap.New(core)
	}
	globalLogger = logger

	return
}

// NewLogger returns sub logger with name
func NewLogger(tag string) (logger *zap.Logger) {
	if globalLogger == nil {
		return NopLogger
	} else {
		return globalLogger.Named(tag)
	}
}
