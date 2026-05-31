<template>
  <div ref="containerRef" class="mindmap-container" :class="{ 'markmap-dark': isDark }">
    <svg ref="svgRef" class="mindmap-svg" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'

const props = defineProps({
  content: { type: String, required: true },
})

const containerRef = ref(null)
const svgRef = ref(null)
const isDark = ref(false)
let mm = null
let observer = null

function updateMode() {
  isDark.value = document.documentElement.getAttribute('data-mode') === 'dark'
}

function foldContentNodes(node) {
  if (node.payload?.tag === 'h2') {
    const hasHeadingChildren = node.children?.some(c => c.payload?.tag === 'h3')
    node.payload = { ...node.payload, fold: hasHeadingChildren ? 0 : 1 }
  }
  node.children?.forEach(foldContentNodes)
}

async function render() {
  if (!svgRef.value) return
  const transformer = new Transformer()
  const { root } = transformer.transform(props.content)
  foldContentNodes(root)

  if (mm) mm.destroy()
  mm = Markmap.create(svgRef.value, {
    zoomFit: true,
    fitRatio: 0.95,
    duration: 500,
    colorFreezeLevel: 2,
    initialExpandLevel: 3,
  }, root)
}

onMounted(() => {
  updateMode()
  nextTick(render)
  observer = new MutationObserver(updateMode)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] })
})

watch(() => props.content, () => nextTick(render))

onBeforeUnmount(() => {
  mm?.destroy(); mm = null
  observer?.disconnect()
})
</script>

<style scoped>
.mindmap-container {
  width: 100%;
  min-height: 500px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  overflow: hidden;
}
.mindmap-svg {
  width: 100%;
  min-height: 500px;
}
</style>
