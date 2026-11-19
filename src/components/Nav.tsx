import { useEffect, useState } from 'react'
import { DownloadSimple } from '@phosphor-icons/react'
import { NAV_LINKS, RESUME_URL } from '../data/content'
import { Button } from './ui'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id)
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="nav-wrap">
      <nav className="nav-pill" aria-label="Primary">
        <a href="#top" className="nav-brand title-3" onClick={() => { setOpen(false); window.dispatchEvent(new Event('brand-click')) }}>
          Zafeer R.
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="body-5"
                aria-current={active === l.id ? 'true' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="nav-resume">
          <Button href={RESUME_URL} variant="secondary" size="sm" download icon={<DownloadSimple size={16} weight="bold" aria-hidden />}>
            Download resume
          </Button>
        </span>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-line" />
          <span className="nav-toggle-line" />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <ul>
          {NAV_LINKS.map((l, i) => (
            <li key={l.id} style={{ ['--i' as string]: Math.min(i * 60, 400) + 'ms' }}>
              <a href={`#${l.id}`} className="heading-4" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ ['--i' as string]: Math.min(NAV_LINKS.length * 60, 400) + 'ms' }}>
            <Button href={RESUME_URL} variant="secondary" download>
              Download resume
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
