import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { fetchUsers } from '../services/api'
import { Typography, CircularProgress, Alert, Card, CardContent, Grid, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Profiles: React.FC = () => {
    const { keycloak, isAuthenticated } = useAuth()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const loadUsers = async () => {
            if (!isAuthenticated) {
                navigate('/login')
                return
            }

            try {
                setLoading(true)
                setError(null)
                const fetchedUsers = await fetchUsers(keycloak)
                setUsers(fetchedUsers)
            } catch (err) {
                console.error('Failed to load users:', err)
                setError(err instanceof Error ? err.message : 'Failed to load users')
            } finally {
                setLoading(false)
            }
        }

        loadUsers()
    }, [keycloak, isAuthenticated, navigate])

    if (!isAuthenticated) {
        return null // ProtectedRoute will handle the redirect
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                User Profiles
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            ) : (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {users.length === 0 ? (
                        <Grid item xs={12}>
                            <Alert severity="info">No users found</Alert>
                        </Grid>
                    ) : (
                        users.map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {user.username || user.email || 'Unknown User'}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                                            ID: {user.id}
                                        </Typography>
                                        {user.email && (
                                            <Typography variant="body2">
                                                Email: {user.email}
                                            </Typography>
                                        )}
                                        {user.role && (
                                            <Typography variant="body2">
                                                Role: {user.role}
                                            </Typography>
                                        )}
                                        {user.firstName && (
                                            <Typography variant="body2">
                                                First Name: {user.firstName}
                                            </Typography>
                                        )}
                                        {user.lastName && (
                                            <Typography variant="body2">
                                                Last Name: {user.lastName}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            )}
        </Box>
    )
}

export default Profiles