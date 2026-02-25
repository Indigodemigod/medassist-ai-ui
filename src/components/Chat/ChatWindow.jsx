import React, { useEffect, useRef, useState } from 'react'
import { Box, TextField, IconButton, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Message from './Message'
import { sendChat } from '../../api/chatApi'

export default function ChatWindow() {
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Hello — how can I help with your prescription today?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const containerRef = useRef()

  const scrollToBottom = () => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }

  useEffect(() => scrollToBottom(), [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages((m) => [...m, { from: 'user', text: input }])
    const prompt = input
    setInput('')
    setLoading(true)
    try {
      const res = await sendChat({ prompt })
      const reply = res?.data?.reply || 'Sorry, no response.'
      setMessages((m) => [...m, { from: 'ai', text: reply }])
    } catch (err) {
      setMessages((m) => [...m, { from: 'ai', text: 'Error: could not reach AI service.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '60vh' }}>
      <Box ref={containerRef} sx={{ overflowY: 'auto', p: 2, flex: 1 }}>
        {messages.map((m, i) => (
          <Message key={i} from={m.from} text={m.text} />
        ))}
        {loading && <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}><CircularProgress size={18} /></Box>}
      </Box>

      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <TextField fullWidth placeholder="Ask MediAssist..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
        <IconButton color="primary" onClick={handleSend} disabled={loading}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
