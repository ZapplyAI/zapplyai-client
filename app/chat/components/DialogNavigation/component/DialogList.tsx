import React from 'react'
import DialogOption from '@/app/chat/components/DialogNavigation/component/DialogOption'
import map from 'lodash/map'
import { Divider, Stack } from '@mui/material'

interface DialogListProps {
  dialogs: DialogProps[]
  openDialog: any
}

interface DialogProps {
  id: number
  title: string
  pageTitle: string
  selectedOptions: string[]
  dialog: any
}

const DialogList = ({
  dialogs,
  openDialog,
}: DialogListProps): React.ReactNode => {
  const [expandedId, setExpandedId] = React.useState(-1)

  const handleExpansion = (id: number, expanded: boolean) => {
    if (!expanded) {
      setExpandedId(-1)
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
          index={dialog.id}
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
