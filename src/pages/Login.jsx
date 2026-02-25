import React, { useState, useEffect } from 'react'
import { Box, Paper, TextField, Typography, IconButton, InputAdornment, Button, CircularProgress, Link } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import GlassCard from '../components/Cards/GlassCard'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

export default function Login() {
  const { token, login } = useAuth()
  const navigate = useNavigate()
  useEffect(() => { if (token) navigate('/') }, [token])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setError(null)
    if (!email || !password) return setError('Please provide email and password')
    setLoading(true)
    try {
      const payload = { email, password }
      console.debug('Login payload:', payload)
      await login(payload)
      navigate('/')
    } catch (err) {
      const data = err?.response?.data
      const msg = data?.detail || data?.message || (data && JSON.stringify(data)) || 'Login failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Box sx={{ width: 420 }}>
        <GlassCard sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>Sign in to MediAssist AI</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Enter your credentials to continue</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField
              label="Password"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShow((s) => !s)} edge="end">{show ? <VisibilityOff /> : <Visibility />}</IconButton>
                  </InputAdornment>
                )
              }}
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign in'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">Don't have an account? <Link component={RouterLink} to="/register">Register</Link></Typography>
            </Box>
          </Box>
        </GlassCard>
      </Box>
    </Box>
  )
}
