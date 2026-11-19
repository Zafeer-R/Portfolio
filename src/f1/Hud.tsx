import { useEffect, useRef } from 'react'
import { STAGES, race } from './race'

const TRACK = 'M18 58C8 34 30 10 60 14S112 22 106 46S82 70 60 62S28 78 18 58Z'

/** Race telemetry in the corner. Updates the DOM directly each frame so it never re-renders React. */
export default function Hud() {
  const speedEl = useRef<HTMLElement>(null)
  const gearEl = useRef<HTMLElement>(null)
  const rpmEl = useRef<HTMLSpanElement>(null)
  const lapEl = useRef<HTMLElement>(null)
  const nameEl = useRef<HTMLElement>(null)
  const pathEl = useRef<SVGPathElement>(null)
  const dotEl = useRef<SVGCircleElement>(null)

  useEffect(() => {
    let raf = 0
    let kmh = 0
    let lastText = ''
    let lastStage = -1
    const path = pathEl.current
    const total = path ? path.getTotalLength() : 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const goal = race.launchedAt ? Math.min(340, 72 + race.speed * 250 + race.boost * 70) : 0
      kmh += (goal - kmh) * 0.12
      const k = Math.round(kmh)
      const gear = k < 8 ? 'N' : String(Math.min(8, 1 + Math.floor(k / 44)))
      const text = `${k}|${gear}`
      if (text !== lastText) {
        lastText = text
        if (speedEl.current) speedEl.current.textContent = String(k)
        if (gearEl.current) gearEl.current.textContent = gear
      }
      if (rpmEl.current) rpmEl.current.style.transform = `scaleX(${Math.min(1, 0.12 + ((k % 44) / 44) * 0.55 + race.boost * 0.3 + race.speed * 0.2).toFixed(3)})`
      if (race.stage !== lastStage) {
        lastStage = race.stage
        if (lapEl.current) lapEl.current.textContent = `LAP ${race.stage + 1}/${STAGES.length}`
        if (nameEl.current) nameEl.current.textContent = STAGES[race.stage].label
      }
      if (path && dotEl.current && total) {
        const p = path.getPointAtLength(total * race.progress)
        dotEl.current.setAttribute('cx', p.x.toFixed(1))
        dotEl.current.setAttribute('cy', p.y.toFixed(1))
      }
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <aside className="hud" aria-hidden="true">
      <div className="hud-row">
        <strong className="caption-3 hud-lap" ref={lapEl}>LAP 1/{STAGES.length}</strong>
        <span className="caption-4 hud-stage" ref={nameEl}>{STAGES[0].label}</span>
      </div>
      <div className="hud-speed">
        <strong className="heading-5" ref={speedEl}>0</strong>
        <span className="caption-4">km/h</span>
        <em className="hud-gear caption-3" ref={gearEl}>N</em>
      </div>
      <div className="hud-rpm"><span ref={rpmEl} /></div>
      <svg viewBox="0 0 120 80" className="hud-map">
        <path ref={pathEl} d={TRACK} className="hud-track" />
        <circle ref={dotEl} r="4.5" className="hud-dot" cx="18" cy="58" />
      </svg>
    </aside>
  )
}
