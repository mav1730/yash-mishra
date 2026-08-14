import { useState } from 'react'
import gsap from 'gsap'
import { nav } from '../data/content'
import { useTransitionNav } from '../context/Transition'
import { ContactModal } from './ContactModal'

export function Nav() {
  const { to } = useTransitionNav()
  const [open, setOpen] = useState(false)
  const [talk, setTalk] = useState(false)

  const openTalk = () => {
    setOpen(false)
    gsap.set('.mobile-panel', { yPercent: -100 })
    setTalk(true)
  }

  const go = (path: string, label: string) => {
    setOpen(false)
    gsap.set('.mobile-panel', { yPercent: -100 })
    to(path, label)
  }

  const toggle = () => {
    const next = !open
    setOpen(next)
    gsap.to('.mobile-panel', {
      yPercent: next ? 0 : -100,
      duration: 0.7,
      ease: 'power4.inOut',
    })
  }

  return (
    <>
      <header className="nav">
        <a
          className="nav-brand"
          href="/"
          data-cursor="Home"
          onClick={(e) => {
            e.preventDefault()
            go('/', 'Yash')
          }}
        >
          Yash Mishra
        </a>
        <nav className="nav-links">
          {nav.map((item) => (
            <a
              key={item.to}
              href={item.to}
              data-cursor="Open"
              onClick={(e) => {
                e.preventDefault()
                go(
                  item.to,
                  item.to === '/manifesto' ? 'Stuff' : item.to === '/pinart' ? 'PINART' : item.label,
                )
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className="nav-talk" type="button" data-cursor="Talk" onClick={openTalk}>
          Talk
        </button>
        <button className="nav-menu" type="button" onClick={toggle}>
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <div className="mobile-panel" aria-hidden={!open}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            go('/', 'Yash')
          }}
        >
          Home
        </a>
        {nav.map((item) => (
          <a
            key={item.to}
            href={item.to}
            onClick={(e) => {
              e.preventDefault()
              go(
                item.to,
                item.to === '/manifesto' ? 'Stuff' : item.to === '/pinart' ? 'PINART' : item.label,
              )
            }}
          >
            {item.label}
          </a>
        ))}
        <button type="button" onClick={openTalk}>
          Talk
        </button>
      </div>
      <ContactModal open={talk} onClose={() => setTalk(false)} />
    </>
  )
}
