package middleware

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestCORSPreflight(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(CORS())
	r.OPTIONS("/test", func(c *gin.Context) {})

	req := httptest.NewRequest(http.MethodOptions, "/test", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	if w.Code != http.StatusNoContent {
		t.Fatalf("expected status 204, got %d", w.Code)
	}
	headers := w.Result().Header
	if headers.Get("Access-Control-Allow-Origin") != "*" {
		t.Fatalf("missing CORS header")
	}
	if !strings.Contains(headers.Get("Access-Control-Allow-Methods"), "GET") {
		t.Fatalf("allow methods not set")
	}
}

func TestRequestID(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(RequestID())
	r.GET("/id", func(c *gin.Context) {
		c.String(http.StatusOK, c.Writer.Header().Get("X-Request-ID"))
	})

	// Provided header should be preserved
	req := httptest.NewRequest(http.MethodGet, "/id", nil)
	req.Header.Set("X-Request-ID", "custom-id")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	if body := w.Body.String(); body != "custom-id" {
		t.Fatalf("expected custom request id, got %s", body)
	}

	// Generated header should exist
	req2 := httptest.NewRequest(http.MethodGet, "/id", nil)
	w2 := httptest.NewRecorder()
	r.ServeHTTP(w2, req2)
	rid := w2.Body.String()
	if rid == "" || len(rid) < 10 {
		t.Fatalf("expected generated request id, got '%s'", rid)
	}
}

func TestRecovery(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(Recovery())
	r.GET("/panic", func(c *gin.Context) {
		panic("boom")
	})

	req := httptest.NewRequest(http.MethodGet, "/panic", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	if w.Code != http.StatusInternalServerError {
		t.Fatalf("expected 500, got %d", w.Code)
	}
	if !strings.Contains(w.Body.String(), "Internal Server Error") {
		t.Fatalf("expected error body, got %s", w.Body.String())
	}
}

func TestRateLimiterPassThrough(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(RateLimiter())
	called := false
	r.GET("/ok", func(c *gin.Context) {
		called = true
		c.String(http.StatusOK, "ok")
	})

	req := httptest.NewRequest(http.MethodGet, "/ok", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK || !called {
		t.Fatalf("rate limiter blocked request")
	}
}
