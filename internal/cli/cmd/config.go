package cmd

import (
	"fmt"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/spf13/cobra"
)

var configGetCmd = &cobra.Command{
	Use:   "get",
	Short: "Get configuration values",
	Long:  `Retrieve and display current configuration settings`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Current Configuration:")
		fmt.Println("----------------------")
		
		// Load configuration
		cfg := config.Load()
		
		fmt.Printf("Server:\n")
		fmt.Printf("  Host: %s\n", cfg.Server.Host)
		fmt.Printf("  Port: %d\n", cfg.Server.Port)
		fmt.Printf("  Mode: %s\n", cfg.Server.Mode)
		
		fmt.Printf("\nDatabase:\n")
		fmt.Printf("  Host: %s:%d\n", cfg.Database.Host, cfg.Database.Port)
		fmt.Printf("  Name: %s\n", cfg.Database.Database)
		fmt.Printf("  SSL Mode: %s\n", cfg.Database.SSLMode)
		
		fmt.Printf("\nRedis:\n")
		fmt.Printf("  Address: %s:%d\n", cfg.Redis.Host, cfg.Redis.Port)
		fmt.Printf("  DB: %d\n", cfg.Redis.DB)
		
		fmt.Printf("\nAI Settings:\n")
		fmt.Printf("  Provider: %s\n", cfg.AI.Provider)
		if cfg.AI.APIKey != "" {
			fmt.Printf("  API Key: ****%s\n", cfg.AI.APIKey[len(cfg.AI.APIKey)-4:])
		} else {
			fmt.Printf("  API Key: Not set\n")
		}
		
		return nil
	},
}

func init() {
	configCmd.AddCommand(configGetCmd)
}
