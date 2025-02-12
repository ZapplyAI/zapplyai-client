'use client'
import React, { Suspense } from 'react'
import { Box, useTheme } from '@mui/material'
import {
  HorizontalCenterBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import Spline from '@splinetool/react-spline'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ClippedButton from '@/app/(components)/ClippedButton'
import map from 'lodash/map'
import DecorRect from '@/app/(components)/DecorRect'

interface PricingOptionsProps {
  showAlert: any
  isMobile: boolean
}

export const PricingOptions = ({
  showAlert,
  isMobile,
}: PricingOptionsProps) => {
  const theme = useTheme()

  const style = {
    mainIllustration: {
      position: 'relative',
      left:
        '-' +
        (isMobile
          ? theme.customSpacing?.sides.mobile
          : theme.customSpacing?.sides.desktop),
      top: 0,
    },
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        borderTop: '1px solid #2F2E30',
        borderBottom: '1px solid #5F5F5F',
      }}
    >
      <Box
        sx={{
          margin:
            '0px ' +
            (isMobile
              ? theme.customSpacing?.sides.mobile
              : theme.customSpacing?.sides.desktop),
          border: '1px solid transparent',
          borderImage: 'linear-gradient(180deg, #2F2E30, #5F5F5F) 1',
          borderTop: 'none',
          borderBottom: 'none',
        }}
      >
        <VerticalLeftAlignBox>
          <Typography
            variant={'h2' as any}
            sx={{
              position: 'relative',
              background: 'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3A3D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              width: isMobile ? 'auto' : '100%',
              padding: isMobile ? '28px 45px' : '28px 55px',
              borderBottom: '1px solid #1E1D20',
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 600,
            }}
          >
            <span style={{ position: 'relative' }}>
              Choose Your Plan
              {!isMobile && (
                <DecorRect
                  sx={{ right: '-40px', top: '50%', background: '#403486' }}
                />
              )}
            </span>

            {isMobile && (
              <DecorRect
                sx={{ top: '8px', right: '8px', background: '#403486' }}
              />
            )}
          </Typography>
          {renderPlansBoxes(isMobile)}
        </VerticalLeftAlignBox>
      </Box>
    </Box>
  )
}

const renderPlansBoxes = (isMobile: boolean) => {
  return (
    <HorizontalCenterBox
      sx={{
        width: '100%',
        alignItems: 'start',
        justifyContent: 'center',
        position: 'relative',
        overflow: isMobile ? 'hidden' : 'visible',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '16px',
        padding: '24px 0',
      }}
    >
      {renderPricingOffer(
        'Individual',
          'Advanced code generation, bug fixes, and comprehensive development support for individual developers.',
          '#825AFD, #ED3A55',
          [
            'Advanced Code Generation',
            'Instant Bug Detection & Fixes',
            'Comprehensive SWE Support',
            'Effortless Integration',
          ]
      )}

      <Box
        sx={{
          flex: 1.5,
          height: '100%',
          position: 'relative',
        }}
      >
        <DecorRect sx={{ top: '8px', right: '8px', background: '#403486' }} />
      </Box>
      <HorizontalCenterBox
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          marginTop: '32px',
          zIndex: -1,
        }}
      >
        <PricesAnim />
      </HorizontalCenterBox>

      {renderPricingOffer(
        'Teams',
        'Enhanced features and integrations for collaborative development to accelerate delivery and enhance code quality.',
        '#FF945E, #ED3A55',
        [
          'All Individual Features',
          'Team Collaboration Tools',
          'Advanced Integrations',
          'Custom Workflows',
          'Priority Support',
        ]
      )}
    </HorizontalCenterBox>
  )
}

interface PriceHeaderBoxProps {
  title: string
  description: string
  gradient: string
}

const PriceHeaderBox = ({
  title,
  description,
  gradient,
}: PriceHeaderBoxProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '40px',
        background: 'rgba(25, 25, 30, 0.9)',
        borderRadius: '12px',
        border: '1px solid rgba(119, 94, 255, 0.2)',
        marginBottom: '35px',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: `linear-gradient(to right, ${gradient})`,
        },
      }}
    >
      <Typography
        variant={'h3' as any}
        sx={{
          fontSize: '2.5rem',
          fontWeight: 600,
          background: `linear-gradient(to right, ${gradient})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={'body1' as any}
        sx={{
          color: '#AEAEAE',
          fontSize: '1.1rem',
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}

const PricesAnim = () => {
  const onLoad = (splineApp: any) => {
    const object = splineApp.findObjectByName('RobotGroup')
    if (object) {
      console.log('object', object)
      object.scale.x = 1.18
      object.scale.y = 1.18
      object.scale.z = 1.18
      object.position.y -= 30
    }
  }

  return (
    <HorizontalCenterBox sx={{}}>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          scene="https://prod.spline.design/cMEdkrjJPVvtW5Qv/scene.splinecode"
          onLoad={onLoad}
          style={{ height: '650px', width: '650px' }}
        />
      </Suspense>
    </HorizontalCenterBox>
  )
}

const style = {
  advantageItem: {
    width: '100%',
    padding: '16px 24px',
    marginBottom: '12px',
    background: 'rgba(25, 25, 30, 0.5)',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(25, 25, 30, 0.8)',
      transform: 'translateX(8px)',
    },
  },
  label: {
    fontWeight: '400',
    color: '#E5E5E5',
    fontSize: '1rem',
    width: '100%',
  },
  labelCTA: {
    fontWeight: '200',
    width: '100%',
    textAlign: 'right',
    background: 'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3ABA 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
  },
}

const renderPricingOffer = (
  title: string,
  description: string,
  gradient: string,
  advantages: string[]
) => {
  const advantagesNodes = map(advantages, (advantageLabel, index) => (
    <Box sx={{ ...style.advantageItem }} key={index}>
      <Typography variant={'body1' as any} sx={style.label}>
        {advantageLabel}
      </Typography>
    </Box>
  ))

  return (
    <VerticalLeftAlignBox
      sx={{
        background: 'rgba(17, 17, 21, 0.75)',
        flex: 1,
        maxWidth: '500px',
        border: '1px solid #1E1D20',
      }}
    >
      <PriceHeaderBox
        title={title}
        description={description}
        gradient={gradient}
      />

      {advantagesNodes}

    </VerticalLeftAlignBox>
  )
}
