# Touch to Read - TODO List

## High Priority

### Text Input Methods
- [ ] **Paste text area** - Simple textarea for pasting content
- [ ] **File upload** - Support .txt, .md files
- [ ] **URL extraction** - Fetch and extract text from web pages
- [ ] **Sample texts** - Preloaded interesting articles for testing

### Reading Experience
- [ ] **Better text preprocessing**
  - [ ] Handle punctuation with longer pauses (periods, commas)
  - [ ] Skip/reduce display time for very short words (a, I, the)
  - [ ] Longer pause at paragraph breaks
- [ ] **ORP (Optimal Recognition Point)** - Highlight the optimal letter for eye focus
- [ ] **Restart/Reset button** - Easily restart from beginning
- [ ] **Jump to position** - Slider to skip to any point in text

### Settings & Customization
- [ ] **Font customization**
  - [ ] Size adjustment
  - [ ] Font family selection (serif, sans-serif, mono)
  - [ ] Weight options
- [ ] **Color schemes** - Beyond light/dark (sepia, high contrast, etc.)
- [ ] **Pause duration settings** - Custom pause times for punctuation
- [ ] **Word length multipliers** - Longer words stay on screen longer

### Persistence & History
- [ ] **Save reading position** - Resume where you left off
- [ ] **Reading history** - Track what you've read
- [ ] **Statistics**
  - [ ] Total words read
  - [ ] Reading time
  - [ ] Average WPM
  - [ ] Progress charts

## Medium Priority

### User Experience
- [ ] **Keyboard shortcuts**
  - [ ] Space - Start/stop reading
  - [ ] Left/Right arrows - Navigate words
  - [ ] R - Restart
  - [ ] S - Settings
- [ ] **Touch gestures**
  - [ ] Swipe left/right to navigate
  - [ ] Double tap to restart
- [ ] **Mobile optimization** - Better touch targets and layout
- [ ] **Progressive word reveal** - Smooth fade in/out animations

### Advanced Features
- [ ] **Reading modes**
  - [ ] Standard RSVP
  - [ ] Chunk mode (2-3 words at a time)
  - [ ] Sentence mode
- [ ] **Language support** - Handle different languages properly
- [ ] **Export reading data** - Download statistics as CSV/JSON
- [ ] **Collections** - Organize saved texts into folders

### Content Features
- [ ] **Article parser** - Better extraction from web pages
- [ ] **PDF support** - Upload and read PDFs
- [ ] **EPUB support** - Read ebook files
- [ ] **Readability API integration** - Clean article extraction
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
- [x] Basic RSVP reader
- [x] Touch-to-read functionality
- [x] Theme toggle (dark/light)
- [x] WPM adjustment
- [x] Word counter/progress
