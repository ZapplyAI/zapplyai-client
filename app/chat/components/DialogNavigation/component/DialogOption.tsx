import React, { CSSProperties } from 'react'
import DialogIcon from '@/app/chat/components/DialogNavigation/component/DialogIcon'
import Stack from '@mui/material/Stack'

import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { IconButton } from '@mui/material'
import map from 'lodash/map'

import BackspaceIcon from '@mui/icons-material/Backspace'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Dialog } from '@/lib/type'

interface DialogOptionProps {
  dialog: Dialog
  onExpanded: any
  isExpanded: boolean
}

const DialogOption = ({
  dialog,
  onExpanded,
  isExpanded,
}: DialogOptionProps): React.ReactNode => {
  return (
    <Accordion
      key={dialog.id}
      style={style.accordionContainer}
      onChange={(event, expanded) => onExpanded(dialog.id, expanded)}
      expanded={isExpanded}
      sx={{
        '&.Mui-expanded': {
          margin: '0px',
        },
        padding: '0px',
      }}
    >
      <AccordionSummary
        sx={{
          '& .MuiAccordionSummary-content.Mui-expanded	': style.accordionSummary,
          '& .MuiAccordionSummary-content	': style.accordionSummary,
          padding: '0px',
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: '#CFCED9' }} />}
      >
        <DialogIcon iconName={''} />
        <div style={style.accordionSummaryTitles}>
          <h3 style={style.pageTitle}>{dialog.pageTitle}</h3>
          <Typography style={style.dialogTitle}>{dialog.title}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ padding: '8px 16px' }}>
        <Stack direction="column" spacing={1} style={{ paddingLeft: '15px' }}>
          {map(dialog.selectedOptions, (option: string, key: number) => {
            return (
              <FormControl
                fullWidth
                key={key}
                component="div"
                // orientation="horizontal"
                sx={{
                  gap: 1,
                  flexDirection: 'row',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <IconButton style={style.removeOptionButton}>
                  <BackspaceIcon style={{ height: '18px' }} />
                </IconButton>
                <FormLabel style={style.optionLabel}>{option}</FormLabel>
              </FormControl>
            )
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

const style: { [key: string]: CSSProperties } = {
  accordionContainer: {
    background: 'none',
    boxShadow: 'none',
  },
  accordionSummary: {
    alignItems: 'center',
    margin: '7px 0px',
    padding: '0px',
  },
  accordionSummaryTitles: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '1rem',
    paddingTop: '2px',
  },
  pageTitle: {
    fontSize: '10px',
    color: '#6A7883',
    marginBottom: '5px',
  },
  dialogTitle: {
    fontSize: '12px',
    color: '#CFCED9',
  },
  optionLabel: {
    fontSize: '12px',
    color: '#6A7883',
    // maxWidth: '60%'
  },
  removeOptionButton: {
    height: '22px',
    color: '#6A7883',
    transform: 'scaleX(-1)',
  },
}

export default DialogOption
