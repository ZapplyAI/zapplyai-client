'use client'

import React, { CSSProperties, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import DialogList from '@/app/chat/components/DialogNavigation/component/DialogList'
import { Button } from '@/components/Button'
import AppStatusBox from '@/app/chat/components/DialogNavigation/component/AppStatusBox'
import DropdownSelect from '../../../../components/Select/DropdownSelect'
import type { Dialog } from '@/lib/type'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { createApp, selectApp } from '@/lib/reducer/webApp'
import { RootState } from '@/lib/store'
import { filter, find } from 'lodash'
import { createDialog, selectDialog } from '@/lib/reducer/chat'
import { nanoid } from 'nanoid'

interface TabPanelProps {
  value: number
  index: number
  dialogs: Dialog[]
  openDialog: any
}

const CustomTabPanel = ({
  value,
  index,
  dialogs,
  openDialog,
}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <DialogList dialogs={dialogs} openDialog={openDialog} />
      )}
    </div>
  )
}

const useReduxData = () => {
  const apps = useSelector((state: RootState) => state.webApp.apps)
  const selectedAppId = useSelector(
    (state: RootState) => state.webApp.selectedId
  )
  const dialogs = useSelector((state: RootState) => state.chat.dialogs)
  const selectedDialogId = useSelector(
    (state: RootState) => state.chat.selectedId
  )

  const selectedDialog = find(dialogs, dialog => dialog.id === selectedDialogId)
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

const DialogNavigation = (): React.ReactNode => {
  const {
    apps,
    selectedAppId,
    selectedApp,
    dialogs,
    selectedDialogId,
    selectedDialog,
  } = useReduxData()

  const dispatch = useDispatch()

  const [selectedDialogLine, setDialogLine] = useState(0)

  const handleDialogLineChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setDialogLine(newValue)
  }

  const createNewApp = () => {
    const appId = nanoid()
    dispatch(createApp({ id: appId, name: 'New app', url: '' }))
    dispatch(selectApp(appId))
  }

  const isLoadingInProgress = false // TODO: add more dynamic logic

  if (apps.length === 0) {
    return (
      <div style={style.navigationContainer}>
        <Button
          label={'Create new app'}
          fullWidth
          sx={{ background: '#5443B1', color: '#fff', borderRadius: '5px' }}
          action={createNewApp}
        />
      </div>
    )
  } else {
    if (selectedApp === undefined) {
      return null
    }
    return selectedApp.url === '' ? (
      <div style={style.navigationContainer}>
        <DropdownSelect
          allApps={apps}
          selectApp={(appId: string) => dispatch(selectApp(appId))}
          selectedApp={selectedApp}
          bottomComponent={
            <MenuItem key={'100000'} value={'100000'} sx={{ padding: '0' }}>
              <Button
                label={'Create new app'}
                fullWidth
                sx={{
                  background: '#5443B1',
                  color: '#fff',
                  borderRadius: '9px',
                }}
                action={createNewApp}
              />
            </MenuItem>
          }
        />
      </div>
    ) : (
      <div style={style.navigationContainer}>
        <DropdownSelect
          allApps={apps}
          selectApp={() => {}}
          selectedApp={selectedApp}
          bottomComponent={
            <MenuItem key={'100000'} value={'1000'} sx={{ padding: '0' }}>
              <Button
                label={'Create new app'}
                fullWidth
                sx={{
                  background: '#5443B1',
                  color: '#fff',
                  borderRadius: '9px',
                }}
                action={createNewApp}
              />
            </MenuItem>
          }
        />

        <Tabs
          value={selectedDialogLine}
          onChange={handleDialogLineChange}
          TabIndicatorProps={{ sx: { background: '#775EFF' } }}
          sx={{
            ...style.dialogTabsContainer,
            // '& button:hover': {backgroundColor: '#18191A'},
            '& button.Mui-selected': {
              color: '#CFCED9',
              backgroundColor: '#18191A',
            },
            marginTop: '12px',
          }}
        >
          <Tab label="Frontend" sx={style.dialogTab} />
          <Tab label="Backend" sx={style.dialogTab} />
        </Tabs>

        <Box>
          <CustomTabPanel
            value={selectedDialogLine}
            index={0}
            dialogs={filter(dialogs, dialog => dialog.type !== 'backend')}
            openDialog={(dialogId: string) => dispatch(selectDialog(dialogId))}
          />
          <CustomTabPanel
            value={selectedDialogLine}
            index={1}
            dialogs={filter(dialogs, dialog => dialog.type !== 'frontend')}
            openDialog={(dialogId: string) => dispatch(selectDialog(dialogId))}
          />
        </Box>

        <Button
          label={'Start new dialog'}
          fullWidth
          variant={'contained'}
          sx={{
            marginTop: '10px',
          }}
          action={() =>
            dispatch(
              createDialog({
                appId: selectedAppId || '',
                id: nanoid(),
                messages: [],
                pageTitle: '...',
                selectedOptions: [],
                title: '...',
              })
            )
          }
        />

        {isLoadingInProgress ? <AppStatusBox /> : null}
      </div>
    )
  }
}

const style: { [key: string]: CSSProperties } = {
  navigationContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: '20px 12px',
    width: '268px',
    background: '#181818',
  },
  dialogTabsContainer: {
    width: '100%',
    background: '#282636',
    padding: '2px',
    minHeight: '0px',
    borderRadius: '5px',
  },
  dialogTab: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '0px',
    padding: '8px 35px',
    color: '#CFCED9',
    textTransform: 'none',
    borderRadius: '5px',
    fontSize: '12px',
  },
  statusBoxContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: '#212121',
    color: '#fff',
    // width: 'calc(100% - (12px * 2))'
    width: '100%',
    padding: '12px',
  },
  statusHeader: {
    fontSize: '12px',
    marginBottom: '8px',
  },
  statusDescription: {
    fontSize: '12px',
    fontWeight: 'normal',
  },
  statusBody: {
    fontSize: '12px',
    fontWeight: 'normal',
  },
}

export default DialogNavigation
