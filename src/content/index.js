import { categories, findCategory, findTopic } from '../config/site'

const openModules = import.meta.glob('/open/**/*.md', {
  eager: true,
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
const _openContentCache = {}
const _restrictedLoaders = {}
const _restrictedContentCache = {}

function addArticle(segments, offset, cleanContent, order) {
  const catSlug = segments[offset]
  const topicSlug = segments[1 + offset]
  const articleSlug = segments[2 + offset]
  const isSubTopic = segments.length === 4 + offset

  if (isSubTopic) {
    const subSlug = segments[2 + offset]
    const key = `${catSlug}/${topicSlug}/${subSlug}`
    if (!articlesBySubTopic[key]) articlesBySubTopic[key] = []
    articlesBySubTopic[key].push({
      slug: segments[3 + offset],
      title: extractTitle(cleanContent),
      order,
      body: bodyExcerpt(cleanContent),
    })
  } else {
    const key = `${catSlug}/${topicSlug}`
    if (!articlesByTopic[key]) articlesByTopic[key] = []
    articlesByTopic[key].push({
      slug: articleSlug,
      title: extractTitle(cleanContent),
      order,
      body: bodyExcerpt(cleanContent),
    })
  }
}

for (const [filePath, content] of Object.entries(openModules)) {
  const segments = filePath.replace(/^\//, '').replace(/\.md$/, '').split('/')
  const offset = 1
  const { data, content: cleanContent } = parseFrontmatter(content)
  const order = data.order !== undefined ? data.order : Infinity

  _openContentCache[articleKey(segments, offset)] = cleanContent
  addArticle(segments, offset, cleanContent, order)
}

for (const [filePath, loader] of Object.entries(restrictedModules)) {
  const segments = filePath.replace(/^\//, '').replace(/\.md$/, '').split('/')
  const offset = 1
  const catSlug = segments[offset]
  const topicSlug = segments[1 + offset]
  const articleSlug = segments[2 + offset]
  const key = articleKey(segments, offset)

  _restrictedLoaders[key] = loader

  if (segments.length === 4 + offset) {
    const subSlug = segments[2 + offset]
    const mapKey = `${catSlug}/${topicSlug}/${subSlug}`
    if (!articlesBySubTopic[mapKey]) articlesBySubTopic[mapKey] = []
    articlesBySubTopic[mapKey].push({
      slug: segments[3 + offset],
      title: '',
      order: Infinity,
      body: '',
    })
  } else {
    const mapKey = `${catSlug}/${topicSlug}`
    if (!articlesByTopic[mapKey]) articlesByTopic[mapKey] = []
    articlesByTopic[mapKey].push({
      slug: articleSlug,
      title: '',
      order: Infinity,
      body: '',
    })
  }
}

for (const key of Object.keys(articlesByTopic)) {
  articlesByTopic[key].sort((a, b) => a.order - b.order)
}
for (const key of Object.keys(articlesBySubTopic)) {
  articlesBySubTopic[key].sort((a, b) => a.order - b.order)
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
  if (!_restrictedLoaders[key]) return ''

  const raw = await _restrictedLoaders[key]()
  const { content: cleanContent } = parseFrontmatter(raw)
  _restrictedContentCache[key] = cleanContent

  const articles = subSlug
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
