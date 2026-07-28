/**
 * Recruiter Authentication API Route
 * 
 * Secure authentication endpoint for recruiters to access
 * enhanced portfolio features and private information
 */

import { NextRequest, NextResponse } from 'next/server';
import { recruiterAuthService } from '@/lib/recruiter-auth';
import { inputValidation, csrfProtection, rateLimiting, apiSecurity } from '@/lib/security';

// Rate limiter: 5 attempts per 15 minutes per IP (strict for security)
const authRateLimiter = rateLimiting.createRateLimiter(5, 15 * 60 * 1000);

interface AuthRequest {
  password: string;
  action: 'login' | 'logout' | 'validate' | 'extend';
  accessToken?: string;
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
    if (!authRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many authentication attempts. Please wait 15 minutes before trying again.',
          retryAfter: Math.ceil((authRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Retry-After': '900',
          }
        }
      );
    }

    // Check if recruiter auth is configured
    if (!recruiterAuthService.isConfigured()) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Recruiter access is not available at this time' 
        },
        { 
          status: 503,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Parse request body
    let body: AuthRequest;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate required fields
    if (!body.action || !body.csrfToken) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
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
        { success: false, message: 'Invalid security token' },
        { 
          status: 403,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Handle different actions
    switch (body.action) {
      case 'login': {
        if (!body.password) {
          return NextResponse.json(
            { success: false, message: 'Password is required' },
            { 
              status: 400,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }

        // Sanitize password (basic validation only)
        const password = inputValidation.sanitizeString(body.password, 100);

        // Authenticate
        const authResult = recruiterAuthService.authenticate(password, {
          userAgent: request.headers.get('user-agent') || undefined,
          ip: clientIP,
        });

        if (authResult.success && authResult.session && authResult.accessToken) {
          return NextResponse.json(
            {
              success: true,
              message: 'Authentication successful',
              accessToken: authResult.accessToken,
              session: {
                id: authResult.session.id,
                accessLevel: authResult.session.accessLevel,
                features: authResult.session.features,
                expiresAt: authResult.session.expiresAt,
              },
            },
            { 
              status: 200,
              headers: {
                ...apiSecurity.getSecureApiHeaders(),
                'Set-Cookie': `recruiter_token=${authResult.accessToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
              }
            }
          );
        } else {
          return NextResponse.json(
            { success: false, message: authResult.error || 'Authentication failed' },
            { 
              status: 401,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }
      }

      case 'validate': {
        if (!body.accessToken) {
          return NextResponse.json(
            { success: false, message: 'Access token is required' },
            { 
              status: 400,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }

        const validation = recruiterAuthService.validateSession(body.accessToken);
        
        if (validation.isValid && validation.session) {
          return NextResponse.json(
            {
              success: true,
              session: {
                id: validation.session.id,
                accessLevel: validation.session.accessLevel,
                features: validation.session.features,
                expiresAt: validation.session.expiresAt,
              },
            },
            { 
              status: 200,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        } else {
          return NextResponse.json(
            { success: false, message: validation.error || 'Invalid session' },
            { 
              status: 401,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }
      }

      case 'extend': {
        if (!body.accessToken) {
          return NextResponse.json(
            { success: false, message: 'Access token is required' },
            { 
              status: 400,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }

        // Validate session first
        const validation = recruiterAuthService.validateSession(body.accessToken);
        if (!validation.isValid || !validation.session) {
          return NextResponse.json(
            { success: false, message: 'Invalid session' },
            { 
              status: 401,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }

        // Extend session
        const extended = recruiterAuthService.extendSession(validation.session.id);
        
        if (extended) {
          return NextResponse.json(
            { success: true, message: 'Session extended successfully' },
            { 
              status: 200,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        } else {
          return NextResponse.json(
            { success: false, message: 'Failed to extend session' },
            { 
              status: 400,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }
      }

      case 'logout': {
        if (!body.accessToken) {
          return NextResponse.json(
            { success: false, message: 'Access token is required' },
            { 
              status: 400,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }

        // Get session ID from token
        const validation = recruiterAuthService.validateSession(body.accessToken);
        if (validation.session) {
          recruiterAuthService.logout(validation.session.id);
        }

        return NextResponse.json(
          { success: true, message: 'Logged out successfully' },
          { 
            status: 200,
            headers: {
              ...apiSecurity.getSecureApiHeaders(),
              'Set-Cookie': 'recruiter_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
            }
          }
        );
      }

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { 
            status: 400,
            headers: apiSecurity.getSecureApiHeaders()
          }
        );
    }

  } catch (error) {
    console.error('Recruiter auth API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Authentication service error' 
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
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      ...apiSecurity.getSecureApiHeaders(),
    },
  });
}

// Reject other methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Use POST for authentication.' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'POST, OPTIONS',
      }
    }
  );
}