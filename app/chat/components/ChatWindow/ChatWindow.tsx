import React, {useState} from "react"
import ChatMessage from "@/app/chat/components/ChatWindow/ChatMessage"
import {Divider, IconButton, InputBase, Stack} from "@mui/material"
import GrainIcon from '@mui/icons-material/Grain'
import SendIcon from '@mui/icons-material/Send'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useFormControl } from '@mui/material/FormControl';


interface DialogProps {
    id: number,
    title: string
    pageTitle: string
    selectedOptions: string[],
    dialog: any
}

interface ChatWindowProps {
    selectedDialog: DialogProps
    sendMessage: any
}

interface ChatHeaderProps {
    icon: any
    headerTitle: string
}

const ChatHeader = ( { icon, headerTitle } : ChatHeaderProps) : React.ReactNode => {
    return (
        <div style={style.headerContainer}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <GrainIcon style={{ color: '#775EFF' }} />
                <span style={{ color: '#CFCED9', marginLeft: '5px' }}>{headerTitle}</span>
            </div>

            <div style={{ marginLeft: 'auto' }}>
                <IconButton>
                    <MoreVertIcon style={{ color: '#CFCED9' }} />
                </IconButton>
            </div>
        </div>
    )
}

const ChatWindow = ( { selectedDialog, sendMessage } : ChatWindowProps) : React.ReactNode => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior (creating new line)
            submitAction(); // Perform action when Enter is pressed
        }
    }

    const handleSendButtonClick = () => {
        submitAction()
    }

    const submitAction = () => {
        console.log('Submitted:', inputValue)

        sendMessage(inputValue)
        // Clear input field after submission if needed
        setInputValue('')
    }

    if (selectedDialog === null) {
        return (<div>empty</div>)
    }

    return (
        <div style={style.chatWindow}>
            <ChatHeader icon={null}
                        headerTitle={selectedDialog.title} />
            <Stack direction={'column'}
                   alignItems={'center'}
                   justifyContent={'flex-end'}
                   spacing={3}
                   divider={<Divider orientation="horizontal" flexItem style={{background: '#48474E'}}/>}
                   style={style.dialogContainer}>
                {selectedDialog.dialog.map((messageObj) => (
                    <ChatMessage key={messageObj.messageId}
                                 messageObject={messageObj}/>
                ))}
            </Stack>

            <div style={style.inputContainer}>
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <GrainIcon style={{color: '#775EFF'}} />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, color: '#CFCED9', fontSize: '14px' }}
                    autoFocus
                    fullWidth
                    multiline
                    placeholder='Tell me more about  your web app'
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterPress}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSendButtonClick}>
                    <SendIcon style={{color: '#775EFF'}} />
                </IconButton>
                {/*<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />*/}
            </div>
        </div>
    )
}

const style = {
    chatWindow: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'end',
        width: '100%',
        height: '100%'
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '45px',
        width: '100%',
        padding: '0px 10px',
        background: '#181818',
        borderBottom: '1px solid #282636',
        borderLeft: '1px solid #282636'
    },
    dialogContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'end',
        // padding: '22px',
        overflow: 'hidden',
        width: '80%',
        flex: 1
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '30px 0px 12px 0px',
        width: '80%',
        border: '1px solid #423F59',
        borderRadius: '5px'
    }
}

export default ChatWindow
