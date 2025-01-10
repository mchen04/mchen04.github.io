# Michael Chen's Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern personal portfolio website showcasing projects, skills, and experience. Built with cutting-edge web technologies for optimal performance and developer experience.

## Features

- Responsive design with mobile-first approach
- Modern UI components from Shadcn/ui
- Type-safe codebase with TypeScript
- Fast build times with Vite
- Tailwind CSS for utility-first styling
- Component-driven architecture
- Blog section with dynamic content
- Project showcase with filtering
- Skills and certifications display
- Contact form integration
- Dark mode support

## Technologies

- ⚡️ [Vite](https://vitejs.dev/) - Next generation frontend tooling
- ⚛️ [React 18](https://reactjs.org/) - JavaScript library for building user interfaces
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🛠 [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- 📦 [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- 🎭 [Framer Motion](https://www.framer.com/motion/) - Animation library
- 📊 [Recharts](https://recharts.org/) - Composable charting library
- 🔄 [React Router](https://reactrouter.com/) - Client-side routing
- 📝 [React Hook Form](https://react-hook-form.com/) - Form validation
- ✨ [Radix UI](https://www.radix-ui.com/) - Unstyled accessible components
- 🌙 [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

## Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # Shadcn/ui components
│   └── ...        # Feature components
├── data/          # Static data and content
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── utils/         # Helper functions
```

## Getting Started

### Prerequisites

- Node.js (v18.3.0 or higher recommended)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/mchen04/mchen04.github.io.git
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Deployment

This project is automatically deployed to GitHub Pages through GitHub Actions. The workflow is triggered when changes are pushed to the `main` branch:

1. The GitHub Action runs the build process
2. The built files are deployed to the gh-pages branch
3. GitHub Pages serves the content from the gh-pages branch

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
