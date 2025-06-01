'use client'
import React from 'react'
import { Box, CircularProgress, Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'
import ClippedButton from '@/app/(components)/ClippedButton'
import CheckIcon from '@mui/icons-material/Check'
import useSubscriptionPlans from '@/lib/hooks/useSubscriptionPlans'
import useSubscriptionCheckout from '@/lib/hooks/useSubscriptionCheckout'
import { SubscriptionPlan } from '@/services/types'

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
  planType,
}: {
  title: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  showAlert: () => void
  planType: string
}) => {
  const { handleCheckout, loading: checkoutLoading } = useSubscriptionCheckout();
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
              marginBottom: '15px',
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

      {/* Add Get Started button for all plans except free */}
      {title.toLowerCase() !== 'free' && (
        <ClippedButton
          onClick={() => handleCheckout(planType)}
          disabled={checkoutLoading}
          sx={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: '1rem',
            padding: '12px 24px',
            marginBottom: '20px',
            background: isPopular
              ? 'linear-gradient(90deg, #775EFF, #DE3AED)'
              : 'linear-gradient(90deg, #775EFF, #775EFF)',
            '&:hover': {
              background: isPopular
                ? 'linear-gradient(90deg, #6B4FE0, #C935D3)'
                : 'linear-gradient(90deg, #6B4FE0, #6B4FE0)',
            },
          }}
        >
          {checkoutLoading ? 'Processing...' : 'Get Started'}
        </ClippedButton>
      )}

      <DecorRect sx={{ bottom: '15px', right: '15px' }} />
    </Box>
  )
}

export const PricingSection = ({
  isMobile,
  showAlert,
}: PricingSectionProps) => {
  const theme = useTheme()
  const { subscriptionPlans, loading, error } = useSubscriptionPlans()

  // Map API subscription plans to the format expected by PricingCard
  const mapSubscriptionPlanToPricingPlan = (plan: SubscriptionPlan) => {
    // Default features for all plans
    const baseFeatures = [
      'Priority usage of the Base Model',
      'Unlimited basic requests',
      'Admin dashboard',
      'Priority support',
    ]

    // Determine plan-specific features and details
    let title = plan.type
    let description = ''
    let isPopular = false
    let features = [...baseFeatures]

    // Set plan-specific details based on plan type
    if (plan.type.toLowerCase().includes('free')) {
      title = 'Free'
      description = 'Perfect for trying out Elastic Copilot'
      features = [
        'Unlimited usage of the Base Model',
        `${plan.total_credits} premium calls to GPT-4/Claude per month`,
      ]
    } else if (
      plan.type.toLowerCase().includes('pro+') ||
      plan.type.toLowerCase().includes('pro plus') ||
      plan.type.toLowerCase().includes('premium')
    ) {
      title = 'Pro+'
      description = ''
      isPopular = false
      features = [
        ...baseFeatures,
        `${plan.total_credits} premium calls per month`,
        'Additional premium calls available at $0.05 each',
      ]
    } else if (
      plan.type.toLowerCase().includes('pro') ||
      plan.type.toLowerCase().includes('standard')
    ) {
      title = 'Pro'
      description = ''
      isPopular = true
      features = [
        ...baseFeatures,
        `${plan.total_credits} premium calls per month`,
        'Additional premium calls available at $0.08 each',
      ]
    }

    return {
      title,
      price: `$${plan.monthly_price}`,
      description,
      features,
      isPopular,
      planType: plan.type,
    }
  }

  // Fallback pricing plans for when API fails or returns no plans
  const fallbackPlans = [
    {
      title: 'Free',
      price: '$0',
      description: 'Perfect for trying out Elastic Copilot',
      features: [
        'Unlimited usage of the Base Model',
        '20 premium calls to GPT-4/Claude per month',
      ],
      isPopular: false,
      planType: 'FREE',
    },
    {
      title: 'Pro',
      price: '$15',
      description: 'For professional developers',
      features: [
        'Priority usage of the Base Model',
        'Unlimited basic requests',
        'Admin dashboard',
        'Priority support',
        '500 premium calls per month',
        'Additional premium calls available at $0.08 each',
      ],
      isPopular: true,
      planType: 'PRO',
    },
    {
      title: 'Pro+',
      price: '$25',
      description: 'For ultra professional developers',
      features: [
        'Priority usage of the Base Model',
        'Unlimited basic requests',
        'Admin dashboard',
        'Priority support',
        '1000 premium calls per month',
        'Additional premium calls available at $0.05 each',
      ],
      isPopular: false,
      planType: 'PRO_PLUS',
    },
  ];

  // Create pricing plans from API data or use fallback if loading/error
  const pricingPlans =
    loading || error || !subscriptionPlans || subscriptionPlans.length === 0
      ? fallbackPlans
      : subscriptionPlans.map(mapSubscriptionPlanToPricingPlan)

  return (
    <Box
      id="pricing"
      sx={{
        position: 'relative',
        padding: isMobile ? '60px 20px' : '100px 0',
        background: '#0A090E',
      }}
    >
      <Box
        sx={{
          margin: `0px ${
            isMobile
              ? theme.customSpacing?.sides.mobile
              : theme.customSpacing?.sides.desktop
          }`,
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
            Select the perfect plan for your needs and start coding smarter
            today.
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              py: 8,
            }}
          >
            <CircularProgress sx={{ color: '#775EFF' }} />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', width: '100%', py: 4 }}>
            <Typography variant="body1" sx={{ color: '#AEAEAE' }}>
              Unable to load pricing plans. Please try again later.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {pricingPlans.map(
              (
                plan: {
                  title: string
                  price: string
                  description: string
                  features: string[]
                  isPopular: boolean | undefined
                  planType: string
                },
                index: React.Key | null | undefined
              ) => (
                <Grid item xs={12} md={4} key={index}>
                  <PricingCard
                    title={plan.title}
                    price={plan.price}
                    description={plan.description}
                    features={plan.features}
                    isPopular={plan.isPopular}
                    planType={plan.planType}
                    showAlert={showAlert}
                  />
                </Grid>
              )
            )}
          </Grid>
        )}

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
            Contact us for enterprise pricing and custom solutions tailored to
            your organization.
          </Typography>

          <a href="mailto:founders@elasticapp.io">
            <ClippedButton
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1rem',
                padding: '12px 24px',
              }}
            >
              Contact Sales
            </ClippedButton>
          </a>

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
            background:
              'linear-gradient(to bottom, rgba(119, 94, 255, 0), rgba(119, 94, 255, 1))',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: '-30px',
            left: isMobile ? '20px' : '100px',
            width: '1px',
            height: '60px',
            background:
              'linear-gradient(to top, rgba(119, 94, 255, 0), rgba(119, 94, 255, 1))',
          }}
        />
      </Box>
    </Box>
  )
}
