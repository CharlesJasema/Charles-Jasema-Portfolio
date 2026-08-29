import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock Sanity connection test
    const mockResult = {
      success: true,
      message: 'Sanity connection test - mock response',
      timestamp: new Date().toISOString(),
      status: 'connected'
    };
    
    return NextResponse.json(mockResult);
  } catch (error) {
    console.error('Sanity test error:', error);
    return NextResponse.json(
      { success: false, error: 'Sanity test failed' },
      { status: 500 }
    );
  }
}