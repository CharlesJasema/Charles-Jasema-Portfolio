import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Environment-based recruiter authentication
    const RECRUITER_EMAIL = process.env.RECRUITER_EMAIL;
    const RECRUITER_PASSWORD = process.env.RECRUITER_PASSWORD;
    
    if (!RECRUITER_EMAIL || !RECRUITER_PASSWORD) {
      return NextResponse.json({
        success: false,
        message: 'Authentication not configured'
      }, { status: 503 });
    }
    
    if (email === RECRUITER_EMAIL && password === RECRUITER_PASSWORD) {
      return NextResponse.json({
        success: true,
        token: process.env.JWT_SECRET ? `jwt-${Date.now()}` : 'auth-token',
        user: { email, role: 'recruiter' }
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Recruiter auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication service error' },
      { status: 500 }
    );
  }
}