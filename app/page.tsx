'use client'

import React, { CSSProperties, useRef, Suspense } from 'react'
import { Input, Logo, Navbar } from '@/components'
import landingGradient from './../public/image/home/landingGradient_BG.png'
import landingGradient_Mobile from './../public/image/home/landingGradient_BG_Mobile.png'
import topOfferPictures from './../public/image/home/topOfferPictures.png'
import topOfferPictures_Mobile from './../public/image/home/topOfferPictures_Mobile.png'
import screensExamples from './../public/image/home/screensExamples.png'
import doubleScreenExample from './../public/image/home/doubleScreenExample.png'
import tabletPhone_horizontal from './../public/image/home/tablet&phone_horizontal.png'

import { useForm, ValidationError } from '@formspree/react'

import Image from 'next/image'
import { Button } from '@/components/Button'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import Typography from '@mui/material/Typography'
import Marquee from 'react-fast-marquee'
import CircularProgress from '@mui/material/CircularProgress'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import FaceIcon from '@mui/icons-material/Face'
import Face2Icon from '@mui/icons-material/Face2'
import Face4Icon from '@mui/icons-material/Face4'
import EmailIcon from '@mui/icons-material/Email'
import { Box, Stack } from '@mui/material'
import { get } from 'lodash'
import { useRouter } from 'next/navigation'
import LavaShaderSphere from '@/components/3D/LavaShaderSphere'
import RotatingRedSphere from '@/components/3D/RotatingRedSphere'

const RotatingModel = React.lazy(() => import('@/components/3D/RotatingModel'))

