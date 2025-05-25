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

  return {
    subscriptionPlans: subscriptionPlans?.filter(
      (plan: any) => plan.type !== 'FREE'
    ) || [],
    loading,
    error,
    refreshPlans: () => fetchSubscriptionPlans(true), // Force refresh when needed
  }
}

export default useSubscriptionPlans
