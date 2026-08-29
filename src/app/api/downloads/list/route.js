import { NextResponse } from 'next/server';
import { cloudStorage } from '@/lib/cloud-storage';

export async function GET() {
  try {
    // Get list of available files
    const result = await cloudStorage.listFiles('downloads/');
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        files: result.files,
        count: result.count
      });
    } else {
      throw new Error(result.error || 'Failed to list files');
    }
  } catch (error) {
    console.error('Downloads list error:', error);
    return NextResponse.json(
      { 
        success: false,
        files: [],
        error: 'Failed to fetch download list'
      },
      { status: 500 }
    );
  }
}