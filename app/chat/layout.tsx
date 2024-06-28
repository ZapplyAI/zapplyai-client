'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

export default function ChatPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const apiAccessToken = useSelector((state: RootState) => state.user.apiAccessToken)
  const router = useRouter()

  useEffect(() => {
    if (!apiAccessToken) {
      router.push('/auth')
    }
  }, [apiAccessToken, router])

  if (!apiAccessToken) {
    return null
  }

  return <React.Fragment>{children}</React.Fragment>
}
