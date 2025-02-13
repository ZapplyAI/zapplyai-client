'use client'
import React from 'react'
import { Box, Theme, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import {
  HorizontalCenterBox,
  VerticalCenterBox,
} from '@/components/layouts/CenterBox'
import Image from 'next/image'

interface FooterProps {
  isMobile?: boolean
}

export const Footer = ({ isMobile = false }: FooterProps) => {
  const style = {
    iconContainer: {
      width: '40px',
      height: '40px',
      border: '1px solid #444444',
      borderRadius: '500px',
      marginRight: '6px',
    },
  }

  return (
    <VerticalCenterBox sx={{ padding: isMobile ? '55px 20px' : '55px 100px' }}>
      <HorizontalCenterBox sx={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image
            src="/assets/svgs/LISA MARK EXP.svg"
            alt="Logo"
            width={35}
            height={35}
            style={{
              width: 'auto',
            }}
          />
          <span style={{ 
            color: '#fff',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            fontFamily: 'Kanit, sans-serif'
          }}>
            Elastic Copilot
          </span>
        </div>
      </HorizontalCenterBox>

      <Typography
        variant={'body2' as any}
        sx={{ marginBottom: '22px', textAlign: 'center' }}
      >
        Elastic Copilot is the best in the market context-aware pair <br />
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

      <Typography variant={'caption' as any}>
        © 2024 Elastic Copilot. All rights reserved.
      </Typography>
    </VerticalCenterBox>
  )
}
