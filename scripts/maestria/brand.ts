/* eslint-disable */
// ============================================================================
// JPR Consulting · Manual de Identidad Visual v2.0 — tokens de marca y fuentes
// Base carbón · lectura marfil · verde institucional como único acento.
// Spectral (titulares) · IBM Plex Sans (texto) · IBM Plex Mono (datos).
// ============================================================================
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const F = join(__dirname, '..', 'assets', 'fonts')

// Paleta (hex sin '#', como usa pdfmake / exceljs con prefijo)
export const C = {
  bg: '0A0C0F',
  bg2: '0E1116',
  surf: '13161B',
  ivory: 'F4F1EA',
  paper: 'FBFAF7',
  white: 'FFFFFF',
  lineL: 'E2DED4',
  greenD: '0E4E3B',
  green: '12614A',
  greenB: '1E8F6B',
  greenL: '2EBE8C',
  greenS: '8FD3B7',
  ink: '1A1D22',
  ink2: '33373D',
  ash: '5F646C',
  ash2: '8A8F97',
  red: 'E24C3F',
  redD: 'C0392B',
  amber: 'B9822E',
  amberBg: 'FBF3E4',
  greenBg: 'EFF7F2',
} as const

// Con '#'
export const H = (k: keyof typeof C) => '#' + C[k]

// Fuentes para pdfmake (PdfPrinter espera rutas a los TTF)
export const fonts = {
  Spectral: {
    normal: join(F, 'Spectral-Regular.ttf'),
    bold: join(F, 'Spectral-Bold.ttf'),
    italics: join(F, 'Spectral-Italic.ttf'),
    bolditalics: join(F, 'Spectral-BoldItalic.ttf'),
  },
  SpectralSemi: {
    normal: join(F, 'Spectral-SemiBold.ttf'),
    bold: join(F, 'Spectral-Bold.ttf'),
    italics: join(F, 'Spectral-Italic.ttf'),
    bolditalics: join(F, 'Spectral-BoldItalic.ttf'),
  },
  Plex: {
    normal: join(F, 'IBMPlexSans-Regular.ttf'),
    bold: join(F, 'IBMPlexSans-Bold.ttf'),
    italics: join(F, 'IBMPlexSans-Italic.ttf'),
    bolditalics: join(F, 'IBMPlexSans-Bold.ttf'),
  },
  PlexMed: {
    normal: join(F, 'IBMPlexSans-Medium.ttf'),
    bold: join(F, 'IBMPlexSans-SemiBold.ttf'),
    italics: join(F, 'IBMPlexSans-Italic.ttf'),
    bolditalics: join(F, 'IBMPlexSans-SemiBold.ttf'),
  },
  PlexSemi: {
    normal: join(F, 'IBMPlexSans-SemiBold.ttf'),
    bold: join(F, 'IBMPlexSans-Bold.ttf'),
    italics: join(F, 'IBMPlexSans-Italic.ttf'),
    bolditalics: join(F, 'IBMPlexSans-Bold.ttf'),
  },
  Mono: {
    normal: join(F, 'IBMPlexMono-Regular.ttf'),
    bold: join(F, 'IBMPlexMono-SemiBold.ttf'),
    italics: join(F, 'IBMPlexMono-Regular.ttf'),
    bolditalics: join(F, 'IBMPlexMono-SemiBold.ttf'),
  },
} as const

export const BRAND = {
  firm: 'JPR CONSULTING',
  program: 'Maestría en Finanzas Corporativas Aplicadas con IA · UNNE',
  faculty: 'Facultad de Ciencias Económicas · Universidad Nacional del Nordeste',
  author: 'JPR Consulting · Cr. Juan Pablo Rossi',
}
