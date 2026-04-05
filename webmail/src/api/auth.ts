import apiClient from './client'

export const authApi = {
  checkAuth: () => apiClient.get('/auth/me'),
}