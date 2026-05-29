<template>
  <div class="subtopic-page">
    <div class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}`">{{ category?.name }}</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}/${topicId}`">{{ topic?.name }}</router-link>
      <span class="sep">/</span>
      <span>{{ subTopic?.name }}</span>
    </div>

    <div class="subtopic-header">
      <h1>{{ subTopic?.name }}</h1>
    </div>

    <div v-if="articles.length" class="article-list">
      <router-link
        v-for="article in articles"
        :key="article.slug"
        :to="`/${categorySlug}/${topicId}/${subTopicId}/${article.slug}`"
        class="article-item"
      >
        <span class="article-title">{{ article.title }}</span>
        <span class="article-arrow">&rarr;</span>
      </router-link>
    </div>

    <div v-else class="placeholder">
      <p>功能完善中，敬请期待</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { findCategory, findTopic, findSubTopic } from '../config/site'
import { getSubTopicArticles } from '../content'

const props = defineProps({
  categorySlug: { type: String, required: true },
  topicId: { type: String, required: true },
  subTopicId: { type: String, required: true },
})

const category = computed(() => findCategory(props.categorySlug))
const topic = computed(() => findTopic(props.categorySlug, props.topicId))
const subTopic = computed(() => findSubTopic(props.categorySlug, props.topicId, props.subTopicId))

const articles = computed(() => getSubTopicArticles(props.categorySlug, props.topicId, props.subTopicId))
</script>

<style scoped>
.subtopic-page {
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

.subtopic-header {
  margin-bottom: 1.5rem;
}

.subtopic-header h1 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
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
