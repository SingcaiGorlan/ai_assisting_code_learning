package middleware

import (
	"time"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/logger"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// Logger middleware for logging HTTP requests
func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(start)
		status := c.Writer.Status()
		method := c.Request.Method
		clientIP := c.ClientIP()
		userAgent := c.Request.UserAgent()
		errors := c.Errors.ByType(gin.ErrorTypePrivate)

		logger.Info("HTTP Request",
			zap.Int("status", status),
			zap.String("method", method),
			zap.String("path", path),
			zap.String("query", query),
			zap.String("ip", clientIP),
			zap.String("user_agent", userAgent),
			zap.Duration("latency", latency),
			zap.Any("errors", errors),
		)
	}
}

// CORS middleware for cross-origin requests
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

// RequestID middleware for adding unique request IDs
func RequestID() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := c.GetHeader("X-Request-ID")
		if requestID == "" {
			requestID = generateRequestID()
		}
		c.Set("RequestID", requestID)
		c.Writer.Header().Set("X-Request-ID", requestID)
		c.Next()
	}
}

// Recovery middleware for panic recovery
func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				logger.Error("Panic recovered",
					zap.Any("error", err),
					zap.String("path", c.Request.URL.Path),
				)
				c.JSON(500, gin.H{
					"error": "Internal Server Error",
				})
				c.Abort()
			}
		}()
		c.Next()
	}
}

// RateLimiter middleware for rate limiting (simplified version)
func RateLimiter() gin.HandlerFunc {
	// TODO: Implement Redis-based rate limiting
	return func(c *gin.Context) {
		c.Next()
	}
}

func generateRequestID() string {
	// Simple request ID generation, use more complex algorithm in production
	return time.Now().Format("20060102150405") + "-" + randomString(6)
}

func randomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[time.Now().Nanosecond()%len(charset)]
	}
	return string(b)
}
