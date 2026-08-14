import { projects } from '../data/content'
import { SiteFoot } from '../components/SiteFoot'
import { useTransitionNav } from '../context/Transition'
import { usePageReveal } from '../lib/usePageReveal'

export function Work() {
  const { booted } = useTransitionNav()
  usePageReveal(booted)
  return (
    <main className="page">
      <p className="page-kicker mono">Archive · 03 entries</p>
      <h1 className="page-title">Work</h1>
      {projects.map((p) => (
        <article className="case" key={p.id} id={p.id}>
          <img src={p.image} alt="" />
          <div>
            <p className="mono" style={{ color: 'var(--muted)' }}>
              {p.index} · {p.year} · {p.role}
            </p>
            <h2>{p.title}</h2>
            <span className={`pill ${p.fake ? 'ghost' : ''}`}>{p.status}</span>
            <p style={{ marginTop: 18 }}>{p.body}</p>
            <div className="tags">
              {p.stack.map((s) => (
                <span key={s} className="mono">
                  {s}
                </span>
              ))}
            </div>
            {!p.fake ? (
              <a className="link-out" href={p.href} target="_blank" rel="noreferrer">
                Open repository →
              </a>
            ) : (
              <p className="link-out" style={{ cursor: 'default' }}>
                Public repo when it ships
              </p>
            )}
          </div>
        </article>
      ))}
      <SiteFoot />
    </main>
  )
}
