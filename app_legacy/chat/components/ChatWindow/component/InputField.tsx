'use client'

import React, { CSSProperties, useRef, useState } from 'react'
import { Input, Logo } from '@/components'
import { nanoid } from 'nanoid'
import { Message } from '../../../../../lib/type_legacy'

interface InputFieldProps {
  sendAction: (message: Message) => void
}

const InputField = ({ sendAction }: InputFieldProps): React.ReactNode => {
  const style: { [key: string]: CSSProperties } = {}

  return (
    <Input
      icon={<Logo mini height={22} width={22} />}
      sx={{ margin: '0' }}
      fullWidth
      placeholder={'Your message to Elastic AI'}
      onSubmit={(message: string) =>
        sendAction({ messageId: nanoid(), message: message, sender: 'USER', attachments: [] })
      }
    />
  )
}

export default InputField
