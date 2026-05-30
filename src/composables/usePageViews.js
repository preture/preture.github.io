const STORAGE_KEY = 'preture-pageviews'

function loadCache() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveCache(data) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function usePageViews() {
  function storePageView(path) {
    const el = document.getElementById('busuanzi_value_page_pv')
    if (!el) return
    const raw = el.innerText || el.textContent
    const count = parseInt(raw, 10)
    if (isNaN(count)) return
    const cache = loadCache()
    cache[path] = count
    saveCache(cache)
  }

  function getPageView(path) {
    return loadCache()[path] ?? null
  }

  function getAllPageViews() {
    return loadCache()
  }

  return { storePageView, getPageView, getAllPageViews }
}
