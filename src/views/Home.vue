<template>
  <div class="home">
    <section class="hero">
      <h1>preture</h1>
      <p class="subtitle">个人主页 / 技术笔记</p>
    </section>

    <section class="intro">
      <p>欢迎来到 preture 的个人站点。这里会整理和分享技术相关的笔记与文章。</p>
    </section>

    <section v-if="pages.length" class="pages-list">
      <h2>文章</h2>
      <div class="card-grid">
        <router-link
          v-for="page in pages"
          :key="page.path"
          :to="page.path"
          class="card"
        >
          <h3>{{ page.title }}</h3>
          <span class="card-link">阅读 &rarr;</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { navPages } from '../router'
const pages = navPages
</script>

<style scoped>
.home {
  max-width: 720px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 0 1.5rem;
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
}

.pages-list h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.card-grid {
  display: grid;
  gap: 1rem;
}

.card {
  display: block;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
}

.card h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
  font-size: 1.125rem;
}

.card-link {
  color: #3498db;
  font-size: 0.875rem;
}
</style>
