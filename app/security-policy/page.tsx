'use client'
import React from 'react'
import { Box, Container, Typography, useTheme } from '@mui/material'
import { TopNav } from '@/app/(navigation)/TopNav'
import { Footer } from '@/app/(home-page-sections)/footer/Footer'
import { useClientMediaQuery } from '@/helpers/IsMobile'

export default function SecurityPolicyPage() {
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
              Security Policy
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
              Elastic Copilot is an AI-powered software engineering assistant that integrates within your VS
              Code environment. We understand that the security of your source code, data, and
              development workflow is paramount. This Security Policy outlines the measures we take to
              protect your information and ensure the integrity, availability, and confidentiality of the Elastic
              Copilot Service. It covers our infrastructure security practices, how we handle code and data
              (including local vs. cloud processing), and the controls we provide to you as a user or enterprise
              to manage security.
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
              Our approach to security involves both robust technology and transparent processes. While no
              system can be 100% immune to threats, we are committed to continuously improving our
              security posture. If you have any questions or discover any potential vulnerabilities, please
              contact our security team at founders@elasticapp.io. We also maintain a responsible
              disclosure program (see &quot;Vulnerability Disclosure&quot; below) for researchers to report issues.
            </Typography>
          </Box>

          {/* Infrastructure Security */}
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
              Infrastructure Security
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
              <strong>Hosting Environment:</strong> Elastic Copilot&apos;s backend systems are hosted on Google Cloud
              Platform (GCP) in the United States. We chose GCP for its strong security track record and
              compliance certifications. Our servers (including application servers, databases, and storage)
              run in GCP&apos;s U.S. data centers, which employ state-of-the-art physical and environmental
              security controls. Production systems are in a virtual private cloud (VPC) with network access
              controls in place. We also isolate environments (e.g., development, staging, production) to limit
              exposure and test changes safely before deploying to production.
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
              <strong>Server Security:</strong> All our servers are configured according to security best practices:
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
                  We keep operating systems and software dependencies updated with the latest security
                  patches. Security updates are applied promptly, especially for critical vulnerabilities.
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
                  Firewalls and network security groups are used to restrict inbound and outbound traffic.
                  Only required ports/protocols are open, and internal services are segmented from the
                  public internet.
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
                  We use encryption at rest for data storage. For example, databases and disk volumes
                  in GCP are encrypted using strong encryption keys. Likewise, backups are encrypted.
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
                  Encryption in transit is enforced for all communication. APIs and data transfers use
                  HTTPS/TLS with robust ciphers. Internal service-to-service communication also uses
                  TLS or happens on isolated networks not exposed externally.
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
                  Access to production infrastructure is strictly limited to a few authorized engineers. We
                  use secure methods (like SSH keys or VPN with MFA) for any administrative access.
                  Administrative actions on servers and databases are logged and monitored.
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
                  Secrets and configuration (such as API keys for third-party services, database
                  credentials) are managed via secure secrets management systems. They are not stored
                  in code or in plain text; we utilize environment management provided by GCP (like
                  Secret Manager) so that even within our code, sensitive credentials are fetched securely
                  at runtime.
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
                  We regularly perform security audits and penetration testing. At least annually, we
                  engage independent third-party security experts to assess our systems. We address any
                  findings with high priority. (As our product and company mature, we aim to achieve
                  relevant security certifications, such as SOC 2 Type II, to validate our practices.)
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
              <strong>Monitoring and Incident Response:</strong> We have monitoring in place for our infrastructure&apos;s
              health and security. This includes:
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
                  <strong>Intrusion Detection:</strong> We utilize monitoring services (like GCP&apos;s Cloud
                  Monitoring/Logging, and third-party services such as Datadog) to alert on unusual
                  patterns, such as multiple failed login attempts, spikes in error rates, or anomalous
                  network traffic.
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
                  <strong>Audit Logs:</strong> Important actions, especially those touching user data or system
                  configurations, are logged. For instance, access to production databases or changes to
                  security groups are recorded. Logs from various sources (application logs, security
                  events, etc.) are aggregated and stored securely for analysis.
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
                  <strong>Response Plan:</strong> We maintain an incident response plan. If a security incident is
                  detected (such as a suspected breach or data leakage), we have defined procedures to
                  contain and investigate the issue, mitigate any damage, and notify affected users and
                  authorities as applicable by law. We treat even potential incidents with urgency – initial
                  investigation happens immediately, and a severity is assigned with corresponding
                  escalation (e.g., on-call engineers and security leads are paged for critical incidents
                  24/7).
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
                  <strong>Resilience and Backups:</strong> We perform regular backups of critical data to ensure
                  recoverability in case of data loss incident. Backups are encrypted and tested
                  periodically. We also architect the service with redundancy where possible: for instance,
                  multiple instances behind a load balancer, fallback mechanisms for AI providers (if one
                  provider is down, we can route requests to another, etc.), to maintain availability.
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
              <strong>Subprocessor Management:</strong> We list and manage all subprocessors (third-party services that
              may process data). Each of these is evaluated for security posture. For example, we use Stripe
              for payments (which is PCI compliant), OpenAI/Anthropic for AI (with strict data handling
              agreements), Sentry for error logging, etc. (see Privacy Policy for the list of integrations). We
              ensure each subprocessor is under a binding agreement to implement adequate security
              measures and confidentiality. Where possible, we minimize the data shared and use
              configuration options to enhance privacy (e.g., instructing Sentry to scrub sensitive data from
              logs).
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
              Our infrastructure is built with the assumption that even if one component is compromised,
              layers of defense limit the blast radius (principle of defense-in-depth). We continuously evaluate
              new security tools and practices to protect against emerging threats.
            </Typography>
          </Box>

          {/* Local Code Indexing and Data Handling */}
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
              Local Code Indexing and Data Handling
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
              Elastic Copilot is designed with a privacy-first architecture when it comes to your source code.
              We utilize local code indexing, which means:
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
                  The Elastic Copilot extension running in your VS Code will index your project&apos;s codebase
                  on your local machine. This indexing involves analyzing your files (and possibly
                  generating embeddings or summaries of them) so that the AI can quickly retrieve
                  relevant context for your queries.
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
                  <strong>Local Processing:</strong> The indexing process happens on your computer, not on our cloud
                  servers. This ensures that your raw source code does not need to be uploaded to us
                  just for analysis or search purposes. When you ask a question or for a code suggestion,
                  the extension will locally determine which parts of your code are relevant and only send
                  those relevant snippets (along with your prompt) to the AI service.
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
                  For example, if you ask &quot;Find usage of function X in my code&quot;, the extension might scan
                  your code locally, find references, and only send the minimal necessary data (like file
                  names and line references or small code excerpts) to our servers or to the AI model, if at
                  all needed. Many such queries can be answered by the extension itself without
                  transmitting code.
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
                  <strong>No Whole Repo Uploads:</strong> Unlike some tools that might upload your entire repository to
                  a cloud server for analysis, Elastic Copilot does not do that. We believe your code
                  should stay with you unless there&apos;s a very good reason to transmit it.
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
                  <strong>When Code is Sent Out:</strong> There are cases when sending code outside your machine is
                  necessary – primarily, when obtaining an AI-generated response. In those cases:
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        Only the portion of code or context that&apos;s necessary for the AI to perform the task is
                        sent. For instance, if you ask &quot;Explain this function&quot; and have a function highlighted, the
                        extension will send just that function (and perhaps some relevant context around it) to
                        our cloud service which then routes to an AI model.
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        We never send your entire project in one go to any third-party. We break down
                        requests to only what&apos;s needed for the specific completion or answer.
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        All data in transit is encrypted (TLS) as mentioned, so your code is protected during
                        transfer.
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
                  <strong>Privacy Mode Enforcement:</strong> If you enable Privacy Mode (either as an individual or enforced by
                  your enterprise admin), the extension and our backend coordinate to ensure no code content
                  is persisted on our side. The local indexing remains local. On the server, any transient
                  handling of your code (like a snippet passed to an AI model) is done in-memory and not logged
                  to disk. Additionally, our servers tag your requests as Privacy Mode, which triggers additional
                  protections:
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        No caching of your prompts or the AI&apos;s responses on the server. (Normally, we might
                        cache recent prompts to allow features like &quot;history&quot; in the chat – but for Privacy Mode,
                        that cache is either disabled or kept client-side.)
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        Stripping code from logs: our server&apos;s logs for Privacy Mode requests will not store code.
                        They might record that a request happened and its size or processing time, but not the
                        content. We have built filters that detect code-like patterns in logs and redact them for
                        Privacy Mode users.
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        We take the Privacy Mode guarantee seriously – in fact, a significant portion of our users
                        use it. Our engineering processes include testing to ensure that new features do not
                        inadvertently log code when Privacy Mode is on. We also have architecture in place (like
                        segregated data flows) that helps enforce these guarantees.
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
                  <strong>Data Minimization:</strong> Even outside of Privacy Mode, we follow the principle of data minimization:
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        If a feature can be implemented without sending data to the cloud, we do it that way.
                        E.g., simple code searches or static analyses might be done locally.
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        For features that leverage cloud (like AI completions), we try to limit what data is sent
                        and stored. For example, if the AI needs to see a large file, we might abstract or truncate
                        parts not immediately relevant.
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        We also allow you to exclude certain folders or files from being used by Elastic Copilot
                        (through settings or ignore lists). For instance, you might exclude the node_modules
                        directory or any file with secrets. Excluded content won&apos;t be sent to the AI or even
                        indexed.
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
                      <Box component="span" sx={{ marginRight: '10px' }}>●</Box>
                      <Box component="span">
                        If you use the in-editor browser or terminal features, note that those are essentially your
                        environment – when you run a terminal command via Copilot, it&apos;s executing locally in VS
                        Code as if you typed it. We do not intercept or log the output of your terminal commands
                        (unless it&apos;s needed for the AI to respond and even then it&apos;s treated as any other prompt).
                        Similarly, the in-editor browser is a local tool – any browsing you do there is like using a
                        regular browser (though keep in mind if you navigate to external sites, those sites will
                        see your traffic like a normal web browser would).
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
                fontWeight: 'bold',
              }}
            >
              In summary, your code stays as much on your machine as possible. We transmit only
              what&apos;s needed, and we have features to give you control over that transmission. Our aim is to
              make Elastic Copilot useful without compromising the privacy of your source code.
            </Typography>
          </Box>

          {/* Configurable Data Sharing */}
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
              Configurable Data Sharing
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
              We recognize that different users and organizations have different risk tolerances and
              compliance requirements. Elastic Copilot provides configurable settings to adjust what data is
              shared with us or third-party services, giving you control over your information. Key configurable
              data sharing aspects include:
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
                  <strong>Privacy Mode:</strong> As discussed, this is a single switch to significantly limit data retention
                  and sharing. It&apos;s configurable per account (and in enterprise, can be enforced
                  organization-wide). We encourage users to turn this on if they prefer that none of their
                  code is stored by us even temporarily. When off, some data might be retained for
                  improving the service (as described in Privacy Policy), but when on, we effectively
                  operate in a stateless mode for your content.
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
                  <strong>Telemetry Opt-Out:</strong> We allow users to opt out of non-essential telemetry. In your
                  settings, you might find options like &quot;Send usage statistics&quot; or &quot;Help improve Elastic
                  Copilot by sending anonymized data.&quot; You can choose to disable these. When disabled,
                  the extension will minimize or stop sending usage metrics or device info that are
                  optional. (Critical analytics for service function, like counting API usage for your plan
                  limits, will still occur, but those are tied to providing the service.)
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
                  <strong>File/Directory Exclusions:</strong> You can configure patterns or specific files that Elastic
                  Copilot should ignore. For example, you might list secrets files, or large data files, or any
                  proprietary code you don&apos;t want even the AI to see. The extension will then exclude
                  those from context when constructing prompts. This gives you fine-grained control:
                  maybe you&apos;re okay using Copilot on most of your code but not on a specific sensitive
                  module—just exclude it.
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
                  <strong>Manual Control of Queries:</strong> You always have the choice of what query to ask and what
                  code to include. Elastic Copilot doesn&apos;t automatically send your code anywhere without
                  you triggering a feature. For instance, it doesn&apos;t just scan your entire project in the cloud
                  by itself; it reacts to your commands. If you are working on particularly sensitive code,
                  you might choose not to use the AI features on that part at all.
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
                  <strong>On-Premises Option:</strong> For enterprise customers with strict data governance, we are
                  exploring offering an on-prem or self-hosted deployment of Elastic Copilot. This would
                  allow all data processing to occur within your organization&apos;s environment (including
                  possibly running AI models on infrastructure you control). If available, enterprises could
                  choose this option to ensure no code ever leaves their private network. (Contact our
                  sales team for discussion of enterprise on-prem solutions.)
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
                  <strong>Logging Levels:</strong> In some cases, advanced users or admins can adjust logging verbosity
                  on the extension. For example, turning on a debug mode might log more info locally for
                  troubleshooting but that log stays on your machine. Conversely, running in a high-privacy
                  mode might suppress even certain local logs that could contain code.
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
                  <strong>Integration Permissions:</strong> When connecting to third-party services (Slack, Google, etc.),
                  you often can choose scopes or what data you allow to be shared. For instance, Slack
                  might allow you to restrict the channels the Copilot bot can access. Google OAuth allows
                  you to scope if we only get your basic profile versus broader permissions. We request
                  only the minimum scopes needed, and you have to approve them. If you&apos;re not
                  comfortable, you can deny or revoke those permissions, and Elastic Copilot will respect
                  that (the integration simply won&apos;t function without them, but it&apos;s your choice).
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
              <strong>Transparency of Data Flows:</strong> We document and communicate what data gets shared when
              you use a feature. Our UI or docs may include notes like &quot;this action will send the selected code
              to the AI for analysis.&quot; We want you to understand and configure what happens with your
              data. In the Privacy Policy, we list out exactly what third-party services see (e.g., OpenAI sees
              code for completions, Stripe sees email and billing info, etc.). There shouldn&apos;t be any mystery. If
              something is unclear, users can ask us and we&apos;ll clarify what data is involved.
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
              By providing these configurations, Elastic Copilot can be tailored to environments ranging from
              open-source hobby projects (where sharing and learning from usage is generally fine) to highly
              regulated corporate projects (where data sharing must be minimized). You have the steering
              wheel in terms of data sharing, and we endeavor to make those controls easy to find and use.
            </Typography>
          </Box>

          {/* Permission-Based Actions */}
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
              Permission-Based Actions
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
              Elastic Copilot is a powerful assistant that can do more than just suggest code – it can
              potentially run commands, modify files, or automate tasks. With great power comes great
              responsibility, so we have built permission checkpoints into the assistant&apos;s operation. We want
              to ensure you remain in full control of any action that affects your system or code.
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
              Key aspects of our permission-based approach:
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
                  <strong>Read-Only by Default:</strong> By default, Elastic Copilot will not make any permanent changes
                  to your code or system without explicit instruction. It may suggest code edits, but those
                  edits are applied only if you accept them. It may show command outputs, but not
                  execute commands unless you confirm.
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
                  <strong>User Confirmation Prompts:</strong> When an Elastic Copilot feature attempts a privileged
                  action, the system will pause and ask for your confirmation. For example:
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
                        If the AI suggests &quot;I can create a new file with the refactored code. Do you want
                        to proceed?&quot;, you will get a prompt or a dialogue to approve or cancel.
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
                        If you ask Elastic Copilot to run tests or execute a script via the terminal
                        integration, it will either copy the command for you to run, or explicitly ask &quot;Run
                        this command?&quot; before executing. You must approve the exact command that will
                        run.
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
                        When using the in-editor browser or any automation that might navigate or
                        perform actions, you will see what it&apos;s trying to do and can stop it if needed.
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
                  <strong>Granular Permissions:</strong> We are implementing a permission model where certain
                  categories of actions can be allowed or denied. For instance, as a user or admin you
                  might configure:
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
                        File System Write Access: Allowed for certain directories only, or always prompt.
                        You could say &quot;the AI can never delete files, only create/modify with
                        confirmation&quot;.
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
                        Executing Code: Always prompt when the AI wants to run compiled code or
                        terminal commands.
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
                        External Network Calls: If in the future Copilot could call external APIs or web
                        services on your behalf, those would either be disabled or strictly confirmed.
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
                  <strong>Safe Mode:</strong> We provide a &quot;Safe Mode&quot; toggle where you can put the assistant in a more
                  restricted mode. In Safe Mode, the assistant may only provide suggestions and
                  explanations, but cannot execute any operation or make changes, even if you ask it to.
                  This mode can be useful if you want to ensure nothing unintended happens—keeping
                  the AI as a purely advisory tool.
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
                  <strong>Timeouts and Auto-Declines:</strong> If a permission prompt is presented and you do not
                  respond (say you stepped away), we do not assume consent. The request will time out
                  and default to &quot;no action&quot;. This prevents scenarios where a user might accidentally
                  trigger something and not see the prompt.
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
                  <strong>Audit of Actions:</strong> All automated actions that do get executed (with your permission) are
                  logged (see Audit Logging section). This means you can always review what was done.
                  For example, &quot;On 2025-06-01 10:00 UTC, Copilot executed npm test and created
                  utils/helper.js file with user&apos;s approval.&quot; This record is available to you and (in enterprise
                  scenarios) to your team admins. It ensures accountability.
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
                  <strong>No Hidden Changes:</strong> We ensure that any changes to your code are either done through
                  the VS Code editor where they are visible as diffs/edits, or through commands you can
                  inspect. Elastic Copilot will not silently alter a file in the background. If it creates or
                  modifies a file, you&apos;ll see the changes (for instance, the file opens in your editor or is
                  highlighted in source control). If it runs a command, you see the output and result. This
                  transparency is crucial for trust.
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
                  <strong>Limiting Suggestions:</strong> In some scenarios, permission may also involve content. For
                  example, if the AI is about to suggest something that might be destructive (like a code
                  snippet that deletes data or formatting a disk), our system might warn or filter it. We have
                  usage policies for the AI too, and if a user asks the AI to do something obviously harmful
                  or outside ethical bounds, we reserve the right to refuse or warn (similar to how the big
                  AI providers handle disallowed content).
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
              This permission-based design is akin to having a junior developer or co-pilot who always asks
              you &quot;Is it okay if I do this?&quot; before proceeding with anything critical. The goal is to prevent
              accidental damage and to give you confidence that Elastic Copilot will not go rogue or execute
              unintended actions. You maintain the driver&apos;s seat; Elastic Copilot executes only when you give
              it the green light.
            </Typography>
          </Box>

          {/* Transparency and Audit Logging */}
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
              Transparency and Audit Logging
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
              <strong>Transparency in Operations:</strong> We believe you have the right to know what Elastic Copilot is
              doing on your behalf at all times. We build transparency into the user experience:
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
                  When Elastic Copilot sends data to the cloud or a third-party, we often display an
                  indicator (for instance, a small cloud icon or message &quot;Contacting AI model…&quot;). You&quot;re
                  not left guessing whether something is happening locally or on a server – we tell you.
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
                  For actions the AI takes, we often show a running log or commentary. For example, if
                  you ask Elastic Copilot to debug an issue by running tests and the AI does multiple steps
                  (open file A, run tests, read output, suggest fix), we might show a trace like:
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
                      <Box component="span" sx={{ marginRight: '10px' }}>1.</Box>
                      <Box component="span">
                        &quot;Reading tests/test_example.py…&quot;
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
                      <Box component="span" sx={{ marginRight: '10px' }}>2.</Box>
                      <Box component="span">
                        &quot;Running npm test…&quot;
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
                      <Box component="span" sx={{ marginRight: '10px' }}>3.</Box>
                      <Box component="span">
                        &quot;Tests failed on X, analyzing error…&quot;
                      </Box>
                    </Typography>
                  </Box>
                  This gives you insight into the AI&apos;s thought process and sequence of operations.
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
                  The in-editor browser explicitly shows you the pages it loads; the terminal shows you the
                  commands. Essentially, we try to surface the AI&apos;s &quot;thinking&quot; or at least its &quot;doing&quot; in the
                  UI. If it has an internal chain-of-thought, we can&apos;t display that entirely (that&apos;s internal to
                  the model), but every external action is surfaced.
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
                  We publish documentation (and this policy) explaining data flows and behaviors. If
                  there&apos;s anything you&apos;re unsure about, we aim to document it or answer questions.
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
                  If there is ever a security incident or significant downtime, we will be transparent about it
                  to the extent possible. For example, if a breach were to occur, our policy is to inform
                  affected users promptly and accurately, with an explanation of what happened and what
                  we are doing about it.
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
              <strong>Audit Logging:</strong> For especially our enterprise users, audit logs are crucial to ensure compliance
              and oversight. But even individual users can benefit from knowing what happened in a session.
              Our audit logging features include:
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
                  <strong>Action Logs:</strong> As mentioned, any significant action taken via Elastic Copilot is logged.
                  This includes file operations (creation, modification, deletion), commands executed,
                  external sites accessed by the in-editor browser, etc. The log entry typically contains
                  timestamp, the action description, and the initiator (whether it was user-invoked or
                  AI-suggested and user-approved).
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
                  <strong>AI Conversation History:</strong> We maintain a history of your interactions (prompts and
                  responses) that you can review in the VS Code extension (unless Privacy Mode is on, in
                  which case we limit retention). This history is a form of audit log of what questions you
                  asked and what answers were given. It helps in traceability—if the AI made a code
                  change suggestion yesterday that introduced a bug, you can go back and find that
                  suggestion.
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
                  <strong>Admin Auditing:</strong> For organizations, team administrators might have access to logs or
                  summaries of usage for their developers. This could include how many requests were
                  made, what types of actions were performed, etc. We ensure this is done in a
                  privacy-respecting manner (e.g., it might focus on metadata rather than actual code
                  content). The purpose is to let companies ensure their internal policies (like &quot;don&apos;t paste
                  customer data into external tools&quot;) are being followed. Admins could see if someone is
                  excessively using the web search integration or exporting data.
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
                  <strong>Immutable Logs:</strong> We secure our logs to prevent tampering. Audit logs are stored in a
                  secure, append-only format where possible. This means neither our staff nor a malicious
                  actor who somehow got limited access could easily alter records without detection.
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
                  <strong>User Access to Logs:</strong> You own your data, including logs of your activities. We will
                  provide ways for you to access your own audit logs. For instance, the extension might
                  have a &quot;Recent Actions&quot; panel or we might offer an export of your activity. Enterprise
                  customers can request comprehensive logs for their environment if needed for an audit
                  or investigation.
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
                  <strong>Retention of Logs:</strong> We retain audit logs for a period that balances usefulness with
                  privacy. Security-related logs might be kept longer (to investigate incidents, etc.),
                  whereas detailed usage logs may be pruned earlier unless needed. (Details on retention
                  are in the Privacy Policy, but e.g., we might keep general logs for a year, detailed
                  code-related logs for much shorter if at all for Privacy Mode users.)
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
              <strong>Incident Transparency:</strong> If a user raises a concern (&quot;I think Elastic Copilot did X that I didn&apos;t
              expect&quot;), we have internal logs to investigate and provide clarity on what happened. We strive
              not to have any &quot;black box&quot; operations—if something happened, we should be able to tell you
              the what and why from our logs. Transparency builds trust, and we are committed to both.
            </Typography>
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
              In summary, everything Elastic Copilot does can be traced and reviewed. Whether it&apos;s by
              you in real-time via on-screen cues, or later via audit logs, you have visibility. There are no
              hidden surreptitious behaviors. If you ever feel something unclear is happening, we want to
              know so we can address it.
            </Typography>
          </Box>

          {/* Enterprise-Ready Controls and Compliance */}
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
              Enterprise-Ready Controls and Compliance
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
              Elastic Copilot is built not just for individual developers, but also with teams and enterprises in
              mind. We recognize that larger organizations have higher demands for security, compliance,
              and manageability. Here are the key enterprise-ready controls and features we provide (or are
              working towards):
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
                  <strong>Single Sign-On (SSO) Integration:</strong> Enterprises can integrate Elastic Copilot with their
                  identity provider (IdP) for centralized authentication. We support standard SSO protocols
                  such as SAML 2.0 or OAuth/OIDC. For example, a company using Google Workspace
                  or Azure Active Directory can allow their users to log into Elastic Copilot using those
                  credentials. This enhances security (with company-managed 2FA, account provisioning,
                  etc.) and convenience. SSO also allows for automatic de-provisioning – if someone
                  leaves the company, their access to Elastic Copilot can be revoked via the IdP.
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
                  <strong>Role-Based Access Control (RBAC):</strong> Within Elastic Copilot&apos;s team management, we
                  provide roles such as Admin, Member, Viewer, etc. Admins can manage subscriptions,
                  view usage, and set policies, while regular members just use the tool. We also allow
                  scoping of permissions – e.g., certain members might not be allowed to use the &quot;web
                  search&quot; feature if an admin disables it for security, or an admin could restrict usage of
                  certain AI models if needed.
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
                  <strong>Team/Org Settings:</strong> Enterprises get an admin dashboard (as noted in our pricing plans)
                  where they can:
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
                        Enforce Privacy Mode for all users (or ensure no data leaves their environment
                        beyond what&apos;s necessary).
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
                        Set organization-wide settings like &quot;disallow code snippet logging&quot; or &quot;require
                        confirmation for all actions&quot; as defaults.
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
                        Monitor usage statistics (how many AI queries, how the quota is being used,
                        etc.).
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
                        Manage integrations (for example, connecting the organization&apos;s Slack
                        workspace so all users can use that integration seamlessly).
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
                  <strong>Data Residency and Isolation:</strong> While our primary data storage is in the U.S., we
                  understand some enterprises (especially outside the U.S.) might have data residency
                  requirements. We plan to offer options such as EU data hosting if there&apos;s demand. We
                  also logically isolate customer data – an enterprise&apos;s data (account info, usage) is
                  separated so that no other tenant can access it. With on-prem solutions, physical
                  isolation is possible too.
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
                  <strong>Compliance and Certifications:</strong> We align our practices with industry standards like
                  SOC 2, ISO 27001, GDPR (for privacy), etc. While as of this writing we may be in the
                  process of obtaining formal certifications, our policies and controls are designed to meet
                  those requirements:
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
                        We keep audit trails and evidences needed for SOC 2 (security, availability,
                        confidentiality principles).
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
                        We conduct risk assessments and employee security training.
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
                        We maintain data processing inventories and GDPR-required documentation,
                        even if our focus is US, we respect privacy principles globally.
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
                        For any enterprise needing to do a vendor security assessment, we are ready to
                        share details (under NDA if required) and help address their questionnaires. We
                        know this is part of being enterprise-ready.
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
                  <strong>Custom Model and On-Prem Options:</strong> Some enterprises might want to use their own
                  AI model (maybe they have a fine-tuned model or they prefer a specific provider for
                  confidentiality). We plan to allow flexible AI backends – e.g., if an enterprise has an
                  instance of GPT-4 on Azure or a self-hosted model, Elastic Copilot could be configured
                  to use that for their team&apos;s requests. Similarly, as mentioned, a full on-prem deployment
                  could be arranged for maximal isolation (where the entire Elastic Copilot service runs in
                  the company&apos;s private cloud).
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
                  <strong>Continuous Monitoring and Support:</strong> Enterprise customers get priority support (as
                  seen in Pro+ plan). We also might offer a status dashboard and faster SLA (service
                  level agreements) for uptime. For example, an enterprise contract might guarantee X%
                  uptime and Y response time for critical support issues. We have internal monitoring to
                  meet those.
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
                  <strong>Vulnerability Management:</strong> We actively manage vulnerabilities in our software. This
                  includes subscribing to CVE alerts for dependencies, running static code analysis,
                  dependency scanning, and engaging in periodic penetration tests. Enterprises often ask
                  about this, and we&apos;re prepared to share our vulnerability management process. We
                  patch critical vulns typically within 24-48 hours.
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
                  <strong>Data Segregation:</strong> In multi-tenant cloud, we ensure that one customer&apos;s data is
                  segregated from another&apos;s using account scoping at the application level. Additionally,
                  for things like AI model usage, we don&apos;t mix context between users – every request to
                  the model is isolated to your session and context. (The AI itself doesn&apos;t retain info across
                  requests by design, especially with no retention setting.)
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
                  <strong>Compliance with Company Policies:</strong> We allow configuration to help companies
                  comply with their internal policies. For instance, if a company disallows use of any cloud
                  AI for certain code (e.g., code containing secrets or regulated data), they can enforce
                  that through Elastic Copilot settings (like blacklisting certain file patterns or disabling the
                  tool in certain project folders). We&apos;re exploring integration with DLP (Data Loss
                  Prevention) solutions such that if someone tries to send something sensitive, it can be
                  blocked or flagged.
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
              Our goal is to make Elastic Copilot enterprise-ready out-of-the-box, so security teams and
              CTOs can feel as comfortable with it as developers do. We continually gather feedback from our
              enterprise users to strengthen these controls.
            </Typography>
          </Box>

          {/* Vulnerability Disclosure */}
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
              Vulnerability Disclosure
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
              We appreciate and value the contributions of external security researchers and experts who
              help us identify and address vulnerabilities. Elastic AI maintains a vulnerability disclosure
              program to facilitate responsible reporting of security issues:
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
                  If you believe you&apos;ve found a security vulnerability in Elastic Copilot or any related
                  component, please notify us immediately at founders@elasticapp.io. Include as much
                  detail as possible in your report, such as steps to reproduce the issue, potential impact,
                  and any relevant information.
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
                  We pledge to respond promptly (typically within 48 hours) to acknowledge receipt of your
                  report. We will investigate the issue and work to fix it as soon as possible. We may reach
                  out for additional information or clarification during this process.
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
                  We ask that you do not publicly disclose the vulnerability until we have had a
                  reasonable time to address it. Coordinated disclosure allows us to protect all users by
                  patching before details are released. We are happy to provide updates on the fix status
                  and coordinate a public disclosure time with you.
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
                  We will keep you informed of the remediation progress and let you know when the
                  vulnerability has been resolved. Once fixed, with your consent, we would like to give you
                  credit for the discovery (if you desire public credit) in our release notes or a hall-of-fame
                  page.
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
                  We do not take legal action against those who discover and report security vulnerabilities
                  responsibly and in good faith. As long as your testing is within scope of our program
                  and not harming other users or systems (for example, no data exfiltration or privacy
                  violations of other users), we consider it authorized. Please avoid automated scanning
                  that could degrade the service, and never attempt to access another user&apos;s data. Test
                  against your own accounts or test accounts.
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
                  We are open to security researchers testing our service and will outline any scope or
                  rules on our website&apos;s security page (for example, which domains or products are
                  in-scope, and any specific exclusions like not testing payment processing or third-party
                  services beyond our control).
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
                  In some cases, we may offer a bug bounty or token of appreciation for significant
                  discoveries, especially if we establish a formal bug bounty program. Even if not, our
                  gratitude will be immense, and we&apos;ll certainly acknowledge your help.
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
              Your trust in Elastic Copilot is critical. We strive to maintain that trust by keeping security a top
              priority, being transparent about our practices (as we&apos;ve done in this policy), and by continuously
              improving in response to new challenges and feedback. We encourage our users and the
              security community to engage with us on security matters—together we can ensure Elastic
              Copilot remains a secure and reliable tool to supercharge your coding.
            </Typography>
          </Box>

          {/* Contact & Further Information */}
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
              Contact & Further Information
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
              For any questions or concerns about Elastic Copilot&apos;s security, you can reach our team at
              founders@elasticapp.io. We also provide additional technical details and updates on our
              [Security & Trust webpage] (referenced on our site), where we may publish system status,
              penetration test summaries, or security white papers for those interested.
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
              By using Elastic Copilot, you entrust us with your code and queries, and we take that
              responsibility seriously. We will continue to invest in security features and best practices to keep
              your development process safe and secure.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer isMobile={isMobile} />
    </React.Fragment>
  )
}
