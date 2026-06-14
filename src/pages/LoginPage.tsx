import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { TrendingUp, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const { login, register } = useStore()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')

  // login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // register
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (login(email, password)) navigate('/app')
    else setError('Email o contraseña incorrectos.')
  }
  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('Completá nombre, email y contraseña.')
      return
    }
    if (register({ name, email, password, company, position })) navigate('/app')
    else setError('Ese email ya está registrado.')
  }

  function quickLogin(em: string, pw: string) {
    if (login(em, pw)) navigate('/app')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-radial-spotlight px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
            <TrendingUp size={22} />
          </div>
          <span className="text-lg font-bold text-slate-100">Academia FC + IA</span>
        </Link>

        <div className="card p-7">
          <div className="mb-5 flex rounded-xl border border-ink-700 bg-ink-950/50 p-1">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m)
                  setError('')
                }}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                  mode === m ? 'bg-gold-400 text-ink-950' : 'text-slate-400'
                }`}
              >
                {m === 'login' ? 'Ingresar' : 'Crear cuenta'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-danger-500/40 bg-danger-500/10 px-3 py-2 text-sm text-danger-400">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" />
              </div>
              <div>
                <label className="label">Contraseña</label>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
              </div>
              <button className="btn-gold w-full py-3" type="submit">
                Entrar <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="label">Nombre y apellido</label>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Empresa</label>
                  <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Empresa" />
                </div>
                <div>
                  <label className="label">Cargo</label>
                  <input className="input" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="CEO" />
                </div>
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" />
              </div>
              <div>
                <label className="label">Contraseña</label>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Elegí una contraseña" />
              </div>
              <button className="btn-gold w-full py-3" type="submit">
                Crear cuenta <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Accesos demo */}
        <div className="mt-5 card p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Accesos de demostración</p>
          <div className="grid gap-2">
            <button onClick={() => quickLogin('admin@academia.com', 'admin123')} className="btn-ghost justify-between text-sm">
              <span>👑 Administrador</span>
              <span className="text-xs text-slate-500">admin@academia.com</span>
            </button>
            <button onClick={() => quickLogin('mfacosta@empresa.com', 'demo123')} className="btn-ghost justify-between text-sm">
              <span>🎓 Alumna (CEO)</span>
              <span className="text-xs text-slate-500">mfacosta@empresa.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
