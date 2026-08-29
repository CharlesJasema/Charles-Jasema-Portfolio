import { NextResponse } from 'next/server';
import { getDownloadUrl } from '@/lib/cloud-storage';

export async function GET(request, { params }) {
  try {
    const { fileId } = params;
    
    if (!fileId) {
      return NextResponse.json({ error: 'File ID required' }, { status: 400 });
    }
    
    // Mock file download URL
    const downloadUrl = await getDownloadUrl(fileId);
    
    return NextResponse.json({ downloadUrl }, { status: 200 });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}