# 双 Claude 协作系统

让编码 Claude 自动启动监视和验证伙伴，实现实时代码审查。

---

## 🚀 快速开始

### 方式一：编码 Claude 自主启动（推荐）

**在编码终端运行：**
```bash
npm run duo
```

这会自动打开两个终端窗口：
- **终端 1**: 验证 Claude - 显示代码变更并等待审查
- **终端 2**: 文件监控 - 监控文件变化

**然后你就可以直接在当前终端开始工作了！**

---

### 方式二：手动启动各个组件

如果需要更细粒度的控制，可以单独启动各个组件：

```bash
# 只启动文件监控
./.claude-duo/watch-and-queue.sh app

# 只启动验证模式
./.claude-duo/reviewer-work.sh
```

---

## 📋 工作流程

```
┌─────────────────┐
│  编码 Claude    │ ← 你在这里工作
│  (当前终端)     │
│                 │
│  运行: npm duo  │ ← 启动监视系统
└────────┬────────┘
         │ 编辑文件
         ↓
┌─────────────────┐
│  文件监控       │ ← 自动检测变化
│  (自动启动)     │
└────────┬────────┘
         │ 加入队列
         ↓
┌─────────────────┐
│  验证 Claude    │ ← 实时审查代码
│  (自动启动)     │
└─────────────────┘
         │ 提供反馈
         └────────→ 你根据反馈调整
```

---

## 📁 目录结构

```
.claude-duo/
├── start-monitoring.sh    # 主启动脚本（编码 Claude 调用）
├── watch-and-queue.sh     # 文件监控脚本
├── reviewer-work.sh       # 验证 Claude 工作脚本
├── clean-queue.sh         # 清理队列脚本
├── install-deps.sh        # 安装依赖脚本
├── queue/                 # 审查任务队列
│   └── *.json            # 待审查的任务
├── logs/                  # 日志文件
│   ├── watcher.log       # 监控日志
│   └── reviewer.log      # 审查日志
└── .processed            # 已处理任务记录
```

---

## 🛠️ 使用方法

### 标准工作流程

1. **编码 Claude 启动监视系统**
   ```bash
   npm run duo
   ```

2. **在当前终端开始工作**
   - 这是编码 Claude 终端
   - 正常执行你的开发任务
   - 编辑代码文件

3. **查看审查结果**
   - 切换到"验证 Claude"终端
   - 查看代码变更和审查提示
   - 根据反馈调整代码

4. **停止监控**
   - 在"文件监控"终端按 `Ctrl+C`
   - 在"验证 Claude"终端按 `Ctrl+C`

### 首次使用 - 安装依赖

```bash
npm run duo:install
```

这会安装系统必需的工具：
- `inotify-tools` (inotifywait) - 文件监控
- `jq` - JSON 处理

---

## 🔧 高级用法

### 指定监控目录

```bash
# 监控特定目录
./.claude-duo/start-monitoring.sh /path/to/watch

# 或使用 npm script（需要修改脚本）
npm run duo -- /path/to/watch
```

### 清理队列

```bash
npm run duo:clean
# 或
./.claude-duo/clean-queue.sh
```

### 查看日志

```bash
# 监控日志
tail -f .claude-duo/logs/watcher.log

# 审查日志
tail -f .claude-duo/logs/reviewer.log
```

### 单独启动组件

**只启动文件监控**：
```bash
npm run duo:watch app
```

**只启动验证模式**：
```bash
npm run duo:review
```

---

## 📊 审查队列

### 队列文件格式

每个待审查的任务都是一个 JSON 文件：

```json
{
  "timestamp": "2026-01-24 10:30:45",
  "event": "MODIFY",
  "file": "/path/to/app/api/users.ts",
  "status": "pending"
}
```

### 事件类型

- `MODIFY` - 文件被修改
- `CREATE` - 文件被创建
- `DELETE` - 文件被删除
- `MOVED_FROM` - 文件被移出
- `MOVED_TO` - 文件被移入

