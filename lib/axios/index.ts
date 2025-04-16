import axios, { AxiosInstance } from 'axios'
const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const getToken = async (): Promise<string | null> => {
  const { status, data: response } = await axios.get('/api/access')

  if (status === 200 && !!response.session) {
    return response.session
  }

  return null
}

server.interceptors.request.use(async config => {
  const token = await getToken()
  console.log(token, 'see you')

  if (token) {
    // @ts-ignore
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
})

export default server;
