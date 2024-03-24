import { axios } from '@/lib'

import { Response, Session } from '@/services'

const session = {
  initialize: async (name: string): Promise<Response> => {
    try {
      const { status, data: response } = await axios.post('/projects/start/', {
        name,
      })

      if (status === 200) {
        return {
          success: response.success,
          response: response.data,
        }
      }

      return {
        success: false,
      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
      }
    }
  },
  prompt: async ({ prompt, ref }: Session): Promise<Response> => {
    try {
      const { status, data: response } = await axios.post(
        '/projects/interact/',
        {
          app_ref: ref,
          response: prompt,
          current_step: 'PROJECT_DESCRIPTION',
        }
      )

      if (status === 200) {
        return {
          success: true,
          response,
        }
      }

      return {
        success: false,
      }
    } catch (e) {
      console.log(e)

      return {
        success: false,
      }
    }
  },
}

export default session
