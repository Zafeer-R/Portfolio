import './Experience.css'
import {
  Bug,
  Cloud,
  Code2,
  Cpu,
  Database,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { EXPERIENCES, type ExperienceHighlightIcon } from '../data/experiences'

function getTechInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? '')
    .join('')
}

const HIGHLIGHT_ICONS: Record<ExperienceHighlightIcon, typeof Code2> = {
  code: Code2,
  bug: Bug,
  cloud: Cloud,
  database: Database,
  cpu: Cpu,
  sparkles: Sparkles,
  workflow: Workflow,
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience-head">
        <h2 className="experience-title">E X P E R I E N C E</h2>
        <p className="experience-subtitle">
          Roles where I designed and shipped intelligent, cloud-native systems.
        </p>
      </div>

      <div className="experience-timeline">
        {EXPERIENCES.length ? (
          EXPERIENCES.map((item) => (
            <article className="experience-item" key={item.id}>
              <span className="experience-dot" aria-hidden="true" />
              <div className="experience-card">
                <header className="experience-card-head">
                  <div>
                    <h3>{item.roleTitle}</h3>
                    <p className="experience-company">{item.companyName}</p>
                  </div>
                  <div className="experience-meta">
                    <span className="role-type-pill">{item.roleType}</span>
                    <span className="experience-date">{item.dateRange}</span>
                  </div>
                </header>

                <ul className="experience-highlights">
                  {item.highlights.map((highlight, index) => {
                    const Icon = highlight.icon
                      ? HIGHLIGHT_ICONS[highlight.icon]
                      : Code2

                    return (
                      <li key={`${item.id}-highlight-${index}`}>
                        <span className="experience-highlight-icon" aria-hidden="true">
                          <Icon size={16} strokeWidth={2.2} />
                        </span>
                        <span>{highlight.text}</span>
                      </li>
                    )
                  })}
                </ul>
                
                <div className="experience-tech-list">
                  {item.technologies.map((technology) => (
                    <div className="experience-tech-chip" key={technology.name}>
                      {technology.logoUrl ? (
                        <img
                          className="experience-tech-logo"
                          src={technology.logoUrl}
                          alt={`${technology.name} logo`}
                          loading="lazy"
                        />
                      ) : (
                        <span
                          className="experience-tech-logo-fallback"
                          aria-hidden="true"
                        >
                          {getTechInitials(technology.name)}
                        </span>
                      )}
                      <span>{technology.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <article className="experience-item">
            <span className="experience-dot" aria-hidden="true" />
            <div className="experience-card">
              <p className="experience-empty">
                Add your first role in <code>src/data/experiences.ts</code>.
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}

export default Experience
