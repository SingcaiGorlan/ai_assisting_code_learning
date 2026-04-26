# AI Learning Admin (Vite + Vue 3)

Admin console for managing users of the AI Learning Platform.

## Quick start
```bash
cd web/admin
npm install
npm run dev        # http://localhost:4174/admin/
```

## Build & preview
```bash
npm run build
npm run preview    # serve dist
```

## API base
- Default: `http://localhost:8080/api/v1`
- Override: set `VITE_API_BASE` env or `.env` in `web/admin`

## Pages
- `/login`: login (stores token to localStorage)
- `/users`: user list (calls `/users` API, falls back to mock if unavailable)

## Deployment hints
- Update Vite `base` if hosting under subpath (currently `/admin/`).
- For GitHub Pages, run `npm run build` and serve `dist`.
