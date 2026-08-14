import { useEffect } from 'react'
import { profile } from '../data/content'
import { getLenis } from '../lib/useLenis'

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.classList.add('modal-open')
    getLenis()?.stop()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="contact-back" onClick={onClose} role="presentation">
      <div
        className="contact-win"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="contact-bar">
          <button className="contact-x" type="button" onClick={onClose} aria-label="Close" data-cursor="Close">
            ×
          </button>
          <span className="contact-file">Yash Mishra</span>
          <span className="mono">Contact</span>
        </header>
        <div className="contact-body">
          <div className="contact-phone">
            <img src="/images/call-me.jpg" alt="Call me" />
          </div>
          <div className="contact-copy">
            <h2 id="contact-title">CALL ME</h2>
            <p className="mono contact-sub">Let’s talk</p>
            <dl>
              <div>
                <dt className="mono">Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`} data-cursor="Mail">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">Phone</dt>
                <dd>
                  <a href={`tel:${profile.phone}`} data-cursor="Call">
                    {profile.phonePretty}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">LinkedIn</dt>
                <dd>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="Open">
                    {profile.linkedinHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">Instagram</dt>
                <dd>
                  <a href={profile.instagram} target="_blank" rel="noreferrer" data-cursor="Open">
                    {profile.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