export default function HomePage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const router = useRouter()

  const [formState, handleSubmit] = useForm('xvoevzav')
  const newsletterRef = useRef(null)

  const handleFormSubmit = (prompt: string) => {
    // const emailField = document.getElementById('email') as HTMLInputElement
    // const email = emailField.value.trim()

    console.log('email : ', prompt)

    if (prompt !== '') {
      handleSubmit({ prompt })
    }
  }

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
      height: 'fit-content',
      width: '100vw',
    },
    topOfferContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      alignItems: 'center',
      paddingTop: isMobile ? '50px' : '100px',
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
      paddingLeft: isMobile ? 0 : '12px',
      marginTop: isMobile ? '36px' : '48px',
    },
    topActionButtonContained: {
      backgroundImage: 'linear-gradient(to right, #47B2FF 0%, #A347FF 100%)',
      padding: isMobile ? '8px 18px' : '15px 25px',
      fontWeight: '400',
      fontSize: isMobile ? '14px' : '15px',
      color: '#fff',
    },
    topActionButtonOutlined: {
      marginLeft: isMobile ? '0' : '36px',
      background: 'none',
      border: '1px white solid',
      padding: isMobile ? '8px 18px' : '15px 25px',
      fontWeight: '300',
      fontSize: isMobile ? '14px' : '15px',
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
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },

    thirdSectionLeft: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-left',
    },
    thirdSectionPictures: {
      width: isMobile ? '95vw' : '50vw',
      marginLeft: isMobile ? 0 : '22px',
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
    <div style={{ height: '100%', width: '100%', background: '#000' }}>
      <Navbar isMobile={isMobile} isLandingPage />

      <div style={{ height: '100vh', width: '100vw' }}>
        <RotatingRedSphere />
      </div>

      {/*<Canvas>*/}
      {/*  <Suspense fallback={null}>*/}
      {/*<RotatingModel />*/}
      {/*<Environment preset="sunset" background />*/}
      {/*</Suspense>*/}
      {/*</Canvas>*/}

      {/* ----------------------------------------- */}
      {/* -------------- TOP SECTION -------------- */}
      {/* ----------------------------------------- */}
      <div
        style={{
          ...style.limitWidthContainer,
          ...style.topOfferContainer,
          paddingTop: '80px',
        }}
      >
        <div style={style.topOfferLeft}>
          <Typography
            variant={isMobile ? 'h2_gradient_mobile' : ('h2_gradient' as any)}
            style={{
              fontSize: isMobile ? '5vw' : '2.2vw',
              lineHeight: isMobile ? '5vw' : '2.2vw',
              marginBottom: '22px',
              backgroundImage:
                'linear-gradient(135deg, #A348FF 0%, #48B2FF 100%)',
            }}
          >
            no knowledge in web development ?
          </Typography>
          <Typography
            variant={isMobile ? 'h1_gradient_mobile' : ('h1_gradient' as any)}
          >
            Discover new way to build web apps
          </Typography>
          <Typography
            variant={isMobile ? 'h5_mobile' : ('h5' as any)}
            style={{
              marginTop: isMobile ? '22px' : '50px',
              paddingRight: isMobile ? 0 : '27%',
              paddingLeft: isMobile ? 0 : '12px',
            }}
          >
            Cloud based AI developer that turns your web-application ideas into
            a fully functioning and deployed web-app in minutes. Allowing you to
            focus on more important things for your business
          </Typography>

          {isMobile && (
            <Image
              style={{
                ...style.topOfferPictures,
                width: '95vw',
                marginTop: '36px',
              }}
              src={topOfferPictures_Mobile}
              alt={'ZapplyAI.io'}
            />
          )}

          <div
            style={
              isMobile
                ? {
                    ...style.topActionButtons,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                  }
                : style.topActionButtons
            }
          >
            <Button
              action={() => {
                // @ts-ignore
                newsletterRef.current.scrollIntoView({ behavior: 'smooth' })
              }}
              label={'Sign up for newsletter'}
              variant={'contained'}
              sx={style.topActionButtonContained}
            />
            <Button
              action={() => router.push('/talkToUs')}
              label={'Talk to us'}
              variant={'outlined'}
              sx={
                isMobile
                  ? {
                      ...style.topActionButtonOutlined,
                      border: '1px solid',
                      borderImageSlice: 1,
                      borderImageSource:
                        'linear-gradient(to right, #A348FF 0%, #48B2FF 100%)',
                      borderRadius: '8px',
                    }
                  : style.topActionButtonOutlined
              }
            />
          </div>
        </div>

        {!isMobile && (
          <Image
            style={style.topOfferPictures}
            src={topOfferPictures}
            alt={'ZapplyAI.io'}
          />
        )}
      </div>

      <Image
        style={style.radialGradientBackground}
        src={isMobile ? landingGradient_Mobile : landingGradient}
        alt={'ZapplyAI.io examples'}
      />

      <Marquee style={{ marginTop: isMobile ? '0px' : '22px' }}>
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
        style={{ borderColor: '#22202c', opacity: '0.7', marginTop: '12 px' }}
      />

      {/* ------------------------------------------- */}
      {/* ------------- SECOND SECTION -------------- */}
      {/* ------------------------------------------- */}
      <div style={{ ...style.limitWidthContainer, ...style.topOfferContainer }}>
        {!isMobile && (
          <Image
            style={style.topOfferPictures}
            src={screensExamples}
            alt={'Example images'}
          />
        )}

        <div style={style.secondSectionRight}>
          <Typography
            variant={isMobile ? 'h1_gradient_mobile' : ('h2_gradient' as any)}
            style={{ textAlign: isMobile ? 'left' : 'right' }}
          >
            Explore potential of Zapply UI
          </Typography>
          <Typography
            variant={isMobile ? 'h5_mobile' : ('h5' as any)}
            style={{
              marginTop: isMobile ? '22px' : '50px',
              paddingLeft: isMobile ? '0' : '27%',
              paddingRight: isMobile ? '0' : '12px',
              textAlign: isMobile ? 'left' : 'right',
            }}
          >
            Zapply UI is designed to give the most smooth experience to less
            technical users. Chatting with Zapply AI is as simple as chatting to
            a friend. It will understand your idea, and ask additional questions
            in order to produce the best result for your needs.
          </Typography>

          {!isMobile && <PropertiesCards isMobile={false} />}

          {isMobile && (
            <React.Fragment>
              <div
                style={{
                  position: 'relative',
                  height: '75vh',
                  width: '95vw',
                  overflow: 'hidden',
                  marginTop: '36px',
                  left: '0',
                  top: 0,
                }}
                // ref={containerRef}
              >
                <Image
                  style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    height: '100%',
                    width: 'fit-content',
                  }}
                  src={tabletPhone_horizontal}
                  alt={'Example images'}
                />
              </div>

              {/*<div style={{ height: '400vw' }}></div>*/}
            </React.Fragment>
          )}
        </div>
      </div>

      <hr
        style={{ borderColor: '#22202c', opacity: '0.7', marginTop: '50px' }}
      />

      {/* ------------------------------------------- */}
      {/* -------------- THIRD SECTION -------------- */}
      {/* ------------------------------------------- */}
      <div style={{ ...style.limitWidthContainer, ...style.topOfferContainer }}>
        <div style={style.thirdSectionLeft}>
          <Typography
            variant={isMobile ? 'h1_gradient_mobile' : ('h2_gradient' as any)}
          >
            Relax. Sit back. Zapply will do everything for you
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
                variant={'h3_empty' as any}
                style={{ WebkitTextStroke: '1px #775EFF' }}
              >
                01
              </Typography>
              <div style={style.helpfulTextRight}>
                <Typography variant={'h3_empty' as any}>Design</Typography>
                <Typography variant="h6" style={{ marginTop: '12px' }}>
                  Zapply will be your personal web-designer. It builds your UI
                  and UX to provide best experience for your app&apos;s users.
                  Zapply always tries to deliver the best experience for you.
                  After your web-app is built you can still ask Zapply to edit
                  it in any way you like.
                </Typography>
              </div>
            </div>

            <div style={{ ...style.zapplyHelpfulStep, marginBottom: '22px' }}>
              <Typography
                variant={'h3_empty' as any}
                style={{ WebkitTextStroke: '1px #775EFF' }}
              >
                02
              </Typography>
              <div style={style.helpfulTextRight}>
                <Typography variant={'h3_empty' as any}>Development</Typography>
                <Typography variant="h6" style={{ marginTop: '12px' }}>
                  Zapply is the most experienced software engineer you can ever
                  find. We trained Zapply especially for web development. It
                  went through intensive training building everything from
                  e-commerce to landing pages. Zapply really knows what your
                  users want!
                </Typography>
              </div>
            </div>

            <div style={style.zapplyHelpfulStep}>
              <Typography
                variant={'h3_empty' as any}
                style={{ WebkitTextStroke: '1px #775EFF' }}
              >
                03
              </Typography>
              <div style={style.helpfulTextRight}>
                <Typography variant={'h3_empty' as any}>Deployment</Typography>
                <Typography variant="h6" style={{ marginTop: '12px' }}>
                  Instantly deploy your web-app when you are ready. No more
                  headaches trying to set-up everything yourself. Zapply is good
                  at taking care of its users from start to finish!
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

      <Stack
        ref={newsletterRef}
        direction={isMobile ? 'column' : 'row'}
        spacing={isMobile ? 6 : 4}
        style={{
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'center',
          alignItems: 'flex-start',
          borderTop: 'solid 1px #322c55',
          marginTop: isMobile ? '50px' : '100px',
          padding: '48px 48px',
        }}
      >
        {isMobile && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <Typography
                variant={'h2_gradient' as any}
                style={{ fontSize: '36px', lineHeight: '36px' }}
              >
                Subscribe to newsletter
              </Typography>
            </div>
            <Typography variant="h6">
              Stay up to date with our updates. Be the first one to use Zapply
            </Typography>
            {!get(formState, 'succeeded', false) ? (
              <Input
                // id="email"
                // type="email"
                onSubmit={handleFormSubmit}
                placeholder="example@email.com"
                fullWidth={isMobile}
                sx={{ margin: '10px 0px 0px 0px' }}
              />
            ) : (
              <div>Thank you</div>
            )}

            <ValidationError
              prefix="Email"
              field="email"
              errors={formState.errors}
            />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: isMobile ? 0 : '100px',
          }}
        >
          <div>
            <Logo
              sx={{ height: '50px', marginBottom: isMobile ? '12px' : '22px' }}
              height={50}
              width={150}
            />
          </div>
          <Typography variant="h6">
            © 2024 ZapplyAI Inc. All rights reserved.
          </Typography>
        </div>

        {!isMobile && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginRight: '100px',
            }}
          >
            <div style={{ marginBottom: '22px' }}>
              <Typography
                variant={'h2_gradient' as any}
                style={{
                  color: '#D0D0D0',
                  fontSize: '36px',
                  lineHeight: '36px',
                }}
              >
                Subscribe to newsletter
              </Typography>
            </div>
            <Typography variant="h6">
              Stay up to date with our updates. Be the first one to use Zapply
            </Typography>

            {!get(formState, 'succeeded', false) ? (
              <Input
                // id="email"
                // type="email"
                onSubmit={handleFormSubmit}
                placeholder="example@email.com"
                fullWidth={isMobile}
                sx={{ margin: '10px 0px 0px 0px' }}
              />
            ) : (
              <div>Thank you</div>
            )}
            <ValidationError
              prefix="Email"
              field="email"
              errors={formState.errors}
            />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: isMobile ? '12px' : '22px' }}>
            <Typography variant="h4" style={{ color: '#775EFF' }}>
              Contacts
            </Typography>
          </div>
          <div style={{ display: 'flex' }}>
            <EmailIcon style={{ color: '#D0D0D0', marginRight: '12px' }} />
            <Typography variant="h6">andrii@zapplyai.io</Typography>
          </div>
        </div>
      </Stack>
    </div>
  )
}

const PropertiesCards = ({ isMobile }: { isMobile: boolean }) => {
  const style: { [key: string]: CSSProperties } = {
    gridItem: {
      marginLeft: '12px',
      marginBottom: '12px',
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid #D0D0D0',
      width: 'fit-content',
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'flex-end',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        width: isMobile ? 'auto' : '75%',
        marginLeft: 'auto',
        marginTop: isMobile ? '0px' : '32px',
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
  )
}
