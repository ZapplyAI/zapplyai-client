'use client'
import {
  Box,
  Button,
  Divider,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Avatar
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { auth0 } from '@/lib/auth0'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0'
import useUserProfile from '@/lib/hooks/useUserProfile'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReceiptIcon from '@mui/icons-material/Receipt'
import LogoutIcon from '@mui/icons-material/Logout'
import TransactionHistoryModal from '../(components)/TransactionHistoryModal'

interface UserDetailsProps {
  isMobile?: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({ isMobile = false }) => {
  const { user, error, isLoading } = useUser()
  const { profile, isProfileLoading, profileError } = useUserProfile()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [transactionModalOpen, setTransactionModalOpen] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    // Clear user profile from localStorage on logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfile');
    }
    router.push('/auth/logout')
  }

  const handleTransactionHistory = () => {
    handleMenuClose()
    setTransactionModalOpen(true)
  }

  // If loading, show a loading placeholder
  if (isLoading || isProfileLoading) return null

  // If error loading user, use fake data
  const userData = error ? {
    email: 'fake@gmail.com',
    picture: null,
    name: 'Fake User'
  } : user

  // Get subscription plan name if available
  const subscriptionPlan = profile?.subscription?.plan?.name || 'Free'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
    >
      {isMobile ? (
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            padding: '4px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
        >
          <Avatar
            src={userData?.picture as string | undefined}
            alt="Profile"
            sx={{
              height: '24px',
              width: '24px',
              fontSize: '12px',
              bgcolor: '#775EFF'
            }}
          >
            {userData?.name?.charAt(0) || userData?.email?.charAt(0) || 'U'}
          </Avatar>
        </IconButton>
      ) : (
        <Button
          onClick={handleMenuOpen}
          sx={{
            textTransform: 'none',
            padding: '4px 8px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
          endIcon={<KeyboardArrowDownIcon sx={{ color: '#585858' }} />}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={userData?.picture as string | undefined}
              alt="Profile"
              sx={{
                height: '24px',
                width: '24px',
                marginRight: '8px',
                fontSize: '12px',
                bgcolor: '#775EFF'
              }}
            >
              {userData?.name?.charAt(0) || userData?.email?.charAt(0) || 'U'}
            </Avatar>
            <Typography
              variant="body1"
              sx={{ fontFamily: 'JetBrains Mono', color: '#585858' }}
            >
              {userData?.email}
            </Typography>
          </Box>
        </Button>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1E1E1E',
            border: '1px solid #5E5E5E',
            borderRadius: '8px',
            minWidth: isMobile ? '200px' : '240px',
            marginTop: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {profile && (
          <>
            <Box sx={{ padding: '12px 16px' }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'JetBrains Mono',
                  color: '#9E9E9E',
                  fontSize: '12px'
                }}
              >
                Subscription Plan
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'JetBrains Mono',
                  color: '#E5E5E5',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {subscriptionPlan}
              </Typography>
              {profile.subscription?.status && (
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'JetBrains Mono',
                    color: '#9E9E9E',
                    fontSize: '12px',
                    marginTop: '4px'
                  }}
                >
                  Status: {profile.subscription.status}
                </Typography>
              )}
            </Box>
            <Divider sx={{ backgroundColor: '#5E5E5E' }} />
          </>
        )}
        <MenuItem
          onClick={handleTransactionHistory}
          sx={{
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
        >
          <ReceiptIcon sx={{ color: '#775EFF', marginRight: '8px', fontSize: '18px' }} />
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'JetBrains Mono',
              color: '#E5E5E5',
              fontSize: '14px'
            }}
          >
            Transaction History
          </Typography>
        </MenuItem>
        <Divider sx={{ backgroundColor: '#5E5E5E' }} />
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: '10px 16px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
        >
          <LogoutIcon sx={{ color: '#FF5EBF', marginRight: '8px', fontSize: '18px' }} />
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'JetBrains Mono',
              color: '#E5E5E5',
              fontSize: '14px'
            }}
          >
            Log out
          </Typography>
        </MenuItem>
      </Menu>

      <TransactionHistoryModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
      />
    </Box>
  )
}

export default UserDetails
