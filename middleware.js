/**
 * Next.js Middleware
 * 
 * Global middleware for security, rate limiting, and request handling
 */

import { NextResponse } from 'next/server';

// Simple security utilities
const cspUtils = {
  generateNonce: () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  },
  createCspHeader: (nonce) => {
    return [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://embed.tawk.to https://va.tawk.to`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "media-src 'self' data: https:",
      "connect-src 'self' https://api.resend.com https://api.sendgrid.com https://embed.tawk.to wss://embed.tawk.to",
      "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://embed.tawk.to",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ');
  }
};

const apiSecurity = {
  getSecureApiHeaders: () => ({
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
  })
};

export function middleware(request) {
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
    '/((?!_next/static|_next/image|favicon.ico|images|manifest.json|sw.js|browserconfig.xml).*)',
  ],
};