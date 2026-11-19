import { useEffect, useRef } from 'react'

type RGB = [number, number, number]

const PALETTE: RGB[] = [
  [0, 210, 190],
  [42, 91, 255],
  [122, 92, 255],
  [0, 168, 255],
  [141, 160, 173],
  [62, 224, 200],
  [255, 120, 180],
]
const GLOBES = 14
const RADIUS = 150 // fixed base size in CSS px
const MERIDIANS = 10
const PARALLELS = 7
const LINES = MERIDIANS + PARALLELS
const SAMPLES = 72
const SCALE_MIN = 0.65
const SCALE_MAX = 1.5

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]
const ease = (cur: number, to: number, k: number) => cur + (to - cur) * k

type Globe = {
  x: number; y: number; hx: number; hy: number; ph: number[]; fq: number[]
  scale: number; scaleTo: number
  z: number; zTo: number
  alpha: number; alphaTo: number
  color: RGB; colorTo: RGB
  yaw: number; spin: number; spinTo: number
  tiltX: number; tiltXTo: number
  tiltZ: number; tiltZTo: number
  glow: number[]
  next: { z: number; scale: number; alpha: number; color: number; spin: number; tilt: number; line: number }
}

const makeGlobe = (w: number, h: number, now: number): Globe => ({
  x: w / 2, y: h / 2, hx: w / 2, hy: h / 2,
  ph: [rand(0, 6.28), rand(0, 6.28)], fq: [rand(0.05, 0.14), rand(0.05, 0.14)],
  scale: rand(SCALE_MIN, SCALE_MAX), scaleTo: rand(SCALE_MIN, SCALE_MAX),
  z: rand(0, 1), zTo: rand(0, 1),
  alpha: rand(0.2, 0.7), alphaTo: rand(0.2, 0.8),
  color: pick(PALETTE).slice() as RGB, colorTo: pick(PALETTE),
  yaw: rand(0, Math.PI * 2), spin: rand(-0.5, 0.5), spinTo: rand(-0.6, 0.6),
  tiltX: rand(-1, 1), tiltXTo: rand(-1.2, 1.2),
  tiltZ: rand(-1, 1), tiltZTo: rand(-1.2, 1.2),
  glow: new Array(LINES).fill(0),
  next: {
    z: now + rand(6, 14), scale: now + rand(2, 6), alpha: now + rand(3, 8), color: now + rand(4, 10),
    spin: now + rand(3, 9), tilt: now + rand(4, 10), line: now + rand(0.2, 1),
  },
})

