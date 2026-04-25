package main

import (
	"fmt"
	"log"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	// Import model package (to be created)
	// "github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/domain/model"
)

func main() {
	cfg := config.Load()

	// Initialize database connection
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		cfg.Database.Host, cfg.Database.Username, cfg.Database.Password,
		cfg.Database.Database, cfg.Database.Port, cfg.Database.SSLMode)
	_, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Debug: print configuration values
	fmt.Printf("Database Config:\n")
	fmt.Printf("  Host: %s\n", cfg.Database.Host)
	fmt.Printf("  Port: %d\n", cfg.Database.Port)
	fmt.Printf("  Username: %s\n", cfg.Database.Username)
	fmt.Printf("  Password: %s\n", cfg.Database.Password)
	fmt.Printf("  Database: %s\n", cfg.Database.Database)
	fmt.Printf("  SSLMode: %s\n", cfg.Database.SSLMode)

	log.Println("Database connection successful")

	// TODO: Implement auto migration
	// Uncomment the following code and import model package to run migration
	// if err := db.AutoMigrate(
	// 	&model.User{},
	// 	&model.UserProfile{},
	// 	&model.Subject{},
	// 	&model.KnowledgePoint{},
	// 	&model.ChatRecord{},
	// 	&model.LearningProgress{},
	// 	&model.Exercise{},
	// ); err != nil {
	// 	log.Fatalf("Database migration failed: %v", err)
	// }

	log.Println("Migration completed")
}
