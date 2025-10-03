# Touch to Read

A modern RSVP (Rapid Serial Visual Presentation) speed reading app built with Next.js 15, featuring an innovative touch-to-read interface.

## 🚀 Features

### Core Reading Experience
- **Touch-to-Read**: Hold anywhere on the screen to read, release to pause
- **RSVP Technology**: Words appear one at a time at a fixed position for faster reading
- **Smart Pacing**: Automatic delays for punctuation and word length
- **ORP Highlighting**: Optimal Recognition Point highlighting for improved focus
- **Progress Tracking**: Visual progress bar and word counter

### Customization
- **Adjustable Speed**: 100-1000 WPM (words per minute)
- **Font Size Control**: 24-120px customizable font size
- **Smart Punctuation Pauses**: Longer pauses at sentence endings, commas, etc.
- **Dark/Light Theme**: System-aware theme switching

### Text Input Options
- **Paste Text**: Simple textarea for copying and pasting
- **File Upload**: Upload .txt and .md files
- **URL Extraction**: Automatically extract readable text from web articles
- **Sample Texts**: Pre-loaded articles for instant reading

### Keyboard Shortcuts
- `Space` - Play/Pause reading
- `←` - Previous word
- `→` - Next word
- `R` - Restart from beginning
- `S` - Open settings
- `K` - Keyboard shortcuts help
- `Esc` - Stop reading

### Persistence
- **Auto-save Settings**: Your preferences are remembered
- **Reading Progress**: Resume where you left off
- **Local Storage**: All data stays on your device

## 🎯 What is RSVP?

RSVP (Rapid Serial Visual Presentation) is a speed reading technique that displays text one word at a time at a fixed position. This eliminates:
- Eye movement (saccades) across the page
- Regression (re-reading)
- Subvocalization (inner voice)

By removing these barriers, most people can read 2-3x faster while maintaining comprehension.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v4
- **Theme**: next-themes
- **Language**: TypeScript
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/touch-to-read.git
cd touch-to-read

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Usage Tips

### Finding Your Optimal Speed
1. Start at 300 WPM (the default)
2. If you're comfortable, increase by 50 WPM increments
3. If you lose comprehension, decrease speed
4. Most people find their sweet spot between 250-500 WPM

### Maximizing Comprehension
- Enable **Smart Punctuation Pauses** for natural reading rhythm
- Use **ORP Highlighting** to help your eyes focus
- Take breaks every 15-20 minutes
- Start with familiar content to build speed

### Touch-to-Read Benefits
- **Active Control**: You decide when to read vs. reflect
- **No Accidental Advancement**: Text only moves when you hold
- **Natural Flow**: Release to think, hold to continue
- **Works on Mobile**: Touch or click - both work perfectly

## 📁 Project Structure

```
touch-to-read/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── rsvp-reader.tsx   # Main reading component
│   ├── text-input-dialog.tsx  # Text input UI
│   ├── theme-toggle.tsx   # Theme switcher
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
│   └── use-keyboard-shortcuts.ts
├── lib/                  # Utilities
│   ├── storage.ts       # LocalStorage helpers
│   └── utils.ts         # General utilities
└── TODO.md              # Development roadmap
```

## 🔜 Roadmap

See [TODO.md](TODO.md) for the complete development roadmap.

### Coming Soon
- [ ] URL text extraction
- [ ] Reading statistics dashboard
- [ ] Multiple reading modes (chunk, sentence)
- [ ] PDF and EPUB support
- [ ] Export reading data
- [ ] PWA support for offline reading

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow the existing code style
- Add TypeScript types for all new code
- Test on both desktop and mobile
- Update documentation for new features

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Inspired by speed reading research and RSVP technology
- Built with amazing open-source tools from the React ecosystem
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

**Made with ❤️ for better reading**
