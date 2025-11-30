import React from 'react'
import { Typography, Box } from '@mui/material'

const Homepage: React.FC = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Homepage
            </Typography>
            <Typography variant="body1">
                Welcome to your homepage! You are logged in.
            </Typography>
        </Box>
    )
}

export default Homepage