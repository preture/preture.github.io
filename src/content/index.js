import { categories, findCategory, findTopic } from '../config/site'

const openModules = import.meta.glob('/open/**/*.md', {
  query: '?raw',
  import: 'default',
})

const restrictedModules = import.meta.glob('/{protected,privated}/**/*.md', {
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match) return { data: {}, content }

  const data = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^\s*(\w+)\s*:\s*(.+)\s*$/)
    if (kv) {
      let val = kv[2].trim()
      if (/^\d+$/.test(val)) val = parseInt(val, 10)
      else if (val === 'true') val = true
      else if (val === 'false') val = false
      data[kv[1].trim()] = val
    }
  }
  return { data, content: content.slice(match[0].length) }
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)/m)
  return match ? match[1].trim() : 'Untitled'
}

function bodyExcerpt(content) {
  return content.replace(/^#\s+.+$/m, '').slice(0, 500)
}

function articleKey(segments, offset) {
  return segments.slice(offset).join('/')
}

const articlesByTopic = {}
const articlesBySubTopic = {}
const _openLoaders = {}
const _openContentCache = {}
const _restrictedLoaders = {}
const _restrictedContentCache = {}
const _openMetaLoaded = {}
const _openOrderCache = {}

function addArticleMeta(segments, offset, articleSlug) {
  const catSlug = segments[offset]
  const topicSlug = segments[1 + offset]
  const isSubTopic = segments.length === 4 + offset

  if (isSubTopic) {
    const subSlug = segments[2 + offset]
    const key = `${catSlug}/${topicSlug}/${subSlug}`
    if (!articlesBySubTopic[key]) articlesBySubTopic[key] = []
    articlesBySubTopic[key].push({ slug: articleSlug, title: '', order: Infinity, body: '' })
  } else {
    const key = `${catSlug}/${topicSlug}`
    if (!articlesByTopic[key]) articlesByTopic[key] = []
    articlesByTopic[key].push({ slug: articleSlug, title: '', order: Infinity, body: '' })
  }
}

for (const filePath of Object.keys(openModules)) {
  const segments = filePath.replace(/^\//, '').replace(/\.md$/, '').split('/')
  const offset = 1
  const key = articleKey(segments, offset)
  _openLoaders[key] = openModules[filePath]
  addArticleMeta(segments, offset, segments[segments.length - 1])
}

for (const filePath of Object.keys(restrictedModules)) {
  const segments = filePath.replace(/^\//, '').replace(/\.md$/, '').split('/')
  const offset = 1
  const key = articleKey(segments, offset)
  _restrictedLoaders[key] = restrictedModules[filePath]
  addArticleMeta(segments, offset, segments[segments.length - 1])
}

async function loadOpenMeta(key) {
  if (_openMetaLoaded[key]) {
    const cached = _openContentCache[key]
    if (cached) return { title: extractTitle(cached), body: bodyExcerpt(cached), order: _openOrderCache[key] }
    return
  }
  _openMetaLoaded[key] = true
  const loader = _openLoaders[key]
  if (!loader) return
  const raw = await loader()
  const { data, content } = parseFrontmatter(raw)
  const title = extractTitle(content)
  const body = bodyExcerpt(content)
  _openContentCache[key] = content
  _openOrderCache[key] = data.order
  return { title, body, order: data.order }
}

async function setArticleMeta(articles, articleSlug, meta) {
  if (!meta) return
  const a = articles?.find((x) => x.slug === articleSlug)
  if (!a) return
  a.title = meta.title
  a.body = meta.body
  if (meta.order !== undefined) a.order = meta.order
}

export async function ensureTopicTitles(categorySlug, topicSlug) {
  const articles = articlesByTopic[`${categorySlug}/${topicSlug}`]
  if (!articles) return
  await Promise.all(articles.map(async (a) => {
    if (a.title) return
    const key = `${categorySlug}/${topicSlug}/${a.slug}`
    const meta = await loadOpenMeta(key)
    await setArticleMeta(articles, a.slug, meta)
  }))
  articles.sort((a, b) => a.order - b.order)
}

export async function ensureSubTopicTitles(categorySlug, topicSlug, subSlug) {
  const articles = articlesBySubTopic[`${categorySlug}/${topicSlug}/${subSlug}`]
  if (!articles) return
  await Promise.all(articles.map(async (a) => {
    if (a.title) return
    const key = `${categorySlug}/${topicSlug}/${subSlug}/${a.slug}`
    const meta = await loadOpenMeta(key)
    await setArticleMeta(articles, a.slug, meta)
  }))
  articles.sort((a, b) => a.order - b.order)
}

export function getTopicArticles(categorySlug, topicSlug) {
  return articlesByTopic[`${categorySlug}/${topicSlug}`] || []
}

export function getSubTopicArticles(categorySlug, topicSlug, subSlug) {
  return articlesBySubTopic[`${categorySlug}/${topicSlug}/${subSlug}`] || []
}

export function getArticle(categorySlug, topicSlug, articleSlug) {
  const articles = getTopicArticles(categorySlug, topicSlug)
  return articles.find((a) => a.slug === articleSlug) || null
}

export function getSubTopicArticle(categorySlug, topicSlug, subSlug, articleSlug) {
  const articles = getSubTopicArticles(categorySlug, topicSlug, subSlug)
  return articles.find((a) => a.slug === articleSlug) || null
}

export function getArticleContent(categorySlug, topicSlug, articleSlug, subSlug) {
  const key = subSlug
    ? `${categorySlug}/${topicSlug}/${subSlug}/${articleSlug}`
    : `${categorySlug}/${topicSlug}/${articleSlug}`
  return _openContentCache[key] || _restrictedContentCache[key] || ''
}

export async function loadArticleContent(categorySlug, topicSlug, articleSlug, subSlug) {
  const key = subSlug
    ? `${categorySlug}/${topicSlug}/${subSlug}/${articleSlug}`
    : `${categorySlug}/${topicSlug}/${articleSlug}`

  if (_restrictedContentCache[key]) return _restrictedContentCache[key]

  const loader = _restrictedLoaders[key]
  if (!loader) {
    const openLoader = _openLoaders[key]
    if (!openLoader) return ''
    if (!_openContentCache[key]) {
      const meta = await loadOpenMeta(key)
      return meta ? _openContentCache[key] : ''
    }
    return _openContentCache[key]
  }

  const raw = await loader()
  const { content: cleanContent } = parseFrontmatter(raw)
  _restrictedContentCache[key] = cleanContent

  const isSub = !!subSlug
  const articles = isSub
    ? articlesBySubTopic[`${categorySlug}/${topicSlug}/${subSlug}`]
    : articlesByTopic[`${categorySlug}/${topicSlug}`]
  if (articles) {
    const article = articles.find((a) => a.slug === articleSlug)
    if (article) {
      article.title = extractTitle(cleanContent)
      article.body = bodyExcerpt(cleanContent)
    }
  }

  return cleanContent
}

export function buildSearchIndex() {
  const result = []

  for (const [key, articles] of Object.entries(articlesByTopic)) {
    const [catSlug, topicSlug] = key.split('/')
    const cat = findCategory(catSlug)
    const topic = findTopic(catSlug, topicSlug)
    for (const a of articles) {
      if (!a.body) continue
      result.push({
        title: a.title,
        path: `/${catSlug}/${topicSlug}/${a.slug}`,
        category: catSlug,
        categoryName: cat?.name || catSlug,
        topicName: topic?.name || topicSlug,
        body: a.body,
      })
    }
  }

  for (const [key, articles] of Object.entries(articlesBySubTopic)) {
    const [catSlug, topicSlug, subSlug] = key.split('/')
    const cat = findCategory(catSlug)
    const topic = findTopic(catSlug, topicSlug)
    const sub = topic?.subTopics?.find((s) => s.id === subSlug)
    for (const a of articles) {
      if (!a.body) continue
      result.push({
        title: a.title,
        path: `/${catSlug}/${topicSlug}/${subSlug}/${a.slug}`,
        category: catSlug,
        categoryName: cat?.name || catSlug,
        topicName: topic?.name || topicSlug,
        subTopicName: sub?.name || subSlug,
        body: a.body,
      })
    }
  }

  return result
}

const _openMetaInit = (async () => {
  for (const key of Object.keys(_openLoaders)) {
    const meta = await loadOpenMeta(key)
    if (!meta) continue
    const parts = key.split('/')
    if (parts.length === 3) {
      const [catSlug, topicSlug, articleSlug] = parts
      await setArticleMeta(articlesByTopic[`${catSlug}/${topicSlug}`], articleSlug, meta)
    } else if (parts.length === 4) {
      const [catSlug, topicSlug, subSlug, articleSlug] = parts
      await setArticleMeta(articlesBySubTopic[`${catSlug}/${topicSlug}/${subSlug}`], articleSlug, meta)
    }
  }
  for (const key of Object.keys(articlesByTopic)) {
    articlesByTopic[key].sort((a, b) => a.order - b.order)
  }
  for (const key of Object.keys(articlesBySubTopic)) {
    articlesBySubTopic[key].sort((a, b) => a.order - b.order)
  }
})()

export const openMetaReady = _openMetaInit

export function buildRoutes() {
  const routes = []

  categories.forEach((cat) => {
    const level = cat.level || 'open'
    const routeMeta = level !== 'open' ? { level } : undefined

    routes.push({
      path: `/${cat.id}`,
      name: `category-${cat.id}`,
      component: () => import('../views/CategoryPage.vue'),
      props: { categorySlug: cat.id },
      meta: routeMeta,
    })

    cat.topics.forEach((topic) => {
      if (topic.subTopics) {
        routes.push({
          path: `/${cat.id}/${topic.id}`,
          name: `topic-${cat.id}-${topic.id}`,
          component: () => import('../views/TopicPage.vue'),
          props: { categorySlug: cat.id, topicId: topic.id },
          meta: routeMeta,
        })

        topic.subTopics.forEach((sub) => {
          routes.push({
            path: `/${cat.id}/${topic.id}/${sub.id}`,
            name: `subtopic-${cat.id}-${topic.id}-${sub.id}`,
            component: () => import('../views/SubTopicPage.vue'),
            props: { categorySlug: cat.id, topicId: topic.id, subTopicId: sub.id },
            meta: routeMeta,
          })

          const articles = getSubTopicArticles(cat.id, topic.id, sub.id)
          articles.forEach((article) => {
            routes.push({
              path: `/${cat.id}/${topic.id}/${sub.id}/${article.slug}`,
              name: `article-${cat.id}-${topic.id}-${sub.id}-${article.slug}`,
              component: () => import('../views/ArticlePage.vue'),
              props: { articleSlug: article.slug, categorySlug: cat.id, topicId: topic.id, subTopicId: sub.id },
              meta: routeMeta,
            })
          })
        })
      } else {
        routes.push({
          path: `/${cat.id}/${topic.id}`,
          name: `topic-${cat.id}-${topic.id}`,
          component: () => import('../views/TopicPage.vue'),
          props: { categorySlug: cat.id, topicId: topic.id },
          meta: routeMeta,
        })

        const articles = getTopicArticles(cat.id, topic.id)
        articles.forEach((article) => {
          routes.push({
            path: `/${cat.id}/${topic.id}/${article.slug}`,
            name: `article-${cat.id}-${topic.id}-${article.slug}`,
            component: () => import('../views/ArticlePage.vue'),
            props: { articleSlug: article.slug, categorySlug: cat.id, topicId: topic.id },
            meta: routeMeta,
          })
        })
      }
    })
  })

  return routes
}
