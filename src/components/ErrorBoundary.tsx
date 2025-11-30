import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Typography, Button, Paper, Alert } from '@mui/material'
import { Error, Refresh } from '@mui/icons-material'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
    errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
        this.setState({
            error,
            errorInfo,
        })
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        p: 3,
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            maxWidth: 500,
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <Error
                            sx={{
                                fontSize: 64,
                                color: 'error.main',
                                mb: 2,
                            }}
                        />
                        <Typography variant="h5" gutterBottom color="error">
                            Something went wrong
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                            An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
                        </Typography>

                        <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                            <Typography variant="body2" component="div">
                                <strong>Error:</strong> {this.state.error?.message}
                            </Typography>
                            {this.state.errorInfo && (
                                <details style={{ marginTop: 8 }}>
                                    <summary>Stack Trace</summary>
                                    <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                                        {this.state.error?.stack}
                                    </pre>
                                </details>
                            )}
                        </Alert>

                        <Button
                            variant="contained"
                            startIcon={<Refresh />}
                            onClick={this.handleRetry}
                            sx={{ mr: 2 }}
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </Button>
                    </Paper>
                </Box>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary