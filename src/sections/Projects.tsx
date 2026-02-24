import './Projects.css'
import { PROJECTS } from '../data/projects'

function getTechInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? '')
    .join('')
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-head">
        <h2 className="projects-title">P R O J E C T S</h2>
        <p className="projects-subtitle">
          Selected builds focused on reliable systems, data quality, and user impact.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.length ? (
          PROJECTS.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-image-wrap">
                <img
                  className="project-image"
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  loading="lazy"
                />
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="project-tech-list">
                {project.technologies.map((technology) => (
                  <div className="project-tech-chip" key={technology.name}>
                    {technology.logoUrl ? (
                      <img
                        className="project-tech-logo"
                        src={technology.logoUrl}
                        alt={`${technology.name} logo`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="project-tech-logo-fallback" aria-hidden="true">
                        {getTechInitials(technology.name)}
                      </span>
                    )}
                    <span>{technology.name}</span>
                  </div>
                ))}
              </div>

              <div className="project-links">
                <a href={project.codeUrl} target="_blank" rel="noreferrer">
                  Code
                </a>
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                ) : null}
              </div>
            </article>
          ))
        ) : (
          <article className="project-card">
            <p className="project-empty">
              Add your first project in <code>src/data/projects.ts</code>.
            </p>
          </article>
        )}
      </div>
    </section>
  )
}

export default Projects
