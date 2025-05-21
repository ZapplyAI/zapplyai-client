'use client'

import React, { useEffect, useState } from 'react'
import ClippedButton from '@/app/(components)/ClippedButton'
import { useClientMediaQuery } from '@/helpers/IsMobile'

const AuthButton = () => {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      setIsLoggedIn(!!session?.user)
    }

    getSession()
  }, [])

  if (isLoggedIn === null) {
    return <div></div>
  }

  return (
    <a style={{width: isMobile ?  '100%' : 'auto'}} href={isLoggedIn ? '/dashboard/usage' : '/auth/login'}>
      <ClippedButton
        sx={{
          width: isMobile? '100%' : 'auto',
          fontFamily: 'Tektur, sans-serif',
          fontSize: '0.9rem',
          padding: isMobile? '12px 16px' : '8px 16px',
          marginRight: '15px',
        }}
      >
        {isLoggedIn ? 'Go To Dashboard' : 'Sign In'}
      </ClippedButton>
    </a>
  )
}

export default AuthButton
