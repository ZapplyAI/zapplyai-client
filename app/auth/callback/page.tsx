'use client';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'

export default function AuthCallbackPage() {
  const {getAccessTokenSilently} = useAuth0();

  React.useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();

      console.log(accessToken, 'red flags');
    })()
  }, []);

  return null;
}
