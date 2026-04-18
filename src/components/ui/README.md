# UI Component Library

This directory contains reusable UI components for the Charles Jasema Portfolio.

## Components

### Button
A versatile button component with multiple variants and sizes.

**Variants:**
- `primary` - Gold background (default)
- `secondary` - Red background
- `ghost` - Transparent with gold border

**Sizes:**
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

**Props:**
- `variant?: 'primary' | 'secondary' | 'ghost'`
- `size?: 'sm' | 'md' | 'lg'`
- `isLoading?: boolean`
- All standard button HTML attributes

**Example:**
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="ghost" isLoading>
  Loading...
</Button>
```

### Card
A container component with glassmorphism effects.

**Variants:**
- `default` - Standard card with border
- `glass` - Glassmorphism effect
- `elevated` - Card with shadow

**Padding:**
- `none` - No padding
- `sm` - Small padding (16px)
- `md` - Medium padding (24px, default)
- `lg` - Large padding (32px)

**Props:**
- `variant?: 'default' | 'glass' | 'elevated'`
- `padding?: 'none' | 'sm' | 'md' | 'lg'`
- All standard div HTML attributes

**Example:**
```tsx
import { Card } from '@/components/ui';

<Card variant="glass" padding="lg">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

### Input
A form input component with label, error, and helper text support.

**Props:**
- `label?: string` - Input label
- `error?: string` - Error message
- `helperText?: string` - Helper text
- All standard input HTML attributes

**Example:**
```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>

<Input
  label="Password"
  type="password"
  error="Password is required"
/>

<Input
  label="Username"
  helperText="Choose a unique username"
/>
```

## Accessibility

All components follow WCAG AA guidelines:
- Proper ARIA labels and attributes
- Keyboard navigation support
- Focus indicators
- Color contrast ratios meet AA standards

## Styling

Components use Tailwind CSS with custom design tokens:
- Colors: Gold (#D4AF37), Red (#B22222), Teal (#008080)
- Typography: Montserrat, Open Sans, Raleway, Playfair Display
- Spacing: 8px grid system
- Dark mode support

## Usage

Import components from the index file:

```tsx
import { Button, Card, Input } from '@/components/ui';
```

Or import individually:

```tsx
import { Button } from '@/components/ui/Button';
```
