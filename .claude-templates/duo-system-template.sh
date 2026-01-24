#!/bin/bash

# 双 Claude 协作系统 - 启动脚本模板
# 此脚本需要根据项目需求定制

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REVIEW_QUEUE_DIR="$PROJECT_DIR/.claude-duo/queue"
WATCH_DIR="$PROJECT_DIR"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== 双 Claude 协作系统 ===${NC}"
echo ""

# 检查依赖
check_dependencies() {
  local missing_deps=()

  if ! command -v inotifywait &> /dev/null; then
    missing_deps+=("inotify-tools")
  fi

  if ! command -v jq &> /dev/null; then
    missing_deps+=("jq")
  fi

  if [ ${#missing_deps[@]} -ne 0 ]; then
    echo -e "${RED}缺少依赖: ${missing_deps[*]}${NC}"
    echo "请运行: npm run duo:install"
    exit 1
  fi
}

# 创建所有必需的目录
setup_directories() {
  local dirs=(
    "$REVIEW_QUEUE_DIR"
    "$PROJECT_DIR/task"
    "$PROJECT_DIR/finish_task"
    "$PROJECT_DIR/report"
    "$PROJECT_DIR/.claude"
  )

  echo -e "${BLUE}创建项目目录结构...${NC}"
  for dir in "${dirs[@]}"; do
    if [ ! -d "$dir" ]; then
      mkdir -p "$dir"
      echo -e "${GREEN}  ✓ 已创建: $dir${NC}"
    else
      echo -e "${YELLOW}  ⊙ 已存在: $dir${NC}"
    fi
  done
  echo ""
}

# 启动文件监控
start_file_monitor() {
  echo -e "${GREEN}→ 启动文件监控...${NC}"

  inotifywait -m -r -e modify,create,delete \
    --include '\.(ts|tsx|js|jsx|json)$' \
    --format '%w%f %T' \
    --timefmt '%H:%M:%S' \
    "$WATCH_DIR" 2>/dev/null | while read -r file time; do

    # 跳过队列目录和 node_modules
    if [[ "$file" == *".claude-duo/queue"* ]] || [[ "$file" == *"node_modules"* ]]; then
      continue
    fi

    echo "[$time] 检测到变更: $file"

    # 生成变更 ID
    local change_id="$(date +%s)-$$"
    local review_file="$REVIEW_QUEUE_DIR/${change_id}.json"

    # 读取文件内容
    local content=$(cat "$file" 2>/dev/null || echo "")

    # 创建审查记录
    jq -n \
      --arg id "$change_id" \
      --arg file "$file" \
      --arg time "$time" \
      --arg content "$content" \
      '{
        id: $id,
        file: $file,
        time: $time,
        content: $content,
        status: "pending"
      }' > "$review_file"

    echo -e "${GREEN}  → 已加入审查队列: $change_id${NC}"
  done
}

# 主函数
main() {
  check_dependencies
  setup_directories

  echo -e "${YELLOW}提示: 使用 Ctrl+C 停止监控${NC}"
  echo ""

  start_file_monitor
}

# 启动监控
main
