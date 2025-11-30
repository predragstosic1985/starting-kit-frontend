import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

export const useResponsive = () => {
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    return {
        isMobile,
        isTablet,
        isDesktop,
    }
}

export const responsiveStyles = {
    container: {
        padding: '16px',
        '@media (min-width:600px)': {
            padding: '24px',
        },
        '@media (min-width:960px)': {
            padding: '32px',
        },
    },
}