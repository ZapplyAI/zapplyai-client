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
