import { useEffect, useState } from 'react'
import { default as axios } from '@/lib/axios'
import { useUser } from '@auth0/nextjs-auth0'

const useSubscriptionCheckout = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  // const {user} = useUser();

  const handleCheckout = async (planType: string) => {
    setLoading(true)
    setError(null)

    try {
      const { status, data: response } = await axios.post('https://copilot-api-go-test-739610349551.europe-west2.run.app/api/subscriptions/payments', {
        plan: planType,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?paymentStatus=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      })

      if (status >= 200 && response.data && response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
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
