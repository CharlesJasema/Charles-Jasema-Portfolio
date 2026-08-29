// Mock cloud storage functionality for build compatibility

export class CloudStorageService {
  constructor(config = {}) {
    this.config = {
      provider: config.provider || 'mock',
      bucket: config.bucket || 'portfolio-files',
      region: config.region || 'us-east-1',
      ...config
    };
  }

  async uploadFile(file, key) {
    try {
      console.log(`Mock upload: ${key} to ${this.config.bucket}`);
      
      // Mock successful upload
      return {
        success: true,
        key,
        url: `https://mock-cdn.com/${this.config.bucket}/${key}`,
        size: file.size || 0,
        etag: 'mock-etag-' + Date.now()
      };
    } catch (error) {
      console.error('Mock upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteFile(key) {
    try {
      console.log(`Mock delete: ${key} from ${this.config.bucket}`);
      
      return {
        success: true,
        message: 'File deleted successfully'
      };
    } catch (error) {
      console.error('Mock delete error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getSignedUrl(key, expires = 3600) {
    try {
      console.log(`Mock signed URL for: ${key} (expires in ${expires}s)`);
      
      // Mock signed URL
      const expireTime = Date.now() + (expires * 1000);
      return `https://mock-cdn.com/${this.config.bucket}/${key}?expires=${expireTime}&signature=mock`;
    } catch (error) {
      console.error('Mock signed URL error:', error);
      throw error;
    }
  }

  async listFiles(prefix = '') {
    try {
      console.log(`Mock list files with prefix: ${prefix}`);
      
      // Mock file list
      return {
        success: true,
        files: [],
        count: 0
      };
    } catch (error) {
      console.error('Mock list files error:', error);
      return {
        success: false,
        files: [],
        error: error.message
      };
    }
  }

  async getFileInfo(key) {
    try {
      console.log(`Mock file info for: ${key}`);
      
      return {
        success: true,
        key,
        size: 0,
        lastModified: new Date(),
        contentType: 'application/octet-stream'
      };
    } catch (error) {
      console.error('Mock file info error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create default instance
export const cloudStorage = new CloudStorageService();

// Utility functions
export async function uploadPortfolioFile(file, category = 'general') {
  const key = `portfolio/${category}/${Date.now()}-${file.name}`;
  return await cloudStorage.uploadFile(file, key);
}

export async function uploadMusicFile(file, type = 'audio') {
  const key = `music/${type}/${Date.now()}-${file.name}`;
  return await cloudStorage.uploadFile(file, key);
}

export async function getDownloadUrl(fileId) {
  try {
    return await cloudStorage.getSignedUrl(fileId, 3600); // 1 hour
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw error;
  }
}

export default cloudStorage;