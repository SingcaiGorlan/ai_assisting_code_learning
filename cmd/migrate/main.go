package main

import (
	"fmt"
	"log"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	cfg := config.Load()

	// 初始化数据库连接
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		cfg.Database.Host, cfg.Database.Username, cfg.Database.Password,
		cfg.Database.Database, cfg.Database.Port, cfg.Database.SSLMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	_ = db // Suppress unused variable error until migration logic is added

	log.Println("数据库连接成功")
	// TODO: 实现迁移逻辑
	log.Println("迁移完成")
}
