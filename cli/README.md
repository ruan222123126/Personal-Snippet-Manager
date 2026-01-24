# Personal Snippet Manager CLI

命令行工具，用于快速搜索和添加代码片段。

## 安装完成

所有依赖已安装：
- commander - 命令解析
- inquirer - 交互式问答
- chalk - 终端着色
- execa - 系统命令执行
- clipboardy - 剪贴板操作
- node-fetch - HTTP 客户端

## 使用方法

### 1. 启动开发服务器

```bash
npm run dev
```

服务器将运行在 `http://localhost:3002`

### 2. 搜索代码片段

```bash
node cli/index.js search [query]
# 或使用别名
node cli/index.js s [query]
```

- `query`（可选）：搜索关键词
- 命令会显示所有匹配的代码片段列表
- 使用方向键选择片段
- 按回车键将代码复制到剪贴板
- 支持跨平台剪贴板（包括 Linux Wayland）

### 3. 添加新代码片段

```bash
node cli/index.js add
# 或使用别名
node cli/index.js new
```

交互式流程：
1. 输入标题
2. 选择编程语言
3. 按回车打开编辑器（Vim/Nano/VS Code）输入代码
4. 输入标签（逗号分隔）

## 文件结构

```
cli/
├── index.js           # CLI 入口文件（search 和 add 命令）
├── api.js             # API 客户端（与 Next.js 通信）
├── utils/
│   └── clipboard.js   # 跨平台剪贴板工具
└── test.js            # 测试脚本
```

## 技术特性

- **跨平台剪贴板支持**：自动检测 Linux Wayland 并使用 wl-copy
- **系统编辑器集成**：使用 inquirer 的 editor 类型自动打开 $EDITOR
- **优雅的错误处理**：清晰的错误提示信息
- **彩色输出**：使用 chalk 提供友好的终端界面

## 常见问题

### 剪贴板在 Linux Wayland 下不工作

安装 `wl-clipboard`：

```bash
sudo apt install wl-clipboard
```

### 服务器连接失败

确保开发服务器正在运行：

```bash
npm run dev
```

### 测试 CLI 功能

```bash
node cli/test.js
```

这会测试 API 连接并显示使用说明。
