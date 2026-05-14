/**
 * Next.js Middleware
 * 
 * Global middleware for security, rate limiting, and request handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { cspUtils, apiSecurity } from '@/lib/security';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Generate nonce for CSP
  const nonce = cspUtils.generateNonce();
  
  // Create response
  const response = NextResponse.next();
  
  // Add security headers to all responses
  const securityHeaders = {
    // Content Security Policy with nonce
    'Content-Security-Policy': cspUtils.createCspHeader(nonce),
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Prevent clickjacking
    'X-Frame-Options': 'SAMEORIGIN',
    
    // XSS Protection
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=(self)',
      'encrypted-media=(self)',
      'fullscreen=(self)',
      'picture-in-picture=(self)'
    ].join(', '),
    
    // Strict Transport Security (HTTPS only)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Cross-Origin Embedder Policy
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
    
    // Cross-Origin Opener Policy
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    
    // Cross-Origin Resource Policy
    'Cross-Origin-Resource-Policy': 'cross-origin',
    
    // Remove server information
    'Server': '',
    
    // Add nonce to response for CSP
    'X-Nonce': nonce,
  };
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Additional security for API routes
  if (pathname.startsWith('/api/')) {
    // Validate request method for API routes
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
    if (!allowedMethods.includes(request.method)) {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { 
          status: 405,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Allow': allowedMethods.join(', '),
          }
        }
      );
    }
    
    // Add API-specific security headers
    const apiHeaders = apiSecurity.getSecureApiHeaders();
    Object.entries(apiHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    // Validate Content-Type for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      const contentType = request.headers.get('content-type');
      if (contentType && !contentType.includes('application/json') && !contentType.includes('multipart/form-data')) {
        return NextResponse.json(
          { error: 'Unsupported Content-Type' },
          { 
            status: 415,
            headers: apiHeaders
          }
        );
      }
    }
  }
  
  // Block requests with suspicious patterns
  const suspiciousPatterns = [
    /\.\./,  // Path traversal
    /<script/i,  // XSS attempts
    /union.*select/i,  // SQL injection
    /javascript:/i,  // JavaScript protocol
    /data:.*base64/i,  // Data URLs with base64
  ];
  
  const fullUrl = request.url;
  const userAgent = request.headers.get('user-agent') || '';
  
  if (suspiciousPatterns.some(pattern => pattern.test(fullUrl) || pattern.test(userAgent))) {
    console.warn(`Blocked suspicious request: ${fullUrl} from ${request.ip || 'unknown'}`);
    return NextResponse.json(
      { error: 'Request blocked' },
      { 
        status: 403,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
  }
  
  // Block requests from known bad user agents
  const blockedUserAgents = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
  ];
  
  // Allow legitimate bots (Google, Bing, etc.)
  const allowedBots = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
  ];
  
  const isBlockedBot = blockedUserAgents.some(pattern => pattern.test(userAgent)) &&
                      !allowedBots.some(pattern => pattern.test(userAgent));
  
  if (isBlockedBot && !pathname.startsWith('/api/')) {
    console.warn(`Blocked bot request: ${userAgent} from ${request.ip || 'unknown'}`);
    return NextResponse.json(
      { error: 'Access denied' },
      { 
        status: 403,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
  }
  
  // Validate origin for API requests (CORS protection)
  if (pathname.startsWith('/api/') && request.method !== 'GET') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // Allow requests from same origin
    const allowedOrigins = [
      `https://${host}`,
      `http://${host}`, // For development
      'http://localhost:3000',
      'http://localhost:3001',
      'https://charlesjasema.com',
      'https://www.charlesjasema.com',
    ];
    
    if (origin && !allowedOrigins.includes(origin)) {
      console.warn(`Blocked cross-origin request from: ${origin}`);
      return NextResponse.json(
        { error: 'Cross-origin request blocked' },
        { 
          status: 403,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }
  }
  
  // Add CORS headers for allowed origins
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://charlesjasema.com',
      'https://www.charlesjasema.com',
      'http://localhost:3000',
      'http://localhost:3001',
    ];
    
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
  }
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      }
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|images|manifest.json|sw.js|browserconfig.xml).*)',
  ],
};