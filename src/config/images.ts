/**
 * Images Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update image paths across the website
 * All images should be placed in the /public/images/ folder
 */

export const imagesConfig = {
  // Logos
  logos: {
    musicLogo: '/images/CJ Music Logo.jpeg',
    codeDesignLogo: '/images/Code & Design Logo.jpeg',
    codeDesignBanner: '/images/Code & Design Banner.jpeg',
  },

  // Profile Images
  profile: {
    professional: '/images/professional image.JPG',
    ministry: '/images/Ministry Image 1.jpg',
  },

  // Project Screenshots
  projects: {
    kglScreenshot: '/images/KGL Screenshot.jpg',
  },

  // Placeholder for future images
  placeholders: {
    default: '/placeholder',
  },
} as const;

export type ImagesConfig = typeof imagesConfig;
