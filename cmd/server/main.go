package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/logger"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Initialize logger
	logger.Init(cfg.Log)

	// Create application
	application, cleanup, err := app.InitApp(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize application: %v", err)
	}
	defer cleanup()

	// Start HTTP server
	srv := &http.Server{
		Addr:         fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port),
		Handler:      application.Router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		displayHost := cfg.Server.Host
		if displayHost == "0.0.0.0" {
			displayHost = "localhost"
		}
		logger.Info(fmt.Sprintf("Server started at http://%s:%d", displayHost, cfg.Server.Port))
		logger.Info(fmt.Sprintf("Running mode: %s", cfg.Server.Mode))

		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}


	}()

	<-quit
	logger.Info("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("Failed to shutdown server")
	}

	logger.Info("Server stopped")
}
