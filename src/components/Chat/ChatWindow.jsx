import React, { useEffect, useRef, useState } from 'react'
import { Box, TextField, IconButton, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Message from './Message'
import { sendChat } from '../../api/chatApi'

export default function ChatWindow({ prescriptionId }) {
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Hello — how can I help with what\'s in this prescription?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const containerRef = useRef()

  const scrollToBottom = () => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }

  useEffect(() => scrollToBottom(), [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { from: 'user', text: input }
    setMessages((m) => [...m, userMsg])

    const userQuery = input
    setInput('')
    setLoading(true)

    try {
      const payload = {
        prescription_id: prescriptionId,
        session_id: sessionId,
        user_query: userQuery
      }

      const res = await sendChat(payload)

      const reply = res?.data?.reply || 'Sorry, no response.'
      const newSessionId = res?.data?.session_id || sessionId

      if (!sessionId && newSessionId) setSessionId(newSessionId)

      setMessages((m) => [...m, { from: 'ai', text: reply }])
    } catch (err) {
      setMessages((m) => [...m, { from: 'ai', text: 'Error: could not reach AI service.' }])
    } finally {
      setLoading(false)
    }
  }

  // Show only past 4 messages: 2 from user, 2 from assistant
  // We keep the initial greeting out of this specific count or include it? 
  // User says "show only past 4 msgs 2 from user and 2 assistant response"
  // I'll filter the message list for display.
  const displayMessages = messages.filter(m => m.from !== 'greeting').slice(-4)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box ref={containerRef} sx={{ overflowY: 'auto', p: 1, flex: 1 }}>
        {messages.length === 1 && <Message from={messages[0].from} text={messages[0].text} />}
        {messages.slice(1).slice(-4).map((m, i) => (
          <Message key={i} from={m.from} text={m.text} />
        ))}
        {loading && <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}><CircularProgress size={18} /></Box>}
      </Box>

      <Box sx={{ mt: 1, display: 'flex', gap: 1, p: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask about this prescription..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="glass"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <IconButton color="primary" onClick={handleSend} disabled={loading} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

