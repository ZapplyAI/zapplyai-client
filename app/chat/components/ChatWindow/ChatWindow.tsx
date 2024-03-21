import React, {useState} from "react"
import ChatMessage from "@/app/chat/components/ChatWindow/ChatMessage"
import {Divider, IconButton, InputBase, Stack} from "@mui/material"
import GrainIcon from '@mui/icons-material/Grain'
import SendIcon from '@mui/icons-material/Send'

interface DialogProps {
    id: number,
    title: string
    pageTitle: string
    selectedOptions: string[],
    dialog: any
}

interface ChatWindowProps {
    selectedDialog: DialogProps
}

interface ChatHeaderProps {
    icon: any
    headerTitle: string
}

const ChatHeader = ( { icon, headerTitle } : ChatHeaderProps) : React.ReactNode => {
    return (
        <div style={style.headerContainer}>
            <div>{headerTitle}</div>
            <div>settings</div>
        </div>
    )
}

const ChatWindow = ( { selectedDialog } : ChatWindowProps) : React.ReactNode => {

    if (selectedDialog === null) {
        return (<div>empty</div>)
    }

    return (
        <div style={style.chatWindow}>
            <ChatHeader icon={null}
                        headerTitle={'title'} />
            <Stack direction={'column'}
                   alignItems={'center'}
                   justifyContent={'flex-end'}
                   spacing={3}
                   divider={<Divider orientation="horizontal" flexItem style={{background: '#CFCED9'}}/>}
                   style={style.dialogContainer}>
                {selectedDialog.dialog.map((messageObj) => (
                    <ChatMessage key={messageObj.messageId}
                                 messageObject={messageObj}/>
                ))}
            </Stack>

            <div style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', width: '100%'}}>
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <GrainIcon style={{color: '#775EFF'}} />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, color: '#CFCED9' }}
                    autoFocus
                    fullWidth
                    multiline
                    placeholder='Tell me more about  your web app'
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SendIcon style={{color: '#775EFF'}} />
                </IconButton>
                {/*<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />*/}
            </div>
        </div>
    )
}

const style = {
    chatWindow: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        width: '100%',
        height: '100%'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '45px',
        width: '100%',
        padding: '0px 10px',
        background: '#181818',
        borderBottom: '1px solid #282636'
    },
    dialogContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'end',
        // padding: '22px',
        height: '100%'
    }
}

export default ChatWindow
