import React from 'react'
import DialogOption from '@/app/chat/components/DialogNavigation/component/DialogOption'
import map from 'lodash/map'
import { Divider, Stack } from '@mui/material'
import { Dialog } from '@/lib/type'

interface DialogListProps {
  dialogs: Dialog[]
  openDialog: any
}

const DialogList = ({
  dialogs,
  openDialog,
}: DialogListProps): React.ReactNode => {
  const [expandedId, setExpandedId] = React.useState('')

  const handleExpansion = (id: string, expanded: boolean) => {
    if (!expanded) {
      setExpandedId('')
      return
    }
    setExpandedId(id)
    openDialog(id)
  }

  return (
    <Stack
      direction="column"
      spacing={0}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      {map(dialogs, dialog => (
        <DialogOption
          key={dialog.id}
          dialog={dialog}
          onExpanded={handleExpansion}
          isExpanded={expandedId === dialog.id}
        />
      ))}
    </Stack>
  )
}

export default DialogList
