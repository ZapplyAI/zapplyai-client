import React, { CSSProperties, useEffect } from 'react'
import { IconButton, InputBase } from '@mui/material'
import GrainIcon from '@mui/icons-material/Grain'
import SendIcon from '@mui/icons-material/Send'
import { useImmer } from 'use-immer'

type AsyncFunction = (...args: any[]) => Promise<any>
type AnyFunction = (...args: any[]) => any

interface InputProps {
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

interface PromptState {
  value?: string
  isProcessing: boolean
  step: string
}

const Input = ({
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
  const [prompt, setPrompt] = useImmer<PromptState>({
    value: value,
    isProcessing: false,
    step: '',
  })

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(draft => {
      draft.value = event.target.value
    })
    onChange(event)
  }

  const handleEnterPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent default behavior (creating new line)
      await onSubmit(prompt) // Perform action when Enter is pressed
    }
  }

  const handleSendButtonClick = async () => {
    await onSubmit(prompt)
  }

  useEffect(() => {
    setPrompt({
      value: value,
      isProcessing: false,
      step: '',
    });
  }, [value]);

  return (
    <div style={{ ...style.inputContainer, ...sx }}>
      {icon && (
        <IconButton sx={{ p: '10px', marginBottom: 'auto' }} aria-label="menu">
          {/*<GrainIcon style={{ color: '#775EFF' }} />*/}
          {icon}
        </IconButton>
      )}
      <InputBase
        style={{
          flex: 1,
          color: '#CFCED9',
          fontSize: '14px',
          maxHeight: '150px',
          overflow: 'scroll',
          margin: '5px 12px',
          marginLeft: icon ? '0' : '12px',
        }}
        autoFocus
        fullWidth={fullWidth}
        multiline={multiline}
        placeholder={placeholder}
        value={prompt.value}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
      <IconButton
        type="button"
        sx={{ height: '60%', padding: '5px', margin: 'auto', marginRight: '5px' }}
        aria-label="search"
        onClick={handleSendButtonClick}
      >
        {sendIcon && <SendIcon style={{ color: '#775EFF' }} />}
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

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export default Input
