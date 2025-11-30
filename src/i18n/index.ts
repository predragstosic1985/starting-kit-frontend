import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation resources
const resources = {
    en: {
        translation: {
            // Common
            "app.title": "Starting Kit Frontend",
            "app.description": "A modern, responsive frontend application",

            // Navigation
            "nav.home": "Home",
            "nav.profile": "Profile",
            "nav.settings": "Settings",
            "nav.logout": "Logout",

            // Authentication
            "auth.login": "Login",
            "auth.username": "Username",
            "auth.password": "Password",
            "auth.signIn": "Sign In",
            "auth.invalidCredentials": "Invalid credentials",

            // Landing
            "landing.welcome": "Welcome",
            "landing.description": "Experience our modern, responsive application",

            // Themes
            "theme.light": "Light",
            "theme.dark": "Dark",
            "theme.auto": "Auto",

            // Settings
            "settings.title": "Settings",
            "settings.theme": "Theme",
            "settings.language": "Language",
        }
    },
    es: {
        translation: {
            // Common
            "app.title": "Kit de Inicio Frontend",
            "app.description": "Una aplicación frontend moderna y responsiva",

            // Navigation
            "nav.home": "Inicio",
            "nav.profile": "Perfil",
            "nav.settings": "Configuración",
            "nav.logout": "Cerrar Sesión",

            // Authentication
            "auth.login": "Iniciar Sesión",
            "auth.username": "Usuario",
            "auth.password": "Contraseña",
            "auth.signIn": "Iniciar Sesión",
            "auth.invalidCredentials": "Credenciales inválidas",

            // Landing
            "landing.welcome": "Bienvenido",
            "landing.description": "Experimenta nuestra aplicación moderna y responsiva",

            // Themes
            "theme.light": "Claro",
            "theme.dark": "Oscuro",
            "theme.auto": "Automático",

            // Settings
            "settings.title": "Configuración",
            "settings.theme": "Tema",
            "settings.language": "Idioma",
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'en', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        react: {
            useSuspense: false,
        },
    })

// Save language preference
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng)
})

export default i18n