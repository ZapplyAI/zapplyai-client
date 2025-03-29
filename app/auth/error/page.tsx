'use client'

import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('error') || 'An authentication error occurred'

  const handleRetry = () => {
    router.push('/api/auth/login')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: '#09090E',
        color: 'white',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Authentication Error
      </Typography>
      
      <Typography variant="body1" sx={{ marginBottom: '30px', maxWidth: '600px', textAlign: 'center' }}>
        {errorMessage}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Button
          variant="contained"
          onClick={handleRetry}
          sx={{
            background: 'linear-gradient(to right, #7F5EFC, #F85EC1)',
            color: 'white',
            padding: '10px 20px',
          }}
        >
          Try Again
        </Button>
        
        <Button
          variant="outlined"
          onClick={handleGoHome}
          sx={{
            borderColor: '#5E5E5E',
            color: 'white',
            padding: '10px 20px',
            '&:hover': {
              borderColor: 'white',
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  )
}
