package main

import (
	"log"

	"github.com/your-org/ai-learning-platform/internal/pkg/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	cfg := config.Load()

	// 初始化数据库连接
	dsn := "host=" + cfg.Database.Host +
		" user=" + cfg.Database.Username +
		" password=" + cfg.Database.Password +
		" dbname=" + cfg.Database.Database +
		" port=" + string(rune(cfg.Database.Port)) +
		" sslmode=" + cfg.Database.SSLMode

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	log.Println("数据库连接成功")
	// TODO: 实现迁移逻辑
	log.Println("迁移完成")
}
