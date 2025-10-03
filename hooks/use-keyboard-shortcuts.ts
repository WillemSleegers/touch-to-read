import { useEffect } from 'react'

export interface KeyboardShortcuts {
  onSpace?: () => void
  onLeft?: () => void
  onRight?: () => void
  onRestart?: () => void
  onSettings?: () => void
  onKeyboard?: () => void
  onEscape?: () => void
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          shortcuts.onSpace?.()
          break
        case 'ArrowLeft':
          e.preventDefault()
          shortcuts.onLeft?.()
          break
        case 'ArrowRight':
          e.preventDefault()
          shortcuts.onRight?.()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          shortcuts.onRestart?.()
          break
        case 's':
        case 'S':
          e.preventDefault()
          shortcuts.onSettings?.()
          break
        case 'k':
        case 'K':
          e.preventDefault()
          shortcuts.onKeyboard?.()
          break
        case 'Escape':
          e.preventDefault()
          shortcuts.onEscape?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}
