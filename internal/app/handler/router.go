package handler

import (
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app/handler/api"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(router *gin.Engine, db *gorm.DB, cfg *config.Config) {
	// Legacy static assets (optional)
	router.Static("/static", "./web/public")
	// Docs (VitePress build output)
	router.Static("/docs", "./web/docs/.vitepress/dist")
	// Vite app assets
	router.Static("/assets", "./web/app/dist/assets")

	// Main web app at root
	router.StaticFile("/", "./web/app/dist/index.html")

	// Fallback for unknown routes -> main app (SPA friendly)
	router.NoRoute(func(c *gin.Context) {
		c.File("./web/app/dist/index.html")
	})


	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "ai-learning-platform",
		})
	})

	// API v1 route group
	v1 := router.Group("/api/v1")
	{
		// User-related routes
		users := v1.Group("/users")
		{
			users.POST("/register", api.Register)
			users.POST("/login", api.Login)
			users.GET("/profile", api.AuthMiddleware(), api.GetProfile)
		}

		// Learning-related routes
		learning := v1.Group("/learning")
		learning.Use(api.AuthMiddleware())
		{
			learning.GET("/lessons", api.GetLessons)
			learning.GET("/lessons/:id", api.GetLesson)
			learning.POST("/lessons/:id/complete", api.CompleteLesson)
		}

		// AI assistance routes
		ai := v1.Group("/ai")
		ai.Use(api.AuthMiddleware())
		{
			ai.POST("/chat", api.AIChat)
			ai.POST("/code-assist", api.CodeAssist)
		}
	}
}
