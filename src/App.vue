<template>
  <div class="site-wrapper">
    <header class="site-header">
      <div class="container">
        <router-link to="/" class="logo">preture</router-link>
        <nav class="nav">
          <router-link to="/">首页</router-link>
          <router-link
            v-for="cat in navCategories"
            :key="cat.id"
            :to="`/${cat.id}`"
          >{{ cat.name }}</router-link>
          <router-link to="/search" class="nav-icon" title="搜索">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </router-link>
          <button class="mode-btn" @click="toggleMode" :title="mode === 'dark' ? '切换到浅色' : '切换到深色'">
            <svg v-if="mode === 'dark'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
          <ThemeSwitcher :model-value="theme" @change="setTheme" />
          <button
            v-if="!isAuthenticated"
            class="nav-login-btn"
            @click="showLogin = true"
          >登录</button>
          <button
            v-else
            class="nav-login-btn logged-in"
            @click="handleLogout"
          >退出</button>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="site-footer">
      <div class="container">
        <p>&copy; {{ year }} preture</p>
        <span v-if="busuanzi" id="busuanzi_container_site_pv" class="pv">
          👀 <span id="busuanzi_value_site_pv"></span>
        </span>
      </div>
    </footer>
    <LoginModal :show="showLogin" @close="closeLogin" @success="onLoginSuccess" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from './router'
import { busuanzi as busuanziEnabled } from './config/site'
import { useAuth } from './composables/useAuth'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import LoginModal from './components/LoginModal.vue'

const router = useRouter()
const { isAuthenticated, currentUser, pendingRoute, clearPendingRoute, logout } = useAuth()

const THEME_KEY = 'preture-theme'
const MODE_KEY = 'preture-mode'
const theme = ref('简约')
const mode = ref('light')
const busuanzi = busuanziEnabled
const showLogin = ref(false)

const navCategories = computed(() =>
  categories.filter((c) => !c.hidden || isAuthenticated.value)
)

watch(pendingRoute, (path) => {
  if (path) showLogin.value = true
})

function closeLogin() {
  showLogin.value = false
  clearPendingRoute()
}

function onLoginSuccess() {
  showLogin.value = false
  const path = pendingRoute.value
  clearPendingRoute()
  if (path) router.push(path)
}

function handleLogout() {
  logout()
  if (router.currentRoute.value.meta?.hidden) {
    router.push('/')
  }
}

function setTheme(id) {
  theme.value = id
  apply()
}

function toggleMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
  apply()
  localStorage.setItem(MODE_KEY, mode.value)
}

function apply() {
  document.documentElement.setAttribute('data-theme', theme.value)
  document.documentElement.setAttribute('data-mode', mode.value)
  localStorage.setItem(THEME_KEY, theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_KEY)
  const savedMode = localStorage.getItem(MODE_KEY)
  if (savedTheme) theme.value = savedTheme
  if (savedMode) mode.value = savedMode
  apply()

  if (busuanzi) {
    const s = document.createElement('script')
    s.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    s.async = true
    document.body.appendChild(s)
  }
})

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-body);
  transition: background 0.4s ease;
}

.site-header {
  background: var(--bg-header);
  color: var(--text-header);
  padding: 0.875rem 0;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: var(--backdrop);
  -webkit-backdrop-filter: var(--backdrop);
  box-shadow: 0 1px 0 var(--border-light);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-header);
  text-decoration: none;
  font-family: var(--font-heading);
  letter-spacing: 0.02em;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav a {
  color: var(--text-header);
  opacity: 0.65;
  text-decoration: none;
  transition: opacity 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transition: transform 0.2s;
}

.nav a:hover,
.nav a.router-link-active {
  opacity: 1;
  text-decoration: none;
}

.nav a.router-link-active::after {
  transform: scaleX(1);
}

.nav-icon {
  display: flex;
  align-items: center;
}

.nav-icon::after {
  display: none;
}

.mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: none;
  color: var(--text-header);
  opacity: 0.65;
  cursor: pointer;
  transition: opacity 0.2s;
  border-radius: 4px;
}

.mode-btn:hover {
  opacity: 1;
}

.nav-login-btn {
  background: none;
  border: 1px solid var(--text-header);
  color: var(--text-header);
  opacity: 0.6;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.nav-login-btn:hover {
  opacity: 1;
}

.nav-login-btn.logged-in {
  border-color: var(--text-muted);
  color: var(--text-muted);
}

.main-content {
  flex: 1;
}

.site-footer {
  background: var(--bg-footer);
  padding: 1.5rem 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.8rem;
  transition: background 0.4s ease;
}

.site-footer p {
  opacity: 0.6;
  margin-bottom: 0.25rem;
}

.pv {
  opacity: 0.4;
  font-size: 0.75rem;
}

/* page transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
