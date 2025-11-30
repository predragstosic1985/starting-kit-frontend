import React, { useState } from 'react'
import { TextField, Button, Box, Alert } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
    onSuccess?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Basic validation
        if (!username.trim()) {
            setError('Username is required')
            setLoading(false)
            return
        }
        if (!password.trim()) {
            setError('Password is required')
            setLoading(false)
            return
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            setLoading(false)
            return
        }

        const success = await login(username, password)
        setLoading(false)
        if (success) {
            onSuccess ? onSuccess() : navigate('/home')
        } else {
            setError('Invalid credentials')
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!error && !username.trim()}
                helperText={error && !username.trim() ? 'Username is required' : ''}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error && password.length < 8}
                helperText={error && password.length < 8 ? 'Password must be at least 8 characters' : ''}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </Button>
        </Box>
    )
}

export default LoginForm