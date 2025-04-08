'use client'
import React, { useState } from 'react'
import { Box, Divider, IconButton, Paper, Typography, Snackbar, Alert } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CodeIcon from '@mui/icons-material/Code'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import { useDashboard } from '../DashboardContext'

export default function LandingPage() {
  const { copilotAccessCode } = useDashboard()
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyCode = () => {
    if (copilotAccessCode) {
      navigator.clipboard.writeText(copilotAccessCode)
      setCopySuccess(true)
    }
  }

  const handleCloseSnackbar = () => {
    setCopySuccess(false)
  }

  const styles = {
    container: {
      width: '100%',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    title: {
      color: '#FFFFFF',
      fontWeight: 500,
      marginBottom: '20px',
    },
    subtitle: {
      color: '#FFFFFF',
      fontWeight: 400,
      marginBottom: '10px',
    },
    description: {
      color: '#FFFFFF',
      fontWeight: 300,
      fontSize: '14px',
      marginBottom: '20px',
    },
    codeContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '500px',
      padding: '15px',
      backgroundColor: '#1B1A20',
      borderRadius: '8px',
      border: '1px solid #3C3C3C',
      marginBottom: '20px',
    },
    codeText: {
      color: '#FFFFFF',
      fontFamily: 'monospace',
      fontSize: '16px',
      fontWeight: 400,
    },
    copyButton: {
      color: '#FFFFFF',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
      },
    },
    buttonContainer: {
      marginTop: '20px',
    },
    vsCodeButton: {
      background: 'linear-gradient(to right, #7F5EFC, #F85EC1)',
      color: '#FFFFFF',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '14px',
      '&:hover': {
        opacity: 0.9,
      },
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    codeIcon: {
      fontSize: 40,
      background: 'linear-gradient(to right, #FFB42A, #F85E8A)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginRight: '10px',
    },
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconContainer}>
        <CodeIcon sx={styles.codeIcon} />
        <Typography variant="h5" sx={styles.title}>
          VS Code Integration
        </Typography>
      </Box>

      <Typography variant="h6" sx={styles.subtitle}>
        Your Copilot Access Code
      </Typography>
      
      <Typography sx={styles.description}>
        Use this code to connect your VS Code instance to Elastic Copilot
      </Typography>

      <Box sx={styles.codeContainer}>
        <Typography sx={styles.codeText}>
          {copilotAccessCode || 'No access code available'}
        </Typography>
        <IconButton 
          onClick={handleCopyCode} 
          sx={styles.copyButton}
          aria-label="Copy access code"
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: '#3C3C3C', width: '100%', maxWidth: '500px', margin: '20px 0' }} />

      <Typography sx={styles.description}>
        Click the button below to open Elastic Copilot in VS Code
      </Typography>

      <Box sx={styles.buttonContainer}>
        <Link href={'vscode://elastic-copilot'} passHref>
          <button style={styles.vsCodeButton}>Open in VS Code</button>
        </Link>
      </Box>

      <Snackbar 
        open={copySuccess} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Access code copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  )
}
