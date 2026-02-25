import React from 'react'
import GlassCard from '../components/Cards/GlassCard'
import { Typography } from '@mui/material'
import HistoryTable from '../components/History/HistoryTable'

export default function History() {
  return (
    <GlassCard>
      <Typography variant="h6">Prescription History</Typography>
      <HistoryTable />
    </GlassCard>
  )
}
