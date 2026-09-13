/**
 * Environment Configuration
 * Centralized configuration for environment variables with fallbacks
 */

// Site Configuration
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Charles Jasema Portfolio',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Professional software engineer, graphics designer, and contemporary gospel artist',
};

// Social Media Links
export const socialLinks = {
  professional: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/charles-jada-sebit-emmanuel/',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/Charlesjasema',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/charlesjasema',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_CODE_URL || 'https://www.youtube.com/@CharlesJasema_Code_Design',
  },
  music: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_MUSIC_URL || 'https://www.instagram.com/charlesjasemamusic',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_MUSIC_URL || 'https://www.tiktok.com/@charlesjasemamusic',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_MUSIC_URL || 'https://www.youtube.com/@CharlesJasemaMusic',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_MUSIC_URL || 'https://www.facebook.com/share/1Aoqf2FLQ9/',
    mdundo: process.env.NEXT_PUBLIC_MDUNDO_URL || 'https://mdundo.com/song/1377029',
  },
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/256785446877',
    phone: process.env.NEXT_PUBLIC_PHONE_SOUTH_SUDAN || '+211927889594',
    email: `mailto:${process.env.NEXT_PUBLIC_EMAIL || 'brocharles001@gmail.com'}`,
    credly: process.env.NEXT_PUBLIC_CREDLY_URL || 'https://www.credly.com/users/charles-jada-sebit-emmanuel',
  }
};

// Project Repository URLs
export const projectUrls = {
  karibuGroceries: process.env.NEXT_PUBLIC_KARIBU_GITHUB_URL || 'https://github.com/CharlesJasema/Karibu-Groceries-Ltd-Uganda.git',
  camConnect: process.env.NEXT_PUBLIC_CAM_CONNECT_GITHUB_URL || 'https://github.com/CharlesJasema/CAM-CONNECT-MOBILE-APP.git',
  portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_GITHUB_URL || 'https://github.com/CharlesJasema/Charles-Jasema-Portfolio.git',
};

// Analytics Configuration (Optional)
export const analytics = {
  googleAnalytics: process.env.NEXT_PUBLIC_GA_ID || '',
  googleTagManager: process.env.NEXT_PUBLIC_GTM_ID || '',
};

// Server-side Configuration (No NEXT_PUBLIC prefix)
export const serverConfig = {
  resendApiKey: process.env.RESEND_API_KEY || '',
  webhookSecret: process.env.WEBHOOK_SECRET || '',
  encryptionKey: process.env.ENCRYPTION_KEY || '',
};

// Helper function to get full URL
export const getFullUrl = (path = '') => {
  const baseUrl = siteConfig.url.replace(/\/$/, ''); // Remove trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// Helper function to validate required environment variables
export const validateEnvironment = () => {
  const requiredVars = [
    'NEXT_PUBLIC_SITE_URL',
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    return false;
  }
  
  return true;
};

// Development/Production Environment Check
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';