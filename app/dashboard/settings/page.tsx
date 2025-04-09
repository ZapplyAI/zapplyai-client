'use client'
import React, { useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDashboard } from '../DashboardContext'

export default function SettingsPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { subscriptionType } = useDashboard()
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  
  // Subscription cancellation state
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [isCancelling, setIsCancelling] = useState(false)
  
  const handlePasswordChange = () => {
    setPasswordError('')
    setPasswordSuccess(false)
    
    // Validate inputs
    if (!currentPassword) {
      setPasswordError('Please enter your current password')
      return
    }
    
    if (!newPassword) {
      setPasswordError('Please enter a new password')
      return
    }
    
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }
    
    // Simulate password change
    setIsChangingPassword(true)
    
    setTimeout(() => {
      setIsChangingPassword(false)
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }, 1000)
  }
  
  const handleCancelSubscription = () => {
    setIsCancelling(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsCancelling(false)
      setCancelDialogOpen(false)
      // In a real app, you would update the subscription status in the context
    }, 1000)
  }

  // Get gradient colors based on subscription type
  const getSubscriptionGradient = () => {
    const gradients = {
      plus: ['#7C5EFC', '#F95EC1'],
      team: ['#FFB12E', '#F86682'],
      free: ['#4F4B63', '#4F4B63'],
    };
    return gradients[subscriptionType];
  }

  const [startColor, endColor] = getSubscriptionGradient();

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
        Account Settings
      </Typography>
      
      <Box 
        sx={{ 
          mb: 4,
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          padding: '16px 24px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5', display: 'flex', alignItems: 'center' }}>
          <LockIcon sx={{ mr: 1 }} />
          Change Password
        </Typography>
        
        {passwordSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password changed successfully!
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            error={!!passwordError}
            sx={{ 
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5E5E5E',
                },
                '&:hover fieldset': {
                  borderColor: '#7E7E7E',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#775EFF',
                },
              },
            }}
          />
          
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            sx={{ 
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5E5E5E',
                },
                '&:hover fieldset': {
                  borderColor: '#7E7E7E',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#775EFF',
                },
              },
            }}
          />
          
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            error={!!passwordError}
            helperText={passwordError}
            sx={{ 
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5E5E5E',
                },
                '&:hover fieldset': {
                  borderColor: '#7E7E7E',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#775EFF',
                },
              },
            }}
          />
          
          <Button
            variant="contained"
            onClick={handlePasswordChange}
            disabled={isChangingPassword}
            sx={{ 
              alignSelf: 'flex-start',
              background: 'linear-gradient(to right, #775EFF, #FF5EBF)',
              '&:hover': {
                background: 'linear-gradient(to right, #6A53E5, #E554AB)',
              }
            }}
          >
            {isChangingPassword ? 'Changing...' : 'Change Password'}
          </Button>
        </Box>
      </Box>
      
      {subscriptionType !== 'free' && (
        <Box 
          sx={{ 
            border: '1px solid #5E5E5E',
            borderRadius: '12px',
            padding: '16px 24px',
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5', display: 'flex', alignItems: 'center' }}>
            <CancelIcon sx={{ mr: 1 }} />
            Cancel Subscription
          </Typography>
          
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: '#AAAAAA', mr: 1 }}>
              Your current plan:
            </Typography>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '78px',
                height: '24px',
              }}
            >
              <svg
                width="78"
                height="24"
                viewBox="0 0 78 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="77"
                  height="23"
                  rx="3.5"
                  stroke={`url(#paint0_linear_${subscriptionType})`}
                />
                <defs>
                  <linearGradient
                    id={`paint0_linear_${subscriptionType}`}
                    x1="0"
                    y1="12"
                    x2="78"
                    y2="12"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={startColor} />
                    <stop offset="1" stopColor={endColor} />
                  </linearGradient>
                </defs>
              </svg>

              <Typography 
                variant="body2" 
                sx={{ 
                  position: 'absolute',
                  background: `linear-gradient(to right, ${startColor}, ${endColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '14px',
                  fontWeight: '300',
                  fontFamily: 'Kanit',
                  marginTop: '-2px',
                  textTransform: 'capitalize',
                }}
              >
                {subscriptionType}
              </Typography>
            </Box>
          </Box>
          
          <Typography sx={{ mb: 3, color: '#AAAAAA' }}>
            Cancelling your subscription will downgrade your account to the free plan at the end of your current billing period.
          </Typography>
          
          <Button
            variant="outlined"
            color="error"
            onClick={() => setCancelDialogOpen(true)}
            sx={{ 
              alignSelf: 'flex-start',
              borderColor: '#d32f2f',
              color: '#d32f2f',
              '&:hover': {
                borderColor: '#b71c1c',
                backgroundColor: 'rgba(211, 47, 47, 0.04)',
              }
            }}
          >
            Cancel Subscription
          </Button>
          
          <Dialog
            open={cancelDialogOpen}
            onClose={() => setCancelDialogOpen(false)}
          >
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 2 }}>
                Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
              </DialogContentText>
              <TextField
                autoFocus
                label="Reason for cancellation (optional)"
                fullWidth
                multiline
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#5E5E5E',
                    },
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCancelDialogOpen(false)}>
                Keep Subscription
              </Button>
              <Button 
                onClick={handleCancelSubscription} 
                color="error"
                disabled={isCancelling}
              >
                {isCancelling ? 'Processing...' : 'Confirm Cancellation'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  )
}
