'use client'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { find, get } from 'lodash'
import React, { CSSProperties, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import ResponsiveNavBar from '@/app_legacy/chat/components/Navigation/ResponsiveNavBar'
import Drawer from '@mui/material/Drawer'
import ResponsiveSideBar from '@/app_legacy/chat/components/Navigation/ResponsiveSideBar'
import ChatWindow from '@/app_legacy/chat/components/ChatWindow/ChatWindow'
import { AppPage, Dialog, WebApp } from '../../../lib/type_legacy'
import { selectDialog } from '@/lib/reducer/chat'
import PreviewFrame from '@/app_legacy/chat/preview/component/PreviewFrame'
import { useRouter } from 'next/navigation'
import App from 'next/app'
import YourApps from '@/app_legacy/chat/deploy/component/YourApps'

const useReduxData = () => {
  const apps = useSelector((state: RootState) => state.webApp.apps)
  const selectedAppId = useSelector(
    (state: RootState) => state.webApp.selectedId
  )
  const dialogs = useSelector((state: RootState) => state.chat.dialogs)
  const selectedDialogId = useSelector(
    (state: RootState) => state.chat.openDialogId
  )

  const selectedDialog = find(dialogs, dialog => {
    return dialog.pageId === selectedDialogId
  })
  const selectedApp = find(apps, app => app.id === selectedAppId)

  return {
    apps,
    selectedAppId,
    dialogs,
    selectedDialogId,
    selectedDialog,
    selectedApp,
  }
}

export default function PreviewPage(): React.ReactNode {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const isBigScreen = useClientMediaQuery('(min-width: 1500)')
  const screenType = isMobile ? 'mobile' : isBigScreen ? 'big' : 'normal'

  const {
    apps,
    selectedAppId,
    selectedApp,
    dialogs,
    selectedDialogId,
    selectedDialog,
  } = useReduxData()

  const router = useRouter()
  const dispatch = useDispatch()

  // const style: { [key: string]: CSSProperties } = {}

  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false)

  const changeDrawerState = (isOpen: boolean) => {
    setNavDrawerOpen(isOpen)
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      {/* NAVIGATION */}

      <ResponsiveNavBar
        mobileDrawerOpen={navDrawerOpen}
        changeDrawerState={changeDrawerState}
        allApps={apps}
        selectedAppId={selectedAppId as string}
        openDialogId={selectedDialogId as string}
        selectDialog={(dialogId: string) => {
          dispatch(selectDialog(dialogId))
          router.push('/chat')
        }}
      />

      {/* MAIN */}

      <main
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexGrow: 1,
          minHeight: '0',
        }}
      >
        {renderSideNavSection(
          screenType,
          navDrawerOpen,
          () => changeDrawerState(false),
          apps,
          selectedAppId as string,
          selectedDialogId as string
        )}

        {renderDeploySection(
          isMobile,
          apps
        )}
      </main>
    </div>
  )
}

const renderSideNavSection = (
  screenType: 'big' | 'mobile' | 'normal',
  mobileNavOpen: boolean,
  closeNavDrawer: () => void,
  allApps: WebApp[],
  selectedAppId: string,
  selectedDialogId: string
) => {
  return screenType === 'mobile' ? (
    <Drawer
      variant="temporary"
      open={mobileNavOpen}
      onClose={closeNavDrawer}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        minHeight: 0,
        // flexGrow: 1,
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '80vw',
        },
      }}
    >
      <ResponsiveSideBar
        closeNavDrawer={closeNavDrawer}
        screenType={screenType}
        allApps={allApps}
        selectedAppId={selectedAppId as string}
        openDialogId={selectedDialogId}
      />
    </Drawer>
  ) : (
    <div
      style={{
        width: 'calc(15vw + 12px + 12px)',
        minWidth: 'calc(230px + 12px + 12px)',
        maxWidth: '350px',
        // flexGrow: 1,
        minHeight: 0,
      }}
    >
      <ResponsiveSideBar
        screenType={screenType}
        allApps={allApps}
        selectedAppId={selectedAppId as string}
        openDialogId={selectedDialogId}
      />
    </div>
  )
}

const renderDeploySection = (isMobile: boolean, allApps: WebApp[]) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '0',
        height: '100%',
        width: '100%',
        flexGrow: 1,
        background: '#1B1A21',
        position: 'relative',
      }}
    >
      <YourApps isMobile={isMobile} allApps={allApps} />
    </div>
  )
}
