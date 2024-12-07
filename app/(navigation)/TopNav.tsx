import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import { Logo } from '@/components'
import Button from '../../components/Button/Button'
import Typography from '@mui/material/Typography'

interface TopNavProps {
  isMobile: boolean
}

export const TopNav = ({ isMobile }: TopNavProps) => {
  return (
    <HorizontalCenterBox
      sx={{ justifyContent: 'space-between', padding: '12px 12vw' }}
    >
      <HorizontalLeftAlignBox>
        <Logo mini height={28} width={28} sx={{marginRight: '1rem'}} />
        <Button variant={'text'} label={'Home'}/>
        <Button variant={'text'} label={'Examples'}/>
        <Button variant={'text'} label={'About'}/>
      </HorizontalLeftAlignBox>

      <HorizontalCenterBox>
      <Typography variant={'body1'}> Hi Andrew</Typography>
      </HorizontalCenterBox>
    </HorizontalCenterBox>
  )
}
