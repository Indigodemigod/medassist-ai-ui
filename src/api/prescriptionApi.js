import api from './axios'

export const uploadPrescription = (formData, onUploadProgress) =>
	api.post('/prescriptions', formData, { onUploadProgress })

export const fetchPrescriptions = () => api.get('/prescriptions')

