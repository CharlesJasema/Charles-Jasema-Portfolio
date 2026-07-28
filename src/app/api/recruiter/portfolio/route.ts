/**
 * Recruiter Portfolio Data API Route
 * 
 * Provides enhanced portfolio information for authenticated recruiters
 * including private projects, detailed experience, and contact info
 */

import { NextRequest, NextResponse } from 'next/server';
import { recruiterAuthService } from '@/lib/recruiter-auth';
import { apiSecurity } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    // Get access token from Authorization header or cookie
    let accessToken = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!accessToken) {
      // Try to get from cookie
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        accessToken = cookies['recruiter_token'];
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: 'Access token required' },
        { 
          status: 401,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Validate session
    const validation = recruiterAuthService.validateSession(accessToken);
    
    if (!validation.isValid || !validation.session) {
      return NextResponse.json(
        { success: false, message: validation.error || 'Invalid or expired session' },
        { 
          status: 401,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Check if user has required features
    if (!validation.session.features.includes('private_projects')) {
      return NextResponse.json(
        { success: false, message: 'Insufficient access level' },
        { 
          status: 403,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Get enhanced portfolio data
    const portfolioData = recruiterAuthService.getEnhancedPortfolioData();

    // Log access for security monitoring
    console.log('Recruiter portfolio data accessed:', {
      sessionId: validation.session.id.substring(0, 8) + '***',
      timestamp: new Date().toISOString(),
      accessLevel: validation.session.accessLevel,
    });

    return NextResponse.json(
      {
        success: true,
        data: portfolioData,
        sessionInfo: {
          accessLevel: validation.session.accessLevel,
          features: validation.session.features,
          expiresAt: validation.session.expiresAt,
        },
      },
      { 
        status: 200,
        headers: {
          ...apiSecurity.getSecureApiHeaders(),
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        }
      }
    );

  } catch (error) {
    console.error('Recruiter portfolio API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to retrieve portfolio data' 
      },
      { 
        status: 500,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      ...apiSecurity.getSecureApiHeaders(),
    },
  });
}

// Reject other methods
export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Use GET to retrieve portfolio data.' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'GET, OPTIONS',
      }
    }
  );
}