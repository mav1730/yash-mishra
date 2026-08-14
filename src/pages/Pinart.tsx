import { SiteFoot } from '../components/SiteFoot'
import { StuffTrail } from '../components/StuffTrail'
import { useTransitionNav } from '../context/Transition'
import { usePageReveal } from '../lib/usePageReveal'

export function Pinart() {
  const { booted } = useTransitionNav()
  usePageReveal(booted)

  return (
    <main className="page pinart-page">
      <header className="pinart-head">
        <p className="page-kicker mono">Move in the field</p>
        <h1 className="page-title">PINART</h1>
      </header>
      <div className="pinart-stage">
        <StuffTrail />
      </div>
      <SiteFoot />
    </main>
  )
}
