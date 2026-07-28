/**
 * Cloud Storage Integration
 * 
 * Provides secure file sharing and download management with multiple providers:
 * - Google Drive for easy file management
 * - Cloudflare R2 for high-performance CDN delivery
 * - Direct file uploads and secure download links
 */

interface CloudStorageConfig {
  googleDrive: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    folderId: string;
  };
  cloudflareR2: {
    accountId: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
    publicUrl: string;
  };
}

interface FileMetadata {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  downloadUrl: string;
  thumbnailUrl?: string;
  description?: string;
  category: 'portfolio' | 'music' | 'resources' | 'templates';
  isPublic: boolean;
  createdAt: string;
  modifiedAt: string;
  downloadCount: number;
  tags: string[];
}

interface UploadResult {
  success: boolean;
  fileId?: string;
  downloadUrl?: string;
  error?: string;
  provider: 'google-drive' | 'cloudflare-r2';
}

interface DownloadResult {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
  expiresAt?: string;
}

class CloudStorageService {
  private config: CloudStorageConfig;
  private googleDriveAccessToken: string = '';
  private tokenExpiryTime: number = 0;

  constructor() {
    this.config = {
      googleDrive: {
        clientId: process.env.GOOGLE_DRIVE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET || '',
        refreshToken: process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '',
        folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || '',
      },
      cloudflareR2: {
        accountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID || '',
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
        bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME || 'charles-jasema-downloads',
        publicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL || '',
      },
    };
  }

  /**
   * Check if cloud storage services are configured
   */
  public isConfigured(): boolean {
    return !!(
      (this.config.googleDrive.clientId && this.config.googleDrive.clientSecret && this.config.googleDrive.refreshToken) ||
      (this.config.cloudflareR2.accountId && this.config.cloudflareR2.accessKeyId && this.config.cloudflareR2.secretAccessKey)
    );
  }

