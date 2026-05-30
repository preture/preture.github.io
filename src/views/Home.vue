<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content container">
        <div class="hero-text">
          <h1 class="hero-title">preture</h1>
          <p class="hero-subtitle">持续探索，记录分享</p>
          <p class="hero-desc">
            在编程、AI 和各类项目中不断折腾，把学到的、做过的都写在这里
          </p>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="categories">
          <router-link
            v-for="cat in visibleCategories"
            :key="cat.id"
          :to="`/${cat.id}`"
          class="category-card"
          :style="{ '--card-accent': cat.color }"
        >
          <div class="card-top">
            <span class="cat-emoji">{{ cat.emoji }}</span>
            <span class="cat-arrow">&rarr;</span>
          </div>
          <h2>{{ cat.name }}</h2>
          <p class="cat-desc">{{ cat.description }}</p>
          <div class="card-footer">
            <span class="cat-count">{{ cat.topics.length }} 个主题</span>
          </div>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { categories } from '../router'
import { useAuth } from '../composables/useAuth'

const { isAuthenticated } = useAuth()
const visibleCategories = computed(() =>
  categories.filter((c) => !c.hidden || isAuthenticated.value)
)
</script>

<style scoped>
.home {
  padding-bottom: 3rem;
}

.hero {
  position: relative;
  overflow: hidden;
  background: var(--bg-hero);
  padding: 4rem 0 3.5rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-hero);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.hero-bg {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image:
    radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, var(--accent) 0%, transparent 50%);
  transition: background 0.4s ease;
}

.hero-content {
  position: relative;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 0.35rem;
  color: var(--hero-text);
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  transition: color 0.4s ease;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--hero-text);
  opacity: 0.7;
  margin-bottom: 0.75rem;
  font-weight: 400;
  transition: color 0.4s ease;
}

.hero-desc {
  color: var(--hero-text);
  opacity: 0.5;
  font-size: 0.9rem;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
  transition: color 0.4s ease;
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  text-decoration: none;
  position: relative;
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
  box-shadow: var(--shadow);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s, background 0.4s;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--card-accent, var(--accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.category-card:hover {
  border-color: transparent;
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
  text-decoration: none;
}

.category-card:hover::before {
  transform: scaleX(1);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.cat-emoji {
  font-size: 2rem;
  line-height: 1;
}

.cat-arrow {
  color: var(--card-accent, var(--accent));
  font-size: 1.25rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s, transform 0.3s;
}

.category-card:hover .cat-arrow {
  opacity: 1;
  transform: translateX(0);
}

.category-card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  color: var(--heading);
  font-family: var(--font-heading);
}

.cat-desc {
  color: var(--text-soft);
  font-size: 0.85rem;
  line-height: 1.5;
  flex: 1;
}

.card-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-light);
}

.cat-count {
  color: var(--text-muted);
  font-size: 0.8rem;
}
</style>
