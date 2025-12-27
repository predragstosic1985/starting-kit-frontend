import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'

interface User {
    id: string
    username: string
    role: 'SuperAdmin' | 'Admin' | 'User'
    isLoggedIn: boolean
    token?: string
    refreshToken?: string
}

interface AuthContextType {
    user: User | null
    login: () => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    initialized: boolean
    keycloak: any
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
    const { keycloak, initialized } = useKeycloak()
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (initialized && keycloak?.authenticated) {
            // Extract user info from Keycloak token
            const userInfo = {
                id: keycloak.subject || 'unknown',
                username: keycloak.tokenParsed?.preferred_username || 'unknown',
                role: getUserRoleFromToken(keycloak),
                isLoggedIn: true,
                token: keycloak.token,
                refreshToken: keycloak.refreshToken
            }
            setUser(userInfo)
            localStorage.setItem('user', JSON.stringify(userInfo))

            // Redirect to home page after successful authentication
            if (window.location.pathname === '/login') {
                navigate('/home')
            }
        } else if (initialized) {
            // Clear user if not authenticated
            setUser(null)
            localStorage.removeItem('user')
        }
    }, [initialized, keycloak?.authenticated, keycloak?.token, navigate])

    const getUserRoleFromToken = (kc: any): 'SuperAdmin' | 'Admin' | 'User' => {
        // Extract roles from Keycloak token
        const realmRoles = kc.tokenParsed?.realm_access?.roles || []

        if (realmRoles.includes('SuperAdmin')) {
            return 'SuperAdmin'
        } else if (realmRoles.includes('Admin')) {
            return 'Admin'
        } else {
            return 'User'
        }
    }

    const login = async () => {
        try {
            await keycloak?.login({
                redirectUri: window.location.origin + '/home'
            })
        } catch (error) {
            console.error('Keycloak login failed:', error)
            throw error
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        keycloak?.logout({ redirectUri: window.location.origin })
    }

    const isAuthenticated = user !== null && keycloak?.authenticated

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, initialized, keycloak }}>
            {initialized ? children : <div>Loading authentication...</div>}
        </AuthContext.Provider>
    )
}