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
            "nav.profiles": "Profiles",
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

            // Profiles
            "profiles.title": "User Profiles",
            "profiles.loading": "Loading profiles...",
            "profiles.error": "Failed to load profiles",
            "profiles.noUsers": "No users found",
            "profiles.unknownUser": "Unknown User",
            "profiles.userId": "ID: {{id}}",
            "profiles.email": "Email: {{email}}",
            "profiles.role": "Role: {{role}}",
            "profiles.firstName": "First Name: {{firstName}}",
            "profiles.lastName": "Last Name: {{lastName}}",
        }
    },
    de: {
        translation: {
            // Common
            "app.title": "Frontend-Starter-Kit",
            "app.description": "Eine moderne, responsive Frontend-Anwendung",

            // Navigation
            "nav.home": "Startseite",
            "nav.profile": "Profil",
            "nav.profiles": "Benutzerprofile",
            "nav.settings": "Einstellungen",
            "nav.logout": "Abmelden",

            // Authentication
            "auth.login": "Anmelden",
            "auth.username": "Benutzername",
            "auth.password": "Passwort",
            "auth.signIn": "Anmelden",
            "auth.invalidCredentials": "Ungültige Anmeldedaten",

            // Landing
            "landing.welcome": "Willkommen",
            "landing.description": "Erleben Sie unsere moderne, responsive Anwendung",

            // Themes
            "theme.light": "Hell",
            "theme.dark": "Dunkel",
            "theme.auto": "Automatisch",

            // Settings
            "settings.title": "Einstellungen",
            "settings.theme": "Design",
            "settings.language": "Sprache",

            // Profiles
            "profiles.title": "Benutzerprofile",
            "profiles.loading": "Lade Profile...",
            "profiles.error": "Fehler beim Laden der Profile",
            "profiles.noUsers": "Keine Benutzer gefunden",
            "profiles.unknownUser": "Unbekannter Benutzer",
            "profiles.userId": "ID: {{id}}",
            "profiles.email": "E-Mail: {{email}}",
            "profiles.role": "Rolle: {{role}}",
            "profiles.firstName": "Vorname: {{firstName}}",
            "profiles.lastName": "Nachname: {{lastName}}",
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