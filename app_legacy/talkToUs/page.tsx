'use client'

import React, { CSSProperties, useRef, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Button, Input, Logo } from '@/components'
import Typography from '@mui/material/Typography'
import MUI_Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { useForm, ValidationError } from '@formspree/react'
import { useRouter } from 'next/navigation'

export default function RequestAccessPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const router = useRouter()

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [formState, handleSubmit] = useForm('xeqywayr')
  const [failedSubmition, setFailedSubmition] = useState(false)

  const handleFormSubmit = () => {
    console.log('Form : ', {
      Name: name,
      Title: title,
      Email: email,
      Message: message,
    })

    if (name === '' || email === '' || message === '') {
      setFailedSubmition(true)
      return
    }

    handleSubmit({ Name: name, Title: title, Email: email, Message: message })
    router.push('/')
  }

  const style: { [key: string]: CSSProperties } = {
    mainContainer: {
      width: isMobile ? '100vw' : '40vw',
      minWidth: isMobile ? 'auto' : '450px',
      height: '100vh',
      background: '#000',
      padding: isMobile ? '24px' : '36px',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '45px',
      width: '100%',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100% - 45px)',
    },
  }

  return (
    <div style={{ background: '#181818' }}>
      <div style={style.mainContainer}>
        <div style={style.headerContainer}>
          <Logo />
          <MUI_Button
            variant={'text'}
            onClick={() => {
              console.log('pushing router button')
              router.push('/')
            }}
          >
            <Typography
              variant={'h5_mobile' as any}
              style={{ textTransform: 'none', color: '#D0D0D0' }}
            >
              Close
            </Typography>
            <CloseIcon
              style={{ color: '#D0D0D0', height: '15px', marginTop: '2px'}}
            />
          </MUI_Button>
        </div>

        <div style={style.formContainer}>
          <Typography
            variant={isMobile ? 'h2_gradient_mobile' : ('h2_gradient' as any)}
            style={{ marginBottom: '25px', textAlign: 'center' }}
          >
            want to reach out to us?
          </Typography>
          <Typography
            variant={'h6' as any}
            style={{ marginBottom: '55px', textAlign: 'center' }}
          >
            We will try to be as helpful as we can!
          </Typography>
          <div
            style={{
              width: isMobile ? '100%' : '80%',
              minWidth: isMobile ? 'auto' : '400px',
              margin: '0px auto',
            }}
          >
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <Input
                onChange={e => setName(e.target.value)}
                isMobile={isMobile}
                placeholder={'Name*'}
                sendIcon={false}
                sx={{ margin: '20px 0 0 0', marginRight: '22px' }}
              />
              <Input
                onChange={e => setTitle(e.target.value)}
                isMobile={isMobile}
                placeholder={'Title'}
                sendIcon={false}
                sx={{ margin: '20px 0 0 0' }}
              />
            </div>
            <Input
              onChange={e => setEmail(e.target.value)}
              isMobile={isMobile}
              placeholder={'Email*'}
              sendIcon={false}
              sx={{ margin: '20px 0px' }}
            />
            <Input
              onChange={e => setMessage(e.target.value)}
              isMobile={isMobile}
              placeholder={'Message*'}
              sendIcon={false}
              multiline
              sx={{ margin: '20px 0px' }}
            />
            <Button
              label={'Submit'}
              action={handleFormSubmit}
              fullWidth
              sx={failedSubmition ? { border: '1px red' } : {}}
            />
          </div>
        </div>

        <ValidationError
          prefix="Email"
          field="email"
          errors={formState.errors}
        />
      </div>
    </div>
  )
}
