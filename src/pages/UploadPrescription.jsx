import React, { useState } from 'react'
import { Grid, Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material'
import GlassCard from '../components/Cards/GlassCard'
import UploadDropzone from '../components/Upload/UploadDropzone'
import { uploadPrescription } from '../api/prescriptionApi'

export default function UploadPrescription() {
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(false)

  const handleUpload = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    setLoading(true)
    try {
      const res = await uploadPrescription(fd, (e) => {})
      // mock extracted medicines
      setMedicines(res?.data?.medicines || ['Paracetamol 500mg', 'Ibuprofen 200mg'])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <GlassCard sx={{ minHeight: 360 }}>
          <Typography variant="h6">Upload Prescription</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Drop a PDF or image to extract medicines with AI.
          </Typography>
          <UploadDropzone onUpload={handleUpload} loading={loading} />
        </GlassCard>
      </Grid>
      <Grid item xs={12} md={5}>
        <GlassCard>
          <Typography variant="h6">Extracted Medicines</Typography>
          <List>
            {medicines.map((m, i) => (
              <ListItem key={i} divider>
                <ListItemText primary={m} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" disabled={!medicines.length}>
              Save
            </Button>
          </Box>
        </GlassCard>
      </Grid>
    </Grid>
  )
}
