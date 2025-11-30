# Starting Kit Frontend

[![React](https://img.shields.io/badge/React-19+-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-6.0+-007fff?style=flat-square&logo=mui)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-5.3+-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Yarn](https://img.shields.io/badge/Yarn-4+-2c8ebb?style=flat-square&logo=yarn)](https://yarnpkg.com/)

A modern, responsive frontend starting kit built with React, TypeScript, and Material UI. Designed for rapid prototyping and easy adaptation to mobile apps.

## Overview

The Starting Kit Frontend is a comprehensive starting template for building responsive web applications. It provides a solid foundation with user authentication, elegant landing page, and customizable homepage with navigation. The application is built following modern development principles and is optimized for easy repackaging into Android and iOS apps using tools like Capacitor.

This project serves as a proof-of-concept (POC) foundation, featuring modular components that can be easily adapted and extended for various web and mobile application needs.

## Features

- **🔐 User Authentication**: Secure login system with demo credentials and session management
- **🏠 Elegant Landing Page**: Welcoming hero section with app introduction and call-to-action
- **📱 Customizable Homepage**: Functional dashboard with side menu navigation and layout options
- **📱 Fully Responsive**: Optimized for all devices (mobile, tablet, desktop) from 320px to 2560px width
- **🎨 Modern UI**: Sleek, professional design using Material UI components with accessibility features
- **🔒 Type-Safe**: Built with TypeScript for enhanced developer experience and code reliability
- **⚡ Fast Development**: Vite-powered build system for rapid iteration and hot module replacement
- **🧪 Testing Ready**: Comprehensive testing setup with Vitest and React Testing Library
- **🔧 Modular Architecture**: Reusable components designed for easy customization and extension

## Tech Stack

### Core Technologies
- **Frontend Framework**: React 19+ with modern hooks and concurrent features
- **Language**: TypeScript (latest stable) for type safety and better DX
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Manager**: Yarn 4+ for reliable dependency management

### UI & Styling
- **Primary Styling**: Material UI 6.0+ for consistent, accessible components
- **Optional Styling**: SCSS and Tailwind CSS for additional customization
- **Design System**: Mobile-first responsive design with custom breakpoints

### Development & Testing
- **Testing Framework**: Vitest for fast, native ES module testing
- **Testing Utilities**: React Testing Library for user-centric component testing
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Routing**: React Router DOM 6+ for client-side navigation

### State Management
- **Authentication**: React Context API with browser storage persistence
- **Session Storage**: localStorage/sessionStorage for demo authentication

## Prerequisites

- **Node.js**: Version 18 or higher
- **Yarn**: Version 4 or higher (do not use npm or pnpm)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd starting-kit-frontend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

## Usage

### Development Server

Start the development server with hot reload:
```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

Build the application for production:
```bash
yarn build
```

### Preview Production Build

Preview the production build locally:
```bash
yarn preview
```

### Testing

Run the complete test suite:
```bash
yarn test
```

Run tests in watch mode during development:
```bash
yarn test:watch
```

Run tests with UI:
```bash
yarn test:ui
```

### Code Quality

Lint and format code:
```bash
yarn lint
```

## Application Routes

- **`/`** - Landing page (public access)
- **`/login`** - Login page (public access)
- **`/home`** - Homepage (protected, requires authentication)

## Demo Credentials

For testing the authentication system:
- **Username**: `demo`
- **Password**: `password123`

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── common/             # Generic components (buttons, inputs, etc.)
│   ├── layout/             # Layout-specific components (side menu, main layout)
│   └── pages/              # Page-level components
├── contexts/               # React contexts for state management
│   └── AuthContext.tsx     # Authentication context and provider
├── hooks/                  # Custom React hooks
├── pages/                  # Route components
│   ├── Homepage.tsx        # Protected homepage
│   ├── Landing.tsx         # Public landing page
│   └── Login.tsx           # Public login page
├── styles/                 # Global styles and design system
│   ├── responsive.ts       # Responsive breakpoints and utilities
│   └── theme.ts            # Material UI theme configuration
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
│   └── responsive.ts       # Responsive design helpers
└── tests/                  # Test files
    ├── unit/               # Unit tests with Vitest
    └── integration/        # Integration tests

public/                     # Static assets
├── index.html
└── assets/

specs/                      # Project specifications and documentation
├── 1-responsive-frontend-app/
│   ├── spec.md            # Feature specification
│   ├── plan.md            # Implementation plan
│   ├── data-model.md      # Data model documentation
│   ├── research.md        # Technology research and decisions
│   ├── tasks.md           # Task breakdown and execution plan
│   ├── quickstart.md      # Quick start guide
│   └── contracts/         # API contracts
└── ...

.kilocode/                 # Development tools configuration
.specify/                  # Specification management
```

## Architecture

### Application Architecture

The Starting Kit Frontend follows a modern React application architecture:

- **Single Page Application (SPA)**: Client-side routing with React Router for seamless navigation
- **Component-Based Architecture**: Modular, reusable components following React best practices
- **Context API**: Centralized state management for authentication and user session
- **Browser Storage**: Session persistence using localStorage/sessionStorage for demo purposes
- **Responsive Design**: Mobile-first approach with custom responsive breakpoints and utilities

### Key Architectural Decisions

- **Frontend-Only Authentication**: Simulated authentication for POC purposes, designed for easy backend integration
- **Modular Components**: All components built for reusability and easy customization
- **TypeScript First**: Full type coverage for better developer experience and runtime safety
- **Material UI Foundation**: Consistent design system with accessibility and responsive features
- **Vite Build System**: Fast development experience with optimized production builds

### Data Flow

1. **Authentication Flow**: Login → Context Update → Session Storage → Protected Route Access
2. **Navigation Flow**: Router → Protected Route Check → Auth Context → Component Render
3. **Responsive Flow**: Breakpoint Detection → Style Adaptation → Component Re-render

## Development Guidelines

### Code Standards

- Follow the project [Constitution](.specify/memory/constitution.md) principles
- Use TypeScript for all new code with strict type checking
- Ensure all components are fully responsive and mobile-ready
- Write comprehensive tests for new features and components
- Maintain Material UI design consistency and accessibility standards
- Document reusable components and their props

### Component Development

- Create modular, reusable components in `src/components/`
- Use TypeScript interfaces for component props
- Implement responsive design using the provided utilities
- Follow Material UI component patterns and theming
- Add unit tests for component logic and interactions

### Testing Strategy

- Write unit tests for individual components and utilities
- Use React Testing Library for user-centric testing
- Test authentication flows and protected routes
- Validate responsive behavior across different screen sizes
- Ensure accessibility features work correctly

## Mobile App Adaptation

This frontend application is designed for easy adaptation to mobile apps:

- **Responsive Web Design**: Already optimized for mobile experiences
- **PWA Features**: Can be enhanced with service workers and app manifests
- **Framework Integration**: Compatible with Capacitor, Cordova, or React Native Web
- **Component Modularity**: UI components designed for cross-platform consistency

## Contributing

1. Follow the established coding standards and constitution principles
2. Ensure all tests pass before submitting changes
3. Add comprehensive tests for new features
4. Update documentation and README as needed
5. Follow conventional commit messages for clear change tracking

## Performance Goals

- **Load Time**: Homepage loads in under 2 seconds
- **Responsiveness**: Smooth interactions across all device sizes
- **Bundle Size**: Optimized build with code splitting
- **Accessibility**: WCAG compliant components and navigation

## Future Enhancements

- Backend API integration for production authentication
- Advanced theming and customization options
- Progressive Web App (PWA) features
- Internationalization (i18n) support
- Advanced state management (Redux Toolkit, Zustand)
- Component library documentation
- End-to-end testing with Playwright

## License

[Add appropriate license information here]

---

**Built with ❤️ using modern web technologies**