package app

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app/handler"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app/middleware"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/logger"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Application struct {
	Config *config.Config
	Router *gin.Engine
	DB     *gorm.DB
}

func InitApp(cfg *config.Config) (*Application, func(), error) {
	// Set Gin mode
	gin.SetMode(cfg.Server.Mode)

	// Initialize database
	db, err := initDatabase(cfg.Database)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to initialize database: %w", err)
	}

	// Create router
	router := gin.New()

	// Register middleware
	router.Use(
		gin.Recovery(),
		middleware.Logger(),
		middleware.CORS(),
		middleware.RequestID(),
	)

	// Register routes
	handler.RegisterRoutes(router, db, cfg)

	app := &Application{
		Config: cfg,
		Router: router,
		DB:     db,
	}

	// Cleanup function
	cleanup := func() {
		logger.Info("Cleaning up resources...")

		sqlDB, err := db.DB()
		if err == nil {
			if closeErr := sqlDB.Close(); closeErr != nil {
				logger.Warn("Failed to close database connection", zap.Error(closeErr))
			}
		}
	}

	return app, cleanup, nil
}

func initDatabase(cfg config.DatabaseConfig) (*gorm.DB, error) {
	// Ensure directory exists
	dir := filepath.Dir(cfg.Path)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return nil, fmt.Errorf("failed to create data directory: %w", err)
		}
	}

	// Open SQLite database
	db, err := gorm.Open(sqlite.Open(cfg.Path), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Test connection
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	if err := sqlDB.Ping(); err != nil {
		return nil, err
	}

	logger.Info("SQLite database connection successful", zap.String("path", cfg.Path))
	return db, nil
}

func (a *App) RegisterRoutes(router *gin.RouterGroup) {
    // 注册API路由
    router.POST("/api/v1/login", a.Login)
    router.POST("/api/v1/register", a.Register)
    router.GET("/api/v1/lessons", a.GetLessons)
    router.POST("/api/v1/chat", a.ChatWithAI)
    // ... 其他路由
}

// 添加Go方法到Wails绑定
func (a *App) Init() error {
    // 注册Wails方法
    wails.Register(a, "main")
    return nil
}
