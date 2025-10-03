# Quick Reference Card

## ⚡️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause reading |
| `←` | Previous word |
| `→` | Next word |
| `R` | Restart from beginning |
| `S` | Open settings |
| `K` | Show keyboard shortcuts |
| `Esc` | Stop reading |

## 🎯 Settings Reference

### Reading Speed (WPM)
- **100-250**: Slow, very comfortable
- **250-350**: Average reading speed
- **350-500**: Fast reading
- **500-700**: Very fast, requires practice
- **700-1000**: Expert speed readers

### Font Size
- **24-40px**: Small, for longer texts
- **40-60px**: Medium, comfortable
- **60-80px**: Large, default-ish
- **80-120px**: Very large, for visibility

### Smart Features
- **ORP Highlighting**: Shows optimal focus point in each word
- **Punctuation Pauses**:
  - `.!?` = 2.5× delay (longer pause)
  - `,;:` = 1.5× delay (medium pause)

## 📝 Text Input Methods

1. **Paste** - Copy/paste any text
2. **File** - Upload .txt or .md files
3. **URL** - Extract text from web articles
4. **Sample** - Pre-loaded example texts

## 💾 Auto-Save Features

Everything saves automatically:
- ✅ Reading speed (WPM)
- ✅ Font size
- ✅ ORP on/off
- ✅ Punctuation pauses on/off
- ✅ Current text
- ✅ Reading position

Just reload - you'll continue where you left off!

## 🎨 Customization Quick Tips

### Change Default WPM
```typescript
// components/rsvp-reader.tsx:28
const [wpm, setWpm] = useState(300) // ← Change this
```

### Change Default Font Size
```typescript
// components/rsvp-reader.tsx:29
const [fontSize, setFontSize] = useState(60) // ← Change this
```

### Add Sample Text
```typescript
// components/text-input-dialog.tsx:SAMPLE_TEXTS
{
  title: "Your Title",
  text: `Your text here...`
}
```

### Adjust Punctuation Multipliers
```typescript
// components/rsvp-reader.tsx:processText
if (word.match(/[.!?]$/)) {
  delay *= 2.5 // ← Adjust this (higher = longer pause)
}
```

## 🚀 Deployment Commands

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

### Preview Build Locally
```bash
npm run build
cd .next
npx serve
```

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Clean install
rm -rf .next node_modules
npm install
```

## 📦 File Locations

### Components
- Main reader: `components/rsvp-reader.tsx`
- Text input: `components/text-input-dialog.tsx`
- Theme: `components/theme-toggle.tsx`
- UI components: `components/ui/*`

### Logic
- Keyboard: `hooks/use-keyboard-shortcuts.ts`
- Storage: `lib/storage.ts`
- Utils: `lib/utils.ts`

### API
- URL extraction: `app/api/extract/route.ts`

### Styles
- Global: `app/globals.css`
- Config: `tailwind.config.js`

### Docs
- Features: `README.md`
- Roadmap: `TODO.md`
- Architecture: `ARCHITECTURE.md`
- Contributing: `CONTRIBUTING.md`

## 🐛 Common Issues

### Port in use
```bash
lsof -ti:3000 | xargs kill
npm run dev
```

### Build fails
```bash
rm -rf .next
npm run build
```

### TypeScript errors
```bash
npx tsc --noEmit
```

### Dependencies issue
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 Performance Tips

### For long texts (10K+ words)
- Disable punctuation pauses
- Increase WPM slightly
- Use smaller font size

### For better comprehension
- Enable punctuation pauses
- Use ORP highlighting
- Start at 250 WPM, increase gradually

### For speed training
1. Start at comfortable speed
2. Increase by 50 WPM every session
3. If comprehension drops, go back down
4. Practice 15 min daily

## 🎯 Usage Patterns

### Quick article reading
1. Copy URL
2. Click "Load Text"
3. URL tab → Paste → Extract
4. Adjust WPM to 400-500
5. Hold to read

### Book/long content
1. Copy text or upload file
2. Set WPM to 300-350
3. Enable punctuation pauses
4. Take breaks every 15 minutes

### Speed training
1. Use sample texts
2. Start at 250 WPM
3. Increase by 50 each try
4. Focus on comprehension

## 🌐 URL Extraction Tips

### Works well with:
- Blog posts (Medium, Substack, etc.)
- News articles
- Documentation pages
- Wikipedia

### Doesn't work with:
- Paywalled content
- Login-required pages
- Heavy JavaScript sites
- PDFs (yet - see roadmap)

### Pro tip:
If extraction fails, copy the article text manually and paste it!

## 💡 Best Practices

### Do's ✅
- Take breaks every 15-20 minutes
- Start slow, increase gradually
- Use punctuation pauses for complex text
- Experiment with settings
- Practice regularly

### Don'ts ❌
- Don't jump to 1000 WPM immediately
- Don't sacrifice comprehension for speed
- Don't read while tired
- Don't forget to blink!

---

**Quick Links**
- [Full README](README.md)
- [Development Summary](DEVELOPMENT_SUMMARY.md)
- [Architecture](ARCHITECTURE.md)
- [Roadmap](TODO.md)
