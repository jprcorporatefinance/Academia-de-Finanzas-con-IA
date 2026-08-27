import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { supabaseHost } from '../lib/supabase'
import { ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const { login, register, backend, requestPasswordReset } = useStore()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)
  const [showReset, setShowReset] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setInfo('')
    if (!email) return setError('Ingresá tu email para recuperar la contraseña.')
    setBusy(true)
    const res = await requestPasswordReset(email)
    setBusy(false)
    if (res.ok) {
      setInfo('Te enviamos un email con el enlace para restablecer tu contraseña. Revisá tu bandeja (y el spam).')
      setShowReset(false)
    } else setError(res.error ?? 'No se pudo enviar el email de recuperación.')
  }

  // login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // register
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setInfo(''); setBusy(true)
    const ok = await login(email, password)
    setBusy(false)
    if (ok) navigate('/app')
    else setError('Email o contraseña incorrectos.')
  }
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setInfo('')
    if (!name || !email || !password) {
      setError('Completá nombre, email y contraseña.')
      return
    }
    setBusy(true)
    const res = await register({ name, email, password, company, position })
    setBusy(false)
    if (res.ok && res.needsConfirmation) {
      setInfo('Cuenta creada. Revisá tu email para confirmar la dirección y luego ingresá.')
      setMode('login')
    } else if (res.ok) {
      navigate('/app')
    } else {
      setError(res.error ?? 'No se pudo crear la cuenta.')
    }
  }

  async function quickLogin(em: string, pw: string) {
    setBusy(true)
    const ok = await login(em, pw)
    setBusy(false)
    if (ok) navigate('/app')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-radial-spotlight px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <svg width="38" height="34" viewBox="0 0 52 46" aria-hidden="true" className="shrink-0">
            <rect x="0" y="26" width="9" height="20" rx="2.5" fill="#8fd3b7" />
            <rect x="13" y="14" width="9" height="32" rx="2.5" fill="#2ebe8c" />
            <rect x="26" y="2" width="9" height="44" rx="2.5" fill="#1e8f6b" />
            <rect x="45" y="3" width="2" height="40" rx="1" fill="#12614a" />
          </svg>
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold text-slate-100">
              JPR<span className="text-danger-400">.</span> Consulting
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gold-300">Academia FC + IA</div>
          </div>
        </Link>

        <div className="card p-7">
          <div className="mb-5 flex rounded-xl border border-ink-700 bg-ink-950/50 p-1">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m)
                  setError(''); setInfo('')
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
              {/* Diagnóstico: ante un fallo de red, mostrar a qué backend se intentó conectar. */}
              {error.toLowerCase().includes('fetch') && (
                <div className="mt-1.5 font-mono text-[11px] text-danger-400/70">
                  No se pudo conectar con: {supabaseHost}
                </div>
              )}
            </div>
          )}
          {info && (
            <div className="mb-4 rounded-lg border border-value-500/40 bg-value-500/10 px-3 py-2 text-sm text-value-400">
              {info}
            </div>
          )}

          {mode === 'login' && showReset ? (
            <form onSubmit={handleReset} className="space-y-4">
              <p className="text-sm text-slate-400">Ingresá tu email y te mandamos un enlace para crear una nueva contraseña.</p>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" />
              </div>
              <button className="btn-gold w-full py-3" type="submit" disabled={busy}>
                {busy ? 'Enviando…' : 'Enviar enlace de recuperación'} <ArrowRight size={18} />
              </button>
              <button type="button" onClick={() => { setShowReset(false); setError(''); setInfo('') }} className="block w-full text-center text-xs text-slate-400 hover:text-gold-300">
                Volver al ingreso
              </button>
            </form>
          ) : mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" />
              </div>
              <div>
                <label className="label">Contraseña</label>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
              </div>
              <button className="btn-gold w-full py-3" type="submit" disabled={busy}>
                {busy ? 'Ingresando…' : 'Entrar'} <ArrowRight size={18} />
              </button>
              <button type="button" onClick={() => { setShowReset(true); setError(''); setInfo('') }} className="block w-full text-center text-xs text-slate-400 hover:text-gold-300">
                ¿Olvidaste tu contraseña?
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
              <button className="btn-gold w-full py-3" type="submit" disabled={busy}>
                {busy ? 'Creando…' : 'Crear cuenta'} <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Accesos demo (solo en modo local) o nota del backend real */}
        {backend === 'local' ? (
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
        ) : (
          <p className="mt-5 text-center text-xs text-slate-500">
            El primer usuario que se registra queda como <span className="text-gold-300">administrador</span> del programa.
          </p>
        )}
      </div>
    </div>
  )
}
