import type { User, Material, StudentState, Message } from '../types'

// Datos semilla para demostrar la plataforma funcionando de punta a punta.
// El admin puede editar/agregar todo desde el panel.

export const seedUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Dirección Académica',
    email: 'admin@academia.com',
    password: 'admin123',
    role: 'admin',
    position: 'Director del Programa',
    avatarColor: '#1e8f6b',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'stu-1',
    name: 'María Fernanda Acosta',
    email: 'mfacosta@empresa.com',
    password: 'demo123',
    role: 'student',
    company: 'Textil del Sur S.A.',
    position: 'CEO',
    avatarColor: '#2ebe8c',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'stu-2',
    name: 'Joaquín Belgrano',
    email: 'jbelgrano@empresa.com',
    password: 'demo123',
    role: 'student',
    company: 'Logística Andes',
    position: 'Fundador & CEO',
    avatarColor: '#60a5fa',
    createdAt: '2026-01-16T10:00:00Z',
  },
  {
    id: 'stu-3',
    name: 'Valentina Ríos',
    email: 'vrios@empresa.com',
    password: 'demo123',
    role: 'student',
    company: 'AgroValor SRL',
    position: 'Directora General',
    avatarColor: '#f472b6',
    createdAt: '2026-01-18T10:00:00Z',
  },
]

export const seedStudentStates: StudentState[] = [
  {
    userId: 'stu-1',
    lessons: {
      'sem-01': { lessonId: 'sem-01', completed: true, quizScore: 100, minutesSpent: 62, lastVisited: '2026-02-01T18:00:00Z' },
      'sem-02': { lessonId: 'sem-02', completed: true, quizScore: 80, minutesSpent: 55, lastVisited: '2026-02-08T18:00:00Z' },
      'sem-03': { lessonId: 'sem-03', completed: true, quizScore: 90, minutesSpent: 70, lastVisited: '2026-02-15T18:00:00Z' },
      'sem-04': { lessonId: 'sem-04', completed: false, minutesSpent: 25, lastVisited: '2026-02-20T18:00:00Z' },
    },
    runs: [
      { simulatorId: 'roic', at: '2026-02-15T19:00:00Z', summary: 'ROIC 9.1% vs WACC 21% → destrucción de valor detectada' },
      { simulatorId: 'estados', at: '2026-02-08T19:00:00Z', summary: 'Identificó activos ocultos por 1.200' },
    ],
    notes: '',
  },
  {
    userId: 'stu-2',
    lessons: {
      'sem-01': { lessonId: 'sem-01', completed: true, quizScore: 70, minutesSpent: 48, lastVisited: '2026-02-02T18:00:00Z' },
      'sem-02': { lessonId: 'sem-02', completed: false, minutesSpent: 18, lastVisited: '2026-02-09T18:00:00Z' },
    },
    runs: [{ simulatorId: 'estados', at: '2026-02-02T19:00:00Z', summary: 'Primer recorrido por el balance' }],
    notes: '',
  },
  {
    userId: 'stu-3',
    lessons: {
      'sem-01': { lessonId: 'sem-01', completed: true, quizScore: 90, minutesSpent: 58, lastVisited: '2026-02-03T18:00:00Z' },
      'sem-02': { lessonId: 'sem-02', completed: true, quizScore: 100, minutesSpent: 64, lastVisited: '2026-02-10T18:00:00Z' },
      'sem-03': { lessonId: 'sem-03', completed: true, quizScore: 100, minutesSpent: 75, lastVisited: '2026-02-17T18:00:00Z' },
      'sem-04': { lessonId: 'sem-04', completed: true, quizScore: 90, minutesSpent: 68, lastVisited: '2026-02-24T18:00:00Z' },
      'sem-05': { lessonId: 'sem-05', completed: true, quizScore: 80, minutesSpent: 60, lastVisited: '2026-03-03T18:00:00Z' },
    },
    runs: [
      { simulatorId: 'wacc', at: '2026-03-03T19:00:00Z', summary: 'WACC LatAm 22.4% con riesgo país 6.5%' },
      { simulatorId: 'fcf', at: '2026-02-24T19:00:00Z', summary: 'FCFF 305 vs Resultado neto 175' },
    ],
    notes: '',
  },
]

export const seedMessages: Message[] = [
  {
    id: 'msg-1',
    fromId: 'admin-1',
    toId: 'stu-1',
    body: 'María Fernanda, excelente avance en las primeras 3 semanas. Vi que en el simulador detectaste que el ROIC está por debajo del WACC. Ese es exactamente el "click" del programa: estar bien contablemente y destruir valor. La semana 4 (EVA) va a cerrar esa idea. Cualquier duda, escribime.',
    createdAt: '2026-02-16T12:00:00Z',
    read: true,
    context: 'Avance Semanas 1-3',
  },
  {
    id: 'msg-2',
    fromId: 'admin-1',
    toId: 'stu-2',
    body: 'Joaquín, vi que quedaste a mitad de la Semana 2. El concepto de contabilidad de presentación vs información de gestión es la base de todo lo que sigue. Te sugiero retomar el simulador de Estados Contables y completar el quiz. Estoy para ayudarte.',
    createdAt: '2026-02-12T15:30:00Z',
    read: false,
    context: 'Seguimiento Semana 2',
  },
]

export const seedMaterials: Material[] = [
  {
    id: 'mat-1',
    title: 'Plantilla Claude: Diagnóstico financiero en 7 prompts',
    kind: 'plantilla-claude',
    description:
      'Secuencia de prompts para que Claude lea un balance + estado de resultados y devuelva el diagnóstico de creación/destrucción de valor.',
    body: 'Actuá como CFO. Te paso el balance y el estado de resultados de mi empresa. Quiero que: (1) reconstruyas el capital invertido; (2) calcules NOPAT, ROIC y lo compares con un WACC que vamos a estimar juntos; (3) detectes si hay destrucción de valor; (4) identifiques los 3 drivers principales. Empezá pidiéndome los datos que te falten.',
    createdAt: '2026-01-20T10:00:00Z',
    createdBy: 'admin-1',
  },
  {
    id: 'mat-2',
    title: 'Caso Andina Manufacturas — dataset completo',
    kind: 'planilla',
    description: 'Estados contables de 2 años del caso central usados en todos los simuladores.',
    createdAt: '2026-01-20T10:00:00Z',
    createdBy: 'admin-1',
  },
]
