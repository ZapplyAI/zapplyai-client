import React from "react"
import {Avatar, Logo} from "@/components"
import {Box, Drawer, IconButton} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

interface RightDrawerProps {
  component: any
  icon: any
  title: string
  isOpen: boolean
  closeDrawer: any
}

const RightDrawer = ( { component, icon, title, isOpen, closeDrawer} : RightDrawerProps): React.ReactNode => {

  const onDrawerClose = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
        return
    }

    closeDrawer()
  }

    return (
        <Drawer
            anchor={'right'}
            open={isOpen}
            onClose={onDrawerClose}
            // PaperProps={{
            //   sx: style.drawerContainer
            //     }
            // }
        >
          <Box sx={style.drawerInnerContainer}>
            <div style={style.drawerHeader}>
              <div style={style.drawerHeaderLeft}>
                <div style={style.drawerIcon}>
                  {icon}
                </div>
                <span style={style.drawerHeaderTitle}>
                  {title}
                </span>
              </div>
              <IconButton>
                <CloseIcon onClick={closeDrawer}/>
              </IconButton>
            </div>
            {component}
          </Box>
        </Drawer>
    )
}

const style = {
  drawerContainer: {
    background: '#181818'
  },
  drawerInnerContainer: {
    padding: '20px'
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '22px'
  },
  drawerHeaderLeft: {
    display: 'flex',
    justifyContent: 'start',
    justifyItems: 'center'
  },
  drawerIcon: {
    height:'30px',
    width:'30px'
  },
  drawerHeaderTitle: {
    fontSize: '16px',
    marginLeft: '10px',
    marginTop: '6px',
    fontWeight: 500
  }
}

export default RightDrawer
