import { axios } from '@/lib'
import { Response } from '@/services'

import { Session } from '../types'

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
  prompt: async (
    message: Session,
    currentStep?: string
  ): Promise<Response> => {

    try {
      const { status, data: response } = await axios.post(
        '/projects/interact/',
        {
          app_ref: message.ref,
          response: message.prompt,
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
      return {
        success: false,
      }
    }
  },
  build: async ({ ref }: { ref: string }): Promise<Response> => {
    try {
      const { status, data: response } = await axios.post('/projects/build/', {
        app_ref: ref,
      })

      if (status >= 200) {
        return {
          success: true,
          response,
        }
      }

      return {
        success: false,
      }
    } catch (e) {
      return {
        success: false,
      }
    }
  },
  getApp: async ({ ref }: { ref: string }): Promise<Response> => {
    try {
      const { status, data: response } = await axios.get(
        `/projects/app/${ref}/`
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
      return {
        success: false,
      }
    }
  },
}

export default session
