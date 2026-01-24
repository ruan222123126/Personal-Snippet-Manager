#!/bin/bash
#
# 文件监控脚本 - 检测代码变化并加入审查队列
#
# 使用方法: ./watch-and-queue.sh <监控目录>
#

set -euo pipefail

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
QUEUE_DIR="${PROJECT_ROOT}/.claude-duo/queue"
LOG_FILE="${PROJECT_ROOT}/.claude-duo/logs/watcher.log"

# 确保队列目录存在
mkdir -p "${QUEUE_DIR}"
mkdir -p "$(dirname "${LOG_FILE}")"

# 要监控的目录（从参数获取，默认为 src/app）
WATCH_DIR="${1:-${PROJECT_ROOT}/app}"

# 切换到项目根目录
cd "${PROJECT_ROOT}"

echo -e "${GREEN}👀 监控脚本启动${NC}"
echo -e "监控目录: ${BLUE}${WATCH_DIR}${NC}"
echo -e "队列目录: ${BLUE}${QUEUE_DIR}${NC}"
echo -e "日志文件: ${BLUE}${LOG_FILE}${NC}"
echo -e "${YELLOW}按 Ctrl+C 停止监控${NC}"
echo ""

# 记录日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "${LOG_FILE}"
}

# 将文件变化加入队列
queue_for_review() {
    local file="$1"
    local event="$2"

    # 只处理代码文件
    if [[ ! "$file" =~ \.(ts|tsx|js|jsx|prisma|css|json)$ ]]; then
        return
    fi

    # 跳过队列目录和日志目录
    if [[ "$file" =~ \.claude-duo/ ]]; then
        return
    fi

    # 跳过 node_modules
    if [[ "$file" =~ node_modules/ ]]; then
        return
    fi

    # 跳过 .next
    if [[ "$file" =~ \.next/ ]]; then
        return
    fi

    local timestamp=$(date +%s)
    local queue_file="${QUEUE_DIR}/${timestamp}.json"

    # 创建审查任务
    cat > "${queue_file}" << EOF
{
  "timestamp": "$(date -d @${timestamp} '+%Y-%m-%d %H:%M:%S')",
  "event": "${event}",
  "file": "${file}",
  "status": "pending"
}
EOF

    log "文件已加入队列: ${file} (${event})"
    echo -e "${GREEN}✓${NC} ${event}: ${file}"
}

# 检查是否安装了 inotifywait
if ! command -v inotifywait &> /dev/null; then
    echo -e "${YELLOW}⚠️  未安装 inotifywait，尝试安装...${NC}"

    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y inotify-tools
    elif command -v brew &> /dev/null; then
        brew install inotify-tools
    else
        echo -e "${YELLOW}❌ 无法自动安装 inotify-tools${NC}"
        echo -e "请手动安装后重试"
        exit 1
    fi
fi

log "监控启动: ${WATCH_DIR}"

# 使用 inotifywait 监控文件变化
inotifywait -m -r -e modify,create,delete,move \
    --format '%w%f %e' \
    "${WATCH_DIR}" | while read -r file event; do

    # 清理文件名中的额外空格
    file=$(echo "$file" | sed 's/ *$//')
    event=$(echo "$event" | sed 's/ *$//')

    queue_for_review "$file" "$event"
done
