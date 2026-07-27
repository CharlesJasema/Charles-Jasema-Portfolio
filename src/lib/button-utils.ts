/**
 * Utility functions for creating accessible button components
 * Ensures WCAG compliance and proper ARIA attributes
 */

export interface AccessibleButtonOptions {
  describedBy?: string;
  expanded?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export function createAccessibleButtonProps(
  label: string,
  options: AccessibleButtonOptions = {}
) {
  const props: Record<string, any> = {
    'aria-label': label,
  };

  // Add conditional ARIA attributes
  if (options.describedBy) {
    props['aria-describedby'] = options.describedBy;
  }

  if (typeof options.expanded === 'boolean') {
    props['aria-expanded'] = options.expanded;
  }

  if (typeof options.pressed === 'boolean') {
    props['aria-pressed'] = options.pressed;
  }

  if (options.disabled) {
    props['aria-disabled'] = true;
  }

  if (options.loading) {
    props['aria-busy'] = true;
  }

  return props;
}

/**
 * Generate keyboard event handlers for custom button components
 */
export function createButtonKeyboardHandlers(onClick?: () => void) {
  return {
    onKeyDown: (event: React.KeyboardEvent) => {
      // Activate button on Enter or Space
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.();
      }
    }
  };
}

/**
 * Button size utilities for consistent sizing across components
 */
export const buttonSizes = {
  xs: {
    height: '32px',
    padding: '4px 8px',
    fontSize: '12px',
    iconSize: '14px',
  },
  sm: {
    height: '36px',
    padding: '6px 12px',
    fontSize: '14px',
    iconSize: '16px',
  },
  md: {
    height: '44px',
    padding: '8px 16px',
    fontSize: '16px',
    iconSize: '18px',
  },
  lg: {
    height: '48px',
    padding: '12px 24px',
    fontSize: '18px',
    iconSize: '20px',
  },
  xl: {
    height: '56px',
    padding: '16px 32px',
    fontSize: '20px',
    iconSize: '24px',
  },
};

/**
 * Touch target validation for mobile accessibility
 */
export function validateTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const minSize = 44; // WCAG AA minimum touch target size
  return rect.width >= minSize && rect.height >= minSize;
}

/**
 * Focus management utilities
 */
export function trapFocus(container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  return {
    firstElement,
    lastElement,
    handleKeyDown: (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };
}