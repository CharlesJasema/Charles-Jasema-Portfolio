import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { applyRateLimit, addRateLimitHeaders } from '@/middleware/rateLimiter'
import { inputValidation, apiSecurity, loggingSecurity } from '@/lib/security'

/**
 * Webhook endpoint for Sanity to trigger revalidation
 * Configure this URL in Sanity project settings: https://your-domain.com/api/revalidate?secret=YOUR_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = applyRateLimit(request, 'revalidation');
    if (!rateLimitResult.success) {
      console.warn(loggingSecurity.createLogEntry(
        'warn',
        'Rate limit exceeded for revalidation endpoint',
        { ip: request.headers.get('x-forwarded-for') || 'unknown' }
      ));
      return rateLimitResult.response!;
    }

    // Verify the secret token
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (!secret || secret !== process.env.SANITY_REVALIDATION_SECRET) {
      console.warn(loggingSecurity.createLogEntry(
        'warn',
        'Invalid or missing secret token for revalidation',
        { 
          ip: request.headers.get('x-forwarded-for') || 'unknown',
          hasSecret: !!secret,
          userAgent: request.headers.get('user-agent')
        }
      ));
      
      const response = NextResponse.json(
        { message: 'Invalid or missing secret token' },
        { 
          status: 401,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
      
      return addRateLimitHeaders(response, request, 'revalidation');
    }

    // Validate request content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const response = NextResponse.json(
        { message: 'Content-Type must be application/json' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
      
      return addRateLimitHeaders(response, request, 'revalidation');
    }

    // Parse and validate the request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      const response = NextResponse.json(
        { message: 'Invalid JSON in request body' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
      
      return addRateLimitHeaders(response, request, 'revalidation');
    }

    // Validate and sanitize input
    const validation = inputValidation.validateFormData(body);
    if (!validation.isValid) {
      console.warn(loggingSecurity.createLogEntry(
        'warn',
        'Invalid input detected in revalidation request',
        { errors: validation.errors }
      ));
      
      const response = NextResponse.json(
        { 
          message: 'Invalid input detected',
          errors: validation.errors
        },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
      
      return addRateLimitHeaders(response, request, 'revalidation');
    }

    const { _type } = validation.sanitized;

    if (!_type) {
      const response = NextResponse.json(
        { message: 'Missing _type in request body' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
      
      return addRateLimitHeaders(response, request, 'revalidation');
    }

    // Validate _type against allowed values
    const allowedTypes = ['song', 'musicVideo', 'project', 'blogPost', 'lyrics'];
    if (!allowedTypes.includes(_type)) {
      const response = NextResponse.json(
        { 
          message: `Invalid content type: ${_type}`,
          allowedTypes
        },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
      
      return addRateLimitHeaders(response, request, 'revalidation');
    }

    // Revalidate based on content type
    const revalidatedTags: string[] = []
    
    switch (_type) {
      case 'song':
        revalidateTag('songs')
        revalidatedTags.push('songs')
        break
        
      case 'musicVideo':
        revalidateTag('videos')
        revalidatedTags.push('videos')
        break
        
      case 'project':
        revalidateTag('projects')
        revalidatedTags.push('projects')
        break
        
      case 'blogPost':
        revalidateTag('blog')
        revalidatedTags.push('blog')
        break
        
      case 'lyrics':
        revalidateTag('lyrics')
        revalidatedTags.push('lyrics')
        break
    }

    console.log(loggingSecurity.createLogEntry(
      'info',
      'Successfully revalidated content',
      { 
        tags: revalidatedTags,
        contentType: _type,
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      }
    ));

    const response = NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      timestamp: new Date().toISOString()
    }, {
      headers: apiSecurity.getSecureApiHeaders()
    });
    
    return addRateLimitHeaders(response, request, 'revalidation');
    
  } catch (error) {
    console.error(loggingSecurity.createLogEntry(
      'error',
      'Error in revalidation endpoint',
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      }
    ));
    
    const response = NextResponse.json(
      {
        message: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
    
    return addRateLimitHeaders(response, request, 'revalidation');
  }
}

/**
 * Handle GET requests with helpful information
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = applyRateLimit(request, 'revalidation');
    if (!rateLimitResult.success) {
      return rateLimitResult.response!;
    }

    const secret = request.nextUrl.searchParams.get('secret')
    
    if (!secret || secret !== process.env.SANITY_REVALIDATION_SECRET) {
      console.warn(loggingSecurity.createLogEntry(
        'warn',
        'Unauthorized GET request to revalidation endpoint',
        { 
          ip: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent')
        }
      ));
      
      const response = NextResponse.json(
        { message: 'Invalid or missing secret token' },
        { 
          status: 401,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
      
      return addRateLimitHeaders(response, request, 'revalidation');
    }

    const response = NextResponse.json({
      message: 'Revalidation endpoint is active',
      usage: 'Send POST request with { "_type": "song" | "musicVideo" | "project" | "blogPost" | "lyrics" }',
      allowedTypes: ['song', 'musicVideo', 'project', 'blogPost', 'lyrics'],
      timestamp: new Date().toISOString()
    }, {
      headers: apiSecurity.getSecureApiHeaders()
    });
    
    return addRateLimitHeaders(response, request, 'revalidation');
    
  } catch (error) {
    console.error(loggingSecurity.createLogEntry(
      'error',
      'Error in revalidation GET endpoint',
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      }
    ));
    
    const response = NextResponse.json(
      {
        message: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
    
    return addRateLimitHeaders(response, request, 'revalidation');
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json(
    { message: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'GET, POST',
      }
    }
  );
  
  return addRateLimitHeaders(response, request, 'revalidation');
}

// Handle other HTTP methods
export const PUT = OPTIONS;
export const DELETE = OPTIONS;
export const PATCH = OPTIONS;
