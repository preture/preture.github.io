# Vue 3 快速上手

Vue 3 引入了组合式 API（Composition API），让逻辑复用和组织更加灵活。

## 组合式 API 示例

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    Count: {{ count }} (double: {{ double }})
  </button>
</template>
```

## 响应式基础

`ref` 用于声明响应式状态，`computed` 用于派生状态：

```js
import { ref, computed } from 'vue'

const name = ref('World')
const greeting = computed(() => `Hello, ${name.value}!`)
```

## 生命周期

Vue 3 中组合式 API 的生命周期钩子：

| 选项式 API | 组合式 API |
|-----------|-----------|
| `mounted` | `onMounted` |
| `updated` | `onUpdated` |
| `unmounted` | `onUnmounted` |

更多信息请参考 [Vue 3 官方文档](https://vuejs.org/)。
