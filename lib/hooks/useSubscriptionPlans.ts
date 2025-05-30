import { useEffect, useState } from 'react'
import { subscriptions } from '@/services'

const useSubscriptionPlans = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscriptionPlans = async (forceRefresh = false) => {
    setLoading(true)
    setError(null)

    try {
      const { success, response } = await subscriptions.getList(forceRefresh)

      if (success) {
        setSubscriptionPlans(response)
      } else {
        setError('Failed to fetch subscription plans')
      }
    } catch (error) {
      console.error('Error in useSubscriptionPlans hook:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptionPlans(false)
  }, [])

  // Create a free plan if it doesn't exist
  const createFreePlan = () => {
    return {
      type: 'FREE',
      monthly_price: '0',
      total_credits: 20,
      buckets: {
        gemini: 5,
        claude: 5,
        gpt: 10
      }
    };
  };

  // Get all plans including FREE
  const getAllPlans = () => {
    if (!subscriptionPlans) return [];

    // Check if FREE plan exists
    const freePlanExists = subscriptionPlans.some((plan: any) => plan.type === 'FREE');

    // If FREE plan doesn't exist, add it
    if (!freePlanExists) {
      return [createFreePlan(), ...subscriptionPlans];
    }

    return subscriptionPlans;
  };

  return {
    subscriptionPlans: getAllPlans(),
    loading,
    error,
    refreshPlans: () => fetchSubscriptionPlans(true), // Force refresh when needed
  }
}

export default useSubscriptionPlans
