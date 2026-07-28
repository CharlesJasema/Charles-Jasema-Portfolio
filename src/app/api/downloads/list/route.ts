/**
 * Downloads List API Route
 * 
 * Provides public file listings from cloud storage providers
 * Supports filtering by category and search queries
 */

import { NextRequest, NextResponse } from 'next/server';
import { cloudStorageService } from '@/lib/cloud-storage';
import { inputValidation, rateLimiting, apiSecurity } from '@/lib/security';

// Rate limiter: 60 requests per minute per IP
const listRateLimiter = rateLimiting.createRateLimiter(60, 60 * 1000);

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Apply rate limiting
    if (!listRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please wait before making more requests.',
          retryAfter: Math.ceil((listRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Retry-After': '60',
          }
        }
      );
    }

    // Check if cloud storage is configured
    if (!cloudStorageService.isConfigured()) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Download service is temporarily unavailable' 
        },
        { 
          status: 503,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Parse query parameters
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
    const offset = Math.max(parseInt(url.searchParams.get('offset') || '0'), 0);

    // Validate category if provided
    const validCategories = ['portfolio', 'music', 'resources', 'templates'];
    const sanitizedCategory = category && validCategories.includes(category) ? category : undefined;

    // Validate and sanitize search query
    const sanitizedSearch = search ? inputValidation.sanitizeString(search, 100) : undefined;

    // Get files from cloud storage
    const allFiles = await cloudStorageService.getAllFiles(sanitizedCategory);

    // Filter by search query if provided
    let filteredFiles = allFiles;
    if (sanitizedSearch) {
      const searchLower = sanitizedSearch.toLowerCase();
      filteredFiles = allFiles.filter(file => 
        file.name.toLowerCase().includes(searchLower) ||
        file.description?.toLowerCase().includes(searchLower) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply pagination
    const totalFiles = filteredFiles.length;
    const paginatedFiles = filteredFiles.slice(offset, offset + limit);

    // Remove sensitive information and format response
    const safeFiles = paginatedFiles.map(file => ({
      id: file.id,
      name: file.name,
      size: file.size,
      mimeType: file.mimeType,
      description: file.description,
      category: file.category,
      thumbnailUrl: file.thumbnailUrl,
      createdAt: file.createdAt,
      modifiedAt: file.modifiedAt,
      tags: file.tags,
      downloadCount: file.downloadCount,
    }));

    return NextResponse.json(
      { 
        success: true,
        files: safeFiles,
        pagination: {
          total: totalFiles,
          limit,
          offset,
          hasMore: offset + limit < totalFiles,
        },
        categories: cloudStorageService.constructor.getFileCategories(),
      },
      { 
        status: 200,
        headers: {
          ...apiSecurity.getSecureApiHeaders(),
          'Cache-Control': 'public, max-age=300, s-maxage=600', // 5min browser, 10min CDN
        }
      }
    );

  } catch (error) {
    console.error('Downloads list API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to retrieve file list' 
      },
      { 
        status: 500,
        headers: apiSecurity.getSecureApiHeaders()
      }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      ...apiSecurity.getSecureApiHeaders(),
    },
  });
}

// Reject other methods
export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Use GET to list files.' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'GET, OPTIONS',
      }
    }
  );
}