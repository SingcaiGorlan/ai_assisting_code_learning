package app

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/your-org/ai-learning-platform/internal/app/handler"
	"github.com/your-org/ai-learning-platform/internal/app/middleware"
	"github.com/your-org/ai-learning-platform/internal/pkg/config"
	"github.com/your-org/ai-learning-platform/internal/pkg/logger"
	"github.com/go-redis/redis/v8"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Application struct {
	Config *config.Config
	Router *gin.Engine
	DB     *gorm.DB
	Redis  *redis.Client
	// 其他依赖...
}

func InitApp(cfg *config.Config) (*Application, func(), error) {
	// 设置Gin模式
	gin.SetMode(cfg.Server.Mode)
	
	// 初始化数据库
	db, err := initDatabase(cfg.Database)
	if err != nil {
		return nil, nil, fmt.Errorf("初始化数据库失败: %w", err)
	}
	
	// 初始化Redis
	redisClient := initRedis(cfg.Redis)
	
	// 创建路由器
	router := gin.New()
	
	// 注册中间件
	router.Use(
		gin.Recovery(),
		middleware.Logger(),
		middleware.CORS(),
		middleware.RequestID(),
	)
	
	// 注册路由
	handler.RegisterRoutes(router, db, redisClient, cfg)
	
	app := &Application{
		Config: cfg,
		Router: router,
		DB:     db,
		Redis:  redisClient,
	}
	
	// 清理函数
	cleanup := func() {
		logger.Info("清理资源...")
		
		sqlDB, err := db.DB()
		if err == nil {
			sqlDB.Close()
		}
		
		if redisClient != nil {
			redisClient.Close()
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
	
	// 测试连接
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	
	if err := sqlDB.Ping(); err != nil {
		return nil, err
	}
	
	logger.Info("数据库连接成功")
	return db, nil
}

func initRedis(cfg config.RedisConfig) *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
		Password: cfg.Password,
		DB:       cfg.DB,
	})
	
	// 测试连接
	ctx := context.Background()
	if err := client.Ping(ctx).Err(); err != nil {
		log.Printf("Redis连接失败: %v", err)
		return nil
	}
	
	logger.Info("Redis连接成功")
	return client
}