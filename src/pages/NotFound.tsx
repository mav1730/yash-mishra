import { useTransitionNav } from '../context/Transition'
import { usePageReveal } from '../lib/usePageReveal'

export function NotFound() {
  const { to, booted } = useTransitionNav()
  usePageReveal(booted)

  return (
    <main className="page">
      <p className="page-kicker mono">404</p>
      <h1 className="page-title">Lost.</h1>
      <p className="manifesto-quote">This path does not exist.</p>
      <p style={{ marginTop: 28 }}>
        <a
          className="link-out"
          href="/"
          data-cursor="Home"
          onClick={(e) => {
            e.preventDefault()
            to('/', 'Yash')
          }}
        >
          Back to the start →
        </a>
      </p>
    </main>
  )
}
