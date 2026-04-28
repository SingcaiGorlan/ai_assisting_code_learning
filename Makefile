.PHONY: help setup dev build test clean lint migrate swag cli

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup      Initialize development environment"
	@echo "  make dev        Start development server"
	@echo "  make build      Build project"
	@echo "  make test       Run tests"
	@echo "  make lint       Code linting"
	@echo "  make clean      Clean build files"
	@echo "  make migrate    Run database migration"
	@echo "  make swag       Generate API documentation"
	@echo "  make cli        Build CLI tool"
	@echo "  make cli-run    Run CLI tool with help"

# Initialize development environment
setup:
	@echo "Installing Go dependencies..."
	go mod download
	@echo "Installing development tools..."
	go install github.com/air-verse/air@latest
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b "$(shell go env GOPATH)/bin" latest
	go install github.com/swaggo/swag/cmd/swag@latest
	@echo "Creating configuration files..."
	cp .env.example .env.local
	mkdir -p data
	@echo "✅ Initialization complete! Please edit .env.local"

# Development server
dev:
	@echo "Starting development server..."
	air -c .air.toml

# Build
build:
	@echo "Building backend..."
	go build -o bin/server ./cmd/server
	@echo "Building Wails desktop app..."
	cd web/wails-app && wails build || echo "Wails build skipped, run 'wails build' manually"

# Run tests
test:
	@echo "Running tests..."
	go test ./... -v -cover

# Code linting
lint:
	@echo "Running code linting..."
	golangci-lint run ./...

# Clean
clean:
	@echo "🧹 Cleaning build files..."
	rm -rf bin/
	rm -rf web/wails-app/build/
	@echo "✅ Clean complete"

# Database migration
migrate:
	@echo "Running database migration..."
	go run cmd/migrate/main.go

# Generate API documentation
swag:
	@echo "Generating Swagger documentation..."
	swag init -g internal/app/handler/router.go -o docs/api

# Build CLI tool
cli:
	@echo "Building CLI tool..."
	go build -o bin/ai-learning-cli ./cmd/cli
	@echo "✅ CLI built successfully at bin/ai-learning-cli"
	@echo "Usage: ./bin/ai-learning-cli --help"

# Run CLI tool with help
cli-run: cli
	@echo ""
	./bin/ai-learning-cli --help
