import { auth0 } from '@/lib/auth0'
import axios from 'axios'

// Cache for the subscription plans
let cachedPlans: any = null
let plansCacheTime: number | null = null
// Cache expiry time in milliseconds (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000

export async function GET() {
  try {
    // Check if we have a cached plans that's not expired
    const currentTime = Date.now()
    if (cachedPlans && plansCacheTime && currentTime < plansCacheTime + CACHE_EXPIRY) {
      return Response.json(cachedPlans)
    }


    // Get the session to authenticate the request to the backend
    const session = await auth0.getSession()
    if (!session) {
      return Response.json({
        status: 401,
        statusText: 'Unauthorized',
      }, { status: 401 })
    }

    // Make the request to the backend API
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans`,
      {
        headers: {
          Authorization: `Bearer ${session.tokenSet.accessToken}`,
        },
      }
    )

    // Update cache
    cachedPlans = response.data
    plansCacheTime = currentTime

    return Response.json(cachedPlans)
  } catch (error) {
    console.error('Error fetching subscription plans:', error)
    return Response.json({
      status: 500,
      statusText: 'Internal Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
