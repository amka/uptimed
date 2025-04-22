// Utilities
import api from '@/api/api'
import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { Md5 } from 'ts-md5';
import type { LoginParams, RegisterParams, ResetPasswordParams, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const user = ref<User | null>()
  const loading = ref(false)
  const error = ref()

  const isAuthenticated = computed(() => token.value !== '')
  const userAvatar = computed(() => `https://gravatar.com/avatar/${Md5.hashStr(user.value!.email)}`)

  const login = async (loginParams: LoginParams) => {
    try {
      loading.value = true
      const response = await api.auth.login(loginParams)
      localStorage.setItem('authToken', response.data.token)
      await fetchCurrentUser()
      error.value = null
      return true
    } catch (err) {
      error.value = isAxiosError(err) ? err.response?.data?.message : 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: RegisterParams) => {
    try {
      loading.value = true
      await api.auth.register(userData)
      error.value = null
      return true
    } catch (err) {
      error.value = isAxiosError(err) ? err.response?.data?.errors : 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const response = await api.auth.current()
      user.value = response.data
      return true
    } catch (err) {
      console.error(err)
      user.value = null
      return false
    }
  }

  const logout = async () => {
    localStorage.removeItem('authToken')
    user.value = null
  }

  const resetPassword = async ({ token, password }: ResetPasswordParams) => {
    try {
      loading.value = true
      await api.auth.resetPassword(token, password)
      error.value = null
      return true
    } catch (err) {
      error.value = isAxiosError(err) ? err.response?.data?.message : 'Password reset failed'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    user, userAvatar, loading, error,
    isAuthenticated,
    login,
    register,
    fetchCurrentUser,
    logout,
    resetPassword,
  }
})
