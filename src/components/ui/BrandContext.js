'use client';

import { createContext, useContext, useState } from 'react';

const BrandContext = createContext(null);

export function BrandProvider({ children, defaultBrand = 'professional' }) {
  const [currentBrand, setCurrentBrand] = useState(defaultBrand);

  const brandStyles = {
    professional: {
      primary: 'text-professional-blue',
      secondary: 'text-slate-600',
      background: 'bg-professional-blue',
      border: 'border-professional-blue',
    },
    ministry: {
      primary: 'text-ministry-gold',
      secondary: 'text-ministry-burgundy',
      background: 'bg-ministry-gold',
      border: 'border-ministry-gold',
    },
  };

  const value = {
    currentBrand,
    setCurrentBrand,
    brandStyles: brandStyles[currentBrand],
    allBrandStyles: brandStyles,
  };

  return (
    <BrandContext.Provider value={value}>
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

export function withBrandContext(Component) {
  return function WrappedComponent(props) {
    return (
      <BrandProvider>
        <Component {...props} />
      </BrandProvider>
    );
  };
}

export function getBrandClasses(brand = 'professional') {
  return brandStyles[brand] || brandStyles.professional;
}

export function BrandTransition({ brand, children, className = '' }) {
  const { currentBrand } = useBrandContext();
  const isActive = currentBrand === brand;
  
  return (
    <div className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50'} ${className}`}>
      {children}
    </div>
  );
}

export { BrandContext };

export const brandStyles = {
  professional: {
    gradient: 'bg-gradient-to-r from-professional-blue to-professional-blue-light',
    text: 'text-professional-blue',
    background: 'bg-professional-blue',
  },
  ministry: {
    gradient: 'bg-gradient-to-r from-ministry-gold to-ministry-burgundy',
    text: 'text-ministry-gold',
    background: 'bg-ministry-gold',
  },
};

export const brandGradients = {
  professional: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
  ministry: 'linear-gradient(135deg, #D4AF37 0%, #800020 100%)',
};