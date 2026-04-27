	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
)

const (
	defaultHealthURL = "http://localhost:8081/health"
)

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(1)
	}

	cmd := os.Args[1]
	args := os.Args[2:]

	switch cmd {
	case "serve":
		serveCmd(args)
	case "health":
		healthCmd(args)
	case "migrate":
		migrateCmd(args)
	case "version":
		fmt.Println("ai-learning-platform CLI v0.1.0")
	default:
		usage()
		os.Exit(1)
	}
}

func usage() {
	fmt.Println(`Usage:
  cli serve            # start HTTP server using configs/config.yaml
  cli health [--url]   # check health endpoint (default: http://localhost:8081/health)
  cli migrate          # placeholder: test DB connection
  cli version          # show version`)
}

func serveCmd(args []string) {
	fs := flag.NewFlagSet("serve", flag.ExitOnError)
	host := fs.String("host", "", "override host (default from config)")
	port := fs.Int("port", 0, "override port (default from config)")
	_ = fs.Parse(args)

	cfg := config.Load()
	if *host != "" {
		cfg.Server.Host = *host
	}
	if *port != 0 {
		cfg.Server.Port = *port
	}

	application, cleanup, err := app.InitApp(cfg)
	if err != nil {
		log.Fatalf("init app failed: %v", err)
	}
	defer cleanup()

	srv := newServer(cfg, application)
	log.Printf("starting server at http://%s:%d", cfg.Server.Host, cfg.Server.Port)

	if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("server error: %v", err)
	}
}

func newServer(cfg *config.Config, application *app.Application) *http.Server {
	return &http.Server{
		Addr:         fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port),
		Handler:      application.Router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func healthCmd(args []string) {
	fs := flag.NewFlagSet("health", flag.ExitOnError)
	url := fs.String("url", defaultHealthURL, "health endpoint")
	_ = fs.Parse(args)

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(*url)
	if err != nil {
		log.Fatalf("health check failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Fatalf("health check not ok: status %d", resp.StatusCode)
	}
	fmt.Println("OK")
}

func migrateCmd(_ []string) {
	cfg := config.Load()
	// Reuse database init from app package to verify connection
	db, err := app.InitApp(cfg)
	if err != nil {
		log.Fatalf("failed to initialize app for migration: %v", err)
	}
	// Only ping DB; actual migrations should be added later.
	sqlDB, err := db.DB.DB()
	if err != nil {
		log.Fatalf("db handle error: %v", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if err := sqlDB.PingContext(ctx); err != nil {
		log.Fatalf("db ping failed: %v", err)
	}
	fmt.Println("DB connection OK (migration placeholder)")
	// Note: db cleanup is handled by app.InitApp cleanup; not invoked here as we only ping.
}
>>>>>>> cd232a3 (fix: 改进API处理器和测试)
package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
)

const (
	defaultHealthURL = "http://localhost:8081/health"
)

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(1)
	}

	cmd := os.Args[1]
	args := os.Args[2:]

	switch cmd {
	case "serve":
		serveCmd(args)
	case "health":
		healthCmd(args)
	case "migrate":
		migrateCmd(args)
	case "version":
		fmt.Println("ai-learning-platform CLI v0.1.0")
	default:
		usage()
		os.Exit(1)
	}
}

func usage() {
	fmt.Println(`Usage:
  cli serve            # start HTTP server using configs/config.yaml
  cli health [--url]   # check health endpoint (default: http://localhost:8081/health)
  cli migrate          # placeholder: test DB connection
  cli version          # show version`)
}

func serveCmd(args []string) {
	fs := flag.NewFlagSet("serve", flag.ExitOnError)
	host := fs.String("host", "", "override host (default from config)")
	port := fs.Int("port", 0, "override port (default from config)")
	_ = fs.Parse(args)

	cfg := config.Load()
	if *host != "" {
		cfg.Server.Host = *host
	}
	if *port != 0 {
		cfg.Server.Port = *port
	}

	application, cleanup, err := app.InitApp(cfg)
	if err != nil {
		log.Fatalf("init app failed: %v", err)
	}
	defer cleanup()

	srv := newServer(cfg, application)
	log.Printf("starting server at http://%s:%d", cfg.Server.Host, cfg.Server.Port)

	if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("server error: %v", err)
	}
}

