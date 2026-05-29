<template>
  <div class="topic-page container page-pad">
    <nav class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}`">{{ category?.name }}</router-link>
      <span class="sep">/</span>
      <span>{{ topic?.name }}</span>
    </nav>

    <div class="topic-header">
      <h1>{{ topic?.name }}</h1>
      <p class="topic-desc">{{ topic?.description }}</p>
    </div>

    <template v-if="topic?.subTopics">
      <div class="subtopic-grid">
        <router-link
          v-for="sub in topic.subTopics"
          :key="sub.id"
          :to="`/${categorySlug}/${topicId}/${sub.id}`"
          class="subtopic-card"
        >
          <div class="subtopic-body">
            <h3>{{ sub.name }}</h3>
            <span class="article-count">{{ articleCount(sub.id) }}</span>
          </div>
          <span class="card-arrow">&rarr;</span>
        </router-link>
      </div>
    </template>

    <template v-else>
      <div v-if="articles.length" class="article-list">
        <router-link
          v-for="article in articles"
          :key="article.slug"
          :to="`/${categorySlug}/${topicId}/${article.slug}`"
          class="article-item"
        >
          <span class="article-title">{{ article.title }}</span>
          <span class="article-arrow">&rarr;</span>
        </router-link>
      </div>
      <div v-else class="placeholder">
        <div class="placeholder-icon">📝</div>
        <p>功能完善中，敬请期待</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { findCategory, findTopic } from '../config/site'
import { getTopicArticles, getSubTopicArticles } from '../content'

const props = defineProps({
  categorySlug: { type: String, required: true },
  topicId: { type: String, required: true },
})

const category = computed(() => findCategory(props.categorySlug))
const topic = computed(() => findTopic(props.categorySlug, props.topicId))
const articles = computed(() => getTopicArticles(props.categorySlug, props.topicId))

function articleCount(subId) {
  const count = getSubTopicArticles(props.categorySlug, props.topicId, subId).length
  return count > 0 ? `${count} 篇文章` : '完善中'
}
</script>

<style scoped>
.page-pad {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.breadcrumb {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.breadcrumb a {
  color: var(--link);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.breadcrumb a:hover {
  opacity: 1;
}

.sep {
  margin: 0 0.5rem;
  color: var(--text-muted);
  opacity: 0.4;
}

.topic-header {
  margin-bottom: 2rem;
}

.topic-header h1 {
  font-size: 1.5rem;
  color: var(--heading);
  margin: 0 0 0.35rem;
  font-family: var(--font-heading);
  font-weight: 700;
}

.topic-desc {
  color: var(--text-soft);
  font-size: 0.875rem;
  margin: 0;
}

.subtopic-grid {
  display: grid;
  gap: 0.875rem;
}

.subtopic-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  text-decoration: none;
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
  box-shadow: var(--shadow);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.4s;
}

.subtopic-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
  text-decoration: none;
}

.subtopic-body h3 {
  margin: 0 0 0.2rem;
  color: var(--heading);
  font-size: 1rem;
  font-family: var(--font-heading);
  font-weight: 600;
}

.article-count {
  color: var(--text-soft);
  font-size: 0.8rem;
}

.card-arrow {
  color: var(--accent);
  font-size: 1rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s, transform 0.25s;
}

.subtopic-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.article-list {
  display: grid;
  gap: 0.5rem;
}

.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--bg-card);
  text-decoration: none;
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
  transition: border-color 0.2s, background 0.2s, padding 0.2s;
}

.article-item:hover {
  border-color: var(--border);
  background: var(--accent-soft);
  padding-left: 1.25rem;
  text-decoration: none;
}

.article-title {
  color: var(--text);
  flex: 1;
  font-size: 0.925rem;
}

.article-arrow {
  color: var(--text-muted);
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.article-item:hover .article-arrow {
  opacity: 1;
}

.placeholder {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
}

.placeholder-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.4;
}

.placeholder p {
  font-size: 1rem;
  opacity: 0.7;
}
</style>
