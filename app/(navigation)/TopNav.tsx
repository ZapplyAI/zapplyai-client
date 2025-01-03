import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import { Logo } from '@/components'
import Button from '../../components/Button/Button'
import Typography from '@mui/material/Typography'
import ClippedButton from '@/app/(components)/ClippedButton'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton } from '@mui/material'

interface TopNavProps {
  isMobile: boolean
  loggedIn?: boolean
  showAlert: any
}

export const TopNav = ({
  isMobile,
  loggedIn = false,
  showAlert,
}: TopNavProps) => {
  const style = {
    authButton: {
      background: '#775EFF',
      borderRadius: 0,
      fontSize: '13px',
      padding: '5px 25px',
      fontWeight: '300'
    },
    navText: {
      padding: '6px 6px',
      fontSize: '14px',
      fontWeight: '200'
    },
  }
  return (
    <HorizontalCenterBox
      sx={{
        justifyContent: 'space-between',
        zIndex: '1000',
        position: 'sticky',
        top: '0',
        padding: '12px 12vw',
        background: '#0A090E',
        borderBottom: '1px solid #5E5E5E',
      }}
    >
      <HorizontalLeftAlignBox>
        <Logo mini height={28} width={28} sx={{ marginRight: '1.5rem' }} />
        <Button variant={'text'} sx={style.navText} label={'Home'} />
        <Button variant={'text'} sx={style.navText} label={'Examples'} />
        <Button variant={'text'} sx={style.navText} label={'About'} />
      </HorizontalLeftAlignBox>

      {loggedIn ? (
        <HorizontalCenterBox>
          <ClippedButton
            sx={{
              width: 'fit-content',
              padding: '8px 16px',
              marginRight: '6px',
            }}
            onClick={() => showAlert()}
          >
            <PersonIcon sx={{ color: '#AEAEAE' }} />
            <Typography
              sx={{
                fontFamily: 'Kanit',
                fontSize: '14px',
                fontWeight: '300',
                marginLeft: '12px',
              }}
              variant={'caption' as any}
            >
              Hi User
            </Typography>
          </ClippedButton>

          <IconButton onClick={() => showAlert()}>
            <SettingsIcon sx={{ color: '#AEAEAE' }} />
          </IconButton>
        </HorizontalCenterBox>
      ) : (
        <HorizontalCenterBox>
          <Button
            sx={style.authButton}
            label={'Try free'}
            action={() => showAlert()}
          />
          <span style={{ width: '16px' }} />
          <Button
            action={() => showAlert()}
            sx={{ ...style.authButton, background: '#222222' }}
            label={'Sign In'}
          />
        </HorizontalCenterBox>
      )}
    </HorizontalCenterBox>
  )
}
