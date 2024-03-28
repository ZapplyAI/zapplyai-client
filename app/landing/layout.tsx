'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components'
import styles from '@/app/landing/page.module.scss'
import TextField from '@mui/material/TextField'
import mainImage from'./../../public/image/landingImageBG.webp'
import Image from 'next/image'
import {Button} from "@/components/Button";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0C0C0C',
      }}
    >
      <Navbar isLandingPage />
      <div style={style.contentContainer}>
        <div style={style.mainImageContainer}>
          <Image style={style.mainImage}
                 src={mainImage}/>
          {/*<div className={styles.image} />*/}
        </div>

        <div style={style.topText}>
          <div>
            <div style={{ fontSize: '3.7vw' }}>
              Unleash the power of Zapply AI
            </div>

            <div
              style={{
                fontSize: '1.2vw',
                color: '#85839F',
                fontWeight: '100',
                zIndex: 100,
                marginTop: '10px'
              }}
            >
              Build web application in 3 minutes just using a text prompt
            </div>
          </div>

          <div>
            
          </div>

          <UpdateMeForm onFormSubmit={() => console.log('form submitted')} />
        </div>

        <Circles />

      </div>
    </div>
  )
}

interface UpdateMeFormProps {
  onFormSubmit: any
}

const UpdateMeForm = ({ onFormSubmit }: UpdateMeFormProps) => {
  return (
    <div style={style.updateMeContainer}>
      <span style={{
        color: '#CFCED9',
        fontSize: '1.5vw'
      }}>We will release soon!</span>
      <hr style={{
        width: '50%',
        marginTop: '15px',
        marginBottom: '15px',
        borderColor: '#5C4ABB'
      }}/>
      <span style={{
        fontSize: '1vw',
        fontWeight: '100',
        color: '#85839F'
      }}>
        Leave you email below and we will let you know when you can try it
        yourself
      </span>

      <TextField fullWidth
                 variant="outlined"
                 label='email'
                 sx={{
                   '& .MuiInputLabel-root': {color: '#CFCED9'},
                   '& .MuiInputLabel-root.Mui-focused': {color: '#CFCED9'},
                   background: '#181818',
                   marginTop: '15px',
                   marginBottom: '15px',
                   border: '#CFCED9',
                   '& .MuiInputBase-root': {color: '#CFCED9'},
                 }}
      />

      <Button label={'Notify me!'}
              action={() => console.log('submitted')}/>
    </div>
  )
}

const Circles = () => {
  return (
    <div style={style.circlesContainer}>
      <div style={{...style.simpleCircle, height: '500px', width: '500px'}}/>
      <div style={{...style.simpleCircle, height: '800px', width: '800px'}}/>
      <div style={{...style.simpleCircle, height: '1150px', width: '1150px'}}/>
    </div>
  )
}

const style = {
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100% - 55px)',
  },
  mainImageContainer: {
    display: 'flex',
    height: '100%',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    overflow: 'hidden'
  },
  mainImage: {
    width: '50vw',
    height: '50vw'
  },
  circlesContainer: {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '82.5vw',
    left: '17.5vw',
    top: '0px',
    overflow: 'hidden'
  },
  simpleCircle: {
    position: 'absolute',
    borderRadius: '100%',
    border: '1px #8B5BEF solid',
    opacity: 0.15,
  },
  topText: {
    height: '100%',
    display: 'flex',
    background: '#0C0C0C',
    width: '35%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: '100',
    padding: '20px'
  },
  updateMeContainer: {
    width: '60%',
    marginRight: 'auto'
  }
}
