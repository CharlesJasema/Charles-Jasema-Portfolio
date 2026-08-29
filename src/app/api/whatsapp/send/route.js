import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, message } = body;
    
    // Mock WhatsApp send
    console.log('Mock WhatsApp send:', { to, message });
    
    return NextResponse.json({
      success: true,
      messageId: 'mock-message-id-' + Date.now(),
      status: 'sent'
    });
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}