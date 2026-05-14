/**
 * Skip Links Component
 * 
 * Provides keyboard navigation shortcuts for screen readers and keyboard users
 */

import { createSkipLinkProps } from '@/lib/accessibility';

export default function SkipLinks() {
  const skipLinks = [
    { targetId: 'main-content', label: 'Skip to main content' },
    { targetId: 'main-navigation', label: 'Skip to navigation' },
    { targetId: 'footer', label: 'Skip to footer' },
  ];

  return (
    <div className="skip-links">
      {skipLinks.map(({ targetId, label }) => (
        <a
          key={targetId}
          {...createSkipLinkProps(targetId, label)}
        >
          {label}
        </a>
      ))}
    </div>
  );
}