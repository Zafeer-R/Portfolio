import { useEffect, useState } from 'react'
import './Hero.css'

const ROTATING_WORDS = [
  'AI systems',
  'cloud-native products',
  'real-time data pipelines',
  'ML platforms',
  'developer tools',
] as const

type TypingPhase = 'typing' | 'pausing' | 'deleting'

function Hero() {
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [typingPhase, setTypingPhase] = useState<TypingPhase>('typing')

  useEffect(() => {
    const activeWord = ROTATING_WORDS[activeWordIndex]
    let timeoutId = 0

    if (typingPhase === 'typing') {
      if (typedText.length < activeWord.length) {
        timeoutId = window.setTimeout(() => {
          setTypedText(activeWord.slice(0, typedText.length + 1))
        }, 95)
      } else {
        timeoutId = window.setTimeout(() => {
          setTypingPhase('pausing')
        }, 700)
      }
    }

    if (typingPhase === 'pausing') {
      timeoutId = window.setTimeout(() => {
        setTypingPhase('deleting')
      }, 350)
    }

    if (typingPhase === 'deleting') {
      if (typedText.length > 0) {
        timeoutId = window.setTimeout(() => {
          setTypedText((prev) => prev.slice(0, -1))
        }, 55)
      } else {
        setActiveWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
        setTypingPhase('typing')
      }
    }

    return () => window.clearTimeout(timeoutId)
  }, [activeWordIndex, typedText, typingPhase])

  return (
    <section className="hero" id="process">
      <div className="hero-content">
        <p className="hero-kicker">Portfolio Website</p>
        <h1 className="hero-title">
          Building intelligent, cloud-native systems that transform data into 
          <span className="hero-accent">real-world impact</span>
        </h1>
        {/* <p className="hero-subtitle">
          AI/ML Engineer | Cloud-Native Systems | Real-Time Data Architect
        </p>
        <div className="hero-actions">
          <button className="primary-button">View work</button>
          <button className="ghost-button">Download profile</button>
        </div> */}
      </div>
      <div className="hero-panel">
        <div className="panel-glow" />
        <div className="panel-inner">
          <div className="panel-label">Welcome</div>
          <div className="panel-line" />
          <p className="welcome-line">Hello 👋 I am Zafeer Rangoonwala</p>
          <p className="typing-line">
            Building{' '}
            <span className="typing-word">
              {typedText}
              <span className="typing-cursor" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
