import React from 'react'
import { Typography, Button, Box } from '@mui/material'

const Landing: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                p: 4,
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Starting Kit Frontend
            </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
                A modern, responsive frontend application
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" size="large" href="/login">
                    Get Started
                </Button>
            </Box>
        </Box>
    )
}

export default Landing