func newServer(cfg *config.Config, application *app.Application) *http.Server {
	return &http.Server{
		Addr:         fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port),
		Handler:      application.Router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func healthCmd(args []string) {
	fs := flag.NewFlagSet("health", flag.ExitOnError)
	url := fs.String("url", defaultHealthURL, "health endpoint")
	_ = fs.Parse(args)

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(*url)
	if err != nil {
		log.Fatalf("health check failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Fatalf("health check not ok: status %d", resp.StatusCode)
	}
	fmt.Println("OK")
}

func migrateCmd(_ []string) {
	cfg := config.Load()
	// Reuse database init from app package to verify connection
	db, err := app.InitApp(cfg)
	if err != nil {
		log.Fatalf("failed to initialize app for migration: %v", err)
	}
	// Only ping DB; actual migrations should be added later.
	sqlDB, err := db.DB.DB()
	if err != nil {
		log.Fatalf("db handle error: %v", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if err := sqlDB.PingContext(ctx); err != nil {
		log.Fatalf("db ping failed: %v", err)
	}
	fmt.Println("DB connection OK (migration placeholder)")
	// Note: db cleanup is handled by app.InitApp cleanup; not invoked here as we only ping.
}
=======
	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/app"
	"github.com/SingcaiGorlan/ai_assisting_code_learningai-learning-platform/internal/pkg/config"
)

const (
	defaultHealthURL = "http://localhost:8081/health"
)

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(1)
	}

	cmd := os.Args[1]
	args := os.Args[2:]

	switch cmd {
	case "serve":
		serveCmd(args)
	case "health":
		healthCmd(args)
	case "migrate":
		migrateCmd(args)
	case "version":
		fmt.Println("ai-learning-platform CLI v0.1.0")
	default:
		usage()
		os.Exit(1)
	}
}

func usage() {
	fmt.Println(`Usage:
  cli serve            # start HTTP server using configs/config.yaml
  cli health [--url]   # check health endpoint (default: http://localhost:8081/health)
  cli migrate          # placeholder: test DB connection
  cli version          # show version`)
}

func serveCmd(args []string) {
	fs := flag.NewFlagSet("serve", flag.ExitOnError)
	host := fs.String("host", "", "override host (default from config)")
	port := fs.Int("port", 0, "override port (default from config)")
	_ = fs.Parse(args)

	cfg := config.Load()
	if *host != "" {
		cfg.Server.Host = *host
	}
	if *port != 0 {
		cfg.Server.Port = *port
	}

	application, cleanup, err := app.InitApp(cfg)
	if err != nil {
		log.Fatalf("init app failed: %v", err)
	}
	defer cleanup()

	srv := newServer(cfg, application)
	log.Printf("starting server at http://%s:%d", cfg.Server.Host, cfg.Server.Port)

	if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("server error: %v", err)
	}
}

func newServer(cfg *config.Config, application *app.Application) *http.Server {
	return &http.Server{
		Addr:         fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port),
		Handler:      application.Router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func healthCmd(args []string) {
	fs := flag.NewFlagSet("health", flag.ExitOnError)
	url := fs.String("url", defaultHealthURL, "health endpoint")
	_ = fs.Parse(args)

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(*url)
	if err != nil {
		log.Fatalf("health check failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Fatalf("health check not ok: status %d", resp.StatusCode)
	}
	fmt.Println("OK")
}

func migrateCmd(_ []string) {
	cfg := config.Load()
	// Reuse database init from app package to verify connection
	db, err := app.InitApp(cfg)
	if err != nil {
		log.Fatalf("failed to initialize app for migration: %v", err)
	}
	// Only ping DB; actual migrations should be added later.
	sqlDB, err := db.DB.DB()
	if err != nil {
		log.Fatalf("db handle error: %v", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if err := sqlDB.PingContext(ctx); err != nil {
		log.Fatalf("db ping failed: %v", err)
	}
	fmt.Println("DB connection OK (migration placeholder)")
	// Note: db cleanup is handled by app.InitApp cleanup; not invoked here as we only ping.
}