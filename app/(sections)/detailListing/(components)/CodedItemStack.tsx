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
              // margin: '0px ' + theme.customSpacing?.sides.mobile,
              // justifyContent: 'end',
              // position: 'absolute',
              // right: '0',
              // top: '0',
            }
          : {}
      }
    >
      <Box sx={{ width: '100%' }}>
        {map(items, (item, index) => (
          <HorizontalLeftAlignBox sx={style.advantageItem}>
            <CustomDecodeAnimation
              key={index}
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
            width: '22px',
            height: '22px',
            color: '#C932A1',
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
      fontWeight: '200',
      color: '#E5E5E5',
      // width: '100%',
      textAlign: alignItems,
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
