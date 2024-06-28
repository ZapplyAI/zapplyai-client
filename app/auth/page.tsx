'use client'

import { CSSProperties, useState } from 'react'
import { Button, FormInput, Logo } from '@/components'
import { IconButton, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MUI_Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { editApiAccessToken, editEmail, editName } from '@/lib/reducer/user'
import { useRouter } from 'next/navigation'
import { useClientMediaQuery } from '@/lib/util/IsMobile'

type InputField = {
  value: string
  errors: string[]
}

export default function Page() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const isBigScreen = useClientMediaQuery('(min-width: 1500)')
  const screenType = isMobile ? 'mobile' : isBigScreen ? 'big' : 'normal'

  const [selectedForm, setSelectedForm] = useState('sign in')
  const dispatch = useDispatch()
  const router = useRouter()

  const [nameField, setNameField] = useState({ value: '', errors: [] })
  const [emailField, setEmailField] = useState({ value: '', errors: [] })
  const [passwordField, setPasswordField] = useState({ value: '', errors: [] })
  const [repeatPasswordField, setRepeatPasswordField] = useState({
    value: '',
    errors: [],
  })

  const style: { [key: string]: CSSProperties } = {
    centricContainer: {
      height: '100svh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      background: '#15141B',
    },
    promptContainer: {
      width: isMobile ? '95vw' : '500px',
      maxWidth: '1000px',
      maxHeight: '800px',
      background: '#1B1A21',
      padding: '22px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
    },
    formHeader: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionButtonsRow: {
      display: 'flex',
      width: '100%',
      flexDirection: isMobile ? 'column-reverse' : 'row',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      marginTop: '22px',
    },
  }

  return (
    <div style={style.centricContainer}>
      <IconButton
        onClick={() => {
          router.push('/')
        }}
        sx={{ position: 'absolute', left: '30px', top: '30px', padding: '3px' }}
      >
        <Logo mini={true} height={30} width={30} sx={{}} />
      </IconButton>

      <Paper elevation={1} sx={style.promptContainer}>
        <div style={style.formHeader}>
          <Typography variant={'h6'}>
            {selectedForm === 'sign in' ? 'Sign In' : 'Sign Up'}
          </Typography>
          <IconButton
            onClick={() => {
              router.push('/')
            }}
            sx={{ padding: '3px' }}
          >
            <CloseIcon
              style={{ color: '#858585', height: '22px', marginTop: '2px' }}
            />
          </IconButton>
        </div>

        <hr style={{ border: '0.7px solid #282636', marginTop: '12px' }} />

        {selectedForm === 'sign in' && (
          <>
            <FormInput
              errors={emailField.errors}
              placeholder={'Email*'}
              value={emailField.value}
              onChange={value => updateEmailField(value, setEmailField)}
              fullWidth
            />
            <FormInput
              errors={passwordField.errors}
              placeholder={'Password*'}
              value={passwordField.value}
              onChange={value => updatePasswordField(value, setPasswordField)}
              fullWidth
              hiddenText
            />
            <div style={style.actionButtonsRow}>
              <MUI_Button
                variant={'text'}
                onClick={() => {}}
                sx={{ textTransform: 'none' }}
                fullWidth={isMobile}
              >
                <Typography
                  variant={'h6'}
                  sx={{ fontSize: '10px', fontWeight: '200', color: '#7C7C7C' }}
                >
                  Forgot password?
                </Typography>
              </MUI_Button>
              <div
                style={
                  isMobile
                    ? { display: 'flex', flexDirection: 'column-reverse' }
                    : {}
                }
              >
                <Button
                  label={'Sign Up'}
                  action={() => {
                    setSelectedForm('sign up')
                  }}
                  sx={{
                    fontWeight: '300',
                    marginRight: '12px',
                    padding: isMobile ? '14px 22px' : ' 12px 22px',
                    marginBottom: isMobile ? '22px' : '0px'
                  }}
                  fullWidth={isMobile}
                />
                <Button
                  label={'Sign In'}
                  action={() => {
                    if (
                      checkForErrors(
                        nameField,
                        emailField,
                        passwordField,
                        repeatPasswordField
                      )
                    ) {
                      return
                    }

                    dispatch(editName('User Name'))
                    dispatch(editEmail(emailField.value))
                    dispatch(editApiAccessToken('some token'))
                    router.push('/chat')
                  }}
                  sx={{
                    background: '#4D3CAA',
                    fontWeight: '300',
                    padding: isMobile ? '14px 32px' : '12px 32px',
                    marginBottom: isMobile ? '16px' : '0px'
                  }}
                  fullWidth={isMobile}
                />
              </div>
            </div>
          </>
        )}

        {selectedForm === 'sign up' && (
          <>
            <FormInput
              errors={nameField.errors}
              placeholder={'Name*'}
              value={nameField.value}
              onChange={value => setNameField({ value: value, errors: [] })}
              fullWidth
            />
            <FormInput
              errors={emailField.errors}
              placeholder={'Email*'}
              value={emailField.value}
              onChange={value => updateEmailField(value, setEmailField)}
              fullWidth
            />
            <FormInput
              errors={passwordField.errors}
              placeholder={'Password*'}
              value={passwordField.value}
              onChange={value => updatePasswordField(value, setPasswordField)}
              fullWidth
              hiddenText
            />
            <FormInput
              errors={repeatPasswordField.errors}
              placeholder={'Repeat password*'}
              value={repeatPasswordField.value}
              onChange={value =>
                updateRepeatPasswordField(
                  value,
                  setRepeatPasswordField,
                  passwordField.value
                )
              }
              fullWidth
              hiddenText
            />

            <div style={style.actionButtonsRow}>
              <div
                style={
                  isMobile
                    ? { display: 'flex', flexDirection: 'column-reverse' }
                    : {}
                }
              >
                <Button
                  label={'Sign in'}
                  action={() => {
                    setSelectedForm('sign in')
                  }}
                  sx={{
                    fontWeight: '300',
                    marginRight: '12px',
                    padding: isMobile ? '14px 22px' : '12px 22px',
                  }}
                  fullWidth={isMobile}
                />
                <Button
                  label={'Sign Up'}
                  action={() => {
                    if (
                      checkForErrors(
                        nameField,
                        emailField,
                        passwordField,
                        repeatPasswordField
                      )
                    ) {
                      return
                    }

                    dispatch(editName(nameField.value))
                    dispatch(editEmail(emailField.value))
                    dispatch(editApiAccessToken('some token'))
                    router.push('/chat')
                  }}
                  sx={{
                    background: '#4D3CAA',
                    fontWeight: '300',
                    padding: isMobile ? '14px 32px' : ' 12px 32px',
                    marginBottom: isMobile ? '16px' : '0px'
                  }}
                  fullWidth={isMobile}
                />
              </div>
            </div>
          </>
        )}
      </Paper>
    </div>
  )
}

