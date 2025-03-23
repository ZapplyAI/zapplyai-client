'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import PageCard from '@/app/dashboard/(components)/PageCard'
import { Box, FormControl } from '@mui/material'
import { Button, Input } from '@/components'
import GoogleIcon from '@mui/icons-material/Google'
import Typography from '@mui/material/Typography'

export default function DashboardPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [selectedSection, setSelectedSection] = useState('Login') // or Register

  const y = useRef<HTMLDivElement | null>(null)

  useEffect(() => {}, [])

  const goToLogin = () => {
    selectedSection !== 'Login' && setSelectedSection('Login')
  }
  const goToRegistration = () => {
    selectedSection !== 'Registration' && setSelectedSection('Registration')
  }

  return (
    <PageCard
      title={'Welcome to Elastic Dashboard'}
      rightComponents={<div></div>}
      sx={{ marginTop: '-100px' }}
    >
      {selectedSection === 'Login'
        ? renderLoginSection(isMobile, goToLogin, goToRegistration)
        : renderRegistrationSection(isMobile, goToLogin, goToRegistration)}
    </PageCard>
  )
}

const renderLoginSection = (
  isMobile: boolean,
  goToLogin: any,
  goToRegistration: any
) => {
  return (
    <React.Fragment>
      <Input
        onChange={e => {}}
        isMobile={isMobile}
        placeholder={'email'}
        fullWidth
        sendIcon={false}
        sx={{ borderRadius: 0, border: '1px solid #5E5E5E', marginTop: '18px' }}
      />
      <Input
        onChange={e => {}}
        isMobile={isMobile}
        placeholder={'password'}
        fullWidth
        sendIcon={false}
        sx={{ borderRadius: 0, border: '1px solid #5E5E5E', marginTop: '18px' }}
      />

      <div style={{ height: '35px', width: '100%' }} />

      <Button
        action={goToLogin}
        label={'Login'}
        fullWidth
        sx={{ background: '#775EFF', borderRadius: 0, marginBottom: '8px' }}
      />
      <Button
        action={goToRegistration}
        label={'Register'}
        fullWidth
        sx={{ background: '#222222', borderRadius: 0 }}
      />

      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '65px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'JetBrains Mono, sans-serif',
            fontSize: '16px',
            color: '#585858',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Or
        </Typography>
      </span>

      <Button
        label={'Continue with Google'}
        fullWidth
        sx={{ background: '#184DE1' }}
        icon={<GoogleIcon />}
      />
    </React.Fragment>
  )
}

const renderRegistrationSection = (
  isMobile: boolean,
  goToLogin: any,
  goToRegistration: any
) => {
  return (
    <React.Fragment>
      <Input
        onChange={e => {}}
        isMobile={isMobile}
        placeholder={'email'}
        fullWidth
        sendIcon={false}
        sx={{ borderRadius: 0, border: '1px solid #5E5E5E', marginTop: '18px' }}
      />
      <Input
        onChange={e => {}}
        isMobile={isMobile}
        placeholder={'password'}
        fullWidth
        sendIcon={false}
        sx={{ borderRadius: 0, border: '1px solid #5E5E5E', marginTop: '18px' }}
      />
      <Input
        onChange={e => {}}
        isMobile={isMobile}
        placeholder={'repeat password'}
        fullWidth
        sendIcon={false}
        sx={{ borderRadius: 0, border: '1px solid #5E5E5E', marginTop: '18px' }}
      />

      <div style={{ height: '35px', width: '100%' }} />

      <Button
        action={() => {}}
        label={'Register'}
        fullWidth
        sx={{ background: '#775EFF', borderRadius: 0, marginBottom: '8px' }}
      />
      <Button
        action={goToLogin}
        label={'Back to Login'}
        fullWidth
        sx={{ background: '#222222', borderRadius: 0 }}
      />
    </React.Fragment>
  )
}
