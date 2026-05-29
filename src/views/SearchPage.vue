<template>
  <div class="search-page container page-pad">
    <div class="search-box">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        class="search-input"
        placeholder="搜索文章标题..."
        autofocus
      />
      <button v-if="query" class="clear-btn" @click="query = ''">&times;</button>
    </div>

    <div v-if="query && results.length" class="results">
      <p class="result-count">共 {{ results.length }} 条结果</p>
      <router-link
        v-for="r in results"
        :key="r.path"
        :to="r.path"
        class="result-item"
      >
        <div class="result-title">{{ r.title }}</div>
        <div class="result-path">{{ r.path }}</div>
      </router-link>
    </div>

    <div v-else-if="query && !results.length" class="empty">
      <p>未找到相关文章</p>
    </div>

    <div v-else class="empty">
      <p>输入关键词搜索文章</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import Fuse from 'fuse.js'
import { buildSearchIndex } from '../content'

const query = ref('')
const inputRef = ref(null)

const fuse = computed(() => {
  const items = buildSearchIndex()
  return new Fuse(items, {
    keys: ['title', 'body'],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 1,
  })
})

const results = computed(() => {
  if (!query.value.trim()) return []
  return fuse.value.search(query.value.trim()).map((r) => r.item)
})

onMounted(() => {
  nextTick(() => inputRef.value?.focus())
})
</script>

<style scoped>
.page-pad {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 1rem auto 2rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.85rem 2.5rem 0.85rem 3rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  color: var(--text);
  font-size: 1rem;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.clear-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.results {
  max-width: 600px;
  margin: 0 auto;
}

.result-count {
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
}

.result-item {
  display: block;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  text-decoration: none;
  transition: background 0.15s;
  margin-bottom: 0.35rem;
}

.result-item:hover {
  background: var(--accent-soft);
  text-decoration: none;
}

.result-title {
  color: var(--heading);
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  font-family: var(--font-heading);
}

.result-path {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.empty {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}
</style>
