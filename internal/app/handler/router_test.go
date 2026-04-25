package handler

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/gin-gonic/gin"
)

func TestHealthRoute(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	cfg := &config.Config{Server: config.ServerConfig{Host: "localhost", Port: 8080}}
	RegisterRoutes(r, nil, nil, cfg)

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}
