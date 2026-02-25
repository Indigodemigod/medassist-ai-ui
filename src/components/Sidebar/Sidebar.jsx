import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, IconButton } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ChatIcon from '@mui/icons-material/Chat'
import HistoryIcon from '@mui/icons-material/History'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()
  const menu = [
    { label: 'Dashboard', icon: <DashboardIcon />, to: '/' },
    { label: 'Upload', icon: <UploadFileIcon />, to: '/upload' },
    { label: 'Assistant', icon: <ChatIcon />, to: '/chat' },
    { label: 'History', icon: <HistoryIcon />, to: '/history' }
  ]

  return (
    <Drawer variant="permanent" sx={{ width: 260, [`& .MuiDrawer-paper`]: { width: 260, boxSizing: 'border-box', background: 'transparent', border: 'none', padding: 2 } }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ fontWeight: 700, fontSize: 18 }}>MediAssist AI</Box>
        <IconButton size="small">
          <MenuIcon />
        </IconButton>
      </Box>
      <List>
        {menu.map((m) => (
          <ListItemButton key={m.label} onClick={() => navigate(m.to)} sx={{ borderRadius: 2, mb: 1 }}>
            <ListItemIcon>{m.icon}</ListItemIcon>
            <ListItemText primary={m.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
