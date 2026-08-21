import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// El backend de Supabase se activa SOLO si están definidas las variables de
// entorno. Si no, la app cae a persistencia local (localStorage), de modo que
// el sitio sigue funcionando sin configuración.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null
