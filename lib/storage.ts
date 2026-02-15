// Local storage utilities for persisting app state

export interface ReadingSettings {
  wpm: number
  fontSize: number
  showORP: boolean
  usePunctuation: boolean
  useAnimation: boolean
  showProgress: boolean
}

const SETTINGS_KEY = 'touch-to-read-settings'

export function loadSettings(): ReadingSettings | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(SETTINGS_KEY)
  return stored ? JSON.parse(stored) : null
}

export function saveSettings(settings: ReadingSettings): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
