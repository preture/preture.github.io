<template>
  <article class="article-page container page-pad">
    <nav class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}`">{{ category?.name }}</router-link>
      <span class="sep">/</span>
      <router-link :to="`/${categorySlug}/${topicId}`">{{ topic?.name }}</router-link>
      <template v-if="subTopicId">
        <span class="sep">/</span>
        <router-link :to="`/${categorySlug}/${topicId}/${subTopicId}`">{{ subTopic?.name }}</router-link>
      </template>
    </nav>

    <MarkdownRenderer :content="content" />

    <GiscusComment :term="commentTerm" />
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import GiscusComment from '../components/GiscusComment.vue'
import { findCategory, findTopic, findSubTopic } from '../config/site'

const props = defineProps({
  content: { type: String, required: true },
  categorySlug: { type: String, required: true },
  topicId: { type: String, required: true },
  subTopicId: { type: String, default: '' },
})

const route = useRoute()

const category = computed(() => findCategory(props.categorySlug))
const topic = computed(() => findTopic(props.categorySlug, props.topicId))
const subTopic = computed(() =>
  props.subTopicId ? findSubTopic(props.categorySlug, props.topicId, props.subTopicId) : null
)
const commentTerm = computed(() => route.path)
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
</style>
