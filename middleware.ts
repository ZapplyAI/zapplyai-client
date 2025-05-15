import type { NextRequest } from "next/server";

import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const authResponse = await auth0.middleware(request)

  // if a path starts with /auth, let the auth middleware handle it
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authResponse
  }

  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};


// /session/auth?state=bc5423a739f279990fddea9f7ac19b23e5d854a964a3bb62a3b2ca812856af6d&callback_url=vscode://elasticAI.elastic-copilot/auth
