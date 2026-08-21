import { type ReactNode, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import {
  LayoutDashboard,
  GraduationCap,
  Landmark,
  Calculator,
  MessageSquare,
  FolderOpen,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const studentNav = [
  { to: '/app', label: 'Panel', icon: LayoutDashboard, end: true },
  { to: '/app/maestria', label: 'Maestría', icon: Landmark },
  { to: '/app/programa', label: 'Programa', icon: GraduationCap },
  { to: '/app/simuladores', label: 'Simuladores', icon: Calculator },
  { to: '/app/materiales', label: 'Materiales', icon: FolderOpen },
  { to: '/app/mensajes', label: 'Mensajes', icon: MessageSquare },
]
const adminNav = [
  { to: '/app', label: 'Panel', icon: LayoutDashboard, end: true },
  { to: '/app/maestria', label: 'Maestría', icon: Landmark },
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
            <svg width="30" height="26" viewBox="0 0 52 46" aria-hidden="true" className="shrink-0">
              <rect x="0" y="26" width="9" height="20" rx="2.5" fill="#8fd3b7" />
              <rect x="13" y="14" width="9" height="32" rx="2.5" fill="#2ebe8c" />
              <rect x="26" y="2" width="9" height="44" rx="2.5" fill="#1e8f6b" />
              <rect x="45" y="3" width="2" height="40" rx="1" fill="#12614a" />
            </svg>
            <div className="leading-tight">
              <div className="font-serif text-sm font-bold text-slate-100">
                JPR<span className="text-danger-400">.</span> Consulting
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gold-300">Academia FC + IA</div>
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
          <span className="font-serif font-bold text-slate-100">JPR<span className="text-danger-400">.</span> Consulting</span>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
