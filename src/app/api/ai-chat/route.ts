/**
 * AI Chat API Route
 * 
 * Handles intelligent chat interactions using OpenAI/Anthropic
 * with context about Charles Jasema's portfolio and services
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiChatSystem, AIChatSystem, type AIMessage, type ChatContext } from '@/lib/ai-chat';
import { inputValidation, csrfProtection, rateLimiting, apiSecurity } from '@/lib/security';

// Rate limiter: 30 messages per hour per IP (generous for chat)
const chatRateLimiter = rateLimiting.createRateLimiter(30, 60 * 60 * 1000);

// Strict rate limiter: 5 messages per minute per IP (prevent spam)
const strictChatRateLimiter = rateLimiting.createRateLimiter(5, 60 * 1000);

interface ChatRequest {
  message: string;
  conversationHistory?: AIMessage[];
  userInfo?: {
    name?: string;
    email?: string;
    interestedIn?: 'portfolio' | 'music' | 'general';
  };
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
    if (!chatRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many chat messages. Please wait before continuing the conversation.',
          retryAfter: Math.ceil((chatRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
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

    // Apply strict rate limiting (anti-spam)
    if (!strictChatRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please slow down. Wait a moment before sending another message.',
          retryAfter: Math.ceil((strictChatRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Retry-After': '60',
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

    // Check if AI services are configured
    if (!aiChatSystem.isConfigured()) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'AI chat services are temporarily unavailable. Please contact Charles directly via WhatsApp at +256 785 446 877 or email brocharles001@gmail.com' 
        },
        { 
          status: 503,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Parse and validate request body
    let body: ChatRequest;
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
    if (!body.message || !body.csrfToken) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: message, csrfToken' },
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
    const sanitizedMessage = inputValidation.sanitizeString(body.message, 2000);
    
    if (sanitizedMessage.length < 1) {
      return NextResponse.json(
        { success: false, message: 'Message cannot be empty' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    if (sanitizedMessage.length > 2000) {
      return NextResponse.json(
        { success: false, message: 'Message too long. Please keep messages under 2000 characters.' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Check for inappropriate content (basic check)
    if (inputValidation.containsSqlInjection(sanitizedMessage)) {
      return NextResponse.json(
        { success: false, message: 'Invalid content detected' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Sanitize conversation history
    const sanitizedHistory: AIMessage[] = (body.conversationHistory || [])
      .slice(-20) // Keep last 20 messages max
      .map(msg => ({
        role: msg.role,
        content: inputValidation.sanitizeString(msg.content, 2000),
        timestamp: msg.timestamp || Date.now(),
      }))
      .filter(msg => msg.content.length > 0);

    // Detect user intent for analytics
    const intent = aiChatSystem.detectIntent(sanitizedMessage);

    // Build chat context
    const chatContext: ChatContext = {
      userQuery: sanitizedMessage,
      conversationHistory: sanitizedHistory,
      userInfo: body.userInfo ? {
        name: body.userInfo.name ? inputValidation.sanitizeString(body.userInfo.name, 100) : undefined,
        email: body.userInfo.email && inputValidation.isValidEmail(body.userInfo.email) 
          ? body.userInfo.email 
          : undefined,
        interestedIn: body.userInfo.interestedIn || 'general',
      } : undefined,
    };

    // Check for predefined responses first (faster, no API cost)
    const predefinedResponses = AIChatSystem.getPredefinedResponses();
    const lowerMessage = sanitizedMessage.toLowerCase().trim();
    
    let response;
    
    // Check for greeting patterns
    if (/^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings)$/i.test(lowerMessage)) {
      response = {
        success: true,
        message: predefinedResponses.greeting,
        model: 'predefined',
        tokensUsed: 0,
      };
    }
    // Check for contact info requests
    else if (/contact|reach|phone|email|whatsapp|get in touch/i.test(lowerMessage)) {
      response = {
        success: true,
        message: predefinedResponses.contact_info,
        model: 'predefined',
        tokensUsed: 0,
      };
    }
    // Check for pricing inquiries
    else if (/price|pricing|cost|quote|rates|fees|charges/i.test(lowerMessage)) {
      response = {
        success: true,
        message: predefinedResponses.pricing_inquiry,
        model: 'predefined',
        tokensUsed: 0,
      };
    }
    // Check for services overview
    else if (/services|what do you do|what can you do|offerings/i.test(lowerMessage)) {
      response = {
        success: true,
        message: predefinedResponses.services_list,
        model: 'predefined',
        tokensUsed: 0,
      };
    }
    // Use AI for complex queries
    else {
      response = await aiChatSystem.generateResponse(chatContext);
    }

    if (response.success) {
      // Generate quick reply suggestions
      const quickReplies = aiChatSystem.generateQuickReplies(sanitizedMessage);
      
      // Log successful chat interaction for analytics
      console.log('AI Chat interaction:', {
        intent: intent.primary,
        confidence: intent.confidence,
        model: response.model,
        tokensUsed: response.tokensUsed || 0,
        messageLength: sanitizedMessage.length,
        timestamp: new Date().toISOString(),
        clientIP: clientIP.replace(/\d+/g, 'XXX'),
      });

      return NextResponse.json(
        { 
          success: true, 
          message: response.message,
          quickReplies: quickReplies,
          intent: intent.primary,
          model: response.model,
          tokensUsed: response.tokensUsed || 0,
        },
        { 
          status: 200,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    } else {
      // Fallback to helpful message if AI fails
      const fallbackMessage = `I'm having trouble processing your request right now. For immediate assistance, please contact Charles directly:

📱 WhatsApp: +256 785 446 877
📧 Email: brocharles001@gmail.com

He'll be happy to help with any questions about his portfolio, services, or music ministry!`;

      return NextResponse.json(
        { 
          success: true, 
          message: fallbackMessage,
          quickReplies: [
            "Contact Charles on WhatsApp",
            "Send an email",
            "View his portfolio",
            "Learn about music ministry"
          ],
          fallback: true,
        },
        { 
          status: 200,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

  } catch (error) {
    console.error('AI Chat API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sorry, I encountered an error. Please try again or contact Charles directly at +256 785 446 877.' 
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
    { success: false, message: 'Method not allowed. Use POST to send chat messages.' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'POST, OPTIONS',
      }
    }
  );
}