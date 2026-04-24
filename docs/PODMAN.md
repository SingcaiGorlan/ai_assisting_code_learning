# Podman 使用指南

适用于希望用 Podman（代替 Docker）启动本项目依赖服务的场景。

## 先决条件
- 已安装 Podman / Podman Desktop
- 已初始化并启动 Podman 虚拟机（Mac/Windows）
  ```bash
  podman machine init    # 首次
  podman machine start   # 每次使用前启动
  ```
- 已登录到项目目录：`/mnt/e/ai_assisting_code_learning`（WSL 请使用此路径）

## 启动依赖服务

```bash
cd /mnt/e/ai_assisting_code_learning
podman compose -f docker-compose.dev.yml up -d
```

> 说明：Podman 兼容 Compose v2，直接使用现有 `docker-compose.dev.yml` 即可，不需要额外转换。

查看状态：
```bash
podman ps
podman compose -f docker-compose.dev.yml ps
```

停止服务：
```bash
podman compose -f docker-compose.dev.yml down
```

## 常见问题

1) **找不到 compose 文件**
- 确认当前目录是项目根目录，或使用绝对路径：
  ```bash
  podman compose -f /mnt/e/ai_assisting_code_learning/docker-compose.dev.yml up -d
  ```

2) **Podman machine 未启动**
- 运行：`podman machine start`

3) **端口被占用**
- 修改 `docker-compose.dev.yml` 中的端口映射（5432/6379/9000/9001）或释放端口。

4) **权限问题（WSL 路径）**
- 建议在 WSL 的 Linux 路径下执行（如 `/mnt/e/...`）。

## 运行后端

依赖启动后，运行后端：
```bash
cd /mnt/e/ai_assisting_code_learning
$env:GOPROXY="https://goproxy.cn,direct"  # Windows/PowerShell 如需代理
powershell -ExecutionPolicy Bypass -File scripts/build.ps1   # 或 go build
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1     # 或 go run ./cmd/server
```

## 清理资源
```bash
podman compose -f docker-compose.dev.yml down -v
```

---
如需进一步改造成 Podman Kube/Quadlet 配置，请告知。