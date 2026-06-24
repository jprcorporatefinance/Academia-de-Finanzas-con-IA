import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type {
  User,
  Material,
  StudentState,
  Message,
  Lesson,
  LessonProgress,
  SimulatorRun,
} from '../types'
import { curriculum as baseCurriculum } from '../data/curriculum'
import { StoreContext, type StoreApi } from './context'
import { supabase } from '../lib/supabase'

// ----------------------------------------------------------------------------
// Backend real con Supabase: auth + Postgres con RLS. El contenido del curso
// (las 12 clases) vive en el código; acá persisten usuarios, progreso, mensajes,
// materiales y las clases que agregue el admin.
// ----------------------------------------------------------------------------

const sb = supabase! // este provider sólo se monta si Supabase está configurado

// --- mappers DB (snake_case) -> dominio (camelCase) ------------------------
const toUser = (r: any): User => ({
  id: r.id,
  name: r.name ?? '',
  email: r.email ?? '',
  password: '',
  role: r.role,
  company: r.company ?? undefined,
  position: r.position ?? undefined,
  avatarColor: r.avatar_color ?? '#34d399',
  createdAt: r.created_at,
})
const toProgress = (r: any): LessonProgress => ({
  lessonId: r.lesson_id,
  completed: r.completed,
  quizScore: r.quiz_score ?? undefined,
  minutesSpent: r.minutes_spent ?? 0,
  lastVisited: r.last_visited ?? undefined,
})
const toRun = (r: any): SimulatorRun => ({ simulatorId: r.simulator_id, at: r.at, summary: r.summary ?? '' })
const toMessage = (r: any): Message => ({
  id: String(r.id),
  fromId: r.from_id,
  toId: r.to_id,
  body: r.body,
  createdAt: r.created_at,
  read: r.read,
  context: r.context ?? undefined,
})
const toMaterial = (r: any): Material => ({
  id: String(r.id),
  lessonId: r.lesson_id ?? undefined,
  title: r.title,
  kind: r.kind,
  description: r.description ?? '',
  url: r.url ?? undefined,
  body: r.body ?? undefined,
  createdAt: r.created_at,
  createdBy: r.created_by ?? '',
})

interface RemoteState {
  users: User[]
  progress: { userId: string; p: LessonProgress }[]
  runs: { userId: string; r: SimulatorRun }[]
  messages: Message[]
  materials: Material[]
  customLessons: Lesson[]
}

const emptyState: RemoteState = {
  users: [],
  progress: [],
  runs: [],
  messages: [],
  materials: [],
  customLessons: [],
}

