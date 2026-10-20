import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useApps } from './store/useApps'
import Shell from './components/Shell'
import Starfield from './components/Starfield'
import AppDrawer from './components/AppDrawer'
import AppFormModal from './components/AppFormModal'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'
import Apps from './pages/Apps'
import Insights from './pages/Insights'
import Lab from './pages/Lab'
import Settings from './pages/Settings'
import Embed from './pages/Embed'

export default function App() {
  const { theme } = useApps()
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <>
      <Starfield theme={theme} />
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/open/:id" element={<Embed />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Shell>
      <AppDrawer />
      <AppFormModal />
      <CommandPalette />
    </>
  )
}
