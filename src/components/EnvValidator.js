'use client';

/**
 * Environment Variable Validator Component
 * Only shows in development mode to help debug environment issues
 */

import { useEffect } from 'react';

const EnvValidator = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Environment Variables Check:');
      console.log('GA_ID:', process.env.NEXT_PUBLIC_GA_ID);
      console.log('PHONE_SOUTH_SUDAN:', process.env.NEXT_PUBLIC_PHONE_SOUTH_SUDAN);
      console.log('EMAIL:', process.env.NEXT_PUBLIC_EMAIL);
      console.log('SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
      
      // Validate critical environment variables
      const criticalEnvs = {
        'Google Analytics': process.env.NEXT_PUBLIC_GA_ID,
        'South Sudan Phone': process.env.NEXT_PUBLIC_PHONE_SOUTH_SUDAN,
        'Email': process.env.NEXT_PUBLIC_EMAIL,
        'Site URL': process.env.NEXT_PUBLIC_SITE_URL,
      };
      
      const missing = Object.entries(criticalEnvs)
        .filter(([, value]) => !value || value.includes('XXXXXX'))
        .map(([key]) => key);
        
      if (missing.length > 0) {
        console.warn('⚠️ Missing environment variables:', missing);
      } else {
        console.log('✅ All critical environment variables loaded successfully');
      }
    }
  }, []);

  // Don't render anything in production
  return null;
};

export default EnvValidator;