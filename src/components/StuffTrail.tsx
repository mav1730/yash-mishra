import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SCALES = [1, 0.64, 0.8, 0.64, 0.8, 0.64]
const THRESHOLD = 90
const GAP_CHANCE = 0.1

const POOL: { src: string; tall: boolean }[] = [
  { src: '/images/m4.jpg', tall: true },
  { src: '/images/series-c1.jpg', tall: false },
  { src: '/images/p3.jpg', tall: true },
  { src: '/images/m2.jpg', tall: true },
  { src: '/images/series-c3.jpg', tall: false },
  { src: '/images/m6.jpg', tall: true },
  { src: '/images/legal.jpg', tall: false },
  { src: '/images/m8.jpg', tall: true },
  { src: '/images/series-c5.jpg', tall: false },
  { src: '/images/poster-yash.jpg', tall: true },
  { src: '/images/m3.jpg', tall: true },
  { src: '/images/codebench.jpg', tall: false },
  { src: '/images/m10.jpg', tall: true },
  { src: '/images/series-c2.jpg', tall: false },
  { src: '/images/m1.jpg', tall: true },
  { src: '/images/judge.jpg', tall: false },
]

export function StuffTrail() {
  const wrap = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const cards = useRef<HTMLElement[]>([])
  const idx = useRef(0)
  const z = useRef(1)
  const gap = useRef(0)
  const last = useRef({ x: -999, y: -999 })
  const mouse = useRef({ x: 0, y: 0 })
  const active = useRef<HTMLElement[]>([])

  useEffect(() => {
    const root = wrap.current
    if (!root) return

    const nodes = cards.current.filter(Boolean)
    nodes.forEach((el) => {
      gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 0.64 })
    })

    const place = (el: HTMLElement, x: number, y: number) => {
      z.current += 1
      const scale = SCALES[z.current % SCALES.length]
      const w = el.offsetWidth || 180
      const h = el.offsetHeight || 220
      gsap.killTweensOf(el)
      gsap.set(el, {
        opacity: 1,
        scale,
        zIndex: z.current,
        x: Math.round(x - w / 2),
        y: Math.round(y - h / 2),
      })
      const at = active.current.indexOf(el)
      if (at !== -1) active.current.splice(at, 1)
      active.current.push(el)
    }

    const drop = (x: number, y: number) => {
      if (!nodes.length) return
      if (active.current.length > 0) {
        if (gap.current > 0) {
          gap.current -= 1
          return
        }
        if (Math.random() < GAP_CHANCE) {
          gap.current = 1 + Math.floor(Math.random() * 3)
          return
        }
      }
      place(nodes[idx.current], x, y)
      idx.current = (idx.current + 1) % nodes.length
    }

    const box = () => root.getBoundingClientRect()

    const coarse = window.matchMedia('(hover: none)').matches

    const onMove = (e: MouseEvent) => {
      if (coarse) return
      if (document.body.classList.contains('modal-open')) return
      if (document.body.classList.contains('wiping')) return
      const hit = e.target instanceof Element ? e.target.closest('.nav, .contact-back, .mobile-panel') : null
      if (hit) return
      const r = box()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      mouse.current = { x, y }
      if (x < 0 || y < 0 || x > r.width || y > r.height) return
      if (y < 72) return
      if (Math.hypot(x - last.current.x, y - last.current.y) < THRESHOLD) return
      drop(x, y)
      last.current = { x, y }
    }

    const draw = () => {
      const lines = svg.current?.querySelectorAll('line')
      if (!lines || !lines.length) return
      const pile = active.current.filter((el) => Number(gsap.getProperty(el, 'opacity')) > 0.05)
      const lastEl = pile[pile.length - 1]
      const firstEl = pile[0]
      const set = (line: SVGLineElement, x1: number, y1: number, x2: number, y2: number, op: number) => {
        line.setAttribute('x1', x1.toFixed(1))
        line.setAttribute('y1', y1.toFixed(1))
        line.setAttribute('x2', x2.toFixed(1))
        line.setAttribute('y2', y2.toFixed(1))
        line.setAttribute('stroke-opacity', op.toFixed(3))
        line.style.display = ''
      }
      let n = 0
      if (lastEl && !coarse) {
        const x = Number(gsap.getProperty(lastEl, 'x'))
        const y = Number(gsap.getProperty(lastEl, 'y'))
        const s = Number(gsap.getProperty(lastEl, 'scale')) || 1
        const hw = (lastEl.offsetWidth * s) / 2
        const hh = (lastEl.offsetHeight * s) / 2
        const cx = x + lastEl.offsetWidth / 2
        const cy = y + lastEl.offsetHeight / 2
        const mx = mouse.current.x
        const my = mouse.current.y
        for (const [sx, sy] of [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ] as const) {
          if (lines[n]) set(lines[n] as SVGLineElement, mx, my, cx + sx * hw, cy + sy * hh, 0.45)
          n += 1
        }
        if (firstEl && firstEl !== lastEl && lines[n]) {
          const fx = Number(gsap.getProperty(firstEl, 'x')) + firstEl.offsetWidth / 2
          const fy = Number(gsap.getProperty(firstEl, 'y')) + firstEl.offsetHeight / 2
          set(lines[n] as SVGLineElement, mx, my, fx, fy, 0.28)
          n += 1
        }
      }
      for (; n < lines.length; n += 1) {
        ;(lines[n] as SVGLineElement).style.display = 'none'
      }
    }

    const tick = () => {
      draw()
      raf = requestAnimationFrame(tick)
    }
    let raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="stuff-trail" ref={wrap} aria-hidden="true">
      {POOL.map((item, i) => (
        <figure
          key={item.src}
          className={`stuff-trail-card ${item.tall ? 'tall' : 'wide'}`}
          ref={(el) => {
            if (el) cards.current[i] = el
          }}
        >
          <img src={item.src} alt="" draggable={false} />
        </figure>
      ))}
      <svg className="stuff-trail-lines" ref={svg} preserveAspectRatio="none">
        <line />
        <line />
        <line />
        <line />
        <line />
      </svg>
    </div>
  )
}
