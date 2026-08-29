/**
 * Security Configuration
 * 
 * Centralized security settings and constants
 */

export const securityConfig = {
  // Rate limiting settings
  rateLimits: {
    general: {
      maxRequests: 100,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
    contact: {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
    newsletter: {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
    revalidation: {
      maxRequests: 10,
      windowMs: 60 * 1000, // 1 minute
    },
  },

  // Content Security Policy settings
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://embed.tawk.to",
      "https://va.tawk.to",
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
    ],
    imgSrc: [
      "'self'",
      "data:",
      "blob:",
      "https:",
      "http:",
    ],
    mediaSrc: [
      "'self'",
      "https:",
    ],
    connectSrc: [
      "'self'",
      "https://www.google-analytics.com",
      "https://vitals.vercel-analytics.com",
      "https://cdn.sanity.io",
      "https://api.sanity.io",
      "wss://embed.tawk.to",
    ],
    frameSrc: [
      "'self'",
      "https://www.youtube.com",
      "https://youtu.be",
      "https://embed.tawk.to",
    ],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'self'"],
    upgradeInsecureRequests: true,
  },

  // Allowed origins for CORS
  allowedOrigins: [
    'https://charlesjasema.com',
    'https://www.charlesjasema.com',
    ...(process.env.NODE_ENV === 'development' ? [
      'http://localhost:3000',
      'http://localhost:3001',
    ] : []),
  ],

  // File upload restrictions
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'txt'],
    blockedTypes: ['exe', 'bat', 'cmd', 'scr', 'pif', 'com', 'vbs', 'js', 'jar', 'php', 'asp', 'jsp'],
  },

  // Password requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxLength: 128,
  },

  // Session settings
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const,
  },

  // API security settings
  api: {
    maxRequestSize: '1mb',
    timeout: 30000, // 30 seconds
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  },

  // Input validation limits
  validation: {
    maxStringLength: 1000,
    maxArrayLength: 100,
    maxObjectDepth: 5,
  },

  // Blocked user agents (regex patterns)
  blockedUserAgents: [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
  ],

  // Allowed bots (regex patterns)
  allowedBots: [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
  ],

  // Suspicious request patterns
  suspiciousPatterns: [
    /\.\./,  // Path traversal
    /<script/i,  // XSS attempts
    /union.*select/i,  // SQL injection
    /javascript:/i,  // JavaScript protocol
    /data:.*base64/i,  // Data URLs with base64
    /eval\(/i,  // Code execution
    /exec\(/i,  // Command execution
    /system\(/i,  // System calls
  ],

  // Security headers
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=(self)',
      'encrypted-media=(self)',
      'fullscreen=(self)',
      'picture-in-picture=(self)',
    ].join(', '),
  },

  // Environment validation
  requiredEnvVars: [
    'NEXT_PUBLIC_SITE_URL',
    'SANITY_PROJECT_ID',
    'SANITY_DATASET',
    'SANITY_API_TOKEN',
    'SANITY_REVALIDATION_SECRET',
  ],

  // Logging settings
  logging: {
    maxLogLength: 1000,
    sensitiveFields: ['password', 'token', 'secret', 'key', 'auth'],
    logLevels: ['error', 'warn', 'info', 'debug'],
  },
};

/**
 * Validate security configuration
 */
export function validateSecurityConfig(): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate required environment variables
  const missingEnvVars = securityConfig.requiredEnvVars.filter(
    varName => !process.env[varName]
  );

  if (missingEnvVars.length > 0) {
    errors.push(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }

  // Validate rate limit settings
  Object.entries(securityConfig.rateLimits).forEach(([key, config]) => {
    if (config.maxRequests <= 0) {
      errors.push(`Invalid maxRequests for ${key}: must be greater than 0`);
    }
    if (config.windowMs <= 0) {
      errors.push(`Invalid windowMs for ${key}: must be greater than 0`);
    }
  });

  // Validate file upload settings
  if (securityConfig.fileUpload.maxSize <= 0) {
    errors.push('Invalid file upload maxSize: must be greater than 0');
  }

  // Validate password requirements
  if (securityConfig.password.minLength < 8) {
    errors.push('Password minLength should be at least 8 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get security configuration for specific environment
 */
export function getSecurityConfig() {
  const validation = validateSecurityConfig();
  
  if (!validation.isValid) {
    console.error('Security configuration validation failed:', validation.errors);
    throw new Error('Invalid security configuration');
  }

  return securityConfig;
}