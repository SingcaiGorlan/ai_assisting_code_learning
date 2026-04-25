# Frontend UI

There are two frontend options in this repository:

1. **Static UI (web/public)** — A modern dark-themed UI served by the Go backend at `/` and `/static`.
2. **VitePress Docs (this site)** — Pseudo-static documentation available under `/docs` after build.

## Using the static UI
- Start backend: `go run ./cmd/server/main.go`
- Open: `http://localhost:8080`
- API base in `web/public/app.js`: `http://localhost:8080/api/v1`

## Serving built docs with the backend
- Build docs: `npm run docs:build`
- Generated path: `web/docs/.vitepress/dist`
- The Go server can serve them under `/docs` (see router configuration).

## Customizing
- Update `web/public/styles.css` for theme/colors.
- Update `web/public/app.js` for API interactions.
- Edit VitePress pages under `web/docs` for docs content.
