'use client'

import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoading } = useUser()
  const router = useRouter()

  if (isLoading) return <p>Loading...</p>

  console.log('\n\nuser', user)
  if (!user) {
    router.push('/api/auth/login')
    return null
  }

  return (
    // <SessionProvider>
    //   <AuthGuard>{children}</AuthGuard>
    // </SessionProvider>
    <React.Fragment>{children}</React.Fragment>
  )
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [fakeAuth, setFakeAuth] = useState(false)

  // Load fake auth state from localStorage
  useEffect(() => {
    const isFakeAuth = localStorage.getItem('fakeAuth') === 'true'
    if (isFakeAuth) setFakeAuth(true)
  }, [])

  // Function to enable fake authentication
  const enableFakeAuth = () => {
    localStorage.setItem('fakeAuth', 'true')
    setFakeAuth(true)
  }

  if (fakeAuth) {
    return <>{children}</> // Allow access if fake auth is enabled
  }

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (!session) {
    return (
      <div>
        <h1>Sign In</h1>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>

        {/* Persist fake auth */}
        <button onClick={enableFakeAuth}>
          Continue without authentication
        </button>
      </div>
    )
  }

  return <>{children}</>
}
