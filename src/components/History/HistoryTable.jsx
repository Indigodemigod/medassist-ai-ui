import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination, Box } from '@mui/material'
import { fetchPrescriptions } from '../../api/prescriptionApi'

export default function HistoryTable() {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    fetchPrescriptions({ q: query, page: page + 1, per_page: rowsPerPage })
      .then((res) => {
        if (!mounted) return
        setRows(res?.data?.items || [])
      })
      .catch(() => {
        if (!mounted) return
        setRows([])
      })
    return () => (mounted = false)
  }, [page, rowsPerPage, query])

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      </Box>
      <TableContainer component={Paper} className="glass">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Medicines</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.patient || '—'}</TableCell>
                <TableCell>{new Date(r.created_at).toLocaleString()}</TableCell>
                <TableCell>{(r.medicines || []).join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination component="div" count={-1} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage} onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} />
    </Box>
  )
}
