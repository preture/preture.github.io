#!/usr/bin/env node

import https from 'node:https'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'lottery')

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  Referer: 'https://www.sporttery.cn/',
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http
    const req = mod.get(url, { headers: BROWSER_HEADERS }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve, reject)
      }
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => resolve(data))
    })
    req.on('error', reject)
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')) })
  })
}

async function fetchSSQ(count = 100) {
  const url = `https://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=ssq&issueCount=${count}`
  const raw = JSON.parse(await fetch(url))
  if (!raw.result?.length) throw new Error('SSQ: empty result')
  return raw.result.map((r) => ({
    issue: r.code,
    date: r.date.replace(/\(.+\)/, ''),
    front: r.red.split(','),
    back: r.blue ? [r.blue] : [],
    prizes: (r.prizegrades || [])
      .filter((p) => p.typenum && p.typemoney)
      .map((p) => ({ tier: p.type, count: Number(p.typenum), amount: Number(p.typemoney) })),
  }))
}

async function fetchDLT(count = 100) {
  const pageSize = 100
  const totalPages = Math.ceil(count / pageSize)
  const draws = []
  for (let page = 1; page <= totalPages; page++) {
    const url = `https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=${pageSize}&isVerify=1&pageNo=${page}`
    const raw = JSON.parse(await fetch(url))
    const list = raw.value?.list
    if (!list?.length) {
      if (page === 1) throw new Error('DLT: empty result')
      break
    }
    draws.push(...list.map((item) => {
      const nums = item.lotteryDrawResult.trim().split(/\s+/)
      const front = nums.slice(0, 5)
      const back = nums.slice(5)
      const prizes = (item.prizeLevelList || [])
        .map((p) => ({
          tier: p.sort ? Math.floor(p.sort / 100) : 0,
          count: Number(p.stakeCount) || 0,
          amount: Number(String(p.stakeAmountFormat || p.stakeAmount).replace(/,/g, '')) || 0,
        }))
        .filter((p) => p.amount > 0 && p.tier >= 1 && p.tier <= 9)
      return { issue: item.lotteryDrawNum, date: item.lotteryDrawTime, front, back, prizes }
    }))
    if (draws.length >= count) break
  }
  return draws.slice(0, count)
}

function save(name, data) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const out = path.join(OUT_DIR, `${name}.json`)
  fs.writeFileSync(out, JSON.stringify(data))
  console.log(`  ${name}: ${data.draws.length} draws, ${(fs.statSync(out).size / 1024).toFixed(1)} KB → ${out}`)
}

try {
  console.log('Fetching lottery data...')
  const ssq = await fetchSSQ(500)
  save('ssq', { type: 'ssq', name: '双色球', frontSize: 6, backSize: 1, frontMax: 33, backMax: 16, draws: ssq })
  const dlt = await fetchDLT(500)
  save('dlt', { type: 'dlt', name: '大乐透', frontSize: 5, backSize: 2, frontMax: 35, backMax: 12, draws: dlt })
  console.log('Done.')
} catch (e) {
  console.error('Error:', e.message)
  process.exit(1)
}
