import { axios } from '@/lib'
import { Response } from '@/services'

const customFetch = async (
  url: string,
  method: string,
  body?: object
): Promise<any> => {
  if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
    return await processUrl_TestMode(url, body ? body : {})
  }

  return await processUrl(url, body ? body : {}, method)
}

const processUrl_TestMode = async (
  url: string,
  body: object
): Promise<Response> => {
  if (url === '/projects/start/') {
    return { success: true, response: { ref: 'testRefNumber_0' } }
  }
  if (url === '/projects/interact/') {
    return {
      success: true,
      response: { response:'Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend  Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend  Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend  Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend  Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend  Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend  Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend Hello from test backend  ' }
    }
  }
  if (url === '/projects/build/') {
    return { success: true, response: {} }
  }
  if (url.includes('/projects/app/')) {
    return {
      success: true,
      response: { front_end: '<div>Hello world from test backend</div>' },
    }
  }

  return { success: false, response: null }
}

const processUrl = async (
  url: string,
  body: object,
  method: string
): Promise<Response> => {
  if (method === 'post') {
    const response = await axios.post(url, body)
    return { success: response.data.success, response: response.data.data }
  }
  if (method === 'get') {
    const response = await axios.get(url, body)
    return { success: true /*response.data.success*/, response: response.data }
  } // TODO: Improve the get app endpoint later.
    // TODO: It should return in the same format as other endpoints

  return { success: false, response: null }
}

export default customFetch
