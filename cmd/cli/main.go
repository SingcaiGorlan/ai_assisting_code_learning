package main

import (
	"fmt"
	"os"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/cli/cmd"
)

func main() {
	if err := cmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}
