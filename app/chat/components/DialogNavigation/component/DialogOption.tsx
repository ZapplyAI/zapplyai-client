import React from "react"
import DialogIcon from "@/app/chat/components/DialogNavigation/component/DialogIcon";
import Stack from '@mui/material/Stack';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Divider, IconButton, List} from '@mui/material';
import map from "lodash/map";

import BackspaceIcon from '@mui/icons-material/Backspace';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItem } from '@mui/material';


interface DialogOptionProps {
    key: number
    dialog: DialogProps
    onExpanded: any
    isExpanded: boolean
}

interface DialogProps {
    title: string
    pageTitle: string
    selectedOptions: string[]
}

const DialogOption  = ( { index, dialog, onExpanded, isExpanded } : DialogOptionProps ) : React.ReactNode => {
    return (
        <Accordion key={index}
                   style={style.accordionContainer}
                   onChange={(event, expanded) => onExpanded(index, expanded)}
                   expanded={isExpanded}>
            <AccordionSummary sx={{
                '& .MuiAccordionSummary-content.Mui-expanded	': style.accordionSummary,
                '& .MuiAccordionSummary-content	': style.accordionSummary
            }}
                              expandIcon={<ExpandMoreIcon sx={{color: '#CFCED9'}}/>}>
                <DialogIcon icon={"..."}/>
                <div style={style.accordionSummaryTitles}>
                    <h3 style={style.pageTitle}>{dialog.pageTitle}</h3>
                    <Typography style={style.dialogTitle}>
                        {dialog.title}
                    </Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="column"
                       spacing={1}
                style={{paddingLeft: '15px'}}>
                    {map(dialog.selectedOptions, (option) => {
                        return (
                            <FormControl fullWidth
                                         orientation="horizontal"
                                         sx={{ gap: 1, flexDirection: 'row', justifyContent: 'start', alignItems: 'center'}}>
                                <IconButton style={style.removeOptionButton}>
                                    <BackspaceIcon style={{height: '18px',}}/>
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

const style = {
    accordionContainer: {
        background: 'none',
        boxShadow: "none"
},
    accordionSummary: {
        alignItems: 'center',
        margin: '10px 0px'
    },
    accordionSummaryTitles: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1rem',
        paddingTop: '2px'
    },
    pageTitle: {
        fontSize: '12px',
        color: '#6A7883',
        marginBottom: '5px'
    },
    dialogTitle: {
        fontSize: '14px',
        color: '#CFCED9'
    },
    optionLabel: {
        fontSize: '12px',
        color: '#6A7883',
        // maxWidth: '60%'
    },
    removeOptionButton: {
        height: '22px',
        color: '#6A7883',
        transform: 'scaleX(-1)'
    }
}

export default DialogOption
