/**
 * CONFIGURATION FILE - STATIC DATA
 * 
 * PURPOSE: Static image data for consistent content structure
 * 
 * IMPORTANT: This data is used when CMS is unavailable or for static content
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
    musicLogo: '/images/logos/charles-jasema-music-logo.jpg',
    codeDesignLogo: '/images/logos/code-design-logo.jpg',
    brandLandscape: '/images/banners/Brand Landscape.png',
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
    liveWorship: '/images/professional/Performance 1.png',
    youthMinistry: '/images/professional/Performance 2.png',
    graduationCeremony: '/images/professional/Performance 3.png',
    communityOutreach: '/images/professional/Performance 4.png',
    churchService: '/images/professional/Performance 5.png',
  },

  // Placeholder for future images
  placeholders: {
    default: '/placeholder',
    project: '/images/project-placeholder.jpg',
  },
};

export default imagesConfig;
