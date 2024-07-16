'use client'

import React, { CSSProperties, useState } from 'react'
import { Button as MUI_Button, Collapse } from '@mui/material'
import Typography from '@mui/material/Typography'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import {
  // @ts-ignore
  UilAngleRightB,
  // @ts-ignore
  UilArrowRight,
  // @ts-ignore
  UilImage,
  // @ts-ignore
  UilPause,
  // @ts-ignore
} from '@iconscout/react-unicons'
import SideNavButton from '@/app/chat/components/Navigation/component/SideNavButton'

interface SettingsDropdownProps {
  screenType: 'mobile' | 'big' | 'normal'
}

const SettingsDropdown = ({
  screenType,
}: SettingsDropdownProps): React.ReactNode => {
  const isMobile = screenType === 'mobile'
  const isBigScreen = screenType === 'big'

  const [isHovered, setIsHovered] = useState(false)

  const [collapseOpen, setCollapseOpen] = React.useState(false)

  const handleClick = () => {
    setCollapseOpen(!collapseOpen)
  }

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
    <React.Fragment>
      <MUI_Button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          ...style.horizontalFlex,
          ...style.mainButton,
          '&:hover': {
            backgroundColor: '#201F29',
          },
          backgroundColor: false ? '#201F29' : 'auto',
        }}
      >
        <div style={{ ...style.horizontalFlex, justifyContent: 'start' }}>
          <ToggleOnIcon style={style.iconStyle} />
          <Typography variant={'h6'} style={style.textStyle}>
            Settings
          </Typography>
        </div>
        <UilAngleRightB
          style={{
            ...style.iconStyle,
            transform: collapseOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
            display: 'block',
          }}
        />
      </MUI_Button>

      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <div style={{ marginLeft: '12px' }}>
          <SideNavButton
            screenType={screenType}
            onClick={() => {}}
            label={'Change app icon'}
            primaryIcon={UilImage}
            isActive={false}
          />
          <SideNavButton
            screenType={screenType}
            onClick={() => {}}
            label={'Stop your app'}
            primaryIcon={UilPause}
            isActive={false}
          />
        </div>
      </Collapse>
    </React.Fragment>
  )
}

export default SettingsDropdown
