'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components'
import styles from '@/app/landing/page.module.scss'
import TextField from '@mui/material/TextField'
import mainImage from './../../public/image/landingImageBG.webp'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Stack } from '@mui/material'
import {useClientMediaQuery} from '@/helpers/IsMobile'

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  console.log('isMobile', isMobile)

  const style = {
    contentContainer: {
      display: 'flex',
      padding: isMobile ? '0px 10px' : null,
      flexDirection: isMobile? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: isMobile? 'auto' : 'calc(100% - 55px)',
    },
    mainImageContainer: {
      display: 'flex',
      height: isMobile ? '500px' : '100%',
      width: isMobile ? '100%' : '65%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20,
      overflow: 'hidden',
    },
    mainImage: {
      width: isMobile ? '100vw' : '50vw',
      height: isMobile ? '100vw' : '50vw',
    },
    topText: {
      height: '100%',
      display: 'flex',
      background: '#0C0C0C',
      width: '35%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '100',
      padding: '20px',
    },
    mockMessage: {
      padding: '10px',
      maxWidth: '17vw',
      border: '1px #5C4ABB solid',
      borderRadius: '8px',
    },
    mockMessageText: {
      fontSize: '12px',
      wordWrap: 'break-word',
      textDecoration: 'none',
      width: '100%',
      // lineHeight: '-5px'
    },
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0C0C0C',
      }}
    >
      <Navbar isLandingPage />
      <div style={style.contentContainer}>
        <div style={style.mainImageContainer}>
          <Image style={style.mainImage} src={mainImage} />
          {/*<div className={styles.image} />*/}
        </div>

        <div style={style.topText}>
          <div>
            <div style={{ fontSize: '3.7vw' }}>
              Unleash the power of Zapply AI
            </div>

            <div
              style={{
                fontSize: '1.2vw',
                color: '#85839F',
                fontWeight: '100',
                zIndex: 100,
                marginTop: '10px',
              }}
            >
              Build web application in 3 minutes just using a text prompt
            </div>
          </div>

          <Stack
            style={{ width: '100%', margin: '22px' }}
            spacing={2}
            direction="column"
          >
            <div style={{ ...style.mockMessage }}>
              <p style={style.mockMessageText}>
                Create a calendar app with user accounts and event scheduling
              </p>
            </div>
            <div
              style={{
                ...style.mockMessage,
                marginLeft: 'auto',
              }}
            >
              <p style={{ ...style.mockMessageText }}>
                Do you want to include date, time, and name of the event in the
                event scheduling procedure, or more?
              </p>
            </div>
            <div style={{ ...style.mockMessage }}>
              <p style={style.mockMessageText}>
                I also want to include the list of attendants and google meet
                link!
              </p>
            </div>
            <div
              style={{
                ...style.mockMessage,
                marginLeft: 'auto',
              }}
            >
              <p style={style.mockMessageText}>
                Finished! (Took 2 min, 14 sec)
              </p>
            </div>
          </Stack>

          <UpdateMeForm onFormSubmit={() => console.log('form submitted')}
                        isMobile/>
        </div>

        <Circles isMobile={isMobile} />
      </div>
    </div>
  )
}

interface UpdateMeFormProps {
  onFormSubmit: any,
  isMobile: boolean
}

const UpdateMeForm = ({ onFormSubmit, isMobile }: UpdateMeFormProps) => {
  const style = {
    updateMeContainer: {
      width: '60%',
      marginRight: 'auto',
    },
  }

  return (
    <div style={style.updateMeContainer}>
      <span
        style={{
          color: '#CFCED9',
          fontSize: '1.5vw',
        }}
      >
        We will release soon!
      </span>
      <hr
        style={{
          width: '50%',
          marginTop: '15px',
          marginBottom: '15px',
          borderColor: '#5C4ABB',
        }}
      />
      <span
        style={{
          fontSize: '1vw',
          fontWeight: '100',
          color: '#85839F',
        }}
      >
        Leave you email below and we will let you know when you can try it
        yourself
      </span>

      <TextField
        fullWidth
        variant="outlined"
        label="email"
        sx={{
          '& .MuiInputLabel-root': { color: '#CFCED9' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#CFCED9' },
          background: '#181818',
          marginTop: '15px',
          marginBottom: '15px',
          border: '#CFCED9',
          '& .MuiInputBase-root': { color: '#CFCED9' },
        }}
      />

      <Button label={'Notify me!'} action={() => console.log('submitted')} />
    </div>
  )
}

interface CirclesProps {
  isMobile: boolean
}

const Circles = ({ isMobile } : CirclesProps) => {
  const style = {
    circlesContainer: {
      position: 'absolute',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '82.5vw',
      left: '17.5vw',
      top: '0px',
      overflow: 'hidden',
    },
    simpleCircle: {
      position: 'absolute',
      borderRadius: '100%',
      border: '1px #8B5BEF solid',
      opacity: 0.15,
    },
  }

  return (
    <div style={style.circlesContainer}>
      <div style={{ ...style.simpleCircle, height: '500px', width: '500px' }} />
      <div style={{ ...style.simpleCircle, height: '800px', width: '800px' }} />
      <div
        style={{ ...style.simpleCircle, height: '1150px', width: '1150px' }}
      />
    </div>
  )
}