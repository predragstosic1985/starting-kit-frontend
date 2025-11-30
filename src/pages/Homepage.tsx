import React, { useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material'
import { Menu } from '@mui/icons-material'
import SideMenu from '../components/SideMenu'
import MainLayout from '../components/MainLayout'
import ThemeToggle from '../components/ThemeToggle'
import LanguageSelector from '../components/LanguageSelector'
import { useTranslation } from 'react-i18next'

const Homepage: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [menuOpen, setMenuOpen] = useState(false)
    const { t } = useTranslation()

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const handleMenuClose = () => {
        setMenuOpen(false)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Side Menu */}
            <SideMenu open={menuOpen} onClose={handleMenuClose} />

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* App Bar for mobile menu toggle */}
                {isMobile && (
                    <AppBar position="static" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={handleMenuToggle}
                                sx={{ mr: 2 }}
                            >
                                <Menu />
                            </IconButton>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                {t('app.title')}
                            </Typography>
                            <ThemeToggle />
                        </Toolbar>
                    </AppBar>
                )}

                {/* Desktop header with theme toggle */}
                {!isMobile && (
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="h5">
                            {t('app.title')}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <LanguageSelector />
                            <ThemeToggle />
                        </Box>
                    </Box>
                )}

                {/* Main Layout Area */}
                <MainLayout />
            </Box>
        </Box>
    )
}

export default Homepage