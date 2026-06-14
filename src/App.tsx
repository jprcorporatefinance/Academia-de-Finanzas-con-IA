import { Navigate, Route, Routes } from 'react-router-dom'
import { useStore } from './store/store'
import { Layout } from './components/Layout'
import type { ReactNode } from 'react'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProgramaPage from './pages/ProgramaPage'
import LessonPage from './pages/LessonPage'
import SimuladoresPage from './pages/SimuladoresPage'
import SimuladorPage from './pages/SimuladorPage'
import MaterialesPage from './pages/MaterialesPage'
import MensajesPage from './pages/MensajesPage'
import AlumnosPage from './pages/AlumnosPage'

function Protected({ children, admin }: { children: ReactNode; admin?: boolean }) {
  const { currentUser } = useStore()
  if (!currentUser) return <Navigate to="/ingresar" replace />
  if (admin && currentUser.role !== 'admin') return <Navigate to="/app" replace />
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ingresar" element={<LoginPage />} />

      <Route path="/app" element={<Protected><DashboardPage /></Protected>} />
      <Route path="/app/programa" element={<Protected><ProgramaPage /></Protected>} />
      <Route path="/app/programa/:lessonId" element={<Protected><LessonPage /></Protected>} />
      <Route path="/app/simuladores" element={<Protected><SimuladoresPage /></Protected>} />
      <Route path="/app/simuladores/:simId" element={<Protected><SimuladorPage /></Protected>} />
      <Route path="/app/materiales" element={<Protected><MaterialesPage /></Protected>} />
      <Route path="/app/mensajes" element={<Protected><MensajesPage /></Protected>} />
      <Route path="/app/alumnos" element={<Protected admin><AlumnosPage /></Protected>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
