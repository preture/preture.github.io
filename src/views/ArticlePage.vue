<template>
  <article class="article-page">
    <div class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}`">{{ category?.name }}</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}/${topicId}`">{{ topic?.name }}</router-link>
      <template v-if="subTopicId">
        <span class="sep">/</span>
        <router-link :to="`/${categorySlug}/${topicId}/${subTopicId}`">{{ subTopic?.name }}</router-link>
      </template>
    </div>

    <MarkdownRenderer :content="content" />
  </article>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import { findCategory, findTopic, findSubTopic } from '../config/site'

const props = defineProps({
  content: { type: String, required: true },
  categorySlug: { type: String, required: true },
  topicId: { type: String, required: true },
  subTopicId: { type: String, default: '' },
})

const category = computed(() => findCategory(props.categorySlug))
const topic = computed(() => findTopic(props.categorySlug, props.topicId))
const subTopic = computed(() =>
  props.subTopicId ? findSubTopic(props.categorySlug, props.topicId, props.subTopicId) : null
)
</script>

<style scoped>
.article-page {
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
</style>
