import { useEffect, useState } from 'react'
import { Placeholder } from './ui'

const WORDS = ['Visitors', 'Guests', 'Explorers', 'Humans']
const FLAG = 'zr-visited'

const seen = () => {
  try { return localStorage.getItem(FLAG) === '1' } catch { return false }
}
const remember = () => {
  try { localStorage.setItem(FLAG, '1') } catch { /* private mode: count again next time */ }
}

/** Glass pill: a real count (once per browser) and a word that scrolls every 2 seconds. */
export default function VisitorPill() {
  const [count, setCount] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)
  const [i, setI] = useState(0)

  useEffect(() => {
    let live = true
    fetch('/api/views', { method: seen() ? 'GET' : 'POST' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { count: number }) => {
        if (!live) return
        remember()
        setCount(d.count)
      })
      .catch(() => live && setFailed(true))
    return () => { live = false }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((n) => n + 1), 2000)
    return () => clearInterval(t)
  }, [])

  const cur = i % WORDS.length
  const prev = (i - 1 + WORDS.length) % WORDS.length

  return (
    <div className="visitor-pill" role="status">
      <strong className="visitor-count">
        {count !== null ? count.toLocaleString('en-US') : failed ? <Placeholder hint="Visitor count appears once the counter is connected in Vercel. Replace or remove this placeholder after setup.">ABC</Placeholder> : '…'}
      </strong>
      <span className="visitor-word" aria-label={WORDS[cur]}>
        {i > 0 && <span key={`o${i}`} className="vw vw-out" aria-hidden="true">{WORDS[prev]}</span>}
        <span key={`i${i}`} className={`vw ${i > 0 ? 'vw-in' : ''}`}>{WORDS[cur]}</span>
      </span>
    </div>
  )
}
