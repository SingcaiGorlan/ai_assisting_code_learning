package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "ai-learning-cli",
	Short: "AI Learning Platform CLI Tool",
	Long: `AI Learning Platform Command Line Interface

A comprehensive CLI tool for managing and interacting with 
the AI-assisted code learning platform.`,
}

// Execute executes the root command
func Execute() error {
	return rootCmd.Execute()
}

func init() {
	// Add your subcommands here
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(configCmd)
	rootCmd.AddCommand(dbCmd)
	rootCmd.AddCommand(userCmd)
	rootCmd.AddCommand(lessonCmd)
	rootCmd.AddCommand(aiCmd)
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number",
	Long:  `Print the version number of AI Learning Platform CLI`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("AI Learning Platform CLI v0.1.0")
	},
}

var configCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage configuration",
	Long:  `View and modify platform configuration settings`,
}

var dbCmd = &cobra.Command{
	Use:   "db",
	Short: "Database operations",
	Long:  `Perform database migrations, seeding, and maintenance`,
}

var userCmd = &cobra.Command{
	Use:   "user",
	Short: "User management",
	Long:  `Create, update, delete, and list users`,
}

var lessonCmd = &cobra.Command{
	Use:   "lesson",
	Short: "Lesson management",
	Long:  `Manage lessons, courses, and learning materials`,
}

var aiCmd = &cobra.Command{
	Use:   "ai",
	Short: "AI operations",
	Long:  `Test AI integration and chat functionality`,
}
