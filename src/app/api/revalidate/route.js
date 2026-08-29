import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    const body = await request.json();
    const { path, secret } = body;
    
    // Verify secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }
    
    // Revalidate path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true });
    }
    
    return NextResponse.json({ message: 'Path required' }, { status: 400 });
  } catch (error) {
    console.error('Revalidate error:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}