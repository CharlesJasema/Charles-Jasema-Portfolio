/**
 * Accessibility Utilities
 * 
 * Comprehensive accessibility helpers for WCAG compliance, keyboard navigation,
 * screen reader support, and inclusive design patterns.
 */

/**
 * ARIA utilities for screen reader support
 */
export const ariaUtils = {
  /**
   * Generate unique IDs for ARIA relationships
   */
  generateId: (prefix: string = 'aria'): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Create ARIA label for complex elements
   */
  createLabel: (text: string, context?: string): string => {
    return context ? `${text} - ${context}` : text;
  },

  /**
   * Generate ARIA description for form fields
   */
  createDescription: (fieldName: string, requirements?: string[], errors?: string[]): string => {
    const parts = [fieldName];
    
    if (requirements && requirements.length > 0) {
      parts.push(`Requirements: ${requirements.join(', ')}`);
    }
    
    if (errors && errors.length > 0) {
      parts.push(`Errors: ${errors.join(', ')}`);
    }
    
    return parts.join('. ');
  },

  /**
   * Create live region announcements
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Create ARIA attributes for expandable content
   */
  createExpandableAttrs: (isExpanded: boolean, controlsId?: string) => ({
    'aria-expanded': isExpanded.toString(),
    ...(controlsId && { 'aria-controls': controlsId }),
  }),

  /**
   * Create ARIA attributes for modal dialogs
   */
  createModalAttrs: (labelId?: string, descriptionId?: string) => ({
    role: 'dialog',
    'aria-modal': 'true',
    ...(labelId && { 'aria-labelledby': labelId }),
    ...(descriptionId && { 'aria-describedby': descriptionId }),
  }),
};

/**
 * Keyboard navigation utilities
 */
export const keyboardUtils = {
  /**
   * Key codes for common navigation keys
   */
  keys: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
  },

  /**
   * Check if key is an activation key (Enter or Space)
   */
  isActivationKey: (key: string): boolean => {
    return key === keyboardUtils.keys.ENTER || key === keyboardUtils.keys.SPACE;
  },

  /**
   * Check if key is an arrow key
   */
  isArrowKey: (key: string): boolean => {
    return [
      keyboardUtils.keys.ARROW_UP,
      keyboardUtils.keys.ARROW_DOWN,
      keyboardUtils.keys.ARROW_LEFT,
      keyboardUtils.keys.ARROW_RIGHT,
    ].includes(key);
  },

  /**
   * Handle roving tabindex for component groups
   */
  createRovingTabindex: (elements: HTMLElement[], currentIndex: number) => {
    elements.forEach((element, index) => {
      element.tabIndex = index === currentIndex ? 0 : -1;
    });
  },

  /**
   * Get next focusable element in a group
   */
  getNextFocusableIndex: (
    currentIndex: number,
    totalItems: number,
    direction: 'next' | 'previous' | 'first' | 'last'
  ): number => {
    switch (direction) {
      case 'next':
        return (currentIndex + 1) % totalItems;
      case 'previous':
        return currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
      case 'first':
        return 0;
      case 'last':
        return totalItems - 1;
      default:
        return currentIndex;
    }
  },

  /**
   * Trap focus within a container
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== keyboardUtils.keys.TAB) return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },
};

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Set focus with optional delay
   */
  setFocus: (element: HTMLElement | null, delay: number = 0): void => {
    if (!element) return;

    if (delay > 0) {
      setTimeout(() => element.focus(), delay);
    } else {
      element.focus();
    }
  },

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(selector));
  },

  /**
   * Check if element is currently focusable
   */
  isFocusable: (element: HTMLElement): boolean => {
    if (element.tabIndex < 0) return false;
    if (element.hasAttribute('disabled')) return false;
    if (element.getAttribute('aria-hidden') === 'true') return false;
    
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    
    return true;
  },

  /**
   * Save and restore focus for modal interactions
   */
  createFocusManager: () => {
    let previouslyFocusedElement: HTMLElement | null = null;

    return {
      save: () => {
        previouslyFocusedElement = document.activeElement as HTMLElement;
      },
      restore: () => {
        if (previouslyFocusedElement && focusUtils.isFocusable(previouslyFocusedElement)) {
          previouslyFocusedElement.focus();
        }
      },
    };
  },
};

