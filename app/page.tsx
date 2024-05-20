'use client'

import React, { CSSProperties } from 'react'
import { Logo, Navbar } from '@/components'
import TextField from '@mui/material/TextField'
import landingGradient from './../public/image/home/landingGradient_BG.png'
import topOfferPictures from './../public/image/home/topOfferPictures.png'
import screensExamples from './../public/image/home/screensExamples.png'
import doubleScreenExample from './../public/image/home/doubleScreenExample.png'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Container, Grid, Stack } from '@mui/material'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { useForm, ValidationError } from '@formspree/react'
import Typography from '@mui/material/Typography'
import Marquee from 'react-fast-marquee'

import FaceIcon from '@mui/icons-material/Face'
import Face2Icon from '@mui/icons-material/Face2'
import Face4Icon from '@mui/icons-material/Face4'

export default function Home() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  const style: { [key: string]: CSSProperties } = {
    limitWidthContainer: {
      position: 'relative',
      zIndex: 1,
      width: '95vw',
      margin: 'auto',
    },
    radialGradientBackground: {
      position: 'absolute',
      zIndex: 0,
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
    },
    topOfferContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      alignItems: 'center',
      paddingTop: '100px',
    },
    topOfferLeft: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    topOfferPictures: {
      width: '42vw',
      height: 'fit-content',
    },
    topActionButtons: {
      paddingLeft: '12px',
      marginTop: '48px',
    },
    topActionButtonContained: {
      backgroundImage: 'linear-gradient(to right, #47B2FF 0%, #A347FF 100%)',
      padding: '15px 25px',
      fontWeight: '400',
      fontSize: '15px',
      color: '#fff',
    },
    topActionButtonOutlined: {
      marginLeft: '36px',
      background: 'none',
      border: '1px white solid',
      padding: '15px 25px',
      fontWeight: '300',
      fontSize: '15px',
      color: '#fff',
    },
    marqueeItem: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      maxWidth: '450px',
      minWidth: '100px',
      // height: '200px',
      padding: '12px',
      margin: '22px',
      borderRadius: '7px',
      // border: '1px solid #676F8B',
    },
    marqueeItemIcon: {
      height: '22px',
      margin: '12px',
      color: '#D0D0D0',
    },
    secondSectionRight: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    gridItem: {
      marginLeft: '12px',
      marginBottom: '12px',
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid #D0D0D0',
      width: 'fit-content',
    },

    thirdSectionLeft: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-left',
    },
    thirdSectionPictures: {
      width: '53vw',
      marginLeft: '22px',
      height: 'fit-content',
    },
    zapplyHelpfulStep: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    helpfulTextRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '26px',
      marginRight: '26px',
    },
  }

  return (
    <React.Fragment>
      <Navbar isMobile={isMobile} isLandingPage />

      {/* ----------------------------------------- */}
      {/* -------------- TOP SECTION -------------- */}
      {/* ----------------------------------------- */}
      <div style={{ ...style.limitWidthContainer, ...style.topOfferContainer }}>
        <div style={style.topOfferLeft}>
          <Typography variant="h1_gradient">
            Discover new way to build web apps
          </Typography>
          <Typography
            variant="h5"
            style={{
              marginTop: '50px',
              paddingRight: '27%',
              paddingLeft: '12px',
            }}
          >
            Cloud based AI developer that turns your web-application ideas into
            a fully functioning and deployed web-app in minutes. Allowing you to
            focus on more important things for your business
          </Typography>
          <div style={style.topActionButtons}>
            <Button
              label={'Sign up for newsletter'}
              variant={'contained'}
              sx={style.topActionButtonContained}
            />
            <Button
              label={'Talk to us'}
              variant={'outlined'}
              sx={style.topActionButtonOutlined}
            />
          </div>
        </div>

        <Image
          style={style.topOfferPictures}
          src={topOfferPictures}
          alt={'ZapplyAI.io'}
        />
      </div>

      <Image
        style={style.radialGradientBackground}
        src={landingGradient}
        alt={'ZapplyAI.io examples'}
      />

      <Marquee style={{ marginTop: '22px' }}>
        <div style={style.marqueeItem}>
          <FaceIcon style={style.marqueeItemIcon} />
          <Typography variant="h6">
            Build me an e-commerce store to sell bikes. It must have a weekly
            bike giveaway to one person on the main page!
          </Typography>
        </div>

        <div style={style.marqueeItem}>
          <Face2Icon style={style.marqueeItemIcon} />
          <Typography variant="h6">
            I want a portfolio page to showcase my artwork to potential
            customers or employees.
          </Typography>
        </div>

        <div style={style.marqueeItem}>
          <Face4Icon style={style.marqueeItemIcon} />
          <Typography variant="h6">
            Our company sells SaaS for coffee shops. Our product allows coffee
            lovers to purchase coffee online before coming to the shop. Build us
            a landing page please
          </Typography>
        </div>

        <div style={style.marqueeItem}>
          <Face2Icon style={style.marqueeItemIcon} />
          <Typography variant="h6">
            Can you build a task management app that would help our police team
            to cooperate more effectively?
          </Typography>
        </div>

        <div style={style.marqueeItem}>
          <Face4Icon style={style.marqueeItemIcon} />
          <Typography variant="h6">
            Our landing page looks too boring and pale. Please edit it and make
            the design more sharp and bright
          </Typography>
        </div>
      </Marquee>

      <hr
        style={{ borderColor: '#22202c', opacity: '0.7', marginTop: '50px' }}
      />

      {/* ------------------------------------------- */}
      {/* ------------- SECOND SECTION -------------- */}
      {/* ------------------------------------------- */}
      <div style={{ ...style.limitWidthContainer, ...style.topOfferContainer }}>
        <Image
          style={style.topOfferPictures}
          src={screensExamples}
          alt={'Example images'}
        />

        <div style={style.secondSectionRight}>
          <Typography variant="h2_gradient" style={{ textAlign: 'right' }}>
            Explore full potential of Zapply UI
          </Typography>
          <Typography
            variant="h5"
            style={{
              marginTop: '50px',
              paddingLeft: '27%',
              paddingRight: '12px',
              textAlign: 'right',
            }}
          >
            Cloud based AI developer that turns your web-application ideas into
            a fully functioning and deployed web-app in minutes. Allowing you to
            focus on more important things for your business
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              width: '75%',
              marginLeft: 'auto',
              marginTop: '32px',
              // paddingLeft: '40%'
            }}
          >
            <div style={style.gridItem}>
              <Typography variant={'h6'} style={{ whiteSpace: 'nowrap' }}>
                Style settings
              </Typography>
            </div>
            <div style={style.gridItem}>
              <Typography variant={'h6'} style={{ whiteSpace: 'nowrap' }}>
                Multiple apps
              </Typography>
            </div>
            <div style={style.gridItem}>
              <Typography variant={'h6'} style={{ whiteSpace: 'nowrap' }}>
                Visual editing
              </Typography>
            </div>
            <div style={style.gridItem}>
              <Typography variant={'h6'} style={{ whiteSpace: 'nowrap' }}>
                Infinite pages
              </Typography>
            </div>
            <div style={style.gridItem}>
              <Typography variant={'h6'} style={{ whiteSpace: 'nowrap' }}>
                Mobile-ready
              </Typography>
            </div>
            <div style={style.gridItem}>
              <Typography variant={'h6'} style={{ whiteSpace: 'nowrap' }}>
                Instant deployment
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <hr
        style={{ borderColor: '#22202c', opacity: '0.7', marginTop: '70px' }}
      />

      {/* ------------------------------------------- */}
      {/* ------------- SECOND SECTION -------------- */}
      {/* ------------------------------------------- */}
      <div style={{ ...style.limitWidthContainer, ...style.topOfferContainer }}>
        <div style={style.thirdSectionLeft}>
          <Typography variant="h2_gradient">
            Relax. Zapply will do everything for you
          </Typography>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: '22px',
            }}
          >
            <div style={{ ...style.zapplyHelpfulStep, marginBottom: '22px' }}>
              <Typography
                variant="h3_empty"
                style={{ WebkitTextStroke: '1px #775EFF' }}
              >
                01
              </Typography>
              <div style={style.helpfulTextRight}>
                <Typography variant="h3_empty">Design</Typography>
                <Typography variant="h6" style={{ marginTop: '12px' }}>
                  Zapply will be your personal web-designer. It builds your UI
                  and UX to provide best possible experience for your web=app
                  visitors. Zapply would always try to make the best for you.
                  Just ask and it will edit the design asking your for
                  clarifications.
                </Typography>
              </div>
            </div>

            <div style={{ ...style.zapplyHelpfulStep, marginBottom: '22px' }}>
              <Typography
                variant="h3_empty"
                style={{ WebkitTextStroke: '1px #775EFF' }}
              >
                02
              </Typography>
              <div style={style.helpfulTextRight}>
                <Typography variant="h3_empty">Development</Typography>
                <Typography variant="h6" style={{ marginTop: '12px' }}>
                  Zapply is the most experiences backend and frontend engineer
                  you can ever find. It is trained to do web-development for any
                  purposes. And it has a lot of pre-trained materials and
                  templates that it can use to build the website that it’s
                  customers would love.
                </Typography>
              </div>
            </div>

            <div style={style.zapplyHelpfulStep}>
              <Typography
                variant="h3_empty"
                style={{ WebkitTextStroke: '1px #775EFF' }}
              >
                03
              </Typography>
              <div style={style.helpfulTextRight}>
                <Typography variant="h3_empty">Deployment</Typography>
                <Typography variant="h6" style={{ marginTop: '12px' }}>
                  Instantly deploy your web-application when you are ready. No
                  more headaches trying to set-up your website’s database,
                  server, and have many different things that Zapply will take
                  care itself for you!
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <Image
          style={style.thirdSectionPictures}
          src={doubleScreenExample}
          alt={'Example images'}
        />
      </div>

      <footer
        style={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderTop: 'solid 1px #322c55',
          marginTop: '70px',
          padding: '22px 48px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '48px' }}>
          <div style={{ height: '48px' }}>
            <Logo />
          </div>
          <Typography variant="h6">
            © 2024 ZapplyAI Inc. All rights reserved.
          </Typography>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '48px' }}>
            <Typography variant="h4" style={{ color: '#775EFF' }}>
              Sections
            </Typography>
          </div>
          <Typography variant="h6">Section 1, Section 2, Section 3</Typography>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            right: '48px',
          }}
        >
          <div style={{ height: '48px' }}>
            <Typography variant="h4" style={{ color: '#775EFF' }}>
              Contacts
            </Typography>
          </div>
          <Typography variant="h6">support@zapplyai.io</Typography>
        </div>
      </footer>
    </React.Fragment>
  )
}
