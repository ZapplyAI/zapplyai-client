'use client'
import React from 'react'
import { Box, Container, Typography, useTheme } from '@mui/material'
import { TopNav } from '@/app/(navigation)/TopNav'
import { Footer } from '@/app/(home-page-sections)/footer/Footer'
import { useClientMediaQuery } from '@/helpers/IsMobile'

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
              Last Updated: June 1, 2025
            </Typography>
          </Container>
        </Box>

        {/* Main content */}
        <Container maxWidth="lg" sx={{ padding: isMobile ? '40px 16px' : '60px 24px' }}>
          <Box sx={{ marginBottom: '40px' }}>
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
              Your privacy is important to us. This Privacy Policy explains what information Elastic Copilot
              collects, how we use and share that information, and the choices you have. This policy
              applies to all users of the Elastic Copilot VS Code extension, our website (https://elasticapp.ai),
              and any related services (collectively, the "Service"). By using Elastic Copilot, you agree to the
              collection and use of information as described in this Privacy Policy. If you do not agree, please
              do not use the Service.
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
              We are committed to protecting your data and being transparent about our privacy practices.
              We encourage you to read this Privacy Policy fully. For any questions or concerns, feel free to
              contact us at founders@elasticapp.io.
            </Typography>
          </Box>

          {/* Information We Collect */}
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
              Information We Collect
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
              We collect information that you provide to us directly, information that is collected
              automatically as you use Elastic Copilot, and information from third-party integrations if you
              choose to connect them. The types of information we collect include:
            </Typography>
            <Box sx={{ marginLeft: '20px', marginBottom: '20px' }}>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Account and Contact Information:</strong> When you sign up for Elastic Copilot, we collect
                  personal information such as your name, email address, and login credentials. If you
                  register through a third-party OAuth (for example, signing in with Google Workspace),
                  we collect the basic profile information that service provides (such as your name and
                  email). This information is used to create and maintain your account and to communicate
                  with you (for example, sending verification emails, updates, or support responses).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Payment Information:</strong> If you subscribe to a paid plan, our payment processor (e.g.,
                  Stripe) will collect your payment card details and billing information. We do not store
                  your full credit card number or CVV on our servers. We may store a record of your
                  transactions (e.g., that you subscribed on a certain date, the plan type, and amount).
                  Payment information is used solely for processing payments, fraud prevention, and
                  compliance with legal obligations (like tax calculation).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Usage Data (AI Queries and Code Context):</strong> When you use the Elastic Copilot
                  extension in VS Code, it will collect certain data in order to provide AI assistance:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Prompts and Queries:</strong> The text you input into Elastic Copilot (for example, a
                        question you ask the AI, a request for code completion, or a debugging
                        command) and related context (such as surrounding code or error messages) are
                        collected so that the AI models can process them and generate a response. This
                        data may include snippets of your source code or other project content to provide
                        context for the AI. By design, this usage data can include code or text that
                        you are editing in your IDE. We treat this information as confidential and use it
                        only to fulfill your request and improve the Service (as detailed below).
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>AI Outputs:</strong> The suggestions or explanations returned by the AI (the
                        "Suggestions") may be temporarily logged on our servers (for example, to send
                        them to your editor and to allow you to view past AI responses in your
                        development history). These outputs are typically derived from your inputs and
                        do not usually contain additional personal data beyond what you provided.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Click and Action Data:</strong> We may collect data on your interactions with Elastic
                        Copilot's interface – for instance, whether you accepted an AI suggestion, edited
                        it, or ignored it. We might log which commands or features you use (e.g.,
                        "Explain code" vs "Write tests" features) and how often, as well as timestamps of usage.
                        This information helps us understand feature usage and improve the user
                        experience.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Terminal and File Operations:</strong> If you use Elastic Copilot's features that execute
                        terminal commands or modify files (with your permission), we may log the fact
                        that an operation was executed (e.g., "Ran npm install via Copilot" or "Created
                        new file X via Copilot"), along with success/failure information or error logs. We
                        do not collect the full contents of your files via such logging, but we might
                        capture file names or command parameters for telemetry.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Device and Technical Information:</strong> We collect certain information about the devices
                  and applications you use to access Elastic Copilot:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Device/IDE Info:</strong> We may collect details like your operating system, VS Code
                        version, Elastic Copilot extension version, and hardware identifiers (such as a
                        device ID or IP address). This helps in troubleshooting compatibility issues and
                        providing proper support.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Log Data:</strong> Our systems automatically record certain information in log files. This
                        can include your IP address, browser type (for web requests), the features you
                        used, error messages, and other diagnostic data. For example, when the Elastic
                        Copilot extension communicates with our server (to authenticate or to fetch an AI
                        response), we log the time of request and whether it was successfully fulfilled.
                        These logs are important for monitoring system health, security, and usage.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Cookies and Website Analytics:</strong> When you visit our website or web dashboard, we
                  may use cookies or similar tracking technologies to remember your preferences and
                  gather usage statistics. For instance, we might use cookies to keep you logged in, or to
                  track pageviews and feature clicks on our documentation or landing pages. We do not
                  use cookies for third-party advertising. We may use analytics tools (like Google Analytics
                  or a self-hosted analytics solution) to understand how our website is used, but any
                  analytics service will be configured not to collect unnecessary personal info (IP
                  anonymization where applicable, etc.). You can set your browser to refuse cookies, but
                  some website features may not function properly without them.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Third-Party Integration Data:</strong> Elastic Copilot integrates with certain third-party services
                  only if you choose to connect them:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Slack Integration:</strong> If you connect Elastic Copilot with Slack (for example, to get
                        notifications or ask coding questions through a Slack channel), we will receive
                        from Slack the information necessary to enable this – such as your Slack user ID,
                        workspace ID, and messages you send to the Elastic Copilot bot. We will store
                        tokens/credentials provided by Slack to maintain the connection. We use Slack
                        data only to perform the functions you request (e.g., respond within Slack to your
                        query or send alerts).
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Google Workspace Integration:</strong> If you integrate Google services (for instance,
                        sign in with Google OAuth or allow Elastic Copilot to access Google Drive files or
                        Gmail for some coding-related function), we collect the authentication tokens and
                        any data you explicitly permit. For example, if Elastic Copilot were to read a
                        Google Docs file because you ask it to analyze some content there, it will access
                        that content only for the purpose of fulfilling your request. We will abide by
                        Google's API user data policy and will not use data from your Google account for
                        any purpose other than providing the requested service to you.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Other Integrations:</strong> For any future integrations (e.g., GitHub, GitLab, Jira, etc.),
                        similar principles will apply: we will only collect the minimal data needed from
                        those services and only after you have authenticated/authorized the integration.
                        We will be transparent about what is collected and how it's used at the time you
                        connect any integration.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
            </Box>
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
              <strong>Sensitive Personal Data:</strong> Elastic Copilot is not intended to collect sensitive personal
              information such as government IDs, health information, biometric data, or financial account
              details outside of the context of payment. We ask that you do not input any sensitive
              personal data into prompts or code when using the AI features. Our Service is focused on
              code and technical data, and any personal information appearing in code (e.g. names, email
              addresses in config files) will be handled as described in this policy, but please minimize any
              sensitive personal data you expose to the Service. We do not knowingly collect any data about
              children under 13, and our Service is not directed to children (see "Children's Privacy" below).
            </Typography>
          </Box>

          {/* How We Use Your Information */}
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
              How We Use Your Information
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
              Elastic AI (the company behind Elastic Copilot) uses the collected information for the following
              purposes:
            </Typography>
            <Box sx={{ marginLeft: '20px', marginBottom: '20px' }}>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>To Provide and Maintain the Service:</strong> We use your information to operate Elastic
                  Copilot's core functionalities. This includes using your code snippets and prompts to
                  generate AI suggestions, using your account data to log you in and personalize your
                  environment, and processing transactions for paid plans. For example, we take the code
                  context you've provided and send it to our AI model providers (like OpenAI or Anthropic)
                  to generate the completion or explanation you requested. Without your data, these
                  features wouldn't work.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>To Improve and Develop the Platform:</strong> We continually work on enhancing Elastic
                  Copilot's capabilities, performance, and user experience. We analyze usage data and
                  feedback to:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        Debug and fix errors or outages. (For instance, error logs and telemetry might
                        alert us that a certain feature is crashing the extension, and we'll use that data to
                        repair the issue.)
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        Optimize AI model performance and accuracy. We might evaluate (either by
                        algorithms or manually) some anonymized prompt/response pairs to see how
                        well the AI is doing and where it fails, helping us fine-tune prompts or decide on
                        model updates. If Privacy Mode is enabled for your account, we will not use
                        your specific code or prompts for such evaluations – we would rely on
                        aggregate data or opt-in data from others.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        Develop new features. Understanding which features are most used (e.g.,
                        "generate code" vs "run tests") and how users interact with the tool guides our
                        development priorities. We may also use user feedback submitted to us (via
                        email or forums) to design improvements.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        Train our own models or algorithms. Elastic Copilot may utilize anonymized,
                        aggregated usage data to train internal algorithms (for example, improving our
                        suggestion ranking or building a model to better understand code context). We
                        do not include your private code in any public dataset, and any training that
                        involves user code or prompts would be done under strict controls and only with
                        data from users who have not opted out (see Privacy Mode). We also have
                        zero-retention agreements with our third-party AI providers, so OpenAI,
                        Anthropic, and similar services are contractually bound not to use your data for
                        their own training or improvement.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>To Communicate with You:</strong> We use contact information (like your email) to send
                  service-related communications:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        Onboarding emails, password reset messages, and account notifications.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        Information about feature updates, security alerts, or policy changes. For
                        example, we might send an email if we update this Privacy Policy or introduce
                        important new security features.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        Support responses: If you contact us with a problem or question, we'll use your
                        email and any info you provide to respond. We may ask for additional diagnostic
                        data (like logs) if needed to assist you.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        We may also send you product announcements or promotional communications
                        to your email if you have opted-in to receive them. You can unsubscribe from
                        marketing emails at any time by clicking the "unsubscribe" link, or adjusting
                        preferences in your account settings. Transactional and account-critical emails,
                        however, may still be sent even if you opt out of marketing, as they are necessary
                        for the Service.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>For Security and Fraud Prevention:</strong> We are committed to ensuring the security of your
                  data and our systems. We will use data (like IP addresses, log-in attempts, usage
                  patterns) to detect and prevent fraud, abuse, or security incidents. For example, if
                  we notice unusual access to your account or suspect an access token has been
                  compromised, we might use that information to block access or notify you. We also may
                  use automated tools to screen for known malicious activity (like scanning uploaded
                  content for viruses or verifying OAuth tokens with providers). Audit logs of certain actions
                  (like a history of major changes or AI actions performed on your code) are kept to help
                  investigate any security-related events.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Compliance with Legal Obligations:</strong> We may process and retain your personal
                  information as needed to comply with laws, regulations, and legal requests. For
                  example, if required by law, we might retain certain financial records for tax auditing, or
                  disclose information to law enforcement in response to a valid legal process. We also
                  use personal information to enforce our Terms of Use (such as to investigate violations
                  or handle user disputes).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Aggregated and Anonymized Data:</strong> We may aggregate or anonymize data so it can no
                  longer be linked to you or your organization. We might use this aggregated data for
                  purposes such as analyzing trends (e.g., "X% of users use feature Y weekly"), academic
                  research, or marketing (e.g., publishing the number of code completions generated by
                  Elastic Copilot across all users). This aggregated information contains no personally
                  identifiable information and no private code content tied to any individual.
                </Box>
              </Typography>
            </Box>
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
              We will not sell your personal information to third parties. We do not use the information we
              collect to create profiles about your behavior for advertising purposes, nor do we share your
              data with advertisers or data brokers.
            </Typography>
          </Box>

          {/* How We Share and Disclose Information */}
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
              How We Share and Disclose Information
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
              Elastic AI respects your privacy and shares personal data only in limited circumstances.
              The types of third parties and scenarios where we may share information include:
            </Typography>
            <Box sx={{ marginLeft: '20px', marginBottom: '20px' }}>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>AI Model Providers:</strong> As explained, when you request an AI completion or other
                  AI-driven function, we send your prompt and relevant context to the chosen AI
                  provider (e.g., OpenAI, Anthropic, Google Vertex AI) in order to receive the result.
                  These providers act as processors of your data on our behalf. We have explicitly
                  negotiated agreements that prevent these providers from storing or using your data
                  for any purpose other than to provide the AI response. They do not retain your code
                  or prompts after delivering the result. However, using the AI providers is essential for the
                  core functionality of Elastic Copilot – if you do not want your code or prompt data sent to
                  such third parties, you should not use the AI features of the Service (or you should
                  enable Privacy Mode such that only minimal data is sent; see Privacy Mode below).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Cloud Hosting and Storage (Infrastructure):</strong> Elastic Copilot's servers and databases
                  are hosted on Google Cloud Platform (GCP) in the United States. All your data
                  (account info, usage logs, any stored code context, etc.) is stored on secure servers in
                  data centers located in the U.S. GCP, as our cloud provider, technically processes data
                  as needed for storage and backup. We rely on GCP's robust security certifications and
                  compliance with privacy standards. GCP does not access your content except as
                  needed to maintain the cloud service (and as permitted by law or our agreement with
                  them).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Payment Processor:</strong> When you make payments, your data is shared with Stripe (or a
                  similar payment processor). Stripe will receive information like your name, email, and
                  payment details to process transactions. Stripe is PCI-DSS compliant and is prohibited
                  from using your payment info except to provide payment services. We share only the
                  information necessary for billing (such as your email to send receipts, or an ID to link the
                  payment to your account).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Error Tracking and Analytics:</strong> We use services like Sentry (error tracking) and
                  possibly analytics tools to improve Elastic Copilot. Sentry may receive context about an
                  error in the app, which can include anonymized identifiers or snippets of code where an
                  error occurred. We strive to strip out or mask any sensitive data from error reports,
                  and Sentry is obligated to protect any data it does receive per its service terms. Similarly,
                  if we use an analytics service (like Google Analytics on the marketing site), it might use
                  cookies and collect usage info such as page visits or user agent. These third-party
                  analytics tools are configured not to collect sensitive personal data, and IP addresses
                  may be anonymized when required. All third-party service providers are selected for their
                  commitments to data protection.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Third-Party Integrations (User-Enabled):</strong> If you connect Slack, Google, or another
                  integration to Elastic Copilot, we will share data with and receive data from that third
                  party as necessary to provide the integration. For example, if you enable Slack
                  integration, Elastic Copilot will send messages to Slack (which could include
                  AI-generated content or code snippets you asked it to summarize) and will listen for
                  messages you send to it via Slack. Similarly, if you ask Elastic Copilot to analyze a
                  Google Doc, we send the document content to our AI for analysis. These actions are
                  under your control, and the data shared is only what is necessary for the integration's
                  function. Slack and Google will handle any data on their side according to their own
                  privacy policies, so we encourage you to review those if you use the integrations.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Service Providers and Subprocessors:</strong> Elastic AI may engage trusted third-party
                  companies to perform certain business-related functions. These parties are our service
                  providers (or "subprocessors") and may handle your data on our behalf, under strict
                  confidentiality and data protection terms. For example:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Email Service:</strong> We might use a service like SendGrid or Amazon SES to send
                        transactional emails (like verification codes or notifications). They would process
                        your email address and the content of the email.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Logging/Monitoring:</strong> We might use Datadog or similar for system monitoring
                        (which may involve processing anonymized metrics about usage, with Privacy
                        Mode filtering out code data).
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Database and Analytics:</strong> As noted, we use cloud databases (like a managed
                        MongoDB or similar) to store non-code analytics data for users without Privacy
                        Mode. This means if Privacy Mode is off, some usage analytics (excluding raw
                        code) might be stored and processed in those systems.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        All such providers are bound by contracts to only use data as we instruct and to
                        maintain adequate security. A list of current subprocessors can be provided upon
                        request if required.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Business Transfers:</strong> If Elastic AI (the company) is involved in a merger, acquisition,
                  sale of assets, or reorganization, your information could be transferred to the successor
                  or new owner as part of that transaction. We would require that any new owner honor
                  the commitments in this Privacy Policy or obtain your consent for any material changes.
                  We will notify you (for example, via email or a prominent notice on our site) of any
                  ownership change or uses of your personal information that differ from those in this
                  policy, as well as any choices you may have regarding your data.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Legal Compliance and Safety:</strong> We may disclose your information if required to do so
                  by law or in a good-faith belief that such action is necessary to: (a) comply with a legal
                  obligation, such as a subpoena, court order, or search warrant; (b) protect and defend
                  the rights, property, or safety of Elastic AI, our users, or the public. This could include
                  exchanging information with law enforcement or other agencies to prevent fraud or
                  investigate illegal activities. We will attempt to notify you of any governmental request for
                  your personal information (to the extent allowed by law and if we have your contact
                  information) so that you may seek to limit or protect it, unless we are prohibited from
                  doing so by law (for example, an order under 18 U.S.C. § 2705(b) in the U.S.).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>With Your Consent:</strong> Aside from the cases above, we will share your personal
                  information with third parties only with your consent. For instance, if we ever want to
                  use a quote from your feedback or identify your company as a user on our website, we
                  would seek your permission. Or if there's a new integration that requires sharing data in
                  a way not covered here, we would ask for your consent explicitly.
                </Box>
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                color: '#E5E5E5',
                lineHeight: 1.8,
                marginBottom: '24px',
                fontWeight: 'bold',
              }}
            >
              We want to emphasize that your code and prompts are not shared with any third parties
              except our subprocessors and AI model providers as necessary to serve you, and in
              those cases we have taken steps to ensure the data is not retained or misused. We do not
              provide your content or personal data to advertisers or unrelated third parties.
            </Typography>
          </Box>

          {/* Data Retention and Deletion */}
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
              Data Retention and Deletion
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
              <strong>Data Retention:</strong> We retain personal information for as long as necessary to fulfill the purposes
              described in this Privacy Policy, unless a longer retention period is required or permitted by
              law. Here are some general retention practices for different categories of data:
            </Typography>
            <Box sx={{ marginLeft: '20px', marginBottom: '20px' }}>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Account Information:</strong> We keep your account registration information (like your name,
                  email, and account settings) for as long as your account is active. If you delete your
                  account, we will remove or anonymize this information within a reasonable time after
                  account deletion, except to the extent it is necessary to retain it for legal obligations (for
                  example, records of payments for financial reporting, or logs needed for security and
                  audits).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>AI Usage Data:</strong> By default (when Privacy Mode is not enabled), Elastic Copilot may
                  store certain usage data:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Prompt/Response logs:</strong> We may keep logs of prompts and AI outputs for a period
                        of time to help improve the service and troubleshoot issues. These logs might be
                        stored in a secure database and associated with a random identifier or your user
                        ID. We aim to limit retention of raw prompt data to what is necessary. For
                        instance, we might keep last 30 days of interactions for quick retrieval in your
                        development history or for analysis, and aggregate statistics longer.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Code Index data:</strong> If our service indexes your code for providing context, by
                        default that index might be cached either locally (on your machine) or on our
                        servers. However, Elastic Copilot uses local code indexing by design –
                        meaning the full index of your repository stays on your machine. In some cases,
                        a transformed or compressed representation of your code (like embeddings)
                        might be stored on our server to enable certain features (e.g., long-term context
                        or team collaboration). If so, those representations would exclude raw source
                        code and be meaningless outside serving the AI functionality, but if Privacy Mode
                        is on, we would not retain even these embeddings persistently (see Privacy
                        Mode below).
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Telemetry and logs:</strong> General usage logs (without code content) may be kept for a
                        longer period for security auditing and service analytics.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Privacy Mode (Zero Retention) Option:</strong> We offer a Privacy Mode setting for users
                  (especially important for enterprise or sensitive use-cases). When Privacy Mode is
                  enabled, we guarantee that code data is not persistently stored on our servers.
                  This means:
                  <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        We do not log or retain the actual content of your prompts or code that you send
                        for AI processing. They pass through memory to the AI providers and are not
                        written to disk on our side.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        We do not include your code or prompt data in any analytics or training datasets.
                        Even our error logs or analytics will exclude code content if Privacy Mode is on
                        (we implement filters to scrub such data).
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        The AI model providers (OpenAI, Anthropic, etc.) already have zero-retention on
                        their end for all users, as stated. Privacy Mode ensures we also do not retain it.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        If code embeddings or indexing are needed for functionality, Privacy Mode users
                        have those processes either disabled or done in a non-persistent way. For
                        example, if a cloud service were to store embeddings for searching your code,
                        Privacy Mode would disable that feature or store the embeddings only
                        ephemerally (or encrypt them with a key only you possess).
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '1rem',
                        color: '#E5E5E5',
                        lineHeight: 1.8,
                        marginBottom: '10px',
                        display: 'flex',
                      }}
                    >
                      <Box component="span" sx={{ marginRight: '10px' }}>○</Box>
                      <Box component="span">
                        <strong>Team Privacy Mode:</strong> If you are part of a team or enterprise that mandates
                        Privacy Mode, we enforce it across all team members. Our infrastructure and
                        policies are designed such that even inadvertent logging of code from Privacy
                        Mode users is prevented or immediately purged.
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Payment and Transaction Data:</strong> We retain payment records and invoices as long as
                  required for financial accounting and compliance (typically at least 7 years in many
                  jurisdictions). However, we do not keep sensitive payment details like card numbers –
                  those are with Stripe.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Backups:</strong> Our systems may create backup copies of data (e.g., database backups) that
                  are retained for disaster recovery purposes. These backups are securely stored and
                  encrypted. Even after data is deleted from our active systems, it may persist in backups
                  for a limited time until those backups are rotated. We have retention limits on backups
                  and will eventually delete or overwrite data in backups according to our backup retention
                  schedule.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Deletion Upon Request:</strong> You have the right to request deletion of your personal data
                  (see "Your Rights" below). Upon such a request, and verification of identity, we will delete
                  or anonymize your personal information from our active databases, unless retaining it is
                  required for legitimate business or legal purposes. Where data has been provided to
                  third-party processors (like AI providers for processing or Stripe for payment), we will
                  instruct them to delete that data as well, to the extent applicable. Note that complete
                  removal from backups may await the natural expiration of those backup files, but those
                  backups are protected and eventually deleted in the normal course.
                </Box>
              </Typography>
            </Box>
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
              When we delete data, we will do so in a manner designed to ensure it cannot be readily
              reconstructed or linked back to you.
            </Typography>
          </Box>

          {/* Data Security Measures */}
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
              Data Security Measures
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
              Elastic AI employs a variety of security measures to protect your information from
              unauthorized access, disclosure, alteration, and destruction. While our separate Security Policy
              goes into more technical depth, here is an overview of how we safeguard your data:
            </Typography>
            <Box sx={{ marginLeft: '20px', marginBottom: '20px' }}>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Encryption:</strong> All network communication between the Elastic Copilot extension, our
                  servers, and third-party AI providers is encrypted in transit using TLS (HTTPS) to
                  prevent eavesdropping. Sensitive data (such as passwords and tokens) is encrypted at
                  rest in our databases. For example, your password is stored only in a hashed form, and
                  API keys or tokens we store on your behalf are kept encrypted in our database.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Access Controls:</strong> We restrict access to personal data to authorized personnel who
                  need it to operate or improve the Service. Our team is trained on data security and
                  privacy. Administrative access to our systems requires strong authentication (such as
                  multi-factor authentication), and we log and audit administrative actions. Within our
                  infrastructure, we use network segmentation and role-based access so that, for instance,
                  an application server can only access the database records it needs and not others.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Infrastructure Security:</strong> Elastic Copilot is hosted on Google Cloud Platform, which
                  maintains robust physical and environmental security at its data centers. We leverage
                  GCP security features such as firewalls, monitoring, and secure default configurations.
                  We regularly update our software and dependencies to address security vulnerabilities,
                  and we perform routine security testing and code reviews. We also utilize cloud security
                  services for intrusion detection and anomaly monitoring on our systems.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Third-Party Security:</strong> We vet our third-party subprocessors for strong security
                  practices. For example, Stripe is a leading secure payment processor; Sentry has
                  security measures to safeguard the logged data; and our AI partners (OpenAI, Anthropic,
                  etc.) have their own stringent security protocols and compliance certifications. We have
                  Data Processing Agreements in place where appropriate, binding these providers to
                  safeguard personal data according to industry standards.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Organizational Measures:</strong> We have an internal incident response plan for any security
                  breaches or data incidents. If an incident occurs that affects your data, we will notify you
                  and relevant authorities as required by law. We also minimize data exposure by following
                  the principle of least privilege in our internal processes (only giving employees access to
                  the data absolutely necessary for their role).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>User Responsibilities:</strong> Despite our efforts, no system is 100% secure. It's important
                  that you also take precautions: Use a strong, unique password for Elastic Copilot and do
                  not share it. Keep your VS Code and extension updated to the latest versions. If you
                  suspect any unauthorized access to your account, notify us immediately. We also
                  encourage users to avoid sharing credentials or secrets with the AI unnecessarily –
                  treat it as you would any cloud-based tool with regard to sensitive information.
                </Box>
              </Typography>
            </Box>
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
              For more details on our security practices, please refer to the Elastic Copilot Security Policy or
              contact our security team at founders@elasticapp.io.
            </Typography>
          </Box>

          {/* International Data Transfers */}
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
              International Data Transfers
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
              Elastic AI is based in the United States, and our infrastructure is located in the U.S. As such, if
              you are accessing the Service from outside the United States, your information will be
              transferred to and processed in the United States (and potentially in other countries where
              our service providers are located, such as the countries where our third-party AI providers
              operate or backup data centers might reside). These countries may have data protection laws
              that are different from those of your country of residence, and in some cases, may not be as
              protective.
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
              We rely on legally-provided mechanisms to transfer data lawfully across borders. If you are in
              the European Economic Area (EEA), United Kingdom, or Switzerland (even though our primary
              market is U.S. and our Service is oriented to U.S. law compliance), we take steps to ensure
              appropriate safeguards for your personal data, such as standard contractual clauses approved
              by the European Commission, or verifying that recipients are certified under frameworks like the
              EU-U.S. Data Privacy Framework (if applicable). By using Elastic Copilot, you consent to the
              transfer of your information to the United States and other countries as needed for our
              operations. We will handle your information in accordance with this Privacy Policy wherever it
              is processed.
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
              If you have questions about international data transfer or require more information on the
              safeguards we use, please contact us.
            </Typography>
          </Box>

          {/* Your Rights and Choices */}
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
              Your Rights and Choices
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
              You have certain rights and choices regarding your personal information. We are committed to
              providing you with access and control over your data. These rights may vary depending on your
              jurisdiction (for example, users in California or the EU have specific rights under laws like the
              CCPA or GDPR), but we extend many of these principles generally:
            </Typography>
            <Box sx={{ marginLeft: '20px', marginBottom: '20px' }}>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Access and Portability:</strong> You can request a copy of the personal data we hold about
                  you, and information explaining how that data is used and shared. In many cases, you
                  can directly access and view your profile information and usage history by logging into
                  your Elastic Copilot account. If you require a more detailed export, contact us and we will
                  provide your data in a commonly used electronic format (subject to applicable law and
                  authentication of your identity).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Correction:</strong> You have the right to request correction of any inaccurate or incomplete
                  personal information. You can update some of your account information (like your name
                  or email) directly through your profile settings. For any other corrections, reach out to us
                  and we will rectify any inaccuracies.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Deletion:</strong> You can ask us to delete your personal information. As noted in the Data
                  Retention section, if you choose to delete your Elastic Copilot account, we will remove
                  personal data associated with your account (aside from data we are required or
                  permitted to retain for legal or internal business purposes). You may also contact us at
                  any time with a deletion request without deleting your whole account – for example, you
                  might ask us to delete specific content or logs associated with your usage. We will honor
                  deletion requests in accordance with applicable laws. Do note that deleting certain data
                  (like your account or usage history) might impact your ability to use the Service or see
                  past AI interactions.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Opt-Out of Processing:</strong> If you are covered by certain privacy laws, you may have the
                  right to object to or restrict our processing of your data (for example, to opt-out of any
                  sale of data, or certain types of tracking). Elastic Copilot does not sell personal data, but
                  if you have concerns about any specific processing, let us know. For analytics cookies
                  on our website, you can use browser settings or opt-out mechanisms to disable them.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Opt-Out of Marketing:</strong> As mentioned, you can unsubscribe from marketing emails at
                  any time by using the unsubscribe link or contacting us. Transactional emails (account,
                  billing, support) will still be sent as needed.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Privacy Mode and Data Sharing Choices:</strong> A very direct way to control your data with
                  Elastic Copilot is via the Privacy Mode setting. When on, it significantly limits data
                  collection and retention, as described. We encourage users, especially those working
                  with sensitive code, to enable Privacy Mode. Additionally, you can often configure what
                  is sent to the AI – for example, you can exclude certain files or folders from AI
                  suggestions (our extension may allow you to mark them or not include them in context).
                  Check our documentation for features that give you fine-grained control.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>California Privacy Rights:</strong> If you are a California resident, the California Consumer
                  Privacy Act (CCPA) provides you specific rights such as the right to know, right to delete,
                  and right to opt-out of sale of personal info. We have covered access and deletion
                  above. As we do not sell your data, the opt-out of sale is not applicable. We also will not
                  discriminate against you for exercising any privacy rights (meaning we won't deny
                  service or provide different quality of service just because you made a privacy request).
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>EU/UK GDPR Rights:</strong> If you are in the EEA or UK, our legal bases for processing your
                  data include: (i) your consent (for optional data you provide or marketing
                  communications), (ii) performance of a contract (providing you the Service you asked
                  for), and (iii) legitimate interests (for improving our product, ensuring security, etc.),
                  balanced with your rights. You have rights to access, rectify, erase, restrict, or object to
                  certain processing of your data, as well as the right to data portability. You also have the
                  right to lodge a complaint with your local data protection authority if you believe we have
                  violated your privacy rights.
                </Box>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#E5E5E5',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                <Box component="span">
                  <strong>Authentication:</strong> For any request to access, change, or delete personal data, we will
                  need to verify your identity to protect against unauthorized requests. This may involve
                  confirming control of your email or other verification information. We aim to respond to
                  requests within a reasonable timeframe, and within any timeframe required by law (e.g.,
                  within 30-45 days as applicable).
                </Box>
              </Typography>
            </Box>
          </Box>

          {/* Children's Privacy */}
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
              Children's Privacy
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
              Elastic Copilot is not directed to children under the age of 13 (or under the age of 16 in certain
              jurisdictions). We do not knowingly collect personal information from children. If you are under
              13, please do not use our Service or provide any personal information to us. If we learn that we
              have inadvertently collected personal data from a child under 13, we will take steps to delete
              such information as soon as possible. If you are a parent or guardian and you believe that your
              child under 13 (or under 16, as applicable) has provided us with personal information, please
              contact us so that we can delete the information.
            </Typography>
          </Box>

          {/* Changes to This Privacy Policy */}
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
              Changes to This Privacy Policy
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
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technologies, legal requirements, or other factors. When we update the policy, we will change
              the "Last Updated" date at the top of this document. If the changes are material, we will provide
              a more prominent notice (such as by email notification or a message within the application).
              Your continued use of Elastic Copilot after any changes to this Privacy Policy signifies
              your acceptance of the updated terms, to the extent permitted by law. We encourage you to
              review this page periodically to stay informed about how we are protecting your information.
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
              If you do not agree with any updates to the Privacy Policy, you should cease using the Service
              and may request deletion of your data as outlined above.
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
              By using Elastic Copilot, you acknowledge that you have read and understood this Privacy
              Policy. Thank you for trusting Elastic Copilot with your software development needs – we are
              committed to protecting your privacy and creating a secure experience for our users.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer isMobile={isMobile} />
    </React.Fragment>
  )
}
