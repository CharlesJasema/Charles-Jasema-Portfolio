# Social Media Integration Components

This directory contains comprehensive social media integration components for the Charles Jasema Portfolio website, implementing **Task 14.1: Social Media Integration**.

## Components Overview

### 1. SocialShare Component
**File:** `SocialShare.tsx`

A comprehensive social sharing component that allows users to share content across multiple platforms.

**Features:**
- Support for Facebook, Twitter, LinkedIn, WhatsApp sharing
- Copy link to clipboard functionality
- Web Share API support for mobile devices
- Analytics tracking integration
- Multiple display variants (horizontal, vertical, compact)
- Accessibility compliant with ARIA labels
- Toast notifications for user feedback

**Usage:**
```tsx
import { SocialShare } from '@/components/social';

<SocialShare
  url="https://charlesjasema.com/blog/my-post"
  title="My Blog Post Title"
  description="Brief description of the content"
  variant="horizontal"
  showLabels={true}
/>
```

**Props:**
- `url` (string): The URL to share
- `title` (string): The title of the content
- `description` (string, optional): Description of the content
- `variant` ('horizontal' | 'vertical' | 'compact'): Display layout
- `showLabels` (boolean): Whether to show platform labels
- `className` (string): Additional CSS classes

### 2. SocialFollow Component
**File:** `SocialFollow.tsx`

Displays follow buttons for Charles Jasema's social media platforms.

**Features:**
- Links to YouTube, Mdundo, GitHub, LinkedIn, Twitter
- Multiple display variants (horizontal, vertical, grid)
- Hover animations and transitions
- Analytics click tracking
- Accessibility compliant
- Responsive design

**Usage:**
```tsx
import { SocialFollow } from '@/components/social';

<SocialFollow
  variant="grid"
  showLabels={true}
  showUsernames={true}
  size="md"
/>
```

**Props:**
- `variant` ('horizontal' | 'vertical' | 'grid'): Display layout
- `showLabels` (boolean): Whether to show platform names
- `showUsernames` (boolean): Whether to show usernames/handles
- `size` ('sm' | 'md' | 'lg'): Button size
- `className` (string): Additional CSS classes

### 3. SocialProof Component
**File:** `SocialProof.tsx`

Displays social media statistics and follower counts to build credibility.

**Features:**
- Animated counter effects
- Platform-specific statistics (YouTube subscribers, GitHub followers, etc.)
- Loading states with skeleton screens
- Clickable cards linking to platforms
- Responsive grid layout
- Compact variant for headers/sidebars

**Usage:**
```tsx
import { SocialProof, SocialProofCompact } from '@/components/social';

// Full component
<SocialProof
  variant="grid"
  animated={true}
  showIcons={true}
/>

// Compact version
<SocialProofCompact />
```

**Props:**
- `variant` ('horizontal' | 'grid' | 'compact'): Display layout
- `animated` (boolean): Whether to animate counters
- `showIcons` (boolean): Whether to show platform icons
- `className` (string): Additional CSS classes

### 4. SocialSEO Component
**File:** `SocialSEO.tsx`

Manages Open Graph and Twitter Card meta tags for optimal social sharing.

**Features:**
- Dynamic meta tag updates
- Open Graph optimization
- Twitter Card support
- Music-specific meta tags
- Structured data generation
- Client-side meta tag management

**Usage:**
```tsx
import { SocialSEO, useSocialSEO } from '@/components/social';

// As component
<SocialSEO
  title="Page Title"
  description="Page description"
  image="/path/to/image.jpg"
  type="article"
  publishedTime="2024-01-01"
/>

// As hook
useSocialSEO({
  title: "Page Title",
  description: "Page description",
  type: "music.song"
});
```

## Integration Points

### Blog Pages
- Social sharing buttons on individual blog posts
- Follow buttons in sidebar/footer sections
- Social proof displays

### Music Pages
- Share buttons for individual songs and videos
- Follow buttons for music platforms
- Social proof showing play counts and followers

### Portfolio Pages
- Share buttons for individual projects
- Professional social media links
- GitHub and LinkedIn integration

### Footer
- Comprehensive social media links
- Social proof compact display
- Newsletter integration

## Analytics Integration

All social components include Google Analytics 4 event tracking:

```javascript
// Share events
gtag('event', 'share', {
  method: 'facebook',
  content_type: 'article',
  item_id: url
});

// Follow events
gtag('event', 'click', {
  event_category: 'social_follow',
  event_label: 'youtube',
  value: 1
});
```

## Accessibility Features

All components follow WCAG 2.1 AA guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Minimum touch target sizes (44px)
- Color contrast compliance

## Responsive Design

Components are fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## Performance Optimizations

- Lazy loading for non-critical components
- Efficient re-rendering with React.memo
- Optimized bundle size
- Minimal external dependencies

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Graceful fallbacks for unsupported features

## Configuration

Social media URLs and statistics are configured in:
- `src/config/site.ts` - Main site configuration
- Component props for dynamic content

## Testing

Components include:
- TypeScript type safety
- Accessibility testing
- Cross-browser compatibility
- Mobile responsiveness testing

## Future Enhancements

Potential improvements:
- Real-time follower count APIs
- Additional social platforms
- Advanced analytics integration
- A/B testing capabilities
- Social media feed widgets

## Dependencies

- `react-hot-toast` - Toast notifications
- `react-icons` - Social media icons
- Existing UI component library
- Accessibility utilities

## Maintenance

To update social media statistics:
1. Edit the `socialStats` array in `SocialProof.tsx`
2. Update follower counts with actual numbers
3. Add new platforms as needed

## Support

For issues or questions about the social media integration:
- Check component documentation
- Review accessibility guidelines
- Test across different devices and browsers
- Ensure analytics tracking is working correctly