import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import { VerticalLeftAlignBox } from '@/components/layouts/CenterBox'

export const AutofillAnimation = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 900px', 'end 550px'],
  })

  // Map scroll progress (0 to 1) to a translation range (e.g., 0 to 200px)
  const transformX = useTransform(scrollYProgress, [0, 1], [0, -300])

  // Apply spring to smoothen the mapped transformation
  const smoothTransformX = useSpring(transformX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const style = {
    imageContainer: {
      position: 'relative',
      zIndex: 5,
      height: '65px',
      marginBottom: '15px',
    },
  }

  return (
    <VerticalLeftAlignBox
      sx={{
        position: 'relative',
        marginLeft: '12vw',
      }}
    >
      <span
        style={{
          ...style.imageContainer,
          filter: 'blur(1.2px)',
          zIndex: -1,
          opacity: 0.75,
          height: '80px',
        }}
      >
        <Box sx={{}}>
          <Image
            src="/image/home/fasterCoding/code_bg_1.png"
            alt="X"
            width={1000}
            height={120}
            style={{
              width: 'auto',
            }}
          />
        </Box>
      </span>

      <span style={{ ...style.imageContainer }}>
        <Box
          style={{
            position: 'relative',
            left: '-70px',
            background: '#0D0D0D',
            border: '1.5px solid transparent',
            borderImage: 'linear-gradient(45deg, #262529, #504D58) 1',
          }}
        >
          <Image
            src="/image/home/fasterCoding/code_snippet_1.png"
            alt="X"
            width={1000}
            height={65}
            style={{
              filter: 'blur(0.5px)',
              width: 'auto',
            }}
          />
        </Box>
      </span>

      <span style={{ ...style.imageContainer, height: '77px' }}>
        <motion.div
          style={{
            position: 'relative',
            left: '32vw',
            x: smoothTransformX,
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1.5px solid transparent',
            borderImage: 'linear-gradient(45deg, #775EFF, #504D58) 1',
            padding: '6px 12px',
            background: '#080808',
          }}
        >
          <Image
            src="/image/home/fasterCoding/code_fill_1.png"
            alt="X"
            width={1000}
            height={65}
            // layout="fill"
            objectFit="cover"
            style={{
              filter: 'blur(0.5px)',
              width: 'auto',
            }}
          />
        </motion.div>
      </span>

      <span style={{ ...style.imageContainer }}>
        <Box
          sx={{
            position: 'relative',
            // top: '-100px',
            left: '-30px',
            background: '#0D0D0D',
            border: '1.5px solid transparent',
            borderImage: 'linear-gradient(45deg, #262529, #504D58) 1',
          }}
        >
          <Image
            src="/image/home/fasterCoding/code_snippet_2.png"
            alt="X"
            width={1000}
            height={65}
            style={{ filter: 'blur(0.5px)', width: 'auto' }}
          />
        </Box>
      </span>

      <span style={{ ...style.imageContainer, height: '77px' }}>
        <motion.div
          ref={ref}
          style={{
            position: 'relative',
            left: '25vw',
            x: smoothTransformX,
            borderRadius: '12px',
            border: '1.5px solid transparent',
            borderImage: 'linear-gradient(45deg, #775EFF, #504D58) 1',
            padding: '6px 12px',
            background: '#080808',
          }}
        >
          <Image
            src="/image/home/fasterCoding/code_fill_2.png"
            alt="X"
            width={1000}
            height={65}
            // layout="fill"
            objectFit="cover"
            style={{
              width: 'auto',
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      </span>

      <Box
        sx={{
          ...style.imageContainer,
          top: '-25px',
          zIndex: '-1',
          height: '175px',
          filter: 'blur(1.2px)',
          marginLeft: '32px',
        }}
      >
        <Image
          src="/image/home/fasterCoding/code_bg_2.png"
          alt="X"
          width={1000}
          height={175}
          style={{ width: 'auto' }}
        />
      </Box>
    </VerticalLeftAlignBox>
  )
}
