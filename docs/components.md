# Component Library Documentation

This document provides comprehensive documentation for all reusable components in the Starting Kit Frontend application.

## Table of Contents

- [Authentication Components](#authentication-components)
- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Admin Components](#admin-components)
- [Utility Components](#utility-components)

## Authentication Components

### LoginForm

A reusable form component for user authentication with validation and error handling.

**Props:**
```typescript
interface LoginFormProps {
    onSuccess?: () => void  // Optional callback when login succeeds
}
```

**Features:**
- Email/username and password fields
- Form validation with error messages
- Loading states during authentication
- Accessibility compliant with ARIA labels
- Responsive design for all screen sizes

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

Higher-order component that protects routes based on authentication status.

**Props:**
```typescript
interface ProtectedRouteProps {
    children: React.ReactNode
}
```

**Features:**
- Redirects to login page if user is not authenticated
- Preserves intended destination for post-login redirect
- Integrates with AuthContext for authentication state

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

## Component Architecture

### Design Principles

1. **Reusability**: All components are designed to be reusable across different contexts
2. **Accessibility**: WCAG 2.1 AA compliance with proper ARIA labels and keyboard navigation
3. **Responsiveness**: Mobile-first design with breakpoints for all screen sizes
4. **Performance**: Optimized with React.memo and lazy loading where appropriate
5. **Type Safety**: Full TypeScript support with proper prop interfaces

### State Management

- **Local State**: useState for component-specific state
- **Global State**: Context API for shared state (Auth, Theme, i18n)
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