import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/newsletter';

// Simple rate limiting storage
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const limit = 5; // requests
  const window = 15 * 60 * 1000; // 15 minutes
  
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
          message: 'Too many submissions. Please wait 15 minutes before trying again.'
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, service, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
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

    // Prepare contact data
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || `New inquiry from ${name}`,
      message: message.trim(),
      type: service || 'general',
      timestamp: new Date().toISOString(),
      ip: clientIP
    };

    // Send email using our newsletter service
    const result = await sendContactEmail(contactData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.'
      });
    } else {
      throw new Error(result.message || 'Failed to send message');
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint. Use POST to submit contact form.' },
    { status: 200 }
  );
}