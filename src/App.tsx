import { useEffect, useRef, useState } from 'react'
import LoaderScreen from './components/LoaderScreen'
import SiteShell from './components/SiteShell'
import './App.css'

const LOADER_DURATION_MS = 2000
const LOADER_REVEAL_DURATION_MS = 900

type LoaderPhase = 'intro' | 'reveal' | 'done'

function App() {
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>('intro')
  const appRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const revealTimeoutId = window.setTimeout(() => {
      setLoaderPhase('reveal')
    }, LOADER_DURATION_MS)

    const doneTimeoutId = window.setTimeout(() => {
      setLoaderPhase('done')
    }, LOADER_DURATION_MS + LOADER_REVEAL_DURATION_MS)

    return () => {
      window.clearTimeout(revealTimeoutId)
      window.clearTimeout(doneTimeoutId)
    }
  }, [])

  useEffect(() => {
    let rafId = 0

    const setProgress = () => {
      const appElement = appRef.current
      if (!appElement) {
        return
      }

      const scrollLimit =
        document.documentElement.scrollHeight - window.innerHeight
      const progress =
        scrollLimit > 0 ? Math.min(window.scrollY / scrollLimit, 1) : 0

      appElement.style.setProperty('--scroll-progress', String(progress))
      rafId = 0
    }

    const handleScroll = () => {
      if (rafId) {
        return
      }

      rafId = window.requestAnimationFrame(setProgress)
    }

    setProgress()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)

      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div className="app" ref={appRef}>
      <SiteShell isReady={loaderPhase === 'done'} />
      <LoaderScreen isVisible={loaderPhase !== 'done'} phase={loaderPhase} />
    </div>
  )
}

export default App
