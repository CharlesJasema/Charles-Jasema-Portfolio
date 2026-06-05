/**
 * Button Accessibility Utilities
 * 
 * Helper functions for creating accessible button components
 */

export interface AccessibleButtonProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  'aria-controls'?: string;
  role?: string;
  tabIndex?: number;
}

/**
 * Create accessible button props
 */
export const createAccessibleButtonProps = (
  label: string,
  options: {
    describedBy?: string;
    expanded?: boolean;
    pressed?: boolean;
    controls?: string;
    disabled?: boolean;
    loading?: boolean;
  } = {}
): AccessibleButtonProps => {
  const props: AccessibleButtonProps = {
    'aria-label': label,
  };

  if (options.describedBy) {
    props['aria-describedby'] = options.describedBy;
  }

  if (typeof options.expanded === 'boolean') {
    props['aria-expanded'] = options.expanded;
  }

  if (typeof options.pressed === 'boolean') {
    props['aria-pressed'] = options.pressed;
  }

  if (options.controls) {
    props['aria-controls'] = options.controls;
  }

  if (options.disabled || options.loading) {
    props.tabIndex = -1;
  }

  return props;
};