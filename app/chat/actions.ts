'use server'

import { session, Session } from '@/services'

export const sendPrompt = async (data: Session) => {
  return await session.prompt(data)
}
