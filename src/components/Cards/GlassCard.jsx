import React from 'react'
import { Paper } from '@mui/material'

export default function GlassCard({ children, sx }) {
  return (
    <Paper className="glass" sx={{ p: 2, ...sx }}>
      {children}
    </Paper>
  )
}
