/**
 * CONFIGURATION FILE - LEGACY DATA
 * 
 * PURPOSE: This file serves as emergency fallback when Sanity CMS is unavailable
 * 
 * IMPORTANT:
 * - All dynamic content should come from Sanity CMS
 * - This file exists only as a safety net for degraded service scenarios
 * - Static image paths can remain here for reference
 * 
 * TO UPDATE CONTENT: Use Sanity Studio at /studio
 * 
 * ---
 * 
 * Images Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update image paths across the website
 * All images should be placed in the /public/images/ folder
 */

export const imagesConfig = {
  // Logos & Branding
  logos: {
    musicLogo: '/images/CJ Music Logo.jpeg',
    codeDesignLogo: '/images/Code & Design Logo.jpeg',
    codeDesignBanner: '/images/Code & Design Banner.jpeg',
    professionalLogo: '/images/charles-jasema-code-design-logo.jpg',
    musicBrandLogo: '/images/charles-jasema-music-logo.jpg',
  },

  // Professional Photos
  profile: {
    // Primary professional headshot - formal tuxedo
    professional: '/images/charles-jasema-professional-headshot.jpg',
    // Music ministry - keyboard performance
    ministry: '/images/charles-jasema-music-ministry.jpg',
    // Business professional - grey suit
    business: '/images/charles-jasema-business-professional.jpg',
    // Creative/artistic - colorful lighting
    creative: '/images/charles-jasema-creative-portrait.jpg',
    // Casual professional - yellow shirt
    casual: '/images/charles-jasema-casual-professional.jpg',
    // Full body professional - grey suit full
    fullBody: '/images/charles-jasema-full-body-professional.jpg',
  },

  // Project Screenshots
  projects: {
    karibuGroceries: '/images/karibu-groceries-screenshot.jpg',
    portfolioWebsite: '/images/portfolio-website-screenshot.jpg',
    camConnectApp: '/images/cam-connect-app-screenshot.jpg',
  },

  // Banners & Headers
  banners: {
    codeDesignBanner: '/images/Code & Design Banner.jpeg',
    professionalHeader: '/images/charles-jasema-professional-header.jpg',
  },

  // Music Ministry Photos
  music: {
    liveWorship: '/images/charles-jasema-live-worship-performance.jpg',
    youthMinistry: '/images/charles-jasema-youth-ministry.jpg',
    graduationCeremony: '/images/charles-jasema-graduation-ceremony.jpg',
    communityOutreach: '/images/charles-jasema-community-outreach.jpg',
    churchService: '/images/charles-jasema-church-service.jpg',
  },

  // Placeholder for future images
  placeholders: {
    default: '/placeholder',
    project: '/images/project-placeholder.jpg',
  },
} as const;

export type ImagesConfig = typeof imagesConfig;
