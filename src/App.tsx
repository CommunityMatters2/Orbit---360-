import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Shell from './components/Shell'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'
import Apps from './pages/Apps'
import AppDetail from './pages/AppDetail'
import Insights from './pages/Insights'
import Roadmap from './pages/Roadmap'
import Embed from './pages/Embed'
import NotFound from './pages/NotFound'

export default function App() {
  const { pathname, hash } = useLocation()

  // Scroll to top on page change. Braces matter: browsers can return a value
  // from scrollTo, and React would mistake it for a cleanup function.
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/apps/:id" element={<AppDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/open/:id" element={<Embed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
      <CommandPalette />
    </>
  )
}
