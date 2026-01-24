#!/bin/bash

# Claude Code 模板 - 快速安装脚本
# 用法: curl -sSL https://your-repo/install.sh | bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     Claude Code 项目模板 - 快速安装向导                   ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 检测当前目录
CURRENT_DIR="$(pwd)"

echo -e "${BLUE}当前工作目录: ${GREEN}${CURRENT_DIR}${NC}"
echo ""

read -p "是否在此目录初始化 Claude Code 模板？(y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}已取消安装${NC}"
  exit 0
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}开始安装...${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 创建 .claude-templates 目录
if [ ! -d ".claude-templates" ]; then
  mkdir -p .claude-templates
  echo -e "${GREEN}✓ 已创建 .claude-templates 目录${NC}"
else
  echo -e "${YELLOW}⊙ .claude-templates 目录已存在${NC}"
fi

# 下载模板文件（这里假设模板文件已经在当前目录）
# 如果是从远程安装，需要添加 curl/wget 下载命令

echo ""
echo -e "${BLUE}正在初始化项目...${NC}"
echo ""

# 运行初始化脚本
if [ -f ".claude-templates/init-project.sh" ]; then
  bash .claude-templates/init-project.sh
else
  # 手动创建目录结构
  echo -e "${BLUE}创建项目目录结构...${NC}"

  mkdir -p task
  mkdir -p finish_task
  mkdir -p report
  mkdir -p .claude
  mkdir -p .claude-duo/queue

  echo -e "${GREEN}✓ 目录结构创建完成${NC}"
  echo ""
  echo -e "${YELLOW}⚠ 请手动复制模板文件到相应位置${NC}"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                     ✅ 安装完成！                          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}下一步操作:${NC}"
echo -e "1. 查看 ${GREEN}.claude-templates/README.md${NC} 了解详细使用说明"
echo -e "2. 定制 ${GREEN}CLAUDE.md${NC} 文件"
echo -e "3. 在 ${GREEN}task/${NC} 目录创建第一个任务文件"
echo -e "4. 开始使用 Claude Code 进行开发"
echo ""
