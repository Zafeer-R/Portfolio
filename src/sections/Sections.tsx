import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, DownloadSimple, GithubLogo, LinkedinLogo, Plus } from '@phosphor-icons/react'
import {
  CERTIFICATIONS,
  EGG_TOTAL,
  EDUCATION,
  FAQS,
  GITHUB_URL,
  JOBS,
  LINKEDIN_URL,
  RESUME_URL,
  SKILL_GROUPS,
  STATS,
  STAT_FILL,
  STEPS,
  TAGLINE,
} from '../data/content'
import { PROJECTS } from '../data/projects'
import type { Project } from '../data/projects'
import { getSkillIconUrl } from '../data/skillIcons'
import { Button, Placeholder, Reveal } from '../components/ui'
import { prefersStill, useMedia, useScrollProgress } from '../motion/progress'

/* ---------- Stats with count up ---------- */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const parsed = useMemo(() => {
    const m = value.match(/^([\d,]+)(.*)$/)
    return m ? { n: Number(m[1].replace(/,/g, '')), suffix: m[2], comma: m[1].includes(',') } : null
  }, [value])
  const [text, setText] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !parsed || prefersStill() || typeof IntersectionObserver === 'undefined') return
    let raf = 0
    let started = false
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return
        started = true
        io.disconnect()
        const t0 = performance.now()
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / 1300)
          const e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k)
          const n = Math.round(parsed.n * e)
          setText((parsed.comma ? n.toLocaleString('en-US') : String(n)) + parsed.suffix)
          if (k < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [parsed])

  return <p ref={ref} className="heading-3">{text}</p>
}

