import { axios } from '@/lib'
import { customFetch, Response } from '@/services'

const session = {
  initialize: async (name: string): Promise<Response> => {
    try {
      console.log('SESSION -> /projects/start/')
      return await customFetch('/projects/start/', 'post', {
        name,
      })
    } catch (e) {
      console.log(e)
      return {
        success: false,
      }
    }
  },
  prompt: async (
    message: string,
    dialogId: string,
    currentStep: string
  ): Promise<Response> => {
    try {
      console.log('SESSION -> /projects/interact/')
      return await customFetch('/projects/interact/', 'post', {
        app_ref: dialogId,
        response: message,
        current_step: currentStep,
      })
    } catch (e) {
      console.log(e)

      return {
        success: false,
      }
    }
  },
  build: async ({ ref }: { ref: string }): Promise<Response> => {
    try {
      return await customFetch('/projects/build/', 'post', {
        app_ref: ref,
      })
    } catch (e) {
      return {
        success: false,
        response: e,
      }
    }
  },
  getApp: async ({ ref }: { ref: string }): Promise<Response> => {
    try {
      return await customFetch(
        `/projects/app/${ref}/`,
        'get'
      )

    } catch (e) {
      return {
        success: false,
      }
    }
  },
}

export default session
