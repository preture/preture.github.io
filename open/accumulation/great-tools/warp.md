# Warp安装和使用

## 简介

Warp 是一款基于 Rust 开发的现代化终端模拟器，内置 AI 命令搜索、智能补全、分屏编辑和 Git 集成等功能。在保留传统终端功能的同时，带来了类似 IDE 的编辑体验。

## 安装

### macOS

```bash
# 方式一：官网下载
open https://www.warp.dev

# 方式二：Homebrew
brew install --cask warp
```

### Linux

```bash
# 方式一：脚本安装
curl -fsSL https://app.warp.dev/download | bash

# 方式二：APT (Ubuntu/Debian)
wget -qO- https://releases.warp.dev/linux/keys/warp.asc | sudo gpg --dearmor -o /usr/share/keyrings/warp.gpg
echo "deb [signed-by=/usr/share/keyrings/warp.gpg] https://releases.warp.dev/linux/deb stable main" | sudo tee /etc/apt/sources.list.d/warp.list
sudo apt-get update && sudo apt-get install warp-terminal
```

### Windows

目前 Warp 仅支持 macOS 和 Linux。

## 核心特性

- **AI 命令搜索**：用自然语言描述想做的事，Warp AI 直接生成命令（`Cmd + '`）
- **智能补全**：输入时根据上下文和历史自动提示完整命令
- **分屏与窗格**：像 IDE 一样横向/纵向分屏，每个窗格独立运行
- **命令编辑器**：在如同文本编辑器的输入区中自由编辑多行命令
- **工作流保存**：将常用命令保存为可复用的工作流（Workflows）
- **输出区块**：每个命令的输出被划分为独立区块，可分别选中、复制、折叠
- **永久历史**：命令历史按时间线和会话组织，支持全文搜索
- **主题与自定义**：内置主题 + 自定义配色方案和字体的图形化配置界面
- **SSH 支持**：连接远程服务器同样享受 Warp 的编辑体验

## 使用场景

### 1. 日常命令行操作

替代系统自带终端，享受智能补全、命令编辑和输出区块管理带来的流畅体验。

### 2. 记不住命令时

使用 `Cmd + '` 打开 Warp AI，用中文描述需求（如「查看占用端口 3000 的进程」），AI 直接返回对应命令。

### 3. 多任务并行

通过分屏和窗格同时运行多个任务，比如一个窗格运行开发服务器、一个窗格查看日志、一个窗格执行 Git 操作。

### 4. 命令复用

将复杂的部署命令、Docker 操作或 Git 流程保存为 Workflow，下次一键运行，不再翻历史记录。

### 5. 回顾执行历史

在永久历史中按关键词搜索之前跑过的命令，快速找到当时的操作记录，比 `history | grep` 直观得多。

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Cmd + D` | 垂直分屏 |
| `Cmd + Shift + D` | 水平分屏 |
| `Cmd + '` | Warp AI 命令搜索 |
| `Cmd + T` | 新建标签页 |
| `Cmd + W` | 关闭当前窗格/标签页 |
| `Cmd + G` | 全局搜索历史命令 |
| `Ctrl + L` | 清屏 |
| `Cmd + [/]` | 切换标签页 |
| `Cmd + Shift + /` | 打开命令面板 |
| `Cmd + K` | 切换会话 |

## 注意事项

- Warp 需要登录账号才能使用 AI 功能和配置同步（基础终端功能无需登录）
- AI 功能基于 OpenAI，命令生成结果建议在运行前确认
- 由于使用 GPU 加速渲染，Warp 在老旧硬件上可能不如 Alacritty 等轻量终端流畅
- 默认快捷键与系统终端有差异，可在 Settings > Features 中调整

## 链接

- [官网](https://www.warp.dev)
- [文档](https://docs.warp.dev)
- [GitHub](https://github.com/warpdotdev/Warp)
