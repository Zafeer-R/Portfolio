import './Highlights.css'
import { CERTIFICATES } from '../data/certificates'

function getIssuerInitials(issuer: string) {
  return issuer
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

function Highlights() {
  return (
    <section className="highlights" id="certifications">
      <div className="section-head">
        {/* <p className="section-kicker">Selected focus</p> */}
        <h2 className="section-title">C E R T I F I C A T E S</h2>
        <p className="section-subtitle">
          My professional journey is marked by a commitment to continuous learning
        </p>
      </div>
      <div className="highlight-grid">
        {CERTIFICATES.length ? (
          CERTIFICATES.map((certificate) => (
            <article className="highlight-card" key={certificate.id}>
              {certificate.badgeUrl ? (
                <img
                  className="certificate-badge"
                  src={certificate.badgeUrl}
                  alt={`${certificate.title} badge`}
                  loading="lazy"
                />
              ) : (
                <div className="certificate-badge-fallback" aria-hidden="true">
                  {getIssuerInitials(certificate.issuer)}
                </div>
              )}
              <h3 className="certificate-title">{certificate.title}</h3>
              <p className="highlight-company">{certificate.issuer}</p>
              <a
                className="credential-button"
                href={certificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
              >
                View credential
              </a>
            </article>
          ))
        ) : (
          <article className="highlight-card">
            <p className="highlight-company">
              Add your first certificate in <code>src/data/certificates.ts</code>
            </p>
          </article>
        )}
      </div>
    </section>
  )
}

export default Highlights
