<template>
  <div class="markdown-body" v-html="rendered" @click="onRootClick" />
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import markdown from 'highlight.js/lib/languages/markdown'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('python', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('css', css)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('yaml', yaml)

function safeId(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang }).value
        return `<pre class="hljs"><code>${highlighted}</code></pre>`
      } catch {
        // fallthrough
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

const defaultRender = md.renderer.rules.heading_open || ((tokens, idx, options, env, self) =>
  self.renderToken(tokens, idx, options)
)

md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const inline = tokens[idx + 1]
  const text = inline?.children?.map(c => c.content).join('') || ''
  const id = safeId(text)
  token.attrSet('id', id)
  return defaultRender(tokens, idx, options, env, self)
}

const props = defineProps({
  content: { type: String, required: true },
})

const mdResult = computed(() => {
  const tokens = md.parse(props.content, {})
  const html = md.renderer.render(tokens, md.options, {})
  const headings = []
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'heading_open') {
      const level = parseInt(tokens[i].tag.slice(1))
      const inline = tokens[i + 1]
      const text = inline?.children?.map(c => c.content).join('') || ''
      const id = safeId(text)
      if (text) headings.push({ level, text, id })
    }
  }
  return { html, headings }
})

const rendered = computed(() => mdResult.value.html)
const headings = computed(() => mdResult.value.headings)

defineExpose({ headings })

function onRootClick(e) {
  const a = e.target.closest('a')
  if (!a || !a.hasAttribute('href')) return
  const href = a.getAttribute('href')
  if (!href.startsWith('#')) return
  e.preventDefault()
  let id
  try { id = decodeURIComponent(href.slice(1)) } catch { id = href.slice(1) }
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style>
.markdown-body {
  line-height: 1.8;
  color: var(--text);
  max-width: 720px;
  margin: 0 auto;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4 {
  color: var(--heading);
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  font-family: var(--font-heading);
  font-weight: 700;
  scroll-margin-top: 80px;
}

.markdown-body h1 {
  font-size: 2rem;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.5rem;
  margin-top: 1rem;
}

.markdown-body h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.3rem;
}

.markdown-body p {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.markdown-body a {
  color: var(--link);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.markdown-body a:hover {
  border-bottom-color: var(--link);
}

.markdown-body code {
  background: var(--bg-code);
  padding: 0.2em 0.45em;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
}

.markdown-body pre {
  background: var(--bg-code);
  padding: 1.25rem;
  border-radius: var(--radius);
  overflow-x: auto;
  margin-bottom: 1.25rem;
  border: 1px solid var(--border-light);
  font-size: 0.875rem;
  line-height: 1.6;
}

.markdown-body pre code {
  background: none;
  padding: 0;
  font-size: inherit;
}

.markdown-body blockquote {
  border-left: 4px solid var(--accent);
  margin: 1.25rem 0;
  padding: 0.75rem 1.25rem;
  color: var(--text-soft);
  background: var(--bg-blockquote);
  border-radius: 0 var(--radius) var(--radius) 0;
  font-style: italic;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-body li {
  margin-bottom: 0.35rem;
}

.markdown-body img {
  max-width: 100%;
  border-radius: var(--radius);
  margin: 1rem 0;
}

.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
}

.markdown-body th,
.markdown-body td {
  border: 1px solid var(--border);
  padding: 0.6rem 0.75rem;
  text-align: left;
}

.markdown-body th {
  background: var(--bg-code);
  font-weight: 600;
  font-family: var(--font-heading);
}

.markdown-body tr:nth-child(even) {
  background: var(--bg-blockquote);
}

.markdown-body hr {
  border: none;
  border-top: 2px solid var(--border-light);
  margin: 2.5rem 0;
}

.markdown-body ::selection {
  background: var(--accent);
  color: var(--bg-body);
}

/* ---- syntax highlighting (light) ---- */
.markdown-body .hljs-comment,
.markdown-body .hljs-quote {
  color: #6a737d;
  font-style: italic;
}
.markdown-body .hljs-keyword,
.markdown-body .hljs-selector-tag,
.markdown-body .hljs-literal,
.markdown-body .hljs-section {
  color: #0550ae;
}
.markdown-body .hljs-string,
.markdown-body .hljs-addition {
  color: #0a3069;
}
.markdown-body .hljs-number,
.markdown-body .hljs-deletion {
  color: #953800;
}
.markdown-body .hljs-attr,
.markdown-body .hljs-variable,
.markdown-body .hljs-template-variable {
  color: #953800;
}
.markdown-body .hljs-title,
.markdown-body .hljs-name,
.markdown-body .hljs-type {
  color: #8250df;
}
.markdown-body .hljs-built_in,
.markdown-body .hljs-builtin-name {
  color: #0969da;
}
.markdown-body .hljs-meta {
  color: #6e7781;
}
.markdown-body .hljs-link {
  color: #0969da;
  text-decoration: underline;
}
.markdown-body .hljs-emphasis {
  font-style: italic;
}
.markdown-body .hljs-strong {
  font-weight: bold;
}

/* ---- syntax highlighting (dark) ---- */
[data-mode='dark'] .markdown-body .hljs-comment,
[data-mode='dark'] .markdown-body .hljs-quote {
  color: #8b949e;
  font-style: italic;
}
[data-mode='dark'] .markdown-body .hljs-keyword,
[data-mode='dark'] .markdown-body .hljs-selector-tag,
[data-mode='dark'] .markdown-body .hljs-literal,
[data-mode='dark'] .markdown-body .hljs-section {
  color: #ff7b72;
}
[data-mode='dark'] .markdown-body .hljs-string,
[data-mode='dark'] .markdown-body .hljs-addition {
  color: #a5d6ff;
}
[data-mode='dark'] .markdown-body .hljs-number,
[data-mode='dark'] .markdown-body .hljs-deletion {
  color: #ffa657;
}
[data-mode='dark'] .markdown-body .hljs-attr,
[data-mode='dark'] .markdown-body .hljs-variable,
[data-mode='dark'] .markdown-body .hljs-template-variable {
  color: #d2a8ff;
}
[data-mode='dark'] .markdown-body .hljs-title,
[data-mode='dark'] .markdown-body .hljs-name,
[data-mode='dark'] .markdown-body .hljs-type {
  color: #d2a8ff;
}
[data-mode='dark'] .markdown-body .hljs-built_in,
[data-mode='dark'] .markdown-body .hljs-builtin-name {
  color: #79c0ff;
}
[data-mode='dark'] .markdown-body .hljs-meta {
  color: #8b949e;
}
[data-mode='dark'] .markdown-body .hljs-link {
  color: #79c0ff;
  text-decoration: underline;
}
</style>
