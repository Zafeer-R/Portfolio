import { useEffect, useRef } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'

/** Reveals children once when they enter the viewport. */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

type ButtonProps = {
  href: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  children: ReactNode
  icon?: ReactNode
  external?: boolean
  download?: boolean
  size?: 'md' | 'sm'
}

export function Button({ href, variant = 'primary', children, icon, external, download, size = 'md' }: ButtonProps) {
  return (
    <a
      className={`btn btn-${variant} ${size === 'sm' ? 'button-sm' : 'button-md'}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
      {icon}
    </a>
  )
}

/** Temporary value. Hover or focus shows what needs to be filled in. */
export function Placeholder({ hint, children = 'ABC' }: { hint: string; children?: ReactNode }) {
  return (
    <span className="placeholder caption-3" tabIndex={0} data-hint={hint} aria-label={`Placeholder. ${hint}`}>
      {children}
    </span>
  )
}

export function Toast({ message }: { message: string }) {
  return (
    <div className={`toast body-5${message ? ' is-on' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
