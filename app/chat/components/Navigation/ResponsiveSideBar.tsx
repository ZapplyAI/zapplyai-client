'use client'

import React, { CSSProperties, useState } from 'react'

import Box from '@mui/material/Box'
import { createApp, createPage, selectApp } from '@/lib/reducer/webApp'
import MenuItem from '@mui/material/MenuItem'
import { Button, DropdownSelect } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { filter, find, get, maxBy } from 'lodash'
import { nanoid } from 'nanoid'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import SideNavButton from './component/SideNavButton'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import AddCircleIcon from '@mui/icons-material/AddCircle'
// @ts-ignore
import { UilPlus } from '@iconscout/react-unicons'

import {
  UilArrowRight,
  UilExpandFromCorner,
  UilEllipsisH,
  UilAngleRightB,
  // @ts-ignore
} from '@iconscout/react-unicons'
import map from 'lodash/map'
import { AnyFunction, CurrentProgress, Process, WebApp } from '@/lib/type'
import { createDialog, selectDialog } from '@/lib/reducer/chat'
import { usePathname, useRouter } from 'next/navigation'
import ProgressDisplay from '@/app/chat/components/ProgressDisplay'
import SettingsDropdown from '@/app/chat/components/Navigation/component/SettingsDropdown'

interface ResponsiveSideBarProps {
  closeNavDrawer?: () => void
  screenType: 'mobile' | 'normal' | 'big'
  allApps: WebApp[]
  selectedAppId: string
  openDialogId: string
  openGetTokensForm: AnyFunction
}

const useReduxData = () => {
  const processes = useSelector(
    (state: RootState) => state.global.currentProcesses
  )
  console.log('processes', processes)

  let currentProcess = maxBy(
    filter(processes, process => process.isLoading),
    process => process.displayPriority
  ) // find highest priority loading process

  if (!currentProcess) {
    currentProcess = maxBy(
      processes,
      process => process.displayPriority
    ) // find highest priority loading process
  }

  console.log('currentProcess', currentProcess)

  return {
    currentProcess,
  }
}

