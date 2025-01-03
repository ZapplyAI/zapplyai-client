'use client'
import React, { useState } from 'react'
import { Box, InputBase } from '@mui/material'
import {
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import DecorRect from '@/app/(components)/DecorRect'

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
              fontFamily: 'Orbitron',
              fontWeight: '500',
              marginBottom: '14px',
              color: '#E5E5E5',
              textTransform: 'none',
            }}
          >
            <span style={{ position: 'relative', marginLeft: '30px'}}>
              <DecorRect
                sx={{ left: '-30px', top: '40%', background: '#403486' }}
              />
              Subscribe for newsletter
            </span>

          </Typography>
          <Typography
            variant={'body2' as any}
            sx={{
              fontSize: '14px',
            }}
          >
            Elastic development teams works days and nights to deliver
            futuristic development experience to our users. We value your trust,
            and will be sure to update you about new features when we release
            them.
          </Typography>
          <Box sx={{ width: '60%', marginTop: '20px' }}>
            <EmailInput showAlert={showAlert} />
          </Box>
        </VerticalLeftAlignBox>
      </VerticalCenterBox>
    </Box>
  )
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  padding: '5px 14px',
  fontSize: '16px',
  color: '#7E7E7E',
  fontFamily: 'JetBrains Mono, monospace',
  borderBottom: '1px solid #7E7E7E',
  transition: 'none',
  '&:hover': {
    borderBottom: '1px solid #9E9E9E',
  },
  '&:focus-within': {
    color: '#fff',
    borderBottom: '1px solid #9E9E9E',
    outline: 'none',
  },
}))

interface CustomInputProps {
  showAlert: any
}

const EmailInput = ({ showAlert }: CustomInputProps) => {
  const [value, setValue] = useState('')

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <StyledInputBase
        value={value}
        placeholder={'Your email'}
        onChange={e => {
          setValue(e.target.value)
          showAlert()
        }}
        onSubmit={e => {
          // e.preventDefault()
        }}
      />
    </Box>
  )
}
