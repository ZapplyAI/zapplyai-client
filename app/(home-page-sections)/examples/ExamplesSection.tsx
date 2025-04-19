'use client'
import React from 'react'
import { Box, Tab, Tabs, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'

interface ExamplesSectionProps {
  isMobile: boolean
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

// Tab panel component
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`example-tabpanel-${index}`}
      aria-labelledby={`example-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

// Code example component
const CodeExample = ({ code, language }: { code: string, language: string }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '20px',
        background: 'rgba(10, 9, 14, 0.9)',
        border: '1px solid rgba(119, 94, 255, 0.3)',
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '400px',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(10, 9, 14, 0.5)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(119, 94, 255, 0.5)',
          borderRadius: '4px',
        },
      }}
    >
      <pre
        style={{
          margin: 0,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          lineHeight: 1.5,
          color: '#E5E5E5',
          overflow: 'visible',
        }}
      >
        <code>{code}</code>
      </pre>
      
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '4px 8px',
          background: 'rgba(119, 94, 255, 0.2)',
          borderRadius: '4px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          color: '#AEAEAE',
        }}
      >
        {language}
      </Box>
      
      <DecorRect sx={{ bottom: '10px', left: '10px' }} />
    </Box>
  )
}

export const ExamplesSection = ({ isMobile }: ExamplesSectionProps) => {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  // Example code snippets
  const examples = [
    {
      title: 'Code Generation',
      language: 'JavaScript',
      code: `// Generate a function to calculate Fibonacci numbers
function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
}

// Test the function
console.log(fibonacci(10)); // Output: 55`,
    },
    {
      title: 'Bug Fixing',
      language: 'Python',
      code: `# Original code with a bug
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Bug: Incorrect merging logic
    # return left + right
    
    # Fixed by Elastic Copilot
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    },
    {
      title: 'Code Refactoring',
      language: 'TypeScript',
      code: `// Before refactoring
function processUserData(users: any[]) {
  let activeUsers = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].status === 'active') {
      activeUsers.push({
        id: users[i].id,
        name: users[i].name,
        email: users[i].email
      });
    }
  }
  return activeUsers;
}

// After refactoring with Elastic Copilot
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

function processUserData(users: User[]): Pick<User, 'id' | 'name' | 'email'>[] {
  return users
    .filter(user => user.status === 'active')
    .map(({ id, name, email }) => ({ id, name, email }));
}`,
    },
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        padding: isMobile ? '60px 20px' : '100px 0',
        background: 'linear-gradient(180deg, #0A090E 0%, #13121A 100%)',
      }}
    >
      <Box
        sx={{
          margin: `0px ${isMobile ? theme.customSpacing?.sides.mobile : theme.customSpacing?.sides.desktop}`,
          position: 'relative',
        }}
      >
        <Box sx={{ textAlign: 'left', marginBottom: '60px' }}>
          <Typography
            variant={'h2' as any}
            sx={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 600,
              marginBottom: '20px',
              fontFamily: 'Orbitron, sans-serif',
              color: '#FFFFFF',
            }}
          >
            See Elastic Copilot in Action
          </Typography>
          
          <Typography
            variant={'body1' as any}
            sx={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#AEAEAE',
              fontFamily: 'JetBrains Mono, monospace',
              maxWidth: '800px',
              margin: '0',
            }}
          >
            From generating complex functions to fixing bugs and refactoring code, Elastic Copilot handles it all.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '30px' }}>
          <Box sx={{ flex: '1', maxWidth: isMobile ? '100%' : '60%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'rgba(119, 94, 255, 0.3)' }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : undefined}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#775EFF',
              },
              '& .MuiTab-root': {
                fontFamily: 'Tektur, sans-serif',
                color: '#AEAEAE',
                '&.Mui-selected': {
                  color: '#FFFFFF',
                },
              },
            }}
          >
            {examples.map((example, index) => (
              <Tab 
                key={index} 
                label={example.title} 
                id={`example-tab-${index}`}
                aria-controls={`example-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
        
            {examples.map((example, index) => (
              <TabPanel key={index} value={value} index={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <Typography
                    variant={'h4' as any}
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 500,
                      fontFamily: 'Tektur, sans-serif',
                      color: '#FFFFFF',
                    }}
                  >
                    {example.title} Example
                  </Typography>
                  
                  <CodeExample code={example.code} language={example.language} />
                  
                  <Typography
                    variant={'body2' as any}
                    sx={{
                      fontSize: '0.9rem',
                      color: '#AEAEAE',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    This is just one example of how Elastic Copilot can help with {example.title.toLowerCase()}.
                  </Typography>
                </Box>
              </TabPanel>
            ))}
          </Box>
          
          {!isMobile && (
            <Box 
              sx={{ 
                flex: '1', 
                maxWidth: '40%', 
                backgroundColor: '#333333', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Empty gray rectangle for future images */}
            </Box>
          )}
        </Box>
        
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(to right, rgba(119, 94, 255, 0), rgba(119, 94, 255, 0.8), rgba(119, 94, 255, 0))',
            boxShadow: '0 0 10px rgba(119, 94, 255, 0.5)',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, rgba(119, 94, 255, 0), rgba(119, 94, 255, 0.5), rgba(119, 94, 255, 0))',
          }}
        />
      </Box>
    </Box>
  )
}
