import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;
    
    // Mock AI response
    const mockResponse = {
      success: true,
      response: "Hi! This is a mock AI response. The actual AI integration will be implemented with proper API keys.",
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { success: false, error: 'Chat service temporarily unavailable' },
      { status: 500 }
    );
  }
}