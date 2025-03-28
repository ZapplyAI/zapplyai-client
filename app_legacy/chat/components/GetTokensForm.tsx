'use client'

import React from 'react'
import InputField from '@/app_legacy/chat/components/ChatWindow/component/InputField'
import {
  Paper,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MUI_Button from '@mui/material/Button'
import { Button, Input } from '@/components'

interface GetTokensFormProps {
  isMobile: boolean
  open: boolean
  onClose: () => void
}

const GetTokensForm = ({
  isMobile,
  open,
  onClose,
}: GetTokensFormProps): React.ReactNode => {
  const style: { [key: string]: React.CSSProperties } = {
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
    },
    closeIcon: {
      height: '22px',
      width: '22px',
      color: '#858585',
    },
    mainHeader: {
      marginTop: '22px',
      marginBottom: '10px',
      fontSize: '14px',
    },
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          // backdropFilter: 'blur(5px)', // Add blur effect to the backdrop
          borderRadius: isMobile ? '10px' : '6px',
          background: '#1B1A21',
          zIndex: '200',
        },
      }}
    >
      <DialogContent style={style.dialogContent}>
        {displayHeader(style, onClose)}
        {/*<Typography variant="h6" style={style.mainHeader}>*/}
        {/*  What are tokens used for*/}
        {/*</Typography>*/}
        {/*<div style={{ marginLeft: '16px' }}>*/}
        {/*  <Typography variant="h6" style={{ fontWeight: '200' }}>*/}
        {/*    - Creating apps*/}
        {/*  </Typography>*/}
        {/*  <Typography variant="h6" style={{ fontWeight: '200' }}>*/}
        {/*    - Editing apps*/}
        {/*  </Typography>*/}
        {/*  <Typography variant="h6" style={{ fontWeight: '200' }}>*/}
        {/*    - Deploying apps*/}
        {/*  </Typography>*/}
        {/*</div>*/}

        <Typography variant="h6" style={style.mainHeader}>
          Select from below
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <BuyTokenOption
              isMobile={isMobile}
              description={'Create basic app'}
              price={10}
              tokens={10}
              onClick={() => {}}
            />
          </Grid>

          <Grid item xs={6}>
            <BuyTokenOption
              isMobile={isMobile}
              description={
                'Create simple app, edit it and share it with your future users'
              }
              price={23}
              oldPrice={25}
              tokens={25}
              onClick={() => {}}
            />
          </Grid>

          <Grid item xs={6}>
            <BuyTokenOption
              isMobile={isMobile}
              description={
                'Create fully-functional web application, edit it and share it globally'
              }
              price={36}
              oldPrice={40}
              tokens={40}
              onClick={() => {}}
            />
          </Grid>

          <Grid item xs={6}>
            <BuyTokenOption
              isMobile={isMobile}
              description={
                'Build a business-level applications, add payments, etc... Edit your app and share it globally'
              }
              price={90}
              oldPrice={100}
              tokens={100}
              onClick={() => {}}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" style={style.mainHeader}>
          Or choose custom amount
        </Typography>
        <Input sx={{ margin: '0' }} fullWidth placeholder={'Enter amount'} sendIcon={false}/>

        <div
          style={{
            marginTop: isMobile ? '12px' : '32px',
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            label={'Cancel'}
            sx={
              isMobile
                ? { fontWeight: '300', marginTop: '12px', height: '45px' }
                : { marginRight: '10px', fontWeight: '300' }
            }
            action={onClose}
            fullWidth={isMobile}

          />
          <Button
            label={'Proceed to payment'}
            sx={
              isMobile
                ? { background: '#4D3CAA', fontWeight: '300', marginTop: '12px', height: '45px' }
                : { background: '#4D3CAA', fontWeight: '300' }
            }
            fullWidth={isMobile}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

const displayHeader = (style: any, onClose: any) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Typography variant="h6" style={{ ...style.mainTitle, margin: '0' }}>
          Get tokens
        </Typography>
        <IconButton onClick={onClose} sx={{ padding: '3px' }}>
          <CloseIcon sx={style.closeIcon} />
        </IconButton>
      </div>
      <hr style={{ border: '1px solid #282636', marginTop: '8px' }} />
    </React.Fragment>
  )
}

interface ButTokenOptionProps {
  isMobile: boolean
  tokens: number
  price: number
  oldPrice?: number
  description: string
  onClick: any
}

const BuyTokenOption = ({
  isMobile,
  tokens,
  price,
  oldPrice,
  description,
  onClick,
}: ButTokenOptionProps) => {
  const style: { [key: string]: React.CSSProperties } = {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '12px',
      height: isMobile ? '200px' : '160px',
      border: '1px solid #383644',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease',
    },
    buttonContainer: {
      background: '#282636',
    },
  }

  const handleMouseEnter = (e: any) => {
    e.currentTarget.style.borderColor = '#4E4969'
  }

  const handleMouseLeave = (e: any) => {
    e.currentTarget.style.borderColor = '#383644'
  }

  return (
    <div
      style={style.mainContainer}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <Typography
          variant="h6"
          style={{ fontSize: '14px', fontWeight: '400', marginBottom: '8px' }}
        >
          {tokens} TKN
        </Typography>
        <Typography
          variant="h6"
          style={{ fontSize: '12px', fontWeight: '300' }}
        >
          {description}
        </Typography>
      </div>

      <MUI_Button
        variant="contained"
        fullWidth
        onClick={e => e.stopPropagation()}
        style={style.buttonContainer}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ color: '#775EFF' }}>
            ${price}
          </Typography>
          {oldPrice && (
            <Typography
              // @ts-ignore
              variant={isMobile ? 'h5_mobile' : 'h5'}
              color="textSecondary"
              sx={{
                marginLeft: 1,
                textDecoration: 'line-through',
                color: '#5F5F5F',
              }}
            >
              ${oldPrice}
            </Typography>
          )}
        </Box>
      </MUI_Button>
    </div>
  )
}

export default GetTokensForm
