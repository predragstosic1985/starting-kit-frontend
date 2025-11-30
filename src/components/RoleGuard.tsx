import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Box, Typography, Alert } from '@mui/material'

interface RoleGuardProps {
    children: React.ReactNode
    allowedRoles: ('SuperAdmin' | 'Admin' | 'User')[]
    fallback?: React.ReactNode
    redirectTo?: string
}

const RoleGuard: React.FC<RoleGuardProps> = React.memo(({
    children,
    allowedRoles,
    fallback,
    redirectTo = '/'
}) => {
    const { user, isAuthenticated } = useAuth()

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    // Check if user has required role
    if (!allowedRoles.includes(user.role)) {
        if (fallback) {
            return <>{fallback}</>
        }

        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Access Denied
                </Alert>
                <Typography variant="body1">
                    You don't have permission to access this resource.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Required roles: {allowedRoles.join(', ')}
                </Typography>
            </Box>
        )
    }

    return <>{children}</>
})

RoleGuard.displayName = 'RoleGuard'

export default RoleGuard