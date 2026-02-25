import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './theme/theme'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import UploadPrescription from './pages/UploadPrescription'
import ChatAssistant from './pages/ChatAssistant'
import History from './pages/History'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import { ThemeModeProvider, useThemeMode } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'

function AppInner() {
  const { dark } = useThemeMode()

  return (
    <ThemeProvider theme={getTheme(dark)}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><Layout><UploadPrescription /></Layout></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Layout><ChatAssistant /></Layout></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><Layout><History /></Layout></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

// Note: Login and Register are imported at top; they render inside AuthProvider

export default function App() {
  return (
    <ThemeModeProvider>
      <AppInner />
    </ThemeModeProvider>
  )
}
