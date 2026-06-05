import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

export async function GET() {
  try {
    // Test basic connection
    const result = await client.fetch('*[_type == "song"][0...1]')
    
    return NextResponse.json({
      success: true,
      message: 'Sanity connection successful',
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      sampleData: result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Sanity connection error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Sanity connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}