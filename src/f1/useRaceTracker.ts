import { useEffect } from 'react'
import { STAGES, setProgress, setSpeed, setStage } from './race'
import { prefersStill } from '../motion/progress'

/** Turns scroll into race data: speed, lap (stage) and track progress. Runs one rAF loop. */
export function useRaceTracker() {
  useEffect(() => {
    let raf = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let v = 0
    let stage = -1
    const root = document.documentElement

    const apply = (i: number) => {
      if (i === stage) return
      stage = i
      setStage(i)
      root.style.setProperty('--stage', STAGES[i].color)
      root.dataset.lap = STAGES[i].id
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.max(1, now - lastT)
      lastT = now
      const y = window.scrollY
      const inst = Math.abs(y - lastY) / dt
      lastY = y
      v += (Math.min(1, inst / 2.4) - v) * 0.1
      setSpeed(prefersStill() ? 0 : v)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
      let pick = 0
      for (let i = 0; i < STAGES.length; i++) {
        const el = document.querySelector(`[data-stage="${STAGES[i].id}"]`)
        if (!el) continue
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.5) pick = i
      }
      if (max > 0 && y >= max - 4) pick = STAGES.length - 1
      apply(pick)
    }

    apply(0)
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
}
