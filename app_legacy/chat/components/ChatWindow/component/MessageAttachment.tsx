import React, { useState } from 'react'
import GrainIcon from '@mui/icons-material/Grain'
import { ListItem } from '@mui/material'
type CSSProperties = React.CSSProperties
import { type MessageAttachment, type AnyFunction, APP_STATE } from '../../../../../lib/type_legacy'
import { Button } from '@/components'
import { nanoid } from 'nanoid'

interface MessageAttachmentProps {
  attachment: MessageAttachment
  sendMessage: AnyFunction
  changeAppState: AnyFunction
  changeMessageAttachmentState: AnyFunction
}

const MessageAttachment = ({ attachment, sendMessage, changeAppState, changeMessageAttachmentState }: MessageAttachmentProps): React.ReactNode => {

  switch (attachment.element) {
    case 'guided_start':
      return (
        <Button
          key={0}
          disabled={attachment.state === 'disabled' || attachment.state === 'clicked'}
          variant={'outlined'}
          action={() => {
            changeAppState({
              label: APP_STATE.guided_start,
              step: 0,
              lastStep: 3,
            })
            sendMessage({
              messageId: nanoid(),
              message:
                'Step 1 - Summarise your web-application\n' +
                'Write 2-5 sentences about your web application. \n' +
                ' - Who is the audience? \n' +
                ' - What features should it include? \n' +
                ' - What is the typical use case?',
              sender: 'AI',
              attachments: [],
            })
            changeAppState({
              label: APP_STATE.guided_start,
              step: 1,
              lastStep: 3,
            })
            changeMessageAttachmentState(attachment.id, 'clicked')
          }}
          label={'Guided start'}
          sx={{border: attachment.state === 'clicked' ? '1px solid green' : '1px solid #775EFF', marginTop: '12px', marginRight: '12px'}}
        />
      )

  }

}

const style: { [key: string]: CSSProperties } = {

}

export default MessageAttachment
