# Gronkosky - Reptile Meta-Learning Visualization

This is a sophisticated meta-learning visualization application that demonstrates the Reptile meta-learning algorithm through an interactive web interface. The application allows users to train a neural network using meta-learning on sine wave regression tasks, visualizing the training process, loss curves, and evaluation results in real-time. 

Built as a full-stack application with a React frontend and Express backend, it features an elegant black and white design with floating card animations and smooth interactive visualizations. The project makes machine learning concepts accessible through real-time demonstrations of few-shot learning capabilities.

## Key Features
- Interactive Reptile meta-learning algorithm implementation
- Real-time sine wave regression task visualization
- Adjustable hyperparameters with live training feedback
- Neural network architecture visualization
- Performance evaluation comparing random vs meta-learned initialization
- Elegant monochrome design with smooth animations

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React and TypeScript, using Vite as the build tool and development server. The UI framework is based on shadcn/ui components with Radix UI primitives, styled using Tailwind CSS with a dark theme design system. The application uses Wouter for client-side routing and TanStack Query for state management and API interactions.

The frontend implements a modular component architecture with specialized visualization components for neural networks, training controls, loss charts, function plotting, and task sampling. TensorFlow.js is integrated directly in the browser to handle the actual meta-learning computations, allowing for real-time training and visualization without server dependencies for ML operations.

## Backend Architecture
The server is built with Express.js and TypeScript, following a lightweight API-first approach. The backend uses a modular routing system with separate storage abstraction layers. Currently implements an in-memory storage system for user data, with the architecture designed to easily swap in database persistence when needed.

The server includes custom middleware for request logging and error handling, with Vite integration for development hot reloading. The build process uses esbuild for server bundling and Vite for client bundling, optimized for both development and production deployments.

## Data Storage Solutions
The application currently uses an in-memory storage implementation via a storage interface pattern, making it easy to switch to persistent storage. The database schema is defined using Drizzle ORM with PostgreSQL dialect, though the actual database integration is prepared but not actively used in the current implementation.

The storage interface defines methods for user management (getUser, getUserByUsername, createUser) with UUID-based identification. The schema includes user authentication fields (username, password) with proper constraints and indexing.

## Component and Styling System
The UI system is built on shadcn/ui components with extensive customization through CSS variables and Tailwind utilities. The design system implements a comprehensive dark theme with semantic color tokens for consistent theming across components.

The styling architecture uses CSS-in-JS patterns through Tailwind classes with custom CSS variables for theme tokens. Component variants are managed through class-variance-authority for type-safe styling patterns.

## Machine Learning Integration
TensorFlow.js is integrated for client-side machine learning computations, implementing the Reptile meta-learning algorithm for few-shot learning on sine wave regression tasks. The ML pipeline includes custom implementations for neural network creation, model cloning, sine wave data generation, and meta-learning optimization.

The training system uses a reactive architecture with custom hooks managing training state, hyperparameter configuration, and real-time visualization updates. Chart.js is used for plotting loss curves, function visualizations, and evaluation metrics.

# External Dependencies

## Core Framework Dependencies
- **React 18** with TypeScript for the frontend framework
- **Express.js** for the backend server
- **Vite** for build tooling and development server
- **Wouter** for client-side routing

## UI and Styling
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling
- **Radix UI** components for accessible UI primitives
- **Lucide React** for icon components
- **class-variance-authority** for component variant management

## Machine Learning and Visualization
- **TensorFlow.js** for client-side machine learning computations
- **Chart.js** for data visualization and plotting
- **@tanstack/react-query** for state management and API interactions

## Database and Storage
- **Drizzle ORM** with PostgreSQL dialect for database schema definition
- **@neondatabase/serverless** for PostgreSQL database connectivity
- **connect-pg-simple** for PostgreSQL session storage

## Development and Build Tools
- **TypeScript** for type safety across the application
- **ESBuild** for server-side bundling
- **PostCSS** with Autoprefixer for CSS processing
- **@replit/vite-plugin-runtime-error-modal** for development error handling

## Form Handling and Validation
- **React Hook Form** with **@hookform/resolvers** for form management
- **Zod** via **drizzle-zod** for schema validation and type inference