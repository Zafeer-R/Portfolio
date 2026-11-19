import { useState } from 'react'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Orbs from './components/Orbs'
import Hero from './sections/Hero'
import { Experience, Faq, FinalCta, Footer, Process, Projects, Proof, Skills, Tagline } from './sections/Sections'
import { useEasterEggs } from './motion/eggs'
import { Toast } from './components/ui'
import './App.css'

export default function App() {
  const { found, toast } = useEasterEggs()
  const [welcome, setWelcome] = useState(true)
  return (
    <>
      <a className="skip-link body-5" href="#main">Skip to content</a>
      {welcome && <Intro onDone={() => setWelcome(false)} />}
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
      <Toast message={toast} />
    </>
  )
}
