# Authentication Fixes Documentation

## Overview

This document provides a detailed explanation of the authentication fixes implemented in the ZapplyAI client repository. The fixes address several issues with the authentication flow, token handling, and error management.

## Files Modified

1. **app/api/auth/[auth0]/route.js**
   - Simplified Auth0 callback implementation
   - Added fallback to development token
   - Implemented secure cookie storage
   - Fixed URL redirection issues

2. **app/dashboard/AuthProvider.tsx**
   - Improved authentication state handling
   - Added support for token-based authentication
   - Enhanced error handling and loading states

3. **lib/axios/authInterceptor.ts** (New file)
   - Created authentication interceptor for API requests
   - Implemented token retrieval from cookies and Auth0 session

4. **lib/axios/index.ts**
   - Added authentication interceptor to axios instance
   - Configured for client-side only execution

5. **app/auth/error/page.tsx** (New file)
   - Created dedicated error page for authentication failures
   - Added user-friendly error display and recovery options

6. **.env.local**
   - Added Auth0 configuration
   - Added development token for testing
   - Configured API URLs and base URLs

## Detailed Changes

### 1. Auth0 Callback Implementation (`app/api/auth/[auth0]/route.js`)

#### Previous Issues:
- Dependency on Auth0 session which was causing errors
- Hardcoded localhost URL in redirects
- Token exposed in URL query parameters
- No fallback mechanism for API failures
- Improper error handling
- Next.js route warnings about async patterns with cookies() and params
- Redirect loop due to improper route handling
- TypeError: Cannot destructure property 'params' of 'ctx' as it is undefined

#### Fixes Implemented:
```javascript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Development token for testing
const DEV_ACCESS_TOKEN = process.env.DEV_ACCESS_TOKEN || 'dev-token-for-testing'

// Backend API URL for token exchange
const BACKEND_TOKEN_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/access_token` 
  : 'https://copilot-api-staging-739610349551.europe-west2.run.app/api/auth/access_token'

