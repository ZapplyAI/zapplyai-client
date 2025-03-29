'use client'

import { ReactNode, useEffect } from 'react'
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { getCookie } from 'cookies-next'

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <UserProvider>
      <AuthGuard>{children}</AuthGuard>
    </UserProvider>
  )
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading, error } = useUser()
  const router = useRouter()
  
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        // Check if we have a token in the cookie
        const hasToken = getCookie('auth_token') !== undefined;
        
        // Get current URL and check if we're coming from Auth0 callback with code
        const urlParams = new URLSearchParams(window.location.search);
        const hasAuthCode = urlParams.has('code');
        
        console.log('AuthGuard check - User:', !!user, 'Loading:', isLoading, 'HasToken:', hasToken, 'HasAuthCode:', hasAuthCode);
        
        // Force authentication - prevent direct access to dashboard
        if (!isLoading && !user && !hasToken) {
          console.log('No authentication detected, redirecting to login...');
          // Use window.location.href instead of router.push to avoid CORS issues
          window.location.href = '/api/auth/login';
          return;
        }
        
        // If authenticated, check for valid backend auth
        if (!isLoading && (user || hasToken)) {
          // Verify auth with the backend API
          fetch('/api/auth/me')
            .then(response => response.json())
            .then(data => {
              if (!data.authenticated) {
                console.log('Backend authentication check failed, redirecting to login...');
                window.location.href = '/api/auth/login';
              }
            })
            .catch(err => {
              console.error('Error checking authentication status:', err);
            });
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        // On error, redirect to login
        window.location.href = '/api/auth/login';
      }
    };
    
    // Run authentication check when component mounts or dependencies change
    checkAuthentication();
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ padding: '40px' }}>
        <Typography variant="h6" color="error">
          Authentication Error: {error.message}
        </Typography>
        <Button 
          onClick={() => router.push('/api/auth/login')}
          sx={{ marginTop: '20px' }}
        >
          Try Again
        </Button>
      </Box>
    )
  }

  // Check if we have a token in the cookie
  const hasToken = getCookie('auth_token') !== undefined
  
  // Allow access if user is authenticated or we have a token
  if (user || hasToken) {
    return <>{children}</>
  }

  // This should not be visible as the useEffect should redirect
  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h6">
        Redirecting to login...
      </Typography>
    </Box>
  )
}
