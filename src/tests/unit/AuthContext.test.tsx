import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
})

// Test component to access context
const TestComponent = () => {
    const { user, login, logout, isAuthenticated } = useAuth()

    const handleLogin = async () => {
        await login('demo', 'password')
    }

    const handleInvalidLogin = async () => {
        await login('invalid', 'invalid')
    }

    return (
        <div>
            <div data-testid="user">{user ? user.username : 'No user'}</div>
            <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleInvalidLogin}>Invalid Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

describe('AuthContext', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear()
        localStorageMock.setItem.mockClear()
        localStorageMock.removeItem.mockClear()
    })

    it('should login with valid credentials', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )

        const loginButton = screen.getByText('Login')
        loginButton.click()

        await waitFor(() => {
            expect(screen.getByTestId('user')).toHaveTextContent('demo')
            expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
        })

        expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify({
            id: '1',
            username: 'demo',
            isLoggedIn: true,
        }))
    })

    it('should not login with invalid credentials', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )

        const invalidLoginButton = screen.getByText('Invalid Login')
        invalidLoginButton.click()

        await waitFor(() => {
            expect(screen.getByTestId('user')).toHaveTextContent('No user')
            expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
        })

        expect(localStorageMock.setItem).not.toHaveBeenCalled()
    })

    it('should logout', async () => {
        // First login
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )

        const loginButton = screen.getByText('Login')
        loginButton.click()

        await waitFor(() => {
            expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
        })

        // Then logout
        const logoutButton = screen.getByText('Logout')
        logoutButton.click()

        await waitFor(() => {
            expect(screen.getByTestId('user')).toHaveTextContent('No user')
            expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
        })

        expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
    })

    it('should load user from localStorage on mount', () => {
        const storedUser = { id: '1', username: 'demo', isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(storedUser))

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        )

        expect(screen.getByTestId('user')).toHaveTextContent('demo')
        expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    })
})