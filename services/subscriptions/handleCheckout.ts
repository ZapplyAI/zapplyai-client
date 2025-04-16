'use server'

import _axios from '@/lib/axios'
import { cookies } from 'next/headers'

export async function handleCheckoutServer(planId: string) {
  // Get token from cookie
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')?.value

  if (!authToken) {
    throw new Error('Unauthorized')
  }

  const { data } = await _axios.post(
    '/subscriptions/payments',
    {
      plan_id: planId,
      success_url: '/dashboard',
      cancel_url: '/dashboard',
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  )

  return data
}
