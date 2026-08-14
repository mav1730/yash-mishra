import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { profile, stuff } from '../data/content'
import { SiteFoot } from '../components/SiteFoot'
import { useTransitionNav } from '../context/Transition'
import { usePageReveal } from '../lib/usePageReveal'

const left = stuff.slice(0, 5)
const right = stuff.slice(5, 10)

export function Manifesto() {
  const { booted } = useTransitionNav()
  usePageReveal(booted)
  const [active, setActive] = useState(0)
  const [on, setOn] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let raf = 0
    const tick = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.12
      cur.current.y += (target.current.y - cur.current.y) * 0.12
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const bind = (i: number) => ({
    className: i === active && on ? 'on' : '',
    'data-cursor': 'Look',
    onMouseEnter: (e: MouseEvent) => {
      setActive(i)
      setOn(true)
      target.current = { x: e.clientX + 28, y: e.clientY - 80 }
    },
    onMouseMove: (e: MouseEvent) => {
      target.current = { x: e.clientX + 28, y: e.clientY - 80 }
    },
    onMouseLeave: () => setOn(false),
  })

  return (
    <main className="page stuff-page">
      <div
        className="stuff-ghost"
        style={{ backgroundImage: `url(${stuff[active].img})` }}
      />
      <header className="stuff-head">
        <p className="page-kicker mono">Random stuff · hover a line</p>
        <h1 className="page-title">Stuff</h1>
        <p className="manifesto-quote">“{profile.quote}”</p>
      </header>

      <div className="stuff-split">
        <ol className="stuff-index">
          {left.map((item, i) => (
            <li key={item.id} {...bind(i)}>
              <span className="mono">{item.n}</span>
              <h2>{item.title}</h2>
              <p>{item.line}</p>
            </li>
          ))}
        </ol>

        <ol className="stuff-index stuff-quotes">
          {right.map((item, i) => (
            <li key={item.id} {...bind(i + 5)}>
              <span className="mono">{item.n}</span>
              <h2>{item.title}</h2>
              <p>{item.line}</p>
            </li>
          ))}
        </ol>
      </div>

      <img
        ref={imgRef}
        className={`stuff-float ${on ? 'show' : ''}`}
        src={stuff[active].img}
        alt=""
      />

      <SiteFoot />
    </main>
  )
}
