import React from 'react'
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const AdminPanel: React.FC = () => {
    const { user } = useAuth()
    const { t } = useTranslation()

    // Mock user data for demo
    const mockUsers = [
        { id: '1', username: 'demo', role: 'SuperAdmin', theme: 'light' },
        { id: '2', username: 'admin', role: 'Admin', theme: 'dark' },
        { id: '3', username: 'user1', role: 'User', theme: 'auto' },
        { id: '4', username: 'user2', role: 'User', theme: 'light' },
    ]

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
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            User Management
                        </Typography>
                        <List>
                            {mockUsers.map((u, index) => (
                                <React.Fragment key={u.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={`${u.username} (${u.role})`}
                                            secondary={`Current theme: ${u.theme}`}
                                        />
                                        {user?.role === 'SuperAdmin' && (
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => handleThemeAssignment(u.id, 'light')}
                                                >
                                                    Assign Light
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => handleThemeAssignment(u.id, 'dark')}
                                                >
                                                    Assign Dark
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => handleThemeAssignment(u.id, 'auto')}
                                                >
                                                    Assign Auto
                                                </Button>
                                            </Box>
                                        )}
                                    </ListItem>
                                    {index < mockUsers.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
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