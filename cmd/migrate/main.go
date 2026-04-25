package main

import (
	"fmt"
	"log"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	// 导入模型包（待创建）
	// "github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/domain/model"
)

func main() {
	cfg := config.Load()

	// 初始化数据库连接
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		cfg.Database.Host, cfg.Database.Username, cfg.Database.Password,
		cfg.Database.Database, cfg.Database.Port, cfg.Database.SSLMode)
	_, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	// 调试：打印配置值
	fmt.Printf("Database Config:\n")
	fmt.Printf("  Host: %s\n", cfg.Database.Host)
	fmt.Printf("  Port: %d\n", cfg.Database.Port)
	fmt.Printf("  Username: %s\n", cfg.Database.Username)
	fmt.Printf("  Password: %s\n", cfg.Database.Password)
	fmt.Printf("  Database: %s\n", cfg.Database.Database)
	fmt.Printf("  SSLMode: %s\n", cfg.Database.SSLMode)

	log.Println("数据库连接成功")

	// TODO: 实现自动迁移
	// 取消注释以下代码，并导入模型包后执行迁移
	// if err := db.AutoMigrate(
	// 	&model.User{},
	// 	&model.UserProfile{},
	// 	&model.Subject{},
	// 	&model.KnowledgePoint{},
	// 	&model.ChatRecord{},
	// 	&model.LearningProgress{},
	// 	&model.Exercise{},
	// ); err != nil {
	// 	log.Fatalf("数据库迁移失败: %v", err)
	// }

	log.Println("迁移完成")
}
