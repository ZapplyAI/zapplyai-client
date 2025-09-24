import { useEffect, useState } from 'react'
import { default as axios } from '@/lib/axios'

const useSubscriptionCheckout = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showModeModal, setShowModeModal] = useState<boolean>(false)
  const [pendingPlanType, setPendingPlanType] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const session = await res.json()
        setIsLoggedIn(!!session?.user)
      } catch (error) {
        console.error('Error checking session:', error)
        setIsLoggedIn(false)
      }
    }

    getSession()
  }, [])

  const handleCheckout = async (planType: string) => {
    setLoading(true)
    setError(null)

    // Always check authentication status fresh before proceeding
    try {
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      const userIsLoggedIn = !!session?.user

      console.log('Checkout - Fresh auth check - isLoggedIn:', userIsLoggedIn)

      // Check if user is logged in
      if (!userIsLoggedIn) {
        console.log('User not logged in - showing modal')
        // User is not logged in, show mode selection modal
        setPendingPlanType(planType)
        setShowModeModal(true)
        setLoading(false);
        return;
      }

      console.log('User is logged in - proceeding with checkout')
    } catch (error) {
      console.error('Error checking authentication:', error)
      // If we can't check auth, assume not logged in and show modal
      setPendingPlanType(planType)
      setShowModeModal(true)
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

  const handleModeSelect = (mode: 'individual' | 'organization') => {
    setShowModeModal(false)
    if (pendingPlanType) {
      // Redirect to auth with the selected mode and plan info
      const currentUrl = window.location.href;
      window.location.href = `/session/auth?mode=${mode}&callback_url=${encodeURIComponent(currentUrl)}&plan=${pendingPlanType}`;
    }
  }

  const handleModalClose = () => {
    setShowModeModal(false)
    setPendingPlanType(null)
    setLoading(false)
  }

  return {
    handleCheckout,
    loading,
    error,
    showModeModal,
    handleModeSelect,
    handleModalClose
  }
}


export default useSubscriptionCheckout
