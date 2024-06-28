import React, { CSSProperties, useEffect, useState } from 'react'
import { IconButton, InputBase } from '@mui/material'
// @ts-ignore
import { UilArrowCircleUp } from '@iconscout/react-unicons'
import { AnyFunction, AsyncFunction } from '@/lib/type'
import { Input } from '@/components'
import map from 'lodash/map'
import Typography from '@mui/material/Typography'

interface FormInputProps {
  isMobile?: boolean
  errors?: string[]
  icon?: React.ReactNode
  placeholder?: string
  fullWidth?: boolean
  multiline?: boolean
  value?: string
  sx?: object
  onChange?: AnyFunction | AsyncFunction
  onSubmit?: AnyFunction | AsyncFunction
  hiddenText? : boolean
}

const FormInput = ({
  isMobile = false,
  errors = [],
  icon,
  placeholder = '',
  fullWidth = false,
  multiline = false,
  sx = {},
  value = '',
  onChange = async () => {},
  onSubmit = (prompt: string) => {},
                     hiddenText = false
}: FormInputProps): React.ReactNode => {
  const [prompt, setPrompt] = useState('')

  const handleInputChange = (value: string) => {
    setPrompt(value)
    onChange(value)
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
    <div style={{ marginTop: '12px' }}>
      <div style={style.errorContainer}>
        {map(errors, error => (
          <Typography variant={'h6'} style={style.errorSpan}>
            {error}
          </Typography>
        ))}
      </div>
      <Input
        placeholder={placeholder}
        icon={icon}
        onChange={handleInputChange}
        sendIcon={false}
        sx={{ margin: '8px 0px 0px 0px' }}
        hiddenText={hiddenText}
      />
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
  errorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  errorSpan: {
    fontSize: '12px',
    fontWeight: '200',
    color: '#B05B37',
  },
}

export type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>

export default FormInput
