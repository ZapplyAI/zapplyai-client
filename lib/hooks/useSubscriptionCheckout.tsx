import { useEffect, useState } from 'react'
import _axios from '@/lib/axios'
import axios from 'axios'

const useSubscriptionCheckout = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (planId: string) => {
    setLoading(true)
    setError(null)

    try {
      console.log('About to call Next.js api route')
      const { data } = await axios.post('/api/subscriptions/payments', {
        plan_id: planId,
        success_url: '/dashboard',
        cancel_url: '/dashboard',
      })

      console.log('Checkout success:', data)
    } catch (err: any) {
      console.error('Checkout failed:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { handleCheckout, loading, error }
}


export default useSubscriptionCheckout
