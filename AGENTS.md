# Agents

## Project Overview

Personal tech blog and project portfolio site built with Vue 3 + Vite, deployed via GitHub Pages.

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Build**: Vite 6
- **Routing**: vue-router (hash mode for GitHub Pages)
- **Content**: Markdown via markdown-it + highlight.js (custom syntax highlighting CSS, no highlight.js theme)
- **Search**: Fuse.js (client-side full-text)
- **Comments**: Giscus (GitHub Discussions)
- **Analytics**: Busuanzi (不蒜子)

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (port 5173)
npm run build     # production build
npm run preview   # preview production build
```

## Code Conventions

- Vue SFC with `<script setup>` + `<template>` + `<style scoped>`
- Theme variables defined in `src/assets/themes.css`, accessed via `var(--xxx)` in all components
- No highlight.js CSS theme files — all syntax highlighting styles are custom in `MarkdownRenderer.vue`
- Components under `src/components/`, views under `src/views/`
- Site config (categories, topics, giscus, auth) in `src/config/`
- Markdown content under `open/`
- Scoped styles preferred; global styles in `src/assets/main.css` and `src/assets/themes.css`

## Content Structure

```
open/{category}/{topic}/{article}.md
open/{category}/{topic}/{sub-topic}/{article}.md
```

Article title extracted from first `# ` heading. Config in `src/config/site.js`.

## Performance Optimization (完成)

- All Markdown content loaded lazily via `import.meta.glob({ query: '?raw' })` (no `eager`).
- Main JS bundle reduced from 1,025 KB → 124 KB (48 KB gzip).
- MindMapViewer (`markmap-lib`) loaded via `defineAsyncComponent` (577 KB separate chunk).
- CSS `<link>` placed before `<script>` in built HTML via Vite plugin.
- Article metadata (title, body) populated **asynchronously**:
  - `loadOpenMeta(key)` — loads/chunks markdown, extracts title/body/order.
  - `setArticleMeta(articles, slug, meta)` — updates article in-place.
  - `ensureTopicTitles` / `ensureSubTopicTitles` — called by TopicPage/SubTopicPage on mount.
  - `_openMetaInit` (top-level IIFE) — preloads all `open/` metadata in background; exported as `openMetaReady`.
  - `loadArticleContent` — loads full content for ArticlePage; for `open/` articles delegates to `loadOpenMeta`.
  - `loadOpenMeta` handles cached keys (returns title/body/order from caches on repeated calls).
  - `_openOrderCache` — stores `order` from frontmatter for cache-friendly retrieval.
- SearchPage waits for `openMetaReady` before building the Fuse.js index.
- TopicPage/SubTopicPage create new array reference (`[...arr]`) after loading titles to trigger Vue reactivity.
