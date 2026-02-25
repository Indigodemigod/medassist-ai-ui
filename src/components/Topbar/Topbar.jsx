import React from 'react'
import { Box, IconButton, Avatar, FormControlLabel, Switch, Tooltip } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import { useThemeMode } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'

export default function Topbar() {
  const { dark, setDark } = useThemeMode()
  const { logout, user } = useAuth()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ fontSize: 20, fontWeight: 700 }}>Welcome back</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <FormControlLabel
          control={<Switch checked={dark} onChange={(e) => setDark(e.target.checked)} />}
          label="Dark"
        />
        <Avatar>{(user && (user.name || user.email || 'MA')[0]) || 'MA'}</Avatar>
        <Tooltip title="Logout">
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
