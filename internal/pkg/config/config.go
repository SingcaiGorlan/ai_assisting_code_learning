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
	Redis    RedisConfig    `mapstructure:"redis"`
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
	Driver   string `mapstructure:"driver"`
	Host     string `mapstructure:"host"`
	Port     int    `mapstructure:"port"`
	Username string `mapstructure:"username"`
	Password string `mapstructure:"password"`
	Database string `mapstructure:"database"`
	SSLMode  string `mapstructure:"ssl_mode"`
}

type RedisConfig struct {
	Host     string `mapstructure:"host"`
	Port     int    `mapstructure:"port"`
	Password string `mapstructure:"password"`
	DB       int    `mapstructure:"db"`
}

type AIConfig struct {
	Provider     string `mapstructure:"provider"` // openai, azure, local
	APIKey       string `mapstructure:"api_key"`
	Model        string `mapstructure:"model"`
	BaseURL      string `mapstructure:"base_url"`
	MaxTokens    int    `mapstructure:"max_tokens"`
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

		viper.SetDefault("database.driver", "postgres")
		viper.SetDefault("database.host", "localhost")
		viper.SetDefault("database.port", 5432)
		viper.SetDefault("database.ssl_mode", "disable")

		viper.SetDefault("redis.host", "localhost")
		viper.SetDefault("redis.port", 6379)
		viper.SetDefault("redis.db", 0)

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
		viper.SetEnvPrefix("ALP")

		// Bind environment variables
		bindEnv()

		if err := viper.ReadInConfig(); err != nil {
			fmt.Printf("Failed to read config file: %v\n", err)
		}

		if err := viper.Unmarshal(cfg); err != nil {
			panic(fmt.Sprintf("Failed to parse config: %v", err))
		}
	})

	return cfg
}

func bindEnv() {
	viper.BindEnv("server.host", "ALP_SERVER_HOST")
	viper.BindEnv("server.port", "ALP_SERVER_PORT")
	viper.BindEnv("database.host", "ALP_DB_HOST")
	viper.BindEnv("database.username", "ALP_DB_USER")
	viper.BindEnv("database.password", "ALP_DB_PASSWORD")
	viper.BindEnv("ai.api_key", "ALP_AI_API_KEY")
	viper.BindEnv("jwt.secret", "ALP_JWT_SECRET")
}