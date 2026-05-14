'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface CTAGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CTAGrid({
  children,
  columns = 2,
  gap = 'md',
  className,
}: CTAGridProps) {
  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapStyles = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={clsx(
      'grid',
      columnStyles[columns],
      gapStyles[gap],
      className
    )}>
      {children}
    </div>
  );
}