const checkForErrors = (
  nameField: InputField,
  emailField: InputField,
  passwordField: InputField,
  repeatedPasswordField: InputField
) => {
  if (nameField.errors && nameField.errors.length > 0) {
    return true
  }
  if (emailField.errors && emailField.errors.length > 0) {
    return true
  }
  if (passwordField.errors && passwordField.errors.length > 0) {
    return true
  }
  if (repeatedPasswordField.errors && repeatedPasswordField.errors.length > 0) {
    return true
  }
  return false
}

const updateEmailField = (value: string, setEmailField: any) => {
  const errors = []

  if (!value.includes('@')) {
    errors.push('Wrong email format')
  }

  setEmailField({ value: value, errors: value.length === 0 ? [] : errors })
}

const updatePasswordField = (value: string, setPasswordField: any) => {
  const errors = []

  if (value.length < 5) {
    errors.push('Password too short')
  }

  setPasswordField({ value: value, errors: value.length === 0 ? [] : errors })
}

const updateRepeatPasswordField = (
  value: string,
  setRepeatPasswordField: any,
  password: string
) => {
  const errors = []

  if (password !== value) {
    errors.push('Passwords do not match')
  }

  setRepeatPasswordField({
    value: value,
    errors: value.length === 0 ? [] : errors,
  })
}
