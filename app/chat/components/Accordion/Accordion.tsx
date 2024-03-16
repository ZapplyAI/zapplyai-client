import React from 'react'

import { Accordion as _Accordion } from '@/components'
import styles from './Accordion.module.scss'

interface AccordionProps {
  type: 'frontend' | 'backend'
}

const Accordion = ({ type }: AccordionProps): React.ReactNode => {
  return (
    <_Accordion
      className={styles.accordionContainer}
      items={{
        navigation: {
          title: (
            <div className={styles.triggerContainer}>
              <h3>Navigation menu</h3>
              <span>Top navigation bar</span>
            </div>
          ),
          content: (
            <div className={styles.accordionContent}>
              <ul>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
              </ul>
            </div>
          ),
        },
        settings: {
          title: (
            <div className={styles.triggerContainer}>
              <h3>Settings</h3>
              <span>Settings section</span>
            </div>
          ),
          content: (
            <div className={styles.accordionContent}>
              <ul>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
                <li>item</li>
              </ul>
            </div>
          ),
        },
      }}
    />
  )
}

export default Accordion
