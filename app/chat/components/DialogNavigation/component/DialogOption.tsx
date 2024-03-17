import React from "react"
import DialogIcon from "@/app/chat/components/DialogNavigation/component/DialogIcon";
import Stack from '@mui/material/Stack';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {IconButton, List} from '@mui/material';
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
            <AccordionSummary style={style.accordionSummary}
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
                <Stack direction="column" spacing={0}>
                    {map(dialog.selectedOptions, (option) => {
                        return (
                            <FormControl fullWidth
                                         orientation="horizontal"
                                         sx={{ gap: 1, flexDirection: 'row', justifyContent: 'end', }}>
                                {/*<AirplanemodeActiveRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />*/}
                                <FormLabel style={style.optionLabel}>{option}</FormLabel>
                                {/*<Switch size="sm" />*/}
                                <IconButton style={style.removeOptionButton}>
                                    <BackspaceIcon style={{height: '20px',}}/>
                                </IconButton>
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
    },
    accordionSummary: {
        alignItems: 'center'
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
        color: '#6A7883'
    },
    removeOptionButton: {
        height: '22px',
        color: '#6A7883'
    }
}

export default DialogOption
