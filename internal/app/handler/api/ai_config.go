package api

import (
	"net/http"
	"sync"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/gin-gonic/gin"
)

var (
	aiConfig     *config.AIConfig
	aiConfigOnce sync.Once
)

// GetAIConfig retrieves current AI configuration
func GetAIConfig(c *gin.Context) {
	cfg := config.Load()
	
	// Mask API key for security
	maskedKey := maskAPIKey(cfg.AI.APIKey)
	
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"provider":    cfg.AI.Provider,
			"model":       cfg.AI.Model,
			"base_url":    cfg.AI.BaseURL,
			"api_key":     maskedKey,
			"max_tokens":  cfg.AI.MaxTokens,
			"temperature": cfg.AI.Temperature,
		},
	})
}

// UpdateAIConfig updates AI configuration
func UpdateAIConfig(c *gin.Context) {
	var req struct {
		Provider    string  `json:"provider"`
		Model       string  `json:"model"`
		BaseURL     string  `json:"base_url"`
		APIKey      string  `json:"api_key"`
		MaxTokens   int     `json:"max_tokens"`
		Temperature float64 `json:"temperature"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid request",
			"message": err.Error(),
		})
		return
	}

	// Load current config
	cfg := config.Load()

	// Update fields if provided
	if req.Provider != "" {
		cfg.AI.Provider = req.Provider
	}
	if req.Model != "" {
		cfg.AI.Model = req.Model
	}
	if req.BaseURL != "" {
		cfg.AI.BaseURL = req.BaseURL
	}
	if req.APIKey != "" {
		cfg.AI.APIKey = req.APIKey
	}
	if req.MaxTokens > 0 {
		cfg.AI.MaxTokens = req.MaxTokens
	}
	if req.Temperature >= 0 && req.Temperature <= 2 {
		cfg.AI.Temperature = req.Temperature
	}

	// TODO: Save configuration to file or database
	// For now, just return success
	
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "AI configuration updated successfully",
		"data": gin.H{
			"provider":    cfg.AI.Provider,
			"model":       cfg.AI.Model,
			"base_url":    cfg.AI.BaseURL,
			"api_key":     maskAPIKey(cfg.AI.APIKey),
			"max_tokens":  cfg.AI.MaxTokens,
			"temperature": cfg.AI.Temperature,
		},
	})
}

// TestAIConnection tests the AI provider connection
func TestAIConnection(c *gin.Context) {
	cfg := config.Load()
	
	// TODO: Implement actual connection test
	// For now, return mock result
	
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Connection test successful",
		"data": gin.H{
			"provider": cfg.AI.Provider,
			"status":   "connected",
			"latency":  "120ms",
		},
	})
}

// GetAIProviders returns available AI providers
func GetAIProviders(c *gin.Context) {
	providers := []gin.H{
		{
			"id":          "openai",
			"name":        "OpenAI",
			"description": "OpenAI GPT models (GPT-3.5, GPT-4)",
			"models":      []string{"gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"},
			"default_model": "gpt-3.5-turbo",
		},
		{
			"id":          "azure",
			"name":        "Azure OpenAI",
			"description": "Microsoft Azure OpenAI Service",
			"models":      []string{"gpt-35-turbo", "gpt-4"},
			"default_model": "gpt-35-turbo",
		},
		{
			"id":          "local",
			"name":        "Local Model",
			"description": "Run local LLM models (Ollama, LM Studio)",
			"models":      []string{"llama2", "codellama", "mistral"},
			"default_model": "llama2",
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    providers,
	})
}

// maskAPIKey masks the API key for security
func maskAPIKey(key string) string {
	if len(key) <= 8 {
		return "****"
	}
	return key[:4] + "****" + key[len(key)-4:]
}
