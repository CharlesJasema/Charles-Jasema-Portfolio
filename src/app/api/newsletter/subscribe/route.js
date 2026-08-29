import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/newsletter';

// Simple rate limiting for newsletter subscriptions
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const limit = 3; // requests
  const window = 10 * 60 * 1000; // 10 minutes
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  const validRequests = requests.filter(time => now - time < window);
  
  if (validRequests.length >= limit) {
    return true;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return false;
}

export async function POST(request) {
  try {
    // Get client IP
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many subscription attempts. Please wait 10 minutes before trying again.'
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email, name } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address is required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Subscribe to newsletter
    const result = await subscribeToNewsletter(email.trim().toLowerCase(), name?.trim() || '');

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to the newsletter! Thank you for joining.'
      });
    } else {
      throw new Error(result.message || 'Failed to subscribe');
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sorry, there was an error with your subscription. Please try again.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Newsletter subscription API endpoint. Use POST to subscribe.' },
    { status: 200 }
  );
}