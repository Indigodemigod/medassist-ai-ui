import React from 'react'
import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

export default function PrescriptionCard({ prescription, onClick }) {
    return (
        <Card
            className="glass fade-in"
            onClick={() => onClick(prescription)}
            sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{
                        width: 40, height: 40, borderRadius: 1,
                        display: 'grid', placeItems: 'center',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
                    }}>
                        <InsertDriveFileIcon color="primary" />
                    </Box>
                    <Typography variant="h6" noWrap sx={{ maxWidth: 200 }}>
                        {prescription.image_path.split('\\').pop()}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                    {prescription.extracted_text.substring(0, 80)}...
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label={`${prescription.analysis_result.length} Medicines`} size="small" color="primary" variant="outlined" />
                    <Typography variant="caption" color="text.secondary">
                        {new Date(prescription.created_at).toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
