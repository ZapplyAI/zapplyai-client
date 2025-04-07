import React from 'react'
import { Box, Divider, IconButton, Paper, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CodeIcon from '@mui/icons-material/Code'
import Button from '@/components/Button/Button'
import { auth0 } from '@/lib/auth0'
import Link from 'next/link'

export default async function LandingPage() {
  const session = await auth0.getSession();
  console.log(session);
  // Show loading state
  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }

  // Show error state
  // if (error) {
  //   return (
  //     <Box sx={{ padding: '40px' }}>
  //       <Typography variant="h6" color="error">
  //         Authentication Error: {error.message}
  //       </Typography>
  //       <Button
  //         label="Try Again"
  //         action={() => window.location.href = '/api/auth/login'}
  //         sx={{ marginTop: '20px' }}
  //       />
  //     </Box>
  //   )
  // }

  // // Show not authenticated state
  // if (!user && !token) {
  //   return (
  //     <Box sx={{ padding: '40px' }}>
  //       <Typography variant="h6">
  //         You need to be authenticated to access this page
  //       </Typography>
  //       <Button
  //         label="Login"
  //         action={() => window.location.href = '/api/auth/login'}
  //         sx={{ marginTop: '20px' }}
  //       />
  //     </Box>
  //   )
  // }

  const openInVSCode = () => {
    console.log(session);
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
      {/* Authentication Status */}
      <Paper sx={styles.authInfoContainer}>
        <Typography variant="h6" sx={styles.authStatusText}>
          {/*{authStatus}*/}
        </Typography>

        {/*{debugInfo && (*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      marginBottom: '15px',*/}
        {/*      backgroundColor: '#2D2D33',*/}
        {/*      padding: '10px',*/}
        {/*      borderRadius: '4px',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Typography variant="subtitle2" sx={{ color: '#FFA500' }}>*/}
        {/*      Debug Information:*/}
        {/*    </Typography>*/}
        {/*    <Typography*/}
        {/*      sx={{*/}
        {/*        color: '#E0E0E0',*/}
        {/*        fontFamily: 'monospace',*/}
        {/*        fontSize: '12px',*/}
        {/*        whiteSpace: 'pre-wrap',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {debugInfo}*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/*)}*/}

        {/*{user && (*/}
        {/*  <Box sx={{ marginBottom: '15px' }}>*/}
        {/*    <Typography variant="subtitle1" sx={{ color: 'white' }}>*/}
        {/*      User Information:*/}
        {/*    </Typography>*/}
        {/*    <Typography sx={{ color: '#E0E0E0' }}>*/}
        {/*      /!*Email: {user.email}*!/*/}
        {/*    </Typography>*/}
        {/*    <Typography sx={{ color: '#E0E0E0' }}>*/}
        {/*      /!*Name: {user.name}*!/*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/*)}*/}

        {/*{token && (*/}
        {/*  <>*/}
        {/*    <Divider sx={{ backgroundColor: '#3C3C3C', margin: '15px 0' }} />*/}
        {/*    <Typography variant="subtitle1" sx={{ color: 'white' }}>*/}
        {/*      Authentication Token:*/}
        {/*    </Typography>*/}
        {/*    <Box sx={styles.tokenContainer}>*/}
        {/*      /!*<Typography sx={styles.tokenText}>{token}</Typography>*!/*/}
        {/*    </Box>*/}
        {/*    <Button*/}
        {/*      label="Copy Token"*/}
        {/*      // action={handleCopyToken}*/}
        {/*      sx={{ ...styles.customButton, marginTop: '10px' }}*/}
        {/*    />*/}
        {/*    <Button*/}
        {/*      label="Refresh Auth Status"*/}
        {/*      action={() => window.location.reload()}*/}
        {/*      sx={{*/}
        {/*        ...styles.customButton,*/}
        {/*        marginTop: '10px',*/}
        {/*        marginLeft: '10px',*/}
        {/*        background: '#4CAF50',*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*)}*/}
      </Paper>

      <Divider sx={{ backgroundColor: '#3C3C3C', margin: '30px 0' }} />

      {/*<Typography sx={styles.description}>*/}
      {/*  Use the number below to connect your VS Code instance to our platform*/}
      {/*</Typography>*/}

      <Box sx={styles.buttonContainer}>
        <Link href={'vscode://elastic-copilot'}>
          <button>
            Open in VS Code
          </button>
        </Link>
      </Box>
    </Box>
  )
}
