import React, { useState } from 'react'
import { Button, Box, Alert, Typography } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
    onSuccess?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login()
            // After successful login, Keycloak will redirect back to the app
            // The AuthContext will handle the user state update
            if (isAuthenticated) {
                onSuccess ? onSuccess() : navigate('/home')
            }
        } catch (error) {
            console.error('Keycloak login error:', error)
            setError('Failed to authenticate with Keycloak')
            setLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Typography variant="body1" paragraph>
                Click the button below to login using Keycloak authentication.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                You will be redirected to the Keycloak login page.
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
                aria-describedby={loading ? 'login-progress' : undefined}
            >
                {loading ? (
                    <>
                        <Box
                            component="span"
                            sx={{
                                display: 'inline-block',
                                width: 16,
                                height: 16,
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                borderTopColor: 'white',
                                animation: 'spin 1s ease-in-out infinite',
                                mr: 1,
                                '@keyframes spin': {
                                    to: { transform: 'rotate(360deg)' },
                                },
                            }}
                            aria-hidden="true"
                        />
                        Redirecting to Keycloak...
                    </>
                ) : (
                    'Login with Keycloak'
                )}
            </Button>
            {loading && (
                <Box
                    id="login-progress"
                    sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}
                    role="status"
                    aria-live="polite"
                >
                    <Typography variant="body2" color="text.secondary">
                        Redirecting to Keycloak authentication...
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default LoginForm