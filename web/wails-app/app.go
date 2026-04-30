package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	fmt.Println("AI 辅助代码学习平台启动中...")
}

// GetAppVersion returns the application version
func (a *App) GetAppVersion() string {
	return "1.0.0"
}

// Login handles user login
func (a *App) Login(username, password string) map[string]interface{} {
	// TODO: 集成实际的登录逻辑
	if username == "" || password == "" {
		return map[string]interface{}{
			"success": false,
			"message": "用户名和密码不能为空",
		}
	}

	// 模拟登录成功
	return map[string]interface{}{
		"success": true,
		"message": "登录成功",
		"token":   "mock-jwt-token",
		"user": map[string]interface{}{
			"id":       1,
			"username": username,
			"email":    fmt.Sprintf("%s@example.com", username),
		},
	}
}

// Register handles user registration
func (a *App) Register(username, email, password string) map[string]interface{} {
	// TODO: 集成实际的注册逻辑
	if username == "" || email == "" || password == "" {
		return map[string]interface{}{
			"success": false,
			"message": "所有字段都不能为空",
		}
	}

	return map[string]interface{}{
		"success": true,
		"message": "注册成功",
	}
}

// GetLessons returns the list of lessons
func (a *App) GetLessons() []map[string]interface{} {
	return []map[string]interface{}{
		{
			"id":          1,
			"title":       "Go 语言基础",
			"description": "学习 Go 语言的基本语法和特性",
			"level":       "beginner",
			"progress":    75,
		},
		{
			"id":          2,
			"title":       "Web 开发实战",
			"description": "使用 Gin 框架构建 RESTful API",
			"level":       "intermediate",
			"progress":    40,
		},
		{
			"id":          3,
			"title":       "数据库设计",
			"description": "PostgreSQL 数据库设计与优化",
			"level":       "advanced",
			"progress":    0,
		},
	}
}

// GetLessonDetail returns lesson detail by ID
func (a *App) GetLessonDetail(id int) map[string]interface{} {
	lessons := a.GetLessons()
	for _, lesson := range lessons {
		if lessonID, ok := lesson["id"].(int); ok && lessonID == id {
			return map[string]interface{}{
				"id":          lesson["id"],
				"title":       lesson["title"],
				"description": lesson["description"],
				"level":       lesson["level"],
				"progress":    lesson["progress"],
				"content":     "这是课程详细内容...",
				"exercises":   []string{"练习 1", "练习 2", "练习 3"},
			}
		}
	}
	return map[string]interface{}{"error": "Lesson not found"}
}

// CompleteLesson marks a lesson as completed
func (a *App) CompleteLesson(id int) map[string]interface{} {
	return map[string]interface{}{
		"success":   true,
		"message":   "课程已完成",
		"lesson_id": id,
	}
}

// ChatWithAI handles AI chat requests
func (a *App) ChatWithAI(message string) map[string]interface{} {
	// TODO: 集成实际的 AI 对话功能
	if message == "" {
		return map[string]interface{}{
			"success": false,
			"message": "消息不能为空",
		}
	}

	// 模拟 AI 回复
	response := fmt.Sprintf("收到你的问题: %s\n\n这是一个模拟的 AI 回复。在实际应用中,这里会调用真实的 AI API。", message)

	return map[string]interface{}{
		"success": true,
		"reply":   response,
	}
}

// CodeAssist provides code assistance
func (a *App) CodeAssist(code, question string) map[string]interface{} {
	// TODO: 集成实际的代码辅助功能
	return map[string]interface{}{
		"success": true,
		"suggestion": fmt.Sprintf("关于你的代码:\n%s\n\n建议: %s", code, question),
	}
}

// OpenExternalLink opens a URL in the default browser
func (a *App) OpenExternalLink(url string) error {
	runtime.BrowserOpenURL(a.ctx, url)
	return nil
}
