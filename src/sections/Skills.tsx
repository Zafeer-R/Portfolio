import './Skills.css'
import { SKILL_GROUPS } from '../data/skills'

function getSkillInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-head">
        <h2 className="skills-title">S K I L L S</h2>
        <p className="skills-subtitle">
          A focused toolkit across software engineering, data systems, cloud, and applied AI.
        </p>
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS.map((group) => (
          <article
            className={`skill-group-card skill-group-card--${group.accent}`}
            key={group.id}
          >
            <div className="skill-group-copy">
              <p className="skill-group-kicker">{group.title}</p>
              <p className="skill-group-blurb">{group.blurb}</p>
            </div>

            <div className="skill-chip-grid">
              {group.skills.map((item) => (
                <div className="skill-chip" key={`${group.id}-${item.name}`}>
                  {item.iconUrl ? (
                    <img
                      className="skill-chip-icon"
                      src={item.iconUrl}
                      alt={`${item.name} icon`}
                      loading="lazy"
                    />
                  ) : (
                    <span className="skill-chip-fallback" aria-hidden="true">
                      {getSkillInitials(item.name)}
                    </span>
                  )}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills
