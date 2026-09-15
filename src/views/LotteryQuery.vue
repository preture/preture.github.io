<template>
  <div class="lottery-page container page-pad">
    <nav class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link to="/practice">身体力行</router-link>
      <span class="sep">/</span>
      <router-link to="/practice/mobile-tools">移动工具箱</router-link>
      <span class="sep">/</span>
      <span>彩票信息查询</span>
    </nav>

    <div class="page-header">
      <h1>🎰 彩票信息查询</h1>
      <p class="page-desc">双色球 / 大乐透历史开奖查询，输入号码验证历史中奖情况</p>
    </div>

    <div class="controls">
      <div class="tab-group">
        <button
          class="tab-btn"
          :class="{ active: tab === 'history' }"
          @click="tab = 'history'"
        >开奖历史</button>
        <button
          class="tab-btn"
          :class="{ active: tab === 'query' }"
          @click="tab = 'query'"
        >号码查询</button>
      </div>
      <div class="toggle-group">
        <button
          v-for="t in lotteryTypes"
          :key="t.type"
          class="type-btn"
          :class="{ active: type === t.type }"
          @click="switchType(t.type)"
        >{{ t.name }}</button>
      </div>
    </div>

    <div v-if="loading" class="loading">数据加载中...</div>

    <template v-else-if="error">
      <div class="error-box">
        <p>{{ error }}</p>
        <button class="retry-btn" @click="load">重新加载</button>
      </div>
    </template>

    <template v-else>
      <!-- ============ 开奖历史 ============ -->
      <div v-if="tab === 'history'">
        <div class="history-toolbar">
          <input
            v-model="issueFilter"
            class="issue-input"
            type="text"
            placeholder="按期号筛选"
          />
          <span class="draw-count">共 {{ filteredDraws.length }} 期</span>
        </div>
        <div class="draw-list">
          <div v-for="d in filteredDraws" :key="d.issue" class="draw-item">
            <div class="draw-meta">
              <span class="draw-issue">第 {{ d.issue }} 期</span>
              <span class="draw-date">{{ d.date }}</span>
            </div>
            <div class="draw-nums">
              <span
                v-for="n in d.front"
                :key="n"
                class="ball"
                :class="type === 'ssq' ? 'ball-red' : 'ball-front'"
              >{{ n }}</span>
              <span
                v-for="n in d.back"
                :key="n"
                class="ball"
                :class="type === 'ssq' ? 'ball-blue' : 'ball-back'"
              >{{ n }}</span>
            </div>
            <div v-if="d.prizes.length" class="prizes">
              <span v-for="p in d.prizes" :key="p.tier" class="prize-chip">
                {{ prizeName(p.tier) }} {{ p.count > 0 ? p.count + ' 注 ' : '' }}{{ fmtMoney(p.amount) }}元
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ 号码查询 ============ -->
      <div v-else class="query-panel">
        <div class="num-form">
          <div class="num-field">
            <label>{{ frontLabel }}(1-{{ meta.frontMax }})</label>
            <input
              v-model="frontInput"
              class="num-input"
              type="text"
              :placeholder="`输入 ${meta.frontSize} 个号码，用逗号分隔，如 ${placeholderFront}`"
            />
          </div>
          <div class="num-field">
            <label>{{ backLabel }}(1-{{ meta.backMax }})</label>
            <input
              v-model="backInput"
              class="num-input"
              type="text"
              :placeholder="`输入 ${meta.backSize} 个号码，用逗号分隔，如 ${placeholderBack}`"
            />
          </div>
          <button class="query-btn" :disabled="!validInput" @click="runQuery">查询中奖历史</button>
          <p v-if="validateMsg && !validInput" class="validate-msg">{{ validateMsg }}</p>
        </div>

        <div v-if="queryResults !== null" class="query-result">
          <div v-if="queryResults.length === 0" class="no-hit">
            <p>🎉 该号码在最近 {{ meta.draws.length }} 期中未中过奖</p>
          </div>
          <template v-else>
            <div class="result-summary">
              <p>共命中 <b>{{ queryResults.length }}</b> 期</p>
              <p>中奖合计 <b class="total-amount">{{ fmtMoney(totalWon) }}</b> 元</p>
              <p>中奖等级：<span v-for="t in tierSummary" :key="t.tier" class="prize-chip">{{ prizeName(t.tier) }} × {{ t.count }}</span></p>
            </div>
            <div class="result-list">
              <div v-for="r in queryResults" :key="r.issue" class="result-item">
                <div class="result-head">
                  <span class="draw-issue">第 {{ r.issue }} 期</span>
                  <span class="draw-date">{{ r.date }}</span>
                  <span class="tier-badge">中 {{ prizeName(r.tier) }}</span>
                  <span class="tier-money">{{ fmtMoney(r.amount) }} 元</span>
                </div>
                <div class="draw-nums">
                  <span
                    v-for="n in r.front"
                    :key="n"
                    class="ball"
                    :class="[type === 'ssq' ? 'ball-red' : 'ball-front', isHit(n, r.front, r.userFront) ? 'ball-hit' : 'ball-miss']"
                  >{{ n }}</span>
                  <span
                    v-for="n in r.back"
                    :key="n"
                    class="ball"
                    :class="[type === 'ssq' ? 'ball-blue' : 'ball-back', isHit(n, r.back, r.userBack) ? 'ball-hit' : 'ball-miss']"
                  >{{ n }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const lotteryTypes = [
  { type: 'ssq', name: '双色球' },
  { type: 'dlt', name: '大乐透' },
]

const tab = ref('history')
const type = ref('ssq')
const dataMap = reactive({ ssq: null, dlt: null })
const loading = ref(true)
const error = ref('')

const issueFilter = ref('')
const frontInput = ref('')
const backInput = ref('')
const queryResults = ref(null)

const meta = computed(() => dataMap[type.value] || { frontSize: 6, backSize: 1, frontMax: 33, backMax: 16, draws: [] })
const frontLabel = computed(() => (type.value === 'ssq' ? '红球' : '前区'))
const backLabel = computed(() => (type.value === 'ssq' ? '蓝球' : '后区'))
const placeholderFront = computed(() => Array.from({ length: meta.value.frontSize }, (_, i) => String(i + 1).padStart(2, '0')).join(','))
const placeholderBack = computed(() => Array.from({ length: meta.value.backSize }, (_, i) => String(i + 11).padStart(2, '0')).join(','))

const filteredDraws = computed(() => {
  const kw = issueFilter.value.trim()
  if (!kw) return meta.value.draws
  return meta.value.draws.filter((d) => d.issue.includes(kw))
})

function switchType(t) {
  if (t === type.value) return
  type.value = t
  issueFilter.value = ''
  frontInput.value = ''
  backInput.value = ''
  queryResults.value = null
}

function prizeName(tier) {
  if (type.value === 'ssq') return ['', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖'][tier] || `第${tier}等奖`
  return ['', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖', '七等奖', '八等奖', '九等奖'][tier] || `第${tier}等奖`
}

function fmtMoney(n) {
  if (n == null || n === 0) return '0'
  return n.toLocaleString('zh-CN')
}

function parseNums(input, expect, max) {
  const parts = input
    .trim()
    .split(/[,，\s]+/)
    .filter(Boolean)
    .map((x) => parseInt(x, 10))
  if (parts.length !== expect) return { ok: false, msg: `需要输入 ${expect} 个号码，当前 ${parts.length} 个` }
  if (parts.some((n) => !Number.isInteger(n) || n < 1 || n > max)) return { ok: false, msg: `号码需在 1-${max} 之间` }
  if (new Set(parts).size !== parts.length) return { ok: false, msg: '号码不能重复' }
  return { ok: true, nums: parts }
}

const validateMsg = computed(() => {
  const f = parseNums(frontInput.value, meta.value.frontSize, meta.value.frontMax)
  const b = parseNums(backInput.value, meta.value.backSize, meta.value.backMax)
  if (!f.ok) return f.msg
  if (!b.ok) return b.msg
  return ''
})

const validInput = computed(() => !validateMsg.value)

function tierOf(mf, mb) {
  if (type.value === 'ssq') {
    if (mf === 6 && mb === 1) return 1
    if (mf === 6 && mb === 0) return 2
    if (mf === 5 && mb === 1) return 3
    if (mf === 5 && mb === 0) return 4
    if (mf === 4 && mb === 1) return 4
    if (mf === 4 && mb === 0) return 5
    if (mf === 3 && mb === 1) return 5
    if (mb === 1) return 6
    return 0
  }
  if (mf === 5 && mb === 2) return 1
  if (mf === 5 && mb === 1) return 2
  if (mf === 5 && mb === 0) return 3
  if (mf === 4 && mb === 2) return 4
  if (mf === 4 && mb === 1) return 5
  if (mf === 3 && mb === 2) return 6
  if (mf === 4 && mb === 0) return 6
  if (mf === 3 && mb === 1) return 7
  if (mf === 2 && mb === 2) return 7
  if (mf === 3 && mb === 0) return 8
  if (mf === 1 && mb === 2) return 8
  if (mf === 2 && mb === 1) return 8
  if (mf === 0 && mb === 2) return 9
  if (mf === 1 && mb === 1) return 9
  return 0
}

function runQuery() {
  const f = parseNums(frontInput.value, meta.value.frontSize, meta.value.frontMax)
  const b = parseNums(backInput.value, meta.value.backSize, meta.value.backMax)
  if (!f.ok || !b.ok) return
  const userFront = new Set(f.nums)
  const userBack = new Set(b.nums)
  const results = []
  for (const d of meta.value.draws) {
    const mf = d.front.filter((n) => userFront.has(parseInt(n, 10))).length
    const mb = d.back.filter((n) => userBack.has(parseInt(n, 10))).length
    const tier = tierOf(mf, mb)
    if (tier > 0) {
      const prizeRow = d.prizes.find((p) => p.tier === tier)
      results.push({
        issue: d.issue,
        date: d.date,
        front: d.front,
        back: d.back,
        userFront: f.nums,
        userBack: b.nums,
        tier,
        amount: prizeRow ? prizeRow.amount : 0,
      })
    }
  }
  queryResults.value = results
}

const totalWon = computed(() => (queryResults.value || []).reduce((s, r) => s + (r.amount || 0), 0))

const tierSummary = computed(() => {
  const map = {}
  for (const r of queryResults.value || []) {
    map[r.tier] = (map[r.tier] || 0) + 1
  }
  return Object.keys(map)
    .sort((a, b) => a - b)
    .map((tier) => ({ tier: Number(tier), count: map[tier] }))
})

function isHit(n, nums, userNums) {
  return userNums.includes(parseInt(n, 10))
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const [ssq, dlt] = await Promise.all([
      fetch('/lottery/ssq.json').then((r) => r.json()),
      fetch('/lottery/dlt.json').then((r) => r.json()),
    ])
    dataMap.ssq = ssq
    dataMap.dlt = dlt
  } catch (e) {
    error.value = '开奖数据加载失败，请稍后重试，或先在仓库执行 npm run update-lottery 更新数据'
  }
  loading.value = false
}

onMounted(load)
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

.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0 0 0.35rem;
  color: var(--heading);
  font-family: var(--font-heading);
}

.page-desc {
  color: var(--text-soft);
  font-size: 0.875rem;
  margin: 0;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.toggle-group,
.tab-group {
  display: flex;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.type-btn,
.tab-btn {
  padding: 0.45rem 1.1rem;
  border: none;
  background: var(--bg-card);
  color: var(--text-soft);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.type-btn:not(:last-child),
.tab-btn:not(:last-child) {
  border-right: 1px solid var(--border);
}

.type-btn.active,
.tab-btn.active {
  background: var(--accent);
  color: #fff;
}

.type-btn:not(.active):hover,
.tab-btn:not(.active):hover {
  background: var(--accent-soft);
}

.loading {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
}

.error-box {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-soft);
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text);
  cursor: pointer;
}

.history-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.issue-input {
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text);
  font-size: 0.875rem;
  outline: none;
  width: 180px;
}

.issue-input:focus {
  border-color: var(--accent);
}

.draw-count {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.draw-list {
  display: grid;
  gap: 0.6rem;
}

.draw-item {
  padding: 0.9rem 1rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--bg-card);
}

.draw-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.draw-issue {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--heading);
  font-family: var(--font-heading);
}

