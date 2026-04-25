# Getting Started

Welcome to the AI Learning Platform pseudo-static docs.

## Prerequisites
- Node.js >= 18 (for VitePress)
- Go 1.21+

## Run backend API
```bash
cd e:/ai_assisting_code_learning
go run ./cmd/server/main.go
```

## Run docs (dev)
```bash
cd e:/ai_assisting_code_learning/web
npm install
npm run docs:dev
```
Then open the dev server URL shown in the console.

## Build static docs
```bash
cd e:/ai_assisting_code_learning/web
npm run docs:build
```
The generated files will be in `web/docs/.vitepress/dist`.

## Serve docs in production
- Option A: `npm run docs:serve` (simple static server)
- Option B: Copy `docs/.vitepress/dist` behind any static host (Nginx/S3/CDN)
