import React, { CSSProperties, useEffect, useState } from 'react'
import { IconButton, InputBase } from '@mui/material'
// @ts-ignore
import { UilArrowCircleUp } from '@iconscout/react-unicons'
import { AnyFunction, AsyncFunction } from '@/lib/type_legacy'

interface InputProps {
  isMobile?: boolean
  icon?: React.ReactNode
  sendIcon?: boolean
  placeholder?: string
  fullWidth?: boolean
  multiline?: boolean
  submitButton?: boolean
  value?: string
  sx?: object
  onChange?: AnyFunction | AsyncFunction
  onSubmit?: AnyFunction | AsyncFunction
}

const Input = ({
  isMobile = false,
  icon,
  sendIcon = true,
  placeholder = '',
  fullWidth = false,
  multiline = false,
  submitButton = false,
  sx = {},
  value = '',
  onSubmit = (prompt: string) => {},
  onChange = async () => {},
}: InputProps): React.ReactNode => {
  const [prompt, setPrompt] = useState('')

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(event.target.value)
    onChange(event.target.value)
  }

  const handleEnterPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent default behavior (creating new line)
      setPrompt('')
      onSubmit(prompt) // Perform action when Enter is pressed
    }
  }

  const handleSendButtonClick = (event: any) => {
    setPrompt('')
    onSubmit(prompt)
  }

  return (
    <div style={{ ...style.inputContainer, ...sx }}>
      {icon && (
        <IconButton
          sx={{ p: '10px 16px', marginBottom: 'auto' }}
          aria-label="menu"
        >
          {icon}
        </IconButton>
      )}
      <InputBase
        style={{
          flex: 1,
          color: '#CFCED9',
          fontSize: isMobile ? '22px' : '14px',
          fontWeight: '200',
          maxHeight: '150px',
          overflow: 'scroll',
          margin: '5px 12px',
          marginLeft: icon ? '0' : '12px',
        }}
        autoFocus
        fullWidth={fullWidth}
        multiline={multiline}
        placeholder={placeholder}
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={event => handleEnterPress(event)}
      />
      <IconButton
        type="button"
        sx={{
          height: '60%',
          padding: '5px',
          margin: 'auto',
          marginRight: '5px',
        }}
        aria-label="search"
        onClick={(event) => handleSendButtonClick(event)}
      >
        {sendIcon && <UilArrowCircleUp style={{ color: '#775EFF' }} />}
      </IconButton>
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0px 12px 0px',
    border: '1px solid #423F59',
    borderRadius: '5px',
    maxHeight: '550px',
  },
}

export type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>

export default Input
