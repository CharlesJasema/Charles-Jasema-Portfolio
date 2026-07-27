'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type BrandMode = 'professional' | 'ministry' | 'unified';

interface BrandContextType {
  currentMode: BrandMode;
  setMode: (mode: BrandMode) => void;
  isTransitioning: boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [currentMode, setCurrentMode] = useState<BrandMode>('unified');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setMode = (mode: BrandMode) => {
    if (mode === currentMode) return;
    
    setIsTransitioning(true);
    
    // Add a smooth transition effect
    setTimeout(() => {
      setCurrentMode(mode);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 150);
  };

  useEffect(() => {
    // Set initial mode based on URL path or user preference
    const path = window.location.pathname;
    if (path.includes('/music') || path.includes('/lyrics') || path.includes('/ministry')) {
      setCurrentMode('ministry');
    } else if (path.includes('/portfolio') || path.includes('/projects')) {
      setCurrentMode('professional');
    }
  }, []);

  return (
    <BrandContext.Provider value={{ currentMode, setMode, isTransitioning }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrandContext() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandContext must be used within a BrandProvider');
  }
  return context;
}

// Brand-aware component wrapper
export function withBrandContext<P extends object>(
  Component: React.ComponentType<P & { brandMode?: BrandMode }>
) {
  return function BrandAwareComponent(props: P) {
    const { currentMode } = useBrandContext();
    return <Component {...props} brandMode={currentMode} />;
  };
}

// Brand-specific styling utilities
export const brandStyles = {
  professional: {
    primary: 'professional-blue',
    secondary: 'professional-blue-light',
    background: 'bg-background-professional',
    text: 'text-gray-900',
    accent: 'border-professional-blue',
    shadow: 'shadow-professional',
  },
  ministry: {
    primary: 'ministry-gold',
    secondary: 'ministry-burgundy',
    background: 'bg-background-ministry',
    text: 'text-gray-800',
    accent: 'border-ministry-burgundy',
    shadow: 'shadow-ministry',
  },
  unified: {
    primary: 'primary-gold',
    secondary: 'accent-red',
    background: 'bg-background-dark',
    text: 'text-white',
    accent: 'border-primary-gold',
    shadow: 'shadow-gold',
  },
};

// Brand-specific gradient backgrounds
export const brandGradients = {
  professional: 'bg-gradient-to-br from-professional-blue-light via-white to-professional-silver',
  ministry: 'bg-gradient-to-br from-ministry-ivory via-ministry-gold/20 to-ministry-burgundy/10',
  unified: 'bg-gradient-to-br from-background-dark via-primary-gold/10 to-accent-red/10',
};

// Helper function to get brand-specific classes
export function getBrandClasses(mode: BrandMode, type: keyof typeof brandStyles.unified) {
  return brandStyles[mode][type];
}