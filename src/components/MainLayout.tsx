import React, { useState } from 'react'
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton,
    useTheme,
} from '@mui/material'
import {
    ViewCompact,
    ViewComfy,
    GridView,
    List,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export type LayoutDensity = 'compact' | 'comfortable'
export type LayoutView = 'grid' | 'list'

interface MainLayoutProps {
    children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [density, setDensity] = useState<LayoutDensity>('comfortable')
    const [view, setView] = useState<LayoutView>('grid')

    // Demo content for layout customization
    const demoCards = Array.from({ length: 6 }, (_, i) => (
        <Grid item xs={12} sm={view === 'grid' ? 6 : 12} md={view === 'grid' ? 4 : 12} key={i}>
            <Card
                sx={{
                    height: density === 'compact' ? 120 : 180,
                    transition: 'height 0.3s ease',
                }}
            >
                <CardContent
                    sx={{
                        p: density === 'compact' ? 1.5 : 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant={density === 'compact' ? 'body2' : 'h6'} gutterBottom>
                        Demo Card {i + 1}
                    </Typography>
                    <Typography variant={density === 'compact' ? 'caption' : 'body2'}>
                        This is demo content to showcase layout customization.
                        {density === 'comfortable' && ' Additional content for comfortable layout.'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    ))

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            {/* Layout Controls */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                    Layout Options
                </Typography>

                {/* Density Toggle */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                        onClick={() => setDensity('compact')}
                        color={density === 'compact' ? 'primary' : 'default'}
                        size="small"
                    >
                        <ViewCompact />
                    </IconButton>
                    <IconButton
                        onClick={() => setDensity('comfortable')}
                        color={density === 'comfortable' ? 'primary' : 'default'}
                        size="small"
                    >
                        <ViewComfy />
                    </IconButton>
                </Box>

                {/* View Toggle */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                        onClick={() => setView('grid')}
                        color={view === 'grid' ? 'primary' : 'default'}
                        size="small"
                    >
                        <GridView />
                    </IconButton>
                    <IconButton
                        onClick={() => setView('list')}
                        color={view === 'list' ? 'primary' : 'default'}
                        size="small"
                    >
                        <List />
                    </IconButton>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Paper
                elevation={1}
                sx={{
                    p: density === 'compact' ? 2 : 3,
                    minHeight: 400,
                    transition: 'padding 0.3s ease',
                }}
            >
                {children || (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Welcome to your Homepage
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            This is your customizable main content area. Use the controls above to change the layout density and view mode.
                        </Typography>

                        <Grid container spacing={density === 'compact' ? 1 : 2}>
                            {demoCards}
                        </Grid>
                    </>
                )}
            </Paper>
        </Box>
    )
}

export default MainLayout