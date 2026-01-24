#!/bin/bash

# 任务完成桌面通知脚本
# 用法: ./task-notify.sh "标题" "消息" "级别"
# 级别: normal (绿色), warning (黄色), critical (红色)

# 获取脚本所在目录的父目录（项目根目录）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# 自动创建所需的目录结构
ensure_directories() {
  local dirs=(
    "$PROJECT_ROOT/task"
    "$PROJECT_ROOT/finish_task"
    "$PROJECT_ROOT/report"
    "$PROJECT_ROOT/.claude"
    "$PROJECT_ROOT/.claude-duo"
    "$PROJECT_ROOT/.claude-duo/queue"
  )

  for dir in "${dirs[@]}"; do
    if [ ! -d "$dir" ]; then
      mkdir -p "$dir" 2>/dev/null || true
    fi
  done
}

# 确保目录存在
ensure_directories

TITLE="${1:-任务通知}"
MESSAGE="${2:-任务已完成}"
LEVEL="${3:-normal}"

# 图标配置
ICON_SUCCESS="dialog-information"
ICON_WARNING="dialog-warning"
ICON_ERROR="dialog-error"

# 根据级别选择图标和颜色
case "$LEVEL" in
  "critical")
    ICON="$ICON_ERROR"
    URGENCY="critical"
    ;;
  "warning")
    ICON="$ICON_WARNING"
    URGENCY="normal"
    ;;
  *)
    ICON="$ICON_SUCCESS"
    URGENCY="normal"
    ;;
esac

# 检测可用的通知命令
if command -v notify-send &> /dev/null; then
  # Linux (libnotify)
  notify-send -i "$ICON" -u "$URGENCY" "$TITLE" "$MESSAGE"
elif command -v terminal-notifier &> /dev/null; then
  # macOS
  terminal-notifier -title "$TITLE" -message "$MESSAGE" -sound default
elif command -v osascript &> /dev/null; then
  # macOS (osascript)
  osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\" sound name \"Glass\""
else
  # 回退到 echo
  echo "[$TITLE] $MESSAGE"
fi
