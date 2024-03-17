"use client"

import React, {useState} from "react"
import {Tabs, Box, Tab, Typography, Dialog} from "@mui/material"
import DialogList from "@/app/chat/components/DialogNavigation/component/DialogList"

interface DialogProps {
    title: string
    pageTitle: string
    selectedOptions: string[]
}

interface TabPanelProps {
    value: number
    index: number
    dialogs: DialogProps[]
}

const CustomTabPanel = ( { value, index, dialogs } : TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <DialogList dialogs={dialogs}/>
            )}
        </div>
    )
}

const DialogNavigation = () : React.ReactNode => {
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
                                dialogs={[
                    {
                        title: 'Top Navigation bar',
                        pageTitle: 'Main Calendar',
                        selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation']
                    },
                    {
                        title: 'Main',
                        pageTitle: 'Settings',
                        selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation']
                    },
                    {
                        title: 'Create Event',
                        pageTitle: 'Main Calendar',
                        selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation']
                    }
                ]}/>
                <CustomTabPanel value={selectedDialogLine}
                                index={1}
                                dialogs={[
                                    {
                                        title: 'Top Navigation bar',
                                        pageTitle: 'Main Calendar',
                                        selectedOptions: ['op1', 'op2']
                                    },
                                    {
                                        title: 'Calendar style',
                                        pageTitle: 'Main Calendar',
                                        selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation']
                                    },
                                ]}/>
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
        width: '300px',
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
        borderRadius: '5px'
    }
}

export default DialogNavigation
