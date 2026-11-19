import { useEffect, useSyncExternalStore } from 'react'
import type { RefObject } from 'react'

/** Shared scroll progress for the pinned hero. Read by the 3D scene every frame. */
export const heroProgress = { value: 0 }
export const setHeroProgress = (p: number) => {
  heroProgress.value = p
}

export const prefersStill = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp = (n: number) => Math.min(1, Math.max(0, n))

export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

type Mode = 'pin' | 'pass'

/**
 * Writes --p (0 to 1) on the element as the page scrolls.
 * pin: progress across a tall section while its child is sticky.
 * pass: progress as the element travels up through the viewport.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  mode: Mode = 'pass',
  onProgress?: (p: number) => void,
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const flat = prefersStill() || (mode === 'pin' && window.matchMedia('(max-width: 1023px)').matches)
      let p = 1
      if (!flat) {
        const r = el.getBoundingClientRect()
        p =
          mode === 'pin'
            ? clamp(-r.top / Math.max(1, r.height - window.innerHeight))
            : clamp((window.innerHeight * 0.75 - r.top) / Math.max(1, r.height))
      }
      el.style.setProperty('--p', p.toFixed(4))
      onProgress?.(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, mode, onProgress])
}
