import { useEffect } from 'react'
import Nav from './components/Nav'
import Orbs from './components/Orbs'
import Hero from './sections/Hero'
import { Experience, Faq, FinalCta, Footer, Process, Projects, Proof, Skills, Tagline } from './sections/Sections'
import Hud from './f1/Hud'
import { launchRace } from './f1/race'
import { useRaceTracker } from './f1/useRaceTracker'
import { useEasterEggs } from './motion/eggs'
import { Toast } from './components/ui'
import './App.css'

export default function App() {
  const { found, toast } = useEasterEggs()
  useRaceTracker()
  useEffect(() => {
    launchRace()
  }, [])
  return (
    <>
      <a className="skip-link body-5" href="#main">Skip to content</a>
      <Orbs />
      <Nav />
      <main id="main">
        <Hero />
        <Proof />
        <Tagline />
        <Projects />
        <Process />
        <Experience />
        <Skills />
        <Faq />
        <FinalCta />
      </main>
      <Footer found={found.length} />
      <Hud />
      <Toast message={toast} />
    </>
  )
}
