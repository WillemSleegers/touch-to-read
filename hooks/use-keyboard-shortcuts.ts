import { useEffect } from 'react'

export interface KeyboardShortcuts {
  onSpaceDown?: () => void
  onSpaceUp?: () => void
  onLeft?: () => void
  onRight?: () => void
  onRestart?: () => void
  onSettings?: () => void
  onKeyboard?: () => void
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

      // Prevent key repeat for space bar
      if (e.key === ' ' && e.repeat) {
        e.preventDefault()
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          shortcuts.onSpaceDown?.()
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
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (e.key === ' ') {
        e.preventDefault()
        shortcuts.onSpaceUp?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [shortcuts])
}
