package config

import (
	"fmt"
	"sync"

	"github.com/spf13/viper"
)

var (
	cfg  *Config
	once sync.Once
)

type Config struct {
	Server   ServerConfig   `mapstructure:"server"`
	Database DatabaseConfig `mapstructure:"database"`
	AI       AIConfig       `mapstructure:"ai"`
	JWT      JWTConfig      `mapstructure:"jwt"`
	Log      LogConfig      `mapstructure:"log"`
}

type ServerConfig struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
	Mode string `mapstructure:"mode"` // debug, release, test
}

type DatabaseConfig struct {
	Driver string `mapstructure:"driver"`
	Path   string `mapstructure:"path"` // SQLite数据库文件路径
}

type AIConfig struct {
	Provider     string  `mapstructure:"provider"` // openai, azure, local
	APIKey       string  `mapstructure:"api_key"`
	Model        string  `mapstructure:"model"`
	BaseURL      string  `mapstructure:"base_url"`
	MaxTokens    int     `mapstructure:"max_tokens"`
	Temperature  float64 `mapstructure:"temperature"`
}

type JWTConfig struct {
	Secret string `mapstructure:"secret"`
	Expire int    `mapstructure:"expire"` // hours
}

type LogConfig struct {
	Level    string `mapstructure:"level"`
	Format   string `mapstructure:"format"` // json, text
	FilePath string `mapstructure:"file_path"`
}

func Load(configPath ...string) *Config {
	once.Do(func() {
		cfg = &Config{}

		// Default configuration
		viper.SetDefault("server.host", "0.0.0.0")
		viper.SetDefault("server.port", 8080)
		viper.SetDefault("server.mode", "debug")

		viper.SetDefault("database.driver", "sqlite")
		viper.SetDefault("database.path", "./data/ai_learning.db")

		viper.SetDefault("ai.provider", "openai")
		viper.SetDefault("ai.model", "gpt-3.5-turbo")
		viper.SetDefault("ai.max_tokens", 1000)
		viper.SetDefault("ai.temperature", 0.7)

		viper.SetDefault("jwt.expire", 24)

		viper.SetDefault("log.level", "info")
		viper.SetDefault("log.format", "json")
		viper.SetDefault("log.file_path", "./logs/app.log")

		// Read configuration file
		if len(configPath) > 0 && configPath[0] != "" {
			viper.SetConfigFile(configPath[0])
		} else {
			viper.SetConfigName("config")
			viper.SetConfigType("yaml")
			viper.AddConfigPath("./configs")
			viper.AddConfigPath(".")
		}

		// Read environment variables
		viper.AutomaticEnv()

		// Bind environment variables
		_ = viper.BindEnv("server.port", "ALP_SERVER_PORT")
		_ = viper.BindEnv("server.mode", "ALP_SERVER_MODE")
		_ = viper.BindEnv("database.path", "ALP_DB_PATH")
		_ = viper.BindEnv("ai.api_key", "OPENAI_API_KEY")
		_ = viper.BindEnv("jwt.secret", "ALP_JWT_SECRET")

		// Try to read configuration file
		if err := viper.ReadInConfig(); err != nil {
			fmt.Printf("Warning: Failed to read config file: %v\n", err)
		}

		// Unmarshal configuration
		if err := viper.Unmarshal(cfg); err != nil {
			panic(fmt.Errorf("failed to unmarshal config: %w", err))
		}
	})

	return cfg
}