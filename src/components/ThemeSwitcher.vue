<template>
  <div class="theme-switcher" :class="{ open }">
    <button class="toggle-btn" @click="open = !open" :title="`当前主题：${currentTheme?.name}`">
      <span class="current-swatch" :style="{ background: currentTheme?.color }"></span>
      <span class="current-label">{{ currentTheme?.name }}</span>
      <svg class="chevron" :class="{ up: open }" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
        <path d="M0 0l5 6 5-6z" />
      </svg>
    </button>
    <div v-if="open" class="theme-menu">
      <button
        v-for="t in themes"
        :key="t.id"
        :class="['theme-option', { active: current === t.id }]"
        @click="select(t.id)"
      >
        <span class="swatch" :style="{ background: t.color }"></span>
        <span class="label">{{ t.name }}</span>
        <svg v-if="current === t.id" class="check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const emit = defineEmits(['change'])
const props = defineProps({
  modelValue: { type: String, default: '简约' },
})

const open = ref(false)
const current = ref(props.modelValue)

const themes = [
  { id: '简约', name: '简约', color: '#0984e3' },
  { id: '现代', name: '现代', color: '#a29bfe' },
  { id: '科技', name: '科技', color: '#00ff88' },
  { id: '古典', name: '古典', color: '#c0693c' },
]

const currentTheme = computed(() => themes.find((t) => t.id === current.value))

function select(id) {
  current.value = id
  open.value = false
  emit('change', id)
}

watch(() => props.modelValue, (val) => {
  current.value = val
})

function onClickOutside(e) {
  if (!e.target.closest('.theme-switcher')) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})
</script>

<style scoped>
.theme-switcher {
  position: relative;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-card);
  color: var(--text-soft);
  cursor: pointer;
  font-size: 0.8rem;
  font-family: var(--font-body);
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
  transition: border-color 0.2s, background 0.2s;
}

.toggle-btn:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.current-swatch {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.current-label {
  line-height: 1;
}

.chevron {
  opacity: 0.5;
  transition: transform 0.2s;
}

.chevron.up {
  transform: rotate(180deg);
}

.theme-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  min-width: 120px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
  box-shadow: var(--shadow-hover);
  white-space: nowrap;
  z-index: 100;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: none;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  font-size: 0.85rem;
  font-family: var(--font-body);
  transition: background 0.12s;
  text-align: left;
  width: 100%;
}

.theme-option:hover {
  background: var(--accent-soft);
}

.theme-option.active {
  color: var(--heading);
  font-weight: 600;
}

.swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(128, 128, 128, 0.15);
}

.label {
  flex: 1;
  line-height: 1;
}

.check {
  opacity: 0.6;
  flex-shrink: 0;
}
</style>
