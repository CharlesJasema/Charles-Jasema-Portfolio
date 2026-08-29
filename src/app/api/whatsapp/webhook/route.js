import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('WhatsApp webhook received:', body);
    
    // Mock webhook handling
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}

export async function GET() {
  // Webhook verification
  return NextResponse.json({ message: 'WhatsApp webhook endpoint' }, { status: 200 });
}