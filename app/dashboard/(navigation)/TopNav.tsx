'use client'
import { Box, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import MenuIcon from '@mui/icons-material/Menu'
import UpgradeMembershipModal from '@/app/dashboard/members/(components)/UpgradeMembershipModal'
import UserDetails from './UserDetails'
import { useDashboard } from '../DashboardContext'
import { motion } from 'framer-motion'

interface TopNavProps {
  onUpgradeClick: () => void
  modalOpen: boolean
  onModalClose: (membershipUpdated: boolean) => void
  isMobile?: boolean
  onMenuClick?: () => void
}

const LogoAndSubscription = ({
  subscriptionType,
}: {
  subscriptionType: 'plus' | 'team' | 'free'
}) => {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)

  const logoAnimationVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -4, 0, -2, 0],
      transition: {
        duration: 0.5,
        times: [0, 0.3, 0.5, 0.75, 1],
        ease: 'easeInOut',
      },
    },
  }

  const handleHoverStart = () => {
    if (!isAnimating) {
      setIsAnimating(true)
    }
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={() => router.push('/')}
        onMouseEnter={handleHoverStart}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          minWidth: 'auto',
          marginRight: '12px',
          '&:hover': {
            background: 'transparent',
          },
        }}
      >
        <motion.div
          style={{ display: 'flex', alignItems: 'center' }}
          initial="initial"
          animate={isAnimating ? 'animate' : 'initial'}
          variants={logoAnimationVariants}
          onAnimationComplete={handleAnimationComplete}
        >
          <Image
            src="/assets/svgs/LISA MARK EXP.svg"
            alt="Logo"
            width={26}
            height={26}
          />
          <Typography
            variant="h3"
            sx={{
              marginBottom: 0,
              fontSize: '1.1rem',
              fontWeight: 400,
              marginLeft: '12px',
            }}
          >
            Elastic
          </Typography>
        </motion.div>
      </Button>
    </Box>
  )
}

// Extracted to a separate component for clarity
const SubscriptionBadge = ({
  subscriptionType,
}: {
  subscriptionType: 'plus' | 'team' | 'free'
}) => {
  const gradients = {
    plus: ['#7C5EFC', '#F95EC1'],
    team: ['#FFB12E', '#F86682'],
    free: ['#4F4B63', '#4F4B63'],
  }

  const [startColor, endColor] = gradients[subscriptionType]

  const style = {
    container: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '78px',
      height: '24px',
      marginLeft: '12px',
    },
    textStyle: {
      position: 'absolute',
      background: `linear-gradient(to right, ${startColor}, ${endColor})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '14px',
      fontWeight: '300',
      fontFamily: 'Kanit',
      marginTop: '-2px',
      textTransform: 'capitalize',
    },
  }

  return (
    <Box sx={style.container}>
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

      <Typography variant="body2" sx={style.textStyle}>
        {subscriptionType}
      </Typography>
    </Box>
  )
}

const TopNav: React.FC<TopNavProps> = ({ onUpgradeClick, modalOpen, onModalClose, isMobile = false, onMenuClick }) => {
  const { subscriptionType } = useDashboard()
  const isFreeSubscription = subscriptionType === 'free'

  const upgradeSubscription = () => {
    onUpgradeClick()
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          width: '100%',
          padding: isMobile ? '0px 16px' : '0px 24px',
          borderBottom: '#5E5E5E 1px solid',
        }}
      >
        <Box
          sx={{
            padding: isMobile ? '8px' : '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && onMenuClick && (
              <IconButton
                onClick={onMenuClick}
                sx={{
                  marginRight: '8px',
                  color: '#E5E5E5',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <LogoAndSubscription subscriptionType={subscriptionType} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile ? (
              <Button
                onClick={upgradeSubscription}
                sx={{
                  padding: '4px 16px',
                  marginRight: '16px',
                }}
              >
                <TrendingUpIcon
                  sx={{
                    height: '16px',
                    width: '16px',
                    color: '#775EFF',
                    marginRight: '8px',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '13px',
                    fontWeight: '300',
                    fontFamily: 'JetBrains Mono',
                    background: `linear-gradient(to right, #775EFF, #FF5EBF)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Upgrade Subscription
                </Typography>
              </Button>
            ) : (
              <IconButton
                onClick={upgradeSubscription}
                sx={{
                  marginRight: '8px',
                  color: '#775EFF',
                }}
              >
                <TrendingUpIcon />
              </IconButton>
            )}

            <UserDetails isMobile={isMobile} />
          </Box>
        </Box>
      </Box>

      <UpgradeMembershipModal
        open={modalOpen}
        onClose={onModalClose}
      />
    </React.Fragment>
  )
}

export default TopNav
