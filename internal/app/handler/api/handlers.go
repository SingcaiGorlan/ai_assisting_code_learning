package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var req struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: 实现用户注册逻辑
	c.JSON(http.StatusOK, gin.H{
		"message": "注册成功",
		"user": gin.H{
			"username": req.Username,
			"email":    req.Email,
		},
	})
}

func Login(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: 实现登录逻辑，生成 JWT token
	c.JSON(http.StatusOK, gin.H{
		"message": "登录成功",
		"token":   "example-jwt-token",
	})
}

func GetProfile(c *gin.Context) {
	// 从上下文中获取用户信息
	userID := c.GetString("user_id")

	c.JSON(http.StatusOK, gin.H{
		"user_id":  userID,
		"username": "demo-user",
		"email":    "demo@example.com",
	})
}

func GetLessons(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"lessons": []gin.H{
			{
				"id":          1,
				"title":       "Go 基础语法",
				"description": "学习 Go 语言的基本语法",
				"level":       "beginner",
			},
			{
				"id":          2,
				"title":       "Gin 框架入门",
				"description": "学习使用 Gin 框架构建 Web 应用",
				"level":       "intermediate",
			},
		},
	})
}

func GetLesson(c *gin.Context) {
	lessonID := c.Param("id")

	c.JSON(http.StatusOK, gin.H{
		"id":          lessonID,
		"title":       "Go 基础语法",
		"content":     "课程内容...",
		"exercises":   []string{"练习1", "练习2"},
	})
}

func CompleteLesson(c *gin.Context) {
	lessonID := c.Param("id")
	userID := c.GetString("user_id")

	c.JSON(http.StatusOK, gin.H{
		"message":    "课程已完成",
		"lesson_id":  lessonID,
		"user_id":    userID,
		"completed":  true,
	})
}

func AIChat(c *gin.Context) {
	var req struct {
		Message string `json:"message" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: 调用 AI API
	c.JSON(http.StatusOK, gin.H{
		"response": "AI 响应内容",
	})
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "未授权"})
			c.Abort()
			return
		}

		// TODO: 验证 JWT token
		c.Set("user_id", "demo-user-id")
		c.Next()
	}
}
