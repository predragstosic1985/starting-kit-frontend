import React from 'react'
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

interface User {
    id: string
    username: string
    role: 'SuperAdmin' | 'Admin' | 'User'
    theme: string
}

interface UserManagementProps {
    onThemeAssign?: (userId: string, theme: string) => void
    onRoleChange?: (userId: string, role: string) => void
}

const UserManagement: React.FC<UserManagementProps> = React.memo(({
    onThemeAssign,
    onRoleChange
}) => {
    const { user } = useAuth()

    // Mock user data - in a real app, this would come from an API
    const [users, setUsers] = React.useState<User[]>([
        { id: '1', username: 'demo', role: 'SuperAdmin', theme: 'light' },
        { id: '2', username: 'admin', role: 'Admin', theme: 'dark' },
        { id: '3', username: 'user1', role: 'User', theme: 'auto' },
        { id: '4', username: 'user2', role: 'User', theme: 'light' },
    ])

    const handleThemeAssignment = (userId: string, theme: string) => {
        setUsers(prevUsers =>
            prevUsers.map(u =>
                u.id === userId ? { ...u, theme } : u
            )
        )
        onThemeAssign?.(userId, theme)
        // Log audit action
        console.log(`AUDIT: ${user?.username} assigned theme ${theme} to user ${userId}`)
    }

    const handleRoleChange = (userId: string, newRole: string) => {
        setUsers(prevUsers =>
            prevUsers.map(u =>
                u.id === userId ? { ...u, role: newRole as User['role'] } : u
            )
        )
        onRoleChange?.(userId, newRole)
        // Log audit action
        console.log(`AUDIT: ${user?.username} changed role of user ${userId} to ${newRole}`)
    }

    const canManageUsers = user?.role === 'SuperAdmin'
    const canAssignThemes = user?.role === 'SuperAdmin' || user?.role === 'Admin'

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                User Management
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
                Manage user accounts, roles, and theme assignments
            </Typography>

            <List>
                {users.map((u, index) => (
                    <React.Fragment key={u.id}>
                        <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1 }}>
                                <ListItemText
                                    primary={`${u.username} (${u.role})`}
                                    secondary={`Current theme: ${u.theme}`}
                                />

                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    {canManageUsers && (
                                        <FormControl size="small" sx={{ minWidth: 100 }}>
                                            <InputLabel>Role</InputLabel>
                                            <Select
                                                value={u.role}
                                                label="Role"
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            >
                                                <MenuItem value="User">User</MenuItem>
                                                <MenuItem value="Admin">Admin</MenuItem>
                                                <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}

                                    {canAssignThemes && (
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleThemeAssignment(u.id, 'light')}
                                                disabled={u.theme === 'light'}
                                            >
                                                Light
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleThemeAssignment(u.id, 'dark')}
                                                disabled={u.theme === 'dark'}
                                            >
                                                Dark
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleThemeAssignment(u.id, 'auto')}
                                                disabled={u.theme === 'auto'}
                                            >
                                                Auto
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </ListItem>
                        {index < users.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    )
})

UserManagement.displayName = 'UserManagement'

export default UserManagement