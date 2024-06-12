'use client'

import React, { CSSProperties, useState } from 'react'
import { Button as MUI_Button } from '@mui/material'
import { SvgIconProps } from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

interface SideNavButtonProps {
  screenType: 'mobile' | 'big' | 'normal'
  onClick: () => void
  label: string
  primaryIcon: React.ElementType<SvgIconProps>
  sx_primaryIcon?: object
  secondaryIcon?: React.ElementType<SvgIconProps>
  sx_secondaryIcon?: object
  secondaryIconAlwaysVisible?: boolean
  isActive?: boolean
}

const SideNavButton = ({
  screenType,
  onClick,
  label,
  primaryIcon: PrimaryIcon,
  sx_primaryIcon = {},
  secondaryIcon: SecondaryIcon = undefined,
  sx_secondaryIcon = {},
  secondaryIconAlwaysVisible = false,
  isActive=false
}: SideNavButtonProps): React.ReactNode => {
  const isMobile = screenType === 'mobile'
  const isBigScreen = screenType === 'big'

  const [isHovered, setIsHovered] = useState(false)

  const style: { [key: string]: CSSProperties } = {
    horizontalFlex: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    mainButton: {
      width: '100%',
      justifyContent: 'space-between',
      padding: '6px',
      marginTop: '2px',
    },
    iconStyle: {
      height: isMobile ? '28px' : isBigScreen ? '1.1vw' : '20px',
      width: 'auto',
      color: isHovered ? '#D9D9D9' : '#858585',
    },
    textStyle: {
      marginLeft: '15px',
      color: isHovered ? '#FFFFFF' : '#D0D0D0',
      fontSize: isMobile ? '14px' : isBigScreen ? '0.65vw' : '13px',
      fontWeight: isMobile ? '400' : '300',
      textTransform: 'none',
    },
  }

  return (
    <MUI_Button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        ...style.horizontalFlex,
        ...style.mainButton,
        '&:hover': {
          backgroundColor: '#201F29',
        },
        backgroundColor: isActive ? '#201F29' : 'auto',
      }}
    >
      <div style={{ ...style.horizontalFlex, justifyContent: 'start' }}>
        <PrimaryIcon style={{ ...style.iconStyle, ...sx_primaryIcon }} />
        <Typography variant={'h6'} style={style.textStyle}>
          {label}
        </Typography>
      </div>
      {SecondaryIcon && (
        <SecondaryIcon
          style={{
            ...style.iconStyle,
            ...sx_secondaryIcon,
            display: secondaryIconAlwaysVisible || isHovered ? 'block' : 'none',
          }}
        />
      )}
    </MUI_Button>
  )
}

export default SideNavButton
