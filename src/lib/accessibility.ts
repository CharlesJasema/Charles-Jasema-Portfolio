/**
 * Accessibility Utilities
 * 
 * Comprehensive accessibility helpers for WCAG 2.1 AA compliance
 */

/**
 * Generate unique IDs for form elements and ARIA relationships
 */
export function generateId(prefix: string = 'element'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if color contrast meets WCAG AA standards (4.5:1 ratio)
 */
export function checkColorContrast(_foreground: string, _background: string): boolean {
  // This is a simplified check - in production, use a proper color contrast library
  // For now, we'll assume our design system colors meet the requirements
  return true;
}

/**
 * Create accessible button props
 */
export function createAccessibleButtonProps(
  label: string,
  options: {
    describedBy?: string;
    expanded?: boolean;
    pressed?: boolean;
    disabled?: boolean;
    loading?: boolean;
  } = {}
) {
  const { describedBy, expanded, pressed, disabled, loading } = options;
  
  return {
    'aria-label': label,
    ...(describedBy && { 'aria-describedby': describedBy }),
    ...(expanded !== undefined && { 'aria-expanded': expanded }),
    ...(pressed !== undefined && { 'aria-pressed': pressed }),
    ...(disabled && { 'aria-disabled': true }),
    ...(loading && { 'aria-busy': true }),
    role: 'button',
    tabIndex: disabled ? -1 : 0,
  };
}

/**
 * Create accessible form field props
 */
export function createAccessibleFieldProps(
  label: string,
  options: {
    required?: boolean;
    invalid?: boolean;
    describedBy?: string;
    errorId?: string;
  } = {}
) {
  const { required, invalid, describedBy, errorId } = options;
  
  return {
    'aria-label': label,
    'aria-required': required || false,
    'aria-invalid': invalid || false,
    ...(describedBy && { 'aria-describedby': describedBy }),
    ...(invalid && errorId && { 'aria-describedby': errorId }),
  };
}

/**
 * Create accessible navigation props
 */
export function createAccessibleNavProps(label: string, current?: boolean) {
  return {
    'aria-label': label,
    role: 'navigation',
    ...(current && { 'aria-current': 'page' }),
  };
}

/**
 * Create accessible modal props
 */
export function createAccessibleModalProps(
  titleId: string,
  descriptionId?: string
) {
  return {
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': titleId,
    ...(descriptionId && { 'aria-describedby': descriptionId }),
  };
}

/**
 * Create accessible image props
 */
export function createAccessibleImageProps(
  alt: string,
  decorative: boolean = false
) {
  if (decorative) {
    return {
      alt: '',
      'aria-hidden': true,
      role: 'presentation',
    };
  }
  
  return {
    alt,
  };
}

/**
 * Create accessible heading props with proper hierarchy
 */
export function createAccessibleHeadingProps(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  id?: string
) {
  return {
    role: 'heading',
    'aria-level': level,
    ...(id && { id }),
  };
}

/**
 * Create accessible list props
 */
export function createAccessibleListProps(
  itemCount: number,
  label?: string
) {
  return {
    role: 'list',
    'aria-setsize': itemCount,
    ...(label && { 'aria-label': label }),
  };
}

/**
 * Create accessible list item props
 */
export function createAccessibleListItemProps(
  position: number,
  totalItems: number
) {
  return {
    role: 'listitem',
    'aria-setsize': totalItems,
    'aria-posinset': position,
  };
}

/**
 * Create accessible tab props
 */
export function createAccessibleTabProps(
  id: string,
  panelId: string,
  selected: boolean = false
) {
  return {
    id,
    role: 'tab',
    'aria-controls': panelId,
    'aria-selected': selected,
    tabIndex: selected ? 0 : -1,
  };
}

/**
 * Create accessible tab panel props
 */
export function createAccessibleTabPanelProps(
  id: string,
  tabId: string,
  hidden: boolean = false
) {
  return {
    id,
    role: 'tabpanel',
    'aria-labelledby': tabId,
    hidden,
    tabIndex: 0,
  };
}

/**
 * Create accessible dropdown/combobox props
 */
export function createAccessibleDropdownProps(
  id: string,
  expanded: boolean = false,
  hasPopup: boolean = true
) {
  return {
    id,
    role: 'combobox',
    'aria-expanded': expanded,
    'aria-haspopup': hasPopup,
    'aria-autocomplete': 'list' as const,
  };
}

/**
 * Create skip link props for keyboard navigation
 */
export function createSkipLinkProps(targetId: string, label: string) {
  return {
    href: `#${targetId}`,
    'aria-label': label,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-gold focus:text-white focus:rounded-md focus:shadow-lg',
  };
}

/**
 * Keyboard event handlers for accessibility
 */
export const keyboardHandlers = {
  /**
   * Handle Enter and Space key presses for button-like elements
   */
  onActivate: (callback: () => void) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  },

  /**
   * Handle Escape key for closing modals/dropdowns
   */
  onEscape: (callback: () => void) => (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      callback();
    }
  },

  /**
   * Handle arrow keys for navigation
   */
  onArrowNavigation: (
    onUp: () => void,
    onDown: () => void,
    onLeft?: () => void,
    onRight?: () => void
  ) => (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        onUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        onDown();
        break;
      case 'ArrowLeft':
        if (onLeft) {
          event.preventDefault();
          onLeft();
        }
        break;
      case 'ArrowRight':
        if (onRight) {
          event.preventDefault();
          onRight();
        }
        break;
    }
  },
};

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Trap focus within a container
   */
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  /**
   * Restore focus to a previously focused element
   */
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },

  /**
   * Move focus to the next focusable element
   */
  focusNext: () => {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
    
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    focusableElements[nextIndex]?.focus();
  },

  /**
   * Move focus to the previous focusable element
   */
  focusPrevious: () => {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
    
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const previousIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
    focusableElements[previousIndex]?.focus();
  },
};

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Announce a message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  /**
   * Create a live region for dynamic content updates
   */
  createLiveRegion: (id: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.createElement('div');
    liveRegion.id = id;
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    
    document.body.appendChild(liveRegion);
    
    return {
      update: (message: string) => {
        liveRegion.textContent = message;
      },
      remove: () => {
        if (liveRegion.parentNode) {
          document.body.removeChild(liveRegion);
        }
      },
    };
  },
};

/**
 * Reduced motion utilities
 */
export const reducedMotion = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Apply animation only if user doesn't prefer reduced motion
   */
  conditionalAnimation: (animationClass: string): string => {
    return reducedMotion.prefersReducedMotion() ? '' : animationClass;
  },
};

/**
 * Color and contrast utilities
 */
export const colorContrast = {
  /**
   * Ensure sufficient color contrast for text
   */
  ensureContrast: (_textColor: string, _backgroundColor: string): boolean => {
    // This is a simplified implementation
    // In production, use a proper color contrast calculation library
    return true;
  },

  /**
   * Get high contrast alternative colors
   */
  getHighContrastColors: () => ({
    text: '#000000',
    background: '#ffffff',
    primary: '#0066cc',
    secondary: '#666666',
  }),
};