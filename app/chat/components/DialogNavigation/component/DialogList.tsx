import React from "react"
import DialogOption from "@/app/chat/components/DialogNavigation/component/DialogOption"
import map from "lodash/map"
import {Divider, Stack} from "@mui/material";

interface DialogListProps {
    dialogs: DialogProps[]
}

interface DialogProps {
    title: string
    pageTitle: string
    selectedOptions: string[]
}

const DialogList = ( { dialogs } : DialogListProps ) : React.ReactNode => {
    const [expandedId, setExpandedId] = React.useState(null)

    const handleExpansion = (id, expanded) => {
        if (!expanded) {
            setExpandedId(null)
            return
        }
        setExpandedId(id)
    }

    return (
        <Stack direction="column"
               spacing={0}
               divider={<Divider orientation="horizontal" flexItem />}
        >
            {map(dialogs, (dialog, index) =>
                <DialogOption index={index}
                              dialog={dialog}
                              onExpanded={handleExpansion}
                              isExpanded={expandedId === index}
                />
            )}
        </Stack>
    )
}

export default DialogList
