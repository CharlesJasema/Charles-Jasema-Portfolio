// Security utilities and configurations

// Environment variables validation
export const validateEnvVars = () => {
  const requiredVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_GA_ID',
  ];

  const optionalVars = [
    'SANITY_PROJECT_ID',
    'SANITY_DATASET',
    'SANITY_API_TOKEN',
    'EMAILJS_SERVICE_ID',
    'EMAILJS_TEMPLATE_ID',
    'EMAILJS_PUBLIC_KEY',
    'TAWK_TO_WIDGET_ID',
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
  }

  return {
    hasAllRequired: missing.length === 0,
    missing,
    optional: optionalVars.filter(varName => !process.env[varName])
  };
};

// Content Security Policy
export const getCSPDirectives = () => {
  const isProd = process.env.NODE_ENV === 'production';
  
  return {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://embed.tawk.to",
      "https://va.tawk.to",
      ...(isProd ? [] : ["'unsafe-eval'"]) // Allow eval in development
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com"
    ],
    'font-src': [
      "'self'",
      "https://fonts.gstatic.com"
    ],
    'img-src': [
      "'self'",
      "data:",
      "https:",
      "https://www.google-analytics.com",
      "https://www.googletagmanager.com"
    ],
    'connect-src': [
      "'self'",
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
      "https://va.tawk.to",
      "https://embed.tawk.to"
    ],
    'frame-src': [
      "https://www.youtube.com",
      "https://embed.tawk.to"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': isProd ? [] : null
  };
};

// Security headers
export const getSecurityHeaders = () => {
  const cspDirectives = getCSPDirectives();
  const csp = Object.entries(cspDirectives)
    .filter(([_, values]) => values !== null)
    .map(([directive, values]) => 
      Array.isArray(values) 
        ? `${directive} ${values.join(' ')}`
        : directive
    )
    .join('; ');

  return [
    {
      key: 'Content-Security-Policy',
      value: csp
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains'
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()'
    }
  ];
};

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Rate limiting helper
export const createRateLimit = (windowMs = 15 * 60 * 1000, max = 5) => {
  const requests = new Map();
  
  return (identifier) => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(identifier)) {
      requests.set(identifier, []);
    }
    
    const userRequests = requests.get(identifier);
    const validRequests = userRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= max) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    
    return true; // Request allowed
  };
};

// File upload security
export const validateFileUpload = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
  
  return true;
};

// Environment check
export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isProduction = () => process.env.NODE_ENV === 'production';

// Error logging (replace with your preferred service)
export const logError = (error, context = {}) => {
  if (isProduction()) {
    // In production, you might want to send to a service like Sentry
    console.error('Production error:', error, context);
  } else {
    console.error('Development error:', error, context);
  }
};