# ============================================
# Stage 1: Build Frontend (VitePress)
# ============================================
FROM node:18-alpine AS frontend-builder
WORKDIR /app/web

# Copy package files and install dependencies
COPY web/package.json web/package-lock.json* ./
RUN npm ci --prefer-offline || npm install --legacy-peer-deps

# Copy docs and build
COPY web/docs ./docs
RUN npm run docs:build

# ============================================
# Stage 2: Build Backend (Go)
# ============================================
FROM golang:1.21-alpine AS backend-builder

# Install build dependencies
RUN apk add --no-cache git ca-certificates tzdata

WORKDIR /app

# Set build environment
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64 \
    GO111MODULE=on

# Download dependencies first (better caching)
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Copy built frontend docs into the backend build context
RUN mkdir -p web/docs/.vitepress/dist && \
    cp -r /app/web/docs/.vitepress/dist web/docs/.vitepress/dist/

# Build the application
RUN go build -ldflags="-w -s" -o /app/server ./cmd/server

# ============================================
# Stage 3: Production Runtime Image
# ============================================
FROM alpine:3.19 AS production

# Install runtime dependencies
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    curl \
    tini

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

# Copy binary from builder
COPY --from=backend-builder /app/server /app/server

# Copy configuration files
COPY --from=backend-builder /app/configs ./configs

# Copy static files
COPY --from=backend-builder /app/web/public ./web/public
COPY --from=backend-builder /app/web/docs/.vitepress/dist ./web/docs/.vitepress/dist

# Create logs directory
RUN mkdir -p /app/logs && \
    chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Set environment variables
ENV PORT=8080 \
    GIN_MODE=release \
    TZ=Asia/Shanghai

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Use tini as init system for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/app/server"]
