import { ArrowRight, DownloadSimple, LinkedinLogo } from '@phosphor-icons/react'
import { LINKEDIN_URL, RESUME_URL } from '../data/content'
import { Button } from '../components/ui'

export default function Hero() {
  return (
    <section className="hero-pin" id="top" data-stage="top" aria-labelledby="hero-title">
      <div className="hero-sticky container">
        <div className="hero-copy glass">
          <h1 id="hero-title" className="heading-1 hero-title">
            Data and AI systems
            <br />
            built for production
          </h1>
          <p className="body-3 text-secondary hero-sub">
            I am Zafeer Rangoonwala, a software and data engineer who builds real time pipelines and RAG applications. MS in Computer Science from UT Dallas, authorized to work in the US with no sponsorship needed for 3 years.
          </p>
          <div className="hero-actions">
            <Button href="#projects" variant="primary" icon={<ArrowRight size={18} weight="bold" aria-hidden />}>
              View projects
            </Button>
            <Button href={RESUME_URL} variant="secondary" download icon={<DownloadSimple size={18} weight="bold" aria-hidden />}>
              Download resume
            </Button>
            <Button href={LINKEDIN_URL} variant="tertiary" external icon={<LinkedinLogo size={18} weight="bold" aria-hidden />}>
              Message on LinkedIn
            </Button>
          </div>
          <p className="caption-4 text-tertiary hero-proof">Winner of TidalHack 2026 · MS Computer Science, UT Dallas</p>
        </div>
      </div>
    </section>
  )
}
