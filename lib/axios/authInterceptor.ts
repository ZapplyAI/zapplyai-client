import axios, { AxiosInstance } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { auth0 } from '@/lib/auth0'

export const withAuthInterceptor = async (
  axiosInstance: AxiosInstance,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AxiosInstance> => {
  const session = await auth0.getSession()

  if (!session || !session.accessToken) {
    throw new Error('No access token found in session')
  }

  axiosInstance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${session.accessToken}`
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
