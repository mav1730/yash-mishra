import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [hot, setHot] = useState(false)
  const [label, setLabel] = useState('')
  const [pos, setPos] = useState({ x: -80, y: -80 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      setHot(Boolean(t))
      setLabel(t?.getAttribute('data-cursor') || '')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={dot} className={`cursor-dot ${hot ? 'hot' : ''}`} />
      <div ref={ring} className={`cursor-ring ${hot ? 'hot' : ''}`} />
      {label ? (
        <div className="cursor-label" style={{ left: pos.x, top: pos.y }}>
          {label}
        </div>
      ) : null}
    </>
  )
}
