<template>
  <div class="site-wrapper">
    <header class="site-header">
      <div class="container">
        <router-link to="/" class="logo">preture</router-link>
        <nav class="nav">
          <router-link to="/">首页</router-link>
          <router-link
            v-for="page in navPages"
            :key="page.path"
            :to="page.path"
          >{{ page.title }}</router-link>
        </nav>
      </div>
    </header>
    <main class="main-content container">
      <router-view />
    </main>
    <footer class="site-footer">
      <div class="container">
        <p>&copy; {{ year }} preture</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navPages } from './router'

const route = useRoute()
const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
  background: #2c3e50;
  color: #fff;
  padding: 1rem 0;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s;
}

.nav a:hover,
.nav a.router-link-active {
  color: #fff;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.site-footer {
  background: #f5f5f5;
  padding: 1rem 0;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
}
</style>
