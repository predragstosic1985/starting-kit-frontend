import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/Login'))
const Homepage = lazy(() => import('./pages/Homepage'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))

const App: React.FC = () => {
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Homepage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </Layout>
    )
}

export default App