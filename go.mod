module github.com/your-org/ai-learning-platform

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/go-redis/redis/v8 v8.11.5
    gorm.io/gorm v1.25.5
    gorm.io/driver/postgres v1.5.4
    github.com/spf13/viper v1.18.2
    go.uber.org/zap v1.26.0
    github.com/google/wire v0.5.0
    github.com/prometheus/client_golang v1.18.0
)

// 如果需要代理
// replace github.com/your-org/ai-learning-platform => ./
