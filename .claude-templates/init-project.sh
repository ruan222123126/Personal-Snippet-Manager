#!/bin/bash

# Claude Code 项目模板一键初始化脚本
# 用法: bash init-project.sh [项目名称]

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║        Claude Code 项目模板 - 自动初始化工具               ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 项目名称（可选）
PROJECT_NAME="${1:-$(basename "$PROJECT_ROOT")}"

echo -e "${BLUE}项目名称: ${GREEN}${PROJECT_NAME}${NC}"
echo -e "${BLUE}项目路径: ${GREEN}${PROJECT_ROOT}${NC}"
echo ""

# 创建目录函数
create_directory() {
  local dir="$1"
  local description="$2"

  if [ -d "$dir" ]; then
    echo -e "${YELLOW}⊙ 已存在${NC} $description ($dir)"
  else
    mkdir -p "$dir"
    echo -e "${GREEN}✓ 已创建${NC} $description ($dir)"
  fi
}

# 复制文件函数
copy_file() {
  local src="$1"
  local dst="$2"
  local description="$3"

  if [ -f "$dst" ]; then
    echo -e "${YELLOW}⊙ 已存在${NC} $description ($dst)"
    read -p "  是否覆盖？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      cp "$src" "$dst"
      echo -e "${GREEN}  ✓ 已更新${NC}"
    fi
  else
    cp "$src" "$dst"
    echo -e "${GREEN}✓ 已复制${NC} $description"
  fi
}

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}第 1 步: 创建项目目录结构${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 任务管理目录
create_directory "$PROJECT_ROOT/task" "待处理任务目录"
create_directory "$PROJECT_ROOT/finish_task" "已完成任务目录"
create_directory "$PROJECT_ROOT/report" "完成报告目录"

# Claude 配置目录
create_directory "$PROJECT_ROOT/.claude" "Claude 配置目录"
create_directory "$PROJECT_ROOT/.claude-duo" "双 Claude 协作系统目录"
create_directory "$PROJECT_ROOT/.claude-duo/queue" "审查队列目录"

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}第 2 步: 复制模板文件${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 复制通知脚本
if [ -f "$SCRIPT_DIR/task-notify.sh" ]; then
  copy_file "$SCRIPT_DIR/task-notify.sh" "$PROJECT_ROOT/.claude/task-notify.sh" "通知脚本"
  chmod +x "$PROJECT_ROOT/.claude/task-notify.sh"
fi

# 复制 CLAUDE.md 模板
if [ -f "$SCRIPT_DIR/CLAUDE-template.md" ]; then
  if [ ! -f "$PROJECT_ROOT/CLAUDE.md" ]; then
    cp "$SCRIPT_DIR/CLAUDE-template.md" "$PROJECT_ROOT/CLAUDE.md"
    echo -e "${GREEN}✓ 已创建${NC} CLAUDE.md 模板"
    echo -e "${YELLOW}  ⚠ 请根据项目定制 CLAUDE.md 文件${NC}"
  else
    echo -e "${YELLOW}⊙ 已存在${NC} CLAUDE.md (跳过，避免覆盖现有配置)"
  fi
fi

# 复制双 Claude 系统脚本
if [ -f "$SCRIPT_DIR/duo-system-template.sh" ]; then
  copy_file "$SCRIPT_DIR/duo-system-template.sh" "$PROJECT_ROOT/.claude-duo/start-monitoring.sh" "双 Claude 监控脚本"
  chmod +x "$PROJECT_ROOT/.claude-duo/start-monitoring.sh"
fi

# 复制检查清单模板
if [ -f "$SCRIPT_DIR/checklist-template.md" ]; then
  copy_file "$SCRIPT_DIR/checklist-template.md" "$PROJECT_ROOT/.claude/checklist.md" "检查清单模板"
fi

# 复制报告模板
if [ -f "$SCRIPT_DIR/report-template.md" ]; then
  copy_file "$SCRIPT_DIR/report-template.md" "$PROJECT_ROOT/.claude/report-template.md" "报告模板"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}第 3 步: 检查并更新 package.json${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

PACKAGE_JSON="$PROJECT_ROOT/package.json"

if [ -f "$PACKAGE_JSON" ]; then
  # 检查是否已包含 duo 脚本
  if grep -q '"duo":' "$PACKAGE_JSON"; then
    echo -e "${YELLOW}⊙ package.json 已包含 duo 脚本${NC}"
  else
    echo -e "${GREEN}✓ 找到 package.json${NC}"
    echo -e "${YELLOW}  ⚠ 建议手动添加以下脚本到 package.json:${NC}"
    echo ""
    cat "$SCRIPT_DIR/duo-package.json"
    echo ""
  fi
else
  echo -e "${YELLOW}⊙ 未找到 package.json${NC}"
  echo -e "${YELLOW}  如果项目使用 Node.js，请创建 package.json 并添加以下脚本:${NC}"
  echo ""
  cat "$SCRIPT_DIR/duo-package.json"
  echo ""
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}第 4 步: 测试通知系统${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -f "$PROJECT_ROOT/.claude/task-notify.sh" ]; then
  echo -e "${BLUE}正在测试桌面通知...${NC}"
  "$PROJECT_ROOT/.claude/task-notify.sh" "✅ 初始化完成" "Claude Code 项目模板已成功安装" "normal" 2>/dev/null || true
  echo -e "${GREEN}✓ 通知系统测试完成${NC} (如果未看到通知，请检查系统配置)"
else
  echo -e "${YELLOW}⊙ 通知脚本未安装${NC}"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                     ✅ 初始化完成！                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}后续步骤:${NC}"
echo -e "1. ${YELLOW}定制 CLAUDE.md${NC} - 根据项目需求调整文档内容"
echo -e "2. ${YELLOW}创建第一个任务${NC} - 在 task/ 目录添加任务文件"
echo -e "3. ${YELLOW}开始工作${NC} - 使用 Claude Code 进行开发"
echo ""
echo -e "${BLUE}目录结构:${NC}"
echo -e "  ${GREEN}task/${NC}         - 待处理任务"
echo -e "  ${GREEN}finish_task/${NC}  - 已完成任务"
echo -e "  ${GREEN}report/${NC}       - 完成报告"
echo -e "  ${GREEN}.claude/${NC}      - Claude 配置和工具"
echo -e "  ${GREEN}.claude-duo/${NC}  - 双 Claude 协作系统"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
