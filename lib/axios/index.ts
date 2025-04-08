import axios, { AxiosInstance } from 'axios'

const _axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Only setup auth interceptor on client side
// if (typeof window !== 'undefined') {
//   setupAuthInterceptor(_axios)
// }

export default _axios
