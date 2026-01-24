#!/bin/bash
#
# 双 Claude 启动脚本
#
# 同时启动两个终端窗口：
# - 终端 1: 编码 Claude (正常工作)
# - 终端 2: 验证 Claude (监控代码变化)
#

set -euo pipefail

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WATCHER_SCRIPT="${PROJECT_ROOT}/.claude-duo/watch-and-queue.sh"
REVIEWER_SCRIPT="${PROJECT_ROOT}/.claude-duo/reviewer-work.sh"

echo -e "${CYAN}🚀 双 Claude 协作系统启动器${NC}"
echo ""

# 检查脚本是否存在
if [ ! -f "$WATCHER_SCRIPT" ]; then
    echo -e "${YELLOW}❌ 监控脚本不存在: ${WATCHER_SCRIPT}${NC}"
    exit 1
fi

if [ ! -f "$REVIEWER_SCRIPT" ]; then
    echo -e "${YELLOW}❌ 验证脚本不存在: ${REVIEWER_SCRIPT}${NC}"
    exit 1
fi

# 获取监控目录（参数或默认值）
WATCH_DIR="${1:-${PROJECT_ROOT}/app}"

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}配置信息${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "项目目录: ${BLUE}${PROJECT_ROOT}${NC}"
echo -e "监控目录: ${BLUE}${WATCH_DIR}${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 检测终端类型
if command -v gnome-terminal &> /dev/null; then
    TERMINAL="gnome-terminal"
elif command -v xfce4-terminal &> /dev/null; then
    TERMINAL="xfce4-terminal"
elif command -v konsole &> /dev/null; then
    TERMINAL="konsole"
elif command -v xterm &> /dev/null; then
    TERMINAL="xterm"
else
    echo -e "${YELLOW}⚠️  未检测到支持的终端${NC}"
    echo -e "支持的终端: gnome-terminal, xfce4-terminal, konsole, xterm"
    exit 1
fi

echo -e "${GREEN}检测到终端: ${BLUE}${TERMINAL}${NC}"
echo ""

# 启动函数
start_terminals() {
    case "$TERMINAL" in
        gnome-terminal)
            # 终端 1 - 验证 Claude (监控模式)
            gnome-terminal --title="验证 Claude - 代码审查" -- bash -c "cd '${PROJECT_ROOT}' && '${REVIEWER_SCRIPT}'; exec bash"

            # 等待一下让第一个终端启动
            sleep 1

            # 终端 2 - 监控脚本
            gnome-terminal --title="文件监控" -- bash -c "cd '${PROJECT_ROOT}' && '${WATCHER_SCRIPT}' '${WATCH_DIR}'; exec bash"

            # 等待一下
            sleep 1

            # 终端 3 - 编码 Claude (当前终端)
            echo -e "${GREEN}✓ 验证 Claude 终端已启动${NC}"
            echo -e "${GREEN}✓ 文件监控终端已启动${NC}"
            echo ""
            echo -e "${CYAN}➤ 当前终端现在是编码 Claude${NC}"
            echo -e "${YELLOW}  你可以开始工作了，另一个 Claude 会监控你的代码变化${NC}"
            ;;

        xfce4-terminal)
            # 终端 1 - 验证 Claude
            xfce4-terminal --title="验证 Claude - 代码审查" -e "bash -c 'cd \"${PROJECT_ROOT}\" && \"${REVIEWER_SCRIPT}\"; exec bash'"

            sleep 1

            # 终端 2 - 监控脚本
            xfce4-terminal --title="文件监控" -e "bash -c 'cd \"${PROJECT_ROOT}\" && \"${WATCHER_SCRIPT}\" \"${WATCH_DIR}\"; exec bash'"

            sleep 1

            echo -e "${GREEN}✓ 验证 Claude 终端已启动${NC}"
            echo -e "${GREEN}✓ 文件监控终端已启动${NC}"
            echo ""
            echo -e "${CYAN}➤ 当前终端现在是编码 Claude${NC}"
            ;;

        konsole)
            # 终端 1 - 验证 Claude
            konsole --new-tab -p tabtitle="验证 Claude - 代码审查" -e bash -c "cd '${PROJECT_ROOT}' && '${REVIEWER_SCRIPT}'; exec bash"

            sleep 1

            # 终端 2 - 监控脚本
            konsole --new-tab -p tabtitle="文件监控" -e bash -c "cd '${PROJECT_ROOT}' && '${WATCHER_SCRIPT}' '${WATCH_DIR}'; exec bash"

            sleep 1

            echo -e "${GREEN}✓ 验证 Claude 终端已启动${NC}"
            echo -e "${GREEN}✓ 文件监控终端已启动${NC}"
            echo ""
            echo -e "${CYAN}➤ 当前终端现在是编码 Claude${NC}"
            ;;

        xterm)
            # 终端 1 - 验证 Claude
            xterm -title "验证 Claude - 代码审查" -e "bash -c 'cd \"${PROJECT_ROOT}\" && \"${REVIEWER_SCRIPT}\"; exec bash'" &

            sleep 1

            # 终端 2 - 监控脚本
            xterm -title "文件监控" -e "bash -c 'cd \"${PROJECT_ROOT}\" && \"${WATCHER_SCRIPT}\" \"${WATCH_DIR}\"; exec bash'" &

            sleep 1

            echo -e "${GREEN}✓ 验证 Claude 终端已启动${NC}"
            echo -e "${GREEN}✓ 文件监控终端已启动${NC}"
            echo ""
            echo -e "${CYAN}➤ 当前终端现在是编码 Claude${NC}"
            ;;
    esac
}

# 启动终端
start_terminals

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}系统已启动${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}工作流程:${NC}"
echo -e "  1. 在这个终端 (编码 Claude) 开始工作"
echo -e "  2. 文件监控会检测变化并加入队列"
echo -e "  3. 验证 Claude 会自动审查代码"
echo -e "  4. 根据反馈调整代码"
echo ""
echo -e "${YELLOW}停止监控:${NC}"
echo -e "  在监控终端按 Ctrl+C"
echo ""
echo -e "${YELLOW}查看日志:${NC}"
echo -e "  监控日志: ${BLUE}.claude-duo/logs/watcher.log${NC}"
echo -e "  审查日志: ${BLUE}.claude-duo/logs/reviewer.log${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
