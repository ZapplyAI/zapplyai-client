'use client'

import React, { CSSProperties, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import DialogList from '@/app/chat/components/DialogNavigation/component/DialogList'
import { Button } from '@/components/Button'
import Divider from '@mui/material/Divider'
import {LinearProgressWithLabel} from "@/components";
import AppStatusBox from "@/app/chat/components/DialogNavigation/component/AppStatusBox";

interface DialogProps {
  id: number
  title: string
  pageTitle: string
  selectedOptions: string[]
  dialog: any
}

interface TabPanelProps {
  value: number
  index: number
  dialogs: DialogProps[]
  openDialog: any
}

interface DialogNavigationProps {
  frontend: DialogProps[]
  backend: DialogProps[]
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

const DialogNavigation = ({
  frontend,
  backend,
  openDialog,
}: DialogNavigationProps): React.ReactNode => {
  const [selectedDialogLine, setDialogLine] = useState(0)

  const handleDialogLineChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setDialogLine(newValue)
  }

  const isLoadingInProgress = false // TODO: add more dynamic logic

  return (
    <div style={style.navigationContainer}>
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
        }}
      >
        <Tab label="Frontend" sx={style.dialogTab} />
        <Tab label="Backend" sx={style.dialogTab} />
      </Tabs>

      <Box>
        <CustomTabPanel
          value={selectedDialogLine}
          index={0}
          dialogs={frontend}
          openDialog={openDialog}
        />
        <CustomTabPanel
          value={selectedDialogLine}
          index={1}
          dialogs={backend}
          openDialog={openDialog}
        />
      </Box>

      <Button
        label={'Start new dialog'}
        fullWidth
        variant={'contained'}
        sx={{
          marginTop: '10px',
        }}
        action={() => console.log('create new dialog')}
      />

      {isLoadingInProgress ? <AppStatusBox /> : null}
    </div>
  )
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
