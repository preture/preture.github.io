<template>
  <div class="category-page container page-pad">
    <nav class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <span>{{ category?.name }}</span>
    </nav>

    <div class="cat-header">
      <span class="cat-emoji">{{ category?.emoji }}</span>
      <h1>{{ category?.name }}</h1>
      <p class="cat-desc">{{ category?.description }}</p>
    </div>

    <div v-if="category" class="topic-grid">
      <router-link
        v-for="topic in category.topics"
        :key="topic.id"
        :to="`/${categorySlug}/${topic.id}`"
        class="topic-card"
      >
        <div class="topic-card-body">
          <h3>{{ topic.name }}</h3>
          <p class="topic-desc">{{ topic.description }}</p>
        </div>
        <div class="topic-card-footer">
          <span class="topic-meta">
            {{ topicMeta(topic) }}
          </span>
          <span class="topic-arrow">&rarr;</span>
        </div>
      </router-link>
    </div>

    <div v-else class="not-found">
      <p>分类不存在</p>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { findCategory } from '../config/site'
import { getTopicArticles } from '../content'

const props = defineProps({
  categorySlug: { type: String, required: true },
})

const category = computed(() => findCategory(props.categorySlug))

function topicArticleCount(topicId) {
  return getTopicArticles(props.categorySlug, topicId).length
}

function topicMeta(topic) {
  if (topic.subTopics) return `${topic.subTopics.length} 个系列`
  const count = topicArticleCount(topic.id)
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

.cat-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.cat-emoji {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.4rem;
}

.cat-header h1 {
  font-size: 1.35rem;
  color: var(--heading);
  margin: 0 0 0.5rem;
  font-family: var(--font-heading);
  font-weight: 700;
}

.cat-desc {
  color: var(--text-soft);
  font-size: 0.9rem;
  max-width: 480px;
  margin: 0 auto;
}

.topic-grid {
  display: grid;
  gap: 1rem;
}

.topic-card {
  display: flex;
  flex-direction: column;
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

.topic-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
  text-decoration: none;
}

.topic-card-body h3 {
  margin: 0 0 0.25rem;
  color: var(--heading);
  font-size: 0.95rem;
  font-family: var(--font-heading);
  font-weight: 600;
}

.topic-desc {
  color: var(--text-soft);
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
}

.topic-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-light);
}

.topic-meta {
  color: var(--text-soft);
  font-size: 0.8rem;
}

.topic-arrow {
  color: var(--accent);
  font-size: 1rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s, transform 0.25s;
}

.topic-card:hover .topic-arrow {
  opacity: 1;
  transform: translateX(0);
}

.not-found {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-muted);
}
</style>
