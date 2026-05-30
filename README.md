# preture.github.io

个人技术博客与项目展示站点，基于 Vue 3 + Vite 构建，通过 GitHub Pages 自动部署。内容使用 Markdown 编写，按模块归类，展示在编程、AI、项目实践等方面的积累与探索。

---

## 信息架构

```
首页（/）
├── 厚积薄发                  ← 分类页
│   ├── 编程筑基              ← 主题页，含多个方向
│   ├── 利器清单              ← 主题页，直接含文章
│   ├── AI 工具箱
│   └── 自建 AI 助手
├── 如虎添翼
│   ├── AI 实战
│   ├── AI 辅助编程
│   └── AI 创作工坊
├── 身体力行
│   ├── 家庭数据中心
│   ├── 第二大脑
│   ├── 媒体资源库
│   └── 移动工具箱
├── 心之所向
│   ├── 数字世界构建
│   ├── 历史穿越创作
│   ├── 古籍数字化
│   └── 甲骨文探秘
└── 隐藏空间（需登录）
    └── 私人笔记
```

### 内容模型

```
站点
 └── 分类（Category）        — 4 + 1 个：厚积薄发 / 如虎添翼 / 身体力行 / 心之所向 / 隐藏空间
      ├── 名称
      ├── Emoji 图标
      ├── 描述
      └── 主题（Topic）      — 每个分类下若干主题
           ├── 标题
           ├── 摘要
           └── 文章（Article）— 或子方向（SubTopic）→ 文章
```

### 页面类型

| 页面 | 说明 | URL 示例 |
|------|------|----------|
| 首页 | Hero + 分类概览卡片 | `/#/` |
| 分类页 | 分类下的主题列表 | `/#/accumulation` |
| 主题页 | 主题下的子方向/文章列表 | `/#/accumulation/programming-foundation` |
| 文章页 | Markdown 全文 | `/#/accumulation/.../article-slug` |
| 搜索页 | 全文检索 | `/#/search` |

---

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Vue 3 (Composition API, `<script setup>`) |
| 构建 | Vite 6 |
| 路由 | vue-router (hash 模式，兼容 GitHub Pages) |
| 内容 | Markdown (`markdown-it` + `highlight.js`) |
| 搜索 | Fuse.js (客户端全文检索) |
| 评论 | Giscus (GitHub Discussions) |
| 统计 | 不蒜子 |
| 部署 | GitHub Actions → GitHub Pages |

---

## 目录结构

```
src/
├── main.js                        # 入口
├── App.vue                        # 布局外壳（header / footer / 登录 / 主题切换）
├── assets/
│   ├── main.css                   # 全局样式
│   └── themes.css                 # 4 套主题 × 2 种模式 (light/dark)
├── config/
│   ├── site.js                    # 分类/主题元数据 + Giscus + 不蒜子配置
│   └── auth.js                    # 后台登录用户配置
├── composables/
│   └── useAuth.js                 # 登录状态管理 + SHA-256 密码校验
├── router/
│   └── index.js                   # 路由定义 + 隐藏路由守卫
├── content/
│   ├── index.js                   # Markdown glob 加载器 + 搜索引擎索引 + 路由生成
│   ├── accumulation/              # 厚积薄发
│   ├── empowerment/               # 如虎添翼
│   ├── practice/                  # 身体力行
│   ├── aspiration/                # 心之所向
│   └── hidden/                    # 隐藏空间（需登录）
├── components/
│   ├── MarkdownRenderer.vue       # Markdown 渲染 + 代码高亮
│   ├── ThemeSwitcher.vue          # 主题下拉切换
│   ├── GiscusComment.vue          # Giscus 评论嵌入
│   └── LoginModal.vue             # 登录弹窗
└── views/
    ├── Home.vue                   # 首页（Hero + 分类卡片）
    ├── CategoryPage.vue           # 分类 → 主题列表
    ├── TopicPage.vue              # 主题 → 子方向 / 文章列表
    ├── SubTopicPage.vue           # 子方向 → 文章列表
    ├── ArticlePage.vue            # 文章全文
    └── SearchPage.vue             # 全文搜索
```

内容存放于 `src/content/`，三级结构（主题 → 文章）或四级结构（主题 → 方向 → 文章）由目录结构自动识别。

---

## 快速开始

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run preview   # 预览构建结果
```

---

## 内容管理

### 添加文章

在 `src/content/` 下对应分类/主题目录中创建 `.md` 文件：

**三级结构**（主题下直接放文章）：
```
src/content/accumulation/great-tools/my-article.md
```

**四级结构**（主题 → 方向 → 文章）：
```
src/content/accumulation/programming-foundation/python/python-special-symbols.md
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

---

## 主题系统

支持 4 套主题，每套有浅色/深色两种模式：

| 主题 | 特征 |
|---|---|
| 简约 | 蓝灰强调，干净简洁 |
| 现代 | 毛玻璃 + 渐变，科技感 |
| 科技 | 等宽标题 + 霓虹绿，代码风 |
| 古典 | 宋体 + 暖棕暖橙，书卷气 |

主题和模式通过 `data-theme` / `data-mode` 属性控制，模式默认跟随系统。

### 自定义配色

编辑 `src/assets/themes.css`，使用 `[data-theme='名称']` 和 `[data-mode='dark']` 选择器定义 CSS 变量。

### 分类标识色

| 分类 | 色 | Emoji |
|---|---|---|
| 厚积薄发 | `#e67e22` 橙 | 🔧 |
| 如虎添翼 | `#2ecc71` 绿 | 🤖 |
| 身体力行 | `#9b59b6` 紫 | 🚀 |
| 心之所向 | `#e74c3c` 红 | 🌟 |

---

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

---

## 访问统计

