// Default reading settings
export const DEFAULT_WPM = 300
export const DEFAULT_FONT_SIZE = 60

// WPM constraints
export const MIN_WPM = 100
export const MAX_WPM = 1000
export const WPM_STEP = 50

// Font size constraints
export const MIN_FONT_SIZE = 24
export const MAX_FONT_SIZE = 120
export const FONT_SIZE_STEP = 4

// Punctuation delay multipliers
export const SENTENCE_END_DELAY = 2.5
export const COMMA_DELAY = 1.5
export const LONG_WORD_DELAY = 1.3
export const VERY_LONG_WORD_DELAY = 1.5
export const SHORT_WORD_DELAY = 0.8

// Word length thresholds
export const LONG_WORD_THRESHOLD = 8
export const VERY_LONG_WORD_THRESHOLD = 12
export const SHORT_WORD_THRESHOLD = 3

// Default welcome text
export const DEFAULT_TEXT = `Welcome to Touch to Read! This is an RSVP speed reading app. Touch and hold anywhere on the screen to start reading. Release to pause. The longer you hold, the more you read. It's that simple. Try adjusting the speed in settings to find your perfect pace. Happy reading!`

// Sample texts for the text input dialog
export const SAMPLE_TEXTS = [
  {
    title: "The Art of Reading",
    text: `Speed reading is not just about reading faster. It's about understanding more efficiently. The human brain can process visual information incredibly quickly, much faster than we typically read. Traditional reading involves moving your eyes across the page, which creates unnecessary delays. RSVP technology eliminates this by presenting words at a fixed point, allowing your brain to focus purely on comprehension. Studies show that most people can comfortably read at 300-500 words per minute with this method, with practice reaching 700 WPM or more while maintaining good comprehension.`,
  },
  {
    title: "The Power of Focus",
    text: `In our modern world, the ability to focus has become increasingly rare and valuable. Every notification, every alert, every ping competes for our attention. But deep work, the kind that produces real value, requires sustained concentration. When you eliminate distractions and give your full attention to a single task, remarkable things happen. Your comprehension deepens. Your creativity flourishes. Your productivity soars. This is why touch-to-read is so powerful. By requiring physical engagement, it transforms passive reading into an active choice. You decide when to focus, when to pause, when to reflect.`,
  },
  {
    title: "The Science of Learning",
    text: `Learning is not a passive process. It requires active engagement with material. When you read at an accelerated pace, your brain enters a state of heightened focus. There's no time for mind-wandering or distraction. Each word demands attention. This forced concentration can actually improve retention for many readers. The key is finding your optimal speed, fast enough to maintain focus but not so fast that comprehension suffers. Everyone's sweet spot is different. Experiment with different speeds and see what works best for you.`,
  },
]
