'use client'
import React from 'react'
import { Box, Container, Typography, useTheme, Grid, Paper } from '@mui/material'
import { TopNav } from '@/app/(navigation)/TopNav'
import { Footer } from '@/app/(home-page-sections)/footer/Footer'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import Image from 'next/image'

// Code block component for displaying code snippets
const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  return (
    <Box
      sx={{
        background: 'rgba(10, 9, 14, 0.9)',
        border: '1px solid rgba(119, 94, 255, 0.3)',
        borderRadius: '4px',
        padding: '16px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '2px 8px',
          background: 'rgba(119, 94, 255, 0.2)',
          borderRadius: '4px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          color: '#AEAEAE',
        }}
      >
        {language}
      </Box>
      <Typography
        component="pre"
        sx={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          lineHeight: 1.5,
          color: '#E5E5E5',
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
        }}
      >
        <code>{code}</code>
      </Typography>
    </Box>
  )
}

// Feature card component
const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        background: 'rgba(10, 9, 14, 0.7)',
        border: '1px solid rgba(119, 94, 255, 0.3)',
        borderRadius: '4px',
        padding: '24px',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(119, 94, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ marginBottom: '16px', color: '#775EFF' }}>
        {icon}
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Tektur, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 600,
          marginBottom: '12px',
          color: '#FFFFFF',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.9rem',
          color: '#AEAEAE',
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>
    </Paper>
  )
}

