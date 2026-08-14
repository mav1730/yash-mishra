import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { getLenis } from '../lib/useLenis'

type TransitionApi = {
  to: (path: string, label: string) => void
  busy: boolean
  booted: boolean
}

const TransitionContext = createContext<TransitionApi | null>(null)

export function useTransitionNav() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('TransitionProvider missing')
  return ctx
}

let bootPlayed = false

function skipBoot() {
  return new URLSearchParams(window.location.search).has('ready')
}

const FULL = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
const BOTTOM = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
const TOP = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const panel = useRef<HTMLDivElement>(null)
  const grain = useRef<HTMLCanvasElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const [label, setLabel] = useState('Yash Mishra')
  const [pct, setPct] = useState(0)
  const [busy, setBusy] = useState(!skipBoot())
  const [booted, setBooted] = useState(skipBoot())
  const grainLoop = useRef(0)
  const running = useRef(false)
  const startedBoot = useRef(false)

  const runGrain = useCallback((on: boolean) => {
    const canvas = grain.current
    window.clearInterval(grainLoop.current)
    if (!on || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const size = 200
    const tick = () => {
      canvas.width = size
      canvas.height = size
      const img = ctx.createImageData(size, size)
      const data = img.data
      for (let i = 0; i < data.length; i += 4) {
        const n = (Math.random() * 255) | 0
        data[i] = n
        data[i + 1] = n
        data[i + 2] = n
        data[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }
    tick()
    grainLoop.current = window.setInterval(tick, 50)
  }, [])

  const setCount = (n: number) => {
    setPct(n)
    if (pctRef.current) pctRef.current.textContent = String(n).padStart(2, '0')
    if (bar.current) bar.current.style.width = `${n}%`
  }

  const playCycle = useCallback(
    (nextLabel: string, onCovered?: () => void, fromBoot = false) => {
      const el = panel.current
      if (!el) {
        onCovered?.()
        return
      }
      running.current = true
      setBusy(true)
      setLabel(nextLabel)
      document.body.classList.add('wiping')
      runGrain(true)
      const counter = { v: 0 }
      setCount(0)

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('wiping')
          setBusy(false)
          running.current = false
          runGrain(false)
          gsap.set(el, { clipPath: BOTTOM, pointerEvents: 'none' })
        },
      })

      if (fromBoot) {
        gsap.set(el, { clipPath: FULL, autoAlpha: 1, pointerEvents: 'all' })
      } else {
        tl.set(el, { clipPath: BOTTOM, autoAlpha: 1, pointerEvents: 'all' }).to(el, {
          clipPath: FULL,
          duration: 0.85,
          ease: 'power3.inOut',
        })
      }

      tl.to(counter, {
        v: 100,
        duration: fromBoot ? 1.2 : 0.7,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .add(() => onCovered?.())
        .to(el, {
          clipPath: TOP,
          duration: 1.15,
          ease: 'power3.out',
        })
    },
    [runGrain],
  )

  useEffect(() => {
    if (booted) {
      if (panel.current) gsap.set(panel.current, { clipPath: BOTTOM, autoAlpha: 1 })
      return
    }
    if (startedBoot.current || bootPlayed) return
    startedBoot.current = true
    bootPlayed = true
    document.body.classList.add('loading')
    playCycle(
      'Yash Mishra',
      () => {
        document.body.classList.remove('loading')
        setBooted(true)
        window.dispatchEvent(new Event('ym:ready'))
      },
      true,
    )
  }, [booted, playCycle])

  const to = useCallback(
    (path: string, nextLabel: string) => {
      if (running.current || !booted) return
      if (window.location.pathname === path) {
        getLenis()?.scrollTo(0, { immediate: true })
        window.scrollTo(0, 0)
        return
      }
      playCycle(nextLabel, () => {
        navigate(path)
        getLenis()?.scrollTo(0, { immediate: true })
        window.scrollTo(0, 0)
      })
    },
    [booted, navigate, playCycle],
  )

  return (
    <TransitionContext.Provider value={{ to, busy, booted }}>
      {children}
      <div className={`wipe ${busy ? 'on' : ''}`} ref={panel} aria-hidden>
        <canvas ref={grain} className="wipe-grain" />
        <div className="wipe-veil" />
        <div className="wipe-center">
          <div className="wipe-pct">
            <span ref={pctRef}>{String(pct).padStart(2, '0')}</span>
            <span className="wipe-pct-mark">%</span>
          </div>
          <div className="wipe-bar">
            <div className="wipe-bar-fill" ref={bar} />
          </div>
          <div className="wipe-name">{label}</div>
        </div>
        <div className="wipe-row">
          <span className="mono">Yash Mishra</span>
          <span className="mono">Applied AI</span>
        </div>
      </div>
    </TransitionContext.Provider>
  )
}
