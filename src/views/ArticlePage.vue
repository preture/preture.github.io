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

    <div class="article-layout">
      <aside class="toc-col" v-if="headings.length && viewMode === 'markdown'">
        <TableOfContents :headings="headings" />
      </aside>
      <div class="content-col">
        <div class="view-toggle">
          <button :class="{ active: viewMode === 'markdown' }" @click="viewMode = 'markdown'">原文</button>
          <button :class="{ active: viewMode === 'mindmap' }" @click="viewMode = 'mindmap'">思维导图</button>
        </div>

        <Suspense v-if="viewMode === 'markdown'">
          <MarkdownRenderer ref="mdRef" :content="content" />
          <template #fallback><div class="loading-content">加载中...</div></template>
        </Suspense>

        <MindMapViewer v-else :content="content" />

        <GiscusComment v-if="!isRestricted && viewMode === 'markdown'" :term="commentTerm" />
      </div>
    </div>

    <div class="scroll-btns" :class="{ visible: showScrollBtns }">
      <button class="scroll-btn" @click="scrollTo('top')" title="回到顶部">↑</button>
      <button class="scroll-btn" @click="scrollTo('bottom')" title="跳到底部">↓</button>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, watch, defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const MarkdownRenderer = defineAsyncComponent(() => import('../components/MarkdownRenderer.vue'))
import MindMapViewer from '../components/MindMapViewer.vue'
import TableOfContents from '../components/TableOfContents.vue'
import GiscusComment from '../components/GiscusComment.vue'
import { findCategory, findTopic, findSubTopic, getCategoryLevel } from '../config/site'

const props = defineProps({
  content: { type: String, required: true },
  categorySlug: { type: String, required: true },
  topicId: { type: String, required: true },
  subTopicId: { type: String, default: '' },
})

const route = useRoute()
const mdRef = ref(null)
const headings = ref([])
const viewMode = ref('markdown')

const showScrollBtns = ref(false)

function scrollTo(pos) {
  window.scrollTo({ top: pos === 'top' ? 0 : document.documentElement.scrollHeight, behavior: 'smooth' })
}

function onScroll() {
  showScrollBtns.value = window.scrollY > 400
}

watch(() => mdRef.value?.headings, (val) => {
  headings.value = val ?? []
}, { immediate: true })

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const category = computed(() => findCategory(props.categorySlug))
const topic = computed(() => findTopic(props.categorySlug, props.topicId))
const subTopic = computed(() =>
  props.subTopicId ? findSubTopic(props.categorySlug, props.topicId, props.subTopicId) : null
)
const isRestricted = computed(() => getCategoryLevel(props.categorySlug) !== 'open')
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

.article-layout {
  display: flex;
  gap: 2rem;
}

.toc-col {
  flex-shrink: 0;
  width: 190px;
}

.content-col {
  flex: 1;
  min-width: 0;
}

@media (max-width: 860px) {
  .toc-col {
    display: none;
  }
  .article-layout {
    gap: 0;
  }
}

.scroll-btns {
  position: fixed;
  right: 1.25rem;
  bottom: 5rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.scroll-btns.visible {
  opacity: 1;
  pointer-events: auto;
}

.scroll-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--text-soft);
  font-size: 1rem;
  cursor: pointer;
  box-shadow: var(--shadow-hover);
  transition: transform 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-btn:hover {
  transform: scale(1.1);
  color: var(--accent);
}

.view-toggle {
  display: flex;
  gap: 0;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  width: fit-content;
}

.view-toggle button {
  padding: 0.4rem 1rem;
  border: none;
  background: var(--bg-card);
  color: var(--text-soft);
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.view-toggle button:not(:last-child) {
  border-right: 1px solid var(--border);
}

.view-toggle button.active {
  background: var(--accent);
  color: #fff;
}

.view-toggle button:not(.active):hover {
  background: var(--accent-soft);
}
</style>
