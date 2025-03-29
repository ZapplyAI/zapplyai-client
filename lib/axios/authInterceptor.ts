'use client'

import { AxiosInstance } from 'axios'
import { getCookie } from 'cookies-next'
import { getSession } from '@auth0/nextjs-auth0/client'

/**
 * Adds authentication token to axios requests
 * @param axiosInstance The axios instance to add the interceptor to
 */
export const setupAuthInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        // Try to get token from cookie first (set by our Auth0 callback)
        let token = getCookie('auth_token') as string | undefined
        
        // If no token in cookie, try to get from Auth0 session
        if (!token) {
          const session = await getSession()
          token = session?.accessToken
        }

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
    (error) => {
      return Promise.reject(error)
    }
  )
}
