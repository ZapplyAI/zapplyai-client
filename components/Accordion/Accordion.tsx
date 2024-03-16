'use client'
import React from 'react'
import { clsx } from 'clsx'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import styles from './Accordion.module.scss'

interface AccordionProps {
  items: {
    [key: string]: {
      title: React.ReactNode
      content: React.ReactNode
    }
  }
  className?: string
}

const Accordion = ({ items, className }: AccordionProps): React.ReactNode => {
  const titles = React.useMemo(() => Object.keys(items), [items])

  return (
    <AccordionPrimitive.Root
      className={clsx(styles.accordionRoot, className)}
      type={'multiple'}
    >
      {titles.map(title => (
        <AccordionPrimitive.Item
          className={styles.accordionItem}
          key={title}
          value={title}
        >
          <AccordionPrimitive.Trigger className={'w-full'}>
            {items[title].title}
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className={'w-full'}>
            {items[title].content}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}

export default Accordion
