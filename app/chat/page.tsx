'use client'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { find, get } from 'lodash'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useClientMediaQuery } from '@/lib/util/IsMobile'
import ResponsiveNavBar from '@/app/chat/components/Navigation/ResponsiveNavBar'
import Drawer from '@mui/material/Drawer'
import ResponsiveSideBar from '@/app/chat/components/Navigation/ResponsiveSideBar'
import ChatWindow from '@/app/chat/components/ChatWindow/ChatWindow'
import {
  AnyFunction,
  APP_STATE,
  AppPage,
  CurrentProgress,
  Dialog,
  Message,
  SessionState,
  WebApp,
  WebAppState,
} from '@/lib/type'
import {
  addMessageToFeed,
  createDialog,
  selectDialog,
  updateDialogSessionState,
} from '@/lib/reducer/chat'
import SplitPane, { Pane } from 'split-pane-react'
import 'split-pane-react/esm/themes/default.css'
import PreviewFrame from '@/app/chat/preview/component/PreviewFrame'
import {
  createApp,
  selectApp,
  updateAppState,
  updateFrontendCode,
} from '@/lib/reducer/webApp'
import { updateMessageAttachmentState } from '@/lib/reducer/chat'
import { nanoid } from 'nanoid'
import { useMessageHandler } from '@/lib/hooks/useMessageHandler'
import GetTokensForm from '@/app/chat/components/GetTokensForm'

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

export default function ChatPage(): React.ReactNode {
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

  const dispatch = useDispatch()

  useEffect(() => {
    if (apps.length === 0) {
      const newAppId = nanoid()

      dispatch(
        createApp({
          id: newAppId,
          name: 'New App',
          url: 'newapp.zapp.com',
          appState: {
            label: APP_STATE.none,
          },
          data: {
            pages: [],
          },
        })
      )
      dispatch(selectApp(newAppId))

      dispatch(
        createDialog({
          id: '0',
          appId: newAppId,
          pageId: '0',
          messages: [],
          sessionState: { state: 'none' },
        })
      )
      dispatch(selectDialog('0')) // not necessary because we have this in our initialState
    }
  }, [apps, dispatch])

  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false)
  const [getTokensFormOpen, setGetTokensFormOpen] = React.useState(false)
  const [paneSizes, setPaneSizes] = useState(['80%', '20%'])

  const changeDrawerState = (isOpen: boolean) => {
    setNavDrawerOpen(isOpen)
  }

  const { progress, handleSendMessage } = useMessageHandler({
    updateFrontendCode: code => dispatch(updateFrontendCode(code)),
  })

  const [currentProgress, setCurrentProgress] = useState<CurrentProgress>({})

  useEffect(() => {
    console.log('\n USE EFFECT () ...')
    console.log('selectedApp', selectedApp)

    if (selectedApp?.appState.label === APP_STATE.guided_start) {
      console.log('  -- setting currentProgress to  APP_STATE.guided_start')
      setCurrentProgress({
        title: 'Guided start',
        isLoading: true,
        progress: 0,
      })
    } else if (selectedApp?.appState.label === APP_STATE.normal) {
      console.log('  -- setting currentProgress to  APP_STATE.normal')
      setCurrentProgress({
        title: '',
        isLoading: false,
        progress: 100,
      })
    } else if (selectedApp?.appState.label === APP_STATE.building) {
      console.log('  -- setting currentProgress to  APP_STATE.building')
      setCurrentProgress({
        title: 'Building you app',
        description: progress.description,
        isLoading: true,
        progress: 50,
      })
    }
  }, [progress, selectedApp])

  const changeMessageAttachmentState = (id: string, updatedState: string) => {
    const selectedAppIdString = selectedAppId as string
    dispatch(
      updateMessageAttachmentState({
        id,
        updatedState,
        selectedAppId: selectedAppIdString,
      })
    )
  }

  if (apps.length === 0 || !selectedApp) {
    return <div>...Loading</div>
  }

  return (
    <div
      style={{
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >

      {getTokensFormOpen && (<GetTokensForm open={getTokensFormOpen} onClose={() => setGetTokensFormOpen(false)} />)}

      {/* NAVIGATION */}

      <ResponsiveNavBar
        mobileDrawerOpen={navDrawerOpen}
        changeDrawerState={changeDrawerState}
        allApps={apps}
        selectedAppId={selectedAppId as string}
        openDialogId={selectedDialogId as string}
        selectDialog={(dialogId: string) => {
          dispatch(selectDialog(dialogId))
        }}
        openGetTokensForm={() => setGetTokensFormOpen(true)}
      />

      {/* MAIN */}

      {isMobile ? (
        <main
          style={{
            display: 'flex',
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
            selectedDialogId as string,
            currentProgress
          )}
          {renderChatSection(
            isMobile,
            selectedApp.data.pages,
            selectedDialog as Dialog,
            (dialogId: string) => {
              dispatch(selectDialog(dialogId))
            },
            async (message: Message, callback: AnyFunction) => {
              await handleSendMessage({ message, callback })
            },
            selectedApp.appState,
            state => dispatch(updateAppState(state)),
            changeMessageAttachmentState,
            () => setGetTokensFormOpen(true)
          )}
        </main>
      ) : (
        <main
          style={{
            display: 'flex',
            flexDirection: 'row',
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
            selectedDialogId as string,
            currentProgress
          )}

          <SplitPane
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: '1',
              minHeight: '0',
            }}
            split="vertical"
            sizes={paneSizes}
            // @ts-ignore
            onChange={setPaneSizes}
          >
            <Pane
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                minHeight: '0',
              }}
            >
              {renderChatSection(
                isMobile,
                selectedApp.data.pages,
                selectedDialog as Dialog,
                (dialogId: string) => {
                  dispatch(selectDialog(dialogId))
                },
                async (message: Message, callback: AnyFunction) => {
                  await handleSendMessage({ message, callback })
                },
                selectedApp.appState,
                state => dispatch(updateAppState(state)),
                changeMessageAttachmentState,
                () => setGetTokensFormOpen(true)
              )}
            </Pane>
            <Pane>
              {renderPreviewSection(
                isMobile,
                get(selectedApp, 'data.frontendCode', '')
              )}
            </Pane>
          </SplitPane>
        </main>
      )}
    </div>
  )
}