export default function DocumentationPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const theme = useTheme()
  const [unavailabilityAlertOpen, setUnavailabilityAlertOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TopNav
        isMobile={isMobile}
        showAlert={() => setUnavailabilityAlertOpen(true)}
      />
      <Box
        sx={{
          paddingTop: '80px',
          minHeight: '100vh',
          background: '#0A090E',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, rgba(119, 94, 255, 0.1) 0%, rgba(10, 9, 14, 0) 100%)',
            padding: isMobile ? '40px 0' : '60px 0',
            borderBottom: '1px solid rgba(119, 94, 255, 0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              Elastic Copilot Documentation
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: isMobile ? '1rem' : '1.2rem',
                fontWeight: 400,
                color: '#AEAEAE',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              Learn how to use Elastic Copilot to accelerate your development workflow
            </Typography>
          </Container>
        </Box>

        {/* Main content */}
        <Container maxWidth="lg" sx={{ padding: isMobile ? '40px 16px' : '60px 24px' }}>
          {/* Introduction */}
          <Box sx={{ marginBottom: '60px' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '24px',
                color: '#FFFFFF',
                position: 'relative',
                paddingBottom: '12px',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
                },
              }}
            >
              Introduction
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              Elastic Copilot is a powerful VS Code extension that enhances your coding experience with AI-powered assistance. Unlike other AI coding tools, Elastic Copilot can access your terminal and file system, use a browser inside VS Code, and interact with it in real-time, showing you the process of testing and development as it happens.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
              }}
            >
              Every step of development is captured, allowing you to go back and review the process at any time. This documentation will guide you through the features and capabilities of Elastic Copilot, helping you get the most out of this powerful tool.
            </Typography>
          </Box>

          {/* Key Features */}
          <Box sx={{ marginBottom: '60px' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '24px',
                color: '#FFFFFF',
                position: 'relative',
                paddingBottom: '12px',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
                },
              }}
            >
              Key Features
            </Typography>
            <Grid container spacing={3} sx={{ marginTop: '16px' }}>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  title="Terminal Access"
                  description="Elastic Copilot can execute terminal commands, install packages, run tests, and perform system operations to help you develop faster."
                  icon={<span style={{ fontSize: '24px' }}>⌨️</span>}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  title="File System Integration"
                  description="Access, create, modify, and organize files and directories directly, with full understanding of your project structure."
                  icon={<span style={{ fontSize: '24px' }}>📁</span>}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  title="In-Editor Browser"
                  description="Test web applications in real-time with an integrated browser that Elastic Copilot can control to demonstrate functionality."
                  icon={<span style={{ fontSize: '24px' }}>🌐</span>}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  title="Development History"
                  description="Every development step is captured, allowing you to review the process and go back to any point in time."
                  icon={<span style={{ fontSize: '24px' }}>📜</span>}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  title="Real-Time Testing"
                  description="Watch as Elastic Copilot tests your code in real-time, showing you exactly how it works and identifying issues."
                  icon={<span style={{ fontSize: '24px' }}>🧪</span>}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  title="Context-Aware Assistance"
                  description="Elastic Copilot understands your entire project, providing suggestions and solutions that fit seamlessly with your existing code."
                  icon={<span style={{ fontSize: '24px' }}>🧠</span>}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Getting Started */}
          <Box sx={{ marginBottom: '60px' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '24px',
                color: '#FFFFFF',
                position: 'relative',
                paddingBottom: '12px',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
                },
              }}
            >
              Getting Started
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '16px',
                marginTop: '32px',
                color: '#FFFFFF',
              }}
            >
              Installation
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              You can install Elastic Copilot directly from the VS Code marketplace:
            </Typography>
            <ol style={{ fontFamily: 'JetBrains Mono, monospace', color: '#E5E5E5', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li>Open VS Code</li>
              <li>Go to the Extensions view (Ctrl+Shift+X / Cmd+Shift+X)</li>
              <li>Search for &#34;Elastic Copilot&#34;</li>
              <li>Click Install</li>
            </ol>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '16px',
                marginTop: '32px',
                color: '#FFFFFF',
              }}
            >
              Basic Usage
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              After installation, you can activate Elastic Copilot by clicking on the Elastic Copilot icon in the activity bar or using the keyboard shortcut:
            </Typography>
            <CodeBlock
              language="Keyboard Shortcut"
              code="Ctrl+Shift+E (Windows/Linux)\nCmd+Shift+E (Mac)"
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              Once activated, you can start a conversation with Elastic Copilot by typing in the input box. Here are some examples of what you can ask:
            </Typography>
            <CodeBlock
              language="Examples"
              code="// Create a new React component\nCreate a responsive navigation bar component using React and CSS\n\n// Fix a bug\nHelp me fix this error: TypeError: Cannot read property 'map' of undefined\n\n// Refactor code\nRefactor this function to use async/await instead of promises\n\n// Generate tests\nWrite unit tests for this authentication service"
            />
          </Box>

          {/* Advanced Features */}
          <Box sx={{ marginBottom: '60px' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '24px',
                color: '#FFFFFF',
                position: 'relative',
                paddingBottom: '12px',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
                },
              }}
            >
              Advanced Features
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '16px',
                marginTop: '32px',
                color: '#FFFFFF',
              }}
            >
              Terminal Integration
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              Elastic Copilot can execute terminal commands to help you with various tasks:
            </Typography>
            <CodeBlock
              language="Examples"
              code="// Install dependencies\nInstall React and styled-components for my project\n\n// Run tests\nRun the test suite for the authentication module\n\n// Start a development server\nStart a development server for my React application"
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '16px',
                marginTop: '32px',
                color: '#FFFFFF',
              }}
            >
              File System Access
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              Elastic Copilot can interact with your file system to create, modify, and organize files:
            </Typography>
            <CodeBlock
              language="Examples"
              code="// Create a new file\nCreate a new React component called UserProfile in the components directory\n\n// Modify an existing file\nAdd form validation to the registration form in src/components/RegistrationForm.js\n\n// Organize files\nRefactor the project structure to follow the feature-based organization pattern"
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '16px',
                marginTop: '32px',
                color: '#FFFFFF',
              }}
            >
              In-Editor Browser
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              Elastic Copilot includes an integrated browser that can be used to test web applications in real-time:
            </Typography>
            <CodeBlock
              language="Examples"
              code="// Test a web application\nTest the login functionality of my web application\n\n// Demonstrate a feature\nShow me how the responsive design works on different screen sizes\n\n// Debug an issue\nHelp me debug why the form submission isn't working"
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '16px',
                marginTop: '32px',
                color: '#FFFFFF',
              }}
            >
              Development History
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              Elastic Copilot captures every step of the development process, allowing you to review and go back to any point:
            </Typography>
            <CodeBlock
              language="Examples"
              code="// View development history\nShow me the steps we took to implement the authentication system\n\n// Go back to a previous state\nRevert to the state before we refactored the database schema\n\n// Compare different approaches\nCompare the performance of the two sorting algorithms we implemented"
            />
          </Box>

          {/* Best Practices */}
          <Box sx={{ marginBottom: '60px' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '24px',
                color: '#FFFFFF',
                position: 'relative',
                paddingBottom: '12px',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
                },
              }}
            >
              Best Practices
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              To get the most out of Elastic Copilot, follow these best practices:
            </Typography>
            <ol style={{ fontFamily: 'JetBrains Mono, monospace', color: '#E5E5E5', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li><strong>Be specific in your requests</strong> - The more details you provide, the better Elastic Copilot can assist you.</li>
              <li><strong>Use project context</strong> - Refer to specific files, functions, or components in your project to help Elastic Copilot understand the context.</li>
              <li><strong>Break down complex tasks</strong> - For complex tasks, break them down into smaller, more manageable steps.</li>
              <li><strong>Review and understand the code</strong> - Always review and understand the code that Elastic Copilot generates before integrating it into your project.</li>
              <li><strong>Provide feedback</strong> - If Elastic Copilot&#39;s solution isn&#39;t quite right, provide feedback to help it refine its approach.</li>
            </ol>
          </Box>

          {/* FAQ */}
          <Box sx={{ marginBottom: '60px' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '24px',
                color: '#FFFFFF',
                position: 'relative',
                paddingBottom: '12px',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #775EFF, #DE3AED)',
                },
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Box sx={{ marginTop: '24px' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Tektur, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#FFFFFF',
                }}
              >
                Is my code secure with Elastic Copilot?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                }}
              >
                Yes, your code is secure. Elastic Copilot processes your code locally within VS Code and only sends necessary information to our servers for AI processing. We do not store your code or use it for training our models.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Tektur, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#FFFFFF',
                }}
              >
                Does Elastic Copilot work offline?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                }}
              >
                Elastic Copilot requires an internet connection to access our AI models. However, we are working on a limited offline mode for basic functionality.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Tektur, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#FFFFFF',
                }}
              >
                Which programming languages does Elastic Copilot support?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                }}
              >
                Elastic Copilot supports a wide range of programming languages, including JavaScript, TypeScript, Python, Java, C#, C++, Go, Ruby, PHP, Swift, Kotlin, and more. It also supports popular frameworks and libraries for these languages.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Tektur, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#FFFFFF',
                }}
              >
                Can Elastic Copilot help with testing?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                }}
              >
                Yes, Elastic Copilot can help you write unit tests, integration tests, and end-to-end tests for your code. It can also help you run tests and analyze the results.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Tektur, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#FFFFFF',
                }}
              >
                How does Elastic Copilot compare to other AI coding assistants?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                }}
              >
                Elastic Copilot differentiates itself with its ability to access the terminal and file system, use an in-editor browser, and capture the development history. These features provide a more comprehensive and integrated development experience compared to other AI coding assistants.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer isMobile={isMobile} />
    </React.Fragment>
  )
}
