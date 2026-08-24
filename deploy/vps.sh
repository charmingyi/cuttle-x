#!/usr/bin/env bash
# =============================================================================
# CuttleX VPS 一键部署脚本（自托管，无需 Cloudflare 账户）
#
# 用法:
#   sudo bash deploy/vps.sh
#   sudo bash deploy/vps.sh --port 8787 --host example.com
#   sudo bash deploy/vps.sh --token <管理密码> --link-key <32+字节密钥>
#
# 原理:
#   项目运行在 Cloudflare Workers 运行时（workerd）上。VPS 部署使用
#   `wrangler dev` 启动本地 workerd 进程 —— 与 Cloudflare 线上行为一致，
#   D1 数据库落在本机 SQLite 文件（.wrangler/state），数据完全归你所有。
#
# 环境要求:
#   - Ubuntu / Debian / CentOS (x86_64)
#   - Node.js >= 22（脚本会自动安装）
#   - 64 位系统
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# 参数解析
# ---------------------------------------------------------------------------
PORT=8787
HOST="0.0.0.0"
APP_DIR="/opt/cuttlex"
ADMIN_TOKEN=""
LINK_KEY=""
PUBLIC_ORIGIN=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --port) PORT="$2"; shift 2 ;;
    --host) HOST="$2"; shift 2 ;;
    --dir) APP_DIR="$2"; shift 2 ;;
    --token) ADMIN_TOKEN="$2"; shift 2 ;;
    --link-key) LINK_KEY="$2"; shift 2 ;;
    --origin) PUBLIC_ORIGIN="$2"; shift 2 ;;
    -h|--help)
      grep '^#' "$0" | head -n 20 | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "未知参数: $1 (--help 查看用法)"; exit 1 ;;
  esac
done

# ---------------------------------------------------------------------------
# 0. 前置检查
# ---------------------------------------------------------------------------
if [[ $EUID -ne 0 ]]; then
  echo "✗ 请用 root 运行: sudo bash deploy/vps.sh"
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  apt-get update -y -qq && apt-get install -y -qq curl >/dev/null
fi

# ---------------------------------------------------------------------------
# 1. 安装 Node.js >= 22（若未安装或版本过旧）
# ---------------------------------------------------------------------------
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | sed 's/v//;s/\..*//')" -lt 22 ]]; then
  echo "→ 安装 Node.js 22 (LTS)..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
fi
if ! command -v pnpm >/dev/null 2>&1; then
  echo "→ 安装 pnpm..."
  npm install -g pnpm@11 >/dev/null 2>&1 || true
fi
echo "✓ Node $(node -v) / pnpm $(pnpm -v 2>/dev/null || echo 'n/a')"

# ---------------------------------------------------------------------------
# 2. 拉取代码（优先 git，失败时用 GitHub 压缩包）
# ---------------------------------------------------------------------------
REPO_URL="${CUTTLE_REPO_URL:-https://github.com/cuttle-x/cuttle-x.git}"
mkdir -p "$APP_DIR"
if [[ -d "$APP_DIR/.git" ]]; then
  echo "→ 已有代码，更新..."; git -C "$APP_DIR" pull --ff-only || true
else
  echo "→ 克隆仓库... $REPO_URL"
  if command -v git >/dev/null 2>&1; then
    git clone --depth 1 "$REPO_URL" "$APP_DIR"
  else
    apt-get install -y -qq git >/dev/null
    git clone --depth 1 "$REPO_URL" "$APP_DIR"
  fi
fi
cd "$APP_DIR"

# ---------------------------------------------------------------------------
# 3. 生成/读取密钥
# ---------------------------------------------------------------------------
if [[ -z "$ADMIN_TOKEN" ]]; then
  if [[ -f .dev.vars ]]; then
    ADMIN_TOKEN="$(grep -E '^CUTTLE_TOKEN=' .dev.vars | head -n1 | cut -d= -f2- || true)"
  fi
fi
if [[ -z "$LINK_KEY" ]]; then
  if [[ -f .dev.vars ]]; then
    LINK_KEY="$(grep -E '^CUTTLE_LINK_KEY=' .dev.vars | head -n1 | cut -d= -f2- || true)"
  fi
fi
if [[ -z "$ADMIN_TOKEN" ]]; then
  ADMIN_TOKEN="$(head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n')"
  echo "· 生成管理密码: $ADMIN_TOKEN （请记下，部署后用它登录）"
fi
if [[ -z "$LINK_KEY" ]]; then
  LINK_KEY="$(head -c 48 /dev/urandom | od -An -tx1 | tr -d ' \n')"
fi

cat > .dev.vars <<EOF
CUTTLE_TOKEN=$ADMIN_TOKEN
CUTTLE_LINK_KEY=$LINK_KEY
EOF
if [[ -n "$PUBLIC_ORIGIN" ]]; then
  cat >> .dev.vars <<EOF
CUTTLE_PUBLIC_ORIGIN=$PUBLIC_ORIGIN
EOF
fi
chmod 600 .dev.vars
echo "✓ 密钥已写入 $APP_DIR/.dev.vars"

# ---------------------------------------------------------------------------
# 4. 安装依赖并构建
# ---------------------------------------------------------------------------
echo "→ 安装依赖 (pnpm install)..."
pnpm install --frozen-lockfile >/dev/null 2>&1 || pnpm install >/dev/null
echo "→ 构建产物..."
pnpm run build >/dev/null

# ---------------------------------------------------------------------------
# 5. 应用 D1 本地迁移
# ---------------------------------------------------------------------------
echo "→ 初始化本地数据库 (d1 migrations apply)..."
npx wrangler d1 migrations apply DB --local >/dev/null 2>&1 || {
  # 若 dist/server 配置不含 D1，回退到根级配置
  npx wrangler d1 migrations apply DB --local >/dev/null
}
echo "✓ 迁移完成，数据目录: $APP_DIR/.wrangler/state"

# ---------------------------------------------------------------------------
# 6. 注册 systemd 服务（开机自启 + 崩溃自动重启）
# ---------------------------------------------------------------------------
SERVICE_NAME="cuttlex"
cat > "/etc/systemd/system/${SERVICE_NAME}.service" <<EOF
[Unit]
Description=CuttleX - Universal proxy node converter (local workerd)
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
ExecStart=$(command -v node) $(command -v npx) wrangler dev --cwd dist/server --port $PORT --ip $HOST --local
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
User=root

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "$SERVICE_NAME" >/dev/null 2>&1 || true
systemctl restart "$SERVICE_NAME"

# ---------------------------------------------------------------------------
# 7. 健康检查
# ---------------------------------------------------------------------------
echo "→ 等待服务启动..."
for i in $(seq 1 30); do
  if curl -sf -o /dev/null "http://127.0.0.1:$PORT/"; then break; fi
  sleep 1
  if [[ $i -eq 30 ]]; then
    echo "⚠ 服务未响应，查看日志: journalctl -u $SERVICE_NAME -f"
    exit 1
  fi
done

echo ""
echo "=========================================================="
echo " ✓ CuttleX 部署完成"
echo "   地址:     http://$HOST:$PORT/"
echo "   管理密码: $ADMIN_TOKEN"
echo "   数据目录: $APP_DIR/.wrangler/state"
echo "   日志:     journalctl -u $SERVICE_NAME -f"
echo "=========================================================="
echo ""
echo "反向代理（Nginx）示例（启用 HTTPS 时请替换域名与证书）:"
cat <<'EOF'
server {
  listen 80;
  server_name example.com;
  location / {
    proxy_pass http://127.0.0.1:8787;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
EOF
