import React from 'react'
import { Paper, Typography, Box } from '@mui/material'

export default function StatCard({ title, value, icon }) {
  return (
    <Paper className="glass fade-in" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ width: 56, height: 56, borderRadius: 2, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))' }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Paper>
  )
}
