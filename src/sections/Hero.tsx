import { ArrowRight, DownloadSimple, LinkedinLogo } from '@phosphor-icons/react'
import { LINKEDIN_URL, RESUME_URL } from '../data/content'
import { Button } from '../components/ui'
import Pipeline from '../components/Pipeline'

export default function Hero() {
  return (
    <section className="hero-pin" id="top" aria-labelledby="hero-title">
      <div className="hero-sticky container">
        <div className="hero-copy glass">
          <p className="hero-roles caption-3">Data engineer <span aria-hidden="true">·</span> Applied AI engineer</p>
          <h1 id="hero-title" className="heading-1 hero-title">
            I build real time data and AI systems that run in production
          </h1>
          <p className="body-3 text-secondary hero-sub">
            Kafka, Spark and RAG, from ingestion to the answer. MS in Computer Science from UT Dallas, authorized to work in the US with no sponsorship needed for 3 years.
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
        <Pipeline />
      </div>
    </section>
  )
}
