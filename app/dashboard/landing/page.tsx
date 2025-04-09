'use client'
import React, { useState } from 'react'
import { Box, Divider, IconButton, Typography, Snackbar, Alert, Button } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CodeIcon from '@mui/icons-material/Code'
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        maxWidth: '800px',
        alignSelf: 'flex-start',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        VS Code Integration
      </Typography>
      
      <Box 
        sx={{ 
          mb: 4,
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: '#E5E5E5', display: 'flex', alignItems: 'center' }}>
          <CodeIcon 
            sx={{ 
              mr: 1,
              fontSize: 24,
              background: 'linear-gradient(to right, #FFB42A, #F85E8A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }} 
          />
          Your Copilot Access Code
        </Typography>
        
        <Typography sx={{ mb: 3, color: '#AAAAAA', fontSize: '14px' }}>
          Use this code to connect your VS Code instance to Elastic Copilot
        </Typography>

        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #3C3C3C',
            mb: 3,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
        >
          <Typography 
            sx={{ 
              fontFamily: 'monospace',
              fontSize: '16px',
              fontWeight: 400,
              color: '#E5E5E5'
            }}
          >
            {copilotAccessCode || 'No access code available'}
          </Typography>
          <IconButton 
            onClick={handleCopyCode} 
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            aria-label="Copy access code"
          >
            <ContentCopyIcon />
          </IconButton>
        </Box>
      </Box>

      <Box 
        sx={{ 
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: '#E5E5E5' }}>
          Launch VS Code Extension
        </Typography>
        
        <Typography sx={{ mb: 3, color: '#AAAAAA', fontSize: '14px' }}>
          Click the button below to open Elastic Copilot in VS Code
        </Typography>

        <Link href={'vscode://elastic-copilot'} passHref>
          <Button
            variant="contained"
            sx={{ 
              background: 'linear-gradient(to right, #7F5EFC, #F85EC1)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '5px',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': {
                opacity: 0.9,
                background: 'linear-gradient(to right, #7F5EFC, #F85EC1)',
              },
            }}
          >
            Open in VS Code
          </Button>
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
