import { Box, Radio, Dialog, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material'
import React, { useState, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import map from 'lodash/map'
import useSubscriptionPlans from '@/lib/hooks/useSubscriptionPlans'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface UpgradeMembershipProps {
  open: boolean
  onClose: (membershipUpdated: boolean) => void
}

interface SubscriptionPlan {
  id: string;
  name: string;
  monthly_fee: string;
  premium_calls_quota: number;
  overage_rate: string | null;
  context_window: number;
  team_support: boolean;
  description: string;
}

const UpgradeMembershipModal = ({ open, onClose }: UpgradeMembershipProps) => {
  const { subscriptionPlans, loading, error } = useSubscriptionPlans()
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const handleClose = () => onClose(false)
  const handlePlanSelection = (plan: SubscriptionPlan) => setSelectedPlan(plan)

  const style = {
    dialogContainer: {},
    dialogBox: {
      border: '1px #3C3C3C solid',
      display: 'flex',
      flexDirection: 'row',
    },
    subscriptionsContainer: {
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'column',
      padding: '35px 45px',
    },
      pricingSummaryContainer: {
      display: 'flex',
        flex: 1,
      flexDirection: 'column',
      alignItems: 'start',
      background: '#0F0F15',
      borderLeft: '1px solid #3C3C3C',
      padding: '35px 45px',
      minWidth: '350px',
      justifyContent: 'space-between',
    },
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={style.dialogContainer}
      PaperProps={{
        sx: { background: '#09090E', maxWidth: 'unset', width: 'auto' }, // Removes width restrictions
      }}
    >
      <Box sx={style.dialogBox}>
        <Box sx={style.subscriptionsContainer}>
          {renderUpgradeDescriptionContents(subscriptionPlans, selectedPlan, handlePlanSelection)}
        </Box>
        <Box sx={style.pricingSummaryContainer}>
          {renderSummaryContents(selectedPlan)}
        </Box>
      </Box>
    </Dialog>
  )
}

const renderUpgradeDescriptionContents = (
  subscriptionPlans: any,
  selectedPlan: SubscriptionPlan | null,
  handlePlanSelection: (plan: SubscriptionPlan) => void
) => {
  return (
    <React.Fragment>
      <Typography variant="h3">Upgrade subscription</Typography>
      <Typography variant="body2">
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

const renderSummaryContents = (selectedPlan: SubscriptionPlan | null) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <Box>
        {!selectedPlan ? (
          <Typography variant="body1">
            No subscription selected
          </Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontFamily: '"JetBrains Mono", monospace',
                background: selectedPlan.name.toLowerCase().includes('pro+') || selectedPlan.name.toLowerCase().includes('pro plus')
                  ? 'linear-gradient(to right, #7C5EFD, #FB5EC0)'
                  : selectedPlan.name.toLowerCase().includes('pro')
                    ? 'linear-gradient(to right, #FFB42A, #F85E8A)'
                    : 'none',
                WebkitBackgroundClip: selectedPlan.name.toLowerCase().includes('pro') ? 'text' : 'border-box',
                WebkitTextFillColor: selectedPlan.name.toLowerCase().includes('pro') ? 'transparent' : '#808080',
                fontWeight: 500
              }}
            >
              {selectedPlan.name}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '24px' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8, color: '#7C5EFD' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="span">
                      <Box component="span" sx={{ color: '#B5B5B5', fontFamily: 'Kanit, sans-serif' }}>Premium calls quota:</Box>
                      <Box component="span" sx={{ ml: 1, fontFamily: 'Kanit, sans-serif' }}>{selectedPlan.premium_calls_quota}</Box>
                    </Box>
                  }
                />
              </ListItem>
              {selectedPlan.overage_rate && (
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '24px' }}>
                    <FiberManualRecordIcon sx={{ fontSize: 8, color: '#7C5EFD' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box component="span">
                        <Box component="span" sx={{ color: '#B5B5B5', fontFamily: 'Kanit, sans-serif' }}>Overage rate:</Box>
                        <Box component="span" sx={{ ml: 1, fontFamily: 'Kanit, sans-serif' }}>{selectedPlan.overage_rate}</Box>
                      </Box>
                    }
                  />
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon sx={{ minWidth: '24px' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8, color: '#7C5EFD' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="span">
                      <Box component="span" sx={{ color: '#B5B5B5', fontFamily: 'Kanit, sans-serif' }}>Context window:</Box>
                      <Box component="span" sx={{ ml: 1, fontFamily: 'Kanit, sans-serif' }}>{selectedPlan.context_window}</Box>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '24px' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8, color: '#7C5EFD' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box component="span">
                      <Box component="span" sx={{ color: '#B5B5B5', fontFamily: 'Kanit, sans-serif' }}>Team support:</Box>
                      <Box component="span" sx={{ ml: 1, fontFamily: 'Kanit, sans-serif' }}>{selectedPlan.team_support ? 'Yes' : 'No'}</Box>
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
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            fontFamily: 'Kanit, sans-serif',
            fontSize: '24px',
            fontWeight: 300,
          }}>
            <Typography
              sx={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: '24px',
                fontWeight: 300,
                color: '#FFFFFF',
              }}
            >
              {parseFloat(selectedPlan.monthly_fee).toFixed(0)}$
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: '14px',
                fontWeight: 300,
                color: '#B5B5B5',
                ml: 1,
                alignSelf: 'flex-end',
                mb: 0.5
              }}
            >
              / month
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: 'linear-gradient(to right, #7C5EFD, #FB5EC0)',
              borderRadius: '8px',
              padding: '12px 0',
              fontFamily: 'Kanit, sans-serif',
              textTransform: 'none',
              fontWeight: 400,
              fontSize: '16px',
              '&:hover': {
                background: 'linear-gradient(to right, #6B4FE0, #E54DAF)',
              }
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  )
}