/**
 * Color contrast utilities for accessibility compliance
 */
export const contrastUtils = {
  /**
   * Calculate relative luminance of a color
   */
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio: (color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = contrastUtils.getLuminance(...color1);
    const lum2 = contrastUtils.getLuminance(...color2);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Check if contrast ratio meets WCAG standards
   */
  meetsWCAG: (ratio: number, level: 'AA' | 'AAA' = 'AA', size: 'normal' | 'large' = 'normal'): boolean => {
    if (level === 'AAA') {
      return size === 'large' ? ratio >= 4.5 : ratio >= 7;
    }
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  },

  /**
   * Convert hex color to RGB
   */
  hexToRgb: (hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ] : null;
  },
};

/**
 * Screen reader utilities
 */
export const screenReaderUtils = {
  /**
   * Create screen reader only text
   */
  createSROnlyText: (text: string): HTMLSpanElement => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  },

  /**
   * Check if screen reader is likely active
   */
  isScreenReaderActive: (): boolean => {
    // This is a heuristic and not 100% reliable
    return window.navigator.userAgent.includes('NVDA') ||
           window.navigator.userAgent.includes('JAWS') ||
           window.speechSynthesis?.speaking ||
           false;
  },

  /**
   * Create descriptive text for complex UI elements
   */
  describeElement: (element: HTMLElement): string => {
    const role = element.getAttribute('role') || element.tagName.toLowerCase();
    const label = element.getAttribute('aria-label') || 
                  element.getAttribute('title') || 
                  element.textContent?.trim() || 
                  'unlabeled element';
    
    const state = [];
    if (element.getAttribute('aria-expanded') === 'true') state.push('expanded');
    if (element.getAttribute('aria-expanded') === 'false') state.push('collapsed');
    if (element.getAttribute('aria-selected') === 'true') state.push('selected');
    if (element.getAttribute('aria-checked') === 'true') state.push('checked');
    if (element.hasAttribute('disabled')) state.push('disabled');
    
    return `${role} ${label}${state.length ? `, ${state.join(', ')}` : ''}`;
  },
};

/**
 * Motion and animation utilities for accessibility
 */
export const motionUtils = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Create safe animation options based on user preferences
   */
  getSafeAnimationOptions: (options: {
    duration?: number;
    easing?: string;
    delay?: number;
  } = {}): object => {
    if (motionUtils.prefersReducedMotion()) {
      return {
        duration: 0,
        easing: 'linear',
        delay: 0,
      };
    }
    
    return {
      duration: options.duration || 300,
      easing: options.easing || 'ease-in-out',
      delay: options.delay || 0,
    };
  },

  /**
   * Conditionally apply animations
   */
  conditionalAnimate: (
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ): Animation | null => {
    if (motionUtils.prefersReducedMotion()) {
      // Apply final state immediately
      const finalFrame = keyframes[keyframes.length - 1];
      Object.assign(element.style, finalFrame);
      return null;
    }
    
    return element.animate(keyframes, options);
  },
};

/**
 * Form accessibility utilities
 */
