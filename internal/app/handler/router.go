package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/your-org/ai-learning-platform/internal/app/handler/api"
	"github.com/your-org/ai-learning-platform/internal/pkg/config"
	"gorm.io/gorm"
)

func RegisterRoutes(router *gin.Engine, db *gorm.DB, redisClient interface{}, cfg *config.Config) {
	// 健康检查
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
			"service": "ai-learning-platform",
		})
	})

	// API v1 路由组
	v1 := router.Group("/api/v1")
	{
		// 用户相关路由
		users := v1.Group("/users")
		{
			users.POST("/register", api.Register)
			users.POST("/login", api.Login)
			users.GET("/profile", api.AuthMiddleware(), api.GetProfile)
		}

		// 学习相关路由
		learning := v1.Group("/learning")
		learning.Use(api.AuthMiddleware())
		{
			learning.GET("/lessons", api.GetLessons)
			learning.GET("/lessons/:id", api.GetLesson)
			learning.POST("/lessons/:id/complete", api.CompleteLesson)
		}

		// AI 辅助路由
		ai := v1.Group("/ai")
		ai.Use(api.AuthMiddleware())
		{
			ai.POST("/chat", api.AIChat)
			ai.POST("/code-assist", ai.CodeAssist)
		}
	}
}
