import Typography from '@mui/material/Typography'
import {
  HorizontalLeftAlignBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import { Box } from '@mui/material'
import ClippedButton from '@/app/(components)/ClippedButton'

export const MainSection = () => {
  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="normal"
      flexDirection="row"
      sx={{
        margin: '0px 12vw',
        border: '1px solid #5E5E5E',
      }}
    >
      <VerticalLeftAlignBox
        sx={{
          padding: '30px',
        }}
      >
        <VerticalLeftAlignBox>
          <Typography
            variant={'h5'}
            sx={{
              background: 'linear-gradient(90deg, #775EFF, #DE3AED, #ED3A93)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              marginBottom: '12px',
            }}
          >
            Being a developer is hard? Let’s make things simple!
          </Typography>

          <Typography
            variant={'h5'}
            sx={{ maxWidth: '90%', marginBottom: '45px' }}
          >
            With Elastic development process becomes a piece-of-cake. Pair
            programming with our AI-assistant will save you 50% of your time
            developing things.
          </Typography>

          {renderLoadingHUD()}
        </VerticalLeftAlignBox>
        Video
      </VerticalLeftAlignBox>

      <VerticalLeftAlignBox sx={{ flex: '1', justifyContent: 'space-between' }}>
        <VerticalCenterBox
          sx={{ border: '1px solid #5E5E5E', width: '200px', padding: '24px' }}
        >
          <VerticalCenterBox sx={{ marginBottom: '22px' }}>
            <ClippedButton sx={{ width: '145px' }}>
              <Typography variant={'button'}>Free Trial</Typography>
            </ClippedButton>
            <Typography variant={'caption'}>No card required</Typography>
          </VerticalCenterBox>

          <ClippedButton sx={{ width: '145px' }} filled>
            <Typography variant={'button'}>Learn more</Typography>
          </ClippedButton>
        </VerticalCenterBox>

        <VerticalCenterBox
          sx={{ border: '1px solid #5E5E5E', width: '200px', padding: '24px' }}
        >
          <Typography variant={'body1'} sx={{ fontSize: '1.1rem' }}>
            Questions?
          </Typography>
          <Typography
            variant={'body1'}
            sx={{ color: '#AEAEAE', fontSize: '1.1rem' }}
          >
            Email us
          </Typography>
          <ClippedButton sx={{ width: '145px', marginTop: '12px' }}>
            <Typography variant={'button'}>Contact</Typography>
          </ClippedButton>
        </VerticalCenterBox>
      </VerticalLeftAlignBox>
    </Box>
  )
}

const renderLoadingHUD = () => {
  return (
    <VerticalLeftAlignBox>
      <Typography variant={'body2'} sx={{ marginBottom: '5px' }}>
        loading elastic IDE ...
      </Typography>
      <span
        style={{
          position: 'relative',
          width: '200px',
          height: '6px',
          background: '#222222',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '120px',
            height: '6px',
            background: '#E5E5E5',
          }}
        />
      </span>
    </VerticalLeftAlignBox>
  )
}
