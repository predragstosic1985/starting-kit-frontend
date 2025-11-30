import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProviderWrapper } from '../../contexts/ThemeContext'
import SideMenu from '../../components/SideMenu'
import { vi } from 'vitest'

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
    useAuth: () => ({
        logout: vi.fn(),
    }),
}))

describe('SideMenu', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
    })

    it('renders navigation items', () => {
        render(
            <ThemeProviderWrapper>
                <MemoryRouter>
                    <SideMenu open={true} onClose={() => { }} />
                </MemoryRouter>
            </ThemeProviderWrapper>
        )

        expect(screen.getByText('nav.home')).toBeInTheDocument()
        expect(screen.getByText('nav.profile')).toBeInTheDocument()
        expect(screen.getByText('nav.settings')).toBeInTheDocument()
        expect(screen.getByText('nav.logout')).toBeInTheDocument()
    })

    it('navigates on menu item click', () => {
        render(
            <ThemeProviderWrapper>
                <MemoryRouter>
                    <SideMenu open={true} onClose={() => { }} />
                </MemoryRouter>
            </ThemeProviderWrapper>
        )

        const homeButton = screen.getByText('nav.home')
        fireEvent.click(homeButton)

        expect(mockNavigate).toHaveBeenCalledWith('/home')
    })

    it('calls onClose on mobile when navigating', () => {
        // Mock mobile viewport
        Object.defineProperty(window, 'innerWidth', { value: 600 })

        const mockOnClose = vi.fn()

        render(
            <ThemeProviderWrapper>
                <MemoryRouter>
                    <SideMenu open={true} onClose={mockOnClose} />
                </MemoryRouter>
            </ThemeProviderWrapper>
        )

        const homeButton = screen.getByText('nav.home')
        fireEvent.click(homeButton)

        expect(mockOnClose).toHaveBeenCalled()
    })
})