'use client'
import React from 'react'

import { WizardIcon } from '@/assets/svgs'
import styles from './Input.module.scss'

// TODO: adjust height based on the length of text

const Input = (): React.ReactNode => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <div className={styles.input} onClick={() => inputRef.current?.focus()}>
      <WizardIcon className={styles.wizard} />
      <textarea
        placeholder={'Tell me more about your idea'}
        rows={1}
        spellCheck={'false'}
        tabIndex={0}
        ref={inputRef}
      />
    </div>
  )
}

export default Input
