<template>
  <div class="home">
    <section class="hero">
      <h1>preture</h1>
      <p class="subtitle">持续探索，记录分享</p>
    </section>

    <section class="intro">
      <p>欢迎来到 preture 的个人站点。这里记录着我在编程、AI 和各类项目中的探索与实践。</p>
    </section>

    <section class="categories">
      <router-link
        v-for="cat in categories"
        :key="cat.id"
        :to="`/${cat.id}`"
        class="category-card"
        :style="{ '--accent': cat.color }"
      >
        <span class="cat-emoji">{{ cat.emoji }}</span>
        <h2>{{ cat.name }}</h2>
        <p class="cat-desc">{{ cat.description }}</p>
        <span class="cat-count">{{ cat.topics.length }} 个主题</span>
        <span class="cat-arrow">&rarr;</span>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { categories } from '../router'
</script>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 0 1rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

.subtitle {
  color: #666;
  font-size: 1.125rem;
}

.intro {
  text-align: center;
  margin-bottom: 2.5rem;
  color: #444;
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  position: relative;
}

.category-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.cat-emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.category-card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #2c3e50;
}

.cat-desc {
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  flex: 1;
}

.cat-count {
  color: #999;
  font-size: 0.8rem;
  margin-top: 0.75rem;
}

.cat-arrow {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  color: var(--accent);
  font-size: 1.25rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.category-card:hover .cat-arrow {
  opacity: 1;
}
</style>
