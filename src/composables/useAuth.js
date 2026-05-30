import { ref, computed } from 'vue'
import { users } from '../config/auth'

const AUTH_KEY = 'preture-auth'

const _authenticated = ref(sessionStorage.getItem(AUTH_KEY) === 'true')
const _currentUser = ref(sessionStorage.getItem('preture-user') || '')
const _currentRole = ref(sessionStorage.getItem('preture-role') || '')
const _pendingRoute = ref(null)

function findUser(username) {
  return users.find((u) => u.username === username) || null
}

async function sha256(str) {
  const enc = new TextEncoder().encode(str)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function useAuth() {
  async function login(username, password) {
    const hash = await sha256(password)
    const user = users.find(
      (u) => u.username === username && u.passwordHash === hash
    )
    if (user) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      sessionStorage.setItem('preture-user', username)
      sessionStorage.setItem('preture-role', user.role || '')
      _authenticated.value = true
      _currentUser.value = username
      _currentRole.value = user.role || ''
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem('preture-user')
    sessionStorage.removeItem('preture-role')
    _authenticated.value = false
    _currentUser.value = ''
    _currentRole.value = ''
  }

  const isAuthenticated = computed(() => _authenticated.value && users.length > 0)
  const currentUser = computed(() => _currentUser.value)
  const currentRole = computed(() => _currentRole.value)
  const isConfigured = computed(() => users.length > 0)
  const pendingRoute = computed(() => _pendingRoute.value)

  function canAccess(level) {
    if (level === 'open') return true
    if (!isAuthenticated.value) return false
    if (level === 'protected') return true
    if (level === 'privated') {
      const user = findUser(_currentUser.value)
      return user?.role === 'admin'
    }
    return false
  }

  function requireAuth(path) {
    _pendingRoute.value = path
  }

  function clearPendingRoute() {
    _pendingRoute.value = null
  }

  return {
    isAuthenticated,
    isConfigured,
    currentUser,
    currentRole,
    pendingRoute,
    canAccess,
    login,
    logout,
    requireAuth,
    clearPendingRoute,
  }
}
