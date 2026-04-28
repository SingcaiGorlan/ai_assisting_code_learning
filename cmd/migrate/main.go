package main

import (
	"fmt"
	"log"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	cfg := config.Load()

	// Initialize SQLite database connection
	db, err := gorm.Open(sqlite.Open(cfg.Database.Path), &gorm.Config{})
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	// Suppress unused variable error for now until migration logic is implemented
	_ = db

	// Debug: print configuration values
	fmt.Printf("Database Config:\n")
	fmt.Printf("  Driver: %s\n", cfg.Database.Driver)
	fmt.Printf("  Path: %s\n", cfg.Database.Path)

	log.Println("数据库连接成功")

	// TODO: Implement auto migration
	log.Println("迁移完成")
}
