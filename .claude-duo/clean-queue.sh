#!/bin/bash
#
# 清理审查队列
#

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
QUEUE_DIR="${PROJECT_ROOT}/.claude-duo/queue"
PROCESSED_FILE="${PROJECT_ROOT}/.claude-duo/.processed"

echo "清理审查队列..."

# 清空队列
rm -rf "${QUEUE_DIR}"/*.json 2>/dev/null || true

# 清空已处理记录
> "${PROCESSED_FILE}"

echo "✓ 队列已清理"
