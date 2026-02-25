import React from 'react'
import { Grid, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import StatCard from '../components/Cards/StatCard'
import GlassCard from '../components/Cards/GlassCard'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

export default function Dashboard() {
  const stats = [
    { title: 'Total Prescriptions', value: '1,248', icon: <InsertDriveFileIcon /> },
    { title: 'Total Medicines', value: '3,842', icon: <LocalHospitalIcon /> },
    { title: 'AI Queries', value: '9,321', icon: <SmartToyIcon /> },
    { title: 'Risk Alerts', value: '24', icon: <WarningAmberIcon /> }
  ]

  return (
    <Box>
      <GlassCard sx={{ p: 3 }}>
        <Typography variant="h4">Good afternoon — Dr. Smith</Typography>
        <Typography color="text.secondary">Here's the latest from MediAssist AI</Typography>
      </GlassCard>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.title}>
            <StatCard title={s.title} value={s.value} icon={s.icon} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Recent Activity
        </Typography>
        <TableContainer component={Paper} className="glass">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>2m ago</TableCell>
                <TableCell>Uploaded prescription.pdf</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Processed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10m ago</TableCell>
                <TableCell>AI query: drug interactions</TableCell>
                <TableCell>Dr. Smith</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
