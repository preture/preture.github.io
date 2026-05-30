import { categories, findCategory, findTopic } from '../config/site'

const mdModules = import.meta.glob('/open/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)/m)
  return match ? match[1].trim() : 'Untitled'
}

const articlesByTopic = {}
const articlesBySubTopic = {}

for (const [filePath, content] of Object.entries(mdModules)) {
  const relativePath = filePath.replace('/open/', '').replace(/\.md$/, '')
  const parts = relativePath.split('/')

  if (parts.length === 3) {
    const [catSlug, topicSlug, articleSlug] = parts
    const key = `${catSlug}/${topicSlug}`
    if (!articlesByTopic[key]) articlesByTopic[key] = []
    articlesByTopic[key].push({
      slug: articleSlug,
      title: extractTitle(content),
      content,
    })
  } else if (parts.length === 4) {
    const [catSlug, topicSlug, subSlug, articleSlug] = parts
    const key = `${catSlug}/${topicSlug}/${subSlug}`
    if (!articlesBySubTopic[key]) articlesBySubTopic[key] = []
    articlesBySubTopic[key].push({
      slug: articleSlug,
      title: extractTitle(content),
      content,
    })
  }
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

export function buildSearchIndex() {
  const result = []

  for (const [key, articles] of Object.entries(articlesByTopic)) {
    const [catSlug, topicSlug] = key.split('/')
    const cat = findCategory(catSlug)
    const topic = findTopic(catSlug, topicSlug)
    for (const a of articles) {
      result.push({
        title: a.title,
        path: `/${catSlug}/${topicSlug}/${a.slug}`,
        category: catSlug,
        categoryName: cat?.name || catSlug,
        topicName: topic?.name || topicSlug,
        body: a.content.replace(/^#\s+.+$/m, '').slice(0, 500),
      })
    }
  }

  for (const [key, articles] of Object.entries(articlesBySubTopic)) {
    const [catSlug, topicSlug, subSlug] = key.split('/')
    const cat = findCategory(catSlug)
    const topic = findTopic(catSlug, topicSlug)
    const sub = topic?.subTopics?.find((s) => s.id === subSlug)
    for (const a of articles) {
      result.push({
        title: a.title,
        path: `/${catSlug}/${topicSlug}/${subSlug}/${a.slug}`,
        category: catSlug,
        categoryName: cat?.name || catSlug,
        topicName: topic?.name || topicSlug,
        subTopicName: sub?.name || subSlug,
        body: a.content.replace(/^#\s+.+$/m, '').slice(0, 500),
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
              props: { ...article, categorySlug: cat.id, topicId: topic.id, subTopicId: sub.id },
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
            props: { ...article, categorySlug: cat.id, topicId: topic.id },
            meta: routeMeta,
          })
        })
      }
    })
  })

  return routes
}
