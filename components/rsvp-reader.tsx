"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Settings, RotateCcw, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { TextInputDialog } from "@/components/text-input-dialog"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { loadSettings, saveSettings, loadCurrentText, saveCurrentText } from "@/lib/storage"

interface ProcessedWord {
  text: string
  delay: number // milliseconds
}

export function RSVPReader() {
  const [wpm, setWpm] = useState(300)
  const [fontSize, setFontSize] = useState(60)
  const [showORP, setShowORP] = useState(true)
  const [usePunctuation, setUsePunctuation] = useState(true)
  const [words, setWords] = useState<ProcessedWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [hasText, setHasText] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const baseDelay = 60000 / wpm

  // Process text with intelligent delays based on punctuation and word length
  const processText = useCallback((text: string) => {
    const rawWords = text
      .split(/\s+/)
      .filter(word => word.length > 0)

    const processed: ProcessedWord[] = rawWords.map((word) => {
      let delay = baseDelay

      if (usePunctuation) {
        // Add delay for punctuation
        if (word.match(/[.!?]$/)) {
          delay *= 2.5 // Longer pause for sentence endings
        } else if (word.match(/[,;:]$/)) {
          delay *= 1.5 // Medium pause for commas and semicolons
        }

        // Adjust for word length (longer words need more time)
        if (word.length > 8) {
          delay *= 1.3
        } else if (word.length > 12) {
          delay *= 1.5
        }

        // Short words can be faster
        if (word.length <= 3) {
          delay *= 0.8
        }
      }

      return {
        text: word,
        delay: Math.round(delay)
      }
    })

    return processed
  }, [baseDelay, usePunctuation])

  const handleTextSubmit = useCallback((text: string) => {
    const processed = processText(text)
    setWords(processed)
    setCurrentIndex(0)
    setIsReading(false)
    setHasText(true)
  }, [processText])

  // Load saved settings and text on mount
  useEffect(() => {
    const settings = loadSettings()
    if (settings) {
      setWpm(settings.wpm)
      setFontSize(settings.fontSize)
      setShowORP(settings.showORP)
      setUsePunctuation(settings.usePunctuation)
    }

    const savedText = loadCurrentText()
    if (savedText) {
      handleTextSubmit(savedText.content)
      // Note: Progress will be restored after words are processed
      setTimeout(() => {
        setCurrentIndex(Math.round((savedText.progress / 100) * savedText.content.split(/\s+/).length))
      }, 0)
    } else {
      const defaultText = `Welcome to Touch to Read! This is an RSVP speed reading app. Touch and hold anywhere on the screen to start reading. Release to pause. The longer you hold, the more you read. It's that simple. Try adjusting the speed in settings to find your perfect pace. Happy reading!`
      handleTextSubmit(defaultText)
    }
  }, [handleTextSubmit])

  // Save settings when they change
  useEffect(() => {
    saveSettings({ wpm, fontSize, showORP, usePunctuation })
  }, [wpm, fontSize, showORP, usePunctuation])

  // Save reading progress periodically
  useEffect(() => {
    if (hasText && words.length > 0) {
      const progress = (currentIndex / words.length) * 100
      const text = words.map(w => w.text).join(' ')
      saveCurrentText({
        id: 'current',
        content: text,
        createdAt: Date.now(),
        lastReadAt: Date.now(),
        progress
      })
    }
  }, [currentIndex, words, hasText])

  // Reading loop with dynamic delays
  useEffect(() => {
    if (isReading && currentIndex < words.length) {
      const currentWord = words[currentIndex]
      intervalRef.current = setTimeout(() => {
        setCurrentIndex(prev => {
          if (prev >= words.length - 1) {
            setIsReading(false)
            return prev
          }
          return prev + 1
        })
      }, currentWord.delay)
    } else {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
    }
  }, [isReading, currentIndex, words])

  // Update words when settings change
  useEffect(() => {
    if (words.length > 0) {
      const rawText = words.map(w => w.text).join(' ')
      const processed = processText(rawText)
      setWords(processed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDelay, usePunctuation])

  const handlePointerDown = () => {
    if (hasText && currentIndex < words.length) {
      setIsReading(true)
    }
  }

  const handlePointerUp = () => {
    setIsReading(false)
  }

  const handlePointerLeave = () => {
    setIsReading(false)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsReading(false)
  }

  const toggleReading = () => {
    if (hasText && currentIndex < words.length) {
      setIsReading(prev => !prev)
    }
  }

  const skipBackward = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const skipForward = () => {
    setCurrentIndex(prev => Math.min(words.length - 1, prev + 1))
  }

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSpace: toggleReading,
    onLeft: skipBackward,
    onRight: skipForward,
    onRestart: handleRestart,
    onSettings: () => setSettingsOpen(true),
    onEscape: () => setIsReading(false),
  })

  const currentWord = words[currentIndex]?.text || ""

  // Calculate ORP (Optimal Recognition Point) - usually slightly left of center
  const getORPIndex = (word: string) => {
    if (word.length <= 1) return 0
    if (word.length <= 5) return 1
    if (word.length <= 9) return 2
    return 3
  }

  const renderWordWithORP = () => {
    if (!showORP || !currentWord) return currentWord

    const orpIndex = getORPIndex(currentWord)
    return (
      <>
        <span className="text-muted-foreground">{currentWord.slice(0, orpIndex)}</span>
        <span className="text-primary">{currentWord[orpIndex]}</span>
        <span>{currentWord.slice(orpIndex + 1)}</span>
      </>
    )
  }

  const progress = words.length > 0 ? ((currentIndex / words.length) * 100).toFixed(0) : 0
  const isFinished = currentIndex >= words.length - 1 && words.length > 0

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 right-0 p-4 flex gap-2 z-10">
        <Dialog open={showKeyboardHelp} onOpenChange={setShowKeyboardHelp}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Keyboard className="h-5 w-5" />
              <span className="sr-only">Keyboard shortcuts</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
              <DialogDescription>
                Control your reading experience with your keyboard
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Play / Pause</span>
                <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">Space</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Previous word</span>
                <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">←</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Next word</span>
                <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">→</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Restart from beginning</span>
                <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">R</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Open settings</span>
                <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">S</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Stop reading</span>
                <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">Esc</kbd>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Customize your reading experience
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="wpm">
                  Reading Speed: {wpm} WPM
                </Label>
                <Slider
                  id="wpm"
                  min={100}
                  max={1000}
                  step={50}
                  value={[wpm]}
                  onValueChange={(value) => setWpm(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Typical range: 250-600 WPM
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">
                  Font Size: {fontSize}px
                </Label>
                <Slider
                  id="font-size"
                  min={24}
                  max={120}
                  step={4}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="orp" className="cursor-pointer">
                  Highlight ORP (Optimal Recognition Point)
                </Label>
                <Switch
                  id="orp"
                  checked={showORP}
                  onCheckedChange={setShowORP}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="punctuation" className="cursor-pointer">
                  Smart Punctuation Pauses
                </Label>
                <Switch
                  id="punctuation"
                  checked={usePunctuation}
                  onCheckedChange={setUsePunctuation}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <ThemeToggle />
      </div>

      {/* Main reading area */}
      <div className="flex-1 flex items-center justify-center">
        {!hasText ? (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Touch to Read</h1>
            <p className="text-muted-foreground max-w-md">
              Load text to start speed reading with RSVP technology
            </p>
            <TextInputDialog onTextSubmit={handleTextSubmit} />
          </div>
        ) : (
          <div className="w-full">
            <div
              className="flex-1 flex items-center justify-center cursor-pointer select-none min-h-[400px]"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="text-center space-y-8 w-full px-4">
                <div className="min-h-[120px] flex items-center justify-center">
                  <p
                    className="font-bold tracking-tight transition-all duration-150 animate-in fade-in zoom-in-50"
                    style={{ fontSize: `${fontSize}px` }}
                    key={currentIndex}
                  >
                    {renderWordWithORP()}
                  </p>
                </div>

                {isFinished ? (
                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground">
                      Finished! 🎉
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleRestart} variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                      <TextInputDialog onTextSubmit={handleTextSubmit} />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      {isReading ? "Release to pause" : "Touch and hold to read"}
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        {currentIndex + 1} / {words.length} ({progress}%)
                      </div>
                      <div className="max-w-md mx-auto h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-200"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-center pt-4">
                      <Button onClick={handleRestart} variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                      <TextInputDialog onTextSubmit={handleTextSubmit} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