---

## 🎯 验证 Claude 职责

当你在编码时，验证 Claude 会：

1. **监控代码变更** - 实时检测文件变化
2. **读取变更内容** - 显示修改的代码（带行号）
3. **提供审查反馈** - 检查：
   - 代码质量
   - 类型安全
   - 最佳实践
   - 潜在 bug
   - 安全问题
4. **改进建议** - 提供优化建议

---

## ⚙️ 系统要求

### 必需工具

- `inotifywait` (inotify-tools) - 文件监控
- `jq` - JSON 处理

### 安装依赖

**Ubuntu/Debian**：
```bash
npm run duo:install
# 或手动安装
sudo apt-get update
sudo apt-get install -y inotify-tools jq
```

**macOS**：
```bash
brew install inotify-tools jq
```

### 支持的终端

- gnome-terminal
- xfce4-terminal
- konsole
- xterm

---

## 🐛 故障排除

### 问题：inotifywait 未找到

**解决方案**：
```bash
npm run duo:install

# 或手动安装
sudo apt-get install inotify-tools
```

### 问题：监控不工作

**检查**：
1. 确认监控目录路径正确
2. 检查文件权限
3. 查看日志文件
```bash
tail -f .claude-duo/logs/watcher.log
```

### 问题：队列积压

**解决方案**：
```bash
npm run duo:clean
```

### 问题：终端未正确启动

**检查**：
1. 确认系统支持检测到的终端类型
2. 手动指定终端类型
3. 查看终端错误输出

---

## 💡 最佳实践

1. **编码前启动** - 开始重要功能前，先运行 `npm run duo` 启动监视
2. **定期清理队列** - 避免队列文件过多
3. **查看日志** - 了解监控和审查历史
4. **适当使用** - 在重要功能开发时使用，日常简单修改可以关闭
5. **及时反馈** - 验证 Claude 发现问题后，及时修复

---

## 📝 自定义配置

### 修改监控目录

编辑 `start-monitoring.sh` 或在启动时指定：

```bash
./.claude-duo/start-monitoring.sh /custom/path
```

### 修改文件过滤器

编辑 `watch-and-queue.sh` 中的文件类型检查：

```bash
# 只处理代码文件
if [[ ! "$file" =~ \.(ts|tsx|js|jsx|prisma|css|json)$ ]]; then
    return
fi
```

### 添加更多监控路径

修改 `start-monitoring.sh` 中的 `WATCH_DIR` 默认值：

```bash
WATCH_DIR="${1:-${PROJECT_ROOT}/app}"
# 改为
WATCH_DIR="${1:-${PROJECT_ROOT}}"
# 监控整个项目
```

---

## 🎉 使用示例

### 场景 1: 开发新功能

```bash
# 1. 启动监视系统
npm run duo

# 2. 开始工作（在当前终端）
# "实现用户认证功能"

# 3. 切换到验证终端查看审查结果
# 4. 根据反馈调整代码
```

### 场景 2: 代码重构

```bash
# 1. 启动系统
npm run duo

# 2. 开始重构
# "重构 API 路由结构"

# 3. 实时查看重构的影响
# 4. 确保没有引入问题
```

### 场景 3: Bug 修复

```bash
# 1. 启动系统
npm run duo

# 2. 修复 Bug
# "修复登录验证的边界情况"

# 3. 验证修复没有引入新问题
```

---

## 🔍 与旧版本的区别

### 旧版本（start-duo.sh）
- 会打开三个终端（编码 + 验证 + 监控）
- 需要在特定终端工作

### 新版本（start-monitoring.sh）
- **只打开两个终端**（验证 + 监控）
- **当前终端就是编码终端**
- **编码 Claude 自主控制何时启动监视**
- 更灵活，更符合实际工作流程

---

## 📄 许可

此工具是 Personal Snippet Manager 项目的一部分。

---

**愉快地编码！🚀**
