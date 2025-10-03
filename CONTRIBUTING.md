# Contributing to Touch to Read

Thank you for your interest in contributing to Touch to Read! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or pnpm
- Git

### Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/yourusername/touch-to-read.git
cd touch-to-read
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see your changes.

## Project Structure

```
touch-to-read/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx             # Custom components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Development Guidelines

### Code Style

- **TypeScript**: All new code should be in TypeScript
- **Components**: Use functional components with hooks
- **Props**: Always define prop types with interfaces
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **Formatting**: Code is auto-formatted with Prettier (via Next.js)

### Component Guidelines

1. **Client Components**: Use `"use client"` directive when needed
2. **Server Components**: Default to server components when possible
3. **Accessibility**: Include ARIA labels and keyboard support
4. **Responsive**: Test on mobile and desktop viewports

### Adding New Features

1. **Check TODO.md**: See if your feature is already planned
2. **Create an Issue**: Discuss the feature before building
3. **Branch**: Create a feature branch (`git checkout -b feature/your-feature`)
4. **Implement**: Build your feature with tests if applicable
5. **Document**: Update README.md and TODO.md
6. **Test**: Ensure `npm run build` succeeds
7. **PR**: Submit a pull request with clear description

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

This project uses shadcn/ui for UI components. Always use the CLI to add new components.

## Testing

Currently, the project doesn't have automated tests, but you should:

1. **Manual Testing**: Test your changes in the browser
2. **Build Test**: Ensure `npm run build` succeeds
3. **Responsive**: Test on mobile and desktop
4. **Keyboard**: Verify keyboard shortcuts work
5. **Theme**: Test in both light and dark modes

## Commit Messages

Follow conventional commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

Example:
```
feat: add PDF upload support

Added ability to upload and parse PDF files for speed reading.
Uses pdf-parse library for text extraction.
```

## Pull Request Process

1. **Update Documentation**: Update README.md and TODO.md if needed
2. **Test Build**: Ensure production build works
3. **Clear Description**: Explain what and why
4. **Screenshots**: Add screenshots for UI changes
5. **Link Issues**: Reference any related issues
6. **Request Review**: Tag maintainers for review

## Feature Ideas

See [TODO.md](TODO.md) for planned features. Some good first contributions:

- **Easy**: UI improvements, documentation, sample texts
- **Medium**: New input methods, theme variants, statistics
- **Hard**: Reading modes, PDF/EPUB support, mobile gestures

## Questions?

- **Bugs**: Open an issue with reproduction steps
- **Features**: Open an issue to discuss before building
- **General**: Start a discussion in GitHub Discussions

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help newcomers learn

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Touch to Read! 🚀
