.PHONY: help setup dev build test clean lint docker-up docker-down migrate swag clean-all

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup      Initialize development environment"
	@echo "  make dev        Start development server"
	@echo "  make build      Build project"
	@echo "  make test       Run tests"
	@echo "  make lint       Code linting"
	@echo "  make clean      Clean build files"
	@echo "  make clean-all  Deep clean (including node_modules)"
	@echo "  make docker-up  Start Docker services"
	@echo "  make docker-down Stop Docker services"
	@echo "  make migrate    Run database migration"
	@echo "  make swag       Generate API documentation"

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
	cp configs/config.yaml configs/config.local.yaml || echo "Configuration file already exists"
	@echo "✅ Initialization complete! Please edit .env.local and config.local.yaml"

# Development server
dev:
	@echo "Starting development server..."
	air -c .air.toml

# Build
build:
	@echo "Building backend..."
	go build -o bin/server ./cmd/server
	@echo "Building frontend..."
	cd web && npm run build

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
	@echo "Cleaning build files..."
	rm -rf tmp/*
	rm -rf logs/*
	rm -rf bin/
	rm -f coverage.out coverage.txt
	find . -name "*.test" -type f -delete
	@echo "✅ Clean complete"

# Deep clean (including node_modules)
clean-all: clean
	@echo "Deep cleaning (this will remove node_modules)..."
	find web -name 'node_modules' -type d -prune -exec rm -rf {} +
	rm -rf web/*/dist web/*/build
	rm -rf web/docs/.vitepress/dist web/docs/.vitepress/cache
	@echo "✅ Deep clean complete"

# Start Docker services
docker-up:
	@echo "Starting Podman services..."
	podman compose -f docker-compose.dev.yml up -d

# Stop Podman services
docker-down:
	@echo "Stopping Podman services..."
	podman compose -f docker-compose.dev.yml down

# Database migration
migrate:
	@echo "Running database migration..."
	go run cmd/migrate/main.go

# Generate API documentation
swag:
	@echo "Generating Swagger documentation..."
	swag init -g internal/app/handler/router.go -o docs/api
