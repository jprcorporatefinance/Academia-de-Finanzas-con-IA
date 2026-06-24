import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User, Material, StudentState, Message, Lesson, LessonProgress } from '../types'
import { seedUsers, seedStudentStates, seedMessages, seedMaterials } from './seed'
import { curriculum as baseCurriculum } from '../data/curriculum'
import { StoreContext, type StoreApi } from './context'

// ----------------------------------------------------------------------------
// Backend de demostración: persistencia en localStorage. Se usa cuando NO hay
// credenciales de Supabase configuradas.
// ----------------------------------------------------------------------------

const KEY = 'afc-ia-state-v1'

interface PersistedState {
  users: User[]
  materials: Material[]
  studentStates: StudentState[]
  messages: Message[]
  customLessons: Lesson[]
  currentUserId: string | null
}

function load(): PersistedState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return {
    users: seedUsers,
    materials: seedMaterials,
    studentStates: seedStudentStates,
    messages: seedMessages,
    customLessons: [],
    currentUserId: null,
  }
}

const avatarPalette = ['#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa', '#f87171']

export function LocalStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId],
  )

  const curriculum = useMemo(
    () => [...baseCurriculum, ...state.customLessons].sort((a, b) => a.week - b.week),
    [state.customLessons],
  )

  function ensureStudentState(userId: string, draft: PersistedState): StudentState {
    let st = draft.studentStates.find((s) => s.userId === userId)
    if (!st) {
      st = { userId, lessons: {}, runs: [], notes: '' }
      draft.studentStates.push(st)
    }
    return st
  }

  const api: StoreApi = {
    initializing: false,
    backend: 'local',
    currentUser,
    users: state.users,
    students: state.users.filter((u) => u.role === 'student'),
    curriculum,
    materials: state.materials,
    messages: state.messages,
    studentStates: state.studentStates,

    async login(email, password) {
      const u = state.users.find(
        (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password,
      )
      if (u) {
        setState((s) => ({ ...s, currentUserId: u.id }))
        return true
      }
      return false
    },
    async logout() {
      setState((s) => ({ ...s, currentUserId: null }))
    },
    async register(data) {
      if (state.users.some((u) => u.email.toLowerCase() === data.email.toLowerCase()))
        return { ok: false, error: 'Ese email ya está registrado.' }
      const id = `stu-${Date.now()}`
      const user: User = {
        ...data,
        id,
        role: 'student',
        avatarColor: avatarPalette[state.users.length % avatarPalette.length],
        createdAt: new Date().toISOString(),
      }
      setState((s) => ({
        ...s,
        users: [...s.users, user],
        studentStates: [...s.studentStates, { userId: id, lessons: {}, runs: [], notes: '' }],
        currentUserId: id,
      }))
      return { ok: true }
    },
    async requestPasswordReset() {
      return { ok: false, error: 'La recuperación por email requiere el backend (Supabase) configurado.' }
    },
    async updatePassword() {
      return { ok: false, error: 'No disponible en modo local.' }
    },

    getStudentState(userId) {
      return (
        state.studentStates.find((s) => s.userId === userId) ?? {
          userId,
          lessons: {},
          runs: [],
          notes: '',
        }
      )
    },

    markLessonProgress(lessonId, patch) {
      if (!currentUser) return
      setState((s) => {
        const draft: PersistedState = structuredClone(s)
        const st = ensureStudentState(currentUser.id, draft)
        const prev = st.lessons[lessonId] ?? { lessonId, completed: false, minutesSpent: 0 }
        st.lessons[lessonId] = { ...prev, ...patch, lastVisited: new Date().toISOString() }
        return draft
      })
    },

    recordSimulatorRun(simulatorId, summary) {
      if (!currentUser) return
      setState((s) => {
        const draft: PersistedState = structuredClone(s)
        const st = ensureStudentState(currentUser.id, draft)
        st.runs.unshift({ simulatorId, at: new Date().toISOString(), summary })
        st.runs = st.runs.slice(0, 50)
        return draft
      })
    },

    sendMessage(toId, body, context) {
      if (!currentUser) return
      const msg: Message = {
        id: `msg-${Date.now()}`,
        fromId: currentUser.id,
        toId,
        body,
        createdAt: new Date().toISOString(),
        read: false,
        context,
      }
      setState((s) => ({ ...s, messages: [...s.messages, msg] }))
    },
    markMessageRead(messageId) {
      setState((s) => ({
        ...s,
        messages: s.messages.map((m) => (m.id === messageId ? { ...m, read: true } : m)),
      }))
    },
    conversationWith(userId) {
      if (!currentUser) return []
      return state.messages
        .filter(
          (m) =>
            (m.fromId === currentUser.id && m.toId === userId) ||
            (m.fromId === userId && m.toId === currentUser.id),
        )
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    },

    addMaterial(m) {
      if (!currentUser) return
      const mat: Material = {
        ...m,
        id: `mat-${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: currentUser.id,
      }
      setState((s) => ({ ...s, materials: [mat, ...s.materials] }))
    },
    deleteMaterial(id) {
      setState((s) => ({ ...s, materials: s.materials.filter((m) => m.id !== id) }))
    },
    addLesson(l) {
      setState((s) => ({ ...s, customLessons: [...s.customLessons, l] }))
    },

    reset() {
      localStorage.removeItem(KEY)
      setState(load())
    },
  }

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}
