import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export function useLenis() {
  useEffect(() => {
    const instance = new Lenis({
      duration: 1.25,
      smoothWheel: true,
    })
    lenis = instance

    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      if (lenis === instance) lenis = null
    }
  }, [])
}
