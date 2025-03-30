'use client'

import { Auth0Provider } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'

export default function Auth0ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [origin, setOrigin] = useState<string>('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
  const redirectUrl = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL

  if (!clientId || !domain || !redirectUrl) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUrl,
      }}
    >
      {children}
    </Auth0Provider>
  )
}
