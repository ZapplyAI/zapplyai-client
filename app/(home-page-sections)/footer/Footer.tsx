'use client'
import React from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import DecorRect from '@/app/(components)/DecorRect'
import Link from 'next/link'

interface FooterProps {
  isMobile?: boolean
}

export const Footer = ({ isMobile = false }: FooterProps) => {
  const theme = useTheme()

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#features' },
        { name: 'Pricing', url: '#pricing' },
        // { name: 'Integrations', url: '#' },
        // { name: 'Changelog', url: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', url: '/docs' },
        // { name: 'Tutorials', url: '#' },
        // { name: 'Blog', url: '#' },
        // { name: 'Community', url: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        // { name: 'About Us', url: '#' },
        // { name: 'Careers', url: '#' },
        { name: 'Contact', url: 'mailto:support@elasticapp.io' },
        // { name: 'Legal', url: '#' },
      ],
    },
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        padding: isMobile ? '60px 20px' : '80px 0 40px',
        background: 'linear-gradient(180deg, #0A090E 0%, #13121A 100%)',
        borderTop: '1px solid rgba(119, 94, 255, 0.3)',
      }}
    >
      <Box
        sx={{
          margin: `0px ${isMobile ? theme.customSpacing?.sides.mobile : theme.customSpacing?.sides.desktop}`,
          position: 'relative',
        }}
      >
        <Grid container spacing={isMobile ? 4 : 8}>
          <Grid item xs={12} md={4}>
            <Box sx={{ marginBottom: '30px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Image
                  src="/assets/svgs/LISA MARK EXP.svg"
                  alt="Elastic Copilot Logo"
                  width={40}
                  height={40}
                />
                <Typography
                  variant={'h3' as any}
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginLeft: '15px',
                    fontFamily: 'Orbitron, sans-serif',
                    color: '#FFFFFF',
                  }}
                >
                  Elastic Copilot
                </Typography>
              </Box>

              <Typography
                variant={'body1' as any}
                sx={{
                  fontSize: '1rem',
                  color: '#AEAEAE',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '20px',
                }}
              >
                Elastic Copilot is the best context-aware pair programmer to help you or your team with development.
              </Typography>

              <Box sx={{ display: 'flex', gap: '15px' }}>
                <a href="https://www.linkedin.com/company/elasticapp/" target="_blank" rel="noopener noreferrer">
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(119, 94, 255, 0.5)',
                      transition: 'background 0.3s ease',
                      '&:hover': {
                        background: 'rgba(119, 94, 255, 0.1)',
                      },
                    }}
                  >
                    <Image
                      src="/icons/linkedin_icon.png"
                      alt="LinkedIn"
                      width={20}
                      height={20}
                    />
                  </Box>
                </a>

                <a href="https://x.com/elasticopilot?s=21&t=_eDlVpq83vwZw9mRvlBoIA" target="_blank" rel="noopener noreferrer">
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(119, 94, 255, 0.5)',
                      transition: 'background 0.3s ease',
                      '&:hover': {
                        background: 'rgba(119, 94, 255, 0.1)',
                      },
                    }}
                  >
                    <Image
                      src="/icons/twitter_x_icon.png"
                      alt="X"
                      width={20}
                      height={20}
                    />
                  </Box>
                </a>
              </Box>
            </Box>
          </Grid>

          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={4} md={2} key={index}>
              <Typography
                variant={'h4' as any}
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '20px',
                  fontFamily: 'Tektur, sans-serif',
                  color: '#FFFFFF',
                }}
              >
                {section.title}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    href={link.url}
                    key={linkIndex}
                    style={{
                      fontSize: '0.9rem',
                      color: '#AEAEAE',
                      fontFamily: 'JetBrains Mono, monospace',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          <Grid item xs={12} md={2}>
            <Typography
              variant={'h4' as any}
              sx={{
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '20px',
                fontFamily: 'Tektur, sans-serif',
                color: '#FFFFFF',
              }}
            >
              Contact
            </Typography>

            <a href="mailto:support@elasticapp.io">
              <Typography
                variant={'body2' as any}
                sx={{
                  fontSize: '0.9rem',
                  color: '#AEAEAE',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '10px',
                }}
              >
                support@elasticapp.io
              </Typography>
            </a>
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: '60px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(119, 94, 255, 0.2)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '15px' : '0',
          }}
        >
          <Typography
            variant={'caption' as any}
            sx={{
              fontSize: '0.8rem',
              color: '#666666',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            © {new Date().getFullYear()} Elastic Copilot. All rights reserved.
          </Typography>

          {/*<Box sx={{ display: 'flex', gap: '20px' }}>*/}
          {/*  <Link*/}
          {/*    href="#"*/}
          {/*    style={{*/}
          {/*      fontSize: '0.8rem',*/}
          {/*      color: '#666666',*/}
          {/*      fontFamily: 'JetBrains Mono, monospace',*/}
          {/*      textDecoration: 'none',*/}
          {/*      transition: 'color 0.3s ease',*/}
          {/*    }}*/}
          {/*    className="footer-link"*/}
          {/*  >*/}
          {/*    Privacy Policy*/}
          {/*  </Link>*/}

          {/*  <Link*/}
          {/*    href="#"*/}
          {/*    style={{*/}
          {/*      fontSize: '0.8rem',*/}
          {/*      color: '#666666',*/}
          {/*      fontFamily: 'JetBrains Mono, monospace',*/}
          {/*      textDecoration: 'none',*/}
          {/*      transition: 'color 0.3s ease',*/}
          {/*    }}*/}
          {/*    className="footer-link"*/}
          {/*  >*/}
          {/*    Terms of Service*/}
          {/*  </Link>*/}

          {/*  <Link*/}
          {/*    href="#"*/}
          {/*    style={{*/}
          {/*      fontSize: '0.8rem',*/}
          {/*      color: '#666666',*/}
          {/*      fontFamily: 'JetBrains Mono, monospace',*/}
          {/*      textDecoration: 'none',*/}
          {/*      transition: 'color 0.3s ease',*/}
          {/*    }}*/}
          {/*    className="footer-link"*/}
          {/*  >*/}
          {/*    Cookie Policy*/}
          {/*  </Link>*/}
          {/*</Box>*/}
        </Box>

        <DecorRect sx={{ top: '20px', right: '20px' }} />
        <DecorRect sx={{ bottom: '20px', left: '20px' }} />
      </Box>
    </Box>
  )
}
