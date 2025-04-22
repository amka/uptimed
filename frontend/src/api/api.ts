import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
})

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.pathname = '/login'
    }
    return Promise.reject(error)
  }
)

export default {
  // Auth endpoints
  auth: {
    current: () => api.get('/auth/current'),
    login: (data?: object) => api.post('/auth/login', data),
    register: (data?: object) => api.post('/auth/register', data),
    forgotPassword: (email: string) => api.post('/auth/forgot', { email }),
    resetPassword: (token: string, password: string) => api.post('/auth/reset', { token, password }),
    verifyEmail: (token: string) => api.get(`/auth/verify/${token}`),
    magicLink: (email: string) => api.post('/auth/magic-link', { email }),
    validateMagicLink: (token: string) => api.get(`/auth/magic-link/${token}`),
  },
}
