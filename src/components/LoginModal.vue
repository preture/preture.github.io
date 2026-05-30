<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-box">
        <h2>🔒 后台登录</h2>
        <p>请输入账号密码</p>
        <form @submit.prevent="handleLogin">
          <input
            ref="userRef"
            v-model="username"
            type="text"
            placeholder="用户名"
            :disabled="loading"
            autocomplete="username"
          />
          <input
            v-model="password"
            type="password"
            placeholder="密码"
            :disabled="loading"
            autocomplete="current-password"
          />
          <p v-if="error" class="error">用户名或密码错误</p>
          <button type="submit" :disabled="loading || !username || !password">
            {{ loading ? '验证中...' : '确认' }}
          </button>
        </form>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useAuth } from '../composables/useAuth'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close', 'success'])

const { login } = useAuth()
const username = ref('')
const password = ref('')
const error = ref(false)
const loading = ref(false)
const userRef = ref(null)

watch(
  () => props.show,
  (val) => {
    if (val) {
      username.value = ''
      password.value = ''
      error.value = false
      nextTick(() => userRef.value?.focus())
    }
  }
)

async function handleLogin() {
  loading.value = true
  error.value = false
  const ok = await login(username.value, password.value)
  loading.value = false
  if (ok) {
    emit('success')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}
.modal-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem 2.5rem;
  max-width: 380px;
  width: 90%;
  position: relative;
  box-shadow: var(--shadow-hover);
  text-align: center;
}
.modal-box h2 {
  margin: 0 0 0.35rem;
  color: var(--heading);
  font-family: var(--font-heading);
}
.modal-box > p {
  margin: 0 0 1.25rem;
  color: var(--text-soft);
  font-size: 0.9rem;
}
.modal-box input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-body);
  color: var(--text);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  margin-bottom: 0.6rem;
}
.modal-box input:focus {
  border-color: var(--accent);
}
.modal-box button[type='submit'] {
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.6rem;
  border: none;
  border-radius: var(--radius);
  background: var(--accent);
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;
}
.modal-box button[type='submit']:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.modal-box .error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
}
.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem;
}
.close-btn:hover {
  color: var(--text);
}
</style>
