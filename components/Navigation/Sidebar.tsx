import React from "react"
import {AppBar, IconButton, Stack} from "@mui/material"

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SettingsIcon from '@mui/icons-material/Settings'

const Sidebar = (): React.ReactNode => {
    return (
        <AppBar style={style.container} position={'static'}>
            <Stack direction="column"
                   spacing={2}>
                <IconButton href={'/'} style={style.navButton}>
                    <OpenInNewIcon style={style.navIcon}/>
                </IconButton>
                <IconButton href={'/'} style={style.navButton}>
                    <RocketLaunchIcon style={style.navIcon}/>
                </IconButton>
            </Stack>

            <Stack direction="column"
                   spacing={0}

            >
                <IconButton href={'/'} style={style.navButton}>
                    <SettingsIcon style={style.navIcon}/>
                </IconButton>
            </Stack>
        </AppBar>
    )
}

const style = {
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 'max-content',
        background: '#2F2B43',
        padding: '20px 12px'
    },
    buttonContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'start'
    },
    appsContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    navButton: {
        padding: 0
    },
    navIcon: {
        width: '22px',
        color: '#CFCED9'
    }
}

export default Sidebar
