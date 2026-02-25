import api from './axios'

export const getUserSummary = () => api.get('/user/summary')
