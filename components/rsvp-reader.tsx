"use client"

import { useState, useRef, useEffect } from "react"
import { Settings } from "lucide-react"
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
import { ThemeToggle } from "@/components/theme-toggle"

export function RSVPReader() {
  const [wpm, setWpm] = useState(300)
  const [words, setWords] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const msPerWord = 60000 / wpm

  // Sample text for now - user can paste different text
  const sampleText = `The quick brown fox jumps over the lazy dog. This is a demonstration of RSVP speed reading technology. Touch and hold anywhere on the screen to start reading. Release to pause. You can adjust the reading speed in settings. The optimal reading speed varies by person but typically ranges from 250 to 600 words per minute.`

  useEffect(() => {
    // Preprocess text: split into words and clean
    const processedWords = sampleText
      .split(/\s+/)
      .filter(word => word.length > 0)
    setWords(processedWords)
  }, [])

  useEffect(() => {
    if (isReading && currentIndex < words.length) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= words.length - 1) {
            setIsReading(false)
            return 0
          }
          return prev + 1
        })
      }, msPerWord)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isReading, currentIndex, words.length, msPerWord])

  const handlePointerDown = () => {
    setIsReading(true)
  }

  const handlePointerUp = () => {
    setIsReading(false)
  }

  const handlePointerLeave = () => {
    setIsReading(false)
  }

  const currentWord = words[currentIndex] || ""

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 right-0 p-4 flex gap-2 z-10">
        <Dialog>
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
                Adjust your reading speed preferences
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
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
            </div>
          </DialogContent>
        </Dialog>
        <ThemeToggle />
      </div>

      {/* Main reading area */}
      <div
        className="flex-1 flex items-center justify-center cursor-pointer select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="text-center space-y-8">
          <div className="min-h-[120px] flex items-center justify-center">
            <p className="text-6xl font-bold tracking-tight">
              {currentWord}
            </p>
          </div>
          <p className="text-muted-foreground">
            {isReading ? "Release to pause" : "Touch and hold to read"}
          </p>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {words.length}
          </div>
        </div>
      </div>
    </div>
  )
}
