import type { ReactNode } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { LocalStoreProvider } from './localStore'
import { RemoteStoreProvider } from './remoteStore'

export { useStore } from './context'
export type { StoreApi } from './context'

// Selecciona el backend según haya o no credenciales de Supabase.
// `isSupabaseConfigured` es constante en runtime, así que no se viola la regla
// de hooks (la identidad del provider no cambia entre renders).
export function StoreProvider({ children }: { children: ReactNode }) {
  return isSupabaseConfigured ? (
    <RemoteStoreProvider>{children}</RemoteStoreProvider>
  ) : (
    <LocalStoreProvider>{children}</LocalStoreProvider>
  )
}
