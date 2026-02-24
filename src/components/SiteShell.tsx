import { useEffect, useState } from 'react'
import { Hexagon } from 'lucide-react'
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

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`site-shell ${isReady ? 'is-ready' : 'is-loading'}`}>
      <header className={`site-header ${isHeaderScrolled ? 'is-scrolled' : ''}`}>
        <a className="brand brand-logo" href="#" aria-label="Go to home">
          <Hexagon size={16} strokeWidth={2.3} />
        </a>
        <nav className="nav">
          {/* <a href="#certifications">C E R T I F I C A T I O N S</a> */}
          <a href="#experience">E X P E R I E N C E</a>
          <a href="#projects">P R O J E C T S</a>
          <a href="#contact">C O N T A C T</a>
        </nav>
        <a
          className="primary-button"
          href={resumePdf}
          target="_blank"
          rel="noreferrer"
        >
          RESUME
        </a>
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
