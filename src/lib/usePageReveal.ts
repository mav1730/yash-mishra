import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function usePageReveal(ready: boolean) {
  useLayoutEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-title, .page-kicker, .manifesto-quote',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
      )
      gsap.utils.toArray<HTMLElement>('.case, .play-card, .stuff-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 36 },
          {
            y: 0,
            duration: 0.8,
            delay: i * 0.04,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        )
      })
    })
    return () => ctx.revert()
  }, [ready])
}
