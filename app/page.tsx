'use client'
import React from 'react'
import { useLandingContext } from '@/contexts/LandingProvider'
import { MainSection } from '@/app/(sections)/main/MainSection'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { TopNav } from '@/app/(navigation)/TopNav'
import { FasterCoding } from '@/app/(sections)/fasterCoding/FasterCoding'
import { ContextAware } from '@/app/(sections)/contextAware/ContextAware'
import { Footer } from '@/app/(sections)/footer/Footer'
import StarrySky from '@/app/(sections)/main/StarrySky'
import Marquee from 'react-fast-marquee'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { VerticalLeftAlignBox } from '@/components/layouts/CenterBox'

export default function HomePage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { name, surname, setName, setSurname } = useLandingContext()

  return (
    <React.Fragment>
      <TopNav isMobile={isMobile} />
      {renderRunningMiniText()}
      {renderRunningMainText()}
      <StarrySky />
      <main>
        <MainSection />
        <FasterCoding />
        <ContextAware />
        <Footer />
      </main>
    </React.Fragment>
  )
}

const renderRunningMiniText = () => {
  return (
    <Box
      sx={{
        padding: '12px 0px',
        background: '#1B1A20',
        borderTop: '1px solid #5E5E5E',
        borderBottom: '1px solid #5E5E5E',
      }}
    >
      <Marquee>
        <Typography variant={'body2'}>
          Elastic AI is now on a free-trial version (v.0.1.1). Make sure you
          don’t waste the opportunity and get it while you still can. Let me
          repeat that. Elastic AI is now on a free-trial version (v.0.1.1). Make
          sure you don’t waste the opportunity and get it while you still can.
        </Typography>
      </Marquee>
    </Box>
  )
}

const renderRunningMainText = () => {
  return (
      <Box
        sx={{
          padding: '15px 0px',
          borderTop: '1px solid #5E5E5E',
          borderBottom: '1px solid #5E5E5E',
        }}
      >
        <Marquee>
          <Typography variant={'h1'} sx={{ fontSize: '7.5rem' }}>
            ITS SIMPLY ELASTIC. ITS SIMPLY ELASTIC. ITS SIMPLY ELASTIC.
          </Typography>
        </Marquee>
      </Box>
  )
}

const style = {}
