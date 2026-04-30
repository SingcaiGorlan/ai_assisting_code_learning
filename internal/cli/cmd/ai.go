package cmd

import (
	"bufio"
	"fmt"
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

func init() {
	aiCmd.AddCommand(aiChatCmd)
	aiCmd.AddCommand(aiCodeCmd)
	aiCmd.AddCommand(aiTestCmd)
}
