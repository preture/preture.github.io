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

## 彩票信息查询（移动工具箱）

`/#/practice/mobile-tools/lottery` 提供双色球 / 大乐透历史开奖查询和号码查奖功能。

开奖数据以静态 JSON 存放于 `public/lottery/`（构建时复制到 `dist/lottery/`），需定期更新：

```bash
npm run update-lottery
```

脚本从中国福利彩票 / 中国体育彩票官方接口抓取最近 100 期开奖数据，覆盖双色球（6 红 + 1 蓝）和大乐透（5 前区 + 2 后区）。提交更新后重新部署即可刷新数据。

## 部署

推送到 `main` 分支后，GitHub Actions 自动执行 `npm run build` 并将 `dist/` 部署到 Pages。工作流文件：`.github/workflows/deploy.yml`。
