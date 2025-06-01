'use client'
import React from 'react'
import { Box, Container, Typography, useTheme } from '@mui/material'
import { TopNav } from '@/app/(navigation)/TopNav'
import { Footer } from '@/app/(home-page-sections)/footer/Footer'
import { useClientMediaQuery } from '@/helpers/IsMobile'

export default function TermsOfUsePage() {
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
              Terms of Use
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
          {/* Acceptance of Terms */}
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
              Acceptance of Terms
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
              Welcome to Elastic Copilot. By using the Elastic Copilot service, including our VS Code
              extension, website, and any related services (&quot;Service&quot;), you agree to these Terms of Use
              (&quot;Terms&quot;). These Terms form a legally binding agreement between you (the user) and Elastic AI
              (the provider of Elastic Copilot). Please read these Terms carefully before using the Service.
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
              If you do not agree with any part of these Terms, you must not use Elastic Copilot. By
              accessing or using the Service, or by clicking &quot;I Agree&quot; (or a similar button) when prompted, you
              acknowledge that you have read, understood, and agreed to these Terms. These Terms
              incorporate our Privacy Policy (described below) and any other policies or guidelines we
              provide. If you are using Elastic Copilot on behalf of an organization, you represent that you
              have the authority to bind that organization to these Terms.
            </Typography>
          </Box>

          {/* Eligibility and Accounts */}
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
              Eligibility and Accounts
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
              Eligibility Requirements
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
              You must be at least 13 years old (or the minimum legal age in your
              jurisdiction) to use Elastic Copilot. If you are under the age of majority in your jurisdiction, you
              must have a parent or legal guardian&apos;s permission to use the Service. By accepting these
              Terms, you affirm that you are either at least 18 (or the age of majority) or have obtained
              necessary consent to use the Service. You also confirm that: (a) you have not been previously
              suspended or removed from the Service; and (b) your registration and use of the Service
              comply with all applicable laws and regulations. If you are using the Service on behalf of a
              company or other entity, you represent that you have authority to bind that entity to these Terms,
              in which case &quot;you&quot; refers to that entity.
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
              Account Registration
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
              To access most features, you will need to create an Elastic Copilot
              account. When registering, you agree to provide accurate, current, and complete information
              about yourself as prompted, including a valid email address and any other required details. You
              are responsible for maintaining the confidentiality of your account login credentials and for all
              activities that occur under your account. If you believe your account has been compromised or
              used without authorization, you must notify us immediately. We reserve the right to suspend or
              terminate any account we suspect is being used in an unauthorized or fraudulent manner.
            </Typography>
          </Box>

          {/* User Responsibilities and Acceptable Use */}
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
              User Responsibilities and Acceptable Use
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
              Your Responsibilities
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
              You are solely responsible for your use of Elastic Copilot, including all
              code, prompts, data, and content you input into the Service (&quot;User Content&quot;), and any output or
              suggestions generated by the AI. You agree to use the Service in compliance with these Terms,
              applicable laws, and ethical standards of software development. This means you will
              diligently review and test any code suggestions or automated actions provided by Elastic
              Copilot before applying them to your projects. You are responsible for the code and content
              you create or modify using Elastic Copilot, including ensuring that such code is accurate,
              secure, and does not infringe any third-party rights. We strongly advise that you maintain
              backup copies of your code and important data, as Elastic Copilot is not a replacement for
              proper version control and backup practices.
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
              Acceptable Use Policy
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
              When using Elastic Copilot, you agree NOT to engage in any
              prohibited conduct. Prohibited activities include, but are not limited to, the following:
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
                  <strong>Illegal Activities:</strong> You will not use the Service for any unlawful purpose or in violation
                  of any local, state, national, or international law or regulation. This includes not using
                  Elastic Copilot to create or distribute malicious code (viruses, malware) or to engage in
                  activities like fraud, hacking, or violating export control laws.
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
                  <strong>Intellectual Property Violations:</strong> You will not input or upload content that you do not
                  have the right to use or share. This means you won&apos;t use Elastic Copilot to process or
                  generate content that infringes any patent, trademark, trade secret, copyright, or other
                  proprietary rights of any party. You also agree not to misuse Elastic Copilot&apos;s outputs in
                  ways that violate others&apos; intellectual property. (Elastic Copilot&apos;s AI-generated suggestions
                  may include generic code patterns or snippets; you are responsible for reviewing outputs
                  to ensure they do not inadvertently infringe on third-party code or licenses.)
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
                  <strong>Harmful or Abusive Conduct:</strong> You will not use the Service to transmit any content that
                  is defamatory, harassing, threatening, or otherwise abuses or violates the rights of
                  others. You will not attempt to exploit, harm, or collect personal information about
                  others through the Service. Impersonating any person or entity or misrepresenting your
                  affiliation is prohibited.
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
                  <strong>Security Violations:</strong> You must not misuse the Service by introducing viruses, worms, or
                  any other malicious or technologically harmful material. You agree not to attempt to gain
                  unauthorized access to the Service or its related systems or networks, nor probe, scan,
                  or test the vulnerability of any system or network associated with Elastic Copilot.
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
                  <strong>Interference and Misuse:</strong> You will not interfere with or disrupt the integrity or
                  performance of the Service. This includes refraining from using any automated systems
                  (such as bots, scrapers, or offline readers) to access the Service in a manner that sends
                  more requests to our servers than a human can reasonably produce in the same time.
                  Also, you will not attempt to circumvent any content-filtering techniques or security
                  measures we employ.
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
                  <strong>Data Privacy Violations:</strong> You agree not to use Elastic Copilot in a manner that would
                  expose us or any third-party providers to personal data that is subject to special legal
                  protections (e.g., health information, sensitive personal data) unless you have obtained
                  all necessary consents or authorizations. In general, do not provide any personal data
                  to the Service that is not necessary for its operation. If you choose to integrate Elastic
                  Copilot with third-party platforms like Slack or Google Workspace, you will ensure such
                  use does not violate those platforms&apos; terms of use or privacy policies.
                </Box>
              </Typography>
            </Box>
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
              User Content and Conduct
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
              You retain ownership of any code or content you provide to Elastic
              Copilot. We do not claim ownership over your code. However, by submitting or inputting User
              Content into the Service (for example, providing code to get an AI suggestion or asking a coding
              question), you grant us a limited license to process and use that content for the purpose of
              providing the Service and generating AI-based results for you. This license is necessary
              for us to operate Elastic Copilot (for example, to send your code or prompt to our AI models and
              return results to you). We will not use your code or prompts for marketing or share them
              with other users. If you enable certain settings (see Privacy Mode in our Privacy Policy), we
              will not retain your code or prompts after providing you the service response. You also agree
              that any feedback, suggestions, or ideas you voluntarily provide about Elastic Copilot
              (&quot;Feedback&quot;) may be used by us, without obligation, to improve or enhance the Service. We
              may incorporate feedback into the Service or our documentation without further notice or
              compensation to you.
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
              We reserve the right to monitor usage of the Service for compliance with these Terms (while
              respecting your privacy as outlined in our Privacy Policy). If we determine that you have violated
              the Acceptable Use Policy or any other provision of these Terms, we may suspend or
              terminate your access to Elastic Copilot at our discretion (as detailed in the Termination section
              below). You understand that violation of certain laws may also result in referral to law
              enforcement authorities.
            </Typography>
          </Box>

          {/* License Grant and Restrictions */}
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
              License Grant and Restrictions
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
              License to Use Elastic Copilot
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
              Subject to your compliance with these Terms (and payment of
              any applicable fees), Elastic AI grants you a limited, non-exclusive, non-transferable,
              non-sublicensable, revocable license to install and use the Elastic Copilot VS Code
              extension and any related software we provide, and to access and use the Service, solely for
              your personal or internal business purposes. This license is provided for the sole purpose of
              enabling you to use and receive the benefit of Elastic Copilot as intended by these Terms and
              our documentation.
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
              License Restrictions
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
              Except as expressly permitted by these Terms or by applicable law, you
              agree not to do (or allow a third party to do) any of the following:
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
                  <strong>No Modification or Derivative Works:</strong> You will not copy, modify, translate, or create
                  derivative works of any part of the Service or included software.
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
                  <strong>No Reverse Engineering:</strong> You will not reverse engineer, decompile, disassemble, or
                  attempt to discover the source code or underlying algorithms of any portion of the
                  Service, except to the limited extent that applicable law expressly permits despite this
                  restriction.
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
                  <strong>No Redistribution or Sublicense:</strong> You will not distribute, sell, lease, sublicense, or
                  transfer any part of the Service to any third party. Your account is personal to you; you
                  may not share your login credentials or simultaneously use them across multiple
                  developers if not allowed by your plan.
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
                  <strong>No Removal of Notices:</strong> You will not remove, alter, or obscure any proprietary notices
                  (including copyright or trademark notices) in the Service or any content provided by
                  Elastic Copilot.
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
                  <strong>Limited Use of Outputs:</strong> Elastic Copilot may generate code, explanations, or other
                  outputs (&quot;Suggestions&quot;) in response to your inputs. While we do not claim ownership of
                  these Suggestions, they may be based on patterns learned from public source code or
                  data. You understand that Suggestions are provided for your convenience and may be
                  subject to open-source licenses or other third-party terms. You are responsible for
                  reviewing any AI-generated code before use, especially if you intend to include it in
                  proprietary projects. Elastic AI is not liable for any licensing obligations or
                  infringement issues that may arise from your use of Suggestions.
                </Box>
              </Typography>
            </Box>
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
              Ownership
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
              Except for your User Content, Elastic AI and its licensors retain all right, title, and
              interest in and to the Service, including all software, algorithms, documentation, website
              content, and Elastic Copilot branding (&quot;Materials&quot;). These Materials are protected by
              intellectual property laws. Elastic AI reserves all rights not expressly granted to you in these
              Terms. You acknowledge that no ownership of the Service or underlying technology is
              transferred to you, and that Elastic Copilot is licensed (not sold) to you. Any use of the Service
              not expressly permitted by these Terms is a breach of this agreement and may violate our
              intellectual property rights.
            </Typography>
          </Box>

          {/* Third-Party Services and Integrations */}
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
              Third-Party Services and Integrations
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
              Integrated AI Providers
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
              Elastic Copilot allows you to choose from multiple AI model providers
              (including OpenAI&apos;s GPT series, Anthropic&apos;s Claude, and Google&apos;s Gemini models) to power
              code completions and other AI features. When you use Elastic Copilot to generate code or
              analyze code, the Service may send code snippets, prompts, and context from your
              environment to these third-party AI providers&apos; servers to obtain an AI-generated result. We have
              agreements with OpenAI, Anthropic, and Google (Vertex AI) to ensure they do not retain
              or use your data beyond what is necessary to generate the response. In other words, the
              code and prompts you send through Elastic Copilot are processed by these AI providers but not
              stored on their end; they have zero data retention for our requests. By using the Service, you
              also agree to the terms and policies of the relevant AI provider when their model is used (e.g.,
              OpenAI&apos;s or Anthropic&apos;s service terms). We are not responsible for the services or actions of
              these third-party AI providers, but we take precautions (like the agreements mentioned) to
              protect your data when interfacing with them.
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
              Other Third-Party Integrations
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
              Elastic Copilot may integrate with additional third-party
              services to enhance functionality:
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
                  <strong>Slack and Google Workspace:</strong> Elastic Copilot may offer optional integration with
                  collaboration tools such as Slack (for notifications or interacting with the AI via chat) and
                  Google Workspace (for example, logging in with Google or accessing Google Drive/Docs
                  if relevant to coding tasks). If you choose to connect Elastic Copilot to these services, we
                  will request the necessary permissions and data (such as access to a specific Slack
                  channel or your Google account basic profile). We will use any such data solely to
                  provide the integrated feature you have enabled. Your use of those features must
                  comply with the third party&apos;s terms (e.g., Slack&apos;s or Google&apos;s terms of service). We do not
                  assume any liability for how those external services handle your data. You can
                  disconnect integrations at any time.
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
                  <strong>Payment Processor (Stripe):</strong> If you subscribe to a paid plan, payments are processed
                  by a secure third-party payment processor (such as Stripe). You might be redirected to
                  Stripe or provide payment details through our interface that are then sent to Stripe. We
                  do not store your full credit card information on our systems; any payment
                  information is handled by Stripe in accordance with their privacy policy. By paying for
                  Elastic Copilot, you agree to Stripe&apos;s terms and conditions for payment processing.
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
                  <strong>Hosting and Analytics (e.g., Vercel, Sentry):</strong> Our website and certain cloud functions
                  of the Service may be hosted on platforms like Vercel, and we may use analytics or error
                  tracking services such as Sentry. These providers may incidentally process some data
                  (for example, your IP address when you visit our site, or error logs that include user
                  identifiers or snippet of code causing an error). We use these services to maintain and
                  improve Elastic Copilot&apos;s performance and reliability. We strive to limit any personal or
                  code data included in such logs, and we configure these tools to respect user privacy
                  (especially if Privacy Mode is enabled – see Privacy Policy).
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
                  <strong>Other Services:</strong> Elastic Copilot could integrate with other development tools or services
                  (e.g., GitHub, GitLab, package registries, etc.) as part of its functionality. If we
                  incorporate any such integration, we will clearly inform you and obtain any necessary
                  permissions. Your use of those third-party services through our Service is subject to their
                  terms as well.
                </Box>
              </Typography>
            </Box>
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
              Third-Party Content
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
              The Service might display or provide content from third-party sources
              (such as documentation snippets, web search results, or open-source code suggestions). This
              content is provided &quot;as-is&quot; for your convenience. Elastic AI does not endorse or guarantee the
              accuracy of third-party content. You are responsible for complying with any third-party licenses
              or terms applicable to content retrieved or suggested via Elastic Copilot (for example, if Elastic
              Copilot provides a code snippet that is under an open-source license, you are responsible for
              adhering to that license if you use the code).
            </Typography>
          </Box>

          {/* Payments, Subscriptions, and Cancellation */}
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
              Payments, Subscriptions, and Cancellation
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
              Paid Plans
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
              Elastic Copilot offers free and paid subscription plans. Details of features and limits
              for each plan (e.g., number of AI calls or premium model usage) are described on our website
              and may be updated from time to time. By subscribing to a paid plan, you agree to pay the
              applicable fees. Paid plan fees (such as monthly or annual subscription costs, or usage-based
              fees for premium AI calls) will be clearly disclosed at the time of purchase. You will have an
              opportunity to review and accept the fees prior to being charged. All fees are stated in U.S.
              dollars unless otherwise specified. Prices are subject to change, but we will provide advance
              notice of any fee changes (e.g., via email or through the Service) in accordance with applicable
              laws. If you do not agree to a fee change, you may cancel your subscription before the new fees
              take effect; continued use of the Service after the effective date constitutes acceptance of the
              new prices.
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
              Billing and Payment
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
              When you subscribe, you must provide current, complete, and accurate
              billing information. By providing a payment method (such as a credit card), you authorize us (or
              our payment processor) to charge that method for all fees due for your use of Elastic Copilot.
              Subscriptions will auto-renew at the end of each billing cycle (monthly or annually, depending
              on your plan) unless you cancel beforehand. We will charge your provided payment method at
              the start of each renewal period. If a payment fails (e.g., due to an expired card or insufficient
              funds), we may attempt to re-charge after a short period. If payment remains unsuccessful, we
              may downgrade or suspend your account for non-payment. You are responsible for any taxes or
              duties (e.g., sales tax, VAT) associated with your purchase, and such taxes may be charged in
              addition to the listed price.
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
              Cancellation
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
              You can cancel your subscription at any time through your account settings or by
              contacting support. If you cancel a monthly subscription, the cancellation will take effect at the
              end of the current billing month; you will retain access to paid features until that period ends. For
              annual subscriptions, you will retain access until the end of the paid-up annual term. We
              generally do not offer refunds for unused time on a subscription or unused usage quotas,
              except where required by law or explicitly stated in an applicable promotion. For example, if you
              live in a jurisdiction that mandates a cooling-off period or refunds for online subscriptions, we will
              honor our obligations as required by law. After cancellation or downgrading, you will lose access
              to features exclusive to the paid plan (and your account may revert to a Free tier with limited
              functionality).
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
              Free Trials and Promotions
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
              We may offer free trials or promotional offers for paid plans. Such
              offers are for a limited time and are subject to eligibility and any additional terms we specify.
              After a free trial period ends, if you have not cancelled, you may be automatically enrolled into a
              paid subscription and charged, unless otherwise stated. We reserve the right to modify or
              terminate promotional offers at our discretion.
            </Typography>
          </Box>

          {/* Termination and Suspension */}
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
              Termination and Suspension
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
              By You
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
              You may stop using Elastic Copilot at any time. You may also delete your account by
              following the process in our app or contacting support. Terminating your account will result in
              deactivation or deletion of your account and denial of any future access to the Service. Keep in
              mind that if you simply uninstall the extension or stop using the Service without formally
              cancelling any subscription, you may still be charged if you had an active paid plan – so please
              properly cancel or delete your account to ensure termination of billing.
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
              By Us
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
              We reserve the right to suspend or terminate your access to the Service (in whole or in
              part) under the following circumstances: (a) if you breach any provision of these Terms or violate
              applicable law; (b) if your use of Elastic Copilot poses a security risk or could adversely impact
              the Service or any other users; (c) if required by law enforcement or government request; or (d)
              for extended periods of inactivity on a free account. In most cases, we will attempt to notify you
              of the violation and provide an opportunity to remedy it, but for serious or repeat violations we
              may suspend/terminate immediately without notice. Additionally, we may terminate the Service
              or your account if we discontinue the Elastic Copilot offering altogether (though we have no
              plans to do so, and will give advance notice if this occurs).
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
              Effect of Termination
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
              Upon termination of your account for any reason: (a) License End –
              any rights granted to you under these Terms will immediately end, and you must cease all use
              of Elastic Copilot and uninstall any software provided as part of the Service; (b) Access
              Termination – we may disable your account and you will lose access to the Service and any
              data or content (including code snippets, chat history, or development history) stored by the
              Service. Please ensure you have locally saved any important data or code from the Service
              prior to termination, as we are not responsible for providing copies of your data post-termination;
              (c) Fees – if termination occurs due to your breach or misconduct, no refund will be provided for
              any fees you have paid, and any unpaid fees for the remaining term of your subscription
              become due immediately. If termination is by us without cause (e.g., a service discontinuation)
              and you are a paid user, we will provide a pro-rata refund for the remaining unused portion of
              your subscription; (d) Surviving Provisions – certain sections of these Terms will survive
              termination. All provisions regarding intellectual property ownership, disclaimers, indemnity,
              limitations of liability, and governing law survive the termination of these Terms and remain
              in effect.
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
              After termination, we may permanently delete your account data and content from our systems,
              though residual copies may persist in backups for a limited time. We are not liable to you or any
              third party for termination of your access to the Service (subject to any refund obligations stated
              above). If your account was terminated by us for violation of these Terms, you are prohibited
              from creating a new account to use the Service without our express permission.
            </Typography>
          </Box>

          {/* Disclaimers of Warranties */}
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
              Disclaimers of Warranties
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
              Service Provided &quot;AS IS&quot;
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
              Elastic Copilot is provided on an &quot;as is&quot; and &quot;as available&quot; basis.
              To the maximum extent permitted by law, Elastic AI disclaims all warranties and
              conditions, express or implied, regarding the Service. We do not guarantee that Elastic
              Copilot will meet your requirements, achieve any particular results, or operate uninterrupted,
              secure, or error-free.
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
              In particular, while Elastic Copilot strives to provide useful and accurate code suggestions and
              automations, we make no warranty that the AI-generated outputs (&quot;Suggestions&quot;) are
              correct, reliable, or suitable for any purpose. Using code or advice from Elastic Copilot is at
              your own risk. You are expected to review, test, and validate any AI-generated code before
              using it in production. Elastic AI disclaims any responsibility for errors or bugs in your
              software that result from following Elastic Copilot&apos;s suggestions. We also do not warrant that the
              Service will detect or prevent all potential issues (such as security vulnerabilities or logical
              errors) in your code.
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
              No Implied Warranties
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
              We expressly disclaim any and all implied warranties or conditions,
              including any implied warranties of merchantability, fitness for a particular purpose, title,
              and non-infringement. No information or advice (whether oral or written) obtained from Elastic
              AI or through the Service shall create any warranty not expressly stated in these Terms. You
              understand that AI technology has inherent limitations – for example, AI suggestions might
              be outdated, biased, or otherwise imperfect. Elastic AI is not responsible for any content or
              information you obtain through the Service, and you bear all risk associated with your use of any
              Suggestions or outputs.
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
              Third-Party Services
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
              We make no warranty or endorsement about any third-party services or
              content accessed through Elastic Copilot. For example, we do not guarantee the availability or
              accuracy of any external documentation, web content, or third-party API results that the Service
              might present to you. Those are provided &quot;as is&quot; and governed by the third parties&apos; terms and
              privacy policies.
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
              Some jurisdictions do not allow the exclusion of certain warranties, so some of the above
              disclaimers may not apply to you. In such cases, any implied warranties are limited to the
              minimum scope and duration permitted by applicable law.
            </Typography>
          </Box>

          {/* Limitation of Liability */}
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
              Limitation of Liability
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
              Limited Liability
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
              To the fullest extent permitted by law, in no event will Elastic AI or its
              affiliates, officers, employees, or agents be liable to you for any indirect, incidental,
              special, consequential, or punitive damages (including damages for lost profits, revenue,
              goodwill, data, or other intangible losses) arising out of or related to your use of (or inability to
              use) Elastic Copilot, regardless of the theory of liability (contract, tort, negligence, strict liability,
              or otherwise) and even if we have been advised of the possibility of such damages. Elastic
              Copilot involves sophisticated software and third-party integrations; you acknowledge that we
              are not liable for any damages resulting from errors, downtime, data loss, or
              unauthorized access that occur despite our security and privacy measures.
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
              Cap on Liability
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
              To the extent that liability cannot be completely disclaimed, the aggregate
              liability of Elastic AI to you for all claims arising out of or related to the Service or these Terms
              will not exceed the greater of: (a) the total amount you paid to us for your use of Elastic Copilot
              in the six (6) months prior to the event giving rise to the liability; or (b) USD $100. If you have
              not paid any fee (for example, using the free tier), Elastic AI&apos;s total liability to you shall not
              exceed $100. This limitation applies collectively to all types of claims you may bring (e.g.,
              contract, tort, etc.).
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
              Allocation of Risk
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
              You acknowledge that the fees (if any) charged for Elastic Copilot reflect
              this allocation of risk and the limitations of liability specified herein, and that we would not
              be able to provide the Service on an economically feasible basis without such limitations.
              You agree that these limitations shall apply even if any limited remedy is found to have failed of
              its essential purpose.
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
              Exceptions
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
              Nothing in these Terms is intended to exclude or limit liability that cannot be
              excluded under law – for example, we do not limit liability for our intentional misconduct or for
              personal injury caused by our gross negligence. However, to the extent the law allows, we
              exclude all such other types of liability. Some jurisdictions do not allow the limitation or exclusion
              of liability for incidental or consequential damages, so the above limitation may not apply to you.
              In those jurisdictions, Elastic AI&apos;s liability will be limited to the greatest extent permitted by law.
            </Typography>
          </Box>

          {/* Indemnification */}
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
              Indemnification
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
              You agree to defend, indemnify, and hold harmless Elastic AI and its affiliates, officers,
              agents, partners, and employees from and against any and all claims, liabilities, damages,
              losses, and expenses (including reasonable attorneys&apos; fees and costs) arising out of or in any
              way connected with: (a) your use of the Service (including any actions taken by your account,
              and any code or content generated or modified using Elastic Copilot); (b) your violation of
              these Terms or of any applicable law or regulation; (c) your violation of any rights of any
              third party, including intellectual property rights or privacy rights, through your use of Elastic
              Copilot or any User Content you provide; or (d) any misuse of the Service by a third party
              using your account credentials (whether or not you authorized that use). We reserve the right, at
              our own expense, to assume the exclusive defense and control of any matter otherwise
              subject to indemnification by you, in which case you agree to cooperate with us in asserting any
              available defenses. This indemnity obligation will survive any termination or expiration of your
              account or these Terms.
            </Typography>
          </Box>

          {/* Governing Law and Dispute Resolution */}
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
              Governing Law and Dispute Resolution
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
              Governing Law
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
              These Terms and any dispute arising out of or relating to the Service or these
              Terms will be governed by the laws of the State of California, U.S.A., without regard to its
              conflict of law principles. If you use the Service outside the United States, you do so on your
              own initiative and are responsible for compliance with any local laws. You expressly agree to the
              transfer and processing of your data in the United States in accordance with our Privacy Policy
              (see Privacy Policy for details on data location). The United Nations Convention on Contracts
              for the International Sale of Goods does not apply to these Terms.
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
              Dispute Resolution; Arbitration
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
              Please read this section carefully, as it affects your legal
              rights. You and Elastic AI agree that any dispute, claim, or controversy arising out of or
              relating to these Terms or the use of the Service shall be resolved by binding arbitration on
              an individual basis, except as set forth below. This means you are waiving the right to a jury
              trial and to participate in a class action for such disputes.
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
                  <strong>Arbitration Process:</strong> If a dispute arises, the parties will first attempt to resolve it
                  informally. If we cannot resolve the dispute informally, either party may initiate binding
                  arbitration administered by a recognized arbitration provider (such as the American
                  Arbitration Association) under its rules. The arbitration will be conducted in English. The
                  seat or legal place of arbitration will be in California, unless otherwise required by law or
                  mutually agreed. Each party is responsible for their own arbitration fees, attorneys&apos; fees,
                  and costs, consistent with the arbitration provider&apos;s rules, except that the arbitrator may
                  award fees and costs to the prevailing party where allowed by law.
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
                  <strong>Exceptions:</strong> Either party may choose to bring an individual claim in small claims court
                  if the claim is eligible, rather than through arbitration. Additionally, both you and Elastic
                  AI retain the right to seek injunctive or equitable relief in a court of competent jurisdiction
                  to prevent actual or threatened infringement, misappropriation, or violation of intellectual
                  property rights or data security.
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
                  <strong>Class Action Waiver:</strong> You and Elastic AI agree that any claims must be brought on
                  an individual basis and not as a plaintiff or class member in any purported class
                  or representative proceeding. The arbitrator shall not consolidate the claims of
                  multiple parties or preside over any form of a representative or class proceeding. If this
                  class action waiver is found unenforceable, then the entirety of the arbitration agreement
                  shall be null and void, and the dispute must be brought in court.
                </Box>
              </Typography>
            </Box>
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
              Jurisdiction and Venue
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
              In the event the arbitration provision is found unenforceable or if you
              opt-out of arbitration (you have the right to opt out of the arbitration agreement by sending us
              written notice within 30 days of first accepting these Terms, stating that you decline arbitration),
              then you agree that any suit or proceeding shall be resolved exclusively in the federal or
              state courts located in the State of California, County of San Francisco (or another venue we
              designate for Elastic AI&apos;s principal business). You consent to personal jurisdiction in these
              courts.
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
              Time Limit to Bring Claims
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
              You agree that any claim arising out of or related to the Service or
              these Terms must be filed within one (1) year after such claim arose; otherwise, the claim is
              permanently barred. This does not apply where prohibited by law.
            </Typography>
          </Box>

          {/* Changes to the Service or Terms */}
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
              Changes to the Service or Terms
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
              Modifications to the Service
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
              Elastic Copilot is an evolving service. We reserve the right to
              change, update, or discontinue the Service (or any part of it) at any time, with or without prior
              notice. We may add or remove functionalities or features, or we may suspend or stop the
              Service altogether. For any material changes that significantly impact the use of the Service, we
              will endeavor to provide notice (for example, via our website, in-app notification, or email). You
              agree that Elastic AI will not be liable to you or any third party for any modification, suspension,
              or discontinuation of the Service, except that if you are a paying subscriber and we discontinue
              the Service in its entirety, we will provide a pro-rata refund for any unused portion of your
              subscription.
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
              Modifications to Terms
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
              We may revise these Terms from time to time. If we make material
              changes, we will notify you by posting the updated Terms on our website (under &quot;Legal&quot; or
              similar section) and updating the &quot;Last Updated&quot; date at the top, or by other appropriate means.
              It is your responsibility to review these Terms periodically. By continuing to use Elastic
              Copilot after new Terms become effective, you agree to be bound by the revised Terms. If you
              do not agree to the updated Terms, you must stop using the Service and, if applicable, cancel
              your subscription. For significant changes, we may provide an opportunity to explicitly accept
              the new Terms, but your continued use of the Service will constitute acceptance regardless.
            </Typography>
          </Box>

          {/* Miscellaneous */}
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
              Miscellaneous
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
              Entire Agreement
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
              These Terms (along with our Privacy Policy and any additional guidelines or
              terms provided for specific features) constitute the entire agreement between you and Elastic AI
              regarding the Service, and supersede all prior agreements (whether written or oral) relating to
              the subject matter. Any additional or different terms proposed by you (for example, in a
              purchase order) are rejected unless expressly agreed to in writing by Elastic AI.
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
              Severability
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
              If any provision of these Terms is held to be invalid or unenforceable, that
              provision will be enforced to the maximum extent permissible and the remaining provisions of
              these Terms will remain in full force and effect.
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
              Waiver
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
              Our failure to enforce any right or provision of these Terms will not be deemed a waiver
              of such right or provision. A waiver is only effective if in writing and signed by an authorized
              representative of Elastic AI.
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
              Assignment
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
              You may not assign or transfer these Terms or your rights or obligations under these
              Terms, in whole or in part, without our prior written consent. We may freely assign these Terms,
              or any of our rights and obligations hereunder, to any party (including in connection with a
              merger, acquisition, or sale of assets, or by operation of law).
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
              Relationship of Parties
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
              You and Elastic AI are independent contractors, and these Terms do
              not create a partnership, joint venture, employment, franchise, or agency relationship. Neither
              party has the authority to bind the other or incur obligations on the other&apos;s behalf.
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
              Force Majeure
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
              Elastic AI will not be liable for any failure or delay in performance to the extent
              caused by circumstances beyond our reasonable control, including but not limited to acts of
              God, natural disasters, war, terrorism, riots, labor conditions, governmental actions, internet or
              utility failures, or any other force majeure event.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer isMobile={isMobile} />
    </React.Fragment>
  )
}
