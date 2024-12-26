'use client'
import React, { useState } from 'react'
import { Box, InputBase } from '@mui/material'
import {
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

export const SubscribeNewsletter = ({ showAlert }: { showAlert: any }) => {
  const style = {}

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        borderTop: '1px solid #5E5E5E',
        borderBottom: '1px solid #5E5E5E',
      }}
    >
      <VerticalCenterBox
        sx={{
          margin: '0px 12vw',
          padding: '50px 10%',
        }}
      >
        <VerticalLeftAlignBox>
          <Typography
            variant={'h2' as any}
            sx={{
              marginBottom: '10px',
              color: '#E5E5E5',
              textTransform: 'uppercase',
            }}
          >
            Subscribe for newsletter
          </Typography>
          <Typography
            variant={'body2' as any}
            sx={{
              textTransform: 'uppercase',
            }}
          >
            Elastic development teams works days and nights to deliver
            futuristic development experience to our users. We value your trust,
            and will be sure to update you about new features when we release
            them.
          </Typography>
          <Box sx={{ width: '50%' }}>
            <EmailInput showAlert={showAlert} label={'Your email'} />
          </Box>
        </VerticalLeftAlignBox>
      </VerticalCenterBox>
    </Box>
  )
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  padding: '10px 16px',
  fontSize: '16px',
  fontFamily: 'JetBrains Mono, monospace',
  borderBottom: '1px solid #BDBDBD', // Default underline
  transition: 'none', // Disable animations
  '&:hover': {
    borderBottom: '1px solid #9E9E9E', // Slightly darker underline on hover
  },
  '&:focus-within': {
    borderBottom: '1px solid #757575', // Lighter underline on focus
    outline: 'none',
  },
}))

const Label = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '16px',
  color: '#7E7E7E',
  fontFamily: 'JetBrains Mono, monospace',
  transition: 'none', // Disable label animations
  pointerEvents: 'none', // Prevent label from being interacted with
}))

interface CustomInputProps {
  showAlert: any
  label: string
}

const EmailInput = ({ showAlert, label }: CustomInputProps) => {
  const [value, setValue] = useState('')

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Label
        style={{
          display: value ? 'none' : 'block', // Hide label when input has value
        }}
      >
        {label}
      </Label>
      <StyledInputBase
        value={value}
        onChange={e => {
          setValue(e.target.value)
          showAlert()
        }}
        onSubmit={e => {
          // e.preventDefault()
        }}
        placeholder={value ? undefined : label} // Use placeholder for accessibility
      />
    </Box>
  )
}
