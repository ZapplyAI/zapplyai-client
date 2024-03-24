"use client"

import React from "react"
import {Avatar, Logo} from "@/components"
import {Button} from "@mui/material"
import RightDrawer from "../RightDrawer/RightDrawer"
import SignUp from "@/components/Authentication/SignUp"
import LogIn from "@/components/Authentication/LogIn"
import LockOpenIcon from '@mui/icons-material/LockOpen';

const loggedIn = false

const Navbar = (): React.ReactNode => {
    const [drawerOpened, setDrawerOpen] = React.useState("")

    const closeDrawer = () => {
        setDrawerOpen('')
    }

    const toggleSignUpDrawer = (open) => {
        setDrawerOpen(open ? 'Sign Up' : '')
    }

    const toggleLogInDrawer = (open) => {
        setDrawerOpen(open ? 'Log In' : '')
    }

    return (
        <nav style={style.nav}>
            <Logo />
            {loggedIn ? (<Avatar />) : (
              <div>
                  <Button style={{ marginRight: "10px" }}
                          onClick={toggleSignUpDrawer}>
                      Sign Up
                  </Button>
                  <Button style={{ marginRight: "10px" }}
                          onClick={toggleLogInDrawer}>
                      Log In
                  </Button>
              </div>
            )}

            <div style={{ position: "absolute" }}>
                <RightDrawer
                  title={drawerOpened}
                  icon={
                        <div style={{
                                ...style.headerIconStyle,
                                borderRadius: 100,
                                background: '#f50057'
                            }}>
                            <LockOpenIcon style={{
                              ...style.headerIconStyle,
                              color: '#FFFFFF',
                              height: '65%',
                              width: '65%'}}/>
                        </div>
                        }
                  component={drawerOpened === 'Sign Up' ? <SignUp/> : <LogIn/> }
                  isOpen={drawerOpened !== ''}
                  closeDrawer={closeDrawer}
                  />
              </div>
        </nav>


    )
}

const style = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '55px',
        width: '100%',
        padding: '0px 12px',
        background: '#181818',
        borderBottom: '1px solid #282636'
    },
  headerIconStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  }
}

export default Navbar