export const formUtils = {
  /**
   * Create ARIA attributes for form fields
   */
  createFieldAttrs: (
    fieldId: string,
    labelId?: string,
    descriptionId?: string,
    errorId?: string,
    required: boolean = false
  ) => {
    const attrs: Record<string, any> = {
      id: fieldId,
      'aria-required': required.toString(),
    };

    if (labelId) {
      attrs['aria-labelledby'] = labelId;
    }

    if (descriptionId || errorId) {
      const describedBy = [descriptionId, errorId].filter(Boolean).join(' ');
      if (describedBy) {
        attrs['aria-describedby'] = describedBy;
      }
    }

    if (errorId) {
      attrs['aria-invalid'] = 'true';
    }

    return attrs;
  },

  /**
   * Create ARIA attributes for form fields with error handling
   */
  createErrorAttrs: (errorId: string) => ({
    id: errorId,
    role: 'alert',
    'aria-live': 'polite' as const,
    'aria-atomic': true,
  }),

  /**
   * Validate form accessibility
   */
  validateFormAccessibility: (form: HTMLFormElement): string[] => {
    const issues: string[] = [];
    
    // Check for form labels
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      
      if (!id || (!ariaLabel && !ariaLabelledBy)) {
        const label = form.querySelector(`label[for="${id}"]`);
        if (!label) {
          issues.push(`Input missing accessible label: ${input.tagName}`);
        }
      }
    });
    
    // Check for required field indicators
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach((input) => {
      const ariaRequired = input.getAttribute('aria-required');
      if (ariaRequired !== 'true') {
        issues.push(`Required field missing aria-required: ${input.getAttribute('id') || input.tagName}`);
      }
    });
    
    return issues;
  },
};

/**
 * Skip link utilities for keyboard navigation
 */
export const skipLinkUtils = {
  /**
   * Create skip link element
   */
  createSkipLink: (targetId: string, text: string): HTMLAnchorElement => {
    const link = document.createElement('a');
    link.href = `#${targetId}`;
    link.textContent = text;
    link.className = 'skip-link';
    
    // Style for skip link (should be in CSS)
    Object.assign(link.style, {
      position: 'absolute',
      top: '-40px',
      left: '6px',
      background: '#000',
      color: '#fff',
      padding: '8px',
      textDecoration: 'none',
      zIndex: '1000',
      borderRadius: '4px',
    });
    
    // Show on focus
    link.addEventListener('focus', () => {
      link.style.top = '6px';
    });
    
    link.addEventListener('blur', () => {
      link.style.top = '-40px';
    });
    
    return link;
  },

  /**
   * Add skip links to page
   */
  addSkipLinks: (links: Array<{ targetId: string; text: string }>): void => {
    const container = document.createElement('div');
    container.className = 'skip-links';
    
    links.forEach(({ targetId, text }) => {
      const link = skipLinkUtils.createSkipLink(targetId, text);
      container.appendChild(link);
    });
    
    document.body.insertBefore(container, document.body.firstChild);
  },
};

/**
 * Landmark utilities for page structure
 */
export const landmarkUtils = {
  /**
   * Validate page landmarks
   */
  validateLandmarks: (): string[] => {
    const issues: string[] = [];
    
    // Check for main landmark
    const main = document.querySelector('main, [role="main"]');
    if (!main) {
      issues.push('Page missing main landmark');
    }
    
    // Check for navigation
    const nav = document.querySelector('nav, [role="navigation"]');
    if (!nav) {
      issues.push('Page missing navigation landmark');
    }
    
    // Check for banner (header)
    const banner = document.querySelector('header, [role="banner"]');
    if (!banner) {
      issues.push('Page missing banner landmark');
    }
    
    // Check for contentinfo (footer)
    const contentinfo = document.querySelector('footer, [role="contentinfo"]');
    if (!contentinfo) {
      issues.push('Page missing contentinfo landmark');
    }
    
    return issues;
  },

  /**
   * Create landmark navigation
   */
  createLandmarkNav: (): HTMLElement => {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Page landmarks');
    nav.className = 'landmark-nav sr-only';
    
    const list = document.createElement('ul');
    
    const landmarks = [
      { selector: 'main, [role="main"]', text: 'Main content' },
      { selector: 'nav, [role="navigation"]', text: 'Navigation' },
      { selector: 'header, [role="banner"]', text: 'Header' },
      { selector: 'footer, [role="contentinfo"]', text: 'Footer' },
    ];
    
    landmarks.forEach(({ selector, text }) => {
      const element = document.querySelector(selector);
      if (element) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        
        let id = element.id;
        if (!id) {
          id = `landmark-${text.toLowerCase().replace(/\s+/g, '-')}`;
          element.id = id;
        }
        
        link.href = `#${id}`;
        link.textContent = text;
        li.appendChild(link);
        list.appendChild(li);
      }
    });
    
    nav.appendChild(list);
    return nav;
  },
};