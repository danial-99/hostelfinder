import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cache middleware responses
const redirectCache = new Map<string, NextResponse>();

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    
    // Skip middleware for static files and API routes
    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') ||
      pathname.includes('.') || 
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }

    // Check cache first
    const cacheKey = `${pathname}-${request.cookies.get("accessToken")?.value}-${request.cookies.get("userRole")?.value}`;
    if (redirectCache.has(cacheKey)) {
      return redirectCache.get(cacheKey);
    }

    const accessToken = request.cookies.get("accessToken");
    const userRole = request.cookies.get("userRole");

    const isAuthenticated = Boolean(accessToken?.value);
    const isAdmin = userRole?.value === "ADMIN";
    const isUser = userRole?.value === "USER";

    let response: NextResponse;

    // Authentication logic
    if (!isAuthenticated && 
        !pathname.startsWith('/auth') && 
        !pathname.includes('/auth')) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
      redirectCache.set(cacheKey, response);
      return response;
    }

    // Prevent authenticated users from accessing auth pages
    if (isAuthenticated && 
        (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
      response = NextResponse.redirect(new URL("/", request.url));
      redirectCache.set(cacheKey, response);
      return response;
    }

    // Role-based redirects
    if (isAuthenticated && isAdmin && pathname === "/") {
      response = NextResponse.redirect(new URL("/dashboard", request.url));
      redirectCache.set(cacheKey, response);
      return response;
    }

    if (isAuthenticated && isUser && pathname.startsWith("/dashboard")) {
      response = NextResponse.redirect(new URL("/", request.url));
      redirectCache.set(cacheKey, response);
      return response;
    }

    // Limit cache size to prevent memory leaks
    if (redirectCache.size > 100) {
      const firstKey = redirectCache.keys().next().value;
      redirectCache.delete(firstKey as string) ;
    }

    response = NextResponse.next();
    redirectCache.set(cacheKey, response);
    return response;

  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

// More specific matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. All static files (e.g. robots.txt, favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};