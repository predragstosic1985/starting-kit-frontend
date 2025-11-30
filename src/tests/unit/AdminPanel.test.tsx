import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import AdminPanel from '../../pages/AdminPanel'
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

// Mock console.log for audit logging tests
const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

describe('AdminPanel', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear()
        localStorageMock.setItem.mockClear()
        localStorageMock.removeItem.mockClear()
        consoleLogSpy.mockClear()
    })

    afterEach(() => {
        consoleLogSpy.mockRestore()
    })

    it('should render admin panel for SuperAdmin user', () => {
        // Mock SuperAdmin user
        const mockUser = { id: '1', username: 'admin', role: 'SuperAdmin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByText('Admin Panel')).toBeInTheDocument()
        expect(screen.getByText('User Management')).toBeInTheDocument()
        expect(screen.getByText('System Settings')).toBeInTheDocument()
    })

    it('should render admin panel for Admin user', () => {
        // Mock Admin user
        const mockUser = { id: '1', username: 'admin', role: 'Admin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByText('Admin Panel')).toBeInTheDocument()
    })

    it('should show access denied for regular user', () => {
        // Mock regular User
        const mockUser = { id: '1', username: 'user', role: 'User' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByText('Access Denied: Admin privileges required')).toBeInTheDocument()
        expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument()
    })

    it('should display user list with roles and themes', () => {
        // Mock SuperAdmin user
        const mockUser = { id: '1', username: 'admin', role: 'SuperAdmin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        // Check if demo users are displayed
        expect(screen.getByText('demo (SuperAdmin)')).toBeInTheDocument()
        expect(screen.getByText('admin (Admin)')).toBeInTheDocument()
        expect(screen.getByText('user1 (User)')).toBeInTheDocument()
        expect(screen.getByText('user2 (User)')).toBeInTheDocument()
    })

    it('should allow SuperAdmin to assign themes to users', async () => {
        // Mock SuperAdmin user
        const mockUser = { id: '1', username: 'admin', role: 'SuperAdmin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        // Find theme assignment buttons for the first user
        const assignLightButton = screen.getAllByText('Assign Light')[0]
        const assignDarkButton = screen.getAllByText('Assign Dark')[0]
        const assignAutoButton = screen.getAllByText('Assign Auto')[0]

        // Click assign light theme
        fireEvent.click(assignLightButton)

        // Check if audit log was called
        await waitFor(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith('Assigning theme light to user 1')
            expect(consoleLogSpy).toHaveBeenCalledWith('AUDIT: admin assigned theme light to user 1')
        })

        // Click assign dark theme
        fireEvent.click(assignDarkButton)

        await waitFor(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith('Assigning theme dark to user 1')
            expect(consoleLogSpy).toHaveBeenCalledWith('AUDIT: admin assigned theme dark to user 1')
        })

        // Click assign auto theme
        fireEvent.click(assignAutoButton)

        await waitFor(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith('Assigning theme auto to user 1')
            expect(consoleLogSpy).toHaveBeenCalledWith('AUDIT: admin assigned theme auto to user 1')
        })
    })

    it('should show current theme for each user', () => {
        // Mock SuperAdmin user
        const mockUser = { id: '1', username: 'admin', role: 'SuperAdmin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        // Check current themes are displayed
        expect(screen.getByText('Current theme: light')).toBeInTheDocument()
        expect(screen.getByText('Current theme: dark')).toBeInTheDocument()
        expect(screen.getByText('Current theme: auto')).toBeInTheDocument()
    })

    it('should render system settings section', () => {
        // Mock SuperAdmin user
        const mockUser = { id: '1', username: 'admin', role: 'SuperAdmin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        expect(screen.getByText('Configure Global Theme')).toBeInTheDocument()
        expect(screen.getByText('Manage Languages')).toBeInTheDocument()
        expect(screen.getByText('System Maintenance')).toBeInTheDocument()
    })
})