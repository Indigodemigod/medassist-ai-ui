import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

export default function Message({ from = 'ai', text }) {
  const isUser = from === 'user'
  return (
    <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', mb: 1 }}>
      <Paper sx={{ p: 1.5, maxWidth: '78%', bgcolor: isUser ? 'primary.main' : 'background.paper', color: isUser ? 'primary.contrastText' : 'text.primary' }}>
        <Typography variant="body2">{text}</Typography>
      </Paper>
    </Box>
  )
}
