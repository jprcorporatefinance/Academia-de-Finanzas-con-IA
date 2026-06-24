import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { supabase } from '../lib/supabase'
import { TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react'

export default function ResetPasswordPage() {
  const { updatePassword, backend } = useStore()
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  // Al llegar desde el email, Supabase detecta el token de recuperación en la URL
  // y abre una sesión temporal (evento PASSWORD_RECOVERY). Ahí habilitamos el form.
  useEffect(() => {
    if (!supabase) {
      setReady(true)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setReady(true)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    if (password !== confirm) return setError('Las contraseñas no coinciden.')
    setBusy(true)
    const res = await updatePassword(password)
    setBusy(false)
    if (res.ok) {
      setDone(true)
      setTimeout(() => navigate('/app'), 1500)
    } else setError(res.error ?? 'No se pudo actualizar la contraseña.')
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
          <div className="mb-4 flex items-center gap-2 text-gold-300">
            <ShieldCheck size={20} />
            <h1 className="text-lg font-bold text-slate-100">Restablecer contraseña</h1>
          </div>

          {backend === 'local' ? (
            <p className="text-sm text-slate-400">
              La recuperación por email requiere el backend (Supabase) configurado. En esta versión local no está
              disponible.
            </p>
          ) : !ready ? (
            <p className="text-sm text-slate-400">
              Abrí esta página desde el enlace que te llegó por email. Estamos validando tu solicitud…
            </p>
          ) : done ? (
            <div className="rounded-lg border border-value-500/40 bg-value-500/10 px-3 py-2 text-sm text-value-400">
              ✓ Contraseña actualizada. Entrando a tu academia…
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-danger-500/40 bg-danger-500/10 px-3 py-2 text-sm text-danger-400">
                  {error}
                </div>
              )}
              <div>
                <label className="label">Nueva contraseña</label>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
              </div>
              <div>
                <label className="label">Repetir contraseña</label>
                <input className="input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repetí la contraseña" />
              </div>
              <button className="btn-gold w-full py-3" type="submit" disabled={busy}>
                {busy ? 'Guardando…' : 'Guardar nueva contraseña'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          <Link to="/ingresar" className="mt-4 block text-center text-xs text-slate-400 hover:text-gold-300">
            Volver al ingreso
          </Link>
        </div>
      </div>
    </div>
  )
}