/** Dot-matrix globes that swell, shrink, fade, spin, tilt, recolor and light up random lines. */
export default function Orbs() {
  const host = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    const box = host.current
    const ctx = el?.getContext('2d')
    if (!el || !box || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = performance.now()
    let globes: Globe[] = []
    let cellW = 200
    let cellH = 200
    let camX = 0
    let camY = 0
    let aimX = 0
    let aimY = 0
    let scrollY = window.scrollY
    const dust = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random(), p: Math.random() * 6.28 }))
    const onMove = (e: PointerEvent) => {
      aimX = e.clientX / window.innerWidth - 0.5
      aimY = e.clientY / window.innerHeight - 0.5
    }
    const onScroll = () => { scrollY = window.scrollY }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = box.clientWidth
      h = box.clientHeight
      el.width = Math.round(w * dpr)
      el.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!globes.length) {
        const t = performance.now() / 1000
        globes = Array.from({ length: GLOBES }, () => makeGlobe(w, h, t))
      }
      // evenly spaced slots: a grid whose cells match the viewport shape
      const cols = Math.max(1, Math.ceil(Math.sqrt((GLOBES * w) / h)))
      const rows = Math.ceil(GLOBES / cols)
      cellW = w / cols
      cellH = h / rows
      globes.forEach((g, i) => {
        const inLast = GLOBES - (rows - 1) * cols
        const lastRow = Math.floor(i / cols) === rows - 1
        g.hx = (i % cols + 0.5 + (lastRow ? (cols - inLast) / 2 : 0)) * cellW
        g.hy = (Math.floor(i / cols) + 0.5) * cellH
        g.x = g.hx
        g.y = g.hy
      })
    }

    const step = (g: Globe, dt: number, t: number) => {
      const n = g.next
      if (t > n.z) { g.zTo = rand(0, 1); n.z = t + rand(8, 18) }
      if (t > n.scale) { g.scaleTo = rand(SCALE_MIN, SCALE_MAX); n.scale = t + rand(3, 8) }
      if (t > n.alpha) { g.alphaTo = rand(0.05, 0.85); n.alpha = t + rand(2, 7) }
      if (t > n.color) { g.colorTo = pick(PALETTE); n.color = t + rand(4, 11) }
      if (t > n.spin) { g.spinTo = rand(-0.9, 0.9); n.spin = t + rand(3, 9) }
      if (t > n.tilt) { g.tiltXTo = rand(-1.3, 1.3); g.tiltZTo = rand(-1.3, 1.3); n.tilt = t + rand(4, 10) }
      const k = 1 - Math.exp(-dt * 0.8)
      g.scale = ease(g.scale, g.scaleTo, k)
      g.z = ease(g.z, g.zTo, k * 0.35)
      g.alpha = ease(g.alpha, g.alphaTo, k)
      g.spin = ease(g.spin, g.spinTo, k)
      g.tiltX = ease(g.tiltX, g.tiltXTo, k * 0.6)
      g.tiltZ = ease(g.tiltZ, g.tiltZTo, k * 0.6)
      for (let i = 0; i < 3; i++) g.color[i] = ease(g.color[i], g.colorTo[i], k)
      g.yaw += g.spin * dt
      for (let i = 0; i < LINES; i++) g.glow[i] = Math.max(0, g.glow[i] - dt * 0.55)
      // each globe sways around its own slot in an even grid
      g.x = g.hx + Math.sin(t * g.fq[0] * 6.28 + g.ph[0]) * cellW * 0.16
      g.y = g.hy + Math.sin(t * g.fq[1] * 6.28 + g.ph[1]) * cellH * 0.16
    }

    const draw = (g: Globe) => {
      const R = RADIUS * g.scale * (0.4 + g.z * 0.95)
      const fade = 0.3 + g.z * 0.7
      const dot = 0.6 + g.z * 0.8
      const ox = g.x + camX * g.z * 70
      const oy = g.y + camY * g.z * 70 - Math.min(scrollY, 2000) * 0.1 * g.z
      const cx = Math.cos(g.tiltX), sx = Math.sin(g.tiltX)
      const cz = Math.cos(g.tiltZ), sz = Math.sin(g.tiltZ)
      const cy = Math.cos(g.yaw), sy = Math.sin(g.yaw)
      const [r, gr, b] = g.color.map(Math.round)
      for (let li = 0; li < LINES; li++) {
        const meridian = li < MERIDIANS
        const hot = g.glow[li]
        for (let s = 0; s < SAMPLES; s++) {
          const u = (s / SAMPLES) * Math.PI * 2
          let px: number, py: number, pz: number
          if (meridian) {
            const lon = (li / MERIDIANS) * Math.PI
            px = Math.cos(u) * Math.cos(lon)
            py = Math.sin(u)
            pz = Math.cos(u) * Math.sin(lon)
          } else {
            const lat = ((li - MERIDIANS + 1) / (PARALLELS + 1)) * Math.PI - Math.PI / 2
            px = Math.cos(lat) * Math.cos(u)
            py = Math.sin(lat)
            pz = Math.cos(lat) * Math.sin(u)
          }
          // spin around the vertical axis, then tilt the whole globe
          let x = px * cy + pz * sy
          let z = -px * sy + pz * cy
          let y = py
          const y1 = y * cx - z * sx
          const z1 = y * sx + z * cx
          y = y1
          z = z1
          const x2 = x * cz - y * sz
          const y2 = x * sz + y * cz
          x = x2
          y = y2
          const depth = (z + 1) / 2 // 1 = facing viewer
          const a = g.alpha * fade * (0.12 + depth * 0.7) * (1 + hot * 1.4)
          const size = (1.3 + depth * 1.1 + hot * 1.8) * dot
          ctx.fillStyle = `rgba(${r},${gr},${b},${Math.min(1, a).toFixed(3)})`
          ctx.fillRect(ox + x * R - size / 2, oy + y * R - size / 2, size, size)
        }
      }
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      camX = ease(camX, aimX, 0.04)
      camY = ease(camY, aimY, 0.04)
      // distant dust: tiny specks that shift more the closer they are
      for (const d of dust) {
        const dx = ((d.x * w + camX * d.z * 90) % w + w) % w
        const dy = (((d.y * h - scrollY * 0.05 * d.z + camY * d.z * 90) % h) + h) % h
        const tw = 0.5 + 0.5 * Math.sin(now / 1000 * (0.6 + d.z) + d.p)
        ctx.fillStyle = `rgba(190,225,255,${(0.08 + d.z * 0.35 * tw).toFixed(3)})`
        const sz = 0.6 + d.z * 1.6
        ctx.fillRect(dx, dy, sz, sz)
      }
      globes.sort((a, b) => a.z - b.z)
      for (const g of globes) {
        if (!still) step(g, dt, now / 1000)
        draw(g)
      }
      if (!still) raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="glass-orbs" ref={host} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  )
}
