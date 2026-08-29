'use client';

import { clsx } from 'clsx';

export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 100,
  initialDelay = 0,
  ...props 
}) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={clsx('space-y-2', className)} {...props}>
      {childrenArray.map((child, index) => {
        const delay = initialDelay + (index * staggerDelay);
        
        return (
          <div
            key={index}
            className="animate-fadeIn"
            style={{ animationDelay: `${delay}ms` }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}