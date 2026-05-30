# preture.github.io

个人技术博客与项目展示站点，基于 Vue 3 + Vite 构建，通过 GitHub Pages 自动部署。内容使用 Markdown 编写，按模块归类，展示在编程、AI、项目实践等方面的积累与探索。

## 技术架构

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

## 文档

- [项目需求](docs/requirements.md) — 信息架构、内容模型、功能一览、访问控制需求
- [项目设计](docs/design.md) — 目录结构、页面布局、主题系统、视觉设计
- [操作指南](docs/guide.md) — 快速开始、内容管理、评论配置、部署等
