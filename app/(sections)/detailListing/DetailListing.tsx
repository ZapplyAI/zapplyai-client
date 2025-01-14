'use client'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import StickyBox from 'react-sticky-box'
import DecorRect from '@/app/(components)/DecorRect'
import { CodedItemStack } from '@/app/(sections)/detailListing/(components)/CodedItemStack'

interface DetailListingProps {
  position: number
  isMobile: boolean
}

export const DetailListingDesktop = ({
  position,
  isMobile,
}: DetailListingProps) => {
  const theme = useTheme()

  return (
    <Box
      id="detail-listing-component"
      sx={{
        position: 'absolute',
        right: isMobile
          ? theme.customSpacing?.sides.mobile
          : theme.customSpacing?.sides.desktop,
        top: 0,
        border: '1px solid #5E5E5E',
        borderBottom: 'none',
        height: '100%',
        width: '300px',
        paddingTop: '150px',
        paddingBottom: '370px',
      }}
    >
      <StickyBox offsetTop={200} offsetBottom={200}>
        <CodedItemStack
          items={[
            ['Flexible Auto-Completes', '100% project coverage'],
            ['Just press tab', 'Always searching'],
            ['Gives you ideas!', 'Knows more then code'],
          ]}
          ctaButtonItems={[
            'check autocomplete examples',
            'check how semantics work',
          ]}
          activeItem={position}
        />
      </StickyBox>

      <DecorRect sx={{ bottom: '8px', left: '8px', background: '#403486' }} />
    </Box>
  )
}
