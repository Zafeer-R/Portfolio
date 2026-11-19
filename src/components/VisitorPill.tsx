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
const forget = () => {
  try { localStorage.removeItem(FLAG) } catch { /* nothing stored */ }
}

/** Glass pill: a real count (once per browser) and a word that scrolls every 2 seconds. */
export default function VisitorPill() {
  const [count, setCount] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)
  const [i, setI] = useState(0)

  useEffect(() => {
    let live = true
    // Mark this browser as counted before asking, so a quick reload can't count it twice.
    const first = !seen()
    if (first) remember()
    fetch('/api/views', { method: first ? 'POST' : 'GET' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { count: number }) => live && setCount(d.count))
      .catch(() => {
        // The count did not go through, so let the next visit try again.
        if (first) forget()
        if (live) setFailed(true)
      })
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
