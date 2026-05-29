<template>
  <article class="md-page">
    <MarkdownRenderer :content="content" />
  </article>
</template>

<script setup>
import MarkdownRenderer from '../components/MarkdownRenderer.vue'

defineProps({
  content: { type: String, required: true },
  title: { type: String, default: '' },
})
</script>

<style scoped>
.md-page {
  max-width: 720px;
  margin: 0 auto;
}
</style>
