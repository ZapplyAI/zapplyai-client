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
  LinearProgress
} from '@mui/material'
import useUserProfile from '@/lib/hooks/useUserProfile'
import { axios } from '@/lib'
import DataUsageIcon from '@mui/icons-material/DataUsage'

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
                    <Typography variant="body2" sx={{ color: '#E5E5E5' }}>
                      {bucket.model}
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
