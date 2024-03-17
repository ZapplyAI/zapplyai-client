import React from "react"
import DialogOption from "@/app/chat/components/DialogNavigation/component/DialogOption"
import map from "lodash/map"

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
        console.log('handleExpansion', id)
        if (!expanded) {
            setExpandedId(null)
            return
        }
        setExpandedId(id)
    }

    return (
        <div>
            {map(dialogs, (dialog, index) => {
                console.log(index, 'index')
                return (
                    <DialogOption index={index}
                                  dialog={dialog}
                                  onExpanded={handleExpansion}
                                  isExpanded={expandedId === index}
                    />
                )
            })}
        </div>
    )
}

export default DialogList
