import React from 'react'
import { Box, Typography, Grid, Paper, Chip, IconButton, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GlassCard from '../Cards/GlassCard'
import ChatWindow from '../Chat/ChatWindow'

export default function PrescriptionDetailView({ prescription, onBack }) {
    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <IconButton onClick={onBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">Prescription Details</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <GlassCard sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">Extracted Analysis</Typography>
                        <Divider sx={{ mb: 2 }} />
                        {prescription.analysis_result.map((med, idx) => (
                            <Paper
                                key={idx}
                                variant="outlined"
                                sx={{
                                    p: 2, mb: 2, borderRadius: 2,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">{med.medicine_name}</Typography>
                                    <Chip label={med.frequency} size="small" color="secondary" />
                                </Box>
                                <Grid container spacing={1} sx={{ mb: 1 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Dosage</Typography>
                                        <Typography variant="body2">{med.dosage}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Duration</Typography>
                                        <Typography variant="body2">{med.duration}</Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant="caption" color="text.secondary">Purpose</Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>{med.purpose}</Typography>

                                <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(255, 152, 0, 0.1)', borderRadius: 1 }}>
                                    <Typography variant="caption" color="warning.main" sx={{ fontWeight: 'bold' }}>Warnings & Side Effects</Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{med.warnings}</Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem', mt: 0.5 }}>{med.common_side_effects}</Typography>
                                </Box>
                            </Paper>
                        ))}
                    </GlassCard>

                    <GlassCard>
                        <Typography variant="h6" gutterBottom color="primary">Raw Extracted Text</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', maxHeight: 300, overflowY: 'auto' }}>
                            {prescription.extracted_text}
                        </Typography>
                    </GlassCard>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Paper className="glass" sx={{ height: '75vh', display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden' }}>
                        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                            <Typography variant="subtitle1">Chat with MediAssist AI</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Specific to this prescription</Typography>
                        </Box>
                        <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
                            <ChatWindow prescriptionId={prescription.id} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
