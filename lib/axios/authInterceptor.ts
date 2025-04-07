'use client'

import { AxiosInstance } from 'axios'
import { auth0 } from '@/lib/auth0'

/**
 * Adds authentication token to axios requests
 * @param axiosInstance The axios instance to add the interceptor to
 */
export const setupAuthInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async config => {
      try {
        console.log('trying to get auth0 session')
        // Get token directly from Auth0 session
        const session = await auth0.getSession()
        if (!session) {
          console.log('no session')
        }
        console.log('session', session)
        const token = session?.accessToken

        // If we have a token, add it to the request headers
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      } catch (error) {
        console.error('Error adding auth token to request:', error)
        return config
      }
    },
    error => Promise.reject(error)
  )
}
