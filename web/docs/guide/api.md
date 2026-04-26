# 📡 API 参考文档 (v1)

**基础 URL:** `http://localhost:8080/api/v1`

## 🏥 健康检查

### 获取服务状态
```http
GET /health
```

**响应：**
```json
{
  "status": "ok",
  "timestamp": "2024-04-26T11:11:58Z"
}
```

---

## 🔐 用户认证

### 用户注册
```http
POST /users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

### 用户登录
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**响应：**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user_id": "123"
}
```

### 获取用户信息
```http
GET /users/profile
Authorization: Bearer {token}
```

---

## 📚 学习模块

### 获取所有课程
```http
GET /learning/lessons
Authorization: Bearer {token}
```

### 获取单个课程
```http
GET /learning/lessons/:id
Authorization: Bearer {token}
```

### 完成课程
```http
POST /learning/lessons/:id/complete
Authorization: Bearer {token}
```

---

## 🤖 AI 功能

### AI 对话
```http
POST /ai/chat
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "如何优化这段 JavaScript 代码？"
}
```

### 代码辅助
```http
POST /ai/code-assist
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "function sum(a, b) { return a + b; }",
  "language": "javascript",
  "question": "这个函数有什么可以改进的地方？"
}
```

**响应：**
```json
{
  "analysis": "代码简洁清晰，可以考虑...",
  "suggestions": [
    "添加参数验证",
    "添加 JSDoc 注释"
  ],
  "score": 8.5
}
```

---

## 🔑 认证说明

- 所有需要认证的端点都需要在请求头中包含 `Authorization: Bearer {token}`
- Token 由登录端点返回，有效期通常为 24 小时
- 使用无效或过期的 Token 将返回 `401 Unauthorized`

## ❌ 错误处理

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（需要登录） |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

## 💡 示例请求

### 使用 cURL
```bash
# 登录
curl -X POST http://localhost:8080/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepass123"}'

# 获取个人信息
curl -X GET http://localhost:8080/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 使用 JavaScript
```javascript
const token = 'your_token_here';

fetch('http://localhost:8080/api/v1/users/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(res => res.json()).then(data => console.log(data));
```
