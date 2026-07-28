/**
 * Download File API Route
 * 
 * Generates secure download links for files with tracking and analytics
 * Supports both Google Drive and Cloudflare R2 files
 */

import { NextRequest, NextResponse } from 'next/server';
import { cloudStorageService } from '@/lib/cloud-storage';
import { inputValidation, rateLimiting, apiSecurity } from '@/lib/security';

// Rate limiter: 20 downloads per hour per IP
const downloadRateLimiter = rateLimiting.createRateLimiter(20, 60 * 60 * 1000);

interface RouteContext {
  params: {
    fileId: string;
  };
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Apply rate limiting
    if (!downloadRateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Download limit exceeded. Please wait before downloading more files.',
          retryAfter: Math.ceil((downloadRateLimiter.getResetTime(clientIP) - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Retry-After': '3600',
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

    // Validate and sanitize file ID
    const fileId = context.params.fileId;
    if (!fileId || typeof fileId !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid file ID' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    const sanitizedFileId = inputValidation.sanitizeString(fileId, 200);
    
    if (sanitizedFileId.length < 1) {
      return NextResponse.json(
        { success: false, message: 'Invalid file ID format' },
        { 
          status: 400,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

    // Track download analytics
    await cloudStorageService.trackDownload(sanitizedFileId, {
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
    });

    // Generate download link based on file ID format
    let downloadResult;
    
    if (sanitizedFileId.includes('/')) {
      // Cloudflare R2 file path format
      downloadResult = await cloudStorageService.generateR2PresignedUrl(sanitizedFileId, 3600); // 1 hour expiry
    } else {
      // Google Drive file ID format
      downloadResult = await cloudStorageService.generateGoogleDriveDownloadLink(sanitizedFileId);
    }

    if (downloadResult.success) {
      // Log successful download generation
      console.log('Download link generated:', {
        fileId: sanitizedFileId.substring(0, 20) + '***', // Mask file ID for privacy
        fileName: downloadResult.fileName,
        timestamp: new Date().toISOString(),
        clientIP: clientIP.replace(/\d+/g, 'XXX'),
        userAgent: request.headers.get('user-agent')?.substring(0, 50),
      });

      return NextResponse.json(
        { 
          success: true,
          downloadUrl: downloadResult.downloadUrl,
          fileName: downloadResult.fileName,
          fileSize: downloadResult.fileSize,
          expiresAt: downloadResult.expiresAt,
          message: 'Download link generated successfully',
        },
        { 
          status: 200,
          headers: {
            ...apiSecurity.getSecureApiHeaders(),
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        }
      );
    } else {
      // Handle specific error cases
      let statusCode = 400;
      let errorMessage = downloadResult.error || 'Failed to generate download link';
      
      if (errorMessage.toLowerCase().includes('not found')) {
        statusCode = 404;
        errorMessage = 'File not found or has been removed';
      } else if (errorMessage.toLowerCase().includes('access denied') || 
                 errorMessage.toLowerCase().includes('unauthorized')) {
        statusCode = 403;
        errorMessage = 'Access denied. This file may be private or restricted.';
      } else if (errorMessage.toLowerCase().includes('expired')) {
        statusCode = 410;
        errorMessage = 'Download link has expired. Please request a new link.';
      }

      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage 
        },
        { 
          status: statusCode,
          headers: apiSecurity.getSecureApiHeaders()
        }
      );
    }

  } catch (error) {
    console.error('Download API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred while generating the download link' 
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
    { success: false, message: 'Method not allowed. Use GET to download files.' },
    { 
      status: 405,
      headers: {
        ...apiSecurity.getSecureApiHeaders(),
        'Allow': 'GET, OPTIONS',
      }
    }
  );
}