'use client'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import {
  HorizontalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import StickyBox from 'react-sticky-box'
import Typography from '@mui/material/Typography'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DecodeAnimation from 'react-decode-animation'
import DecorRect from '@/app/(components)/DecorRect'
import map from 'lodash/map'

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
  const style = {
    advantageItem: {
      width: '298px',
      border: '#343434 1px solid',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '10px 15px',
      textTransform: 'uppercase',
      marginBottom: '-1px',
    },
    label: {
      fontWeight: '200',
      color: '#E5E5E5',
      width: '100%',
      textAlign: alignItems,
    },
    labelCTA: {
      fontWeight: '200',
      width: '100%',
      textAlign: alignItems,
      background:
        'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3ABA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
    },
  }
  return (
    <VerticalLeftAlignBox
      sx={
        isMobile
          ? {
              justifyContent: 'end',
              position: 'absolute',
              right: '0',
              top: '0',
            }
          : {}
      }
    >
      <Box>
        {map(items, (item, index) => (
          <CustomDecodeAnimation
            key={index}
            itemOptions={item}
            alignItems={alignItems}
            activeItem={activeItem}
          />
        ))}
      </Box>

      <HorizontalCenterBox sx={{ ...style.advantageItem, marginTop: '90px' }}>
        <Typography
          component={'div'}
          variant={'body1' as any}
          sx={{ ...style.labelCTA, flex: 1 }}
        >
          <CustomDecodeAnimation
            alignItems={alignItems}
            key={-1}
            activeItem={activeItem}
            itemOptions={ctaButtonItems}
          />
        </Typography>
        <ArrowCircleRightIcon
          sx={{
            width: '22px',
            height: '22px',
            color: '#C932A1',
            marginLeft: '12px',
          }}
        />
      </HorizontalCenterBox>
    </VerticalLeftAlignBox>
  )
}

interface CustomDecodeAnimationProps {
  alignItems?: 'left' | 'right'
  activeItem: number
  itemOptions: string[]
}

const CustomDecodeAnimation = ({
  alignItems,
  activeItem,
  itemOptions,
}: CustomDecodeAnimationProps) => {
  const style = {
    advantageItem: {
      width: '298px',
      border: '#343434 1px solid',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '10px 15px',
      textTransform: 'uppercase',
      marginBottom: '-1px',
    },
    label: {
      fontWeight: '200',
      color: '#E5E5E5',
      width: '100%',
      textAlign: alignItems,
    },
  }

  return (
    <Box sx={style.advantageItem}>
      <Typography component={'div'} variant={'body1' as any} sx={style.label}>
        <DecodeAnimation
          customCharacters="ΑΒΓΔΕΖΗΘΙΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω"
          autoplay
          interval={25}
          text={itemOptions[activeItem]}
        />
      </Typography>
    </Box>
  )
}
