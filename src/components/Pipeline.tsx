import { useEffect, useRef, useState } from 'react'

type Node = { label: string; sub: string; x: number; y: number }

const NODES: Node[] = [
  { label: 'Source', sub: 'APIs, logs', x: 62, y: 56 },
  { label: 'Kafka', sub: 'events', x: 200, y: 56 },
  { label: 'Spark', sub: 'streaming', x: 338, y: 56 },
  { label: 'Store', sub: 'Postgres, vectors', x: 338, y: 176 },
  { label: 'Serve', sub: 'API and RAG', x: 200, y: 176 },
]
const PACKETS = 16

// distance along the path through every node
const SEGS = NODES.slice(1).map((n, i) => {
  const a = NODES[i]
  return { a, b: n, len: Math.hypot(n.x - a.x, n.y - a.y) }
})
const TOTAL = SEGS.reduce((s, g) => s + g.len, 0)
const at = (p: number) => {
  let d = p * TOTAL
  for (const g of SEGS) {
    if (d <= g.len) {
      const t = d / g.len
      return [g.a.x + (g.b.x - g.a.x) * t, g.a.y + (g.b.y - g.a.y) * t]
    }
    d -= g.len
  }
  const last = NODES[NODES.length - 1]
  return [last.x, last.y]
}

/** A small, always moving diagram of a streaming pipeline. The numbers are simulated and labeled as such. */
export default function Pipeline() {
  const dots = useRef<(SVGCircleElement | null)[]>([])
  const [stats, setStats] = useState({ rate: 1284, lat: 41 })

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()
    let off = 0
    const place = () => {
      dots.current.forEach((c, i) => {
        if (!c) return
        const [x, y] = at((off + i / PACKETS) % 1)
        c.setAttribute('cx', x.toFixed(1))
        c.setAttribute('cy', y.toFixed(1))
      })
    }
    const frame = (now: number) => {
      off = (off + Math.min(0.05, (now - last) / 1000) * 0.07) % 1
      last = now
      place()
      raf = requestAnimationFrame(frame)
    }
    place()
    if (!still) raf = requestAnimationFrame(frame)
    const tick = still
      ? 0
      : window.setInterval(() => {
          setStats({ rate: 1180 + Math.round(Math.random() * 220), lat: 36 + Math.round(Math.random() * 12) })
        }, 1100)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(tick)
    }
  }, [])

  return (
    <aside className="pipeline glass" aria-label="Illustration of a real time data pipeline">
      <div className="pipeline-head">
        <span className="pipeline-live caption-3"><i aria-hidden="true" /> Live pipeline</span>
        <span className="caption-4 text-tertiary">Simulated</span>
      </div>
      <svg viewBox="0 0 400 232" className="pipeline-svg" role="img" aria-hidden="true">
        <polyline className="pipeline-line" points={NODES.map((n) => `${n.x},${n.y}`).join(' ')} />
        {Array.from({ length: PACKETS }, (_, i) => (
          <circle key={i} ref={(el) => { dots.current[i] = el }} r="3" className="pipeline-packet" />
        ))}
        {NODES.map((n) => (
          <g key={n.label} transform={`translate(${n.x - 50} ${n.y - 22})`}>
            <rect width="100" height="44" rx="12" className="pipeline-node" />
            <text x="50" y="19" textAnchor="middle" className="pipeline-label">{n.label}</text>
            <text x="50" y="34" textAnchor="middle" className="pipeline-sub">{n.sub}</text>
          </g>
        ))}
      </svg>
      <dl className="pipeline-stats">
        <div>
          <dt className="caption-4 text-tertiary">Events per second</dt>
          <dd className="heading-5">{stats.rate.toLocaleString('en-US')}</dd>
        </div>
        <div>
          <dt className="caption-4 text-tertiary">p95 latency</dt>
          <dd className="heading-5">{stats.lat} ms</dd>
        </div>
      </dl>
    </aside>
  )
}
