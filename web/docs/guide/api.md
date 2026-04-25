# API Reference (v1)

Base URL: `http://localhost:8080/api/v1`

## Health
- `GET /health`

## Auth
- `POST /users/register` — body: `{ username, email, password }`
- `POST /users/login` — body: `{ email, password }`
- `GET /users/profile` — requires `Authorization` header

## Learning
- `GET /learning/lessons`
- `GET /learning/lessons/:id`
- `POST /learning/lessons/:id/complete`

## AI
- `POST /ai/chat` — body: `{ message }`
- `POST /ai/code-assist` — body: `{ code, language?, question? }`

> Note: Auth middleware currently expects an `Authorization` header and sets a demo `user_id`.
