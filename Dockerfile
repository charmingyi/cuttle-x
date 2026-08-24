# CuttleX 自托管镜像。
#
# 构建:
#   docker build -t cuttlex .
# 运行（以 --local 模式跑 workerd，D1 用容器内 SQLite）:
#   docker run -d -p 8787:8787 --env-file .env cuttlex
#
# .env 内容:
#   CUTTLE_TOKEN=<管理密码>
#   CUTTLE_LINK_KEY=<至少 32 字节的独立密钥>
#   CUTTLE_PUBLIC_ORIGIN=<可选，公开域名>
#
# 数据持久化: 挂载 /app/.wrangler/state 保存 D1 数据库
FROM node:22-bookworm-slim AS build

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:22-bookworm-slim

WORKDIR /app
COPY --from=build /app ./

EXPOSE 8787

# workerd 需要较新的 glibc；bookworm-slim 满足要求
CMD ["node", "node_modules/wrangler/bin/wrangler.js", "dev", "--cwd", "dist/server", "--port", "8787", "--ip", "0.0.0.0", "--local"]
