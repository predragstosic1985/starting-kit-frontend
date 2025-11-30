import React from 'react'
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import UserManagement from '../components/UserManagement'

const AdminPanel: React.FC = () => {
    const { user } = useAuth()
    const { t } = useTranslation()


    const handleThemeAssignment = (userId: string, theme: string) => {
        // In a real app, this would call an API
        console.log(`Assigning theme ${theme} to user ${userId}`)
        // Log audit action
        console.log(`AUDIT: ${user?.username} assigned theme ${theme} to user ${userId}`)
    }

    if (user?.role !== 'SuperAdmin' && user?.role !== 'Admin') {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" color="error">
                    Access Denied: Admin privileges required
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Manage users, themes, and system settings
            </Typography>

            <Grid container spacing={3}>
                {/* User Management */}
                <Grid item xs={12} md={8}>
                    <UserManagement
                        onThemeAssign={handleThemeAssignment}
                        onRoleChange={(userId, newRole) => {
                            console.log(`AUDIT: ${user?.username} changed role of user ${userId} to ${newRole}`)
                        }}
                    />
                </Grid>

                {/* System Settings */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            System Settings
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Global configuration options
                        </Typography>
                        <Button variant="contained" fullWidth sx={{ mb: 1 }}>
                            Configure Global Theme
                        </Button>
                        <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                            Manage Languages
                        </Button>
                        <Button variant="outlined" fullWidth>
                            System Maintenance
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminPanel