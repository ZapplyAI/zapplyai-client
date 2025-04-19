'use client'
import React from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'
import ClippedButton from '@/app/(components)/ClippedButton'
import CheckIcon from '@mui/icons-material/Check'

interface PricingSectionProps {
  isMobile: boolean
  showAlert: () => void
}

// Pricing card component
const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular,
  showAlert,
}: { 
  title: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  showAlert: () => void
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '40px 30px',
        height: '100%',
        border: isPopular 
          ? '1px solid rgba(222, 58, 237, 0.5)' 
          : '1px solid rgba(119, 94, 255, 0.3)',
        background: isPopular
          ? 'linear-gradient(135deg, rgba(119, 94, 255, 0.1), rgba(222, 58, 237, 0.1))'
          : 'rgba(10, 9, 14, 0.7)',
        backdropFilter: 'blur(5px)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: isPopular 
            ? '0 10px 20px rgba(222, 58, 237, 0.2)' 
            : '0 10px 20px rgba(119, 94, 255, 0.2)',
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: '-12px',
            right: '30px',
            padding: '5px 15px',
            background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
            fontFamily: 'Tektur, sans-serif',
            fontSize: '0.8rem',
            color: '#FFFFFF',
            borderRadius: '4px',
          }}
        >
          Most Popular
        </Box>
      )}
      
      <Typography
        variant={'h3' as any}
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '10px',
          fontFamily: 'Tektur, sans-serif',
          color: '#FFFFFF',
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant={'h2' as any}
        sx={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '15px',
          fontFamily: 'Orbitron, sans-serif',
          color: isPopular ? '#DE3AED' : '#775EFF',
        }}
      >
        {price}
      </Typography>
      
      <Typography
        variant={'body1' as any}
        sx={{
          fontSize: '1rem',
          color: '#AEAEAE',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 300,
          marginBottom: '30px',
        }}
      >
        {description}
      </Typography>
      
      <Box sx={{ flexGrow: 1, marginBottom: '30px' }}>
        {features.map((feature, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '15px' 
            }}
          >
            <CheckIcon 
              sx={{ 
                color: isPopular ? '#DE3AED' : '#775EFF', 
                marginRight: '10px',
                fontSize: '1.2rem',
              }} 
            />
            <Typography
              variant={'body2' as any}
              sx={{
                fontSize: '0.9rem',
                color: '#E5E5E5',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {feature}
            </Typography>
          </Box>
        ))}
      </Box>
      
      <ClippedButton 
        filled={isPopular} 
        onClick={showAlert}
        sx={{ 
          fontFamily: 'Tektur, sans-serif',
          fontSize: '1rem',
          padding: '12px 24px',
          marginTop: 'auto',
        }}
      >
        Get Started
      </ClippedButton>
      
      <DecorRect sx={{ bottom: '15px', right: '15px' }} />
    </Box>
  )
}

export const PricingSection = ({ isMobile, showAlert }: PricingSectionProps) => {
  const theme = useTheme()
  
  const pricingPlans = [
    {
      title: 'Free',
      price: '$0',
      description: 'Perfect for trying out Elastic Copilot',
      features: [
        'Basic code completion',
        'Limited context awareness',
        'Community support',
        '5 requests per day',
      ],
      isPopular: false,
    },
    {
      title: 'Pro',
      price: '$19',
      description: 'For professional developers',
      features: [
        'Advanced code generation',
        'Full context awareness',
        'Bug detection & fixing',
        'Unlimited requests',
        'Priority support',
      ],
      isPopular: true,
    },
    {
      title: 'Team',
      price: '$49',
      description: 'For development teams',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom integrations',
        'Admin dashboard',
        'Dedicated support',
      ],
      isPopular: false,
    },
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        padding: isMobile ? '60px 20px' : '100px 0',
        background: '#0A090E',
      }}
    >
      <Box
        sx={{
          margin: `0px ${isMobile ? theme.customSpacing?.sides.mobile : theme.customSpacing?.sides.desktop}`,
          position: 'relative',
        }}
      >
        <Box sx={{ textAlign: 'left', marginBottom: '60px' }}>
          <Typography
            variant={'h2' as any}
            sx={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 600,
              marginBottom: '20px',
              fontFamily: 'Orbitron, sans-serif',
              color: '#FFFFFF',
            }}
          >
            Choose Your Plan
          </Typography>
          
          <Typography
            variant={'body1' as any}
            sx={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#AEAEAE',
              fontFamily: 'JetBrains Mono, monospace',
              maxWidth: '800px',
              margin: '0',
            }}
          >
            Select the perfect plan for your needs and start coding smarter today.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PricingCard
                title={plan.title}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
                showAlert={showAlert}
              />
            </Grid>
          ))}
        </Grid>
        
        <Box
          sx={{
            marginTop: '60px',
            padding: '30px',
            border: '1px solid rgba(119, 94, 255, 0.3)',
            background: 'rgba(10, 9, 14, 0.7)',
            backdropFilter: 'blur(5px)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Typography
            variant={'h4' as any}
            sx={{
              fontSize: '1.3rem',
              fontWeight: 500,
              marginBottom: '15px',
              fontFamily: 'Tektur, sans-serif',
              color: '#FFFFFF',
            }}
          >
            Need a custom solution?
          </Typography>
          
          <Typography
            variant={'body1' as any}
            sx={{
              fontSize: '1rem',
              color: '#AEAEAE',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '20px',
            }}
          >
            Contact us for enterprise pricing and custom solutions tailored to your organization.
          </Typography>
          
          <ClippedButton 
            onClick={showAlert}
            sx={{ 
              fontFamily: 'Tektur, sans-serif',
              fontSize: '1rem',
              padding: '12px 24px',
            }}
          >
            Contact Sales
          </ClippedButton>
          
          <DecorRect sx={{ top: '15px', left: '15px' }} />
          <DecorRect sx={{ bottom: '15px', right: '15px' }} />
        </Box>
        
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-30px',
            right: isMobile ? '20px' : '100px',
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(119, 94, 255, 0), rgba(119, 94, 255, 1))',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '-30px',
            left: isMobile ? '20px' : '100px',
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to top, rgba(119, 94, 255, 0), rgba(119, 94, 255, 1))',
          }}
        />
      </Box>
    </Box>
  )
}
