import axios, { AxiosInstance } from 'axios'
import { showToastAndThen, showErrorToast } from '@/lib/toast'
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

// Add response interceptor to handle API errors
server.interceptors.response.use(
  response => response,
  error => {
    if (typeof window !== 'undefined') {
      // Check if the error is a 401 Unauthorized response
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized access detected, redirecting to logout')
        // Show toast notification and then redirect to the Auth0 logout endpoint
        showToastAndThen(
          'Your session has expired. You will be logged out.',
          'warning',
          () => {
            window.location.href = '/auth/logout'
          },
          2000 // 2 seconds delay before redirecting
        )
      }
      // Handle other API errors
      else if (error.response) {
        // Get error message from the response
        const errorMessage = error.response.data?.detail ||
                            error.response.data?.message ||
                            error.response.data?.error ||
                            `Error ${error.response.status}: ${error.response.statusText}`;

        // Show error toast
        showErrorToast(errorMessage);

        console.error('API Error:', errorMessage);
      }
      // Handle network errors
      else if (error.request) {
        // The request was made but no response was received
        showErrorToast('Network error. Please check your connection.');

        console.error('Network Error:', error.message);
      }
      // Handle other errors
      else {
        showErrorToast('An unexpected error occurred.');

        console.error('Error:', error.message);
      }
    }

    return Promise.reject(error)
  }
)

export default server;