不蒜子统计默认开启（`busuanzi: true`），在 `src/config/site.js` 中关闭。

---

## 搜索

点击导航栏搜索图标或访问 `/#/search`，使用 Fuse.js 对文章标题和正文进行模糊搜索。

---

## 隐藏内容与登录

### 配置用户

编辑 `src/config/auth.js`，添加用户名和密码哈希：

```js
export const users = [
  { username: 'preture', passwordHash: '...' },
]
```

### 生成密码哈希

```bash
# openssl
echo -n "你的密码" | openssl dgst -sha256

# 或 Node.js
node -e "console.log(require('crypto').createHash('sha256').update('你的密码').digest('hex'))"
```

### 隐藏笔记加密

隐藏内容 (`hidden/`) 不直接提交到 git，而是加密归档，确保公开仓库中不可读。

使用脚本 `scripts/encrypt-hidden.sh` 操作：

```bash
# 在 hidden/ 下创建笔记后，加密：
./scripts/encrypt-hidden.sh encrypt

# 提交加密文件（不提交原始 markdown）
git add hidden-content.enc
git commit -m "update hidden content"
git push
```

在 GitHub 仓库 → **Settings → Secrets and variables → Actions** 添加 `HIDDEN_PASSWORD` 仓库 Secret，值为加密时使用的密码。

本地解密查看：

```bash
./scripts/encrypt-hidden.sh decrypt
```

### 工作原理

- 导航栏右侧显示「登录」按钮，登录后显示「退出」
- 登录状态保存在 `sessionStorage`，关闭标签页后清除
- 隐藏主题的目录和路由在未登录时不可见
- 直接访问隐藏 URL 会弹出登录框
- 新增隐藏分类需添加 `hidden: true` 标记

---

## 部署

推送到 `main` 分支后，GitHub Actions 自动执行 `npm run build` 并将 `dist/` 部署到 Pages。工作流文件：`.github/workflows/deploy.yml`。

---

## 页面布局设计

### 首页

```
┌──────────────────────────────────────────┐
│  Header: logo + 全局导航                  │
│  ┌────────────────────────────────────┐  │
│  │  Hero 区域                          │  │
│  │  "preture / 持续探索，记录分享"      │  │
│  └────────────────────────────────────┘  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │厚积薄发│ │如虎添翼│ │身体力行│ │心之所向│  │
│  │ icon  │ │ icon  │ │ icon  │ │ icon  │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│           分类概览卡片（响应式网格）       │
│  Footer                                  │
└──────────────────────────────────────────┘
```

### 分类页

```
┌──────────────────────────────────────────┐
│  Header                                  │
│  [emoji] 分类标题 + 描述                  │
│  ┌────────────────────────────────────┐  │
│  │  主题卡片 1  →                     │  │
│  │  主题卡片 2  →                     │  │
│  └────────────────────────────────────┘  │
│  Footer                                  │
└──────────────────────────────────────────┘
```

### 主题页

```
┌──────────────────────────────────────────┐
│  面包屑: 首页 / 分类 / 主题               │
│  主题标题 + 描述                          │
│  ┌────────────────────────────────────┐  │
│  │  子方向 1  →         X 篇文章       │  │
│  │  子方向 2  →         X 篇文章       │  │
│  │  (或直接展示文章列表)                │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### 文章页

```
┌──────────────────────────────────────────┐
│  面包屑: 首页 / 分类 / 主题 / 文章标题    │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │         Markdown 全文               │  │
│  │         代码高亮 / 图片 / 引用       │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌─ Giscus 评论 ──────────────────────┐  │
│  │    (需配置 repoId & categoryId)     │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## 功能一览

| 功能 | 状态 |
|---|---|
| 三级/四级内容结构自动识别 | ✅ |
| 分类卡片首页概览（Emoji + 配色） | ✅ |
| 空内容占位提示 | ✅ |
| 面包屑导航 | ✅ |
| Markdown 渲染 + 代码高亮 | ✅ |
| 4 套主题 × 浅色/深色模式 | ✅ |
| 客户端全文搜索（Fuse.js） | ✅ |
| 多用户登录 + 隐藏内容 | ✅ |
| 页面切换动画 | ✅ |
| 响应式布局（Grid / Flexbox） | ✅ |
| Giscus 评论 | ✅（需配置） |
| 不蒜子统计 | ✅ |
| GitHub Actions 自动部署 | ✅ |
| 文章状态标签 / 按日期排序 | ⏳ 待实现 |
| RSS feed | ⏳ 待实现 |

---

## 视觉设计方向

- **基调**：简洁、清晰、偏技术感
- **配色**：`#2c3e50` 深蓝灰主色 / 分类各自标识色
- **字体**：系统无衬线字体，科技主题使用等宽标题
- **圆角**：4px ~ 16px 依主题变化
- **阴影**：hover 时略微加深

---

## 内容目录结构

```
src/content/
├── accumulation/                  # 厚积薄发
│   ├── programming-foundation/    # 编程筑基（四级）
│   │   ├── python/                #   └── .md 文件
│   │   ├── vue/
│   │   └── flutter/
│   ├── great-tools/               # 利器清单（三级）
│   ├── ai-tools/                  # AI 工具箱
│   └── build-ai-assistant/        # 自建 AI 助手
├── empowerment/                   # 如虎添翼
│   ├── ai-practice/
│   ├── ai-dev/
│   └── ai-content/
├── practice/                      # 身体力行
│   ├── home-server/
│   ├── second-brain/
│   ├── media-library/
│   └── mobile-tools/
├── aspiration/                    # 心之所向
│   ├── digital-world/
│   ├── history-creation/
│   ├── ancient-texts/
│   └── oracle-exploration/
└── hidden/                        # 隐藏空间（需登录）
    └── private-notes/
```

## test push
