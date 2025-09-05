# Andrea Sing - Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This project showcases Andrea Sing's professional work, skills, and creative projects.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Optimized for speed and performance
- **Accessible**: Built with accessibility best practices
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives
- **Routing**: Wouter (lightweight routing)
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shinedark/LetsmakeAndreaSing.git
cd LetsmakeAndreaSing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/public` directory.

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions and data
│   └── hooks/         # Custom React hooks
├── public/            # Static assets
└── index.html         # HTML template

server/                # Express server (for development)
shared/                # Shared types and schemas
```

## Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. Builds the React application
2. Uploads the built files to GitHub Pages
3. Makes the site available at `https://shinedark.github.io/LetsmakeAndreaSing/`

## Customization

To customize this portfolio for your own use:

1. Update the content in `client/src/pages/home.tsx`
2. Modify the project data in `client/src/lib/data-generation.ts`
3. Update the metadata in `client/index.html`
4. Customize the styling in the Tailwind CSS classes

## License

MIT License - feel free to use this template for your own portfolio.

## Contact

- **Email**: andrea@example.com
- **GitHub**: [@shinedark](https://github.com/shinedark)
- **LinkedIn**: [Andrea Sing](https://linkedin.com/in/andrea-sing)