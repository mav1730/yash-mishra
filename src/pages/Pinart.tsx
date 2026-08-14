import { StuffTrail } from '../components/StuffTrail'
import { useTransitionNav } from '../context/Transition'
import { usePageReveal } from '../lib/usePageReveal'

export function Pinart() {
  const { booted } = useTransitionNav()
  usePageReveal(booted)

  return (
    <main className="page pinart-page">
      <div className="pinart-bg">
        <img src="/images/pinart-bg.jpg" alt="Yash Mishra" />
      </div>
      <div className="pinart-stage">
        <StuffTrail />
      </div>
    </main>
  )
}
