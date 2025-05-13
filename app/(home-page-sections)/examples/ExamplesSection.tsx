'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Box, Tab, Tabs, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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

// Custom typing animation component
const TypeWriter = ({
  text,
  onComplete,
  typingSpeed = 30,
  initialDelay = 0
}: {
  text: string,
  onComplete?: () => void,
  typingSpeed?: number,
  initialDelay?: number
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  // Start typing after initial delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, initialDelay)

    return () => clearTimeout(startTimer)
  }, [initialDelay])

  // Type one character at a time
  useEffect(() => {
    if (!isStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, typingSpeed, onComplete, isStarted])

  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {displayText}
    </div>
  )
}

// Animated code example component
const AnimatedCodeExample = ({
  code,
  explanation,
  language
}: {
  code: string,
  explanation: string,
  language: string
}) => {
  const [isAnimating, setIsAnimating] = useState(true)
  const [displayedCode, setDisplayedCode] = useState('')
  const [displayedExplanation, setDisplayedExplanation] = useState('')
  const [codeComplete, setCodeComplete] = useState(false)
  const [explanationComplete, setExplanationComplete] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Split code and explanation into lines for line-by-line typing
  const codeLines = code.split('\n')
  const explanationLines = explanation.split('\n')

  // Reset animation when tab changes
  useEffect(() => {
    setIsAnimating(true)
    setDisplayedCode('')
    setDisplayedExplanation('')
    setCodeComplete(false)
    setExplanationComplete(false)
    setAnimationComplete(false)
  }, [code, explanation])

  // Set animation complete when both code and explanation are done
  useEffect(() => {
    if (codeComplete && explanationComplete) {
      setAnimationComplete(true)
    }
  }, [codeComplete, explanationComplete])

  // Loop the animation
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        setIsAnimating(true)
        setDisplayedCode('')
        setDisplayedExplanation('')
        setCodeComplete(false)
        setExplanationComplete(false)
        setAnimationComplete(false)
      }, 5000) // Wait 5 seconds before restarting

      return () => clearTimeout(timer)
    }
  }, [animationComplete])

  // @ts-ignore
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '20px',
        height: '400px',
      }}
    >
      {/* Code section (left) */}
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          padding: '0',
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
        {isAnimating ? (
        <Box
          sx={{
            position: 'relative',
            padding: '20px',
            background: 'rgba(10, 9, 14, 0.95)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '14px',
            lineHeight: 1.5,
            color: '#E5E5E5',
            height: '100%',
            overflow: 'auto',
            whiteSpace: 'pre',
          }}
        >
          <TypeWriter
            text={code}
            typingSpeed={20}
            onComplete={() => setCodeComplete(true)}
          />
        </Box>
      ) : (
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: '20px',
            background: 'transparent',
            fontSize: '14px',
            lineHeight: 1.5,
            height: '100%',
            overflow: 'visible',
          }}
        >
          {code}
        </SyntaxHighlighter>
      )}

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

      {/* Explanation section (right) */}
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          padding: '20px',
          background: 'rgba(10, 9, 14, 0.9)',
          border: '1px solid rgba(119, 94, 255, 0.3)',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '400px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#E5E5E5',
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
        {isAnimating ? (
          <TypeWriter
            text={explanation}
            typingSpeed={15}
            initialDelay={1000} // Start explanation a bit after code
            onComplete={() => setExplanationComplete(true)}
          />
        ) : (
          <div>{explanation}</div>
        )}

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
          Analysis
        </Box>

        <DecorRect sx={{ bottom: '10px', right: '10px' }} />
      </Box>
    </Box>
  )
}

export const ExamplesSection = ({ isMobile }: ExamplesSectionProps) => {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  // Example code snippets with explanations
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
      explanation: `I'm analyzing your request for a Fibonacci function.

Let me break down the problem:
1. Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13...
2. Each number is the sum of the two preceding ones
3. We need an efficient implementation

The recursive approach has O(2^n) complexity which is inefficient.

A better approach is iterative with O(n) time complexity:
- Initialize variables a=0, b=1 (first two Fibonacci numbers)
- Iterate from 2 to n, calculating each Fibonacci number
- Use a temporary variable to handle the swapping
- Return the final value

This implementation is:
✓ Efficient (O(n) time, O(1) space)
✓ Easy to understand
✓ Handles edge cases (n=0, n=1)

Would you like me to explain the algorithm further or optimize it more?`,
    },
    {
      title: 'Bug Fixing',
      language: 'Python',
      code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the sorted halves
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
      explanation: `I've identified a critical bug in your merge sort implementation.

The issue is in the merging logic:
- Your original code simply concatenated the two halves with "left + right"
- This doesn't actually merge the sorted arrays - it just joins them
- The result would not be properly sorted

The correct implementation needs to:
1. Compare elements from both arrays
2. Take the smaller element first
3. Continue until one array is exhausted
4. Append any remaining elements

I've fixed this by:
- Creating a result array
- Using pointers (i and j) to track position in each half
- Comparing elements and taking the smaller one
- Adding remaining elements with extend()

This corrected implementation now properly:
- Divides the array into halves (divide)
- Sorts each half recursively (conquer)
- Merges the sorted halves (combine)

The time complexity remains O(n log n) as expected for merge sort.`,
    },
    {
      title: 'Code Refactoring',
      language: 'TypeScript',
      code: `interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  age: number;
}

function processUserData(users: User[]): Pick<User, 'id' | 'name' | 'email'>[] {
  return users
    .filter(user => user.status === 'active' && user.age > 18)
    .map(({ id, name, email }) => ({ id, name, email }));
}`,
      explanation: `I'm analyzing your original function to identify refactoring opportunities.

Issues with the original code:
1. Uses 'any[]' type - lacks type safety
2. Uses verbose for-loop with index access
3. Explicit boolean comparison (=== true) is redundant
4. Creates temporary objects with manual property assignment
5. No clear separation between filtering and mapping

My refactoring approach:
1. Add proper TypeScript interfaces for strong typing
2. Replace imperative loop with functional methods
3. Use array.filter() to select active adult users
4. Use array.map() with destructuring for cleaner transformation
5. Use object property shorthand for concise object creation

Benefits of the refactored code:
✓ 75% reduction in line count (12 lines → 3 lines)
✓ Improved readability with declarative style
✓ Better type safety with explicit interfaces
✓ Clearer intent - each operation is distinct
✓ Same O(n) time complexity but more maintainable

This transformation follows modern TypeScript best practices while preserving the original functionality.`,
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

        <Box sx={{ borderBottom: 1, borderColor: 'rgba(119, 94, 255, 0.3)', marginBottom: '30px' }}>
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

              <AnimatedCodeExample
                code={example.code}
                explanation={example.explanation}
                language={example.language}
              />

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
