'use client'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { find, get } from 'lodash'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import ResponsiveNavBar from '@/app/chat/components/Navigation/ResponsiveNavBar'
import Drawer from '@mui/material/Drawer'
import ResponsiveSideBar from '@/app/chat/components/Navigation/ResponsiveSideBar'
import ChatWindow from '@/app/chat/components/ChatWindow/ChatWindow'
import {
  AnyFunction,
  APP_STATE,
  Dialog,
  Message,
  WebApp,
} from '@/lib/type'
import { createDialog, selectDialog } from '@/lib/reducer/chat'
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
import LoadingDisplay from '@/app/chat/components/LoadingDisplay'

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
      initializeNewApp(dispatch)
    }
  }, [apps, dispatch])

  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false)
  const [getTokensFormOpen, setGetTokensFormOpen] = React.useState(false)
  const [paneSizes, setPaneSizes] = useState(['80%', '20%'])

  const changeDrawerState = (isOpen: boolean) => {
    setNavDrawerOpen(isOpen)
  }

  const { handleSendMessage } = useMessageHandler({
    selectedApp,
    selectedDialog,
    dialogs,
    updateFrontendCode: code => dispatch(updateFrontendCode(code)),
  })

  // const [currentProgress, setCurrentProgress] = useState<CurrentProgress>({})

  // useEffect(() => {
  //   manageCurrentProgressState(progress, selectedApp, setCurrentProgress)
  // }, [progress, selectedApp])

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

  const style: { [key: string]: CSSProperties } = {
    pageContainer: {
      height: '100svh',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    },
    mainContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      flexGrow: 1,
      minHeight: '0',
    },
  }

  if (apps.length === 0 || !selectedApp) {
    return <LoadingDisplay />
  }

  return (
    <div style={style.pageContainer}>
      {getTokensFormOpen && (
        <GetTokensForm
          isMobile={isMobile}
          open={getTokensFormOpen}
          onClose={() => setGetTokensFormOpen(false)}
        />
      )}

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

      <main style={style.mainContainer}>
        {renderSideNavSection(
          screenType,
          navDrawerOpen,
          () => changeDrawerState(false),
          apps,
          selectedAppId as string,
          selectedDialogId as string,
          () => setGetTokensFormOpen(true)
        )}

        {isMobile ? (
          <ChatWindow
            isMobile={isMobile}
            allPages={selectedApp.data.pages}
            selectedDialog={selectedDialog as Dialog}
            selectDialog={(id: string) => dispatch(selectDialog(id))}
            sendMessage={async (message: Message) => {
              await handleSendMessage({
                message,
                appState: get(selectedApp, 'appState.label', APP_STATE.none),
                callback: () => {},
              })
            }}
            appState={selectedApp.appState}
            changeAppState={state => dispatch(updateAppState(state))}
            changeMessageAttachmentState={changeMessageAttachmentState}
            openGetTokensForm={() => setGetTokensFormOpen(true)}
          />
        ) : (
          <SplitPane
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
              <ChatWindow
                isMobile={isMobile}
                allPages={selectedApp.data.pages}
                selectedDialog={selectedDialog as Dialog}
                selectDialog={(id: string) => dispatch(selectDialog(id))}
                sendMessage={async (message: Message) => {
                  await handleSendMessage({
                    message,
                    appState: get(
                      selectedApp,
                      'appState.label',
                      APP_STATE.none
                    ),
                    callback: () => {},
                  })
                }}
                appState={selectedApp.appState}
                changeAppState={state => dispatch(updateAppState(state))}
                changeMessageAttachmentState={changeMessageAttachmentState}
                openGetTokensForm={() => setGetTokensFormOpen(true)}
              />
            </Pane>
            <Pane>
              {renderPreviewSection(
                isMobile,
                get(selectedApp, 'data.frontendCode', '')
              )}
            </Pane>
          </SplitPane>
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
  openDialogId: string,
  openGetTokensForm: AnyFunction
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
        openDialogId={openDialogId}
        openGetTokensForm={openGetTokensForm}
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
        openGetTokensForm={openGetTokensForm}
      />
    </div>
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

// const manageCurrentProgressState = (
//   progress: CurrentProgress,
//   selectedApp: WebApp | undefined,
//   setCurrentProgress: AnyFunction
// ) => {
//   if (selectedApp?.appState.label === APP_STATE.guided_start) {
//     console.log('  -- setting currentProgress to  APP_STATE.guided_start')
//     setCurrentProgress({
//       title: 'Guided start',
//       isLoading: true,
//       progress: 0,
//     })
//   } else if (selectedApp?.appState.label === APP_STATE.normal) {
//     console.log('  -- setting currentProgress to  APP_STATE.normal')
//     setCurrentProgress({
//       title: '',
//       isLoading: false,
//       progress: 100,
//     })
//   } else if (selectedApp?.appState.label === APP_STATE.building) {
//     console.log('  -- setting currentProgress to  APP_STATE.building')
//     setCurrentProgress({
//       title: 'Building you app',
//       description: progress.description,
//       isLoading: true,
//       progress: 50,
//     })
//   }
// }

const initializeNewApp = (dispatch: AnyFunction) => {
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
