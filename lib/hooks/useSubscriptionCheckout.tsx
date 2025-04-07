import { useEffect, useState } from 'react'
import _axios from '@/lib/axios'

const useSubscriptionCheckout = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (planId: string) => {
    setLoading(true)
    console.log('\n\n Subscription Checkout...')

    try {
      const { data } = await _axios.post('/subscriptions/payments', {
        plan_id: planId,
        success_url: '/dashboard',
        cancel_url: '/dashboard',
      })

      console.log('\ndata', data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return { handleCheckout, loading }
}

export default useSubscriptionCheckout
