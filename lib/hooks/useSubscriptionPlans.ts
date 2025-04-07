import { useEffect, useState } from 'react'
import _axios from '@/lib/axios'

const useSubscriptionPlans = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscriptionPlans = async () => {
    console.log('\n\n Fetching subscription plans...')

    try {
      const { data: response, status } = await _axios.get(
        '/subscriptions/plans'
      )

      console.log('\ndata', response)
      setSubscriptionPlans(response.plans)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSubscriptionPlans()
  }, [])

  return { subscriptionPlans, loading, error }
}

export default useSubscriptionPlans
