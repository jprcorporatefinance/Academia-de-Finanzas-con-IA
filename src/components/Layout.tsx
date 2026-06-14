import { type ReactNode, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import {
  LayoutDashboard,
  GraduationCap,
  Calculator,
  MessageSquare,
  FolderOpen,
  Users,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react'

const studentNav = [
  { to: '/app', label: 'Panel', icon: LayoutDashboard, end: true },
  { to: '/app/programa', label: 'Programa', icon: GraduationCap },
  { to: '/app/simuladores', label: 'Simuladores', icon: Calculator },
  { to: '/app/materiales', label: 'Materiales', icon: FolderOpen },
  { to: '/app/mensajes', label: 'Mensajes', icon: MessageSquare },
]
const adminNav = [
  { to: '/app', label: 'Panel', icon: LayoutDashboard, end: true },
  { to: '/app/programa', label: 'Programa', icon: GraduationCap },
  { to: '/app/simuladores', label: 'Simuladores', icon: Calculator },
  { to: '/app/alumnos', label: 'Alumnos', icon: Users },
  { to: '/app/materiales', label: 'Materiales', icon: FolderOpen },
  { to: '/app/mensajes', label: 'Mensajes', icon: MessageSquare },
]

export function Layout({ children }: { children: ReactNode }) {
  const { currentUser, logout, messages } = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  if (!currentUser) return null
  const nav = currentUser.role === 'admin' ? adminNav : studentNav
  const unread = messages.filter((m) => m.toId === currentUser.id && !m.read).length

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-700 bg-ink-900/95 backdrop-blur transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <Link to="/app" className="flex items-center gap-2.5 border-b border-ink-700 px-5 py-4" onClick={() => setOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
              <TrendingUp size={20} />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-slate-100">Academia FC + IA</div>
              <div className="text-[10px] uppercase tracking-wider text-gold-400">Programa CEO</div>
            </div>
          </Link>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-gold-400/10 text-gold-200'
                      : 'text-slate-400 hover:bg-ink-800 hover:text-slate-200'
                  }`
                }
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.label === 'Mensajes' && unread > 0 && (
                  <span className="rounded-full bg-danger-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-ink-700 p-3">
            <div className="mb-2 flex items-center gap-2.5 px-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-ink-950"
                style={{ background: currentUser.avatarColor }}
              >
                {currentUser.name.charAt(0)}
              </div>
              <div className="min-w-0 leading-tight">
                <div className="truncate text-sm font-semibold text-slate-100">{currentUser.name}</div>
                <div className="truncate text-xs text-slate-400">
                  {currentUser.role === 'admin' ? 'Administrador' : currentUser.company}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="btn-ghost w-full justify-start text-sm"
            >
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink-700 bg-ink-950/80 px-4 py-3 backdrop-blur lg:hidden">
          <button onClick={() => setOpen((o) => !o)} className="btn-ghost px-2.5 py-2">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="font-bold text-slate-100">Academia FC + IA</span>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
