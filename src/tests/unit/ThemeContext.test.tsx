import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProviderWrapper, useTheme } from '../../contexts/ThemeContext'
import { vi, describe, it, expect } from 'vitest'

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

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Test component to access context
const TestComponent = () => {
    const { mode, setMode, resolvedMode } = useTheme()

    return (
        <div>
            <div data-testid="mode">{mode}</div>
            <div data-testid="resolved">{resolvedMode}</div>
            <button onClick={() => setMode('light')}>Set Light</button>
            <button onClick={() => setMode('dark')}>Set Dark</button>
            <button onClick={() => setMode('auto')}>Set Auto</button>
        </div>
    )
}

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear()
        localStorageMock.setItem.mockClear()
        localStorageMock.getItem.mockReturnValue(null) // No stored theme
    })

    it('should default to light mode', () => {
        render(
            <ThemeProviderWrapper>
                <TestComponent />
            </ThemeProviderWrapper>
        )

        expect(screen.getByTestId('mode')).toHaveTextContent('light')
        expect(screen.getByTestId('resolved')).toHaveTextContent('light')
    })

    it('should switch to dark mode', async () => {
        render(
            <ThemeProviderWrapper>
                <TestComponent />
            </ThemeProviderWrapper>
        )

        const darkButton = screen.getByText('Set Dark')
        darkButton.click()

        await waitFor(() => {
            expect(screen.getByTestId('mode')).toHaveTextContent('dark')
            expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
        })

        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    it('should switch to auto mode', async () => {
        render(
            <ThemeProviderWrapper>
                <TestComponent />
            </ThemeProviderWrapper>
        )

        const autoButton = screen.getByText('Set Auto')
        autoButton.click()

        await waitFor(() => {
            expect(screen.getByTestId('mode')).toHaveTextContent('auto')
            expect(screen.getByTestId('resolved')).toHaveTextContent('light') // Default when not dark
        })

        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'auto')
    })

    it('should load theme from localStorage', () => {
        localStorageMock.getItem.mockReturnValue('dark')

        render(
            <ThemeProviderWrapper>
                <TestComponent />
            </ThemeProviderWrapper>
        )

        expect(screen.getByTestId('mode')).toHaveTextContent('dark')
        expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
    })
})