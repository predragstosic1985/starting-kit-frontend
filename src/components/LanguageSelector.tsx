import React from 'react'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Language } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const LanguageSelector: React.FC = () => {
    const { i18n, t } = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLanguageChange = async (language: string) => {
        await i18n.changeLanguage(language)
        handleClose()
    }

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
    ]

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

    return (
        <>
            <IconButton
                color="inherit"
                onClick={handleClick}
                aria-label="select language"
                aria-haspopup="true"
                title={t('settings.language')}
            >
                <Language />
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
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        selected={language.code === i18n.language}
                    >
                        <ListItemIcon>
                            <span role="img" aria-label={`${language.name} flag`}>
                                {language.flag}
                            </span>
                        </ListItemIcon>
                        <ListItemText primary={language.name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default LanguageSelector