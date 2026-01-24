# --- 1. 依赖安装层 ---
FROM node:20-alpine AS deps
# 安装构建工具和 libc6-compat 以适配 Prisma 引擎
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# 复制依赖文件
COPY package.json package-lock.json ./
# 仅安装依赖 (CI 模式更稳定)
RUN npm ci

# --- 2. 构建源码层 ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 禁用 Next.js 的遥测数据收集
ENV NEXT_TELEMETRY_DISABLED 1

# 生成 Prisma Client
RUN npx prisma generate
# 构建 Next.js 应用
RUN npm run build

# --- 3. 生产运行层 ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# 创建非 root 用户 (安全最佳实践)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制所有 node_modules
COPY --from=builder /app/node_modules ./node_modules
# 复制 public 目录
COPY --from=builder /app/public ./public
# 复制 prisma 目录
COPY --from=builder /app/prisma ./prisma

# 自动创建 .next 目录并设置权限
RUN mkdir .next

# 关键：复制 standalone 文件夹
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

EXPOSE 3000

# 启动命令：使用本地安装的 Prisma CLI 进行迁移，然后启动服务
CMD ["/bin/sh", "-c", "node ./node_modules/prisma/build/index.js migrate deploy && node server.js"]
