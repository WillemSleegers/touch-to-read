# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Header     │  │    Main      │  │   Footer     │      │
│  │              │  │   Reading    │  │   (Hints)    │      │
│  │ - Theme      │  │    Area      │  │              │      │
│  │ - Settings   │  │              │  └──────────────┘      │
│  │ - Keyboard   │  │ ┌──────────┐ │                        │
│  │   Help       │  │ │   Word   │ │                        │
│  └──────────────┘  │ │ Display  │ │                        │
│                     │ └──────────┘ │                        │
│                     │              │                        │
│                     │ - Progress   │                        │
│                     │ - Controls   │                        │
│                     └──────────────┘                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app/
├── layout.tsx (Root)
│   └── ThemeProvider
│       └── page.tsx
│           └── RSVPReader
│               ├── ThemeToggle
│               ├── KeyboardHelpDialog
│               ├── SettingsDialog
│               │   ├── WPM Slider
│               │   ├── FontSize Slider
│               │   ├── ORP Switch
│               │   └── Punctuation Switch
│               ├── TextInputDialog
│               │   ├── PasteTab
│               │   ├── FileTab
│               │   ├── URLTab
│               │   └── SampleTab
│               └── ReadingArea
│                   ├── WordDisplay (with ORP)
│                   ├── ProgressBar
│                   └── Controls
```

## Data Flow

```
┌─────────────┐
│   User      │
│   Input     │
└─────┬───────┘
      │
      ▼
┌─────────────────────────────────────┐
│       Text Input Sources            │
│  - Paste                            │
│  - File Upload                      │
│  - URL Extraction (API)             │
│  - Sample Selection                 │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│      Text Processing                │
│  - Split into words                 │
│  - Calculate delays                 │
│    • Base delay (from WPM)          │
│    • Punctuation multipliers        │
│    • Word length adjustments        │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│      Word Queue                     │
│  [ProcessedWord, ProcessedWord...]  │
│  { text: string, delay: number }    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│      Reading Loop                   │
│  - Monitor isReading state          │
│  - setTimeout with word.delay       │
│  - Increment currentIndex           │
│  - Display word with ORP            │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│      LocalStorage                   │
│  - Save settings                    │
│  - Save progress                    │
│  - Save current text                │
└─────────────────────────────────────┘
```

## State Management

### Component State (useState)
```typescript
// Core reading state
const [words, setWords] = useState<ProcessedWord[]>([])
const [currentIndex, setCurrentIndex] = useState(0)
const [isReading, setIsReading] = useState(false)

// Settings state
const [wpm, setWpm] = useState(300)
const [fontSize, setFontSize] = useState(60)
const [showORP, setShowORP] = useState(true)
const [usePunctuation, setUsePunctuation] = useState(true)

// UI state
const [hasText, setHasText] = useState(false)
const [settingsOpen, setSettingsOpen] = useState(false)
const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
```

### Effect Dependencies
```typescript
// Load saved data on mount
useEffect(() => {
  loadSettings()
  loadCurrentText()
}, [])

// Save settings on change
useEffect(() => {
  saveSettings({ wpm, fontSize, showORP, usePunctuation })
}, [wpm, fontSize, showORP, usePunctuation])

// Save progress periodically
useEffect(() => {
  saveCurrentText({ content, progress, ... })
}, [currentIndex, words, hasText])

// Reading loop
useEffect(() => {
  if (isReading) {
    setTimeout(() => incrementIndex(), words[currentIndex].delay)
  }
}, [isReading, currentIndex, words])

// Update word delays when settings change
useEffect(() => {
  const processed = processText(rawText)
  setWords(processed)
}, [baseDelay, usePunctuation])
```

## API Routes

### POST /api/extract
```typescript
Request:
{
  url: string
}

Response (Success):
{
  title: string
  content: string
  excerpt: string
  siteName: string
}

Response (Error):
{
  error: string
}
```

## LocalStorage Schema

### Settings
```typescript
interface ReadingSettings {
  wpm: number           // 100-1000
  fontSize: number      // 24-120
  showORP: boolean
  usePunctuation: boolean
}

