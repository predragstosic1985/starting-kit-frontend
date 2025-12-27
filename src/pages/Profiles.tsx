import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { fetchUsers } from '../services/api'
import { Typography, CircularProgress, Alert, Card, CardContent, Grid, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Profiles: React.FC = () => {
    const { t } = useTranslation()
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
                setError(err instanceof Error ? err.message : t('profiles.error'))
            } finally {
                setLoading(false)
            }
        }

        loadUsers()
    }, [keycloak, isAuthenticated, navigate, t])

    if (!isAuthenticated) {
        return null // ProtectedRoute will handle the redirect
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('profiles.title')}
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                        {t('profiles.loading')}
                    </Typography>
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            ) : (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {users.length === 0 ? (
                        <Grid item xs={12}>
                            <Alert severity="info">{t('profiles.noUsers')}</Alert>
                        </Grid>
                    ) : (
                        users.map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {user.username || user.email || t('profiles.unknownUser')}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                                            {t('profiles.userId', { id: user.id })}
                                        </Typography>
                                        {user.email && (
                                            <Typography variant="body2">
                                                {t('profiles.email', { email: user.email })}
                                            </Typography>
                                        )}
                                        {user.role && (
                                            <Typography variant="body2">
                                                {t('profiles.role', { role: user.role })}
                                            </Typography>
                                        )}
                                        {user.firstName && (
                                            <Typography variant="body2">
                                                {t('profiles.firstName', { firstName: user.firstName })}
                                            </Typography>
                                        )}
                                        {user.lastName && (
                                            <Typography variant="body2">
                                                {t('profiles.lastName', { lastName: user.lastName })}
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