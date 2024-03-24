import axios, { AxiosInstance } from 'axios'

console.log(process.env.NEXT_PUBLIC_API_URL)

const _axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default _axios