Key: 'touch-to-read-settings'
```

### Current Text
```typescript
interface SavedText {
  id: string
  content: string
  title?: string
  createdAt: number
  lastReadAt?: number
  progress: number  // 0-100
}

Key: 'touch-to-read-current'
```

### Statistics (Future)
```typescript
interface ReadingStats {
  totalWordsRead: number
  totalReadingTime: number  // ms
  sessionsCount: number
  averageWPM: number
}

Key: 'touch-to-read-stats'
```

## Text Processing Pipeline

```
Raw Text
   ↓
Split by whitespace
   ↓
Filter empty strings
   ↓
For each word:
   ├── Calculate base delay (60000 / WPM)
   ├── Check punctuation
   │   ├── Period/!/?  → delay × 2.5
   │   └── Comma/;/:   → delay × 1.5
   ├── Check word length
   │   ├── > 12 chars  → delay × 1.5
   │   ├── > 8 chars   → delay × 1.3
   │   └── ≤ 3 chars   → delay × 0.8
   └── Round to integer
   ↓
ProcessedWord[]
```

## Keyboard Event Flow

```
User presses key
   ↓
useKeyboardShortcuts hook
   ↓
Check if in input element → Skip
   ↓
Switch on key
   ├── Space    → toggleReading()
   ├── ←        → skipBackward()
   ├── →        → skipForward()
   ├── R        → handleRestart()
   ├── S        → setSettingsOpen(true)
   ├── K        → setShowKeyboardHelp(true)
   └── Esc      → setIsReading(false)
```

## URL Extraction Flow

```
User enters URL
   ↓
Click "Extract"
   ↓
POST /api/extract
   ↓
Server fetches URL
   ↓
Parse with JSDOM
   ↓
Extract with Readability
   ↓
Return clean text
   ↓
Display in preview
   ↓
User clicks "Start Reading"
   ↓
Process text → Begin reading
```

## Performance Considerations

### Optimizations Implemented
1. **Memoized callbacks**: `useCallback` for text processing
2. **Cleanup intervals**: Proper timeout cleanup in useEffect
3. **Conditional rendering**: Only render active UI elements
4. **Static generation**: Next.js static optimization
5. **Code splitting**: Dynamic imports for dialogs

### Potential Bottlenecks
1. **Large texts**: 50K+ words may cause lag
2. **Frequent re-renders**: Word changes trigger re-render
3. **LocalStorage writes**: Throttle progress saves if needed

### Future Optimizations
- Virtual scrolling for word navigation
- Web Workers for text processing
- IndexedDB for large text storage
- Service Worker for offline support

## Security Considerations

### Implemented
1. **URL validation**: Check URL format before fetching
2. **Error handling**: Graceful failures for all operations
3. **CORS**: Server-side fetching avoids client CORS issues
4. **Input sanitization**: No innerHTML, only textContent

### Future Security
- Rate limiting on API routes
- Content Security Policy headers
- Input length limits
- URL allowlist/blocklist

## Deployment Architecture

```
┌─────────────────┐
│   Vercel Edge   │
│   (Next.js)     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│   Static Pages              │
│   - / (pre-rendered)        │
│   - /_not-found             │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   API Routes (Serverless)   │
│   - /api/extract            │
│     (Mozilla Readability)   │
└─────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Client-side Storage       │
│   - localStorage            │
│   - sessionStorage          │
└─────────────────────────────┘
```

## Technology Stack

### Core
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript 5**: Type safety

### UI/Styling
- **Tailwind CSS v4**: Utility-first CSS
- **shadcn/ui**: Component library
- **Radix UI**: Headless components
- **next-themes**: Theme management
- **Lucide React**: Icons

### Text Processing
- **Mozilla Readability**: Article extraction
- **jsdom**: DOM manipulation (server-side)

### Development
- **ESLint**: Linting
- **PostCSS**: CSS processing

---

This architecture provides:
- ✅ Modularity and maintainability
- ✅ Performance and scalability
- ✅ User privacy (local-first)
- ✅ Accessibility
- ✅ Type safety
