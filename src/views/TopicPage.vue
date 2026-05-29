<template>
  <div class="topic-page">
    <div class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}`">{{ category?.name }}</router-link>
      <span class="sep">/</span>
      <span>{{ topic?.name }}</span>
    </div>

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
          <h3>{{ sub.name }}</h3>
          <span class="article-count">
            {{ articleCount(sub.id) }}
          </span>
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
        <p>功能完善中，敬请期待</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { findCategory, findTopic } from '../config/site'
import { getTopicArticles } from '../content'

const props = defineProps({
  categorySlug: { type: String, required: true },
  topicId: { type: String, required: true },
})

const category = computed(() => findCategory(props.categorySlug))
const topic = computed(() => findTopic(props.categorySlug, props.topicId))

const articles = computed(() => getTopicArticles(props.categorySlug, props.topicId))

import { getSubTopicArticles } from '../content'
function articleCount(subId) {
  const count = getSubTopicArticles(props.categorySlug, props.topicId, subId).length
  return count > 0 ? `${count} 篇文章` : '完善中'
}
</script>

<style scoped>
.topic-page {
  max-width: 720px;
  margin: 0 auto;
}

.breadcrumb {
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 1.5rem;
}

.breadcrumb a {
  color: #3498db;
}

.sep {
  margin: 0 0.5rem;
}

.topic-header {
  margin-bottom: 1.5rem;
}

.topic-header h1 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 0.35rem;
}

.topic-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.subtopic-grid {
  display: grid;
  gap: 1rem;
}

.subtopic-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.subtopic-card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
}

.subtopic-card h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1rem;
  flex: 1;
}

.subtopic-card .article-count {
  color: #999;
  font-size: 0.8rem;
}

.card-arrow {
  color: #3498db;
  font-size: 1rem;
}

.article-list {
  display: grid;
  gap: 0.5rem;
}

.article-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.15s;
}

.article-item:hover {
  background: #f5f5f5;
}

.article-title {
  color: #333;
  flex: 1;
}

.article-arrow {
  color: #999;
  font-size: 0.875rem;
}

.placeholder {
  text-align: center;
  padding: 4rem 0;
  color: #999;
  font-size: 1rem;
}
</style>
