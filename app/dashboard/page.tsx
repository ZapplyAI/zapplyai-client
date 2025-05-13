'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard/settings')
  }, [router])

  // Return null or a loading indicator while redirecting
  return null
}
