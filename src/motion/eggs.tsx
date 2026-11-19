import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersStill } from './progress'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const STORE = 'zr-eggs'

function readFound(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(STORE) ?? '[]')
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

/** Konami code payoff: a shower of sparks, like a car bottoming out at speed. */
function cubeRain() {
  if (prefersStill()) return
  const canvas = document.createElement('canvas')
  canvas.className = 'egg-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const sparks = Array.from({ length: 220 }, () => ({
    x: Math.random() * w,
    y: -Math.random() * h * 0.8,
    vx: (Math.random() - 0.5) * 3,
    vy: 6 + Math.random() * 10,
    len: 10 + Math.random() * 26,
    c: Math.random() < 0.3 ? '#ffffff' : Math.random() < 0.6 ? '#19e6d0' : '#ffd18a',
  }))
  const start = performance.now()
  const frame = (now: number) => {
    ctx.clearRect(0, 0, w, h)
    ctx.lineWidth = 2
    for (const s of sparks) {
      s.x += s.vx
      s.y += s.vy
      s.vy += 0.15
      ctx.strokeStyle = s.c
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x - s.vx * 2, s.y - s.len)
      ctx.stroke()
    }
    if (now - start < 4200) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}

/** Typing "kafka" streams event packets across the screen. */
function kafkaStream() {
  if (prefersStill()) return
  const layer = document.createElement('div')
  layer.className = 'packet-layer'
  layer.setAttribute('aria-hidden', 'true')
  const topics = ['orders', 'clicks', 'trades', 'news', 'sensors']
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span')
    p.className = 'packet caption-3'
    p.textContent = `${topics[i % topics.length]} · offset ${1000 + ((Math.random() * 9000) | 0)}`
    p.style.top = `${6 + Math.random() * 86}%`
    p.style.animationDelay = `${(Math.random() * 1.6).toFixed(2)}s`
    p.style.animationDuration = `${(2.2 + Math.random() * 1.4).toFixed(2)}s`
    layer.appendChild(p)
  }
  document.body.appendChild(layer)
  window.setTimeout(() => layer.remove(), 5200)
}

export function useEasterEggs() {
  const [found, setFound] = useState<string[]>(readFound)
  const [toast, setToast] = useState<string>('')
  const toastTimer = useRef<number>(0)

  const say = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 4200)
  }, [])

  const discover = useCallback(
    (id: string, msg: string) => {
      setFound((prev) => {
        if (prev.includes(id)) return prev
        const next = [...prev, id]
        try {
          localStorage.setItem(STORE, JSON.stringify(next))
        } catch {
          /* storage unavailable */
        }
        return next
      })
      say(msg)
    },
    [say],
  )

  useEffect(() => {
    let kIdx = 0
    let typed = ''
    let clicks: number[] = []

    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && /^(input|textarea|select)$/i.test(el.tagName)) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      kIdx = key === KONAMI[kIdx] ? kIdx + 1 : key === KONAMI[0] ? 1 : 0
      if (kIdx === KONAMI.length) {
        kIdx = 0
        cubeRain()
        discover('konami', 'Cheat code accepted. Secret 1 of 3 found: the spark shower.')
      }
      if (e.key.length === 1) {
        typed = (typed + key).slice(-5)
        if (typed === 'kafka') {
          typed = ''
          kafkaStream()
          discover('kafka', 'Topic subscribed. Secret 2 of 3 found: the event stream.')
        }
      }
    }

    const onBrand = () => {
      const now = performance.now()
      clicks = [...clicks.filter((t) => now - t < 2500), now]
      if (clicks.length >= 5) {
        clicks = []
        const root = document.documentElement
        const on = root.dataset.mode !== 'warp'
        if (on) root.dataset.mode = 'warp'
        else delete root.dataset.mode
        if (on) discover('warp', 'Warp mode on. Secret 3 of 3 found. Click the logo 5 times again to exit.')
        else say('Warp mode off. Back to normal space.')
      }
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('brand-click', onBrand)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('brand-click', onBrand)
    }
  }, [discover, say])

  return { found, toast }
}
