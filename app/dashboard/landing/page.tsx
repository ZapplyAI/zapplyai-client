'use client'
import React from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Box, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CodeIcon from '@mui/icons-material/Code'
import Button from '@/components/Button/Button'

export default function LandingPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const randomNumber = '1234567890' // Static random number

  const handleCopy = () => {
    navigator.clipboard.writeText(randomNumber)
  }

  const openInVSCode = () => {
    // This would typically open a deep link to VS Code
    // For now, we'll just open a URL that could be configured to handle VS Code deep linking
    window.open('vscode://elastic/connect', '_blank')
  }

  // Styles based on UpgradeMembership component
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
  }

  return (
    <Box sx={styles.container}>
        <Typography sx={styles.description}>
          Use the number below to connect your VS Code instance to our platform
        </Typography>

        <Box sx={styles.numberContainer}>
          <Typography variant="h6" sx={styles.numberText}>
            {randomNumber}
          </Typography>
          <IconButton onClick={handleCopy} sx={styles.copyButton}>
            <ContentCopyIcon />
          </IconButton>
        </Box>

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
