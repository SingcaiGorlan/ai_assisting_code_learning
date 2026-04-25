# Frontend build: VitePress pseudo-static site
FROM node:18-alpine AS frontend
WORKDIR /app/web
COPY web/package.json web/package-lock.json* ./
RUN npm install || npm install --legacy-peer-deps
COPY web/docs ./docs
RUN npm run docs:build

# Backend build
FROM golang:1.21-alpine AS builder
WORKDIR /app
ENV CGO_ENABLED=0 GOOS=linux
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Copy built docs into repo path for serving at /docs
RUN mkdir -p web/docs/.vitepress && \
    rm -rf web/docs/.vitepress/dist && \
    cp -r /app/web/docs/.vitepress/dist web/docs/.vitepress/dist
RUN go build -o /app/server ./cmd/server

# Final runtime image
FROM gcr.io/distroless/base-debian12
WORKDIR /app
COPY --from=builder /app/server /app/server
COPY --from=builder /app/configs ./configs
COPY --from=builder /app/web/public ./web/public
COPY --from=builder /app/web/docs/.vitepress/dist ./web/docs/.vitepress/dist
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["/app/server"]
