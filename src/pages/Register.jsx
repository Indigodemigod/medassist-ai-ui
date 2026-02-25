import React, { useState, useEffect } from 'react'
import { Box, TextField, Typography, IconButton, InputAdornment, Button, CircularProgress } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import GlassCard from '../components/Cards/GlassCard'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { token, register } = useAuth()
  const navigate = useNavigate()
  useEffect(() => { if (token) navigate('/') }, [token])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setError(null)
    if (!name || !email || !password) return setError('Please fill all fields')
    if (password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try {
      const payload = { full_name: name, email, password }
      console.debug('Register payload:', payload)
      await register({ name, email, password })
      // AuthContext.register will transform `name` -> `full_name` for the API
      navigate('/')
    } catch (err) {
      const data = err?.response?.data
      const msg =
        data?.detail || data?.message || (data && JSON.stringify(data)) || 'Registration failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Box sx={{ width: 480 }}>
        <GlassCard sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>Create account</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Start using MediAssist AI</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
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
            <TextField label="Confirm password" type={show ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} fullWidth />

            {error && <Typography color="error">{error}</Typography>}

            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Create account'}
            </Button>
          </Box>
        </GlassCard>
      </Box>
    </Box>
  )
}
