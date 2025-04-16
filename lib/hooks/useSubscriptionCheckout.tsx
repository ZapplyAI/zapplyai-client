import { useEffect, useState } from 'react'
import { default as axios } from '@/lib/axios'
import { useUser } from '@auth0/nextjs-auth0'

const useSubscriptionCheckout = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  // const {user} = useUser();

  const handleCheckout = async (planId: string) => {
    setLoading(true)
    setError(null)

    try {
      const { status, data: response } = await axios.post('/subscriptions/payments', {
        plan_id: planId,
        success_url: `http://localhost:3000/dashboard?paymentStatus=success`,
        cancel_url: `http://localhost:3000/dashboard`,
      })

      if (status >= 200 && response.data.checkout_url) {
        window.open(response.data.checkout_url);
      }
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
