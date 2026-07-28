/**
 * Newsletter Subscription API Route
 * 
 * Handles newsletter subscriptions with multiple provider support
 * Includes validation, spam protection, and welcome email automation
 */

import { NextRequest, NextResponse } from 'next/server';
import { newsletterService, type Subscriber } from '@/lib/newsletter';
import { inputValidation, csrfProtection, rateLimiting, apiSecurity } from '@/lib/security';

// Rate limiter: 5 subscriptions per hour per IP (prevent spam)
const subscribeRateLimiter = rateLimiting.createRateLimiter(5, 60 * 60 * 1000);

interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
  source?: 'portfolio' | 'music' | 'blog' | 'contact';
  csrfToken: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Apply rate limiting
    if (!subscribeRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many subscription attempts. Please wait before trying again.',
          retryAfter: Math.ceil((subscribeRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Retry-After': '3600',
          }
        }
      );
    }

    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { 
          status: 405,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Allow': 'POST',
          }
        }
      );
    }

    // Check if newsletter service is configured
    if (!newsletterService.isConfigured()) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Newsletter service is temporarily unavailable. Please try again later or contact Charles directly.' 
        },
        { 
          status: 503,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Parse and validate request body
    let body: SubscribeRequest;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate required fields
    if (!body.email || !body.csrfToken) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: email, csrfToken' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate CSRF token
    const csrfTokenHeader = request.headers.get('x-csrf-token');
    if (!csrfTokenHeader || !csrfProtection.validateToken(body.csrfToken, csrfTokenHeader)) {
      return NextResponse.json(
        { success: false, message: 'Invalid CSRF token' },
        { 
          status: 403,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Sanitize and validate input
    const sanitizedEmail = inputValidation.sanitizeString(body.email, 254).toLowerCase();
    
    if (!inputValidation.isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Check for potential security threats
    if (inputValidation.containsSqlInjection(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate and sanitize optional fields
    const sanitizedFirstName = body.firstName 
      ? inputValidation.sanitizeString(body.firstName, 50) 
      : undefined;
    
    const sanitizedLastName = body.lastName 
      ? inputValidation.sanitizeString(body.lastName, 50) 
      : undefined;

    // Validate interests array
    const validInterests = ['portfolio', 'music', 'blog', 'tech', 'ministry', 'design', 'development'];
    const sanitizedInterests = (body.interests || [])
      .filter(interest => validInterests.includes(interest))
      .slice(0, 5); // Limit to 5 interests

    // Validate source
    const validSources = ['portfolio', 'music', 'blog', 'contact'];
    const sanitizedSource = validSources.includes(body.source || '') 
      ? body.source 
      : 'unknown';

    // Build subscriber object
    const subscriber: Subscriber = {
      email: sanitizedEmail,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      interests: sanitizedInterests,
      source: sanitizedSource as 'portfolio' | 'music' | 'blog' | 'contact',
      tags: [
        `source:${sanitizedSource}`,
        `signup_date:${new Date().toISOString().split('T')[0]}`,
        ...(sanitizedInterests.map(interest => `interest:${interest}`)),
      ],
      customFields: {
        signup_ip: clientIP.replace(/\d+/g, 'XXX'), // Masked IP for privacy
        user_agent: request.headers.get('user-agent')?.substring(0, 200) || 'unknown',
        referrer: request.headers.get('referer') || 'direct',
        signup_timestamp: new Date().toISOString(),
      },
    };

    // Subscribe to newsletter
    const result = await newsletterService.subscribe(subscriber);

    if (result.success) {
      // Log successful subscription for analytics
      console.log('Newsletter subscription successful:', {
        email: sanitizedEmail.replace(/(.{3}).*(@.*)/, '$1***$2'), // Mask email
        source: sanitizedSource,
        interests: sanitizedInterests,
        provider: result.provider,
        timestamp: new Date().toISOString(),
        clientIP: clientIP.replace(/\d+/g, 'XXX'),
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to the newsletter! Check your email for a welcome message.',
          provider: result.provider,
        },
        { 
          status: 200,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    } else {
      // Handle specific errors
      let errorMessage = result.error || 'Subscription failed';
      let statusCode = 400;

      // Check for common error types
      if (errorMessage.toLowerCase().includes('already subscribed') || 
          errorMessage.toLowerCase().includes('already exists')) {
        errorMessage = 'This email is already subscribed to our newsletter.';
        statusCode = 409; // Conflict
      } else if (errorMessage.toLowerCase().includes('invalid email')) {
        errorMessage = 'Please provide a valid email address.';
        statusCode = 400;
      } else if (errorMessage.toLowerCase().includes('not configured')) {
        errorMessage = 'Newsletter service is temporarily unavailable. Please try again later.';
        statusCode = 503;
      }

      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage 
        },
        { 
          status: statusCode,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

  } catch (error) {
    console.error('Newsletter subscription API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.' 
      },
      { 
        status: 500,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token, Authorization',
      'Access-Control-Max-Age': '86400',
      ...apiSecurity.getSecureApiHeaders(),
    },
  });
}

// Reject other methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Use POST to subscribe to newsletter.' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'POST, OPTIONS',
      }
    }
  );
}