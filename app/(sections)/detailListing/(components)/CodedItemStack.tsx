import { Box, useTheme } from '@mui/material'
import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import map from 'lodash/map'
import Typography from '@mui/material/Typography'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DecodeAnimation from 'react-decode-animation'
import React from 'react'

interface ItemStackProps {
  isMobile?: boolean
  items: string[][]
  ctaButtonItems: string[]
  activeItem: number
  alignItems?: 'left' | 'right'
}

export const CodedItemStack = ({
  isMobile = false,
  items,
  ctaButtonItems,
  activeItem = 1,
  alignItems = 'right',
}: ItemStackProps) => {
  const theme = useTheme()

  const style = {
    advantageItem: {
      justifyContent: 'end',
      width: isMobile ? '100%' : '298px',
      background: 'rgba(119, 94, 255, 0.1)',
      borderRadius: '8px',
      padding: '16px 24px',
      marginBottom: '12px',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(119, 94, 255, 0.15)',
        transform: 'translateX(8px)',
      },
    },
    label: {
      fontWeight: '500',
      color: '#FFFFFF',
      width: '100%',
      textAlign: alignItems,
      fontSize: '1.25rem',
      letterSpacing: '-0.01em',
      textTransform: 'none',
    },
    labelCTA: {
      fontWeight: '500',
      width: '100%',
      textAlign: alignItems,
      background: 'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3ABA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
      fontSize: '1.25rem',
      letterSpacing: '-0.01em',
    },
    containerCTA: {
      width: '100%',
      marginTop: isMobile ? '45px' : '90px',
    },
  }
  return (
    <VerticalLeftAlignBox
      sx={
        isMobile
          ? {
              width: '100%',
            }
          : {}
      }
    >
      <Box sx={{ width: '100%' }}>
        {map(items, (item, index) => (
          <HorizontalLeftAlignBox key={index} sx={style.advantageItem}>
            <CustomDecodeAnimation
              isMobile={isMobile}
              itemOptions={item}
              alignItems={alignItems}
              activeItem={activeItem}
            />
          </HorizontalLeftAlignBox>
        ))}
      </Box>

      <HorizontalLeftAlignBox
        sx={{ ...style.advantageItem, marginTop: isMobile ? '40px' : '90px' }}
      >
        <Typography
          component={'div'}
          variant={'body1' as any}
          sx={{ ...style.labelCTA, flex: 1 }}
        >
          <CustomDecodeAnimation
            isMobile={isMobile}
            alignItems={alignItems}
            key={-1}
            activeItem={activeItem}
            itemOptions={ctaButtonItems}
          />
        </Typography>
        <ArrowCircleRightIcon
          sx={{
            width: '24px',
            height: '24px',
            color: '#DE3AED',
            marginLeft: '12px',
          }}
        />
      </HorizontalLeftAlignBox>
    </VerticalLeftAlignBox>
  )
}

interface CustomDecodeAnimationProps {
  isMobile?: boolean
  alignItems?: 'left' | 'right'
  activeItem: number
  itemOptions: string[]
}

const CustomDecodeAnimation = ({
  isMobile = false,
  alignItems,
  activeItem,
  itemOptions,
}: CustomDecodeAnimationProps) => {
  const style = {
    label: {
      fontWeight: '500',
      color: '#FFFFFF',
      textAlign: alignItems,
      fontSize: '1.25rem',
      letterSpacing: '-0.01em',
    },
  }

  return (
    <Typography component={'div'} variant={'body1' as any} sx={style.label}>
      <DecodeAnimation
        customCharacters="ΑΒΓΔΕΖΗΘΙΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω"
        autoplay
        interval={25}
        text={itemOptions[activeItem]}
      />
    </Typography>
  )
}
