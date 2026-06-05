/**
 * Skip Links Component
 * 
 * Provides keyboard navigation shortcuts for accessibility compliance.
 * Allows users to quickly jump to main content areas.
 */

'use client';

import { useEffect } from 'react';

interface SkipLink {
  targetId: string;
  text: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
}

const defaultSkipLinks: SkipLink[] = [
  { targetId: 'main-content', text: 'Skip to main content' },
  { targetId: 'main-navigation', text: 'Skip to navigation' },
  { targetId: 'footer', text: 'Skip to footer' },
];

export const SkipLinks: React.FC<SkipLinksProps> = ({ 
  links = defaultSkipLinks 
}) => {
  useEffect(() => {
    // Ensure target elements have IDs
    links.forEach(({ targetId }) => {
      const element = document.getElementById(targetId);
      if (element && !element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
    });
  }, [links]);

  return (
    <div className="skip-links">
      {links.map(({ targetId, text }) => (
        <a
          key={targetId}
          href={`#${targetId}`}
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-gold focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById(targetId);
            if (target) {
              target.focus();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          {text}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;