import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
    id: string
    username: string
    role: 'SuperAdmin' | 'Admin' | 'User'
    isLoggedIn: boolean
}

interface AuthContextType {
    user: User | null
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = async (username: string, password: string): Promise<boolean> => {
        // Demo authentication - in production, call API
        if (username === 'demo' && password === 'password') {
            const demoUser: User = {
                id: '1',
                username: 'demo',
                role: 'SuperAdmin', // Demo user as SuperAdmin
                isLoggedIn: true,
            }
            setUser(demoUser)
            localStorage.setItem('user', JSON.stringify(demoUser))
            return true
        }
        return false
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const isAuthenticated = user !== null

    // Load user from localStorage on mount
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}