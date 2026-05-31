# Sublime Text安装和使用

## 简介

Sublime Text 是一款跨平台的轻量级文本编辑器，以其极快的启动速度、流畅的操作体验和强大的扩展能力而闻名。它尤其适合配置文件编辑和快速文本处理。


## 安装

### macOS

```bash
# 1. 官网下载
open https://www.sublimetext.com

# 2. 或通过 Homebrew 安装
brew install --cask sublime-text
```

### Windows

下载安装包：https://www.sublimetext.com/download

### Linux (Ubuntu/Debian)

```bash
# 导入 GPG 密钥
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -

# 添加仓库
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list

# 安装
sudo apt-get update && sudo apt-get install sublime-text
```

## 核心特性

- **多光标编辑**：`Cmd + D` 选中多个相同内容同时编辑
- **命令面板**：`Cmd + Shift + P` 快速执行所有操作
- **Goto Anything**：`Cmd + P` 快速跳转到文件、符号或行
- ** minimap**：右侧代码缩略图，快速导航
- **分屏编辑**：支持多列/多行分屏同时编辑
- **Package Control**：包管理生态，数千个插件可用

## 常用插件

| 插件名 | 用途 |
|--------|------|
| Package Control | 插件管理器（必装） |
| SublimeLinter | 代码语法检查 |
| A File Icon | 文件图标美化 |
| BracketHighlighter | 括号高亮匹配 |
| GitGutter | Git 变更标记 |
| AutoFileName | 文件路径自动补全 |
| Theme - One Dark | 主题美化 |

## 使用场景

### 1. 文件编码转换

打开 GB2312、GB18030、BIG5、Shift_JIS 等编码的遗留文件，点击右下角编码菜单选择「Save with Encoding > UTF-8」即可完成转码。批量处理时配合 `ConvertToUTF8` 插件更高效，是统一项目编码的利器。

### 2. 配置文件编辑

编辑 YAML、JSON、TOML、INI 等配置文件时，语法高亮和折叠功能让结构一目了然。

### 3. 日志文件分析

打开超大日志文件（数百 MB）时，Sublime Text 比许多现代编辑器更快响应。

### 4. 文本批量处理

利用多光标和查找替换功能，处理 CSV、TSV 或格式化文本数据非常高效。

### 5. 笔记与写作

支持 Markdown 语法高亮和预览，适合快速记笔记和撰写技术文档。

### 6. 远程文件编辑

通过 SFTP 插件可直接编辑远程服务器文件，无需在服务器上安装编辑器。

## 快捷键速查

| 快捷键 | 功能 |
|--------|------|
| `Cmd + P` | 快速打开文件 |
| `Cmd + Shift + P` | 命令面板 |
| `Cmd + D` | 选中下一个相同词 |
| `Cmd + /` | 注释/取消注释 |
| `Cmd + J` | 合并行 |
| `Ctrl + Cmd + ↑/↓` | 向上/下交换行 |
| `Cmd + Shift + L` | 将选中行拆分为多光标 |
| `Cmd + Option + 1/2/3/4` | 分屏布局设置 |

## 注意事项

- Sublime Text 是付费软件，但可无限期免费评估（偶尔弹出购买提示，忽略即可）
- 建议第一时间安装 Package Control 以扩展功能
- 可通过 `Preferences > Settings` 编辑用户配置，推荐开启 `"draw_minimap": true` 和 `"font_size": 14`

## 链接

- [官网](https://www.sublimetext.com)
- [Package Control](https://packagecontrol.io)
- [非官方文档](https://sublime-text-unofficial-documentation.readthedocs.io)
