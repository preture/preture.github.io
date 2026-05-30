# 操作指南

## 快速开始

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run preview   # 预览构建结果
```

## 内容管理

### 添加文章

在 `open/` 下对应分类/主题目录中创建 `.md` 文件：

**三级结构**（主题下直接放文章）：
```
open/accumulation/great-tools/my-article.md
```

**四级结构**（主题 → 方向 → 文章）：
```
open/accumulation/programming-foundation/python/python-special-symbols.md
```

文章标题从 Markdown 的第一个 `# ` 标题自动提取。

### 添加主题

编辑 `src/config/site.js`，在对应分类的 `topics` 数组中添加：

```js
{ id: 'my-topic', name: '我的主题', description: '主题描述' }
```

如需四级结构（含子方向），添加 `subTopics` 字段：

```js
{
  id: 'my-topic',
  name: '我的主题',
  description: '主题描述',
  subTopics: [
    { id: 'direction-a', name: '方向 A' },
  ],
}
```

## 评论系统（Giscus）

1. **启用 Discussions** — 仓库 → Settings → 找到 Discussions 区域 → 勾选并初始化
2. **安装 Giscus App** — 访问 https://github.com/apps/giscus → Install → 选择该仓库
3. **获取配置** — 访问 https://giscus.app，输入仓库名搜索，页面 → 讨论映射选 **pathname**，分类选 **Announcements**
4. **填入 `src/config/site.js`**：

```js
export const giscus = {
  repo: 'preture/preture.github.io',
  repoId: '你的 repoId',
  category: 'Announcements',
  categoryId: '你的 categoryId',
  mapping: 'pathname',
  lang: 'zh-CN',
}
```

## 访问统计

不蒜子统计默认开启（`busuanzi: true`），在 `src/config/site.js` 中关闭。

## 搜索

点击导航栏搜索图标或访问 `/#/search`，使用 Fuse.js 对文章标题和正文进行模糊搜索。

## 登录配置

### 配置用户

编辑 `src/config/auth.js`，添加用户名、密码哈希和角色：

```js
export const users = [
  { username: 'preture', passwordHash: '...', role: 'admin' },
]
```

### 生成密码哈希

```bash
# openssl
echo -n "你的密码" | openssl dgst -sha256

# 或 Node.js
node -e "console.log(require('crypto').createHash('sha256').update('你的密码').digest('hex'))"
```

### 配置分类级别

在 `src/config/site.js` 中为分类添加 `level` 字段：

```js
{ id: 'protected', level: 'protected', /* ... */ }
{ id: 'privated',  level: 'privated',  /* ... */ }
```

不设置 `level` 默认为 `open`。

`protected` 和 `privated` 内容均使用加密归档。

### 内容加密操作

使用脚本 `scripts/encrypt-markdown-files.sh` 操作：

```bash
# 在 protected/ 和 privated/ 下创建笔记后，加密：
./scripts/encrypt-markdown-files.sh encrypt

# 提交加密文件（不提交原始 markdown）
git add restricted-content.enc
git commit -m "update restricted content"
git push
```

在 GitHub 仓库 → **Settings → Secrets and variables → Actions** 添加 `HIDDEN_PASSWORD` 仓库 Secret，值为加密时使用的密码。

本地解密查看：

```bash
./scripts/encrypt-markdown-files.sh decrypt
```

## 部署

推送到 `main` 分支后，GitHub Actions 自动执行 `npm run build` 并将 `dist/` 部署到 Pages。工作流文件：`.github/workflows/deploy.yml`。
