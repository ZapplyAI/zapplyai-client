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

  if (!origin) {
    return null
  }

  return (
    <Auth0Provider
      domain="dev-mhc4mu6nlyr1i18g.uk.auth0.com"
      clientId="8Mz9p8RGlfYsVeNItgVlRVmpF5VPHdS5"
      authorizationParams={{
        redirect_uri: origin,
      }}
    >
      {children}
    </Auth0Provider>
  )
} 