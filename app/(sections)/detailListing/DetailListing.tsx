import React from 'react'
import { Box } from '@mui/material'
import {
  HorizontalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import StickyBox from 'react-sticky-box'
import Typography from '@mui/material/Typography'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DecodeAnimation from 'react-decode-animation'

export const DetailListing = ({ position }: { position: number }) => {
  return (
    <Box
      id="detail-listing-component"
      sx={{
        position: 'absolute',
        right: '12vw',
        top: 0,
        border: '1px solid #5E5E5E',
        borderBottom: 'none',
        height: '100%',
        width: '300px',
        paddingTop: '150px',
        paddingBottom: '370px',
      }}
    >
      <StickyBox offsetTop={200} offsetBottom={200}>
        {renderAdvantages(position)}
      </StickyBox>
    </Box>
  )
}

const renderAdvantages = (currentString: any) => {
  const style = {
    advantageItem: {
      width: '298px',
      border: '#343434 1px solid',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '10px 15px',
      textTransform: 'uppercase',
      marginBottom: '-1px',
    },
    label: {
      fontWeight: '200',
      color: '#E5E5E5',
      width: '100%',
      textAlign: 'right',
    },
    labelCTA: {
      fontWeight: '200',
      width: '100%',
      textAlign: 'right',
      background:
        'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3ABA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
    },
  }
  return (
    <VerticalLeftAlignBox
      sx={{
        justifyContent: 'end',
        position: 'absolute',
        right: '0',
        top: '0',
      }}
    >
      <Box>
        <Box sx={style.advantageItem}>
          <Typography variant={'body1' as any} sx={style.label}>
            <DecodeAnimation
              key={currentString} // Ensure a unique key for each currentString
              customCharacters="ΑΒΓΔΕΖΗΘΙΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω"
              autoplay
              interval={25}
              text={
                currentString === 1
                  ? 'Flexible Auto-Completes'
                  : '100% project coverage'
              }
            />
          </Typography>
        </Box>
        <Box sx={style.advantageItem}>
          <Typography variant={'body1' as any} sx={style.label}>
            <DecodeAnimation
              key={currentString} // Ensure a unique key for each currentString
              customCharacters="ΑΒΓΔΕΖΗΘΙΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω"
              autoplay
              interval={25}
              text={currentString === 1 ? 'Just press tab' : 'Always searching'}
            />
          </Typography>
        </Box>
        <Box sx={style.advantageItem}>
          <Typography variant={'body1' as any} sx={style.label}>
            <DecodeAnimation
              key={currentString} // Ensure a unique key for each currentString
              customCharacters="ΑΒΓΔΕΖΗΘΙΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω"
              autoplay
              interval={25}
              text={
                currentString === 1
                  ? 'Gives you ideas!'
                  : 'Knows more then code'
              }
            />
          </Typography>
        </Box>
      </Box>

      <HorizontalCenterBox sx={{ ...style.advantageItem, marginTop: '90px' }}>
        <Typography variant={'body1' as any} sx={{ ...style.labelCTA, flex: 1 }}>
          <DecodeAnimation
            allowedCharacters="symbols"
            key={currentString} // Ensure a unique key for each currentString
            customCharacters="ΑΒΓΔΕΖΗΘΙΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω"
            autoplay
            interval={25}
            text={
              currentString === 1
                ? 'check autocomplete examples'
                : 'check how semantics work'
            }
          />
        </Typography>
        <ArrowCircleRightIcon
          sx={{
            width: '22px',
            height: '22px',
            color: '#C932A1',
            marginLeft: '12px',
          }}
        />
      </HorizontalCenterBox>
    </VerticalLeftAlignBox>
  )
}
