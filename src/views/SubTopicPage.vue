<template>
  <div class="subtopic-page container page-pad">
    <nav class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}`">{{ category?.name }}</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}/${topicId}`">{{ topic?.name }}</router-link>
      <span class="sep">/</span>
      <span>{{ subTopic?.name }}</span>
    </nav>

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
      <div class="placeholder-icon">📝</div>
      <p>功能完善中，敬请期待</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { findCategory, findTopic, findSubTopic } from '../config/site'
import { getSubTopicArticles, ensureSubTopicTitles } from '../content'

const props = defineProps({
  categorySlug: { type: String, required: true },
  topicId: { type: String, required: true },
  subTopicId: { type: String, required: true },
})

const category = computed(() => findCategory(props.categorySlug))
const topic = computed(() => findTopic(props.categorySlug, props.topicId))
const subTopic = computed(() => findSubTopic(props.categorySlug, props.topicId, props.subTopicId))

const articles = ref([])
const titlesReady = ref(false)

onMounted(async () => {
  articles.value = getSubTopicArticles(props.categorySlug, props.topicId, props.subTopicId)
  await ensureSubTopicTitles(props.categorySlug, props.topicId, props.subTopicId)
  articles.value = [...getSubTopicArticles(props.categorySlug, props.topicId, props.subTopicId)]
  titlesReady.value = true
})
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

.subtopic-header {
  margin-bottom: 2rem;
}

.subtopic-header h1 {
  font-size: 1.5rem;
  color: var(--heading);
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 700;
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
