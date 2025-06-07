import {
  Box,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  IconButton,
} from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import map from 'lodash/map'
import useSubscriptionPlans from '@/lib/hooks/useSubscriptionPlans'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import CloseIcon from '@mui/icons-material/Close'
import useSubscriptionCheckout from '@/lib/hooks/useSubscriptionCheckout'
import { SubscriptionPlan } from '@/services/types'
import { useClientMediaQuery } from '@/helpers/IsMobile'

// Helper function to format numbers with commas for values over 999
const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num.toString();
}

interface UpgradeMembershipProps {
  open: boolean
  onClose: (membershipUpdated: boolean) => void
}

// Using the imported SubscriptionPlan interface from services/types.ts
const UpgradeMembershipModal = ({ open, onClose }: UpgradeMembershipProps) => {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { subscriptionPlans, loading, error } = useSubscriptionPlans()
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  )

  const handleClose = () => onClose(false)
  const handlePlanSelection = (plan: SubscriptionPlan) => setSelectedPlan(plan)

  // Filter out the free plan and sort by monthly_price in ascending order
  const paidPlans = (
    subscriptionPlans?.filter(
      (plan: SubscriptionPlan) =>
        plan.type !== 'FREE' &&
        plan.monthly_price !== '0' &&
        !plan.type.toLowerCase().includes('free')
    ) || []
  ).sort(
    (a: { monthly_price: string }, b: { monthly_price: string }) =>
      parseFloat(a.monthly_price) - parseFloat(b.monthly_price)
  )

  const style = {
    dialogContainer: {},
    dialogBox: {
      border: '1px #3C3C3C solid',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
    },
    mobileHeader: {
      display: isMobile ? 'flex' : 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderBottom: '1px solid #3C3C3C',
    },
    subscriptionsContainer: {
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'column',
      padding: isMobile ? '20px 24px' : '35px 45px',
      width: isMobile ? '100%' : 'auto',
    },
    pricingSummaryContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'start',
      background: '#0F0F15',
      borderLeft: isMobile ? 'none' : '1px solid #3C3C3C',
      borderTop: isMobile ? '1px solid #3C3C3C' : 'none',
      padding: isMobile ? '20px 24px' : '35px 45px',
      minWidth: isMobile ? '100%' : '350px',
      justifyContent: 'space-between',
    },
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={style.dialogContainer}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          background: '#09090E',
          maxWidth: isMobile ? '100%' : 'unset',
          width: isMobile ? '100%' : 'auto',
          margin: isMobile ? 0 : undefined,
          height: isMobile ? '100%' : 'auto',
        },
      }}
    >
      {loading ? (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography>Error: {error}</Typography>
        </Box>
      ) : (
        <Box sx={style.dialogBox}>
          {isMobile && (
            <Box sx={style.mobileHeader}>
              <Typography variant="h6" sx={{ color: '#E5E5E5' }}>
                Upgrade subscription
              </Typography>
              <IconButton
                onClick={handleClose}
                size="small"
                sx={{ color: '#7E7E7E' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={style.subscriptionsContainer}>
            {renderUpgradeDescriptionContents(
              paidPlans,
              selectedPlan,
              handlePlanSelection,
              isMobile
            )}
          </Box>
          <Box sx={style.pricingSummaryContainer}>
            <SummaryContents selectedPlan={selectedPlan} />
          </Box>
        </Box>
      )}
    </Dialog>
  )
}

const renderUpgradeDescriptionContents = (
  subscriptionPlans: any,
  selectedPlan: SubscriptionPlan | null,
  handlePlanSelection: (plan: SubscriptionPlan) => void,
  isMobile: boolean
) => {

  return (
    <React.Fragment>
      {!isMobile && <Typography variant="h3">Upgrade subscription</Typography>}
      <Typography variant="body2" sx={{ mt: isMobile ? 0 : undefined }}>
        You are currently on a FREE subscription
      </Typography>

      <RadioGroupExample
        subscriptionPlans={subscriptionPlans}
        selectedPlan={selectedPlan}
        onPlanSelect={handlePlanSelection}
      />
    </React.Fragment>
  )
}

interface SummaryContentsProps {
  selectedPlan: SubscriptionPlan | null
}

const SummaryContents = ({ selectedPlan }: SummaryContentsProps) => {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { handleCheckout, loading } = useSubscriptionCheckout()

  // const handleCheckout = () => {
  //   startTransition(async () => {
  //     try {
  //       if (!selectedPlan) {return}
  //       const data = await handleCheckoutServer(selectedPlan.id)
  //
  //       if (data?.redirect_url) {
  //         window.location.href = data.redirect_url
  //       } else {
  //         console.error('Unexpected response', data)
  //       }
  //     } catch (err) {
  //       console.error('Checkout failed', err)
  //       // Show error to user
  //       alert('Checkout failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
  //     }
  //   })
  // }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box>
        {!selectedPlan ? (
          <Typography variant="body1">No subscription selected</Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{
                mb: isMobile ? 1 : 2,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: isMobile ? '16px' : undefined,
                background:
                  selectedPlan.type === 'STANDARD'
                    ? 'linear-gradient(to right, #FFB42A, #F85E8A)'
                    : 'none',
                WebkitBackgroundClip:
                  selectedPlan.type === 'STANDARD'
                    ? 'text'
                    : 'border-box',
                WebkitTextFillColor:
                  selectedPlan.type === 'STANDARD'
                    ? 'transparent'
                    : '#808080',
                fontWeight: 500,
              }}
            >
              {selectedPlan.type}
            </Typography>
            <List dense sx={{
              '& .MuiListItem-root': {
                padding: isMobile ? '2px 0' : '8px 0'
              }
            }}>
              <ListItem>
                <ListItemIcon sx={{ minWidth: isMobile ? '20px' : '24px' }}>
                  <FiberManualRecordIcon
                    sx={{ fontSize: isMobile ? 6 : 8, color: '#7C5EFD' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="span">
                      <Box
                        component="span"
                        sx={{
                          color: '#B5B5B5',
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        Total credits:
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        {formatNumber(selectedPlan.total_credits)}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: isMobile ? '20px' : '24px' }}>
                  <FiberManualRecordIcon
                    sx={{ fontSize: isMobile ? 6 : 8, color: '#7C5EFD' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="span">
                      <Box
                        component="span"
                        sx={{
                          color: '#B5B5B5',
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        Gemini credits:
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        {formatNumber(selectedPlan.buckets.gemini)}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: isMobile ? '20px' : '24px' }}>
                  <FiberManualRecordIcon
                    sx={{ fontSize: isMobile ? 6 : 8, color: '#7C5EFD' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="span">
                      <Box
                        component="span"
                        sx={{
                          color: '#B5B5B5',
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        Claude credits:
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        {formatNumber(selectedPlan.buckets.claude)}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: isMobile ? '20px' : '24px' }}>
                  <FiberManualRecordIcon
                    sx={{ fontSize: isMobile ? 6 : 8, color: '#7C5EFD' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="span">
                      <Box
                        component="span"
                        sx={{
                          color: '#B5B5B5',
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        GPT credits:
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          fontFamily: 'Kanit, sans-serif',
                          fontSize: isMobile ? '13px' : 'inherit',
                        }}
                      >
                        {formatNumber(selectedPlan.buckets.gpt)}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Box>
        )}
      </Box>

      {selectedPlan && (
        <Box sx={{ mt: 'auto', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              fontFamily: 'Kanit, sans-serif',
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 300,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: 300,
                color: '#FFFFFF',
              }}
            >
              ${selectedPlan.monthly_price}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 300,
                color: '#B5B5B5',
                ml: 1,
                alignSelf: 'flex-end',
                mb: 0.5,
              }}
            >
              / month
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleCheckout(selectedPlan?.type)}
            disabled={loading}
            sx={{
              background: 'linear-gradient(to right, #7C5EFD, #FB5EC0)',
              borderRadius: '8px',
              padding: isMobile ? '10px 0' : '12px 0',
              fontFamily: 'Kanit, sans-serif',
              textTransform: 'none',
              fontWeight: 400,
              fontSize: isMobile ? '14px' : '16px',
              '&:hover': {
                background: 'linear-gradient(to right, #6B4FE0, #E54DAF)',
              },
            }}
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </Button>
        </Box>
      )}
    </Box>
  )
}

interface RadioGroupExampleProps {
  subscriptionPlans: any
  selectedPlan: SubscriptionPlan | null
  onPlanSelect: (plan: SubscriptionPlan) => void
}

const RadioGroupExample = ({
  subscriptionPlans,
  selectedPlan,
  onPlanSelect,
}: RadioGroupExampleProps) => {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const getGradientForPlan = (planType: string) => {
    if (!planType) return '#808080, #808080' // Default gray

    // Only the STANDARD plan should be highlighted as "Most Popular"
    if (planType === 'STANDARD') {
      return '#FFB42A, #F85E8A' // Standard gradient (Most Popular)
    } else {
      return '#808080, #808080' // Default gray for all other plans
    }
  }

  // if (isProcessing || !plans.length) {
  //   return <Spinner />
  // }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      mt: 2,
      width: '100%',
    }}>
      {map(subscriptionPlans, plan => {
        const gradient = getGradientForPlan(plan.type)
        return (
          <RadioOption
            key={plan.type}
            label={plan.type}
            description={`Total Credits: ${formatNumber(plan.total_credits)}`}
            price={plan.monthly_price}
            selected={selectedPlan?.type === plan.type}
            onChange={() => onPlanSelect(plan)}
            gradient={gradient}
            isMobile={isMobile}
          />
        )
      })}
    </Box>
  )
}

interface RadioOptionProps {
  label: string
  description: string
  price: string
  selected: boolean
  onChange: () => void
  gradient: string // Gradient for both radio and text
  isMobile?: boolean
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  description,
  price,
  selected,
  onChange,
  gradient,
  isMobile = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '15px 10px' : '20px 15px',
        borderRadius: '8px',
        border: '1px solid #3C3C3C',
        backgroundColor: '#1B1A20',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': { backgroundColor: '#222127' },
        maxWidth: isMobile ? '100%' : '450px',
        width: '100%',
        position: 'relative',
      }}
      onClick={onChange}
    >
      {/* Custom Gradient Radio Button */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <GradientRadio
          selected={selected}
          onChange={onChange}
          gradient={gradient}
        />
      </Box>

      {/* Title with Gradient and Description */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '10px',
          flex: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            background: `linear-gradient(to right, ${gradient})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '500',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: '200',
            fontFamily: 'Kanit, sans-serif',
          }}
        >
          {description}
        </Typography>
      </Box>

      {/* Price with larger text and specific styling */}
      <Typography
        sx={{
          fontFamily: 'Kanit, sans-serif',
          fontSize: '20px',
          fontWeight: 300,
          color: '#FFFFFF',
          marginLeft: '30px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        ${price}
      </Typography>
    </Box>
  )
}

interface GradientRadioProps {
  selected: boolean
  onChange: () => void
  gradient: string
}

const CustomRadio = styled(Radio)({
  color: '#413D52', // Default border color
  '&.Mui-checked': {
    color: '#413D52', // Keeps border visible when selected
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24, // Normal icon size
  },
  padding: 0,
})

const GradientRadio: React.FC<GradientRadioProps> = ({
  selected,
  onChange,
  gradient,
}) => {
  // Create a unique ID for each gradient to avoid conflicts
  const gradientId = `grad-${gradient.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <CustomRadio
      checked={selected}
      onChange={onChange}
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24">
          {/* Outer border */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#413D52"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      }
      checkedIcon={
        <svg width="24" height="24" viewBox="0 0 24 24">
          {/* Outer border */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#413D52"
            strokeWidth="2"
            fill="none"
          />
          {/* Inner gradient fill */}
          <circle cx="12" cy="12" r="6" fill={`url(#${gradientId})`} />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor={gradient.split(',')[0].trim()} />
              <stop offset="100%" stopColor={gradient.split(',')[1].trim()} />
            </linearGradient>
          </defs>
        </svg>
      }
    />
  )
}

export default UpgradeMembershipModal
