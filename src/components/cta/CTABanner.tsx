'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { CTASection } from './CTASection';

export interface CTABannerProps {
  title: string;
  description?: string;
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CTABanner({
  title,
  description,
  children,
  variant = 'default',
  size = 'md',
  className,
}: CTABannerProps) {
  const sizeStyles = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  const variantStyles = {
    default: {
      background: 'gradient' as const,
      padding: 'xl' as const,
    },
    gradient: {
      background: 'gradient' as const,
      padding: 'xl' as const,
    },
    minimal: {
      background: 'none' as const,
      padding: 'lg' as const,
    },
  };

  const config = variantStyles[variant];

  return (
    <div className={clsx(sizeStyles[size], className)}>
      <CTASection
        title={title}
        description={description}
        variant="banner"
        background={config.background}
        padding={config.padding}
      >
        {children}
      </CTASection>
    </div>
  );
}