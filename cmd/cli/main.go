package main

import (
	"log"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/cli/cmd"
)

func main() {
	if err := cmd.Execute(); err != nil {
		log.Fatalf("Error: %v", err)
	}
}
