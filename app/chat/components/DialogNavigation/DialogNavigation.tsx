"use client"

import React, {useState} from "react"
import {Tabs, Box, Tab, Typography, Dialog} from "@mui/material"
import DialogList from "@/app/chat/components/DialogNavigation/component/DialogList"

interface DialogProps {
    id: number,
    title: string
    pageTitle: string
    selectedOptions: string[],
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

const CustomTabPanel = ( { value, index, dialogs, openDialog } : TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <DialogList dialogs={dialogs}
                            openDialog={openDialog}/>
            )}
        </div>
    )
}

const DialogNavigation = ( { frontend, backend, openDialog} : DialogNavigationProps ) : React.ReactNode => {
    const [selectedDialogLine, setDialogLine] = useState(0)

    const handleDialogLineChange = (event: React.SyntheticEvent, newValue: number) => {
        setDialogLine(newValue)
    }

    return (
        <div style={style.navigationContainer}>
            <Tabs value={selectedDialogLine}
                  onChange={handleDialogLineChange}
                  TabIndicatorProps={{sx: {background: '#775EFF'}}}
                  sx={{
                      ...style.dialogTabsContainer,
                      // '& button:hover': {backgroundColor: '#18191A'},
                      '& button.Mui-selected': {color: '#CFCED9', backgroundColor: '#18191A'},
                  }}>
                <Tab label="Frontend"
                     sx={style.dialogTab}/>
                <Tab label="Backend"
                     sx={style.dialogTab}/>
            </Tabs>

            <Box>
                <CustomTabPanel value={selectedDialogLine}
                                index={0}
                                dialogs={frontend}
                                openDialog={openDialog}/>
                <CustomTabPanel value={selectedDialogLine}
                                index={1}
                                dialogs={backend}
                                openDialog={openDialog}/>
            </Box>
        </div>
    )
}

const style = {
    navigationContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        padding: '20px 12px',
        width: '268px',
        background: '#181818'
    },
    dialogTabsContainer: {
        width: '100%',
        background: '#282636',
        padding: '2px',
        minHeight: '0px',
        borderRadius: '5px'
    },
    dialogTab: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '0px',
        padding: '8px 35px',
        color: '#CFCED9',
        textTransform: 'none',
        borderRadius: '5px',
        fontSize: '12px'
    }
}

export default DialogNavigation
