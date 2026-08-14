import { useRef, type MouseEvent } from 'react'
import { profile } from '../data/content'

export function LicenseCard() {
  const card = useRef<HTMLElement>(null)

  const tilt = (e: MouseEvent<HTMLElement>) => {
    const el = card.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const rx = (0.5 - y) * 10
    const ry = (x - 0.5) * 14
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  const reset = () => {
    if (card.current) card.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <article
      ref={card}
      className="license"
      onMouseMove={tilt}
      onMouseLeave={reset}
    >
      <div className="license-top mono">
        <span>State of craft</span>
        <span># 0001</span>
      </div>
      <div className="license-title">
        Applied AI
        <br />
        License
      </div>
      <div className="license-grid">
        <img
          className="license-photo"
          src="/images/license-photo.jpg"
          alt="Yash Mishra"
        />
        <dl className="license-fields">
          <dt>Name</dt>
          <dd>{profile.name}</dd>
          <dt>Title</dt>
          <dd>{profile.title}</dd>
          <dt>Base</dt>
          <dd>{profile.city}</dd>
          <dt>College</dt>
          <dd>{profile.college}</dd>
          <dt>Expertise</dt>
          <dd>Agents · RAG · Evals · Recovery</dd>
          <dt>Valid</dt>
          <dd>Until the models get honest</dd>
        </dl>
      </div>
      <div className="license-stamp">
        Receipts
        <br />
        required
      </div>
      <div className="license-sign">Yash Mishra</div>
      <div className="license-bar" />
      <div className="license-foot mono">
        <a href={`tel:${profile.phone}`}>{profile.phonePretty}</a>
        <span>Indian · Builder</span>
      </div>
    </article>
  )
}
