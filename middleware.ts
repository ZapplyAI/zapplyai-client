import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures protected routes require authentication
export function middleware(request: NextRequest) {
  // Get auth token from cookie
  const token = request.cookies.get('auth_token');
  const isAuthenticated = !!token;
  
  // Check if the request is for a protected path
  const isProtectedPath = request.nextUrl.pathname.startsWith('/dashboard');
  
  // If this is a protected path and user is not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    console.log('Middleware: Unauthorized access attempt to protected route:', request.nextUrl.pathname);
    
    // Create URL for the login API
    const loginUrl = new URL('/api/auth/login', request.url);
    
    // Store original URL to redirect back after login
    loginUrl.searchParams.set('returnTo', request.nextUrl.pathname);
    
    return NextResponse.redirect(loginUrl);
  }
  
  // Allow the request to proceed normally
  return NextResponse.next();
}

// Match only on specific paths - only apply middleware where needed
export const config = {
  matcher: ['/dashboard/:path*'],
};
