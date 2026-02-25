import React from 'react'
import { Box } from '@mui/material'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'

export default function Layout({ children }) {
  return (
    <Box className="app-shell">
      <Sidebar />
      <Box component="main" sx={{ flex: 1, p: 3, minHeight: '100vh' }}>
        <Topbar />
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </Box>
  )
}
