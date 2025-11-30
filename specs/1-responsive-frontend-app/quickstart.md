# Quickstart: Responsive Frontend Application

## Prerequisites

- Node.js 18+ installed
- Yarn 4+ installed (do not use npm or pnpm)

## Setup

1. Clone the repository (if applicable)
2. Navigate to the project root
3. Install dependencies:
   ```bash
   yarn install
   ```

## Development

1. Start the development server:
   ```bash
   yarn dev
   ```
2. Open http://localhost:3000 in your browser

## Building

1. Build for production:
   ```bash
   yarn build
   ```
2. Preview the production build:
   ```bash
   yarn preview
   ```

## Testing

1. Run unit tests:
   ```bash
   yarn test
   ```
2. Run tests in watch mode:
   ```bash
   yarn test:watch
   ```

## Key Features

- **Login Page**: Access at `/login`
- **Landing Page**: Default route `/`
- **Homepage**: Protected route `/home` (requires login)
- **Responsive Design**: Works on all devices
- **Material UI**: Sleek, modern design

## Notes

- Authentication is simulated on frontend for POC purposes
- Use demo credentials: username "demo", password "password"
- Application is ready for easy repackaging to Android/iOS using tools like Capacitor