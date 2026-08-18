import { createContext, useContext } from 'react'
import type {
  User,
  Material,
  StudentState,
  Message,
  Lesson,
  LessonProgress,
  QuizAttempt,
  CaseSubmission,
  SubmissionFile,
} from '../types'

// API común que exponen tanto el store local (localStorage) como el remoto
// (Supabase). Los componentes consumen esta interfaz sin saber qué backend hay.
export interface StoreApi {
  // estado de carga / backend
  initializing: boolean
  backend: 'local' | 'supabase'

  // sesión
  currentUser: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void> | void
  register: (
    data: Omit<User, 'id' | 'role' | 'avatarColor' | 'createdAt'>,
  ) => Promise<{ ok: boolean; needsConfirmation?: boolean; error?: string }>
  requestPasswordReset: (email: string) => Promise<{ ok: boolean; error?: string }>
  updatePassword: (newPassword: string) => Promise<{ ok: boolean; error?: string }>

  // datos
  users: User[]
  students: User[]
  curriculum: Lesson[]
  materials: Material[]
  messages: Message[]
  studentStates: StudentState[]

  // progreso
  getStudentState: (userId: string) => StudentState
  markLessonProgress: (lessonId: string, patch: Partial<LessonProgress>) => void
  recordSimulatorRun: (simulatorId: string, summary: string) => void

  // mensajería
  sendMessage: (toId: string, body: string, context?: string) => void
  markMessageRead: (messageId: string) => void
  conversationWith: (userId: string) => Message[]

  // admin
  addMaterial: (m: Omit<Material, 'id' | 'createdAt' | 'createdBy'>) => void
  deleteMaterial: (id: string) => void
  addLesson: (l: Lesson) => void

  // Maestría: cuestionarios y entregas
  quizAttempts: QuizAttempt[] // propios (alumno) o de todos (admin)
  caseSubmissions: CaseSubmission[]
  saveQuizAttempt: (cod: string, score: number, total: number, answers: number[]) => Promise<void>
  submitCase: (
    cod: string,
    files: File[],
    note: string,
  ) => Promise<{ ok: boolean; error?: string }>
  downloadSubmissionFile: (f: SubmissionFile) => Promise<string | null> // URL firmada o null

  reset: () => void
}

export const StoreContext = createContext<StoreApi | null>(null)

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore debe usarse dentro de <StoreProvider>')
  return ctx
}
