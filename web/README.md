# AI Learning Platform - Web Interface

Modern web interface for the AI Code Learning Platform.

## Features

- **Code Assistance**: Submit code for AI-powered analysis and improvement suggestions
- **AI Chat**: Real-time conversation with AI assistant for learning support
- **Learning Path**: Track progress through structured lessons
- **User Profile**: View learning statistics and achievements

## File Structure

```
web/
├── public/
│   ├── index.html    # Main HTML structure
│   ├── styles.css    # Modern dark theme styles
│   └── app.js        # Frontend JavaScript logic
└── README.md         # This file
```

## How to Use

1. **Start the Backend Server**

```bash
cd e:/ai_assisting_code_learning
go run ./cmd/server/main.go
```

2. **Open the Web Interface**

Open your browser and navigate to:
```
http://localhost:8080
```

## Features

### Code Assist Tab
- Paste code in the editor
- Select programming language
- Click "Analyze Code" for AI suggestions
- View detailed analysis and improvement recommendations

### AI Chat Tab
- Ask programming questions
- Get real-time AI assistance
- Interactive conversation history

### Lessons Tab
- View learning path progress
- Track completed lessons
- Access learning materials

### Profile Tab
- View learning statistics
- Track daily streak
- Monitor overall progress

## API Integration

The frontend communicates with the backend via REST API:

- `POST /api/v1/ai/code-assist` - Analyze code
- `POST /api/v1/ai/chat` - Chat with AI
- `GET /health` - Health check

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3b82f6;
    --background: #0f172a;
    --sidebar-bg: #1e293b;
    /* ... */
}
```

### API Endpoint
Update `API_BASE` in `app.js`:
```javascript
const API_BASE = 'http://localhost:8080/api/v1';
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Notes

- Make sure the backend server is running before accessing the web interface
- Some features may require authentication (to be implemented)
- AI responses depend on configured API keys in `configs/config.yaml`