export function RemoteStoreProvider({ children }: { children: ReactNode }) {
  const [initializing, setInitializing] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [data, setData] = useState<RemoteState>(emptyState)
  const userIdRef = useRef<string | null>(null)

  const loadAll = useCallback(async (uid: string) => {
    const [profiles, progress, runs, messages, materials, customLessons] = await Promise.all([
      sb.from('profiles').select('*'),
      sb.from('lesson_progress').select('*'),
      sb.from('simulator_runs').select('*'),
      sb.from('messages').select('*').order('created_at', { ascending: true }),
      sb.from('materials').select('*').order('created_at', { ascending: false }),
      sb.from('custom_lessons').select('*'),
    ])

    setData({
      users: (profiles.data ?? []).map(toUser),
      progress: (progress.data ?? []).map((r: any) => ({ userId: r.user_id, p: toProgress(r) })),
      runs: (runs.data ?? []).map((r: any) => ({ userId: r.user_id, r: toRun(r) })),
      messages: (messages.data ?? []).map(toMessage),
      materials: (materials.data ?? []).map(toMaterial),
      customLessons: (customLessons.data ?? []).map((r: any) => r.payload as Lesson),
    })
    const me = (profiles.data ?? []).find((p: any) => p.id === uid)
    if (me) setCurrentUser(toUser(me))
  }, [])

  // ---- auth init + cambios de sesión ----
  useEffect(() => {
    let active = true
    sb.auth.getSession().then(async ({ data: { session } }) => {
      if (!active) return
      if (session?.user) {
        userIdRef.current = session.user.id
        await loadAll(session.user.id)
      }
      setInitializing(false)
    })

    const { data: sub } = sb.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        if (userIdRef.current !== session.user.id) {
          userIdRef.current = session.user.id
          await loadAll(session.user.id)
        }
      } else {
        userIdRef.current = null
        setCurrentUser(null)
        setData(emptyState)
      }
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [loadAll])

  // ---- realtime de mensajes ----
  useEffect(() => {
    if (!currentUser) return
    const channel = sb
      .channel('messages-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
        setData((d) => {
          if (payload.eventType === 'INSERT') {
            const m = toMessage(payload.new)
            if (d.messages.some((x) => x.id === m.id)) return d
            return { ...d, messages: [...d.messages, m] }
          }
          if (payload.eventType === 'UPDATE') {
            const m = toMessage(payload.new)
            return { ...d, messages: d.messages.map((x) => (x.id === m.id ? m : x)) }
          }
          return d
        })
      })
      .subscribe()
    return () => {
      sb.removeChannel(channel)
    }
  }, [currentUser])

  // ---- derivados ----
  const curriculum = useMemo(
    () => [...baseCurriculum, ...data.customLessons].sort((a, b) => a.week - b.week),
    [data.customLessons],
  )

  const studentStates = useMemo<StudentState[]>(() => {
    const map = new Map<string, StudentState>()
    for (const u of data.users) map.set(u.id, { userId: u.id, lessons: {}, runs: [], notes: '' })
    for (const { userId, p } of data.progress) {
      const st = map.get(userId) ?? { userId, lessons: {}, runs: [], notes: '' }
      st.lessons[p.lessonId] = p
      map.set(userId, st)
    }
    for (const { userId, r } of data.runs) {
      const st = map.get(userId) ?? { userId, lessons: {}, runs: [], notes: '' }
      st.runs.push(r)
      map.set(userId, st)
    }
    // ordenar runs por fecha desc
    for (const st of map.values()) st.runs.sort((a, b) => b.at.localeCompare(a.at))
    return [...map.values()]
  }, [data.users, data.progress, data.runs])

  const api: StoreApi = {
    initializing,
    backend: 'supabase',
    currentUser,
    users: data.users,
    students: data.users.filter((u) => u.role === 'student'),
    curriculum,
    materials: data.materials,
    messages: data.messages,
    studentStates,

    async login(email, password) {
      const { error } = await sb.auth.signInWithPassword({ email, password })
      return !error
    },
    async logout() {
      await sb.auth.signOut()
    },
    async register(d) {
      const { data: res, error } = await sb.auth.signUp({
        email: d.email,
        password: d.password,
        options: { data: { name: d.name, company: d.company, position: d.position } },
      })
      if (error) return { ok: false, error: error.message }
      if (!res.session) return { ok: true, needsConfirmation: true }
      // la sesión dispara onAuthStateChange -> loadAll
      return { ok: true }
    },
    async requestPasswordReset(email) {
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/restablecer`,
      })
      return error ? { ok: false, error: error.message } : { ok: true }
    },
    async updatePassword(newPassword) {
      const { error } = await sb.auth.updateUser({ password: newPassword })
      return error ? { ok: false, error: error.message } : { ok: true }
    },

    getStudentState(userId) {
      return (
        studentStates.find((s) => s.userId === userId) ?? {
          userId,
          lessons: {},
          runs: [],
          notes: '',
        }
      )
    },

    markLessonProgress(lessonId, patch) {
      if (!currentUser) return
      const existing = data.progress.find((x) => x.userId === currentUser.id && x.p.lessonId === lessonId)?.p
      const merged: LessonProgress = {
        lessonId,
        completed: patch.completed ?? existing?.completed ?? false,
        quizScore: patch.quizScore ?? existing?.quizScore,
        minutesSpent: patch.minutesSpent ?? existing?.minutesSpent ?? 0,
        lastVisited: new Date().toISOString(),
      }
      // optimista
      setData((dd) => {
        const rest = dd.progress.filter((x) => !(x.userId === currentUser.id && x.p.lessonId === lessonId))
        return { ...dd, progress: [...rest, { userId: currentUser.id, p: merged }] }
      })
      void sb.from('lesson_progress').upsert(
        {
          user_id: currentUser.id,
          lesson_id: lessonId,
          completed: merged.completed,
          quiz_score: merged.quizScore ?? null,
          minutes_spent: merged.minutesSpent,
          last_visited: merged.lastVisited,
        },
        { onConflict: 'user_id,lesson_id' },
      )
    },

    recordSimulatorRun(simulatorId, summary) {
      if (!currentUser) return
      const run: SimulatorRun = { simulatorId, at: new Date().toISOString(), summary }
      setData((dd) => ({ ...dd, runs: [{ userId: currentUser.id, r: run }, ...dd.runs] }))
      void sb.from('simulator_runs').insert({ user_id: currentUser.id, simulator_id: simulatorId, summary, at: run.at })
    },

    sendMessage(toId, body, context) {
      if (!currentUser) return
      void sb
        .from('messages')
        .insert({ from_id: currentUser.id, to_id: toId, body, context: context ?? null })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setData((dd) => (dd.messages.some((m) => m.id === String(row.id)) ? dd : { ...dd, messages: [...dd.messages, toMessage(row)] }))
        })
    },
    markMessageRead(messageId) {
      setData((dd) => ({ ...dd, messages: dd.messages.map((m) => (m.id === messageId ? { ...m, read: true } : m)) }))
      void sb.from('messages').update({ read: true }).eq('id', Number(messageId))
    },
    conversationWith(userId) {
      if (!currentUser) return []
      return data.messages
        .filter(
          (m) =>
            (m.fromId === currentUser.id && m.toId === userId) ||
            (m.fromId === userId && m.toId === currentUser.id),
        )
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    },

    addMaterial(m) {
      if (!currentUser) return
      void sb
        .from('materials')
        .insert({
          lesson_id: m.lessonId ?? null,
          title: m.title,
          kind: m.kind,
          description: m.description,
          url: m.url ?? null,
          body: m.body ?? null,
          created_by: currentUser.id,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setData((dd) => ({ ...dd, materials: [toMaterial(row), ...dd.materials] }))
        })
    },
    deleteMaterial(id) {
      setData((dd) => ({ ...dd, materials: dd.materials.filter((m) => m.id !== id) }))
      void sb.from('materials').delete().eq('id', Number(id))
    },
    addLesson(l) {
      setData((dd) => ({ ...dd, customLessons: [...dd.customLessons, l] }))
      void sb.from('custom_lessons').insert({
        id: l.id,
        week: l.week,
        title: l.title,
        subtitle: l.subtitle,
        pillar: l.pillar,
        duration_min: l.durationMin,
        payload: l,
        created_by: currentUser?.id ?? null,
      })
    },

    reset() {
      void sb.auth.signOut()
    },
  }

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}
