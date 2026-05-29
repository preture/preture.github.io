import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MarkdownPage from '../views/MarkdownPage.vue'

const modules = import.meta.glob('/src/content/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseTitle(raw) {
  const match = raw.match(/^#\s+(.+)/m)
  return match ? match[1].trim() : 'Untitled'
}

function slugify(name) {
  return name.replace(/\.md$/, '').toLowerCase()
}

const mdPages = Object.entries(modules).map(([path, content]) => {
  const name = path.split('/').pop()
  const slug = slugify(name)
  return {
    path: `/${slug === 'index' ? '' : slug}`,
    name: slug,
    title: parseTitle(content),
    content,
  }
})

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...mdPages.map((page) => ({
    path: page.path,
    name: page.name,
    component: MarkdownPage,
    props: { content: page.content, title: page.title },
  })),
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
export const navPages = mdPages.filter((p) => p.path !== '/')
