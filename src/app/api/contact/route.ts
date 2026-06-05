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

    // Send email using SendGrid
    try {
      const sgMail = require('@sendgrid/mail');
      
      // Only send if API key is configured
      if (process.env.SENDGRID_API_KEY) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Email to yourself (admin notification)
        const adminEmail = {
          to: 'brocharles001@gmail.com',
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@charlesjasema.com',
          replyTo: sanitizedData.email,
          subject: `Portfolio Contact: ${sanitizedData.subject}`,
          text: `
New Contact Form Submission

From: ${sanitizedData.name}
Email: ${sanitizedData.email}
Service: ${sanitizedData.service || 'General Inquiry'}
Subject: ${sanitizedData.subject}

Message:
${sanitizedData.message}

---
Submitted: ${sanitizedData.submittedAt}
IP: ${clientIP.replace(/\d+/g, 'XXX')}
          `.trim(),
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 8px; font-weight: bold;">From:</td>
                  <td style="padding: 12px 8px;">${sanitizedData.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 8px; font-weight: bold;">Email:</td>
                  <td style="padding: 12px 8px;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td>
                </tr>
                ${sanitizedData.service ? `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 8px; font-weight: bold;">Service:</td>
                  <td style="padding: 12px 8px;">${sanitizedData.service}</td>
                </tr>
                ` : ''}
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 8px; font-weight: bold;">Subject:</td>
                  <td style="padding: 12px 8px;">${sanitizedData.subject}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                <h3 style="margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
              </div>
              <div style="margin-top: 20px; padding: 12px; background-color: #f3f4f6; border-radius: 4px; font-size: 12px; color: #6b7280;">
                <p style="margin: 0;">Submitted: ${new Date(sanitizedData.submittedAt).toLocaleString()}</p>
              </div>
            </div>
          `,
        };

        await sgMail.send(adminEmail);
        console.log('Email sent successfully to admin');

        // Optional: Send confirmation email to user
        const userEmail = {
          to: sanitizedData.email,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@charlesjasema.com',
          subject: 'Thank you for contacting Charles Jasema',
          text: `
Dear ${sanitizedData.name},

Thank you for reaching out! I have received your message and will respond as soon as possible.

Your Message:
${sanitizedData.message}

Best regards,
Charles Jasema
Software Engineer | Graphics Designer | Gospel Artist

Website: https://charlesjasema.com
Email: brocharles001@gmail.com
Phone: +256785446877
          `.trim(),
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Thank You for Contacting Me!</h2>
              <p>Dear ${sanitizedData.name},</p>
              <p>Thank you for reaching out! I have received your message and will respond as soon as possible.</p>
              <div style="margin: 20px 0; padding: 16px; background-color: #f9fafb; border-left: 4px solid #2563eb;">
                <p style="margin: 0; font-style: italic;">"${sanitizedData.message.substring(0, 150)}${sanitizedData.message.length > 150 ? '...' : ''}"</p>
              </div>
              <p>Best regards,<br><strong>Charles Jasema</strong><br>Software Engineer | Graphics Designer | Gospel Artist</p>
              <div style="margin-top: 20px; padding: 16px; background-color: #f3f4f6; border-radius: 8px;">
                <p style="margin: 4px 0;">🌐 <a href="https://charlesjasema.com" style="color: #2563eb;">charlesjasema.com</a></p>
                <p style="margin: 4px 0;">📧 <a href="mailto:brocharles001@gmail.com" style="color: #2563eb;">brocharles001@gmail.com</a></p>
                <p style="margin: 4px 0;">📱 +256785446877</p>
              </div>
            </div>
          `,
        };

        await sgMail.send(userEmail);
        console.log('Confirmation email sent to user');
      } else {
        // Fallback: Just log if SendGrid not configured
        console.log('SendGrid not configured - Contact form submission:', {
          ...sanitizedData,
          clientIP: clientIP.replace(/\d+/g, 'XXX'),
        });
      }
    } catch (emailError) {
      // Log error but don't fail the request
      console.error('Email sending error:', emailError);
      // Still proceed with successful response - form submission is saved in logs
    }

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