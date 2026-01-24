#!/bin/bash
#
# 安装双 Claude 系统依赖
#

set -euo pipefail

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}📦 安装双 Claude 系统依赖${NC}"
echo ""

# 检测系统
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo -e "${YELLOW}⚠️  无法检测操作系统${NC}"
    exit 1
fi

case "$OS" in
    ubuntu|debian)
        echo -e "${BLUE}检测到 Ubuntu/Debian 系统${NC}"
        echo ""
        echo "安装 inotify-tools 和 jq..."
        sudo apt-get update
        sudo apt-get install -y inotify-tools jq
        ;;

    fedora|rhel|centos)
        echo -e "${BLUE}检测到 Fedora/RHEL 系统${NC}"
        echo ""
        echo "安装 inotify-tools 和 jq..."
        sudo dnf install -y inotify-tools jq
        ;;

    arch|manjaro)
        echo -e "${BLUE}检测到 Arch Linux 系统${NC}"
        echo ""
        echo "安装 inotify-tools 和 jq..."
        sudo pacman -S inotify-tools jq
        ;;

    *)
        echo -e "${YELLOW}⚠️  未知的操作系统: $OS${NC}"
        echo "请手动安装: inotify-tools jq"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 验证安装
echo "验证安装:"
if command -v inotifywait &> /dev/null; then
    echo -e "  ${GREEN}✓${NC} inotifywait: $(which inotifywait)"
else
    echo -e "  ${YELLOW}✗${NC} inotifywait: 未找到"
fi

if command -v jq &> /dev/null; then
    echo -e "  ${GREEN}✓${NC} jq: $(which jq)"
else
    echo -e "  ${YELLOW}✗${NC} jq: 未找到"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}系统就绪！${NC}"
echo -e "${GREEN}运行启动命令: ${BLUE}./.claude-duo/start-duo.sh${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
