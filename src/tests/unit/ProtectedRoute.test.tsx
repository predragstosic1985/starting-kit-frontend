import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'
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

describe('ProtectedRoute', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear()
        localStorageMock.setItem.mockClear()
        localStorageMock.removeItem.mockClear()
    })

    it('should render children when authenticated', () => {
        const storedUser = { id: '1', username: 'demo', isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(storedUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProtectedRoute>
                        <div data-testid="protected-content">Protected Content</div>
                    </ProtectedRoute>
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    })

    it('should redirect to login when not authenticated', () => {
        localStorageMock.getItem.mockReturnValue(null)

        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProtectedRoute>
                        <div data-testid="protected-content">Protected Content</div>
                    </ProtectedRoute>
                </AuthProvider>
            </MemoryRouter>
        )

        // Since Navigate redirects, the protected content should not be rendered
        expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    })
})