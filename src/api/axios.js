import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' }
})

// Attach JWT if available
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('ma:token')
    if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
  } catch (e) {}
  return config
})

// Global response handler: auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status
    if (status === 401) {
      try {
        localStorage.removeItem('ma:token')
        localStorage.removeItem('ma:user')
      } catch (e) {}
      // redirect to login page
      if (typeof window !== 'undefined') window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
