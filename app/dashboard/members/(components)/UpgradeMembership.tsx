import { Box, Radio, Dialog } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

interface UpgradeMembershipProps {
  open: boolean
  onClose: (membershipUpdated: boolean) => void
}

const UpgradeMembership = ({ open, onClose }: UpgradeMembershipProps) => {
  const handleClose = () => {
    onClose(false)
  }

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
      flexDirection: 'column',
      alignItems: 'start',
      background: '#0F0F15',
      borderLeft: '1px solid #3C3C3C',
      padding: '35px 45px',
    },
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={style.dialogContainer}
      PaperProps={{
        sx: { background: '#09090E',maxWidth: 'unset', width: 'auto' }, // Removes width restrictions
      }}
    >
      <Box sx={style.dialogBox}>
        <Box sx={style.subscriptionsContainer}>
          {renderUpgradeDescriptionContents()}
        </Box>
        <Box sx={style.pricingSummaryContainer}>{renderSummaryContents()}</Box>
      </Box>
    </Dialog>
  )
}

const renderUpgradeDescriptionContents = () => {
  return (
    <React.Fragment>
      <Typography variant="h3">Upgrade subscription</Typography>
      <Typography variant="body2">
        You are currently on a FREE subscription
      </Typography>

      <RadioGroupExample />
    </React.Fragment>
  )
}

const renderSummaryContents = () => {
  return (
    <React.Fragment>
      <Typography variant="h3">Summary</Typography>

    </React.Fragment>
  )
}

const RadioGroupExample = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>('Plus Plan')

  const handleSelection = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <RadioOption
        label="Plus Plan"
        description="20,000 requests / month"
        price="15$"
        selected={selectedValue === 'Plus Plan'}
        onChange={() => handleSelection('Plus Plan')}
        gradient="#7F5EFC, #F85EC1"
      />
      <RadioOption
        label="Teams Plan"
        description="500,000 requests / month"
        price="30$"
        selected={selectedValue === 'Teams Plan'}
        onChange={() => handleSelection('Teams Plan')}
        gradient="#FFB42A, #F85E8A"
      />
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
      }}
      onClick={onChange}
    >
      {/* Custom Gradient Radio Button */}
      <GradientRadio
        selected={selected}
        onChange={onChange}
        gradient={gradient}
      />

      {/* Title with Always-On Gradient */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '10px',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            background: `linear-gradient(to right, ${gradient})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '300',
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: '200',
          }}
        >
          {description}
        </Typography>
      </Box>

      <Typography variant={'body2'} sx={{ marginLeft: '22px' }}>
        {price}
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
})

const GradientRadio: React.FC<GradientRadioProps> = ({
  selected,
  onChange,
  gradient,
}) => (
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
        <circle cx="12" cy="12" r="6" fill={`url(#grad)`} />
        <defs>
          <linearGradient id="grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={gradient.split(',')[0].trim()} />
            <stop offset="100%" stopColor={gradient.split(',')[1].trim()} />
          </linearGradient>
        </defs>
      </svg>
    }
  />
)

export default UpgradeMembership
