/**
 * Security Utilities
 * 
 * Comprehensive security helpers for input validation, sanitization, and protection
 */

/**
 * Input validation and sanitization
 */
export const inputValidation = {
  /**
   * Sanitize HTML input to prevent XSS attacks
   */
  sanitizeHtml: (input: string): string => {
    if (typeof input !== 'string') return '';
    
    // Basic HTML entity encoding
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Validate URL format
   */
  isValidUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  },

  /**
   * Sanitize string input
   */
  sanitizeString: (input: string, maxLength: number = 1000): string => {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/[<>]/g, ''); // Remove potential HTML tags
  },

  /**
   * Validate phone number format
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Check for SQL injection patterns
   */
  containsSqlInjection: (input: string): boolean => {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(--|\/\*|\*\/|;|'|"|`)/,
      /(\bOR\b|\bAND\b).*?[=<>]/i,
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  },

  /**
   * Validate and sanitize form data
   */
  validateFormData: (data: Record<string, any>): {
    isValid: boolean;
    errors: string[];
    sanitized: Record<string, any>;
  } => {
    const errors: string[] = [];
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Check for potential security threats
        if (inputValidation.containsSqlInjection(value)) {
          errors.push(`Invalid characters detected in ${key}`);
          continue;
        }

        // Sanitize the value
        sanitized[key] = inputValidation.sanitizeString(value);
      } else {
        sanitized[key] = value;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized,
    };
  },
};

/**
 * Rate limiting utilities
 */
export const rateLimiting = {
  /**
   * Simple in-memory rate limiter
   */
  createRateLimiter: (maxRequests: number, windowMs: number) => {
    const requests = new Map<string, number[]>();

    return {
      isAllowed: (identifier: string): boolean => {
        const now = Date.now();
        const windowStart = now - windowMs;
        
        // Get existing requests for this identifier
        const userRequests = requests.get(identifier) || [];
        
        // Filter out old requests
        const recentRequests = userRequests.filter(time => time > windowStart);
        
        // Check if under limit
        if (recentRequests.length >= maxRequests) {
          return false;
        }
        
        // Add current request
        recentRequests.push(now);
        requests.set(identifier, recentRequests);
        
        return true;
      },
      
      getRemainingRequests: (identifier: string): number => {
        const now = Date.now();
        const windowStart = now - windowMs;
        const userRequests = requests.get(identifier) || [];
        const recentRequests = userRequests.filter(time => time > windowStart);
        
        return Math.max(0, maxRequests - recentRequests.length);
      },
      
      getResetTime: (identifier: string): number => {
        const userRequests = requests.get(identifier) || [];
        if (userRequests.length === 0) return 0;
        
        const oldestRequest = Math.min(...userRequests);
        return oldestRequest + windowMs;
      },
    };
  },
};

/**
 * CSRF protection utilities
 */
export const csrfProtection = {
  /**
   * Generate CSRF token
   */
  generateToken: (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Validate CSRF token
   */
  validateToken: (token: string, expectedToken: string): boolean => {
    if (!token || !expectedToken) return false;
    return token === expectedToken;
  },
};

/**
 * Content Security Policy utilities
 */
export const cspUtils = {
  /**
   * Generate nonce for inline scripts
   */
  generateNonce: (): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  },

  /**
   * Create CSP header value
   */
  createCspHeader: (nonce?: string): string => {
    const directives = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-eval' ${nonce ? `'nonce-${nonce}'` : "'unsafe-inline'"} https://www.googletagmanager.com https://www.google-analytics.com https://embed.tawk.to https://va.tawk.to`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "media-src 'self' https:",
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-analytics.com https://cdn.sanity.io https://api.sanity.io wss://embed.tawk.to",
      "frame-src 'self' https://www.youtube.com https://youtu.be https://embed.tawk.to",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ];

    return directives.join('; ');
  },
};

/**
 * Password security utilities
 */
