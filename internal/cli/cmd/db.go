package cmd

import (
	"fmt"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"github.com/spf13/cobra"
)

var dbMigrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Run database migrations",
	Long:  `Execute database schema migrations to create or update tables`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Running database migrations...")
		
		cfg := config.Load()
		
		db, err := gorm.Open(sqlite.Open(cfg.Database.Path), &gorm.Config{})
		if err != nil {
			return fmt.Errorf("failed to connect to database: %w", err)
		}
		
		// Suppress unused variable warning
		_ = db
		
		fmt.Println("✓ Connected to SQLite database")
		fmt.Printf("  Path: %s\n", cfg.Database.Path)
		
		// TODO: Add your model migrations here
		// Example:
		// if err := db.AutoMigrate(
		// 	&model.User{},
		// 	&model.Lesson{},
		// 	&model.Progress{},
		// ); err != nil {
		// 	return fmt.Errorf("migration failed: %w", err)
		// }
		
		fmt.Println("✓ Migrations completed successfully")
		return nil
	},
}

var dbSeedCmd = &cobra.Command{
	Use:   "seed",
	Short: "Seed the database with initial data",
	Long:  `Insert sample data into the database for development and testing`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Seeding database...")
		
		cfg := config.Load()
		
		db, err := gorm.Open(sqlite.Open(cfg.Database.Path), &gorm.Config{})
		if err != nil {
			return fmt.Errorf("failed to connect to database: %w", err)
		}
		
		fmt.Println("✓ Connected to SQLite database")
		
		// TODO: Add seeding logic here
		// Example: seed users, lessons, etc.
		_ = db
		
		fmt.Println("✓ Seeding completed")
		return nil
	},
}

var dbStatusCmd = &cobra.Command{
	Use:   "status",
	Short: "Check database connection status",
	Long:  `Verify database connectivity and display connection information`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Checking database connection...")
		
		cfg := config.Load()
		
		db, err := gorm.Open(sqlite.Open(cfg.Database.Path), &gorm.Config{})
		if err != nil {
			return fmt.Errorf("❌ Failed to connect: %w", err)
		}
		
		sqlDB, err := db.DB()
		if err != nil {
			return fmt.Errorf("❌ Failed to get DB instance: %w", err)
		}
		
		if err := sqlDB.Ping(); err != nil {
			return fmt.Errorf("❌ Database ping failed: %w", err)
		}
		
		fmt.Println("✅ SQLite database connection successful")
		fmt.Printf("   Path: %s\n", cfg.Database.Path)
		
		return nil
	},
}

func init() {
	dbCmd.AddCommand(dbMigrateCmd)
	dbCmd.AddCommand(dbSeedCmd)
	dbCmd.AddCommand(dbStatusCmd)
}

func loadConfig() *config.Config {
	cfg := config.Load()
	return cfg
}
