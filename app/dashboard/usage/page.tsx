'use client'
import React, { useEffect, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
  Grid,
  LinearProgress,
  Button
} from '@mui/material'
import useUserProfile from '@/lib/hooks/useUserProfile'
import useSubscriptionPlans from '@/lib/hooks/useSubscriptionPlans'
import useSubscriptionCheckout from '@/lib/hooks/useSubscriptionCheckout'
import { axios } from '@/lib'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

// Define the type for the usage data response
interface UsageData {
  id: string
  plan: string
  start_date: string
  end_date: string
  status: string
  next_billing_date: string
  buckets: {
    model: string
    credits_used: number
  }[]
  created_at: string
}

// Helper function to format numbers with commas for values over 999
const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num.toString();
}

// Plan Comparison Card Component
interface PlanComparisonCardProps {
  currentPlanName: string;
  isMobile: boolean;
}

const PlanComparisonCard: React.FC<PlanComparisonCardProps> = ({ currentPlanName, isMobile }) => {
  const { subscriptionPlans, loading, error } = useSubscriptionPlans();
  const { handleCheckout, loading: checkoutLoading } = useSubscriptionCheckout();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={30} sx={{ color: '#775EFF' }} />
      </Box>
    );
  }

  if (error || !subscriptionPlans || subscriptionPlans.length === 0) {
    return null;
  }

  // Sort plans by monthly_price in ascending order
  const sortedPlans = [...subscriptionPlans].sort(
    (a, b) => parseFloat(a.monthly_price) - parseFloat(b.monthly_price)
  );

  // Find current plan index
  const currentPlanIndex = sortedPlans.findIndex(
    plan => plan.type === currentPlanName
  );

  // If current plan not found or is the highest tier, don't show comparison
  if (currentPlanIndex === -1 || currentPlanIndex === sortedPlans.length - 1) {
    return null;
  }

  // Get next tier plan
  const nextPlan = sortedPlans[currentPlanIndex + 1];
  const currentPlan = sortedPlans[currentPlanIndex];

  // Calculate credit differences
  const totalCreditsDiff = nextPlan.total_credits - currentPlan.total_credits;
  const geminiCreditsDiff = (nextPlan.buckets.gemini || 0) - (currentPlan.buckets.gemini || 0);
  const claudeCreditsDiff = (nextPlan.buckets.claude || 0) - (currentPlan.buckets.claude || 0);
  const gptCreditsDiff = (nextPlan.buckets.gpt || 0) - (currentPlan.buckets.gpt || 0);

  return (
    <Box
      sx={{
        border: '1px solid #5E5E5E',
        borderRadius: '12px',
        padding: '16px 24px',
        mt: 4,
        background: 'linear-gradient(135deg, rgba(119, 94, 255, 0.1), rgba(222, 58, 237, 0.1))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: '#E5E5E5',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Tektur, sans-serif',
        }}
      >
        <TrendingUpIcon sx={{ mr: 1 }} />
        Upgrade Comparison
      </Typography>

      <Box sx={{ position: 'absolute', top: 10, right: 10, opacity: 0.1 }}>
        <TrendingUpIcon sx={{ fontSize: 100, transform: 'rotate(45deg)' }} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
              Current Plan
            </Typography>
            <Typography variant="body1" sx={{ color: '#E5E5E5', fontWeight: 500 }}>
              {currentPlan.type} (${currentPlan.monthly_price}/month)
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
              Next Tier
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {nextPlan.type} (${nextPlan.monthly_price}/month)
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body2" sx={{ mb: 2, color: '#E5E5E5' }}>
        By upgrading to {nextPlan.type}, you'll get:
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Box sx={{
            p: 2,
            border: '1px solid rgba(119, 94, 255, 0.3)',
            borderRadius: '8px',
            background: 'rgba(10, 9, 14, 0.7)',
          }}>
            <Typography variant="body2" sx={{ color: '#AAAAAA', mb: 1 }}>
              Additional Credits
            </Typography>
            <Typography variant="h6" sx={{
              color: '#E5E5E5',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.1rem',
            }}>
              +{formatNumber(totalCreditsDiff)} total credits
            </Typography>
            <Box sx={{ mt: 1 }}>
              {geminiCreditsDiff > 0 && (
                <Typography variant="body2" sx={{ color: '#E5E5E5' }}>
                  +{formatNumber(geminiCreditsDiff)} Gemini credits
                </Typography>
              )}
              {claudeCreditsDiff > 0 && (
                <Typography variant="body2" sx={{ color: '#E5E5E5' }}>
                  +{formatNumber(claudeCreditsDiff)} Claude credits
                </Typography>
              )}
              {gptCreditsDiff > 0 && (
                <Typography variant="body2" sx={{ color: '#E5E5E5' }}>
                  +{formatNumber(gptCreditsDiff)} GPT credits
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{
            p: 2,
            border: '1px solid rgba(222, 58, 237, 0.3)',
            borderRadius: '8px',
            background: 'rgba(10, 9, 14, 0.7)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Typography variant="body2" sx={{ color: '#AAAAAA', mb: 1 }}>
              Value Comparison
            </Typography>
            <Typography variant="body1" sx={{ color: '#E5E5E5' }}>
              {Math.round((totalCreditsDiff / parseFloat(nextPlan.monthly_price)) * 100) / 100} credits per dollar
            </Typography>
            <Typography variant="body2" sx={{ color: '#AAAAAA', mt: 1 }}>
              vs. {Math.round((currentPlan.total_credits / parseFloat(currentPlan.monthly_price)) * 100) / 100} on your current plan
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={() => handleCheckout(nextPlan.type)}
        disabled={checkoutLoading}
        sx={{
          background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
          borderRadius: '8px',
          padding: '10px 24px',
          fontFamily: 'Tektur, sans-serif',
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(90deg, #6B4FE0, #C935D3)',
          },
        }}
        startIcon={<TrendingUpIcon />}
      >
        {checkoutLoading ? 'Processing...' : `Upgrade to ${nextPlan.type}`}
      </Button>
    </Box>
  );
};

export default function UsagePage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { profile, isProfileLoading } = useUserProfile()
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsageData = async () => {
      // Only fetch usage data if the user has a subscription ID
      if (!profile?.subscription_id) {
        setError('No subscription found for this account')
        setIsLoading(false)
        return
      }

      const subscriptionId = profile.subscription_id;

      setIsLoading(true)
      setError(null)
      try {
        const { status, data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/${subscriptionId}`)

        if (status >= 200 && status < 300 && data) {
          setUsageData(data)
        } else {
          setError('Failed to load usage data')
        }
      } catch (err) {
        console.error('Error fetching usage data:', err)
        setError('Failed to load usage data')
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch usage data if profile is loaded
    if (!isProfileLoading) {
      fetchUsageData()
    }
  }, [profile, isProfileLoading])

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Calculate days remaining until next billing date
  const getDaysRemaining = () => {
    if (!usageData?.next_billing_date) return 'N/A'

    const nextBillingDate = new Date(usageData.next_billing_date)
    const today = new Date()
    const diffTime = nextBillingDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? `${diffDays} days` : 'Due today'
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
        Usage
      </Typography>

      {(isLoading || isProfileLoading) ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress size={40} sx={{ color: '#775EFF' }} />
        </Box>
      ) : error ? (
        <Box
          sx={{
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #5E5E5E',
            borderRadius: '12px',
          }}
        >
          <Typography variant="body1" sx={{ color: '#FF5E5E' }}>
            {error}
          </Typography>
        </Box>
      ) : usageData ? (
        <>
          {/* Subscription Overview */}
          <Box
            sx={{
              border: '1px solid #5E5E5E',
              borderRadius: '12px',
              padding: '16px 24px',
              mb: 4,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: '#E5E5E5', display: 'flex', alignItems: 'center' }}>
              <DataUsageIcon sx={{ mr: 1 }} />
              Subscription Overview
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
                    Plan
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#E5E5E5', fontWeight: 500 }}>
                    {usageData.plan}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
                    Status
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: usageData.status === 'ACTIVE' ? '#4CAF50' : usageData.status === 'INACTIVE' ? '#FF5E5E' : '#E5E5E5',
                      fontWeight: 500,
                      backgroundColor: usageData.status === 'ACTIVE' ? 'rgba(76, 175, 80, 0.1)' : usageData.status === 'INACTIVE' ? 'rgba(255, 94, 94, 0.1)' : 'transparent',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}
                  >
                    {usageData.status}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
                    Start Date
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#E5E5E5', fontWeight: 500 }}>
                    {formatDate(usageData.start_date)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Credits Usage */}
          <Box
            sx={{
              border: '1px solid #5E5E5E',
              borderRadius: '12px',
              padding: '16px 24px',
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5' }}>
              Credits Usage
            </Typography>

            {usageData.buckets && usageData.buckets.length > 0 ? (
              usageData.buckets.map((bucket, index) => (
                <Box key={bucket.model} sx={{ mb: index < usageData.buckets.length - 1 ? 3 : 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#E5E5E5', textTransform: 'capitalize' }}>
                      {bucket.model === 'gemini' ? 'Google (Gemini)' :
                       bucket.model === 'claude' ? 'Anthropic (Claude)' :
                       bucket.model === 'gpt' ? 'OpenAI (GPT)' :
                       bucket.model}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E5E5E5', fontFamily: 'JetBrains Mono' }}>
                      {bucket.credits_used.toLocaleString()} credits
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: '#AAAAAA', textAlign: 'center' }}>
                No usage data available
              </Typography>
            )}
          </Box>

          {/* Plan Comparison Card */}
          <PlanComparisonCard currentPlanName={usageData.plan} isMobile={isMobile} />
        </>
      ) : (
        <Box
          sx={{
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #5E5E5E',
            borderRadius: '12px',
          }}
        >
          <Typography variant="body1" sx={{ color: '#AAAAAA' }}>
            No subscription data available
          </Typography>
        </Box>
      )}
    </Box>
  )
}
