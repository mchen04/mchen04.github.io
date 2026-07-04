# Michael Chen's Portfolio

A modern portfolio website built with cutting-edge web technologies to showcase projects, experience, and skills.

## Features

- Responsive design with mobile-first approach
- Modern UI components using shadcn/ui
- Smooth animations and transitions
- Project showcase with detailed descriptions
- Contact form integration
- Blog section for sharing insights

## Technologies Used

- ⚡️ [Vite](https://vitejs.dev/) - Next generation frontend tooling
- ⚛️ [React](https://reactjs.org/) - JavaScript library for building user interfaces
- 🦕 [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🛠️ [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- 🐇 [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- Node.js (v18 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mchen04/mchen04.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd mchen04.github.io
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

### Development

Start the development server:
```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

To build the app for production:
```bash
bun run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
mchen04.github.io/
├── public/            # Static assets
├── src/               # Source files
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── App.tsx        # Main application component
├── .gitignore         # Git ignore rules
├── bun.lockb          # Bun lockfile
├── package.json       # Project dependencies
├── tailwind.config.ts # Tailwind configuration
└── vite.config.ts     # Vite configuration
```

## Deployment

This project is automatically deployed to GitHub Pages. The production build is served from the `gh-pages` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
