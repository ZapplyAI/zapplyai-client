import { useEffect, useState } from 'react'
import { default as axios } from '@/lib/axios'
import { useUser } from '@auth0/nextjs-auth0'

const useSubscriptionCheckout = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoading } = useUser();

  const handleCheckout = async (planType: string) => {
    setLoading(true)
    setError(null)

    // Check if user is logged in
    if (!isLoading && !user) {
      // User is not logged in, redirect to login page
      // Add callback_url parameter to redirect back to the current page after login
      const currentUrl = window.location.href;
      window.location.href = `/session/auth?callback_url=${encodeURIComponent(currentUrl)}`;
      setLoading(false);
      return;
    }

    try {
      if (!planType || planType.toLowerCase() === 'free') {
        // If the plan type is 'free', redirect to the dashboard directly
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?`;
        return;
      }

      const { status, data: response } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/payments`, {
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
