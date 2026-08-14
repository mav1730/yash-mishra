import { profile } from '../data/content'

export function SiteFoot({ big = false }: { big?: boolean }) {
  if (!big) {
    return (
      <footer className="site-foot">
        <span className="mono">
          © {profile.year} {profile.name}
        </span>
        <span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {' · '}
          <a href={`tel:${profile.phone}`}>{profile.phonePretty}</a>
          {' · '}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {' · '}
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </footer>
    )
  }

  return (
    <footer className="lux-foot">
      <div className="lux-orb" />
      <p className="mono lux-kicker">Applied AI Engineer · {profile.year}</p>
      <div className="lux-names">
        <span>{profile.first}</span>
        <span>{profile.last}</span>
      </div>
      <p className="lux-line">Receipts required. Models optional.</p>
      <div className="lux-links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={`tel:${profile.phone}`}>{profile.phonePretty}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
      <p className="mono lux-copy">© {profile.year} {profile.name} · Mumbai, Maharashtra</p>
    </footer>
  )
}
