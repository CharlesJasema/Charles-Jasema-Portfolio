'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Card } from '@/components/ui/Card';

export interface CTASectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  variant?: 'default' | 'centered' | 'split' | 'banner';
  background?: 'default' | 'gradient' | 'glass' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function CTASection({
  title,
  description,
  children,
  variant = 'default',
  background = 'default',
  padding = 'lg',
  className,
}: CTASectionProps) {
  const containerStyles = {
    default: 'space-y-4',
    centered: 'text-center space-y-6',
    split: 'flex flex-col md:flex-row md:items-center md:justify-between gap-6',
    banner: 'text-center space-y-6 py-12',
  };

  const backgroundStyles = {
    default: 'bg-slate-800/50 border border-slate-700',
    gradient: 'bg-gradient-to-r from-primary-gold/10 to-accent-red/10 border border-primary-gold/20',
    glass: 'glass-effect',
    none: '',
  };

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  const content = (
    <div className={containerStyles[variant]}>
      {(title || description) && (
        <div className={variant === 'split' ? 'flex-1' : ''}>
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className={clsx(
        variant === 'centered' || variant === 'banner' ? 'flex flex-wrap justify-center gap-4' :
        variant === 'split' ? 'flex flex-wrap gap-4' :
        'flex flex-wrap gap-4'
      )}>
        {children}
      </div>
    </div>
  );

  if (background === 'none') {
    return (
      <section className={clsx(paddingStyles[padding], className)}>
        {content}
      </section>
    );
  }

  return (
    <section className={className}>
      <Card 
        variant={background === 'glass' ? 'glass' : 'default'}
        padding="none"
        className={clsx(
          backgroundStyles[background],
          paddingStyles[padding],
          'rounded-lg'
        )}
      >
        {content}
      </Card>
    </section>
  );
}