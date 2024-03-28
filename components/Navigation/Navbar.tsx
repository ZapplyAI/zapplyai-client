'use client'

import React, { CSSProperties } from 'react'
import { Avatar, Logo } from '@/components'
import RightDrawer from '../RightDrawer/RightDrawer'
import SignUp from '@/components/Authentication/SignUp'
import LogIn from '@/components/Authentication/LogIn'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Button } from '@/components/Button'

const loggedIn = false

const Navbar = (): React.ReactNode => {
  const [drawerOpened, setDrawerOpen] = React.useState('')

  const closeDrawer = () => {
    setDrawerOpen('')
  }

  const toggleSignUpDrawer = () => {
    setDrawerOpen(open => (open ? 'Sign Up' : ''))
  }

  const toggleLogInDrawer = () => {
    setDrawerOpen(open => (open ? 'Log In' : ''))
  }

  return (
    <nav style={style.nav}>
      <Logo />
      {loggedIn ? (
        <Avatar />
      ) : (
        <div>
          <Button
            sx={{ marginRight: '10px' }}
            action={toggleSignUpDrawer}
            fullWidth={false}
            label={'Sign Up'}
            variant={'contained'}
          />
          <Button
            sx={{ marginRight: '10px' }}
            action={toggleLogInDrawer}
            fullWidth={false}
            label={'Log In'}
            variant={'contained'}
          />
        </div>
      )}

      <div style={{ position: 'absolute' }}>
        <RightDrawer
          title={drawerOpened}
          icon={
            <div
              style={{
                ...style.headerIconStyle,
                borderRadius: 100,
                background: '#f50057',
              }}
            >
              <LockOpenIcon
                style={{
                  ...style.headerIconStyle,
                  color: '#FFFFFF',
                  height: '65%',
                  width: '65%',
                }}
              />
            </div>
          }
          component={drawerOpened === 'Sign Up' ? <SignUp /> : <LogIn />}
          isOpen={drawerOpened !== ''}
          closeDrawer={closeDrawer}
        />
      </div>
    </nav>
  )
}

const style: { [key: string]: CSSProperties } = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '55px',
    width: '100%',
    padding: '0px 12px',
    background: '#181818',
    borderBottom: '1px solid #282636',
  },
  headerIconStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
}

export default Navbar
