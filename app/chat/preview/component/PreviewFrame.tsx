// src/PreviewFrame.js
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
// @ts-ignore
import * as d3 from 'd3'
import { IconButton, Toolbar } from '@mui/material'

import {
  UilLaptop,
  UilTablet,
  UilMobileAndroid,
  // @ts-ignore
} from '@iconscout/react-unicons'

interface PreviewFrameProps {
  isMobile?: boolean
  htmlContent?: string
}

// const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Test Frame</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 20px;
//             background-color: #f0f0f0;
//           }
//           .container {
//             height: 100vh;
//             width: 100vw;
//             background: #fff;
//             padding: 20px;
//             box-shadow: 0 0 10px rgba(0,0,0,0.1);
//             border-radius: 8px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>Hello, World!</h1>
//           <p>This is a simple HTML and CSS example inside an iframe.</p>
//         </div>
//       </body>
//     </html>
//   `

const PreviewFrame = ({
  isMobile = false,
  htmlContent = `<div></div>`,
}: PreviewFrameProps) => {
  console.log('PreviewFrameProps htmlContent', htmlContent)
  const [previewSize, setPreviewSize] = useState('smartphone')

  const style: { [key: string]: CSSProperties } = {
    toolbar: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#201F29',
      opacity: '0.8',
      width: 'calc(100% - 16px)',
      minHeight: 0,
      padding: '8px 12px',
      margin: '8px 8px',
      borderRadius: '8px',
    },
    sizeIcons: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconButton: {
      padding: '6px',
      margin: '0px 5px',
    },
    icon: {
      height: isMobile ? '35px' : '20px',
      width: 'auto',
      color: '#858585',
      padding: '0px',
    },
  }

  const getPreviewHeight = () => {
    if (previewSize === 'laptop') {
      return 1080
    } else if (previewSize === 'tablet') {
      return 1200
    } else if (previewSize === 'smartphone') {
      return 820
    }
  }

  const getPreviewWidth = () => {
    if (previewSize === 'laptop') {
      return 1920
    } else if (previewSize === 'tablet') {
      return 1000
    } else if (previewSize === 'smartphone') {
      return 400
    }
  }

  const svgRef = useRef()

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Clear any existing content in the SVG
    svg.selectAll('*').remove()

    const g = svg.append('g')

    // Set up zoom and drag behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 3]) // Adjust the scale extent as needed
      .on('zoom', (event: any) => {
        g.attr('transform', event.transform)
      })

    const initialScale = 0.5 // Adjust the initial scale as needed
    const initialTranslate = [200, 200] // Adjust the initial translation as needed

    svg.call(zoom)

    // Apply the initial zoom transform
    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(...initialTranslate).scale(initialScale)
    )

    const foreignObject = g
      .append('foreignObject')
      .attr('width', getPreviewWidth())
      .attr('height', getPreviewHeight())

    const div = foreignObject
      .append('xhtml:div')
      .style('width', '100%')
      .style('height', '100%')
      .style('border', '1px solid black')
      .style('overflow', 'hidden') // Ensure no overflow

    div
      .append('iframe')
      .attr('srcdoc', htmlContent)
      .style('width', '100%')
      .style('height', '100%')
      .style('border', 'none')
  }, [previewSize])

  return (
    <React.Fragment>
      <Toolbar style={style.toolbar}>
        <div style={style.sizeIcons}>
          <IconButton
            style={style.iconButton}
            onClick={() => {
              setPreviewSize('smartphone')
            }}
          >
            <UilMobileAndroid style={style.icon} />
          </IconButton>
          <IconButton
            style={style.iconButton}
            onClick={() => {
              setPreviewSize('tablet')
            }}
          >
            <UilTablet style={style.icon} />
          </IconButton>
          <IconButton
            style={style.iconButton}
            onClick={() => {
              setPreviewSize('laptop')
            }}
          >
            <UilLaptop style={style.icon} />
          </IconButton>
        </div>
      </Toolbar>

      <svg ref={svgRef as any} width="100%" height="100%">
        {/* iframe content will be here */}
      </svg>
    </React.Fragment>
  )
}

export default PreviewFrame
