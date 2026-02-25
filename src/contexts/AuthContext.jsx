import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin, register as apiRegister } from '../api/authApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ma:token'))
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ma:user')) || null
    } catch (e) {
      return null
    }
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (token) localStorage.setItem('ma:token', token)
    else localStorage.removeItem('ma:token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('ma:user', JSON.stringify(user))
    else localStorage.removeItem('ma:user')
  }, [user])

  const login = async ({ email, password }) => {
    const res = await apiLogin({ email, password })
    // support multiple token field names from different backends
    console.debug('Auth login response:', res?.data)
    const data = res?.data || {}
    const t = data.token || data.access_token || data.accessToken || null
    const u = data.user || data.user_profile || data.profile || null
    if (t) {
      try { localStorage.setItem('ma:token', t) } catch (e) {}
      setToken(t)
    }
    if (u) {
      try { localStorage.setItem('ma:user', JSON.stringify(u)) } catch (e) {}
      setUser(u)
    }
    return res
  }

  const register = async ({ name, email, password }) => {
    // backend expects `full_name` field in request body
    const payload = { full_name: name, email, password }
    const res = await apiRegister(payload)
    console.debug('Auth register response:', res?.data)
    const data = res?.data || {}
    const t = data.token || data.access_token || data.accessToken || null
    const u = data.user || data.user_profile || data.profile || null
    if (t) {
      try { localStorage.setItem('ma:token', t) } catch (e) {}
      setToken(t)
    }
    if (u) {
      try { localStorage.setItem('ma:user', JSON.stringify(u)) } catch (e) {}
      setUser(u)
    }
    return res
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('ma:token')
    localStorage.removeItem('ma:user')
    navigate('/login')
  }

  return <AuthContext.Provider value={{ token, user, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