.draw-date {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.draw-nums {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.ball {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.ball-red,
.ball-front {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 2px 6px rgba(231, 76, 60, 0.35);
}

.ball-blue,
.ball-back {
  background: linear-gradient(135deg, #3498db, #2f80ed);
  box-shadow: 0 2px 6px rgba(52, 152, 219, 0.35);
}

.ball-miss {
  opacity: 0.45;
  filter: saturate(0.4);
}

.ball-hit {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.prizes {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.prize-chip,
.tier-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--text-soft);
  font-size: 0.72rem;
}

/* ---- 号码查询 ---- */
.query-panel {
  max-width: 680px;
}

.num-form {
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  display: grid;
  gap: 0.9rem;
}

.num-field {
  display: grid;
  gap: 0.4rem;
}

.num-field label {
  font-size: 0.85rem;
  color: var(--text-soft);
}

.num-input {
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-body);
  color: var(--text);
  font-size: 0.95rem;
  outline: none;
}

.num-input:focus {
  border-color: var(--accent);
}

.query-btn {
  padding: 0.65rem;
  border: none;
  border-radius: var(--radius);
  background: var(--accent);
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.query-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.validate-msg {
  color: #e74c3c;
  font-size: 0.8rem;
  margin: 0;
}

.query-result {
  margin-top: 1.5rem;
}

.no-hit {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-soft);
}

.result-summary {
  padding: 1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  margin-bottom: 1rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.result-summary p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-soft);
}

.result-summary b {
  color: var(--heading);
}

.total-amount {
  color: #e74c3c;
  font-size: 1.05rem;
}

.result-list {
  display: grid;
  gap: 0.6rem;
}

.result-item {
  padding: 0.9rem 1rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--bg-card);
}

.result-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.tier-money {
  margin-left: auto;
  font-size: 0.85rem;
  font-weight: 600;
  color: #e74c3c;
}

@media (max-width: 560px) {
  .controls {
    gap: 0.6rem;
  }
  .ball {
    width: 28px;
    height: 28px;
    font-size: 0.72rem;
  }
}
</style>