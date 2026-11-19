import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import VisitorPill from './VisitorPill'

type Star = { x: number; y: number; z: number; hue: number }

const COUNT = 520
const TINTS = ['230,244,246', '200,209,213', '150,255,240', '255,255,255', '120,170,255']
const fresh = (z = Math.random()): Star => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.max(0.02, z), hue: Math.floor(Math.random() * TINTS.length) })

/** Full screen welcome: a drifting star field with a nebula and planet. "Get started" jumps to hyperspace. */
export default function Intro({ onDone }: { onDone: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const doneRef = useRef(onDone)
  useEffect(() => { doneRef.current = onDone })
  const warp = useRef(0) // 0 = cruising, 1 = hyperspace
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let last = performance.now()
    const stars = Array.from({ length: COUNT }, () => fresh())
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      el.width = Math.round(w * dpr)
      el.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, w, h)
      const wv = warp.current
      const speed = still ? 0 : 0.05 + wv * wv * 2.2
      const f = Math.max(w, h) * 0.55
      const cx = w / 2
      const cy = h / 2
      for (const s of stars) {
        const pz = s.z + speed * dt * (0.35 + wv * 2.2) // where it was a moment ago
        s.z -= speed * dt
        if (s.z <= 0.02) Object.assign(s, fresh(1))
        const sx = cx + (s.x / s.z) * f * 0.5
        const sy = cy + (s.y / s.z) * f * 0.5
        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) { Object.assign(s, fresh(1)); continue }
        const near = 1 - s.z
        const a = Math.min(1, 0.15 + near * 0.95)
        const col = TINTS[s.hue]
        if (wv > 0.05) {
          const px = cx + (s.x / pz) * f * 0.5
          const py = cy + (s.y / pz) * f * 0.5
          ctx.strokeStyle = `rgba(${col},${a.toFixed(2)})`
          ctx.lineWidth = 0.6 + near * 1.8
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(sx, sy)
          ctx.stroke()
        } else {
          const r = 0.4 + near * 1.7
          ctx.fillStyle = `rgba(${col},${a.toFixed(2)})`
          ctx.beginPath()
          ctx.arc(sx, sy, r, 0, 6.2832)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(frame)
    }
    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (!leaving) return
    let raf = 0
    const t0 = performance.now()
    const ramp = (now: number) => {
      warp.current = Math.min(1, (now - t0) / 900)
      raf = requestAnimationFrame(ramp)
    }
    raf = requestAnimationFrame(ramp)
    const done = window.setTimeout(() => doneRef.current(), 1250)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(done)
    }
  }, [leaving])

  return (
    <div className={`intro${leaving ? ' is-leaving' : ''}`} role="dialog" aria-label="Welcome">
      <div className="intro-nebula" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="intro-planet" aria-hidden="true" />
      <canvas ref={canvas} className="intro-stars" aria-hidden="true" />
      <div className="intro-content">
        <p className="intro-eyebrow caption-3">Welcome aboard</p>
        <h1 className="intro-title">
          Zafeer Rangoonwala&rsquo;s
          <br />
          <span>Portfolio</span>
        </h1>
        <button type="button" className="intro-btn" onClick={() => setLeaving(true)} disabled={leaving} autoFocus>
          Get started <ArrowRight size={20} weight="bold" aria-hidden />
        </button>
        <VisitorPill />
      </div>
    </div>
  )
}
