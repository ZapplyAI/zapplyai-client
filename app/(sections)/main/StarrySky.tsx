'use client'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import styled from 'styled-components'
import React from 'react'

const StarrySky = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particleConfig = useMemo(
    () => ({
      fullScreen: false,
      particles: {
        number: {
          value: 190,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#ffffff',
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: { min: 0.2, max: 1 },
          random: true,
          animation: {
            enable: true,
            speed: 0.7,
            startValue: 'random',
            sync: false,
          },
        },
        size: {
          value: { min: 0.3, max: 2.7 },
          random: true,
          animation: {
            enable: true,
            speed: 1.2,
            startValue: 'random',
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          // trail: {
          //   enable: true,
          //   length: 10,
          //   fillColor: '#ffffff'
          // },
          // noise: {
          //   enable: true,
          //   clamp: true,
          //   generator: 'name'
          // },
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: true,
          // attract: {
          //   enable: true,
          //   rotateX: 600,
          //   rotateY: 600,
          // },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onHover: {
            enable: true,
            mode: 'bubble',
          },
          onClick: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 4.2,
            duration: 5,
            // opacity: 0.5,
            // speed: 1,
          },
          repulse: {
            distance: 100,
            duration: 1.8,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    }),
    []
  )

  if (init) {
    return <FullSizeParticles options={particleConfig as any} />
  }

  return <></>
}

const FullSizeParticles = styled(Particles)`
  position: absolute;
  z-index: -100;
  width: 100%;
  height: 100%;
`

const StarrySkyMemo = React.memo(() => <StarrySky />)

export default StarrySkyMemo
