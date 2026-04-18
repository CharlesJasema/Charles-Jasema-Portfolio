/**
 * Site Configuration
 * 
 * This file contains all site-wide configuration including:
 * - Personal information
 * - Social media links (Professional & Music Ministry)
 * - Contact information
 * - Site metadata
 * 
 * ⚠️ ADMIN: Edit this file to update your information across the entire site
 * All changes here will automatically update throughout the website.
 */

export const siteConfig = {
  // Personal Information
  name: 'Charles Jasema',
  fullName: 'Charles Jada Sebit Emmanuel',
  musicName: 'Charles Jasema Music',
  jasemaMeaning: 'JA from JADA, SE from SEBIT, & MA from EMMANUEL',
  title: 'Software Engineer, Designer & Gospel Artist',
  description: 'Premium portfolio showcasing software engineering, graphics design, IT support, videography, and gospel music ministry.',
  
  // Personal Details
  personal: {
    gender: 'Male',
    dateOfBirth: 'March 30th, 1998',
    nationality: 'South Sudanese',
    hometown: 'Mundu, Kupera, South Sudan',
    currentLocation: 'Kampala, Uganda',
  },
  
  // Contact Information
  contact: {
    email: 'brocharles001@gmail.com',
    phone: '+256785446877',
    alternatePhone: '+256745063600',
    whatsapp: '0785446877',
    location: 'Kampala, Uganda',
  },

  // Professional Social Media Links
  professional: {
    linkedin: 'https://www.linkedin.com/in/charles-jasema-0a7b24210',
    twitter: 'https://x.com/Charlesjasema',
    youtube: 'https://www.youtube.com/@CharlesJasema_Code_Design',
    github: 'https://github.com/charlesjasema',
  },

  // Music Ministry Social Media Links
  music: {
    instagram: 'https://www.instagram.com/charlesjasemamusic',
    twitter: 'https://x.com/JasemaMusic',
    tiktok: 'https://www.tiktok.com/@charlesjasemamusic',
    youtube: 'https://www.youtube.com/@CharlesJasemaMusic',
    facebook: 'https://www.facebook.com/share/1Aoqf2FLQ9/',
    mdundo: 'https://mdundo.com/song/1377029',
  },

  // Site URLs
  url: 'https://charlesjasema.com',
  
  // SEO Keywords
  keywords: [
    'Software Engineer',
    'Graphics Designer',
    'Gospel Artist',
    'Videographer',
    'IT Professional',
    'Worship Leader',
    'Portfolio',
    'Charles Jasema',
    'Web Developer',
    'UI/UX Designer',
    'South Sudanese Developer',
  ],
} as const;

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig;