const ResponsiveSideBar = ({
  closeNavDrawer = () => {},
  screenType,
  allApps,
  selectedAppId,
  openDialogId,
  openGetTokensForm,
}: ResponsiveSideBarProps): React.ReactNode => {
  const isMobile = screenType === 'mobile'
  const isBigScreen = screenType === 'big'

  const { currentProcess } = useReduxData()

  const selectedApp = find(allApps, app => app.id === selectedAppId)

  const currentPathName = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  const style: { [key: string]: CSSProperties } = {
    sideBarContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      width: '100%',
      height: '100%',
      background: '#181818',
    },
    dividerHeader: {
      marginTop: '12px',
      marginBottom: '8px',
      color: '#7C7C7C',
      fontSize: isMobile ? '18px' : isBigScreen ? '0.65vw' : '13px',
      fontWeight: '500',
    },
    headerIconMobile: {
      height: '35px',
      width: '35px',
      borderRadius: '5px',
      color: '#858585',
    },
  }

  const createNewApp = () => {
    const appId = nanoid()
    // dispatch(createApp({ id: appId, name: 'New app', url: '' }))
    // dispatch(selectApp(appId))
  }

  // console.log('responsive sideBar, currentProgress', currentProgress)
  return (
    <Box sx={style.sideBarContainer}>
      {isMobile && (
        <React.Fragment>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '12px',
            }}
          >
            <IconButton
              onClick={() => closeNavDrawer()}
              style={style.headerIconMobile}
            >
              <CloseIcon sx={{ height: '30px', width: '30px' }} />
            </IconButton>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={() => openGetTokensForm()}
                sx={{
                  ...style.headerIconMobile,
                  background: '#201F29',
                  height: '28px',
                  width: '28px',
                  padding: '3px',
                  marginRight: '18px',
                }}
              >
                <UilPlus sx={{ height: '100%' }} />
              </IconButton>
              <Typography
                variant={'h6'}
                style={{
                  fontSize: '18px',
                  fontWeight: '400',
                  color: '#D0D0D0',
                }}
              >
                10 Tokens
              </Typography>
            </div>
          </div>
          <hr
            style={{
              width: '100%',
              border: '1px solid #282636',
              margin: '4px',
              marginBottom: '18px',
            }}
          />

          <div style={{ padding: '12px', width: '100%' }}>
            <DropdownSelect
              allValues={map(allApps, app => ({
                value: app.id,
                label: app.name,
              }))}
              onChange={value => {}}
              currentValue={selectedAppId as any}
              // bottomComponent={
              //   <MenuItem
              //     key={'100000'}
              //     value={'100000'}
              //     sx={{
              //       margin: '2px 6px',
              //       marginTop: '10px',
              //       borderRadius: '4px',
              //       padding: '0px',
              //     }}
              //   >
              //     <Button
              //       label={'Create new app'}
              //       fullWidth
              //       action={createNewApp}
              //     />
              //   </MenuItem>
              // }
            />
          </div>
        </React.Fragment>
      )}

      <div
        style={{
          position: 'relative',
          padding: '12px',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ padding: '0px 8px', width: '100%' }}>
          <SideNavButton
            screenType={screenType}
            onClick={() => {
              dispatch(selectDialog('0'))
              if (currentPathName !== '/chat') {
                router.push('/chat')
              }
            }}
            label={'Main chat'}
            primaryIcon={QuestionAnswerIcon}
            secondaryIcon={UilArrowRight}
            secondaryIconAlwaysVisible={true}
            isActive={openDialogId === '0'}
          />
          <SettingsDropdown screenType={screenType} />
        </div>

        <Typography variant={'h4'} style={style.dividerHeader}>
          Pages
        </Typography>

        <div style={{ padding: '0px 8px', width: '100%' }}>
          {map(get(selectedApp, 'data.pages', []), page => (
            <SideNavButton
              screenType={screenType}
              onClick={() => {
                dispatch(selectDialog(page.id))
                if (currentPathName !== '/chat') {
                  router.push('/chat')
                }
              }}
              label={page.name}
              primaryIcon={InsertDriveFileIcon}
              secondaryIcon={UilEllipsisH}
              secondaryIconAlwaysVisible={false}
              isActive={openDialogId === page.id}
            />
          ))}
          <hr style={{ border: '1px solid #282636', margin: '4px' }} />
          <SideNavButton
            screenType={screenType}
            onClick={() => {
              const pageId = nanoid()
              dispatch(createPage({ id: pageId, name: 'New page' }))
              dispatch(
                createDialog({
                  id: nanoid(),
                  appId: selectedAppId,
                  pageId: pageId,
                  messages: [],
                  sessionState: {
                    referenceId: undefined,
                    state: 'none',
                    currentStep: undefined,
                  },
                })
              )
              dispatch(selectDialog(pageId))
              if (currentPathName !== '/chat') {
                router.push('/chat')
              }
            }}
            label={'New page'}
            primaryIcon={AddCircleIcon}
            // isActive={usePathname() === '/chat' && openDialogId===pageId}
          />
        </div>

        <Typography variant={'h4'} style={style.dividerHeader}>
          Actions
        </Typography>

        <div style={{ padding: '0px 8px', width: '100%' }}>
          <SideNavButton
            screenType={screenType}
            onClick={() => {}}
            label={'Deploy'}
            primaryIcon={RocketLaunchIcon}
            secondaryIconAlwaysVisible={false}
            isActive={usePathname() === '/chat/deploy'}
          />
          <SideNavButton
            screenType={screenType}
            onClick={() => {}}
            label={'Version control'}
            primaryIcon={DynamicFeedIcon}
            secondaryIconAlwaysVisible={false}
            isActive={usePathname() === '/chat/versionControl'}
          />
          <SideNavButton
            screenType={screenType}
            onClick={() => router.push('/chat/preview')}
            label={'Preview'}
            primaryIcon={UilExpandFromCorner}
            secondaryIconAlwaysVisible={false}
            isActive={usePathname() === '/chat/preview'}
          />
        </div>

        {currentProcess && (
          <ProgressDisplay
            displayedProcess={currentProcess as Process}
          />
        )}
      </div>
    </Box>
  )
}

const style: {
  [key: string]: CSSProperties
} = {}

export default ResponsiveSideBar
