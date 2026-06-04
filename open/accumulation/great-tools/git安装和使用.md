# Git 安装和使用

## 主要使用场景

### 个人开发

- **版本快照**：每次修改后提交一次，随时回退到任意历史版本
- **分支实验**：新建分支尝试新功能，失败了删掉分支即可，不影响主线
- **代码备份**：推送到远程仓库（GitHub/GitLab），换电脑也能拉回来

### 团队协作

- **并行开发**：多人同时在各自分支上工作，互不干扰
- **代码审查**：Pull Request / Merge Request 流程，合并前审查代码
- **冲突解决**：两人改了同一处代码，Git 标记冲突，手动确认后合并

### 开源与 CI/CD

- **开源协作**：Fork → 修改 → Pull Request 是 GitHub 协作的标准流程
- **自动部署**：Git push 触发 CI/CD 流水线（GitHub Actions、Jenkins），自动测试、构建、部署
- **版本发布**：用 Tag 标记版本号（`v1.0.0`），精准回溯每个发布版本

## 安装

### macOS

```bash
# 方式一：Homebrew（推荐）
brew install git

# 方式二：Xcode Command Line Tools
xcode-select --install
```

### Linux

```bash
# Ubuntu / Debian
sudo apt update && sudo apt install git

# CentOS / RHEL / Fedora
sudo yum install git
```

### Windows

从 [git-scm.com](https://git-scm.com/download/win) 下载安装包，一路默认安装即可。安装时勾选"Git Bash"和"将 Git 添加到 PATH"。

### 验证安装

```bash
git --version
# git version 2.x.x
```

## 初始配置

```bash
# 设置用户名和邮箱（提交记录会记录这些信息）
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 设置默认分支名
git config --global init.defaultBranch main

# 查看配置
git config --list
```

## 常用命令速览

### 本地操作

```bash
git init                             # 初始化仓库
git add <file>                       # 添加文件到暂存区
git add .                            # 添加所有改动到暂存区
git commit -m "提交说明"              # 提交暂存区的改动
git status                           # 查看工作区状态
git log --oneline                    # 查看提交历史（一行一个）
git diff                             # 查看工作区与暂存区的差异
```

### 分支操作

```bash
git branch <name>                    # 创建分支
git switch <name>                    # 切换分支
git switch -c <name>                 # 创建并切换分支
git merge <name>                     # 合并指定分支到当前分支
git branch -d <name>                 # 删除分支
```

### 远程操作

```bash
git clone <url>                      # 克隆远程仓库
git push origin <branch>             # 推送分支到远程
git pull                             # 拉取远程更新并合并
git remote -v                        # 查看远程仓库地址
```

### 撤销与回退

```bash
git restore <file>                   # 撤销工作区的修改
git restore --staged <file>          # 撤销暂存区
git reset --soft HEAD~1              # 撤销最近一次提交，保留改动
git reset --hard HEAD~1              # 撤销最近一次提交，丢弃改动
```

## 典型工作流程

```bash
# 1. 克隆或初始化
git clone https://github.com/user/repo.git
cd repo

# 2. 创建功能分支
git switch -c feature/my-feature

# 3. 开发、提交
# ...修改代码...
git add .
git commit -m "feat: 添加某某功能"

# 4. 合并回主分支
git switch main
git merge feature/my-feature

# 5. 推送到远程
git push origin main
```
