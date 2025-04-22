'use client'
import React, { useState, useEffect } from 'react'
import { Box, useTheme, IconButton, Drawer, List, ListItem } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import ClippedButton from '@/app/(components)/ClippedButton'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import AuthButton from '@/app/(navigation)/AuthButton'
// import AuthButton from '@/app/(navigation)/AuthButton'

interface TopNavProps {
  showAlert: () => void
  isMobile: boolean
}

export const TopNav = ({ showAlert, isMobile }: TopNavProps) => {
  const theme = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  const navLinks = [
    { name: 'Features', url: '#' },
    { name: 'Pricing', url: '#' },
    { name: 'Documentation', url: '/documentation' },
    // { name: 'Blog', url: '#' },
  ]

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setDrawerOpen(open)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
        backgroundColor: scrolled ? 'rgba(10, 9, 14, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(119, 94, 255, 0.3)' : 'none',
      }}
    >
      <Box
        sx={{
          margin: `0px ${isMobile ? theme.customSpacing?.sides.mobile : theme.customSpacing?.sides.desktop}`,
          padding: '15px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 0.8,
              }
            }}
          >
            <Image
              src="/assets/svgs/LISA MARK EXP.svg"
              alt="Logo"
              width={32}
              height={32}
              style={{ display: 'block', marginTop: '-4px' }}
            />
            {!isMobile && (
              <Typography
                variant={'h3' as any}
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginLeft: '16px',
                  marginBottom: '0',
                  fontFamily: 'Orbitron, sans-serif',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Elastic Copilot
              </Typography>
            )}
          </Box>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map((link, index) => (
              <Link
                href={link.url}
                key={index}
                style={{
                  marginRight: '30px',
                  fontSize: '0.9rem',
                  color: '#AEAEAE',
                  fontFamily: 'JetBrains Mono, monospace',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
            {/*<ClippedButton*/}
            {/*  onClick={showAlert}*/}
            {/*  sx={{*/}
            {/*    fontFamily: 'Tektur, sans-serif',*/}
            {/*    fontSize: '0.9rem',*/}
            {/*    padding: '8px 16px',*/}
            {/*    marginRight: '15px',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Sign In*/}
            {/*</ClippedButton>*/}
            <AuthButton/>
            <ClippedButton
              filled={true}
              onClick={showAlert}
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '0.9rem',
                padding: '8px 16px',
              }}
            >
              Get Started
            </ClippedButton>
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ color: '#FFFFFF' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: '80%',
              maxWidth: '300px',
              background: 'linear-gradient(135deg, #0A090E, #13121A)',
              borderLeft: '1px solid rgba(119, 94, 255, 0.3)',
              padding: '20px',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <Link href="/" style={{ textDecoration: 'none' }} onClick={toggleDrawer(false)}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src="/assets/svgs/LISA MARK EXP.svg"
                  alt="Elastic Copilot Logo"
                  width={28}
                  height={28}
                  style={{ display: 'block' }}
                />
                <Typography
                  variant={'h3' as any}
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginLeft: '10px',
                    fontFamily: 'Orbitron, sans-serif',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Elastic Copilot
                </Typography>
              </Box>
            </Link>
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{ color: '#FFFFFF' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((link, index) => (
              <ListItem key={index} sx={{ padding: '15px 0' }}>
                <Link
                  href={link.url}
                  style={{
                    fontSize: '1rem',
                    color: '#AEAEAE',
                    fontFamily: 'JetBrains Mono, monospace',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  className="nav-link"
                >
                  {link.name}
                </Link>
              </ListItem>
            ))}
          </List>

          <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <ClippedButton
              onClick={() => {
                showAlert()
                setDrawerOpen(false)
              }}
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '0.9rem',
                padding: '10px 16px',
                width: '100%',
              }}
            >
              Sign In
            </ClippedButton>
            <ClippedButton
              filled={true}
              onClick={() => {
                showAlert()
                setDrawerOpen(false)
              }}
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '0.9rem',
                padding: '10px 16px',
                width: '100%',
              }}
            >
              Get Started
            </ClippedButton>
          </Box>

          <Box
            sx={{
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              borderTop: '1px solid rgba(119, 94, 255, 0.2)',
              paddingTop: '20px',
            }}
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/elasticapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/linkedin_icon.png"
                alt="LinkedIn"
                width={30}
                height={30}
                style={{ cursor: 'pointer' }}
              />
            </a>

            {/* Telegram */}
            <a href="mailto:support@elasticapp.io">
              <Image
                src="/icons/telegram_icon.png"
                alt="Telegram"
                width={30}
                height={30}
                style={{ cursor: 'pointer' }}
              />
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com/your-company-handle" // replace with actual
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/twitter_x_icon.png"
                alt="X"
                width={30}
                height={30}
                style={{ cursor: 'pointer' }}
              />
            </a>
          </Box>
        </Drawer>
      </Box>
    </Box>
  )
}
