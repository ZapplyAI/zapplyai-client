import { useEffect, useState } from 'react'

const useSubscriptionPlans = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        console.log('Fetching subscription plans...')
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
            cache: 'no-store',
          }
        )

        console.log('res', res)

        if (!res.ok) throw new Error('Failed to fetch subscription plans')

        const data = await res.json()
        console.log('data', data)
        setSubscriptionPlans(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptionPlans()
  }, [])

  return { subscriptionPlans, loading, error }
}

export default useSubscriptionPlans
