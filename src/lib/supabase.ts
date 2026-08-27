import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// ----------------------------------------------------------------------------
// Conexión a Supabase.
//
// El proyecto de producción queda fijado en el código: la clave publishable
// (anon) es pública por diseño —viaja embebida en el cliente y la seguridad la
// dan las políticas RLS—, así que no es un secreto. Fijarla acá evita que una
// variable de entorno mal configurada en el hosting (por ejemplo, la que inyecta
// la extensión de Supabase en Netlify apuntando a otro proyecto) rompa la app.
//
// Las variables de entorno siguen funcionando como override para desarrollo
// local, salvo que apunten a proyectos que ya no existen.
// ----------------------------------------------------------------------------

const PROJECT_URL = 'https://fkgcgnfezcdsyvjewjph.supabase.co'
const PROJECT_KEY = 'sb_publishable_m3rF1ob0yGf0SGOrl9WCCg_xSQXgk1t'

/** Proyectos dados de baja: si el entorno los inyecta, se ignoran. */
const RETIRED_PROJECTS = ['kbeuteyecwglcxciyqng']

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const envIsUsable =
  Boolean(envUrl && envKey) && !RETIRED_PROJECTS.some((ref) => envUrl!.includes(ref))

const url = envIsUsable ? envUrl! : PROJECT_URL
const anonKey = envIsUsable ? envKey! : PROJECT_KEY

/** Host al que se conecta la app (para diagnóstico en pantalla). */
export const supabaseHost = new URL(url).hostname

export const isSupabaseConfigured = true

export const supabase: SupabaseClient = createClient(url, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
})
