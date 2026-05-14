/**
 * Rate Limiting Middleware
 * 
 * Provides rate limiting functionality for API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { rateLimiting } from '@/lib/security';

// Create rate limiters for different endpoints
const rateLimiters = {
  // General API rate limiter: 100 requests per 15 minutes
  general: rateLimiting.createRateLimiter(100, 15 * 60 * 1000),
  
  // Contact form rate limiter: 5 requests per hour
  contact: rateLimiting.createRateLimiter(5, 60 * 60 * 1000),
  
  // Newsletter signup rate limiter: 3 requests per hour
  newsletter: rateLimiting.createRateLimiter(3, 60 * 60 * 1000),
  
  // Revalidation rate limiter: 10 requests per minute
  revalidation: rateLimiting.createRateLimiter(10, 60 * 1000),
};

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from headers (for production behind proxy)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  // Use the first available IP
  const ip = forwardedFor?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
  
  return ip.trim();
}

/**
 * Apply rate limiting to a request
 */
export function applyRateLimit(
  request: NextRequest,
  limiterType: keyof typeof rateLimiters = 'general'
): {
  success: boolean;
  response?: NextResponse;
} {
  const identifier = getClientIdentifier(request);
  const limiter = rateLimiters[limiterType];
  
  if (!limiter.isAllowed(identifier)) {
    const resetTime = limiter.getResetTime(identifier);
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
    
    const response = NextResponse.json(
      {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter,
      },
      { status: 429 }
    );
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', '0');
    response.headers.set('X-RateLimit-Reset', resetTime.toString());
    response.headers.set('Retry-After', retryAfter.toString());
    
    return { success: false, response };
  }
  
  return { success: true };
}

/**
 * Rate limiting middleware factory
 */
export function createRateLimitMiddleware(limiterType: keyof typeof rateLimiters = 'general') {
  return (request: NextRequest) => {
    return applyRateLimit(request, limiterType);
  };
}

/**
 * Add rate limit headers to successful responses
 */
export function addRateLimitHeaders(
  response: NextResponse,
  request: NextRequest,
  limiterType: keyof typeof rateLimiters = 'general'
): NextResponse {
  const identifier = getClientIdentifier(request);
  const limiter = rateLimiters[limiterType];
  const remaining = limiter.getRemainingRequests(identifier);
  const resetTime = limiter.getResetTime(identifier);
  
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', resetTime.toString());
  
  return response;
}