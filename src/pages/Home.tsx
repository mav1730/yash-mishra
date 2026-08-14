import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, projects } from '../data/content'
import { useTransitionNav } from '../context/Transition'
import { LicenseCard } from '../components/LicenseCard'
import { SiteFoot } from '../components/SiteFoot'

gsap.registerPlugin(ScrollTrigger)

export function Home() {
  const { to, booted } = useTransitionNav()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id =
      new URLSearchParams(window.location.search).get('section') ||
      window.location.hash.replace('#', '')
    if (!id) return
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 160)
    return () => window.clearTimeout(t)
  }, [])

  useLayoutEffect(() => {
    if (!booted || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-name', {
        y: 48,
        duration: 1.15,
        stagger: 0.08,
        ease: 'power3.out',
      })
      gsap.from('.hero-photo-wrap, .hero-sub span', {
        y: 36,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.to('.hero-photo', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero-name-l', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero-name-r', {
        xPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.fromTo(
        '.intro-copy p',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: '.intro', start: 'top 82%', once: true },
        },
      )
      gsap.fromTo(
        '.intro-still',
        { y: 56, opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: '.intro', start: 'top 84%', once: true },
        },
      )
      gsap.fromTo(
        '.intro-still img',
        { scale: 1.16, yPercent: -6 },
        {
          scale: 1,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.intro',
            start: 'top 90%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          },
        )
        const img = row.querySelector('img')
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12, clipPath: 'inset(12% 12% 12% 12%)' },
            {
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                end: 'top 30%',
                scrub: true,
              },
            },
          )
        }
      })

      gsap.from('.quote-band blockquote', {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: '.quote-band', start: 'top 75%' },
      })

      gsap.from('.license', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.closer', start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [booted])

  return (
    <div ref={root}>
      <section className="hero">
        <p className="hero-kicker mono">
          Sometimes silence speaks louder than the models we ship
        </p>
        <div className="hero-bill">
          <h1 className="hero-name hero-name-l">{profile.first}</h1>
          <div className="hero-photo-wrap">
            <span className="hero-orb" />
            <img className="hero-photo" src="/images/p3.jpg" alt="Yash Mishra" />
          </div>
          <h1 className="hero-name hero-name-r">{profile.last}</h1>
        </div>
        <div className="hero-sub mono">
          <span>
            {profile.title} {profile.year}
          </span>
          <span>{profile.city}</span>
        </div>
      </section>

      <section className="intro">
        <div className="intro-duo">
          <div className="intro-copy">
            <p>
              I build tool-using LLM systems you can evaluate, recover after failure,
              observe in production, and improve with data —{' '}
              <em>not chatbots with a fancy UI.</em>
            </p>
          </div>
          <figure className="intro-still">
            <img src="/images/highlight1.jpg" alt="Yash Mishra" />
          </figure>
        </div>
      </section>

      <section className="section" id="selected">
        <div className="section-head mono">
          <span>Selected work</span>
          <a
            href="/work"
            data-cursor="All"
            onClick={(e) => {
              e.preventDefault()
              to('/work', 'Work')
            }}
          >
            View archive →
          </a>
        </div>
        {projects.map((p) => (
          <a
            key={p.id}
            className="work-row"
            href={p.fake ? '/work' : p.href}
            data-cursor={p.fake ? 'Soon' : 'Repo'}
            onClick={(e) => {
              if (p.fake || p.href.startsWith('/')) {
                e.preventDefault()
                to('/work', 'Work')
              }
            }}
          >
            <span className="mono">{p.index}</span>
            <div>
              <span className={`pill ${p.fake ? 'ghost' : ''}`}>{p.status}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
            </div>
            <img src={p.image} alt="" />
          </a>
        ))}
      </section>

      <section className="quote-band">
        <div className="quote-spread">
          <div>
            <blockquote>“{profile.quote}”</blockquote>
            <cite className="mono">— {profile.name}</cite>
            <div style={{ marginTop: 28 }}>
              <a
                className="link-out"
                href="/manifesto"
                data-cursor="Read"
                onClick={(e) => {
                  e.preventDefault()
                  to('/manifesto', 'Stuff')
                }}
              >
                The rest of the manifesto →
              </a>
            </div>
          </div>
          <figure className="quote-still">
            <img src="/images/poster-yash.jpg" alt="Yash Mishra" />
          </figure>
        </div>
      </section>

      <section className="closer" id="license">
        <div className="closer-stage">
          <img className="scrap a" src="/images/series-c2.jpg" alt="" />
          <img className="scrap b" src="/images/series-c4.jpg" alt="" />
          <img className="scrap c" src="/images/series-c3.jpg" alt="" />
          <img className="scrap d" src="/images/series-c5.jpg" alt="" />
          <img className="scrap e" src="/images/series-c1.jpg" alt="" />
          <LicenseCard />
        </div>
      </section>

      <SiteFoot big />
    </div>
  )
}
