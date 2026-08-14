import { useRef, useState, type MouseEvent } from 'react'
import { playground } from '../data/content'
import { useTransitionNav } from '../context/Transition'
import { SiteFoot } from '../components/SiteFoot'
import { usePageReveal } from '../lib/usePageReveal'

export function Playground() {
  const { to, booted } = useTransitionNav()
  usePageReveal(booted)
  const grid = useRef<HTMLDivElement>(null)
  const [follow, setFollow] = useState({
    on: false,
    x: 0,
    y: 0,
    src: playground[0].img,
  })

  const move = (e: MouseEvent<HTMLAnchorElement>, src: string) => {
    const glow = e.currentTarget.querySelector('.play-glow') as HTMLElement | null
    if (glow) {
      const r = e.currentTarget.getBoundingClientRect()
      glow.style.transform = `translate3d(${(e.clientX - r.left - r.width) * 0.08}px, ${(e.clientY - r.top - r.height) * 0.08}px, 0)`
    }
    setFollow({ on: true, x: e.clientX, y: e.clientY, src })
  }

  return (
    <main className="page">
      <p className="page-kicker mono">Press plates · not the resume</p>
      <h1 className="page-title">Playground</h1>
      {follow.on ? (
        <img
          className="play-follow"
          src={follow.src}
          alt=""
          style={{ left: follow.x, top: follow.y }}
        />
      ) : null}
      <div className="play-grid" ref={grid}>
        {playground.map((item) => (
          <a
            key={item.id}
            className="play-card"
            href={item.href}
            data-cursor={item.tag}
            onMouseMove={(e) => move(e, item.img)}
            onMouseLeave={() => setFollow((f) => ({ ...f, on: false }))}
            onClick={(e) => {
              if (item.href.startsWith('/')) {
                e.preventDefault()
                to(item.href, item.href === '/manifesto' ? 'Stuff' : 'Playground')
              }
            }}
          >
            <span className="play-n mono">{item.n}</span>
            <span className="mono play-tag">{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.note}</p>
            <div className="play-glow" />
          </a>
        ))}
      </div>
      <SiteFoot />
    </main>
  )
}
