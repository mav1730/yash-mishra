import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TransitionProvider } from './context/Transition'
import { Grain } from './components/Grain'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { Playground } from './pages/Playground'
import { Manifesto } from './pages/Manifesto'
import { Pinart } from './pages/Pinart'
import { NotFound } from './pages/NotFound'
import { useLenis } from './lib/useLenis'

function Shell() {
  useLenis()
  return (
    <>
      <Grain />
      <Cursor />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/pinart" element={<Pinart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Shell />
      </TransitionProvider>
    </BrowserRouter>
  )
}