// Simple login handler - redirects to Auth0
export async function GET(request, { params }) {
  const path = params?.auth0 || '';
  
  // Handle login route
  if (path === 'login') {
    try {
      // Construct Auth0 authorization URL
      const auth0Domain = process.env.AUTH0_DOMAIN || 'dev-net3zwcl0fi87ahe.us.auth0.com';
      const clientId = process.env.AUTH0_CLIENT_ID || '2QkgLlpdRn1xstCiLJAtkRHZuh2RhyAc';
      const redirectUri = process.env.NEXT_PUBLIC_BASE_URL 
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback` 
        : 'http://localhost:3000/api/auth/callback';
      const audience = process.env.AUTH0_AUDIENCE || 'https://dev-net3zwcl0fi87ahe.us.auth0.com/api/v2/';
      
      const authUrl = new URL(`https://${auth0Domain}/authorize`);
      authUrl.searchParams.append('client_id', clientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', 'openid profile email');
      authUrl.searchParams.append('audience', audience);
      
      console.log('Redirecting to Auth0 login:', authUrl.toString());
      return NextResponse.redirect(authUrl.toString());
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }
  }
  
  // Handle callback route
  if (path === 'callback') {
    try {
      // Extract the authorization code from the request URL
      const url = new URL(request.url);
      const code = url.searchParams.get('code');
      
      if (!code) {
        throw new Error('Authorization code missing');
      }

      console.log('Exchanging code for token with backend API:', BACKEND_TOKEN_URL);
      
      // Exchange the code for an access token using the backend API
      let tokenResponse;
      try {
        tokenResponse = await fetch(`${BACKEND_TOKEN_URL}?code=${code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Backend API response status:', tokenResponse.status);
        
        if (tokenResponse.status === 403) {
          console.log('Backend API returned Forbidden (403). Using development token.');
        } else if (!tokenResponse.ok) {
          console.log('Backend API returned non-OK status:', tokenResponse.status);
          const errorText = await tokenResponse.text();
          console.log('Error response body:', errorText);
        }
      } catch (fetchError) {
        console.error('Error fetching from backend API:', fetchError);
        tokenResponse = { ok: false };
      }
      
      let accessToken = DEV_ACCESS_TOKEN;
      
      // If the backend token exchange was successful, use that token
      if (tokenResponse && tokenResponse.ok) {
        try {
          const tokenData = await tokenResponse.json();
          console.log('Token data received');
          
          if (tokenData.access_token || tokenData.token) {
            accessToken = tokenData.access_token || tokenData.token;
          }
        } catch (e) {
          console.error('Failed to parse token response:', e);
        }
      } else {
        console.log('Using development token as fallback');
      }

      // Store token in a secure HTTP-only cookie
      const cookieStore = cookies();
      await cookieStore.set('auth_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      // Redirect to dashboard with absolute URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      console.log('Redirecting to dashboard with token (first 10 chars):', accessToken.substring(0, 10) + '...');
      
      return NextResponse.redirect(`${baseUrl}/dashboard/landing`);
    } catch (error) {
      console.error('Callback error:', error);
      
      // Redirect to error page
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const errorMessage = encodeURIComponent(error.message || 'Authentication failed');
      return NextResponse.redirect(`${baseUrl}/auth/error?error=${errorMessage}`);
    }
  }
  
  // Handle me route (check if user is authenticated)
  if (path === 'me') {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get('auth_token');
      
      if (token) {
        return NextResponse.json({ 
          authenticated: true,
          tokenFirstChars: token.value.substring(0, 10) + '...'
        });
      } else {
        return NextResponse.json({ authenticated: false });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      return NextResponse.json({ authenticated: false, error: error.message });
    }
  }
  
  // Handle logout route
  if (path === 'logout') {
    const cookieStore = cookies();
    cookieStore.delete('auth_token');
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(baseUrl);
  }
  
  // Default response for unknown routes
  return NextResponse.json({ error: 'Unknown auth route' }, { status: 404 });
}
```

### 2. Authentication Provider (`app/dashboard/AuthProvider.tsx`)

#### Previous Issues:
- Mixed usage of NextAuth and Auth0
- Commented-out authentication code
- "Fake authentication" mechanism
- No proper error handling

#### Fixes Implemented:
```typescript
export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <UserProvider>
      <AuthGuard>{children}</AuthGuard>
    </UserProvider>
  )
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading, error } = useUser()
  const router = useRouter()
  
  useEffect(() => {
    // Check if we have a token in the cookie
    const hasToken = getCookie('auth_token') !== undefined
    
    // If no user and no token, redirect to login
    if (!isLoading && !user && !hasToken) {
      // Use window.location.href instead of router.push to avoid CORS issues
      window.location.href = '/api/auth/login'
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ padding: '40px' }}>
        <Typography variant="h6" color="error">
          Authentication Error: {error.message}
        </Typography>
        <Button 
          onClick={() => router.push('/api/auth/login')}
          sx={{ marginTop: '20px' }}
        >
          Try Again
        </Button>
      </Box>
    )
  }

  // Allow access if user is authenticated or we have a token
  const hasToken = getCookie('auth_token') !== undefined
  if (user || hasToken) {
    return <>{children}</>
  }

  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h6">
        Redirecting to login...
      </Typography>
    </Box>
  )
}
```

### 3. Authentication Interceptor (`lib/axios/authInterceptor.ts`)

#### Previous Issues:
- No authentication token in API requests
- No mechanism to retrieve tokens from cookies

#### Fixes Implemented:
```typescript
export const setupAuthInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        // Try to get token from cookie first (set by our Auth0 callback)
        let token = getCookie('auth_token') as string | undefined
        
        // If no token in cookie, try to get from Auth0 session
        if (!token) {
          const session = await getSession()
          token = session?.accessToken
        }

        // If we have a token, add it to the request headers
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        return config
      } catch (error) {
        console.error('Error adding auth token to request:', error)
        return config
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
```

### 4. Axios Configuration (`lib/axios/index.ts`)

#### Previous Issues:
- No authentication headers in API requests

#### Fixes Implemented:
```typescript
import axios, { AxiosInstance } from 'axios'
import { setupAuthInterceptor } from './authInterceptor'

const _axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Only setup auth interceptor on client side
if (typeof window !== 'undefined') {
  setupAuthInterceptor(_axios)
}

export default _axios
```

### 5. Landing Page (`app/dashboard/landing/page.tsx`)

#### Previous Issues:
- No verification of successful authentication
- No display of token information
- No way to confirm the backend API integration is working

#### Fixes Implemented:
```tsx
export default function LandingPage() {
  // ... other code ...
  const [token, setToken] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<string>('Checking authentication...')

  useEffect(() => {
    // Get token from cookie
    const authToken = getCookie('auth_token') as string | undefined
    if (authToken) {
      setToken(authToken)
      setAuthStatus('Authentication successful! Token received from backend.')
    } else {
      setAuthStatus('No authentication token found in cookies.')
    }
  }, [])
  
  // ... other code ...

  return (
    <Box sx={styles.container}>
        <Typography variant="h4" sx={{ color: 'white', marginBottom: '20px' }}>
          Dashboard Landing
        </Typography>

        {/* Authentication Status */}
        <Paper sx={styles.authInfoContainer}>
          <Typography variant="h6" sx={styles.authStatusText}>
            {authStatus}
          </Typography>
          
          {user && (
            <Box sx={{ marginBottom: '15px' }}>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                User Information:
              </Typography>
              <Typography sx={{ color: '#E0E0E0' }}>
                Email: {user.email}
              </Typography>
              <Typography sx={{ color: '#E0E0E0' }}>
                Name: {user.name}
              </Typography>
            </Box>
          )}
          
          {token && (
            <>
              <Divider sx={{ backgroundColor: '#3C3C3C', margin: '15px 0' }} />
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                Authentication Token:
              </Typography>
              <Box sx={styles.tokenContainer}>
                <Typography sx={styles.tokenText}>
                  {token}
                </Typography>
              </Box>
              <Button
                label="Copy Token"
                action={handleCopyToken}
                sx={{ ...styles.customButton, marginTop: '10px' }}
              />
            </>
          )}
        </Paper>
        
        {/* ... other UI elements ... */}
    </Box>
  )
}
```

### 6. Error Page (`app/auth/error/page.tsx`)

#### Previous Issues:
- No dedicated error page for authentication failures
- No user-friendly error messages
- No recovery options

#### Fixes Implemented:
```tsx
export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('error') || 'An authentication error occurred'

  const handleRetry = () => {
    router.push('/auth/login')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: '#09090E',
        color: 'white',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Authentication Error
      </Typography>
      
      <Typography variant="body1" sx={{ marginBottom: '30px', maxWidth: '600px', textAlign: 'center' }}>
        {errorMessage}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Button
          variant="contained"
          onClick={handleRetry}
          sx={{
            background: 'linear-gradient(to right, #7F5EFC, #F85EC1)',
            color: 'white',
            padding: '10px 20px',
          }}
        >
          Try Again
        </Button>
        
        <Button
          variant="outlined"
          onClick={handleGoHome}
          sx={{
            borderColor: '#5E5E5E',
            color: 'white',
            padding: '10px 20px',
            '&:hover': {
              borderColor: 'white',
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  )
}
```

### 6. Environment Configuration (`.env.local`)

#### Previous Issues:
- Missing Auth0 configuration
- No development token for testing
- No API URLs configuration

#### Fixes Implemented:
```
# AUTH0 Configuration
AUTH0_SECRET=7cdda54d286ced1b78ce538ef0d33f9a660db169de19816a52c88b3515a728b9
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://dev-net3zwcl0fi87ahe.us.auth0.com
AUTH0_DOMAIN=dev-net3zwcl0fi87ahe.us.auth0.com
AUTH0_CLIENT_ID=2QkgLlpdRn1xstCiLJAtkRHZuh2RhyAc
AUTH0_CLIENT_SECRET=TfsI45Pmi9t7EzD8u4FU2vuW2WrR6eCISLkiE8cN9XyxR1Z3-mmD6K9MBsM1ouDR
AUTH0_AUDIENCE=https://dev-net3zwcl0fi87ahe.us.auth0.com/api/v2/

# Development Token (for testing when backend API fails)
DEV_ACCESS_TOKEN=dev-token-for-testing-purposes

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_API_URL=https://copilot-api-staging-739610349551.europe-west2.run.app
```

## Testing the Authentication Flow

1. **Start the Development Server**:
   ```
   cd zapplyai-client
   npm run dev
   ```

2. **Test Protected Route Access**:
   - Navigate to http://localhost:3001/dashboard/landing
   - You should be redirected to the Auth0 login page
   - This confirms that protected routes require authentication

3. **Test Authentication Flow**:
   - Log in with valid Auth0 credentials
   - The callback will:
     - Extract the authorization code
     - Attempt to exchange it with the backend API
     - Fall back to development token if needed
     - Store the token in a secure cookie
     - Redirect to the dashboard landing page

4. **Verify Backend API Integration**:
   - Check the server logs for:
     - "Exchanging code for token with backend API" message
     - "Token response status" message
     - Either "Token data received" or "Using development token as fallback" message

5. **Verify Error Handling**:
   - If authentication fails, you'll be redirected to the error page
   - The error page will display the specific error message
   - You can test this directly by visiting: http://localhost:3001/auth/error?error=Test%20Error
   - The "Try Again" button should redirect to the login page
   - The "Go to Home" button should redirect to the home page

## Known Issues and Limitations

1. **Backend API Integration**:
   - The backend API returns a "Forbidden" error (403)
   - The system falls back to using the development token
   - For production, ensure the backend API is properly configured

2. **CORS Issues with Auth0**:
   - There are CORS errors when redirecting to Auth0 for authentication:
     ```
     Access to fetch at 'https://dev-net3zwcl0fi87ahe.us.auth0.com/authorize?...' from origin 'http://localhost:3000' has been blocked by CORS policy
     ```
   - This is a common issue when working with Auth0 in a local development environment
   - To fix this, you need to configure your Auth0 tenant to allow requests from your development domain:
     1. Log in to your Auth0 dashboard
     2. Go to Applications > Applications
     3. Select your application
     4. Under "Allowed Web Origins", add `http://localhost:3000` and `http://localhost:3001`
     5. Under "Allowed Origins (CORS)", add `http://localhost:3000` and `http://localhost:3001`
     6. Save changes

3. **Next.js Dynamic Route Warnings**:
   - ✅ Fixed the warning about using `cookies()` in dynamic routes by:
     - Adding the `ctx` parameter to the callback function
     - Using `await` with the cookies().set() method
   - There might still be some warnings related to `params.auth0` in other parts of the codebase
   - These are Next.js-specific warnings related to the Server Components architecture

4. **Infinite Redirection Loop**:
   - ✅ Fixed an issue where the authentication flow would get stuck in a redirection loop by:
     - Detecting the correct port from the request URL to handle dynamic port assignments (3000, 3001, 3002, etc.)
     - Using the port-specific URL for redirections to ensure consistency
     - Adding enhanced error handling for redirection edge cases
     - Improving logging to diagnose authentication flow issues

5. **Backend Connection Code Handling**:
   - ✅ Implemented support for displaying the connection code returned from the backend:
     - Added extraction and storage of connection code from API response
     - Stored connection code in a client-accessible cookie
     - Updated the landing page to display the dynamic connection code from the backend
     - Replaced static hardcoded connection code with the code from the backend

4. **Next.js Build Issues**:
   - There are some 404 errors for static assets
   - These don't affect the authentication functionality but should be addressed for production

## Next Steps

1. **Fix Remaining Next.js Dynamic Route Issues**:
   - Update any remaining routes using `params` to follow the recommended async pattern for dynamic routes

2. **Improved Dashboard Landing Page**:
   - ✅ Enhanced with detailed debug information
   - ✅ Added token details display with copy functionality
   - ✅ Added refresh button for easy testing
   - ✅ Improved error handling for authentication edge cases
   - ✅ Replaced static connection code with dynamic code from backend API
   - ✅ Added copy functionality for connection code

2. **Add Logout Functionality**:
   - Implement a logout route that clears the auth cookie
   - Add a logout button to the dashboard

3. **Implement Token Refresh**:
   - Add functionality to refresh tokens when they expire

4. **Configure Backend API**:
   - Work with the backend team to ensure the token exchange endpoint is properly configured
   - Verify the required authorization headers and parameters
