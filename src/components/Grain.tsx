import { useEffect, useRef } from 'react'

export function Grain() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let frame = 0
    let alive = true
    const size = 180

    const paint = () => {
      if (!alive) return
      canvas.width = size
      canvas.height = size
      const img = ctx.createImageData(size, size)
      const data = img.data
      for (let i = 0; i < data.length; i += 4) {
        const n = (Math.random() * 255) | 0
        data[i] = n
        data[i + 1] = n
        data[i + 2] = n
        data[i + 3] = 210
      }
      ctx.putImageData(img, 0, 0)
      frame = window.setTimeout(paint, 70)
    }
    paint()
    return () => {
      alive = false
      window.clearTimeout(frame)
    }
  }, [])

  return (
    <>
      <canvas ref={ref} className="grain-canvas" aria-hidden />
      <div className="vignette" />
    </>
  )
}
