import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import ProtectedRoute from './components/ProtectedRoute'

const App: React.FC = () => {
    return (
        <Layout>
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
            </Routes>
        </Layout>
    )
}

export default App