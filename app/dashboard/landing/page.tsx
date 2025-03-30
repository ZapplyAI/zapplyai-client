'use client'
import React, { useEffect, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Box, IconButton, Typography, CircularProgress, Avatar, Paper, Divider } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CodeIcon from '@mui/icons-material/Code'
import Button from '@/components/Button/Button'
import { getCookie } from 'cookies-next'
import { useAuth0 } from '@auth0/auth0-react'

export default function LandingPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [connectionCode, setConnectionCode] = useState<string | null>(null)
  const { user, isLoading, error } = useAuth0()
  console.log(user, isLoading, error);
  const [token, setToken] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<string>('Checking authentication...')
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        // Get token from cookie
        const authToken = getCookie('auth_token') as string | undefined

        // Get connection code and original Auth0 code from cookies
        const connCode = getCookie('connection_code') as string | undefined
        if (connCode) {
          setConnectionCode(connCode)
        }

        // Get the original Auth0 code (the one that was sent to the backend)
        const originalAuthCode = getCookie('original_auth_code') as string | undefined

        // Get current URL and check if we're coming from Auth0 callback with code
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // If we have a code in URL but we're on the landing page, this means the callback
        // didn't complete properly. Normally, the code should be exchanged in the Auth0 callback route.
        if (code && window.location.pathname.includes('/dashboard/landing')) {
          setAuthStatus('Warning: Authentication code detected in dashboard URL. This should have been processed by the callback route.');
          setDebugInfo(`Auth code detected in URL: ${code.substring(0, 10)}... 
          This code should have been sent to backend API. Please check server logs.
          Try refreshing or logging in again if authentication is not working.
          To manually test backend code exchange, visit: ${process.env.NEXT_PUBLIC_API_URL || 'https://copilot-api-staging-739610349551.europe-west2.run.app'}/api/auth/access_token?code=${code}`);

          // Remove the code from URL to prevent refresh loops
          const newUrl = window.location.href.split('?')[0];
          window.history.replaceState(null, '', newUrl);
        }

        if (authToken) {
          setToken(authToken)
          setAuthStatus('Authentication successful! Token received from backend.')

          // Build debug info with all relevant authentication details
          let debugDetails = `Token type: ${typeof authToken}, Length: ${authToken.length}`;

          if (connCode) {
            debugDetails += `\nConnection code: ${connCode}`;
          } else {
            debugDetails += `\nNo connection code received from backend API`;
          }

          if (originalAuthCode) {
            debugDetails += `\n\nOriginal Auth0 code: ${originalAuthCode}`;
            debugDetails += `\nThis code was sent to the backend API: ${process.env.NEXT_PUBLIC_API_URL || 'https://copilot-api-staging-739610349551.europe-west2.run.app'}/api/auth/access_token?code=${originalAuthCode}`;
          }

          setDebugInfo(debugDetails);
        } else {
          setAuthStatus('No authentication token found in cookies. Please log in again.');
          setDebugInfo('The authentication process may have failed. Please try logging in again.');
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setAuthStatus(`Authentication check error: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    checkAuthentication()
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  // Show error state
  if (error) {
    return (
      <Box sx={{ padding: '40px' }}>
        <Typography variant="h6" color="error">
          Authentication Error: {error.message}
        </Typography>
        <Button
          label="Try Again"
          action={() => window.location.href = '/api/auth/login'}
          sx={{ marginTop: '20px' }}
        />
      </Box>
    )
  }

  // Show not authenticated state
  if (!user && !token) {
    return (
      <Box sx={{ padding: '40px' }}>
        <Typography variant="h6">
          You need to be authenticated to access this page
        </Typography>
        <Button
          label="Login"
          action={() => window.location.href = '/api/auth/login'}
          sx={{ marginTop: '20px' }}
        />
      </Box>
    )
  }

  const handleCopy = () => {
    if (connectionCode) {
      navigator.clipboard.writeText(connectionCode)
      alert('Connection code copied to clipboard!')
    }
  }

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token)
      alert('Token copied to clipboard!')
    }
  }

  const openInVSCode = () => {
    window.open('vscode://elastic/connect', '_blank')
  }

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      background: '#09090E',
      padding: '40px',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      marginBottom: 3,
    },
    numberContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      padding: '15px',
      backgroundColor: '#1B1A20',
      borderRadius: '8px',
      border: '1px solid #3C3C3C',
      marginTop: 3,
      marginBottom: 3,
      maxWidth: '500px',
    },
    numberText: {
      color: '#fff',
      fontWeight: '200',
    },
    copyButton: {
      color: '#fff',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
      },
    },
    codeIcon: {
      fontSize: 40,
      background: 'linear-gradient(to right, #FFB42A, #F85E8A)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    description: {
      color: '#9E9E9E',
      fontWeight: '200',
      fontSize: '14px',
      marginBottom: 2,
    },
    buttonContainer: {
      marginTop: 2,
    },
    customButton: {
      background: 'linear-gradient(to right, #7F5EFC, #F85EC1)',
      color: '#fff',
      fontWeight: '300',
    },
    authInfoContainer: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#1B1A20',
      borderRadius: '8px',
      border: '1px solid #3C3C3C',
      maxWidth: '800px',
    },
    authStatusText: {
      color: '#4CAF50',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    tokenContainer: {
      marginTop: '10px',
      padding: '10px',
      backgroundColor: '#2D2D33',
      borderRadius: '4px',
      maxHeight: '100px',
      overflowY: 'auto',
      wordBreak: 'break-all',
    },
    tokenText: {
      color: '#E0E0E0',
      fontFamily: 'monospace',
      fontSize: '12px',
    },
  }

  return (
    <Box sx={styles.container}>
        <Typography variant="h4" sx={{ color: 'white', marginBottom: '20px' }}>
          Dashboard Landing
        </Typography>

        {/* Authentication Status */}
        <Paper sx={styles.authInfoContainer}>
          <Typography variant="h6" sx={styles.authStatusText}>
            {authStatus}
          </Typography>

          {debugInfo && (
            <Box sx={{ marginBottom: '15px', backgroundColor: '#2D2D33', padding: '10px', borderRadius: '4px' }}>
              <Typography variant="subtitle2" sx={{ color: '#FFA500' }}>
                Debug Information:
              </Typography>
              <Typography sx={{ color: '#E0E0E0', fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                {debugInfo}
              </Typography>
            </Box>
          )}

          {user && (
            <Box sx={{ marginBottom: '15px' }}>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                User Information:
              </Typography>
              <Typography sx={{ color: '#E0E0E0' }}>
                Email: {user.email}
              </Typography>
              <Typography sx={{ color: '#E0E0E0' }}>
                Name: {user.name}
              </Typography>
            </Box>
          )}

          {token && (
            <>
              <Divider sx={{ backgroundColor: '#3C3C3C', margin: '15px 0' }} />
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                Authentication Token:
              </Typography>
              <Box sx={styles.tokenContainer}>
                <Typography sx={styles.tokenText}>
                  {token}
                </Typography>
              </Box>
              <Button
                label="Copy Token"
                action={handleCopyToken}
                sx={{ ...styles.customButton, marginTop: '10px' }}
              />
              <Button
                label="Refresh Auth Status"
                action={() => window.location.reload()}
                sx={{ ...styles.customButton, marginTop: '10px', marginLeft: '10px', background: '#4CAF50' }}
              />
            </>
          )}
        </Paper>

        <Divider sx={{ backgroundColor: '#3C3C3C', margin: '30px 0' }} />

        <Typography sx={styles.description}>
          Use the number below to connect your VS Code instance to our platform
        </Typography>

        {connectionCode ? (
          <Box sx={styles.numberContainer}>
            <Typography variant="h6" sx={styles.numberText}>
              {connectionCode}
            </Typography>
            <IconButton onClick={handleCopy} sx={styles.copyButton}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
        ) : (
          <Box sx={styles.numberContainer}>
            <Typography variant="h6" sx={{...styles.numberText, color: '#ff9800'}}>
              No connection code received from backend API
            </Typography>
          </Box>
        )}

        <Box sx={styles.buttonContainer}>
          <Button
            label="Open in VS Code"
            action={openInVSCode}
            icon={<CodeIcon fontSize="small" />}
            sx={styles.customButton}
          />
        </Box>
    </Box>
  )
}
