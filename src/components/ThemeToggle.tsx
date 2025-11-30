import React from 'react'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Brightness4, Brightness7, BrightnessAuto } from '@mui/icons-material'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
    const { mode, setMode } = useTheme()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleModeChange = (newMode: 'light' | 'dark' | 'auto') => {
        setMode(newMode)
        handleClose()
    }

    const getIcon = () => {
        switch (mode) {
            case 'light':
                return <Brightness7 />
            case 'dark':
                return <Brightness4 />
            case 'auto':
                return <BrightnessAuto />
            default:
                return <Brightness7 />
        }
    }

    return (
        <>
            <IconButton
                color="inherit"
                onClick={handleClick}
                aria-label="toggle theme"
                aria-haspopup="true"
            >
                {getIcon()}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    onClick={() => handleModeChange('light')}
                    selected={mode === 'light'}
                >
                    <ListItemIcon>
                        <Brightness7 />
                    </ListItemIcon>
                    <ListItemText primary="Light" />
                </MenuItem>
                <MenuItem
                    onClick={() => handleModeChange('dark')}
                    selected={mode === 'dark'}
                >
                    <ListItemIcon>
                        <Brightness4 />
                    </ListItemIcon>
                    <ListItemText primary="Dark" />
                </MenuItem>
                <MenuItem
                    onClick={() => handleModeChange('auto')}
                    selected={mode === 'auto'}
                >
                    <ListItemIcon>
                        <BrightnessAuto />
                    </ListItemIcon>
                    <ListItemText primary="Auto" />
                </MenuItem>
            </Menu>
        </>
    )
}

export default ThemeToggle