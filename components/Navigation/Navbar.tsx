'use client'

import React, { CSSProperties, useEffect } from 'react'
import { Avatar, Logo } from '@/components'
import RightDrawer from '../RightDrawer/RightDrawer'
import SignUp from '@/components/Authentication/SignUp'
import LogIn from '@/components/Authentication/LogIn'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  isMobile?: boolean | null
  isLandingPage?: boolean
}

const loggedIn = false

const Navbar = ({
  isMobile,
  isLandingPage = false,
}: NavbarProps): React.ReactNode => {
  const router = useRouter()
  const [isDrawerOpen, setDrawerOpen] = React.useState('')

  useEffect(() => {}, [isDrawerOpen])

  const closeDrawer = () => {
    setDrawerOpen('')
  }

  const toggleSignUpDrawer = () => {
    setDrawerOpen(open => (!open ? 'Sign Up' : ''))
  }

  const toggleLogInDrawer = () => {
    setDrawerOpen(open => (!open ? 'Log In' : ''))
  }

  const style: { [key: string]: CSSProperties } = {
    nav: {
      position: 'static',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '55px',
      width: '100%',
      padding: '0px 12px',
      background: '#181818',
      borderBottom: '1px solid #282636',
      zIndex: 1000,
    },
    headerIconStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
  }

  return (
    <nav
      style={
        isLandingPage
          ? {
              ...style.nav,
              position: 'fixed',
              background: 'rgba(0,0,0,0.5)',
              // filter: 'blur(25px)',
              // backdropFilter: 'blur(80px)',
              WebkitBackdropFilter: 'blur(25px)',
              backdropFilter: 'blur(25px)',
            }
          : style.nav
      }
    >
      <Logo />
      {loggedIn ? (
        <Avatar />
      ) : isLandingPage ? (
        <div>
          <Button
            label={'Sign in'}
            sx={{ border: '1px #6551D1 solid', marginRight: '12px' }}
            action={() => router.push('/auth')}
          />
          <Button
            label={'Request Access'}
            sx={{ border: '1px #6551D1 solid' }}
            action={() => router.push('/requestAccess')}
          />
        </div>
      ) : (
        <React.Fragment>
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

          <div style={{ position: 'absolute' }}>
            <RightDrawer
              title={isDrawerOpen}
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
              component={isDrawerOpen === 'Sign Up' ? <SignUp /> : <LogIn />}
              isOpen={!!isDrawerOpen}
              closeDrawer={closeDrawer}
            />
          </div>
        </React.Fragment>
      )}
    </nav>
  )
}

export default Navbar
