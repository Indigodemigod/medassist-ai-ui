import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, CircularProgress } from '@mui/material'
import PrescriptionCard from '../components/Assistant/PrescriptionCard'
import PrescriptionDetailView from '../components/Assistant/PrescriptionDetailView'
import { fetchPrescriptions } from '../api/prescriptionApi'

export default function ChatAssistant() {
  const [prescriptions, setPrescriptions] = useState([])
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrescriptions()
      .then((res) => {
        setPrescriptions(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching prescriptions:', err)
        setLoading(false)
      })
  }, [])

  if (selectedPrescription) {
    return (
      <PrescriptionDetailView
        prescription={selectedPrescription}
        onBack={() => setSelectedPrescription(null)}
      />
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>MediAssist AI Assistant</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>Select a prescription to view detailed analysis and chat with AI</Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {prescriptions.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <PrescriptionCard prescription={p} onClick={setSelectedPrescription} />
            </Grid>
          ))}
          {prescriptions.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center" sx={{ py: 8, opacity: 0.5 }}>
                No prescriptions found. Please upload one in the Dashboard or Upload page.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}

