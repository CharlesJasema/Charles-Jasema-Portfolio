/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables fallbacks for build
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id',
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  
  // TypeScript configuration - allow build to continue with warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration - skip during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'youtu.be',
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
  },

  // Compression
  compress: true,

  // Performance optimizations
  poweredByHeader: false,
  generateEtags: true,

  // Security Headers
  headers: async () => {
    const isDev = process.env.NODE_ENV === 'development';
    
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy - Very permissive for development
          {
            key: 'Content-Security-Policy',
            value: isDev ? [
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data:",
              "style-src 'self' 'unsafe-inline' https: http: data:",
              "font-src 'self' 'unsafe-inline' https: http: data:",
              "img-src 'self' 'unsafe-inline' data: blob: https: http:",
              "media-src 'self' 'unsafe-inline' https: http: data:",
              "connect-src 'self' 'unsafe-inline' https: http: ws: wss: data:",
              "frame-src 'self' 'unsafe-inline' https: http:",
              "object-src 'self' 'unsafe-inline' data:",
              "base-uri 'self'",
              "form-action 'self' https: http:",
              "frame-ancestors 'self' https: http:"
            ].join('; ') : [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://ssl.google-analytics.com https://embed.tawk.to https://va.tawk.to https://core.sanity.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://core.sanity.io",
              "font-src 'self' https://fonts.gstatic.com https://core.sanity.io",
              "img-src 'self' data: blob: https: http:",
              "media-src 'self' https:",
              "connect-src 'self' https://www.google-analytics.com https://ssl.google-analytics.com https://googletagmanager.com https://vitals.vercel-analytics.com https://cdn.sanity.io https://api.sanity.io https://6omuzt9o.api.sanity.io https://6omuzt9o.apicdn.sanity.io https://core.sanity.io wss://embed.tawk.to",
              "frame-src 'self' https://www.youtube.com https://youtu.be https://embed.tawk.to",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
          // Prevent MIME type sniffing (disabled for dev)
          ...(isDev ? [] : [{
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          }]),
          // Prevent clickjacking (disabled for dev)
          ...(isDev ? [] : [{
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          }]),
          // XSS Protection (disabled for dev)
          ...(isDev ? [] : [{
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          }]),
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: [
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
              'picture-in-picture=(self)'
            ].join(', '),
          },
          // Strict Transport Security (HTTPS only)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Cross-Origin Embedder Policy
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          // Cross-Origin Opener Policy
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          // Cross-Origin Resource Policy
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
          // Remove server information
          {
            key: 'Server',
            value: '',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
          // API-specific security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ];
  },

  // Redirects for old URLs
  redirects: async () => {
    return [];
  },

  // Rewrites for API routes
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Webpack optimization
  webpack: (config, { isServer, dev }) => {
    // Production optimizations
    if (!dev) {
      config.optimization.minimize = true;
      config.optimization.sideEffects = false;
      
      // Bundle analyzer (optional)
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        );
      }
    }

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };

    return config;
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'react-hot-toast',
      'clsx'
    ],
    scrollRestoration: true,
  },

  // Output configuration  
  output: 'standalone',
  
  // Disable static optimization during build for pages with external data
  generateBuildId: async () => {
    return 'charles-jasema-portfolio-build';
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
