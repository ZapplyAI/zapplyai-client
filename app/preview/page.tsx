'use client'

import React, { CSSProperties, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'

export default function Preview() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  const style: { [key: string]: CSSProperties } = {

  }

  return (
      <IframeComponent/>
  )
}

const IframeComponent = () => {
  const [htmlContent, setHtmlContent] = useState('');

  return (
    <div>
      <iframe title="Page preview" srcDoc={htmlContent} width="100%" height="100%"></iframe>
    </div>
  );
};

