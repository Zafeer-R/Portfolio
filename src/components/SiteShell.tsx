import { useEffect, useState } from 'react'
import resumePdf from '../assets/Resume.pdf'
import Hero from '../sections/Hero'
// import Highlights from '../sections/Highlights' #Certificates section is currently hidden
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'
import './SiteShell.css'

type SiteShellProps = {
  isReady: boolean
}

function SiteShell({ isReady }: SiteShellProps) {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`site-shell ${isReady ? 'is-ready' : 'is-loading'}`}>
      <header className={`site-header ${isHeaderScrolled ? 'is-scrolled' : ''}`}>
        <a className="brand brand-logo" href="#" aria-label="Go to home">
          <img src="/Logo_Current.svg" alt="Zafeer logo" />
        </a>
        <nav
          className={`nav ${isMobileMenuOpen ? 'is-open' : ''}`}
          id="mobile-nav"
        >
          {/* <a href="#certifications">C E R T I F I C A T I O N S</a> */}
          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>
            E X P E R I E N C E
          </a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>
            P R O J E C T S
          </a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            C O N T A C T
          </a>
          <a
            className="mobile-resume-link"
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            RESUME
          </a>
        </nav>
        <a
          className="primary-button"
          href={resumePdf}
          target="_blank"
          rel="noreferrer"
        >
          RESUME
        </a>
        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-nav"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <Hero />
        {/* <Highlights /> #Certificates section is currently hidden */}
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="social-footer">
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/zafeerrangoonwala/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Zafeer-R"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <p className="social-copyright">
          Designed and Developed by Zafeer &copy; 2026
        </p>
      </footer>
    </div>
  )
}

export default SiteShell
