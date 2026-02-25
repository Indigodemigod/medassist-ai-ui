import React, { useCallback, useRef, useState } from 'react'
import { Box, Button, LinearProgress, Typography } from '@mui/material'

export default function UploadDropzone({ onUpload, loading }) {
  const [hover, setHover] = useState(false)
  const fileRef = useRef()

  const handleFiles = useCallback(
    (files) => {
      const f = files[0]
      if (f && onUpload) onUpload(f)
    },
    [onUpload]
  )

  return (
    <Box>
      <Box
        onDragOver={(e) => {
          e.preventDefault(); setHover(true)
        }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault(); setHover(false); handleFiles(e.dataTransfer.files)
        }}
        sx={{ border: '2px dashed rgba(0,0,0,0.08)', p: 4, borderRadius: 2, textAlign: 'center', cursor: 'pointer' }}
        onClick={() => fileRef.current.click()}
      >
        <Typography variant="body1">Drag & drop a file here, or click to browse</Typography>
        <Typography color="text.secondary" variant="caption">PDF, PNG, JPG — max 10MB</Typography>
        <input ref={fileRef} type="file" hidden onChange={(e) => handleFiles(e.target.files)} />
      </Box>
      {loading && <LinearProgress sx={{ mt: 2 }} />}
    </Box>
  )
}