export const passwordSecurity = {
  /**
   * Validate password strength
   */
  validatePassword: (password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length < 8) {
      feedback.push('Password must be at least 8 characters long');
    } else {
      score += 1;
    }

    if (!/[a-z]/.test(password)) {
      feedback.push('Password must contain at least one lowercase letter');
    } else {
      score += 1;
    }

    if (!/[A-Z]/.test(password)) {
      feedback.push('Password must contain at least one uppercase letter');
    } else {
      score += 1;
    }

    if (!/\d/.test(password)) {
      feedback.push('Password must contain at least one number');
    } else {
      score += 1;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      feedback.push('Password must contain at least one special character');
    } else {
      score += 1;
    }

    return {
      isValid: score >= 4,
      score,
      feedback,
    };
  },

  /**
   * Generate secure random password
   */
  generateSecurePassword: (length: number = 16): string => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    return Array.from(array, byte => charset[byte % charset.length]).join('');
  },
};

/**
 * Session security utilities
 */
export const sessionSecurity = {
  /**
   * Generate secure session ID
   */
  generateSessionId: (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Validate session expiry
   */
  isSessionExpired: (createdAt: number, maxAge: number): boolean => {
    return Date.now() - createdAt > maxAge;
  },
};

/**
 * File upload security utilities
 */
export const fileUploadSecurity = {
  /**
   * Validate file type
   */
  isAllowedFileType: (filename: string, allowedTypes: string[]): boolean => {
    const extension = filename.toLowerCase().split('.').pop();
    return extension ? allowedTypes.includes(extension) : false;
  },

  /**
   * Validate file size
   */
  isAllowedFileSize: (size: number, maxSize: number): boolean => {
    return size <= maxSize;
  },

  /**
   * Sanitize filename
   */
  sanitizeFilename: (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 255);
  },

  /**
   * Check for malicious file patterns
   */
  isMaliciousFile: (filename: string): boolean => {
    const maliciousPatterns = [
      /\.exe$/i,
      /\.bat$/i,
      /\.cmd$/i,
      /\.scr$/i,
      /\.pif$/i,
      /\.com$/i,
      /\.vbs$/i,
      /\.js$/i,
      /\.jar$/i,
      /\.php$/i,
      /\.asp$/i,
      /\.jsp$/i,
    ];

    return maliciousPatterns.some(pattern => pattern.test(filename));
  },
};

/**
 * API security utilities
 */
export const apiSecurity = {
  /**
   * Validate API key format
   */
  isValidApiKey: (apiKey: string): boolean => {
    return /^[a-zA-Z0-9]{32,}$/.test(apiKey);
  },

  /**
   * Generate API key
   */
  generateApiKey: (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Validate request origin
   */
  isValidOrigin: (origin: string, allowedOrigins: string[]): boolean => {
    return allowedOrigins.includes(origin);
  },

  /**
   * Create secure headers for API responses
   */
  getSecureApiHeaders: (): Record<string, string> => {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    };
  },
};

/**
 * Environment security utilities
 */
export const environmentSecurity = {
  /**
   * Check if running in production
   */
  isProduction: (): boolean => {
    return process.env.NODE_ENV === 'production';
  },

  /**
   * Validate environment variables
   */
  validateEnvVars: (requiredVars: string[]): {
    isValid: boolean;
    missing: string[];
  } => {
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    return {
      isValid: missing.length === 0,
      missing,
    };
  },

  /**
   * Sanitize environment variable for logging
   */
  sanitizeEnvVar: (value: string): string => {
    if (!value) return '';
    
    // Show only first and last 2 characters for sensitive data
    if (value.length > 8) {
      return `${value.slice(0, 2)}${'*'.repeat(value.length - 4)}${value.slice(-2)}`;
    }
    
    return '*'.repeat(value.length);
  },
};

/**
 * Logging security utilities
 */
export const loggingSecurity = {
  /**
   * Sanitize log data to prevent log injection
   */
  sanitizeLogData: (data: any): any => {
    if (typeof data === 'string') {
      return data.replace(/[\r\n\t]/g, ' ').substring(0, 1000);
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          sanitized[key] = value.replace(/[\r\n\t]/g, ' ').substring(0, 1000);
        } else {
          sanitized[key] = value;
        }
      }
      return sanitized;
    }
    
    return data;
  },

  /**
   * Create secure log entry
   */
  createLogEntry: (level: string, message: string, data?: any): string => {
    const timestamp = new Date().toISOString();
    const sanitizedMessage = loggingSecurity.sanitizeLogData(message);
    const sanitizedData = data ? loggingSecurity.sanitizeLogData(data) : null;
    
    return JSON.stringify({
      timestamp,
      level,
      message: sanitizedMessage,
      ...(sanitizedData && { data: sanitizedData }),
    });
  },
};