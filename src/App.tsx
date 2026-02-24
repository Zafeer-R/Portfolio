import { useEffect, useRef, useState } from 'react'
import LoaderScreen from './components/LoaderScreen'
import SiteShell from './components/SiteShell'
import './App.css'

const LOADER_DURATION_MS = 2000

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const appRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false)
    }, LOADER_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
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
      <SiteShell isReady={!isLoading} />
      <LoaderScreen isVisible={isLoading} />
    </div>
  )
}

export default App
