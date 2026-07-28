/**
 * WhatsApp Send Message API Route
 * 
 * Secure endpoint for sending messages via WhatsApp Business API
 * Includes rate limiting, validation, and comprehensive error handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { whatsappAPI, WhatsAppUtils } from '@/lib/whatsapp';
import { inputValidation, csrfProtection, rateLimiting, apiSecurity } from '@/lib/security';

// Rate limiter: 10 messages per hour per IP
const whatsappRateLimiter = rateLimiting.createRateLimiter(10, 60 * 60 * 1000);

interface SendMessageRequest {
  to: string;
  message: string;
  type?: 'text' | 'template' | 'document';
  templateName?: string;
  documentUrl?: string;
  filename?: string;
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
    if (!whatsappRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many WhatsApp messages. Please wait before sending more.',
          retryAfter: Math.ceil((whatsappRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
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

    // Check if WhatsApp is configured
    if (!whatsappAPI.isConfigured()) {
      return NextResponse.json(
        { success: false, message: 'WhatsApp Business API is not configured' },
        { 
          status: 503,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Parse and validate request body
    let body: SendMessageRequest;
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
    if (!body.to || !body.message || !body.csrfToken) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: to, message, csrfToken' },
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
    const sanitizedData = {
      to: inputValidation.sanitizeString(body.to, 20),
      message: inputValidation.sanitizeString(body.message, 4096),
      type: body.type || 'text',
      templateName: body.templateName ? inputValidation.sanitizeString(body.templateName, 50) : undefined,
      documentUrl: body.documentUrl ? inputValidation.sanitizeString(body.documentUrl, 500) : undefined,
      filename: body.filename ? inputValidation.sanitizeString(body.filename, 100) : undefined,
    };

    // Validate phone number
    if (!inputValidation.isValidPhoneNumber(sanitizedData.to)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate message length
    if (sanitizedData.message.length < 1 || sanitizedData.message.length > 4096) {
      return NextResponse.json(
        { success: false, message: 'Message must be between 1 and 4096 characters' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    let result;

    // Send appropriate message type
    switch (sanitizedData.type) {
      case 'text':
        result = await whatsappAPI.sendTextMessage(
          sanitizedData.to,
          sanitizedData.message
        );
        break;

      case 'template':
        if (!sanitizedData.templateName) {
          return NextResponse.json(
            { success: false, message: 'Template name required for template messages' },
            { 
              status: 400,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }
        result = await whatsappAPI.sendTemplateMessage(
          sanitizedData.to,
          sanitizedData.templateName,
          'en'
        );
        break;

      case 'document':
        if (!sanitizedData.documentUrl) {
          return NextResponse.json(
            { success: false, message: 'Document URL required for document messages' },
            { 
              status: 400,
              headers: apiSecurity.getSecureApiHeaders()
            }
          );
        }
        result = await whatsappAPI.sendDocument(
          sanitizedData.to,
          sanitizedData.documentUrl,
          sanitizedData.filename,
          sanitizedData.message
        );
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid message type' },
          { 
            status: 400,
            headers: apiSecurity.getSecureApiHeaders()
          }
        );
    }

    if (result.success) {
      // Log successful message for admin
      console.log('WhatsApp message sent successfully:', {
        to: sanitizedData.to.replace(/\d{4}$/, 'XXXX'), // Mask phone number
        type: sanitizedData.type,
        messageId: result.messageId,
        timestamp: new Date().toISOString(),
        clientIP: clientIP.replace(/\d+/g, 'XXX'),
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully',
          messageId: result.messageId 
        },
        { 
          status: 200,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Failed to send message' 
        },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

  } catch (error) {
    console.error('WhatsApp send API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { 
        status: 500,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
  }
}

// Handle OPTIONS requests for CORS
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