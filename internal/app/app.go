package app

import (
	"context"
	"fmt"
	"log"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app/handler"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app/middleware"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/logger"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Application struct {
	Config *config.Config
	Router *gin.Engine
	DB     *gorm.DB
	Redis  *redis.Client
	// Other dependencies...
}

func InitApp(cfg *config.Config) (*Application, func(), error) {
	// Set Gin mode
	gin.SetMode(cfg.Server.Mode)

	// Initialize database
	db, err := initDatabase(cfg.Database)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to initialize database: %w", err)
	}

	// Initialize Redis
	redisClient := initRedis(cfg.Redis)

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
	handler.RegisterRoutes(router, db, redisClient, cfg)

	app := &Application{
		Config: cfg,
		Router: router,
		DB:     db,
		Redis:  redisClient,
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

		if redisClient != nil {
			if closeErr := redisClient.Close(); closeErr != nil {
				logger.Warn("Failed to close Redis connection", zap.Error(closeErr))
			}
		}
	}

	return app, cleanup, nil
}

func initDatabase(cfg config.DatabaseConfig) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		cfg.Host, cfg.Username, cfg.Password, cfg.Database, cfg.Port, cfg.SSLMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.NewGormLogger(),
	})
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

	logger.Info("Database connection successful")
	return db, nil
}

func initRedis(cfg config.RedisConfig) *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
		Password: cfg.Password,
		DB:       cfg.DB,
	})

	// Test connection
	ctx := context.Background()
	if err := client.Ping(ctx).Err(); err != nil {
		log.Printf("Redis connection failed: %v", err)
		return nil
	}

	logger.Info("Redis connection successful")
	return client
}
