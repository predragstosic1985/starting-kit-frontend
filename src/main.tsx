import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ThemeProviderWrapper } from './contexts/ThemeContext.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './i18n/index.ts'
import keycloak from './config/keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration)
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError)
            })
    })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <ReactKeycloakProvider
                    authClient={keycloak}
                    initOptions={{
                        onLoad: 'check-sso',
                        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                        pkceMethod: 'S256',
                        redirectUri: window.location.origin + '/home'
                    }}
                >
                    <ThemeProviderWrapper>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </ThemeProviderWrapper>
                </ReactKeycloakProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
)