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

	// TODO: Implement user registration logic
	c.JSON(http.StatusOK, gin.H{
		"message": "Registration successful",
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

	// TODO: Implement login logic and generate JWT token
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   "example-jwt-token",
	})
}

func GetProfile(c *gin.Context) {
	// Get user information from context
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
				"title":       "Go Basic Syntax",
				"description": "Learn basic Go language syntax",
				"level":       "beginner",
			},
			{
				"id":          2,
				"title":       "Gin Framework Introduction",
				"description": "Learn to build web applications using Gin framework",
				"level":       "intermediate",
			},
		},
	})
}

func GetLesson(c *gin.Context) {
	lessonID := c.Param("id")

	c.JSON(http.StatusOK, gin.H{
		"id":          lessonID,
		"title":       "Go Basic Syntax",
		"content":     "Course content...",
		"exercises":   []string{"Exercise 1", "Exercise 2"},
	})
}

func CompleteLesson(c *gin.Context) {
	lessonID := c.Param("id")
	userID := c.GetString("user_id")

	c.JSON(http.StatusOK, gin.H{
		"message":    "Lesson completed",
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

	// TODO: Call AI API
	c.JSON(http.StatusOK, gin.H{
		"response": "AI response content",
	})
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// TODO: Validate JWT token
		c.Set("user_id", "demo-user-id")
		c.Next()
	}
}
