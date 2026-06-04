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
