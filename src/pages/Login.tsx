import React from 'react'
import { Typography, Box } from '@mui/material'
import LoginForm from '../components/LoginForm'

const Login: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 4,
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <LoginForm />
        </Box>
    )
}

export default Login