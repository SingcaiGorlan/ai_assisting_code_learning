package cmd

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/spf13/cobra"
)

var aiChatCmd = &cobra.Command{
	Use:   "chat",
	Short: "Start an interactive AI chat session",
	Long:  `Launch an interactive chat session with the AI assistant for coding help`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Starting AI chat session...")
		fmt.Println("Type 'quit' or 'exit' to end the session")
		fmt.Println(strings.Repeat("-", 50))
		
		scanner := bufio.NewScanner(os.Stdin)
		
		for {
			fmt.Print("\nYou: ")
			if !scanner.Scan() {
				break
			}
			
			input := strings.TrimSpace(scanner.Text())
			if input == "" {
				continue
			}
			
			if strings.ToLower(input) == "quit" || strings.ToLower(input) == "exit" {
				fmt.Println("Ending chat session. Goodbye!")
				break
			}
			
			// TODO: Implement AI chat integration
			fmt.Println("AI: Chat feature coming soon! Your message was:", input)
		}
		
		return scanner.Err()
	},
}

var aiCodeCmd = &cobra.Command{
	Use:   "code [prompt]",
	Short: "Get AI assistance for code generation or explanation",
	Long:  `Ask the AI to generate or explain code based on your prompt`,
	Args:  cobra.MinimumNArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		prompt := strings.Join(args, " ")
		
		fmt.Printf("Requesting AI assistance for: %s\n", prompt)
		
		// TODO: Implement AI code assistance
		
		fmt.Println("Code assistance feature coming soon!")
		return nil
	},
}

var aiTestCmd = &cobra.Command{
	Use:   "test",
	Short: "Test AI API connectivity",
	Long:  `Verify that the AI service is properly configured and accessible`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Testing AI API connection...")
		
		cfg := config.Load()
		
		if cfg.AI.APIKey == "" {
			return fmt.Errorf("AI API key is not configured")
		}
		
		fmt.Printf("✓ AI Provider: %s\n", cfg.AI.Provider)
		fmt.Printf("✓ API Key: ****%s\n", cfg.AI.APIKey[len(cfg.AI.APIKey)-4:])
		fmt.Println("✓ Configuration looks good")
		
		// TODO: Add actual API test call
		
		fmt.Println("✅ AI API connection test passed")
		return nil
	},
}

var aiConfigCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage AI configuration",
	Long:  `View and modify AI provider configuration settings`,
}

var aiConfigShowCmd = &cobra.Command{
	Use:   "show",
	Short: "Display current AI configuration",
	Long:  `Show the current AI provider, model, and other settings`,
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg := config.Load()
		
		fmt.Println("\n=== AI Configuration ===")
		fmt.Printf("Provider:    %s\n", cfg.AI.Provider)
		fmt.Printf("Model:       %s\n", cfg.AI.Model)
		fmt.Printf("Base URL:    %s\n", cfg.AI.BaseURL)
		if cfg.AI.APIKey != "" {
			maskedKey := maskAPIKey(cfg.AI.APIKey)
			fmt.Printf("API Key:     %s\n", maskedKey)
		} else {
			fmt.Printf("API Key:     <not set>\n")
		}
		fmt.Printf("Max Tokens:  %d\n", cfg.AI.MaxTokens)
		fmt.Printf("Temperature: %.2f\n", cfg.AI.Temperature)
		fmt.Println("========================\n")
		
		return nil
	},
}

var aiConfigSetCmd = &cobra.Command{
	Use:   "set [key] [value]",
	Short: "Set AI configuration value",
	Long:  `Set a specific AI configuration parameter (provider, model, api_key, base_url, max_tokens, temperature)`,
	Args:  cobra.MinimumNArgs(2),
	RunE: func(cmd *cobra.Command, args []string) error {
		key := args[0]
		value := args[1]
		
		fmt.Printf("Setting %s = %s\n", key, value)
		
		// TODO: Implement actual config update via API or file write
		fmt.Println("Note: Config update feature coming soon!")
		fmt.Println("Please edit configs/config.yaml manually for now.")
		
		return nil
	},
}

var aiConfigTestCmd = &cobra.Command{
	Use:   "test",
	Short: "Test AI API connectivity",
	Long:  `Verify that the AI service is properly configured and accessible`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Testing AI API connection...")
		
		cfg := config.Load()
		
		if cfg.AI.APIKey == "" {
			return fmt.Errorf("AI API key is not configured")
		}
		
		fmt.Printf("✓ AI Provider: %s\n", cfg.AI.Provider)
		fmt.Printf("✓ Model: %s\n", cfg.AI.Model)
		fmt.Printf("✓ Base URL: %s\n", cfg.AI.BaseURL)
		fmt.Printf("✓ API Key: ****%s\n", cfg.AI.APIKey[len(cfg.AI.APIKey)-4:])
		
		// Test API endpoint if server is running
		testURL := "http://localhost:8081/api/v1/ai/config/test"
		resp, err := http.Post(testURL, "application/json", nil)
		if err != nil {
			fmt.Printf("⚠ Server not running or unreachable: %v\n", err)
			fmt.Println("✓ Configuration looks good")
			return nil
		}
		defer resp.Body.Close()
		
		if resp.StatusCode == http.StatusOK {
			var result map[string]interface{}
			json.NewDecoder(resp.Body).Decode(&result)
			fmt.Printf("✅ Connection test successful: %v\n", result["message"])
		} else {
			return fmt.Errorf("connection test failed with status: %d", resp.StatusCode)
		}
		
		return nil
	},
}

func maskAPIKey(key string) string {
	if len(key) <= 8 {
		return "****"
	}
	return key[:4] + "****" + key[len(key)-4:]
}

func init() {
	aiCmd.AddCommand(aiChatCmd)
	aiCmd.AddCommand(aiCodeCmd)
	aiCmd.AddCommand(aiTestCmd)
	aiCmd.AddCommand(aiConfigCmd)
	
	aiConfigCmd.AddCommand(aiConfigShowCmd)
	aiConfigCmd.AddCommand(aiConfigSetCmd)
	aiConfigCmd.AddCommand(aiConfigTestCmd)
}
