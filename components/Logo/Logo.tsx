import React from 'react'

// import { ZapplyLogo } from '@/assets/svgs'
import GrainIcon from '@mui/icons-material/Grain';
import styles from './Logo.module.scss'

const Logo = (): React.ReactNode => {
  return (
    <div className={styles.logo}>
      <GrainIcon style={style.logoIcon}/>
      <span style={style.logoText}>
        Zapply AI
      </span>
    </div>
  )
}

const style = {
    logoIcon: {
        color: '#775EFF',
        height: '22px'
    },
    logoText: {
        fontSize: '18px'
    }
}


export default Logo
