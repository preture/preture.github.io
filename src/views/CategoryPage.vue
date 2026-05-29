<template>
  <div class="category-page">
    <div class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <span>{{ category?.name }}</span>
    </div>

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
        <h3>{{ topic.name }}</h3>
        <p class="topic-desc">{{ topic.description }}</p>
        <span class="topic-meta">
          {{ topic.subTopics ? `${topic.subTopics.length} 个方向` : '文章' }}
        </span>
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

const props = defineProps({
  categorySlug: { type: String, required: true },
})

const category = computed(() => findCategory(props.categorySlug))
</script>

<style scoped>
.category-page {
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

.cat-header {
  text-align: center;
  margin-bottom: 2rem;
}

.cat-emoji {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.cat-header h1 {
  font-size: 1.75rem;
  color: #2c3e50;
  margin: 0 0 0.5rem;
}

.cat-desc {
  color: #666;
  font-size: 0.95rem;
}

.topic-grid {
  display: grid;
  gap: 1rem;
}

.topic-card {
  display: block;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.topic-card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
}

.topic-card h3 {
  margin: 0 0 0.35rem;
  color: #2c3e50;
  font-size: 1.1rem;
}

.topic-desc {
  color: #666;
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
}

.topic-meta {
  color: #999;
  font-size: 0.8rem;
}

.not-found {
  text-align: center;
  padding: 3rem 0;
  color: #999;
}
</style>
