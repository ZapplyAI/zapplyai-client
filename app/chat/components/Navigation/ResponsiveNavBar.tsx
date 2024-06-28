'use client'

import React, { CSSProperties, useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { DropdownSelect } from '@/components/Select'
import { Button } from '@/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { find, get } from 'lodash'
import { createApp, selectApp } from '@/lib/reducer/webApp'
import MenuItem from '@mui/material/MenuItem'
import { nanoid } from 'nanoid'
import { useClientMediaQuery } from '@/lib/util/IsMobile'
import Person2Icon from '@mui/icons-material/Person2'
import MUI_Button from '@mui/material/Button'
import { AppPage, WebApp } from '@/lib/type'
import map from 'lodash/map'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Typography from '@mui/material/Typography'
import UndoIcon from '@mui/icons-material/Undo'
import { usePathname, useRouter } from 'next/navigation'

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
      <div
        style={{
          width: '15vw',
          minWidth: '230px',
          maxWidth: 'calc(350px - 24px)',
        }}
      >
        <DropdownSelect
          allValues={map(allApps, app => ({
            value: app.id,
            label: app.name,
          }))}
          onChange={value => {}}
          currentValue={selectedAppId as any}
          //   bottomComponent={
          //     <MenuItem
          //       key={'100000'}
          //       value={'100000'}
          //       sx={{
          //         margin: '2px 6px',
          //         marginTop: '10px',
          //         borderRadius: '4px',
          //         padding: '0px',
          //       }}
          //     >
          //       <Button
          //         label={'Create new app'}
          //         fullWidth
          //         action={createNewApp}
          //       />
          //     </MenuItem>
          //   }
        />
      </div>

      <MUI_Button
        sx={{
          display: {
            // xs: 'none',
            // sm: 'block',
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