const renderSideNavSection = (
  screenType: 'big' | 'mobile' | 'normal',
  mobileNavOpen: boolean,
  closeNavDrawer: () => void,
  allApps: WebApp[],
  selectedAppId: string,
  openDialogId: string,
  currentProgress: CurrentProgress
) => {
  // console.log('render side nav currentProgress', currentProgress)
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
        openDialogId={openDialogId}
        currentProgress={currentProgress}
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
        openDialogId={openDialogId as string}
        currentProgress={currentProgress}
      />
    </div>
  )
}

const renderChatSection = (
  isMobile: boolean,
  allPages: AppPage[],
  selectedDialog: Dialog,
  selectDialog: any,
  sendMessage: any,
  appState: WebAppState,
  changeAppState: (state: WebAppState) => void,
  changeMessageAttachmentState: (id: string, updatedState: string) => void,
openGetTokensForm: any
) => {
  return (
    <ChatWindow
      isMobile={isMobile}
      allPages={allPages}
      selectedDialog={selectedDialog}
      selectDialog={selectDialog}
      sendMessage={sendMessage}
      appState={appState}
      changeAppState={changeAppState}
      changeMessageAttachmentState={changeMessageAttachmentState}
      openGetTokensForm={openGetTokensForm}
    />
  )
}

const renderPreviewSection = (isMobile: boolean, htmlContent: string) => {
  // console.log('html content', htmlContent)
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        background: '#181818',
        borderLeft: '1px solid #282636',
      }}
    >
      <PreviewFrame isMobile={isMobile} htmlContent={htmlContent} />
    </div>
  )
}
