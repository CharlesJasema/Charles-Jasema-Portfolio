'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useBrandContext, BrandMode } from './BrandContext';

interface DualIdentityLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  href?: string;
  forceMode?: BrandMode;
}

export function DualIdentityLogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  href = '/',
  forceMode
}: DualIdentityLogoProps) {
  const { currentMode } = useBrandContext();
  const activeMode = forceMode || currentMode;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const LogoContent = () => (
    <div className={clsx('flex items-center space-x-3 group', className)}>
      {/* Dual Identity Logo Image */}
      <div className={clsx(
        'relative rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110',
        sizeClasses[size]
      )}>
        {activeMode === 'professional' ? (
          <Image
            src="/images/Code & Design Logo.jpeg"
            alt="Charles Jasema - Professional Logo"
            fill
            className="object-cover"
            sizes="80px"
            priority
          />
        ) : activeMode === 'ministry' ? (
          <Image
            src="/images/CJ Music Logo.jpeg"
            alt="Charles Jasema - Ministry Logo"
            fill
            className="object-cover"
            sizes="80px"
            priority
          />
        ) : (
          // Unified mode - show both logos in a creative split design
          <div className="relative w-full h-full">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/Code & Design Logo.jpeg"
                alt="Professional"
                fill
                className="object-cover"
                style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
              />
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/CJ Music Logo.jpeg"
                alt="Ministry"
                fill
                className="object-cover"
                style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
              />
            </div>
            {/* Golden divider line */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary-gold transform -translate-x-0.5" />
          </div>
        )}
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="hidden sm:flex flex-col">
          {activeMode === 'professional' ? (
            <>
              <span className={clsx(
                'font-professional-heading font-bold text-professional-blue group-hover:text-professional-blue-light transition-colors',
                textSizeClasses[size]
              )}>
                Code & Design
              </span>
              <span className="text-xs text-professional-slate font-medium">
                Professional Services
              </span>
            </>
          ) : activeMode === 'ministry' ? (
            <>
              <span className={clsx(
                'font-ministry-script font-bold text-ministry-burgundy group-hover:text-ministry-gold transition-colors',
                textSizeClasses[size]
              )}>
                CJ Music
              </span>
              <span className="text-xs text-ministry-burgundy/70 font-medium">
                Gospel Ministry
              </span>
            </>
          ) : (
            <>
              <span className={clsx(
                'font-heading font-bold text-primary-gold group-hover:text-primary-gold-light transition-colors',
                textSizeClasses[size]
              )}>
                Charles Jasema
              </span>
              <span className="text-xs text-text-secondary font-medium">
                Tech • Design • Ministry
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark rounded-lg"
        aria-label="Charles Jasema Home"
      >
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}

// Brand Mode Switcher Component
export function BrandModeSwitcher() {
  const { currentMode, setMode } = useBrandContext();

  const modes: { key: BrandMode; label: string; icon: string; color: string }[] = [
    { key: 'professional', label: 'Professional', icon: '💼', color: 'text-professional-blue' },
    { key: 'unified', label: 'Unified', icon: '⚡', color: 'text-primary-gold' },
    { key: 'ministry', label: 'Ministry', icon: '🎵', color: 'text-ministry-burgundy' },
  ];

  return (
    <div className="flex items-center space-x-2 p-2 bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-lg border border-white/20 dark:border-slate-700/50">
      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => setMode(mode.key)}
          className={clsx(
            'flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
            'hover:bg-white/20 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-primary-gold',
            currentMode === mode.key 
              ? 'bg-primary-gold text-background-dark' 
              : `text-text-secondary hover:${mode.color}`
          )}
          aria-pressed={currentMode === mode.key}
        >
          <span>{mode.icon}</span>
          <span className="hidden md:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}

// Animated Brand Transition Effect
export function BrandTransition({ children }: { children: React.ReactNode }) {
  const { isTransitioning } = useBrandContext();

  return (
    <div className={clsx(
      'transition-all duration-300 ease-in-out',
      isTransitioning && 'opacity-75 scale-98 blur-sm'
    )}>
      {children}
    </div>
  );
}