'use server'

import _axios from '@/lib/axios'
import { cookies } from 'next/headers'

export async function handleCheckoutServer(planType: string) {
  // Get token from cookie
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')?.value

  if (!authToken) {
    throw new Error('Unauthorized')
  }

  const { data } = await _axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/payments`,
    {
      plan: planType,
      success_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/dashboard?paymentStatus=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/dashboard`,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  )

  return data
}
