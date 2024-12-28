'use client'

import React, { CSSProperties, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { DropdownSelect } from '@/components/Select'
import { useDispatch } from 'react-redux'
import { find, get } from 'lodash'
import { nanoid } from 'nanoid'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import Person2Icon from '@mui/icons-material/Person2'
import MUI_Button from '@mui/material/Button'
import { WebApp } from '../../../../lib/type_legacy'
import map from 'lodash/map'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Typography from '@mui/material/Typography'
import UndoIcon from '@mui/icons-material/Undo'
import { usePathname, useRouter } from 'next/navigation'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ExpandLess } from '@mui/icons-material'
import { Box, Menu, MenuItem } from '@mui/material'

interface ResponsiveNavBarProps {
  mobileDrawerOpen: boolean
  changeDrawerState: (isOpen: boolean) => void
  allApps: WebApp[]
  selectedAppId: string
  openDialogId: string
  selectDialog: any
  openGetTokensForm?: any
}

const ResponsiveNavBar = ({
  mobileDrawerOpen,
  changeDrawerState,
  allApps,
  selectedAppId,
  openDialogId,
  selectDialog,
  openGetTokensForm,
}: ResponsiveNavBarProps): React.ReactNode => {
  const router = useRouter()
  const currentPathname = usePathname()

  const dispatch = useDispatch()

  const isMobile = useClientMediaQuery('(max-width: 600px)')

  const createNewApp = () => {
    const appId = nanoid()
    // dispatch(createApp({ id: appId, name: 'New app', url: '' }))
    // dispatch(selectApp(appId))
  }

  const allPages = get(
    find(allApps, app => app.id === selectedAppId),
    'data.pages',
    []
  )

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return isMobile ? (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 0,
        minHeight: 0,
        padding: '0px 18px',
        height: '55px',
        alignItems: 'center',
        background: '#181818',
        borderBottom: '1px solid #282636',
      }}
    >
      <div style={{ flexGrow: '1' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => changeDrawerState(true)}
          style={{ height: '35px', width: 'auto' }}
        >
          <MenuIcon
            style={{ height: '35px', width: 'auto', color: '#858585' }}
          />
        </IconButton>
      </div>

      {currentPathname !== '/chat/preview' && (
        <div
          style={{ flexGrow: '2', display: 'flex', justifyContent: 'center' }}
        >
          <DropdownSelect
            allValues={[
              ...map(allPages, page => ({
                value: page.id,
                label: page.name,
              })),
              { value: '0', label: 'Main chat' },
            ]}
            currentValue={openDialogId}
            onChange={selectDialog}
          />
        </div>
      )}

      <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'end' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => {
            currentPathname === '/chat/preview'
              ? router.push('/chat')
              : router.push('/chat/preview')
          }}
          style={{ height: '35px', width: 'auto' }}
        >
          {currentPathname === '/chat/preview' ? (
            <UndoIcon
              style={{ height: '35px', width: 'auto', color: '#858585' }}
            />
          ) : (
            <OpenInNewIcon
              style={{ height: '35px', width: 'auto', color: '#858585' }}
            />
          )}
        </IconButton>
      </div>
    </nav>
  ) : (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 0,
        minHeight: 0,
        padding: '12px',
        background: '#181818',
        borderBottom: '1px solid #282636',
      }}
    >
      <Box sx={{ width: '234px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '36px',
            backgroundColor: '#201F29',
            borderRadius: '8px',
            padding: '0 12px',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/image/brand/zapplyLogo.png"
              alt="Productlike icon"
              sx={{
                width: '16px',
                height: '15px',
                marginRight: '8px',
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Productlike.app
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '24px',
            }}
          >
            <ExpandLess
              sx={{
                color: '#FFFFFF',
                fontSize: '16px',
                marginBottom: '-4px',
              }}
            />
            <ExpandMoreIcon
              sx={{ color: '#FFFFFF', fontSize: '16px', marginTop: '-4px' }}
            />
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            style: {
              width: '234px',
            },
          }}
        >
          <MenuItem onClick={handleClose}>New App</MenuItem>
        </Menu>
      </Box>

      <MUI_Button
        sx={{
          display: {
            background: '#201F29',
            padding: '6px 12px',
          },
        }}
      >
        <Person2Icon
          style={{ color: '#D0D0D0', height: '18px', width: '18px' }}
        />
        <Typography
          variant={'h4'}
          style={{
            marginLeft: '12px',
            textTransform: 'none',
            fontSize: '14px',
            color: '#D0D0D0',
          }}
        >
          Andrew
        </Typography>
      </MUI_Button>
    </nav>
  )
}

const style: { [key: string]: CSSProperties } = {}

export default ResponsiveNavBar
