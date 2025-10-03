# Touch to Read - TODO List

## High Priority

### Text Input Methods
- [x] **Paste text area** - Simple textarea for pasting content
- [x] **File upload** - Support .txt, .md files
- [x] **URL extraction** - Fetch and extract text from web pages
- [x] **Sample texts** - Preloaded interesting articles for testing

### Reading Experience
- [x] **Better text preprocessing**
  - [x] Handle punctuation with longer pauses (periods, commas)
  - [x] Skip/reduce display time for very short words (a, I, the)
  - [x] Longer pause at paragraph breaks
- [x] **ORP (Optimal Recognition Point)** - Highlight the optimal letter for eye focus
- [x] **Restart/Reset button** - Easily restart from beginning
- [ ] **Jump to position** - Slider to skip to any point in text

### Settings & Customization
- [x] **Font customization**
  - [x] Size adjustment
  - [ ] Font family selection (serif, sans-serif, mono)
  - [ ] Weight options
- [ ] **Color schemes** - Beyond light/dark (sepia, high contrast, etc.)
- [x] **Pause duration settings** - Custom pause times for punctuation (via smart punctuation toggle)
- [x] **Word length multipliers** - Longer words stay on screen longer (automatic)

### Persistence & History
- [x] **Save reading position** - Resume where you left off
- [ ] **Reading history** - Track what you've read
- [ ] **Statistics**
  - [ ] Total words read
  - [ ] Reading time
  - [ ] Average WPM
  - [ ] Progress charts

## Medium Priority

### User Experience
- [x] **Keyboard shortcuts**
  - [x] Space - Start/stop reading
  - [x] Left/Right arrows - Navigate words
  - [x] R - Restart
  - [x] S - Settings
  - [x] Esc - Stop reading
- [ ] **Touch gestures**
  - [ ] Swipe left/right to navigate
  - [ ] Double tap to restart
- [ ] **Mobile optimization** - Better touch targets and layout
- [x] **Progressive word reveal** - Smooth fade in/out animations

### Advanced Features
- [ ] **Reading modes**
  - [ ] Standard RSVP
  - [ ] Chunk mode (2-3 words at a time)
  - [ ] Sentence mode
- [ ] **Language support** - Handle different languages properly
- [ ] **Export reading data** - Download statistics as CSV/JSON
- [ ] **Collections** - Organize saved texts into folders

### Content Features
- [x] **Article parser** - Better extraction from web pages (using Mozilla Readability)
- [ ] **PDF support** - Upload and read PDFs
- [ ] **EPUB support** - Read ebook files
- [ ] **Bookmarklet** - Read any webpage with one click

## Low Priority

### Social & Sharing
- [ ] **Share texts** - Generate shareable links
- [ ] **User accounts** - Cloud sync for settings and history
- [ ] **Reading challenges** - Daily reading goals

### Polish
- [ ] **Onboarding tutorial** - First-time user guide
- [ ] **Help documentation** - In-app help system
- [ ] **Accessibility** - Screen reader support, ARIA labels
- [ ] **PWA support** - Install as app on mobile/desktop
- [ ] **Offline mode** - Service worker for offline reading

## Technical Improvements

### Code Quality
- [ ] **Unit tests** - Test core reading logic
- [ ] **E2E tests** - Test user flows
- [ ] **TypeScript strict mode** - Enable strict type checking
- [ ] **Performance optimization** - Reduce re-renders, optimize animations

### Infrastructure
- [ ] **Error boundaries** - Graceful error handling
- [ ] **Analytics** - Track usage patterns (privacy-friendly)
- [ ] **Sentry integration** - Error tracking
- [ ] **CI/CD pipeline** - Automated testing and deployment

## Completed ✓
- [x] Basic RSVP reader with touch-to-read functionality
- [x] Theme toggle (dark/light with system preference)
- [x] WPM adjustment (100-1000 WPM)
- [x] Word counter and progress bar
- [x] Text input methods (paste, file upload, URL extraction, samples)
- [x] Smart text preprocessing with punctuation pauses
- [x] ORP highlighting
- [x] Font size customization
- [x] Keyboard shortcuts (Space, arrows, R, S, Esc)
- [x] LocalStorage persistence
- [x] Reading progress auto-save
- [x] Settings persistence
- [x] Smooth word animations
- [x] Comprehensive documentation
