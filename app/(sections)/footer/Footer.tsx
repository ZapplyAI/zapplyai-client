import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
  VerticalCenterBox,
} from '@/components/layouts/CenterBox'
import Image from 'next/image'
import React from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export const Footer = () => {
  const style = {
    iconContainer: {
      width: '40px',
      height: '40px',
      border: '1px solid #444444',
      borderRadius: '500px',
      marginRight: '6px'
    },
  }

  return (
    <VerticalCenterBox sx={{padding: '55px 100px'}}>
      <HorizontalCenterBox sx={{ marginBottom: '22px' }}>
        <Image
          src="/image/brand/elastic_logo_small.svg"
          alt="X"
          width={1000}
          height={35}
          style={{
            marginRight: '12px',
            width: 'auto',
          }}
        />

        <Typography variant={'h1'} sx={{fontSize: '36px'}}>Elastic AI</Typography>
      </HorizontalCenterBox>

      <Typography
        variant={'body2'}
        sx={{ marginBottom: '22px', textAlign: 'center' }}
      >
        Elastic AI is the best in the market AI context-aware pair <br />
        programmer to help you or your team with development.
      </Typography>

      <HorizontalCenterBox sx={{ marginBottom: '22px' }}>
        <HorizontalCenterBox sx={style.iconContainer}>
          <Image
            src="/icons/linkedin_icon.png"
            alt="LinkedIn"
            width={20}
            height={20}
          />
        </HorizontalCenterBox>

        <HorizontalCenterBox sx={style.iconContainer}>
          <Image
            src="/icons/telegram_icon.png"
            alt="Telegram"
            width={20}
            height={20}
          />
        </HorizontalCenterBox>

        <HorizontalCenterBox sx={style.iconContainer}>
          <Image
            src="/icons/twitter_x_icon.png"
            alt="X"
            width={20}
            height={20}
          />
        </HorizontalCenterBox>
      </HorizontalCenterBox>

      <Typography variant={'caption'}>
        Copyright © 2024 . All rights reserved.
      </Typography>
    </VerticalCenterBox>
  )
}
