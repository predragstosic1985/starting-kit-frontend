# Component Library Documentation

This document provides comprehensive documentation for all reusable components in the Starting Kit Frontend application.

## Table of Contents

- [Authentication Components](#authentication-components)
- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Admin Components](#admin-components)
- [Utility Components](#utility-components)

## Authentication Components

The authentication system has been fully integrated with Keycloak for centralized identity management. This provides enterprise-grade security features including Single Sign-On (SSO), OAuth 2.0, and OpenID Connect.

### Keycloak Configuration

**Keycloak Server:** `http://localhost:8081`
**Realm:** `starting-kit-realm`
**Client ID:** `starting-kit-frontend`

### LoginForm

A form component that initiates the Keycloak authentication flow. When the user clicks the login button, they are redirected to the Keycloak login page.

**Props:**
```typescript
interface LoginFormProps {
    onSuccess?: () => void  // Optional callback when login succeeds
}
```

**Features:**
- Initiates Keycloak OAuth 2.0 authorization flow
- Handles redirects to Keycloak login page
- Manages authentication state via Keycloak callbacks
- Responsive design for all screen sizes
- Loading states during authentication

**Usage:**
```tsx
import LoginForm from '../components/LoginForm'

function LoginPage() {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSuccess={() => navigate('/dashboard')} />
        </div>
    )
}
```

### ProtectedRoute

Higher-order component that protects routes based on Keycloak authentication status. This component ensures that only authenticated users can access protected routes.

**Props:**
```typescript
interface ProtectedRouteProps {
    children: React.ReactNode
}
```

**Features:**
- Checks Keycloak authentication state
- Redirects to login page if user is not authenticated
- Handles Keycloak initialization states
- Preserves intended destination for post-login redirect
- Integrates with Keycloak token validation

**Usage:**
```tsx
import ProtectedRoute from '../components/ProtectedRoute'

<Route path="/dashboard" element={
    <ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>
} />
```

### RoleGuard

Component that restricts access based on user roles from Keycloak. Roles are extracted from the Keycloak access token.

**Props:**
```typescript
interface RoleGuardProps {
    children: React.ReactNode
    allowedRoles: ('SuperAdmin' | 'Admin' | 'User')[]
    fallback?: React.ReactNode
    redirectTo?: string
}
```

**Features:**
- Role-based access control using Keycloak realm roles
- Extracts roles from Keycloak JWT tokens
- Custom fallback content for unauthorized access
- Automatic redirect to login for unauthenticated users
- Configurable redirect destination

**Usage:**
```tsx
import RoleGuard from '../components/RoleGuard'

<RoleGuard allowedRoles={['Admin', 'SuperAdmin']}>
    <AdminPanel />
</RoleGuard>
```

### RoleGuard

Component that restricts access based on user roles.

**Props:**
```typescript
interface RoleGuardProps {
    children: React.ReactNode
    allowedRoles: ('SuperAdmin' | 'Admin' | 'User')[]
    fallback?: React.ReactNode
    redirectTo?: string
}
```

**Features:**
- Role-based access control
- Custom fallback content for unauthorized access
- Automatic redirect to login for unauthenticated users
- Configurable redirect destination

**Usage:**
```tsx
import RoleGuard from '../components/RoleGuard'

<RoleGuard allowedRoles={['Admin', 'SuperAdmin']}>
    <AdminPanel />
</RoleGuard>
```

## Layout Components

### Layout

Main application layout wrapper with responsive navigation.

**Features:**
- Responsive sidebar navigation
- Header with user menu and theme toggle
- Mobile-friendly drawer navigation
- Consistent spacing and typography

### SideMenu

Navigation sidebar with role-based menu items.

**Props:**
```typescript
interface SideMenuProps {
    onNavigate?: (path: string) => void
}
```

**Features:**
- Role-based menu visibility
- Active route highlighting
- Collapsible on mobile devices
- Icon and text navigation items

## UI Components

### ErrorBoundary

Error boundary component for graceful error handling.

**Features:**
- Catches JavaScript errors in component tree
- Displays user-friendly error messages
- Development mode stack traces
- Retry functionality
- Error logging

### LanguageSelector

Dropdown component for language selection.

**Features:**
- Flag icons for visual language identification
- Persistent language preference
- Integration with react-i18next
- Responsive dropdown menu

### ThemeToggle

Button component for switching between light and dark themes.

**Features:**
- Visual theme indicators
- Smooth theme transitions
- Persistent theme preferences
- Accessibility compliant

## Admin Components

### UserManagement

Comprehensive user management interface for administrators.

**Props:**
```typescript
interface UserManagementProps {
    onThemeAssign?: (userId: string, theme: string) => void
    onRoleChange?: (userId: string, role: string) => void
}
```

**Features:**
- User list with roles and current themes
- Theme assignment controls (SuperAdmin only)
- Role management dropdown (SuperAdmin only)
- Audit logging for all administrative actions
- Responsive table layout

### AdminPanel

Main administrative dashboard component.

**Features:**
- User management section
- System settings panel
- Role-based feature visibility
- Audit trail display
- Responsive grid layout

## Utility Components

### LoadingSpinner

Animated loading indicator component.

**Props:**
```typescript
interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large'
    color?: string
}
```

**Features:**
- Multiple sizes available
- Customizable colors
- CSS-only animations
- Accessibility compliant

## Keycloak Integration

### Architecture Overview

The application uses Keycloak for authentication and authorization through the following components:

1. **Keycloak Configuration**: Centralized configuration in `src/config/keycloak.ts`
2. **ReactKeycloakProvider**: Wraps the application to provide Keycloak context
3. **AuthContext**: Manages user state and integrates with Keycloak
4. **LoginForm**: Initiates Keycloak authentication flow
5. **ProtectedRoute**: Protects routes based on Keycloak authentication state

### Authentication Flow

1. User clicks "Login with Keycloak" button
2. Application redirects to Keycloak login page (`http://localhost:8081`)
3. User authenticates with Keycloak
4. Keycloak redirects back to application with authorization code
5. Application exchanges code for tokens
6. User is logged in and can access protected routes

### Token Management

- **Access Token**: Used for API authorization (stored in memory)
- **Refresh Token**: Used to obtain new access tokens (stored securely)
- **ID Token**: Contains user information and roles

### Role Mapping

Keycloak realm roles are mapped to application roles:
- `SuperAdmin` → Full access to all features
- `Admin` → Access to administrative features
- `User` → Basic access to application features

## Component Architecture

### Design Principles

1. **Reusability**: All components are designed to be reusable across different contexts
2. **Accessibility**: WCAG 2.1 AA compliance with proper ARIA labels and keyboard navigation
3. **Responsiveness**: Mobile-first design with breakpoints for all screen sizes
4. **Performance**: Optimized with React.memo and lazy loading where appropriate
5. **Type Safety**: Full TypeScript support with proper prop interfaces
6. **Security**: Keycloak integration for enterprise-grade authentication

### State Management

- **Local State**: useState for component-specific state
- **Global State**: Context API for shared state (Auth, Theme, i18n)
- **Authentication State**: Managed by Keycloak and AuthContext
- **Server State**: Prepared for future API integration

### Styling Approach

- **Material UI**: Primary styling framework with theme system
- **CSS-in-JS**: sx prop for component-specific styles
- **Theme Variables**: Consistent use of theme tokens
- **Responsive Design**: Mobile-first breakpoint system

## Testing

All components include comprehensive unit tests covering:
- Rendering behavior
- User interactions
- Prop handling
- Error states
- Accessibility features

## Future Enhancements

- Component storybook documentation
- Automated visual regression testing
- Performance monitoring integration
- A11y automated testing
- Component usage analytics