export function Proof() {
  return (
    <section className="container section proof" data-stage="telemetry" aria-labelledby="tele-title">
      <Reveal className="section-header">
        <h2 id="tele-title" className="heading-3">Telemetry from the last stints</h2>
        <p className="body-3 text-secondary">The numbers I am proudest of, read off the data like a timing screen.</p>
      </Reveal>
      <ul className="stat-grid">
        {STATS.map((s, i) => (
          <Reveal as="li" key={s.value} delay={i * 80} className="card stat">
            <CountUp value={s.value} />
            <p className="body-6 text-secondary">{s.label}</p>
            <span className="gauge" aria-hidden="true">
              <span style={{ ['--fill' as string]: STAT_FILL[i] }} />
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------- Tagline ---------- */
export function Tagline() {
  const words = useMemo(() => TAGLINE.split(' '), [])
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const els = refs.current.filter((e): e is HTMLSpanElement => !!e)
    if (prefersStill()) {
      els.forEach((e) => e.classList.add('is-on'))
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.72
      for (const el of els) el.classList.toggle('is-on', el.getBoundingClientRect().top < line)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="container section tagline" data-stage="fastest" aria-label="What I do">
      <p className="timing caption-3"><span aria-hidden="true" className="timing-dot" /> Fastest lap</p>
      <p className="heading-2 tagline-text">
        {words.map((w, i) => (
          <span key={i} className="word" ref={(el) => { refs.current[i] = el }}>
            {w}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}

/* ---------- Projects: horizontal rail pinned to scroll ---------- */
function ProjectCard({ p, turn }: { p: Project; turn: number }) {
  return (
    <>
      <div className="project-media">
        <img src={p.imageUrl} alt={p.imageAlt} loading="lazy" decoding="async" draggable={false} />
        {p.badge && <span className="badge caption-3">{p.badge}</span>}
        <span className="turn caption-3">Turn {turn}</span>
      </div>
      <div className="project-body">
        <div>
          <h3 className="title-1">{p.title}</h3>
          <p className="body-5 text-tertiary">{p.tagline}</p>
        </div>
        <p className="body-6 text-secondary project-desc">{p.description}</p>
        <ul className="chips">
          {p.tech.map((t) => (
            <li key={t.name} className="chip caption-4">
              {t.logoUrl && <img src={t.logoUrl} alt="" width={14} height={14} loading="lazy" />}
              {t.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="project-actions">
        <Button href={p.codeUrl} variant="tertiary" size="sm" external icon={<GithubLogo size={16} weight="bold" aria-hidden />}>
          View code
        </Button>
      </div>
    </>
  )
}

export function Projects() {
  const wide = useMedia('(min-width: 1024px)')
  const still = useMedia('(prefers-reduced-motion: reduce)')
  const rail = wide && !still
  const sec = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const s = sec.current
    const t = track.current
    if (!rail || !s || !t) return
    let dist = 0
    let raf = 0
    const measure = () => {
      dist = Math.max(0, t.scrollWidth - window.innerWidth + 64)
      s.style.height = `${dist + window.innerHeight}px`
    }
    const update = () => {
      raf = 0
      const r = s.getBoundingClientRect()
      const total = Math.max(1, s.offsetHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, -r.top / total))
      t.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`
      s.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }
    measure()
    update()
    const imgs = Array.from(t.querySelectorAll('img'))
    imgs.forEach((i) => i.addEventListener('load', onResize))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      imgs.forEach((i) => i.removeEventListener('load', onResize))
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
      s.style.height = ''
      t.style.transform = ''
    }
  }, [rail])

  return (
    <section ref={sec} className={rail ? 'rail' : 'section container'} id="projects" data-stage="projects" aria-labelledby="projects-title">
      <div className={rail ? 'rail-sticky' : undefined}>
        <div className={rail ? 'container rail-head' : undefined}>
          <Reveal className="section-header">
            <h2 id="projects-title" className="heading-3">Selected projects</h2>
            <p className="body-3 text-secondary">
              {rail ? 'Keep scrolling and the rail slides sideways. ' : ''}Data pipelines, retrieval systems and event driven platforms, each with source on GitHub.
            </p>
          </Reveal>
        </div>
        <ul ref={track} className={rail ? 'rail-track' : 'project-grid'}>
          {PROJECTS.map((p, i) => (
            <li key={p.id} className={`card project${p.featured ? ' is-featured' : ''}${rail ? '' : ' reveal-static'}`} style={rail ? undefined : { animationDelay: `${(i % 3) * 80}ms` }}>
              <ProjectCard p={p} turn={i + 1} />
            </li>
          ))}
        </ul>
        {rail && <div className="rail-bar" aria-hidden="true"><span /></div>}
      </div>
    </section>
  )
}

/* ---------- Process ---------- */
export function Process() {
  return (
    <section className="container section" id="process" data-stage="process" aria-labelledby="process-title">
      <Reveal className="section-header">
        <h2 id="process-title" className="heading-3">Race strategy for every build</h2>
      </Reveal>
      <ol className="step-grid">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 80} className="card step">
            <p className="heading-4 text-info">{s.n}</p>
            <h3 className="title-1">{s.title}</h3>
            <p className="body-6 text-secondary">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

/* ---------- Experience with a drawing timeline ---------- */
export function Experience() {
  const list = useRef<HTMLUListElement>(null)
  useScrollProgress(list, 'pass')
  return (
    <section className="container section" id="experience" data-stage="experience" aria-labelledby="exp-title">
      <Reveal className="section-header">
        <h2 id="exp-title" className="heading-3">Experience and education</h2>
        <p className="body-3 text-secondary">Each role is a tire stint: soft for short sprints, hard for the long run.</p>
      </Reveal>
      <ul ref={list} className="job-list timeline">
        <span className="timeline-line" aria-hidden="true" />
        {JOBS.map((j) => (
          <Reveal as="li" key={j.org} className="card job">
            <div className="job-meta">
              <h3 className="title-2">{j.org}</h3>
              <p className="body-5 text-secondary">{j.role}</p>
              <p className="caption-4 text-tertiary">{j.when}</p>
              <p className={`tire tire-${j.tire.toLowerCase()} caption-3`}><span aria-hidden="true" className="tire-dot" />{j.tire} tire stint</p>
            </div>
            <ul className="job-points">
              {j.points.map((pt) => (
                <li key={pt} className="body-6 text-secondary">{pt}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
      <ul className="edu-grid">
        {EDUCATION.map((e) => (
          <Reveal as="li" key={e.school} className="card card-subtle">
            <h3 className="title-2">{e.school}</h3>
            <p className="body-5 text-secondary">{e.degree}</p>
            <p className="caption-4 text-tertiary">{e.detail}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------- Skills: chips drift away from the cursor ---------- */
export function Skills() {
  const grid = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const g = grid.current
    if (!g || prefersStill() || !window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    let mx = 0
    let my = 0
    const chips = Array.from(g.querySelectorAll<HTMLElement>('.chip'))
    const apply = () => {
      raf = 0
      for (const c of chips) {
        const r = c.getBoundingClientRect()
        const dx = r.left + r.width / 2 - mx
        const dy = r.top + r.height / 2 - my
        const d = Math.hypot(dx, dy)
        if (d < 130 && d > 0) {
          const k = (1 - d / 130) * 16
          c.style.transform = `translate(${((dx / d) * k).toFixed(1)}px,${((dy / d) * k).toFixed(1)}px)`
        } else if (c.style.transform) {
          c.style.transform = ''
        }
      }
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      mx = -9999
      my = -9999
      if (!raf) raf = requestAnimationFrame(apply)
    }
    g.addEventListener('pointermove', onMove)
    g.addEventListener('pointerleave', onLeave)
    return () => {
      g.removeEventListener('pointermove', onMove)
      g.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="container section" id="skills" data-stage="skills" aria-labelledby="skills-title">
      <Reveal className="section-header">
        <h2 id="skills-title" className="heading-3">Garage setup</h2>
        <p className="body-3 text-secondary">Grouped by the part of the system they serve. Move your cursor through them.</p>
      </Reveal>
      <ul ref={grid} className="skill-grid">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal as="li" key={g.title} delay={(i % 3) * 80} className="card">
            <h3 className="title-2">{g.title}</h3>
            <ul className="chips">
              {g.items.map((it) => {
                const icon = getSkillIconUrl(it)
                return (
                  <li key={it} className="chip chip-magnet caption-4">
                    {icon && <img src={icon} alt="" width={14} height={14} loading="lazy" />}
                    {it}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        ))}
      </ul>
      <Reveal className="cert body-6">
        <span className="title-3">Certifications</span>
        <span className="text-secondary">{CERTIFICATIONS}</span>
      </Reveal>
    </section>
  )
}

export function Faq() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.filter((f) => f.a).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <section className="container section" id="faq" data-stage="faq" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Reveal className="section-header">
        <h2 id="faq-title" className="heading-3">Team radio: questions recruiters ask</h2>
      </Reveal>
      <ul className="faq-grid">
        {FAQS.map((f, i) => (
          <Reveal as="li" key={f.q} delay={(i % 2) * 80}>
            <details className="card faq" open={i === 0}>
              <summary className="title-2">
                {f.q}
                <Plus size={18} weight="bold" aria-hidden className="faq-icon" />
              </summary>
              <div className="faq-answer">
                {f.a ? (
                  <p className="body-6 text-secondary">{f.a}</p>
                ) : (
                  <p className="body-6 text-secondary">
                    <Placeholder hint={f.placeholder ?? 'Fill this in'} />
                  </p>
                )}
              </div>
            </details>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Checker() {
  return (
    <svg className="checker" width="100%" height="32" aria-hidden="true">
      <defs>
        <pattern id="chk" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#f2f2f2" />
          <rect x="16" y="16" width="16" height="16" fill="#f2f2f2" />
        </pattern>
      </defs>
      <rect width="100%" height="32" fill="url(#chk)" />
    </svg>
  )
}

export function FinalCta() {
  return (
    <section className="container section" data-stage="finish" aria-labelledby="cta-title">
      <Reveal className="card cta">
        <Checker />
        <h2 id="cta-title" className="heading-2">
          Hiring for data or AI engineering?
          <br />
          Send me a message on LinkedIn
        </h2>
        <p className="body-3 text-secondary cta-sub">
          Open to software engineer and data or AI engineer roles, with no sponsorship needed.
        </p>
        <div className="hero-actions is-centered">
          <Button href="#projects" variant="primary" icon={<ArrowUpRight size={18} weight="bold" aria-hidden />}>
            View projects
          </Button>
          <Button href={RESUME_URL} variant="secondary" download icon={<DownloadSimple size={18} weight="bold" aria-hidden />}>
            Download resume
          </Button>
          <Button href={LINKEDIN_URL} variant="tertiary" external icon={<LinkedinLogo size={18} weight="bold" aria-hidden />}>
            Message on LinkedIn
          </Button>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer({ found }: { found: number }) {
  return (
    <footer className="container footer body-5">
      <div className="footer-left">
        <p className="text-tertiary">Zafeer Rangoonwala, Dallas, TX</p>
        <p className="caption-4 text-tertiary secrets" title="Three secrets are hidden on this page">
          Secrets found {found} of {EGG_TOTAL}
          {found < EGG_TOTAL && ' · an old cheat code, a logo that likes attention, and a message broker'}
        </p>
      </div>
      <ul className="footer-links">
        <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href={RESUME_URL} download>Resume</a></li>
      </ul>
    </footer>
  )
}
