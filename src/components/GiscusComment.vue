<template>
  <div class="giscus-wrapper">
    <div class="giscus" ref="container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { giscus as cfg } from '../config/site'

const props = defineProps({
  term: { type: String, required: true },
})

const container = ref(null)

function loadGiscus() {
  if (!cfg.repoId || !cfg.categoryId) {
    container.value.innerHTML = `<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;">请配置 Giscus 的 repoId 和 categoryId</p>`
    return
  }

  if (container.value.querySelector('iframe')) return

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', cfg.repo)
  script.setAttribute('data-repo-id', cfg.repoId)
  script.setAttribute('data-category', cfg.category)
  script.setAttribute('data-category-id', cfg.categoryId)
  script.setAttribute('data-mapping', cfg.mapping)
  script.setAttribute('data-term', props.term)
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', cfg.lang)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  container.value.appendChild(script)
}

onMounted(loadGiscus)
watch(() => props.term, () => {
  // reload giscus when term changes
  if (container.value) {
    container.value.innerHTML = ''
    loadGiscus()
  }
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}
</style>
