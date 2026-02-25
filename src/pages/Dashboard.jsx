import React from 'react'
import { Grid, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import StatCard from '../components/Cards/StatCard'
import GlassCard from '../components/Cards/GlassCard'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { getUserSummary } from '../api/userApi'


export default function Dashboard() {
  const [summary, setSummary] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getUserSummary()
      .then((res) => {
        setSummary(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch summary:', err)
        setLoading(false)
      })
  }, [])

  const stats = [
    {
      title: 'Total Prescriptions',
      value: summary?.total_prescriptions || 0,
      icon: <InsertDriveFileIcon />
    },
    {
      title: 'Total Medicines',
      value: summary?.total_medicines || 0,
      icon: <LocalHospitalIcon />
    },
    {
      title: 'AI Queries',
      value: summary?.total_questions || 0,
      icon: <SmartToyIcon />
    }
  ]


  return (
    <Box>
      <GlassCard sx={{ p: 3 }}>
        <Typography variant="h4">Welcome back — {summary?.full_name || 'User'}</Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {summary?.last_prescription_name && (
                <TableRow>
                  <TableCell>{new Date(summary.last_prescription_upload_time).toLocaleString()}</TableCell>
                  <TableCell>Uploaded {summary.last_prescription_name}</TableCell>
                  <TableCell>{summary.full_name}</TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
