package api

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func performRequest(r *gin.Engine, method, path string, body []byte, headers map[string]string) *httptest.ResponseRecorder {
	req := httptest.NewRequest(method, path, bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	for k, v := range headers {
		req.Header.Set(k, v)
	}
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func TestRegister(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.POST("/register", Register)

	payload := []byte(`{"username":"demo","email":"demo@example.com","password":"123456"}`)
	w := performRequest(r, http.MethodPost, "/register", payload, nil)

	if w.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}

func TestLogin(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.POST("/login", Login)

	payload := []byte(`{"email":"demo@example.com","password":"123456"}`)
	w := performRequest(r, http.MethodPost, "/login", payload, nil)

	if w.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", w.Code)
	}

	var resp map[string]any
	_ = json.Unmarshal(w.Body.Bytes(), &resp)
	if resp["token"] == "" {
		t.Fatalf("expected token in response")
	}
}

func TestAuthMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.GET("/protected", AuthMiddleware(), func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	// Unauthorized
	w := performRequest(r, http.MethodGet, "/protected", nil, nil)
	if w.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", w.Code)
	}

	// Authorized
	w2 := performRequest(r, http.MethodGet, "/protected", nil, map[string]string{"Authorization": "demo"})
	if w2.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", w2.Code)
	}
}

func TestGetProfile(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.GET("/profile", func(c *gin.Context) {
		c.Set("user_id", "u1")
		GetProfile(c)
	})

	w := performRequest(r, http.MethodGet, "/profile", nil, nil)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}

func TestLessonsAndAI(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.GET("/lessons", GetLessons)
	r.GET("/lessons/:id", GetLesson)
	r.POST("/lessons/:id/complete", func(c *gin.Context) {
		c.Set("user_id", "u1")
		CompleteLesson(c)
	})
	r.POST("/ai/chat", AIChat)

	w := performRequest(r, http.MethodGet, "/lessons", nil, nil)
	if w.Code != http.StatusOK {
		t.Fatalf("lessons list expected 200, got %d", w.Code)
	}

	w2 := performRequest(r, http.MethodGet, "/lessons/1", nil, nil)
	if w2.Code != http.StatusOK {
		t.Fatalf("lesson detail expected 200, got %d", w2.Code)
	}

	w3 := performRequest(r, http.MethodPost, "/lessons/1/complete", nil, nil)
	if w3.Code != http.StatusOK {
		t.Fatalf("complete lesson expected 200, got %d", w3.Code)
	}

	chatPayload := []byte(`{"message":"hi"}`)
	w4 := performRequest(r, http.MethodPost, "/ai/chat", chatPayload, nil)
	if w4.Code != http.StatusOK {
		t.Fatalf("ai chat expected 200, got %d", w4.Code)
	}
}
