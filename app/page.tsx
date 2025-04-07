'use client'
import React, { useEffect, useRef, useState } from 'react'
import { MainSection } from '@/app/(home-page-sections)/main/MainSection'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { TopNav } from '@/app/(navigation)/TopNav'
import { FasterCoding } from '@/app/(home-page-sections)/fasterCoding/FasterCoding'
import { ContextAware } from '@/app/(home-page-sections)/contextAware/ContextAware'
import { Footer } from '@/app/(home-page-sections)/footer/Footer'
import StarrySky from '@/app/(home-page-sections)/main/StarrySky'
import Marquee from 'react-fast-marquee'
import Typography from '@mui/material/Typography'
import { Box, Theme, useTheme } from '@mui/material'
import Image from 'next/image'
import { HorizontalLeftAlignBox } from '@/components/layouts/CenterBox'
import { DetailListingDesktop } from '@/app/(home-page-sections)/detailListing/DetailListing'
import { PricingOptions } from '@/app/(home-page-sections)/pricingOptions/PricingOptions'
import UnavailabilityAlert from '@/app/(components)/UnavailabilityAlert'
import DecorRect from '@/app/(components)/DecorRect'
import LoadingAnimHUD from '@/app/(components)/LoadingAnimHUD'

export default function HomePage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const theme = useTheme()
  const [unavailabilityAlertOpen, setUnavailabilityAlertOpen] = useState(false)

  const [position, setPosition] = useState(0)

  const fasterCodingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const checkScrollPosition = () => {
      if (fasterCodingRef.current) {
        const fasterCodingRect = (
          fasterCodingRef.current as HTMLElement
        ).getBoundingClientRect()

        if (fasterCodingRect.bottom < 160) {
          setPosition(() => 1)
        } else {
          setPosition(() => 0)
        }
      }
    }

    window.addEventListener('scroll', checkScrollPosition)
    return () => window.removeEventListener('scroll', checkScrollPosition)
  }, [fasterCodingRef])

  return (
    <React.Fragment>
      <UnavailabilityAlert
        isMobile={isMobile}
        onClose={() => setUnavailabilityAlertOpen(false)}
        open={unavailabilityAlertOpen}
        selectedValue={''}
      />

      <TopNav
        isMobile={isMobile}
        showAlert={() => setUnavailabilityAlertOpen(true)}
      />
      <main>
        <MainSection
          isMobile={isMobile}
          showAlert={() => setUnavailabilityAlertOpen(true)}
        />
        {renderLoadingAdvantages(theme, isMobile)}
        <Box sx={{ position: 'relative' }}>
          {!isMobile && (
            <DetailListingDesktop isMobile={isMobile} position={position} />
          )}
          <FasterCoding ref={fasterCodingRef} isMobile={isMobile} />
          <ContextAware isMobile={isMobile} />
        </Box>
        <PricingOptions
          isMobile={isMobile}
          showAlert={() => setUnavailabilityAlertOpen(true)}
        />
        <Footer />
      </main>
    </React.Fragment>
  )
}

const renderRunningMiniText = (theme: Theme, isMobile: boolean) => {
  return (
    <Box
      sx={{
        padding:
          '12px ' +
          (isMobile
            ? theme.customSpacing?.sides.mobile
            : theme.customSpacing?.sides.desktop),
        background: '#1B1A20',
      }}
    >
      <Typography
        variant={'body2' as any}
        sx={{ color: '#666666', width: '100%', textAlign: 'left' }}
      >
        <span style={{ color: '#FF6154', fontWeight: '400' }}>
          We are on ProductHunt!
        </span>
        {isMobile
          ? ' Free, non-commercial version (v.0.1.1) is now out!'
          : ' Elastic Copilot is now on a free, non-commercial version (v.0.1.1). Don\'t waste a chance to get a taste!'}
      </Typography>

      <HorizontalLeftAlignBox sx={{ marginTop: '8px' }}>
        <Typography
          variant={'body1' as any}
          sx={{
            color: '#666666',
            fontSize: '0.755rem',
            textAlign: 'center',
          }}
        >
          producthunt.com/posts/elasticcopilot
        </Typography>
        <Image
          src="/icons/product-hunt.svg"
          alt="CPP"
          width={18}
          height={18}
          style={{ marginLeft: '12px', color: '#FF6154' }}
        />
      </HorizontalLeftAlignBox>
    </Box>
  )
}

const renderRunningMainText = (isMobile: boolean) => {
  const style = {
    decorativeRect: {
      position: 'absolute',
      background: '#775EFF',
      width: '10px',
      height: '10px',
    },
  }
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '15px 0px',
        borderTop: '1px solid #5E5E5E',
        borderBottom: '1px solid #5E5E5E',
      }}
    >
      <Marquee>
        <Typography
          variant={'h1' as any}
          sx={{ fontSize: isMobile ? '5rem' : '7.5rem', overflow: 'hidden' }}
        >
          ITS SIMPLY ELASTIC. ITS SIMPLY ELASTIC. ITS SIMPLY ELASTIC.
        </Typography>
      </Marquee>

      <DecorRect
        sx={
          isMobile
            ? { background: '#413486', top: '8px', left: '8px' }
            : { top: '8px', left: '8px' }
        }
      />
      {!isMobile && <DecorRect sx={{ bottom: '8px', right: '8px' }} />}
    </Box>
  )
}

const renderLoadingAdvantages = (theme: Theme, isMobile: boolean) => {
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
        padding:
          '0px ' +
          (isMobile
            ? theme.customSpacing?.sides.mobile
            : theme.customSpacing?.sides.desktop),
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
        <LoadingAnimHUD label={'loading advantages ...'} />
      </HorizontalLeftAlignBox>
    </Box>
  )
}