  /**
   * Get or refresh Google Drive access token
   */
  private async getGoogleDriveAccessToken(): Promise<string> {
    try {
      // Return cached token if still valid
      if (this.googleDriveAccessToken && Date.now() < this.tokenExpiryTime) {
        return this.googleDriveAccessToken;
      }

      // Refresh token
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.config.googleDrive.clientId,
          client_secret: this.config.googleDrive.clientSecret,
          refresh_token: this.config.googleDrive.refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
      }

      const data = await response.json();
      this.googleDriveAccessToken = data.access_token;
      this.tokenExpiryTime = Date.now() + (data.expires_in * 1000) - 60000; // 1 minute buffer

      return this.googleDriveAccessToken;
    } catch (error) {
      console.error('Google Drive token refresh error:', error);
      throw error;
    }
  }

  /**
   * List files from Google Drive
   */
  public async listGoogleDriveFiles(category?: string): Promise<FileMetadata[]> {
    try {
      const accessToken = await this.getGoogleDriveAccessToken();
      
      // Build query
      let query = `'${this.config.googleDrive.folderId}' in parents and trashed=false`;
      if (category) {
        query += ` and name contains '${category}'`;
      }

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,size,mimeType,createdTime,modifiedTime,description,webContentLink,thumbnailLink)&orderBy=modifiedTime desc`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.files.map((file: any) => ({
        id: file.id,
        name: file.name,
        size: parseInt(file.size) || 0,
        mimeType: file.mimeType,
        downloadUrl: file.webContentLink,
        thumbnailUrl: file.thumbnailLink,
        description: file.description || '',
        category: this.categorizeFile(file.name),
        isPublic: true,
        createdAt: file.createdTime,
        modifiedAt: file.modifiedTime,
        downloadCount: 0, // Would need separate tracking
        tags: this.extractTagsFromFileName(file.name),
      }));
    } catch (error) {
      console.error('Google Drive list files error:', error);
      return [];
    }
  }

  /**
   * Generate secure download link for Google Drive file
   */
  public async generateGoogleDriveDownloadLink(fileId: string): Promise<DownloadResult> {
    try {
      const accessToken = await this.getGoogleDriveAccessToken();
      
      // Get file metadata
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name,size,mimeType,webContentLink`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        return { success: false, error: 'File not found or access denied' };
      }

      const file = await response.json();
      
      // Generate direct download link
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      
      return {
        success: true,
        downloadUrl,
        fileName: file.name,
        fileSize: parseInt(file.size) || 0,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      };
    } catch (error) {
      console.error('Google Drive download link error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Upload file to Cloudflare R2
   */
  public async uploadToCloudflareR2(
    file: Buffer,
    fileName: string,
    mimeType: string,
    category: string
  ): Promise<UploadResult> {
    try {
      const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
      
      const s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${this.config.cloudflareR2.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: this.config.cloudflareR2.accessKeyId,
          secretAccessKey: this.config.cloudflareR2.secretAccessKey,
        },
      });

      // Generate unique file path
      const timestamp = new Date().toISOString().split('T')[0];
      const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${category}/${timestamp}/${sanitizedFileName}`;

      const command = new PutObjectCommand({
        Bucket: this.config.cloudflareR2.bucketName,
        Key: filePath,
        Body: file,
        ContentType: mimeType,
        Metadata: {
          category,
          uploadedAt: new Date().toISOString(),
          originalName: fileName,
        },
      });

      await s3Client.send(command);

      // Generate public URL
      const downloadUrl = `${this.config.cloudflareR2.publicUrl}/${filePath}`;

      return {
        success: true,
        fileId: filePath,
        downloadUrl,
        provider: 'cloudflare-r2',
      };
    } catch (error) {
      console.error('Cloudflare R2 upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
        provider: 'cloudflare-r2',
      };
    }
  }

  /**
   * Generate presigned URL for Cloudflare R2 file
   */
  public async generateR2PresignedUrl(
    filePath: string,
    expiresInSeconds: number = 3600
  ): Promise<DownloadResult> {
    try {
      const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
      const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

      const s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${this.config.cloudflareR2.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: this.config.cloudflareR2.accessKeyId,
          secretAccessKey: this.config.cloudflareR2.secretAccessKey,
        },
      });

      const command = new GetObjectCommand({
        Bucket: this.config.cloudflareR2.bucketName,
        Key: filePath,
      });

      const downloadUrl = await getSignedUrl(s3Client, command, {
        expiresIn: expiresInSeconds,
      });

      return {
        success: true,
        downloadUrl,
        fileName: filePath.split('/').pop() || 'download',
        expiresAt: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
      };
    } catch (error) {
      console.error('R2 presigned URL error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate download link',
      };
    }
  }

  /**
   * Get combined file listing from all providers
   */
  public async getAllFiles(category?: string): Promise<FileMetadata[]> {
    const allFiles: FileMetadata[] = [];

    try {
      // Get Google Drive files
      if (this.config.googleDrive.clientId) {
        const driveFiles = await this.listGoogleDriveFiles(category);
        allFiles.push(...driveFiles);
      }

      // Get R2 files (would need separate implementation for listing R2 objects)
      // For now, we'll focus on Google Drive as the primary source

      // Sort by modification date (newest first)
      return allFiles.sort((a, b) => 
        new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
      );
    } catch (error) {
      console.error('Get all files error:', error);
      return [];
    }
  }

  /**
   * Track download analytics
   */
  public async trackDownload(fileId: string, userInfo?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
  }): Promise<void> {
    try {
      // Log download for analytics
      console.log('File download tracked:', {
        fileId,
        timestamp: new Date().toISOString(),
        userAgent: userInfo?.userAgent?.substring(0, 100),
        referrer: userInfo?.referrer,
        ip: userInfo?.ip?.replace(/\d+/g, 'XXX'), // Masked for privacy
      });

      // In a real implementation, this would update a database
      // For now, we're just logging for monitoring
    } catch (error) {
      console.error('Download tracking error:', error);
    }
  }

  /**
   * Categorize file based on name and type
   */
  private categorizeFile(fileName: string): 'portfolio' | 'music' | 'resources' | 'templates' {
    const lowerName = fileName.toLowerCase();
    
    if (lowerName.includes('music') || lowerName.includes('song') || lowerName.includes('worship') || 
        lowerName.includes('.mp3') || lowerName.includes('.wav') || lowerName.includes('.m4a')) {
      return 'music';
    } else if (lowerName.includes('template') || lowerName.includes('example') || lowerName.includes('starter')) {
      return 'templates';
    } else if (lowerName.includes('portfolio') || lowerName.includes('project') || lowerName.includes('case-study')) {
      return 'portfolio';
    }
    
    return 'resources';
  }

  /**
   * Extract tags from file name
   */
  private extractTagsFromFileName(fileName: string): string[] {
    const tags: string[] = [];
    const lowerName = fileName.toLowerCase();
    
    // File type tags
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension) {
      tags.push(extension);
    }
    
    // Content tags
    if (lowerName.includes('react')) tags.push('react');
    if (lowerName.includes('nextjs') || lowerName.includes('next.js')) tags.push('nextjs');
    if (lowerName.includes('typescript')) tags.push('typescript');
    if (lowerName.includes('javascript')) tags.push('javascript');
    if (lowerName.includes('css') || lowerName.includes('tailwind')) tags.push('css');
    if (lowerName.includes('figma') || lowerName.includes('design')) tags.push('design');
    if (lowerName.includes('mobile') || lowerName.includes('app')) tags.push('mobile');
    if (lowerName.includes('web')) tags.push('web');
    if (lowerName.includes('api')) tags.push('api');
    if (lowerName.includes('database')) tags.push('database');
    
    // Music tags
    if (lowerName.includes('worship')) tags.push('worship');
    if (lowerName.includes('praise')) tags.push('praise');
    if (lowerName.includes('gospel')) tags.push('gospel');
    if (lowerName.includes('instrumental')) tags.push('instrumental');
    if (lowerName.includes('acoustic')) tags.push('acoustic');
    
    return [...new Set(tags)]; // Remove duplicates
  }

  /**
   * Get predefined file categories and descriptions
   */
  public static getFileCategories() {
    return {
      portfolio: {
        name: 'Portfolio Projects',
        description: 'Source code, documentation, and resources from Charles\'s professional projects',
        icon: 'Code',
        color: 'blue',
      },
      music: {
        name: 'Music & Worship',
        description: 'Songs, instrumental tracks, chord charts, and ministry resources',
        icon: 'Music',
        color: 'purple',
      },
      resources: {
        name: 'Learning Resources',
        description: 'Tutorials, guides, templates, and educational materials',
        icon: 'BookOpen',
        color: 'green',
      },
      templates: {
        name: 'Code Templates',
        description: 'Starter projects, boilerplates, and reusable code components',
        icon: 'FileCode',
        color: 'orange',
      },
    };
  }
}

// Export singleton instance
export const cloudStorageService = new CloudStorageService();

// Export types
export type { 
  FileMetadata, 
  UploadResult, 
  DownloadResult, 
  CloudStorageConfig 
};

export { CloudStorageService };