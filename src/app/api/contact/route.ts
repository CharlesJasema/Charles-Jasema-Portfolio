/**
 * Contact Form API Route
 * 
 * Secure endpoint for handling contact form submissions with comprehensive validation,
 * rate limiting, CSRF protection, and input sanitization.
 */

import { NextRequest, NextResponse } from 'next/server';
import { inputValidation, csrfProtection, rateLimiting, apiSecurity } from '@/lib/security';

// Rate limiter: 5 submissions per 15 minutes per IP
const contactRateLimiter = rateLimiting.createRateLimiter(5, 15 * 60 * 1000);

// Strict rate limiter: 1 submission per minute per IP (for additional protection)
const strictRateLimiter = rateLimiting.createRateLimiter(1, 60 * 1000);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
  csrfToken: string;
  timestamp: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Apply rate limiting
    if (!contactRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many submissions. Please wait 15 minutes before trying again.',
          retryAfter: Math.ceil((contactRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Retry-After': '900', // 15 minutes
          }
        }
      );
    }

    // Apply strict rate limiting
    if (!strictRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please wait 1 minute between submissions.',
          retryAfter: Math.ceil((strictRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Retry-After': '60', // 1 minute
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

    // Validate Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Invalid Content-Type. Expected application/json.' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Parse request body
    let body: ContactFormData;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body.' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ['name', 'email', 'subject', 'message', 'csrfToken'];
    const missingFields = requiredFields.filter(field => !body[field]?.trim());
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
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
        { success: false, message: 'Invalid CSRF token. Please refresh the page and try again.' },
        { 
          status: 403,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate and sanitize form data
    const validation = inputValidation.validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid input detected.',
          errors: validation.errors 
        },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Additional field-specific validation
    const errors: string[] = [];

    // Validate name
    if (body.name.length < 2 || body.name.length > 100) {
      errors.push('Name must be between 2 and 100 characters');
    }

    // Validate email
    if (!inputValidation.isValidEmail(body.email)) {
      errors.push('Invalid email address format');
    }

    // Validate subject
    if (body.subject.length < 5 || body.subject.length > 200) {
      errors.push('Subject must be between 5 and 200 characters');
    }

    // Validate message
    if (body.message.length < 10 || body.message.length > 2000) {
      errors.push('Message must be between 10 and 2000 characters');
    }

    // Validate service (optional field)
    if (body.service && body.service.length > 50) {
      errors.push('Service field is too long');
    }

    // Check timestamp (prevent replay attacks)
    if (body.timestamp) {
      const submissionTime = new Date(body.timestamp).getTime();
      const now = Date.now();
      const timeDiff = now - submissionTime;
      
      // Reject submissions older than 1 hour or from the future
      if (timeDiff > 60 * 60 * 1000 || timeDiff < -60 * 1000) {
        errors.push('Invalid submission timestamp');
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors 
        },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Sanitize the data
    const sanitizedData = {
      name: inputValidation.sanitizeString(body.name, 100),
      email: inputValidation.sanitizeString(body.email, 254),
      subject: inputValidation.sanitizeString(body.subject, 200),
      service: inputValidation.sanitizeString(body.service || '', 50),
      message: inputValidation.sanitizeString(body.message, 2000),
      timestamp: body.timestamp,
      userAgent: inputValidation.sanitizeString(body.userAgent || '', 200),
      clientIP: clientIP,
      submittedAt: new Date().toISOString(),
    };

    // TODO: Implement actual email sending logic here
    // For now, we'll just log the sanitized data and return success
    console.log('Contact form submission:', {
      ...sanitizedData,
      clientIP: clientIP.replace(/\d+/g, 'XXX'), // Mask IP for privacy in logs
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you would:
    // 1. Send email using a service like SendGrid, AWS SES, or Nodemailer
    // 2. Store the submission in a database
    // 3. Send confirmation email to the user
    // 4. Notify administrators

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      },
      { 
        status: 200,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { 
        status: 500,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
      'Access-Control-Max-Age': '86400',
      ...apiSecurity.getSecureApiHeaders(),
    },
  });
}

// Reject all other HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'POST, OPTIONS',
      }
    }
  );
}