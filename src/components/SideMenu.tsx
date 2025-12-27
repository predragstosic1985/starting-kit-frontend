import React from 'react'
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import {
    Home,
    Person,
    Settings,
    Logout,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

interface SideMenuProps {
    open: boolean
    onClose: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onClose }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const { t } = useTranslation()

    const menuItems = [
        { text: t('nav.home'), icon: <Home />, path: '/home' },
        { text: t('nav.profiles'), icon: <Person />, path: '/profiles' },
        { text: t('nav.settings'), icon: <Settings />, path: '/settings' },
    ]

    // Add admin menu item for SuperAdmin and Admin
    if (user?.role === 'SuperAdmin' || user?.role === 'Admin') {
        menuItems.push({ text: 'Admin Panel', icon: <Settings />, path: '/admin' })
    }

    const handleMenuClick = (path: string) => {
        navigate(path)
        if (isMobile) {
            onClose()
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/')
        if (isMobile) {
            onClose()
        }
    }

    const drawerContent = (
        <Box sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton onClick={() => handleMenuClick(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary={t('nav.logout')} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? open : true}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    position: isMobile ? 'absolute' : 'relative',
                    width: 250,
                    boxSizing: 'border-box',
                },
            }}
        >
            {drawerContent}
        </Drawer>
    )
}

export default SideMenu