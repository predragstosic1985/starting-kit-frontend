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

describe('UserManagement (within AdminPanel)', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear()
        localStorageMock.setItem.mockClear()
        localStorageMock.removeItem.mockClear()
        consoleLogSpy.mockClear()
    })

    afterEach(() => {
        consoleLogSpy.mockRestore()
    })

    it('should display all users with their roles and current themes', () => {
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

        // Verify all demo users are displayed
        expect(screen.getByText('demo (SuperAdmin)')).toBeInTheDocument()
        expect(screen.getByText('admin (Admin)')).toBeInTheDocument()
        expect(screen.getByText('user1 (User)')).toBeInTheDocument()
        expect(screen.getByText('user2 (User)')).toBeInTheDocument()

        // Verify current themes are shown
        expect(screen.getByText('Current theme: light')).toBeInTheDocument()
        expect(screen.getByText('Current theme: dark')).toBeInTheDocument()
        expect(screen.getByText('Current theme: auto')).toBeInTheDocument()
    })

    it('should allow SuperAdmin to change user themes', async () => {
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

        // Get all "Assign Light" buttons (one for each user)
        const assignLightButtons = screen.getAllByText('Assign Light')

        // Click the first one (for demo user)
        fireEvent.click(assignLightButtons[0])

        // Verify the assignment function was called with correct parameters
        await waitFor(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith('Assigning theme light to user 1')
            expect(consoleLogSpy).toHaveBeenCalledWith('AUDIT: admin assigned theme light to user 1')
        })
    })

    it('should log audit trail for all theme assignments', async () => {
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

        // Assign different themes to different users
        const assignDarkButtons = screen.getAllByText('Assign Dark')
        const assignAutoButtons = screen.getAllByText('Assign Auto')

        // Assign dark theme to second user (admin)
        fireEvent.click(assignDarkButtons[1])

        await waitFor(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith('Assigning theme dark to user 2')
            expect(consoleLogSpy).toHaveBeenCalledWith('AUDIT: admin assigned theme dark to user 2')
        })

        // Assign auto theme to third user (user1)
        fireEvent.click(assignAutoButtons[2])

        await waitFor(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith('Assigning theme auto to user 3')
            expect(consoleLogSpy).toHaveBeenCalledWith('AUDIT: admin assigned theme auto to user 3')
        })
    })

    it('should show theme assignment controls only for SuperAdmin', () => {
        // Mock Admin user (not SuperAdmin)
        const mockUser = { id: '1', username: 'admin', role: 'Admin' as const, isLoggedIn: true }
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AdminPanel />
                </AuthProvider>
            </MemoryRouter>
        )

        // Admin should see the panel but not the theme assignment buttons
        expect(screen.getByText('Admin Panel')).toBeInTheDocument()
        expect(screen.getByText('User Management')).toBeInTheDocument()

        // Should not have theme assignment buttons for Admin role
        expect(screen.queryByText('Assign Light')).not.toBeInTheDocument()
        expect(screen.queryByText('Assign Dark')).not.toBeInTheDocument()
        expect(screen.queryByText('Assign Auto')).not.toBeInTheDocument()
    })

    it('should display user information in readable format', () => {
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

        // Verify user information is displayed clearly
        expect(screen.getByText('demo (SuperAdmin)')).toBeInTheDocument()
        expect(screen.getByText('Current theme: light')).toBeInTheDocument()

        // Verify the layout includes proper spacing and organization
        const userManagementSection = screen.getByText('User Management').closest('div')
        expect(userManagementSection).toBeInTheDocument()
    })

    it('should handle theme assignment for all supported theme types', async () => {
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

        // Test all three theme assignment options
        const themes = ['light', 'dark', 'auto']
        const userIndex = 0 // First user

        for (const theme of themes) {
            const button = screen.getAllByText(`Assign ${theme.charAt(0).toUpperCase() + theme.slice(1)}`)[userIndex]
            fireEvent.click(button)

            await waitFor(() => {
                expect(consoleLogSpy).toHaveBeenCalledWith(`Assigning theme ${theme} to user 1`)
                expect(consoleLogSpy).toHaveBeenCalledWith(`AUDIT: admin assigned theme ${theme} to user 1`)
            })
        }
    })
})