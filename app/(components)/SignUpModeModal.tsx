'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import BusinessIcon from '@mui/icons-material/Business'

interface SignUpModeModalProps {
  open: boolean
  onClose: () => void
  onModeSelect: (mode: 'individual' | 'organization') => void
}

const SignUpModeModal: React.FC<SignUpModeModalProps> = ({
  open,
  onClose,
  onModeSelect,
}) => {
  const handleModeSelect = (mode: 'individual' | 'organization') => {
    onModeSelect(mode)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1B1A20',
          border: '1px solid #3C3C3C',
          borderRadius: '12px',
          color: '#FFFFFF',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 24px 16px 24px',
          color: '#FFFFFF',
          fontFamily: 'Tektur, sans-serif',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Choose Account Type
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: '#AEAEAE',
            '&:hover': {
              color: '#FFFFFF',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '0 24px 24px 24px' }}>
        <Typography
          variant="body2"
          sx={{
            color: '#AEAEAE',
            marginBottom: '24px',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          Select the type of account you want to create or sign in to:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Personal Account Option */}
          <Box
            onClick={() => handleModeSelect('individual')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              border: '1px solid #3C3C3C',
              borderRadius: '8px',
              backgroundColor: '#2D2D33',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#3A3A40',
                borderColor: '#775EFF',
              },
            }}
          >
            <PersonIcon
              sx={{
                color: '#775EFF',
                fontSize: '32px',
                marginRight: '16px',
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'Tektur, sans-serif',
                  marginBottom: '4px',
                }}
              >
                Personal Account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#AEAEAE',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                For individual developers and personal projects
              </Typography>
            </Box>
          </Box>

          {/* Team Account Option */}
          <Box
            onClick={() => handleModeSelect('organization')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              border: '1px solid #3C3C3C',
              borderRadius: '8px',
              backgroundColor: '#2D2D33',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#3A3A40',
                borderColor: '#775EFF',
              },
            }}
          >
            <BusinessIcon
              sx={{
                color: '#775EFF',
                fontSize: '32px',
                marginRight: '16px',
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'Tektur, sans-serif',
                  marginBottom: '4px',
                }}
              >
                Team Account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#AEAEAE',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                For teams and organizations with multiple members
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SignUpModeModal
