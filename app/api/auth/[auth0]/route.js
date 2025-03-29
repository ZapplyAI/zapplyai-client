import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Development token for testing
const DEV_ACCESS_TOKEN = process.env.DEV_ACCESS_TOKEN || 'dev-token-for-testing'

// Backend API URL for token exchange (base URL)
const BACKEND_API_BASE_URL = 'https://copilot-api-staging-739610349551.europe-west2.run.app/api/auth/access_token'

// Auth route handler
export async function GET(request, { params }) {
  try {
    // Using await to properly access dynamic route params in Next.js Server Components
    const path = typeof params?.auth0 === 'string' ? params.auth0 : '';
    
    // Get the current host domain (safely server-side)
    const requestUrl = new URL(request.url);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${requestUrl.protocol}//${requestUrl.host}`;
    const tokenPageUrl = `${baseUrl}/dashboard/token`;
    
    // Handle login route
    if (path === 'login') {
      try {
        // Construct Auth0 authorization URL
        const auth0Domain = process.env.AUTH0_DOMAIN || 'dev-net3zwcl0fi87ahe.us.auth0.com';
        const clientId = process.env.AUTH0_CLIENT_ID || '2QkgLlpdRn1xstCiLJAtkRHZuh2RhyAc';
        const redirectUri = `${baseUrl}/api/auth/callback`; // Always use the current host for callback
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
    
    // Handle callback route - Auth0 redirects here with the auth code
    if (path === 'callback') {
      try {
        // Extract the authorization code from the request URL
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        
        if (!code) {
          throw new Error('Authorization code missing');
        }

        console.log('Auth0 code received:', code.substring(0, 10) + '...');
        
        // Construct the redirect URL to the backend API with the Auth0 code
        // Include the token page URL as the client_redirect parameter
        const backendUrl = new URL(BACKEND_API_BASE_URL);
        backendUrl.searchParams.append('code', code);
        backendUrl.searchParams.append('redirect_uri', `${baseUrl}/api/auth/auth-success`);
        backendUrl.searchParams.append('client_redirect', tokenPageUrl);
        
        console.log('Redirecting to backend for token exchange:', backendUrl.toString());
        
        // Store original Auth0 code for reference (before redirecting)
        const cookieStore = cookies();
        await cookieStore.set('original_auth_code', code, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 1, // 1 day
          path: '/',
        });
        
        // Redirect to the backend API endpoint with the code
        return NextResponse.redirect(backendUrl.toString());
      } catch (error) {
        console.error('Callback error:', error);
        
        // Redirect to error page
        const errorMessage = encodeURIComponent(error.message || 'Authentication failed');
        return NextResponse.redirect(`${baseUrl}/auth/error?error=${errorMessage}`);
      }
    }
    
    // Handle redirect-back route - backend API redirects here after token exchange
    if (path === 'auth-success') {
      try {
        const url = new URL(request.url);
        
        // Extract data from URL parameters
        const accessToken = url.searchParams.get('access_token') || url.searchParams.get('token') || DEV_ACCESS_TOKEN;
        const connectionCode = url.searchParams.get('code') || url.searchParams.get('connection_code') || url.searchParams.get('connectionCode');
        
        console.log('Auth success redirect received from backend API');
        console.log('Access token (first 10 chars):', accessToken.substring(0, 10) + '...');
        
        // Store token and connection code in secure HTTP-only cookies
        const cookieStore = cookies();
        await cookieStore.set('auth_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        });
        
        // Only store connection code if one was explicitly provided by backend
        if (connectionCode) {
          await cookieStore.set('connection_code', connectionCode, {
            httpOnly: false, // Make it available to client-side JavaScript
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
          });
          console.log('Stored connection code from backend in cookie:', connectionCode);
        }
        
        console.log('Redirecting to token page');
        
        // Get the client_redirect from query params or use default token page
        const clientRedirect = url.searchParams.get('client_redirect') || tokenPageUrl;
        
        // Redirect to the client redirect URL (token page)
        return NextResponse.redirect(clientRedirect);
      } catch (error) {
        console.error('Auth success handling error:', error);
        
        // Redirect to error page
        const errorMessage = encodeURIComponent(error.message || 'Authentication completion failed');
        return NextResponse.redirect(`${baseUrl}/auth/error?error=${errorMessage}`);
      }
    }
    
    // Handle me route (check if user is authenticated)
    if (path === 'me') {
      try {
        // Get cookie store and safely access the cookie
        const cookieStore = cookies();
        const token = await cookieStore.get('auth_token');
        
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
      try {
        const cookieStore = cookies();
        await cookieStore.delete('auth_token');
        await cookieStore.delete('connection_code');
        await cookieStore.delete('original_auth_code');
        
        return NextResponse.redirect(baseUrl);
      } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.redirect(baseUrl);
      }
    }
    
    // Default response for unknown routes
    return NextResponse.json({ error: 'Unknown auth route' }, { status: 404 });
    
  } catch (outerError) {
    // Global error handler for the entire route handler
    console.error('Global route error:', outerError);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: outerError.message 
    }, { status: 500 });
  }
}
