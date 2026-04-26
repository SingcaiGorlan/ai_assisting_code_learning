# AI Learning Frontend (Vite + Vue)

A modern landing page for the AI Learning Platform, served from port 8080 after build.

## Develop
```bash
cd web/app
npm install
npm run dev    # http://localhost:5175
```

## Build
```bash
npm run build
```
Outputs to `web/app/dist`. The Go backend serves `/` from this dist directory.

## Notes
- Buttons link to Docs (/docs) and Admin (http://localhost:4174/admin/).
- Update `App.vue` for content tweaks.
