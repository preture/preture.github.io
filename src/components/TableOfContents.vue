<template>
  <nav v-if="headings.length" class="toc">
    <div class="toc-title">目录</div>
    <a
      v-for="h in headings"
      :key="h.id"
      :href="'#' + h.id"
      class="toc-item"
      :class="'toc-l' + Math.min(h.level, 4)"
      @click.prevent="scrollTo(h.id)"
    >{{ h.text }}</a>
  </nav>
</template>

<script setup>
defineProps({
  headings: { type: Array, default: () => [] },
})

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.toc {
  position: sticky;
  top: 5rem;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
  font-size: 0.82rem;
  line-height: 1.7;
  border-left: 2px solid var(--border-light);
  padding-left: 0.75rem;
}

.toc-title {
  font-weight: 600;
  font-family: var(--font-heading);
  color: var(--heading);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.toc-item {
  display: block;
  color: var(--text-soft);
  text-decoration: none;
  padding: 0.15rem 0;
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc-item:hover {
  color: var(--accent);
}

.toc-l2 { padding-left: 0; }
.toc-l3 { padding-left: 0.8rem; font-size: 0.78rem; }
.toc-l4 { padding-left: 1.6rem; font-size: 0.75rem; }
</style>
