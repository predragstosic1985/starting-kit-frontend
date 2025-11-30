import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

export type ThemeMode = 'light' | 'dark' | 'auto'

interface ThemeContextType {
    mode: ThemeMode
    setMode: (mode: ThemeMode) => void
    resolvedMode: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>('light')
    const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light')

    // Load theme from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('theme')
        if (stored && ['light', 'dark', 'auto'].includes(stored)) {
            setMode(stored as ThemeMode)
        }
    }, [])

    // Update resolved mode when mode changes
    useEffect(() => {
        if (mode === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setResolvedMode(prefersDark ? 'dark' : 'light')
        } else {
            setResolvedMode(mode)
        }
        localStorage.setItem('theme', mode)
    }, [mode])

    // Listen for system theme changes when in auto mode
    useEffect(() => {
        if (mode === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = (e: MediaQueryListEvent) => {
                setResolvedMode(e.matches ? 'dark' : 'light')
            }
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        }
    }, [mode])

    const theme = createTheme({
        palette: {
            mode: resolvedMode,
            primary: {
                main: resolvedMode === 'dark' ? '#90caf9' : '#1976d2',
            },
            secondary: {
                main: resolvedMode === 'dark' ? '#f48fb1' : '#dc004e',
            },
            background: {
                default: resolvedMode === 'dark' ? '#121212' : '#fafafa',
                paper: resolvedMode === 'dark' ? '#1e1e1e' : '#ffffff',
            },
        },
    })

    return (
        <ThemeContext.Provider value={{ mode, setMode, resolvedMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}