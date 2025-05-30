import axios from '@/lib/axios'
import { customFetch, Response } from '@/services'

// Cache for the subscription plans
let cachedPlans: any = null
let plansCacheTime: number | null = null
// Cache expiry time in milliseconds (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000

const subscriptions = {
  /**
   * Gets the list of subscription plans
   * @param forceRefresh If true, bypasses the cache and fetches fresh data
   * @returns Promise with the subscription plans
   */
  getList: async (forceRefresh = false): Promise<Response> => {
    try {
      // Check if we have a cached plans that's not expired and forceRefresh is not requested
      const currentTime = Date.now()
      if (!forceRefresh && cachedPlans && plansCacheTime && currentTime < plansCacheTime + CACHE_EXPIRY) {
        return {
          success: true,
          response: cachedPlans
        }
      }

      const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/plans`)

      if (status === 200) {
        // Update cache
        cachedPlans = data.plans || data
        plansCacheTime = currentTime

        return {
          success: true,
          response: cachedPlans
        }
      }

      return {
        success: false,
        response: 'Failed to fetch subscription plans'
      }
    } catch (error) {
      console.error('Error fetching subscription plans:', error)
      return {
        success: false,
        response: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  },

  /**
   * Clears the cached subscription plans
   */
  clearCache: (): void => {
    cachedPlans = null
    plansCacheTime = null
  }
}

export default subscriptions
