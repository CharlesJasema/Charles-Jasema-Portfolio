/**
 * WhatsApp Webhook API Route
 * 
 * Handles incoming WhatsApp messages and webhook verification
 * Processes messages and sends auto-responses based on content
 */

import { NextRequest, NextResponse } from 'next/server';
import { whatsappAPI, WhatsAppUtils } from '@/lib/whatsapp';
import { apiSecurity } from '@/lib/security';

// Auto-response messages based on keywords
const AUTO_RESPONSES = {
  portfolio: WhatsAppUtils.getTemplates().portfolioInquiry,
  music: WhatsAppUtils.getTemplates().musicMinistryBooking,
  booking: WhatsAppUtils.getTemplates().musicMinistryBooking,
  ministry: WhatsAppUtils.getTemplates().musicMinistryBooking,
  worship: WhatsAppUtils.getTemplates().musicMinistryBooking,
  default: WhatsAppUtils.getTemplates().generalThankYou,
};

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    // Webhook verification
    if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
      console.log('WhatsApp webhook verified successfully');
      return new NextResponse(challenge, {
        status: 200,
        headers: apiSecurity.getSecureApiHeaders(),
      });
    } else {
      console.error('WhatsApp webhook verification failed:', { mode, token: token ? 'present' : 'missing' });
      return NextResponse.json(
        { success: false, message: 'Webhook verification failed' },
        {
          status: 403,
          headers: apiSecurity.getSecureApiHeaders(),
        }
      );
    }
  } catch (error) {
    console.error('WhatsApp webhook GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      {
        status: 500,
        headers: apiSecurity.getSecureApiHeaders(),
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('x-hub-signature-256');
    if (!signature) {
      return NextResponse.json(
        { success: false, message: 'Missing signature' },
        {
          status: 400,
          headers: apiSecurity.getSecureApiHeaders(),
        }
      );
    }

    const payload = await request.text();
    
    if (!whatsappAPI.verifyWebhookSignature(payload, signature.replace('sha256=', ''))) {
      console.error('WhatsApp webhook signature verification failed');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        {
          status: 401,
          headers: apiSecurity.getSecureApiHeaders(),
        }
      );
    }

    // Parse webhook data
    const webhookData = JSON.parse(payload);
    
    // Process incoming message
    const messageData = whatsappAPI.processWebhookMessage(webhookData);
    
    if (messageData && messageData.messageType === 'text') {
      console.log('Received WhatsApp message:', {
        from: messageData.from.replace(/\d{4}$/, 'XXXX'), // Mask phone number
        message: messageData.message?.substring(0, 50) + '...', // Truncate for privacy
        timestamp: new Date(messageData.timestamp * 1000).toISOString(),
      });

      // Send auto-response based on message content
      await handleAutoResponse(messageData.from, messageData.message || '');
      
      // Forward message to admin (optional)
      await forwardMessageToAdmin(messageData);
    }

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: apiSecurity.getSecureApiHeaders(),
      }
    );

  } catch (error) {
    console.error('WhatsApp webhook POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      {
        status: 500,
        headers: apiSecurity.getSecureApiHeaders(),
      }
    );
  }
}

/**
 * Handle auto-responses based on message content
 */
async function handleAutoResponse(from: string, message: string): Promise<void> {
  try {
    const lowerMessage = message.toLowerCase();
    let responseTemplate = AUTO_RESPONSES.default;
    let context = '';

    // Determine response based on keywords
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('website') || lowerMessage.includes('development')) {
      responseTemplate = AUTO_RESPONSES.portfolio;
      context = 'Portfolio Inquiry';
    } else if (lowerMessage.includes('music') || lowerMessage.includes('booking') || lowerMessage.includes('ministry') || lowerMessage.includes('worship')) {
      responseTemplate = AUTO_RESPONSES.music;
      context = 'Music Ministry';
    }

    // Extract name from message (basic attempt)
    const nameMatch = lowerMessage.match(/i'm\s+(\w+)|my\s+name\s+is\s+(\w+)|this\s+is\s+(\w+)/i);
    const extractedName = nameMatch ? (nameMatch[1] || nameMatch[2] || nameMatch[3]) : 'there';
    const name = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

    // Generate response
    const response = typeof responseTemplate === 'function' 
      ? responseTemplate(name, context) 
      : responseTemplate(name);

    // Send auto-response
    await whatsappAPI.sendTextMessage(from, response);
    
    console.log('Auto-response sent:', {
      to: from.replace(/\d{4}$/, 'XXXX'),
      type: context || 'General',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Auto-response error:', error);
  }
}

/**
 * Forward incoming messages to admin via email (optional)
 */
async function forwardMessageToAdmin(messageData: {
  from: string;
  message?: string;
  timestamp: number;
}): Promise<void> {
  try {
    // Only forward if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) return;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const adminEmail = {
      to: 'brocharles001@gmail.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@charlesjasema.com',
      subject: 'New WhatsApp Message Received',
      text: `
New WhatsApp Message

From: ${messageData.from}
Message: ${messageData.message}
Received: ${new Date(messageData.timestamp * 1000).toLocaleString()}

---
Auto-response has been sent automatically.
Reply to this message via WhatsApp Business Manager or the WhatsApp Business API.
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #25D366;">📱 New WhatsApp Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 8px; font-weight: bold;">From:</td>
              <td style="padding: 12px 8px;">${messageData.from}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 8px; font-weight: bold;">Received:</td>
              <td style="padding: 12px 8px;">${new Date(messageData.timestamp * 1000).toLocaleString()}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #25D366;">
            <h3 style="margin-top: 0; color: #25D366;">Message:</h3>
            <p style="white-space: pre-wrap; margin-bottom: 0;">${messageData.message}</p>
          </div>
          <div style="margin-top: 20px; padding: 12px; background-color: #f3f4f6; border-radius: 4px; font-size: 14px; color: #6b7280;">
            <p style="margin: 0;">✅ Auto-response has been sent automatically.</p>
            <p style="margin: 5px 0 0 0;">Reply via WhatsApp Business Manager or the WhatsApp Business API.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(adminEmail);
    
  } catch (error) {
    console.error('Forward message to admin error:', error);
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Hub-Signature-256',
      'Access-Control-Max-Age': '86400',
      ...apiSecurity.getSecureApiHeaders(),
    },
  });
}