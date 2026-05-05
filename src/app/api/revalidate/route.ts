import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook endpoint for Sanity to trigger revalidation
 * Configure this URL in Sanity project settings: https://your-domain.com/api/revalidate?secret=YOUR_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (!secret || secret !== process.env.SANITY_REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid or missing secret token' },
        { status: 401 }
      )
    }

    // Parse the request body
    const body = await request.json()
    const { _type } = body

    if (!_type) {
      return NextResponse.json(
        { message: 'Missing _type in request body' },
        { status: 400 }
      )
    }

    // Revalidate based on content type
    const revalidatedTags: string[] = []
    
    switch (_type) {
      case 'song':
        revalidateTag('songs')
        revalidatedTags.push('songs')
        break
        
      case 'musicVideo':
        revalidateTag('videos')
        revalidatedTags.push('videos')
        break
        
      case 'project':
        revalidateTag('projects')
        revalidatedTags.push('projects')
        break
        
      case 'blogPost':
        revalidateTag('blog')
        revalidatedTags.push('blog')
        break
        
      case 'lyrics':
        revalidateTag('lyrics')
        revalidatedTags.push('lyrics')
        break
        
      default:
        return NextResponse.json(
          { message: `Unknown content type: ${_type}` },
          { status: 400 }
        )
    }

    console.log(`[Revalidation] Successfully revalidated tags: ${revalidatedTags.join(', ')}`)

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('[Revalidation] Error:', error)
    
    return NextResponse.json(
      {
        message: 'Error revalidating content',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Handle GET requests with helpful information
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  if (!secret || secret !== process.env.SANITY_REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid or missing secret token' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is active',
    usage: 'Send POST request with { "_type": "song" | "musicVideo" | "project" | "blogPost" | "lyrics" }',
    timestamp: new Date().toISOString()
  })
}
