/**
 * Social Media Link Validator
 * Utility to validate that all social media links are properly formatted
 */

import { socialLinks } from './config';

// Helper function to validate URL format
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Validate all social media links
export const validateSocialLinks = () => {
  const results = {
    valid: [],
    invalid: [],
    warnings: []
  };

  // Check professional links
  Object.entries(socialLinks.professional).forEach(([key, url]) => {
    if (isValidUrl(url)) {
      results.valid.push({ category: 'professional', key, url });
    } else {
      results.invalid.push({ category: 'professional', key, url, error: 'Invalid URL format' });
    }
  });

  // Check music links
  Object.entries(socialLinks.music).forEach(([key, url]) => {
    if (isValidUrl(url)) {
      results.valid.push({ category: 'music', key, url });
    } else {
      results.invalid.push({ category: 'music', key, url, error: 'Invalid URL format' });
    }
  });

  // Check contact links
  Object.entries(socialLinks.contact).forEach(([key, url]) => {
    if (key === 'email' && !url.startsWith('mailto:')) {
      results.warnings.push({ category: 'contact', key, url, warning: 'Email should start with mailto:' });
    } else if (isValidUrl(url)) {
      results.valid.push({ category: 'contact', key, url });
    } else {
      results.invalid.push({ category: 'contact', key, url, error: 'Invalid URL format' });
    }
  });

  return results;
};

// Get all links as an array for easy testing
export const getAllSocialLinks = () => {
  const allLinks = [];
  
  Object.entries(socialLinks.professional).forEach(([key, url]) => {
    allLinks.push({ category: 'professional', platform: key, url });
  });
  
  Object.entries(socialLinks.music).forEach(([key, url]) => {
    allLinks.push({ category: 'music', platform: key, url });
  });
  
  Object.entries(socialLinks.contact).forEach(([key, url]) => {
    allLinks.push({ category: 'contact', platform: key, url });
  });
  
  return allLinks;
};

// Check if link is accessible (for development testing)
export const checkLinkAccessibility = async (url) => {
  try {
    // Note: This won't work in browser due to CORS, but useful for server-side validation
    const response = await fetch(url, { method: 'HEAD' });
    return {
      url,
      accessible: response.ok,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      url,
      accessible: false,
      error: error.message
    };
  }
};

// Development helper to log all links
export const logAllLinks = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🔗 Social Media Links Validation');
    
    const validation = validateSocialLinks();
    
    if (validation.valid.length > 0) {
      console.log('✅ Valid Links:', validation.valid);
    }
    
    if (validation.invalid.length > 0) {
      console.error('❌ Invalid Links:', validation.invalid);
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Warnings:', validation.warnings);
    }
    
    console.groupEnd();
  }
};