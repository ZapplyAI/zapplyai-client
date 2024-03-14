import React from 'react'

import { WizardIcon } from '@/assets/svgs'
import styles from './Input.module.scss'

const Input = (): React.ReactNode => {
  return (
    <div className={styles.input}>
      <WizardIcon className={styles.wizard} />
      <input
        type="text"
        autoFocus
        placeholder={'Tell me more about your idea'}
      />
    </div>
  )
}

export default Input
