'use client'
import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, Divider, IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CodeIcon from '@mui/icons-material/Code'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from '@/components/Button/Button'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function TokenPage() {
  const router = useRouter()
  const [connectionCode, setConnectionCode] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    const loadTokenData = () => {
      try {
        // Get token from cookie
        const authToken = getCookie('auth_token') as string | undefined
        
        // Get connection code from cookie
        const connCode = getCookie('connection_code') as string | undefined
        if (connCode) {
          setConnectionCode(connCode)
        }

        if (authToken) {
          setToken(authToken)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error loading token data:', error)
        setLoading(false)
      }
    }
    
    loadTokenData()
  }, [])

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

  const goToDashboard = () => {
    router.push('/dashboard/landing')
  }

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      background: '#09090E',
      padding: '40px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
    },
    backButton: {
      color: 'white',
      marginRight: '10px',
    },
    tokenContainer: {
      padding: '20px',
      backgroundColor: '#1B1A20',
      borderRadius: '8px',
      border: '1px solid #3C3C3C',
      maxWidth: '800px',
      marginBottom: '30px',
    },
    tokenBox: {
      marginTop: '10px',
      padding: '15px',
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
    codeContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '15px',
      backgroundColor: '#1B1A20',
      borderRadius: '8px',
      border: '1px solid #3C3C3C',
      marginTop: '20px',
      marginBottom: '20px',
      maxWidth: '500px',
    },
    codeText: {
      color: '#fff',
      fontWeight: '200',
    },
    copyButton: {
      color: '#fff',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
      },
    },
    buttonContainer: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px',
    },
    customButton: {
      background: 'linear-gradient(to right, #7F5EFC, #F85EC1)',
      color: '#fff',
      fontWeight: '300',
    },
    dashboardButton: {
      background: '#4CAF50',
      color: '#fff',
      fontWeight: '300',
    },
    description: {
      color: '#9E9E9E',
      fontWeight: '200',
      fontSize: '14px',
      marginBottom: '10px',
      marginTop: '20px',
    },
  }

  if (loading) {
    return (
      <Box sx={styles.container}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading token information...
        </Typography>
      </Box>
    )
  }

  if (!token) {
    return (
      <Box sx={styles.container}>
        <Typography variant="h6" sx={{ color: 'white', marginBottom: '20px' }}>
          Authentication token not found
        </Typography>
        <Button 
          label="Go to Login" 
          action={() => window.location.href = '/api/auth/login'} 
          sx={styles.customButton}
        />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <IconButton onClick={goToDashboard} sx={styles.backButton}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Access Token
        </Typography>
      </Box>

      {/* Token Display Section */}
      <Paper sx={styles.tokenContainer}>
        <Typography variant="h6" sx={{ color: '#4CAF50' }}>
          Authentication Token
        </Typography>
        <Typography sx={{ color: '#9E9E9E', marginBottom: '15px' }}>
          Use this token to authenticate API requests to our platform
        </Typography>

        <Box sx={styles.tokenBox}>
          <Typography sx={styles.tokenText}>
            {token}
          </Typography>
        </Box>
        
        <Button
          label="Copy Token"
          icon={<ContentCopyIcon fontSize="small" />}
          action={handleCopyToken}
          sx={{ ...styles.customButton, marginTop: '15px' }}
        />
      </Paper>

      {/* Connection Code Section */}
      <Typography sx={styles.description}>
        Use this connection code to link VS Code with your account
      </Typography>

      {connectionCode ? (
        <Box sx={styles.codeContainer}>
          <Typography variant="h6" sx={styles.codeText}>
            {connectionCode}
          </Typography>
          <IconButton onClick={handleCopy} sx={styles.copyButton}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={styles.codeContainer}>
          <Typography variant="h6" sx={{...styles.codeText, color: '#ff9800'}}>
            No connection code available
          </Typography>
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={styles.buttonContainer}>
        <Button
          label="Open in VS Code"
          icon={<CodeIcon fontSize="small" />}
          action={openInVSCode}
          sx={styles.customButton}
        />
        
        <Button
          label="Go to Dashboard"
          icon={<ArrowBackIcon fontSize="small" />}
          action={goToDashboard}
          sx={styles.dashboardButton}
        />
      </Box>
    </Box>
  )
}
