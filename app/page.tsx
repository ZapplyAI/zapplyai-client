'use client'
import React, { useEffect, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { TopNav } from '@/app/(navigation)/TopNav'
import { Footer } from '@/app/(home-page-sections)/footer/Footer'
import { Box } from '@mui/material'
import { HeroSection } from '@/app/(home-page-sections)/hero/HeroSection'
import { FeaturesSection } from '@/app/(home-page-sections)/features/FeaturesSection'
import { ExamplesSection } from '@/app/(home-page-sections)/examples/ExamplesSection'
import { PricingSection } from '@/app/(home-page-sections)/pricing/PricingSection'
import UnavailabilityAlert from '@/app/(components)/UnavailabilityAlert'
import Image from 'next/image'

// Social links component
const SocialLinks = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: isMobile ? '100px' : '150px',
        left: isMobile ? '10px' : '20px',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: isMobile ? '60px' : '70px',
          height: isMobile ? '210px' : '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          border: '1px solid rgba(119, 94, 255, 0.5)',
          background: 'rgba(10, 9, 14, 0.8)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Image
          src="/icons/linkedin_icon.png"
          alt="LinkedIn"
          width={isMobile ? 30 : 38}
          height={isMobile ? 30 : 38}
        />
        <Image
          src="/icons/telegram_icon.png"
          alt="Telegram"
          width={isMobile ? 30 : 38}
          height={isMobile ? 30 : 38}
        />
        <Image
          src="/icons/twitter_x_icon.png"
          alt="X"
          width={isMobile ? 30 : 38}
          height={isMobile ? 30 : 38}
        />
      </Box>
    </div>
  )
}

export default function HomePage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [unavailabilityAlertOpen, setUnavailabilityAlertOpen] = useState(false)

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
      <SocialLinks isMobile={isMobile} />
      <main style={{ paddingTop: '70px' }}>
        <HeroSection 
          isMobile={isMobile} 
          showAlert={() => setUnavailabilityAlertOpen(true)} 
        />
        <FeaturesSection isMobile={isMobile} />
        <ExamplesSection isMobile={isMobile} />
        <PricingSection 
          isMobile={isMobile} 
          showAlert={() => setUnavailabilityAlertOpen(true)} 
        />
        <Footer isMobile={isMobile} />
      </main>
    </React.Fragment>
  )
}
