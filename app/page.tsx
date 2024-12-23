'use client'
import React, { useEffect, useRef, useState } from 'react'
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
import { Box, Divider, IconButton } from '@mui/material'
import {
  HorizontalLeftAlignBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import { DetailListing } from '@/app/(sections)/detailListing/DetailListing'
import { PricingOptions } from '@/app/(sections)/pricingOptions/PricingOptions'
import { SubscribeNewsletter } from '@/app/(sections)/subscribeNewsletter/SubscribeNewsletter'

export default function HomePage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  // const { name, surname, setName, setSurname } = useLandingContext()

  const [position, setPosition] = useState(1)

  const fasterCodingRef = useRef(null)

  useEffect(() => {
    const checkScrollPosition = () => {
      const fasterCodingRect = fasterCodingRef.current.getBoundingClientRect()

      if (fasterCodingRect.bottom < 160) {
        setPosition(() => 2)
      } else {
        setPosition(() => 1)
      }
    }

    window.addEventListener('scroll', checkScrollPosition)
    return () => window.removeEventListener('scroll', checkScrollPosition)
  }, [fasterCodingRef])

  return (
    <React.Fragment>
      <StarrySky />
      <TopNav isMobile={isMobile} />
      {renderRunningMiniText()}
      {renderRunningMainText()}


      <main>
        <MainSection />
        {renderLoadingAdvantages()}
        <Box sx={{ position: 'relative' }}>
          <DetailListing position={position} />
          <FasterCoding ref={fasterCodingRef} />
          <ContextAware/>
        </Box>
        <PricingOptions />
        <SubscribeNewsletter/>
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
        <Typography
          variant={'h1'}
          sx={{ fontSize: '7.5rem', overflow: 'hidden' }}
        >
          ITS SIMPLY ELASTIC. ITS SIMPLY ELASTIC. ITS SIMPLY ELASTIC.
        </Typography>
      </Marquee>
    </Box>
  )
}

const renderLoadingAdvantages = () => {
  const style = {
    bigNumber: {
      fontSize: '40px',
      color: '#AEAEAE',
      fontFamily: 'JetBrains Mono, sans-serif',
      marginBottom: '12px',
    },
    divider: {
      border: '1px #393939 solid',
      height: '80px',
    },
  }

  return (
    <Box
      sx={{
        padding: '0px 12vw',
      }}
    >
      <HorizontalLeftAlignBox
        sx={{
          borderLeft: '1px solid #5E5E5E',
          borderRight: '1px solid #5E5E5E',
          paddingTop: '80px',
          paddingBottom: '30px',
          paddingLeft: '30px',
        }}
      >
        <VerticalLeftAlignBox>
          <Typography variant={'body2'} sx={{ marginBottom: '5px' }}>
            loading advantages ...
          </Typography>
          <span
            style={{
              position: 'relative',
              width: '200px',
              height: '6px',
              background: '#222222',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '120px',
                height: '6px',
                background: '#E5E5E5',
              }}
            />
          </span>
        </VerticalLeftAlignBox>
      </HorizontalLeftAlignBox>
    </Box>
  )
}

const style = {}
