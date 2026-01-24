#!/bin/bash
#
# 验证 Claude 工作脚本
#
# 这个脚本会持续监控审查队列，并提供代码审查反馈
#

set -euo pipefail

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
QUEUE_DIR="${PROJECT_ROOT}/.claude-duo/queue"
LOG_FILE="${PROJECT_ROOT}/.claude-duo/logs/reviewer.log"
PROCESSED_FILE="${PROJECT_ROOT}/.claude-duo/.processed"

# 确保目录存在
mkdir -p "${QUEUE_DIR}"
mkdir -p "$(dirname "${LOG_FILE}")"

# 初始化已处理文件记录
touch "${PROCESSED_FILE}"

echo -e "${CYAN}🔍 验证 Claude 工作脚本${NC}"
echo -e "队列目录: ${BLUE}${QUEUE_DIR}${NC}"
echo -e "日志文件: ${BLUE}${LOG_FILE}${NC}"
echo -e "${YELLOW}----------------------------------------${NC}"
echo -e "${YELLOW}你现在处于验证模式${NC}"
echo -e "${YELLOW}职责:${NC}"
echo -e "  1. 监控队列中的新文件"
echo -e "  2. 阅读并审查代码变更"
echo -e "  3. 指出潜在问题"
echo -e "  4. 提供改进建议"
echo -e "${YELLOW}----------------------------------------${NC}"
echo ""

# 记录日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "${LOG_FILE}"
}

# 检查是否有新的审查任务
check_queue() {
    local found=false

    # 查找待处理的任务
    for queue_file in "${QUEUE_DIR}"/*.json; do
        # 检查队列文件是否存在（避免 *.json 扩展名问题）
        [ -e "$queue_file" ] || continue

        local filename=$(basename "$queue_file")

        # 检查是否已处理
        if grep -qx "$filename" "${PROCESSED_FILE}" 2>/dev/null; then
            continue
        fi

        found=true

        # 读取任务信息
        local event=$(jq -r '.event' "$queue_file" 2>/dev/null || echo "UNKNOWN")
        local file=$(jq -r '.file' "$queue_file" 2>/dev/null || echo "unknown")

        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}📋 新的审查任务${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "事件: ${BLUE}${event}${NC}"
        echo -e "文件: ${BLUE}${file}${NC}"
        echo -e "时间: $(jq -r '.timestamp' "$queue_file" 2>/dev/null || echo 'unknown')"
        echo ""

        # 检查文件是否存在
        if [ -f "$file" ]; then
            echo -e "${YELLOW}📄 文件内容:${NC}"
            echo -e "${YELLOW}----------------------------------------${NC}"

            # 显示文件内容（带行号）
            nl -ba "$file" | head -50

            local lines=$(wc -l < "$file")
            if [ $lines -gt 50 ]; then
                echo ""
                echo -e "${YELLOW}... (还有 $((lines - 50)) 行)${NC}"
            fi

            echo ""
            echo -e "${YELLOW}----------------------------------------${NC}"
        else
            echo -e "${RED}⚠️  文件不存在或已被删除${NC}"
        fi

        # 标记为已处理
        echo "$filename" >> "${PROCESSED_FILE}"

        log "已处理任务: ${filename} (${event}: ${file})"

        echo ""
        echo -e "${CYAN}💭 请审查上述代码并提供反馈${NC}"
        echo -e "${CYAN}检查项:${NC}"
        echo -e "  • 代码质量"
        echo -e "  • 类型安全"
        echo -e "  • 最佳实践"
        echo -e "  • 潜在 bug"
        echo -e "  • 安全问题"
        echo ""
        echo -e "${YELLOW}按 Enter 继续监控下一个任务...${NC}"
        read -r
    done

    if [ "$found" = false ]; then
        echo -e "${BLUE}⏸️  等待新的代码变更...${NC}  $(date '+%H:%M:%S')" $'\r'
        sleep 2
    fi
}

log "验证 Claude 启动"

# 主循环
echo -e "${GREEN}✅ 开始监控审查队列${NC}"
echo ""

while true; do
    check_queue
done