interface RadioGroupExampleProps {
  subscriptionPlans: any;
  selectedPlan: SubscriptionPlan | null;
  onPlanSelect: (plan: SubscriptionPlan) => void;
}

const RadioGroupExample = ({ subscriptionPlans, selectedPlan, onPlanSelect }: RadioGroupExampleProps) => {
  const plans = useMemo(() => {
    if (Array.isArray(subscriptionPlans)) {
      return subscriptionPlans;
    } else if (subscriptionPlans && Array.isArray(subscriptionPlans.plans)) {
      return subscriptionPlans.plans;
    }
    return [];
  }, [subscriptionPlans]);


  const getGradientForPlan = (planName: string) => {
    if (!planName) return '#808080, #808080'; // Default gray

    const name = planName.toLowerCase();
    if (name.includes('pro+') || name.includes('pro plus')) {
      return '#7C5EFD, #FB5EC0'; // Pro+ gradient
    } else if (name.includes('pro')) {
      return '#FFB42A, #F85E8A'; // Pro gradient
    } else if (name.includes('free')) {
      return '#808080, #808080'; // Free tier gray
    }

    return '#808080, #808080'; // Default gray
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mt: 2 }}>
      {map(plans, (plan) => {
        const gradient = getGradientForPlan(plan.name);
        return (
          <RadioOption
            key={plan.id}
            label={plan.name}
            description={plan.description}
            price={plan.monthly_fee}
            selected={selectedPlan?.id === plan.id}
            onChange={() => onPlanSelect(plan)}
            gradient={gradient}
          />
        );
      })}
    </Box>
  );
};

interface RadioOptionProps {
  label: string
  description: string
  price: string
  selected: boolean
  onChange: () => void
  gradient: string // Gradient for both radio and text
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  description,
  price,
  selected,
  onChange,
  gradient,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px 15px',
        borderRadius: '8px',
        border: '1px solid #3C3C3C',
        backgroundColor: '#1B1A20',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': { backgroundColor: '#222127' },
        maxWidth: '450px',
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
        {price}$
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
  const gradientId = `grad-${gradient.replace(/[^a-zA-Z0-9]/g, '')}`;

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
  );
};

export default UpgradeMembershipModal
