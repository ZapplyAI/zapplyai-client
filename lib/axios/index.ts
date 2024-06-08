import axios, { AxiosInstance } from 'axios'

const _axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEST_MODE ? 'customAPI' : process.env.NEXT_PUBLIC_API_URL,
})

export default _axios
