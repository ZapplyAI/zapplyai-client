<<<<<<< HEAD
'use client'

import { session, Session } from '@/services'

export const sendPrompt = async (data: Session) => {
  return await session.prompt(data)
}
=======
'use server'
>>>>>>> 9e860a4b3f9d025b2289feb81ebed609119493dd
