import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import RoleGuard from '../../components/RoleGuard'
import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
})

// Test component
const TestContent = () => <div data-testid="protected-content">Protected Content</div>
const FallbackContent = () => <div data-testid="fallback-content">Fallback Content</div>

describe('RoleGuard', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear()
        localStorageMock.setItem.mockClear()
        localStorageMock.removeItem.mockClear()
    })

    it('should render children when user has allowed role', () => {
        // Mock SuperAdmin user
        const mockUser = { id: '1', username: 'admin', role: 'SuperAdmin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <RoleGuard allowedRoles={['SuperAdmin', 'Admin']}>
                        <TestContent />
                    </RoleGuard>
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    })

    it('should render children when user has one of multiple allowed roles', () => {
        // Mock Admin user
        const mockUser = { id: '1', username: 'admin', role: 'Admin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <RoleGuard allowedRoles={['SuperAdmin', 'Admin']}>
                        <TestContent />
                    </RoleGuard>
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    })

    it('should render fallback when user does not have allowed role', () => {
        // Mock regular User
        const mockUser = { id: '1', username: 'user', role: 'User' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <RoleGuard allowedRoles={['SuperAdmin', 'Admin']} fallback={<FallbackContent />}>
                        <TestContent />
                    </RoleGuard>
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByTestId('fallback-content')).toBeInTheDocument()
        expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    })

    it('should render access denied message when no fallback provided', () => {
        // Mock regular User
        const mockUser = { id: '1', username: 'user', role: 'User' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <RoleGuard allowedRoles={['SuperAdmin', 'Admin']}>
                        <TestContent />
                    </RoleGuard>
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByText('Access Denied')).toBeInTheDocument()
        expect(screen.getByText(/Required roles: SuperAdmin, Admin/)).toBeInTheDocument()
        expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    })

    it('should redirect to login when user is not authenticated', () => {
        localStorageMock.getItem.mockReturnValue(null)

        render(
            <MemoryRouter>
                <AuthProvider>
                    <RoleGuard allowedRoles={['SuperAdmin']}>
                        <TestContent />
                    </RoleGuard>
                </AuthProvider>
            </MemoryRouter>
        )

        // Should redirect to login, so protected content should not be rendered
        expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    })

    it('should handle single allowed role', () => {
        // Mock SuperAdmin user
        const mockUser = { id: '1', username: 'admin', role: 'SuperAdmin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <RoleGuard allowedRoles={['SuperAdmin']}>
                        <TestContent />
                    </RoleGuard>
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    })
})