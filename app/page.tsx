'use client'

import React, { CSSProperties } from 'react'
import { Navbar } from '@/components'
import TextField from '@mui/material/TextField'
import mainImage from './../public/image/landingImageBG.webp'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Stack } from '@mui/material'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { useForm, ValidationError } from '@formspree/react'

export default function Home() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  const style: { [key: string]: CSSProperties } = {
    contentContainer: {
      margin: isMobile ? '55px 0px' : '0px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: isMobile ? 'auto' : 'calc(100% - 55px)',
    },
    mainImageContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '70%',
      width: isMobile ? '100%' : '65%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20,
      marginBottom: isMobile ? '320px' : 0,
    },
    mainImage: {
      position: isMobile ? 'absolute' : 'inherit',
      top: isMobile ? '200px' : undefined,
      width: isMobile ? '600px' : '50vw',
      height: isMobile ? '600px' : '50vw',
    },
    topText: {
      height: '100%',
      display: 'flex',
      background: isMobile ? undefined : '#0C0C0C',
      width: isMobile ? '100%' : '35%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '100',
      padding: '20px',
    },
    mockMessage: {
      padding: '10px',
      maxWidth: isMobile ? '65vw' : '17vw',
      border: '1px #5C4ABB solid',
      borderRadius: '8px',
    },
    mockMessageText: {
      fontSize: '12px',
      wordWrap: 'break-word',
      textDecoration: 'none',
      width: '100%',
      color: '#fff'
      // lineHeight: '-5px'
    },
  }

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: isMobile ? 'auto' : '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: '#0C0C0C',
      }}
    >
      <Navbar isMobile={isMobile} isLandingPage />
      <div style={style.contentContainer}>
        <div style={style.mainImageContainer}>
          {isMobile ? renderLandingHeader(isMobile) : undefined}
          <Image style={style.mainImage} src={mainImage} alt={'Zapply AI'} />
        </div>

        <div style={style.topText}>
          {isMobile ? undefined : renderLandingHeader(isMobile)}

          {renderMockMessages(isMobile, style)}

          <ContactForm isMobile={true} />
        </div>

        <Circles />
      </div>
    </div>
  )
}

const renderLandingHeader = (isMobile: boolean | null) => {
  return (
    <div style={isMobile ? { padding: '10px' } : {}}>
      <div style={{ fontSize: isMobile ? '58px' : '3.7vw', color: '#FFF' }}>
        Unleash the power of Zapply AI
      </div>

      <div
        style={{
          fontSize: isMobile ? '18px' : '1.2vw',
          color: '#85839F',
          fontWeight: '100',
          zIndex: 100,
          marginTop: '10px',
        }}
      >
        Build web application in 3 minutes just using a text prompt
      </div>
    </div>
  )
}

const renderMockMessages = (
  isMobile: boolean | null,
  style: { [key: string]: CSSProperties }
) => {
  return (
    <Stack
      style={{
        width: '100%',
        margin: '22px',
        ...{
          position: 'relative',
        },
      }}
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
          Do you want to include date, time, and name of the event in the event
          scheduling procedure, or more?
        </p>
      </div>
      <div style={{ ...style.mockMessage }}>
        <p style={style.mockMessageText}>
          I also want to include the list of attendants and google meet link!
        </p>
      </div>
      <div
        style={{
          ...style.mockMessage,
          marginLeft: 'auto',
        }}
      >
        <p style={style.mockMessageText}>Finished! (Took 2 min, 14 sec)</p>
      </div>
    </Stack>
  )
}

interface UpdateMeFormProps {
  isMobile: boolean | null
}

const ContactForm = ({ isMobile }: UpdateMeFormProps) => {
  const [state, handleSubmit] = useForm('xvoevzav')

  if (state.succeeded) {
    return <p>Thanks for joining!</p>
  }

  const style = {
    updateMeContainer: {
      width: isMobile ? '100%' : '60%',
      marginRight: 'auto',
      marginTop: isMobile ? '22px' : undefined,
    },
  }

  const handleFormSubmit = () => {
    const emailField = document.getElementById('email') as HTMLInputElement
    const email = emailField.value.trim()

    if (email !== '') {
      handleSubmit({ email })
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault() // Prevent form submission on Enter key press
      handleFormSubmit() // Call your form submission function
    }
  }

  return (
    <form style={style.updateMeContainer}>
      <span
        style={{
          color: '#CFCED9',
          fontSize: '22px',
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
          fontSize: '14px',
          fontWeight: '100',
          color: '#85839F',
        }}
      >
        Leave you email below and we will let you know when you can try it
        yourself
      </span>

      <TextField
        id="email"
        type="email"
        name="email"
        fullWidth
        variant="outlined"
        label="email"
        onKeyDown={handleKeyPress}
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
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <Button label={'Notify me!'} action={handleFormSubmit} fullWidth />
    </form>
  )
}

const Circles = () => {
  const style: { [key: string]: CSSProperties } = {
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
