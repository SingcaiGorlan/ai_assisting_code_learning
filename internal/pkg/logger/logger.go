package logger

import (
	"os"

	"github.com/your-org/ai-learning-platform/internal/pkg/config"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gorm.io/gorm/logger"
)

var log *zap.Logger

func Init(cfg config.LogConfig) {
	var zapLevel zapcore.Level
	switch cfg.Level {
	case "debug":
		zapLevel = zapcore.DebugLevel
	case "info":
		zapLevel = zapcore.InfoLevel
	case "warn":
		zapLevel = zapcore.WarnLevel
	case "error":
		zapLevel = zapcore.ErrorLevel
	default:
		zapLevel = zapcore.InfoLevel
	}

	encoderConfig := zapcore.EncoderConfig{
		TimeKey:        "time",
		LevelKey:       "level",
		NameKey:        "logger",
		CallerKey:      "caller",
		MessageKey:     "msg",
		StacktraceKey:  "stacktrace",
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeLevel:    zapcore.LowercaseLevelEncoder,
		EncodeTime:     zapcore.ISO8601TimeEncoder,
		EncodeDuration: zapcore.SecondsDurationEncoder,
		EncodeCaller:   zapcore.ShortCallerEncoder,
	}

	var encoder zapcore.Encoder
	if cfg.Format == "json" {
		encoder = zapcore.NewJSONEncoder(encoderConfig)
	} else {
		encoder = zapcore.NewConsoleEncoder(encoderConfig)
	}

	// 输出到控制台和文件
	var cores []zapcore.Core
	consoleCore := zapcore.NewCore(encoder, zapcore.AddSync(os.Stdout), zapLevel)
	cores = append(cores, consoleCore)

	if cfg.FilePath != "" {
		file, err := os.OpenFile(cfg.FilePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err == nil {
			fileCore := zapcore.NewCore(encoder, zapcore.AddSync(file), zapLevel)
			cores = append(cores, fileCore)
		}
	}

	core := zapcore.NewTee(cores...)
	log = zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
}

func Info(msg string, fields ...zap.Field) {
	if log != nil {
		log.Info(msg, fields...)
	} else {
		zap.L().Info(msg, fields...)
	}
}

func Error(msg string, fields ...zap.Field) {
	if log != nil {
		log.Error(msg, fields...)
	} else {
		zap.L().Error(msg, fields...)
	}
}

func Debug(msg string, fields ...zap.Field) {
	if log != nil {
		log.Debug(msg, fields...)
	} else {
		zap.L().Debug(msg, fields...)
	}
}

func Warn(msg string, fields ...zap.Field) {
	if log != nil {
		log.Warn(msg, fields...)
	} else {
		zap.L().Warn(msg, fields...)
	}
}

func Fatal(msg string, fields ...zap.Field) {
	if log != nil {
		log.Fatal(msg, fields...)
	} else {
		zap.L().Fatal(msg, fields...)
	}
}

// GormLogger 返回 GORM 的日志适配器
func NewGormLogger() logger.Interface {
	return logger.Default.LogMode(logger.Info)
}
