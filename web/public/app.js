// API Base URL
const API_BASE = 'http://localhost:8080/api/v1';

// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const codeEditor = document.getElementById('codeEditor');
const languageSelect = document.getElementById('languageSelect');
const analysisResult = document.getElementById('analysisResult');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

// Navigation
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        // Update active states
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding tab
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            }
        });
    });
});

// Code Editor Character Count
codeEditor.addEventListener('input', () => {
    const count = codeEditor.value.length;
    const charCount = document.querySelector('.char-count');
    charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
});

// Clear Button
clearBtn.addEventListener('click', () => {
    codeEditor.value = '';
    analysisResult.innerHTML = `
        <div class="placeholder">
            <span class="placeholder-icon">🔍</span>
            <p>Paste your code and click "Analyze Code" to get AI-powered suggestions</p>
        </div>
    `;
    document.querySelector('.char-count').textContent = '0 characters';
});

// Analyze Code
submitBtn.addEventListener('click', async () => {
    const code = codeEditor.value.trim();
    
    if (!code) {
        alert('Please enter some code to analyze');
        return;
    }
    
    const language = languageSelect.value;
    
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE}/ai/code-assist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                language: language,
                question: 'Analyze this code and provide improvement suggestions'
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayAnalysis(data);
        } else {
            throw new Error(data.error || 'Failed to analyze code');
        }
    } catch (error) {
        console.error('Error:', error);
        analysisResult.innerHTML = `
            <div class="error-message">
                <p>❌ ${error.message}</p>
                <p class="text-secondary">Please make sure the backend server is running.</p>
            </div>
        `;
    } finally {
        hideLoading();
    }
});

// Display Analysis Results
function displayAnalysis(data) {
    let html = '';
    
    if (data.suggestions && data.suggestions.length > 0) {
        html += '<h4 style="margin-bottom: 12px;">💡 Suggestions</h4>';
        data.suggestions.forEach((suggestion, index) => {
            html += `<div class="suggestion-item">${index + 1}. ${suggestion}</div>`;
        });
    }
    
    if (data.analysis) {
        html += `<div class="analysis-text"><strong>📊 Analysis:</strong><br>${data.analysis}</div>`;
    }
    
    analysisResult.innerHTML = html;
}

// Chat Functionality
sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE}/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            addMessage(data.response || data.message || 'I received your message', 'assistant');
        } else {
            throw new Error(data.error || 'Failed to get response');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage(`❌ Error: ${error.message}`, 'assistant');
    } finally {
        hideLoading();
    }
}

function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-avatar">${type === 'user' ? '👤' : '🤖'}</div>
        <div class="message-content">${escapeHtml(content)}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Loading Overlay
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Initialize - Check server health
async function checkServerHealth() {
    try {
        const response = await fetch(`${API_BASE.replace('/api/v1', '')}/health`);
        if (response.ok) {
            console.log('✅ Backend server is running');
        }
    } catch (error) {
        console.warn('⚠️ Backend server may not be running');
        analysisResult.innerHTML = `
            <div class="placeholder">
                <span class="placeholder-icon">⚠️</span>
                <p>Backend server not detected. Please start the backend server first.</p>
                <p class="text-secondary">Run: go run ./cmd/server/main.go</p>
            </div>
        `;
    }
}

// Run health check on page load
checkServerHealth();
