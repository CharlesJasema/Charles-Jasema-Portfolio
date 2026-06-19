# Implementation Plan: Professional Portfolio Enhancements

## Overview

This implementation plan covers comprehensive professional enhancements to the Charles Jasema portfolio website including:

- **Email Delivery System**: Multi-provider email delivery with SendGrid, Resend, and AWS SES fallback
- **AI Features**: Chatbot widget, content recommendations, and smart search powered by OpenAI GPT-4
- **WhatsApp Enhancement**: Enhanced widget with pre-filled messages, availability status, and quick actions
- **CSS Architecture**: Centralized Tailwind configuration with design tokens and consistent styling
- **Performance**: Code splitting, image optimization, caching strategy for Lighthouse 90+ score
- **SEO**: Meta tags, structured data, sitemap, and content optimization
- **Analytics**: GA4 integration, custom event tracking, and conversion funnels
- **Accessibility**: WCAG 2.1 Level AA compliance with keyboard navigation and screen reader support
- **Security**: Rate limiting, CSP headers, input sanitization, and CSRF protection
- **Newsletter**: Email marketing platform integration with double opt-in
- **PWA**: Service worker, web manifest, and offline functionality

The implementation follows a modular approach with infrastructure setup first, followed by core features, UI components, integrations, and final polish.

## Tasks

- [ ] 1. Set up project infrastructure and configuration
  - [-] 1.1 Install required dependencies for email, AI, and analytics services
    - Install email providers: `@sendgrid/mail`, `resend`, `@aws-sdk/client-ses`
    - Install AI/ML: `openai`, `ai` (Vercel AI SDK)
    - Install analytics: `@next/third-parties` for GA4, `@vercel/analytics`
    - Install utilities: `lru-cache`, `zod`, `react-hook-form`
    - Install PWA: `next-pwa`, `workbox-webpack-plugin`
    - Install newsletter: `@mailchimp/mailchimp_marketing` or `@convertkit/convertkit-js`
    - _Requirements: 1.1, 1.4, 4.1, 13.1, 19.3, 20.2_

  - [-] 1.2 Create environment configuration file and type definitions
    - Create `.env.example` with all required environment variables
    - Add email provider keys (SENDGRID_API_KEY, RESEND_API_KEY, AWS_SES_ACCESS_KEY, AWS_SES_SECRET_KEY)
    - Add AI service keys (OPENAI_API_KEY)
    - Add analytics IDs (NEXT_PUBLIC_GA_ID, VERCEL_ANALYTICS_ID)
    - Add newsletter keys (MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID)
    - Add email addresses (CONTACT_EMAIL, FROM_EMAIL)
    - Create `src/types/env.d.ts` with TypeScript definitions for all environment variables
    - _Requirements: 2.1, 2.6_

  - [-] 1.3 Configure Tailwind CSS with design tokens
    - Update `tailwind.config.ts` with brand colors (primary-gold: #D4AF37, accent-red: #B22222, tech-teal: #008080, dark-bg: #0F172A)
    - Define spacing scale (4, 8, 12, 16, 24, 32, 48, 64 in px)
    - Configure typography with font families (Montserrat for headings, Open Sans for body, Raleway for nav)
    - Set up dark mode configuration with 'class' strategy
    - Define transition durations (150ms, 200ms, 300ms) and timing functions
    - Add plugins: @tailwindcss/forms, @tailwindcss/typography
    - _Requirements: 21.1, 21.2, 21.5, 21.6_

  - [x] 1.4 Create global CSS base styles and component classes
    - Create `src/app/globals.css` with Tailwind layers (@base, @components, @utilities)
    - Define base typography styles (h1-h6, body, links) with responsive scaling
    - Create reusable component classes (.card, .input-base, .container-custom)
    - Add focus-visible styles with primary-gold ring
    - Implement dark mode variants for all base styles
    - Add smooth transitions for color and shadow changes
    - _Requirements: 21.6, 21.7, 21.9, 21.12_

  - [x] 1.5 Set up TypeScript types and interfaces for all data models
    - Create `src/types/email.ts` with ContactSubmission, EmailProviderConfig, EmailDeliveryLog interfaces
    - Create `src/types/ai.ts` with ChatMessage, ChatSession, PortfolioKnowledge interfaces
    - Create `src/types/analytics.ts` with PageViewEvent, CustomEvent, ConversionEvent, AnalyticsSession interfaces
    - Create `src/types/whatsapp.ts` with MessageTemplate, AvailabilityStatus, PageContext interfaces
    - Create `src/types/search.ts` with SearchResults, SearchFilters, ContentItem interfaces
    - _Requirements: 1.1, 4.1, 5.1, 6.1, 13.1_

- [ ] 2. Implement email delivery system with multi-provider support
  - [x] 2.1 Create email provider base interface and configuration loader
    - Create `src/lib/email/providers/base.ts` with EmailProvider interface
    - Define EmailMessage, EmailResult, and Attachment types
    - Create `src/lib/email/config.ts` to load and validate email configuration from environment
    - Implement validateConfig() to check for required environment variables on startup
    - Add configuration masking for sensitive values in logs
    - _Requirements: 2.1, 2.2, 2.4_

  - [~] 2.2 Implement SendGrid email provider
    - Create `src/lib/email/providers/sendgrid.ts` implementing EmailProvider interface
    - Initialize @sendgrid/mail client with API key from environment
    - Implement send() method with error handling and timeout (30 seconds)
    - Return EmailResult with success status, messageId, deliveryTime
    - Handle SendGrid-specific errors (invalid API key, rate limits, invalid email)
    - _Requirements: 1.4, 1.7, 2.1_

  - [~] 2.3 Implement Resend email provider
    - Create `src/lib/email/providers/resend.ts` implementing EmailProvider interface
    - Initialize Resend client with API key from environment
    - Implement send() method with error handling and timeout (30 seconds)
    - Return EmailResult with success status, messageId, deliveryTime
    - Handle Resend-specific errors (invalid API key, rate limits, invalid email)
    - _Requirements: 1.4, 1.7, 2.1_

  - [~] 2.4 Implement AWS SES email provider
    - Create `src/lib/email/providers/aws-ses.ts` implementing EmailProvider interface
    - Initialize AWS SES client with access key and secret from environment
    - Implement send() method with error handling and timeout (30 seconds)
    - Return EmailResult with success status, messageId, deliveryTime
    - Handle AWS SES-specific errors (invalid credentials, rate limits, sending quota exceeded)
    - _Requirements: 1.4, 1.7, 2.1_

  - [~] 2.5 Create email template engine with React Email
    - Create `src/lib/email/templates/contact-notification.tsx` for admin notifications
    - Include submission details (name, email, subject, message, timestamp, IP hash)
    - Add rate limiting metadata (submission count, remaining quota)
    - Create `src/lib/email/templates/confirmation.tsx` for submitter confirmation
    - Include personalized greeting, confirmation number, expected response time
    - Add consistent branding (colors, logo, footer) to all templates
    - Implement template rendering function with data sanitization
    - _Requirements: 1.6, 1.8_

  - [~] 2.6 Implement main EmailService with fallback and retry logic
    - Create `src/lib/email/email-service.ts` with EmailService class
    - Initialize all available providers sorted by priority (SendGrid=1, Resend=2, AWS SES=3)
    - Implement sendEmail() with multi-provider fallback loop
    - Add exponential backoff retry logic (1s, 2s, 4s) with maximum 3 retries per provider
    - Implement attemptSend() with timeout protection (30 seconds)
    - Call storeForManualRetrieval() when all providers fail
    - _Requirements: 1.2, 1.3, 1.4, 2.3_

  - [~] 2.7 Implement email delivery logging and monitoring
    - Create `src/lib/email/logger.ts` with EmailLogger class
    - Implement logSuccess() to record successful deliveries with provider, timestamp, deliveryTime
    - Implement logFailure() to record failed attempts with error code, error message, provider response
    - Implement logWarning() for email delivery success rate below 90%
    - Create getHealthStatus() to calculate success rate and average delivery time
    - Store logs in structured format (JSON) for parsing and analysis
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [ ]* 2.8 Write property tests for email service
    - **Property 1: At-Most-Once Delivery** - Each submission ID results in at most one successful delivery
    - **Property 2: Provider Fallback** - If primary fails, secondary is attempted within 5 seconds
    - **Property 3: Retry Invariant** - Exponential backoff follows 2^n pattern with max 3 retries per provider
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
    - Test with multiple submissions, provider failures, and concurrent requests

  - [ ]* 2.9 Write unit tests for email providers
    - Test SendGrid provider with valid/invalid API keys
    - Test Resend provider with valid/invalid API keys
    - Test AWS SES provider with valid/invalid credentials
    - Test error handling for rate limits, timeouts, network failures
    - Test email template rendering with various data inputs
    - _Requirements: 1.1, 1.4, 1.6, 1.7_

- [~] 3. Checkpoint - Ensure email system tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement AI-powered chatbot system
  - [~] 4.1 Create portfolio knowledge base builder
    - Create `src/lib/ai/knowledge-base.ts` with getPortfolioKnowledge() function
    - Fetch all projects from Sanity CMS with title, category, technologies, description, URL
    - Fetch all blog posts with title, excerpt, category, URL
    - Fetch skills and services from site configuration
    - Structure data in PortfolioKnowledge format for chatbot context
    - Implement caching with 5-minute TTL to reduce CMS queries
    - _Requirements: 4.3_

  - [~] 4.2 Implement ChatbotService with OpenAI integration
    - Create `src/lib/ai/chatbot.ts` with ChatbotService class
    - Initialize OpenAI client with API key from environment
    - Build system prompt with portfolio knowledge and guidelines
    - Implement chat() method accepting message, sessionId, and history
    - Call OpenAI GPT-4 API with conversation context (max 300 tokens, temperature 0.7)
    - Extract quick actions from AI response (view projects, schedule call, download resume)
    - Return ChatbotResponse with response text, sessionId, quickActions, token count
    - _Requirements: 4.2, 4.3, 4.4, 4.8_

  - [~] 4.3 Implement session management for chat conversations
    - Create `src/lib/ai/session-manager.ts` with SessionManager class
    - Implement initializeSession() to create new session with UUID and context
    - Store sessions in memory with LRU cache (max 1000 sessions)
    - Implement getSession() and updateSession() for history management
    - Add 30-minute session timeout with automatic cleanup
    - Limit conversation history to 50 messages per session
    - _Requirements: 4.6_

  - [~] 4.4 Create ChatbotWidget UI component
    - Create `src/components/ai/ChatbotWidget.tsx` with floating widget UI
    - Position in bottom-right corner (fixed, z-index 50) with expand/collapse animation
    - Display chat messages with user/assistant role styling
    - Add message input with character counter (max 2000 chars)
    - Show typing indicator while waiting for AI response
    - Render quick action buttons for common queries (view projects, schedule call, download resume)
    - Add close button and minimize functionality
    - _Requirements: 4.1, 4.2, 4.8_

  - [~] 4.5 Implement chatbot error handling and privacy controls
    - Add error boundary to catch and display chatbot errors gracefully
    - Handle OpenAI rate limits with retry queue and user feedback message
    - Truncate conversation history when context length exceeds token limit
    - Store chat data only in session storage (no persistent storage)
    - Add "Connect via Contact Form" and "Chat on WhatsApp" fallback options
    - Display privacy notice: "Conversations are not stored"
    - _Requirements: 4.5, 4.7_

  - [ ]* 4.6 Write unit tests for chatbot service
    - Test knowledge base builder with mock Sanity data
    - Test session creation and expiry logic
    - Test chat response generation with mock OpenAI responses
    - Test quick action extraction from various response formats
    - Test error handling for API failures, rate limits, invalid inputs
    - _Requirements: 4.1, 4.2, 4.3, 4.6_

- [ ] 5. Implement content recommendation system
  - [~] 5.1 Create content similarity algorithm
    - Create `src/lib/ai/recommendations.ts` with ContentRecommendationEngine class
    - Implement calculateSimilarity() using Jaccard similarity for technology tags
    - Weight similarity by content recency (recent content gets 1.2x boost)
    - Implement getRelatedProjects() to find top 3 similar projects
    - Implement getRelatedPosts() to find top 3 similar blog posts
    - Filter out the current item from recommendations
    - _Requirements: 5.3, 5.4, 5.7_

  - [~] 5.2 Implement behavioral tracking for recommendations
    - Create session storage tracker for page views with timestamps
    - Track time spent on each page (record entry/exit timestamps)
    - Track interactions (clicks, scrolls, form focuses)
    - Store data only in session storage (no persistent storage, GDPR compliant)
    - Implement cleanup after session ends (30-minute timeout)
    - _Requirements: 5.1, 5.5_

  - [~] 5.3 Create ContentRecommendations UI component
    - Create `src/components/ai/ContentRecommendations.tsx`
    - Display "You Might Also Like" section with 3 recommendation cards
    - Show project/post thumbnail, title, excerpt, and category
    - Add hover effects and click tracking for analytics
    - Implement skeleton loading state while fetching recommendations
    - Use responsive grid layout (1 column mobile, 3 columns desktop)
    - _Requirements: 5.2, 5.6_

  - [ ]* 5.4 Write unit tests for recommendation engine
    - Test similarity calculation with various technology combinations
    - Test recency weighting with different publish dates
    - Test filtering of current item from results
    - Test recommendation limit (max 3 items)
    - Test behavior tracking and session storage
    - _Requirements: 5.1, 5.3, 5.4, 5.5_

- [ ] 6. Implement smart search with AI enhancement
  - [~] 6.1 Create search indexing service
    - Create `src/lib/ai/search.ts` with SmartSearchService class
    - Implement indexContent() to build search index from CMS content
    - Extract searchable fields (title, description, excerpt, technologies, categories)
    - Create inverted index mapping keywords to content items
    - Store index in memory with automatic refresh every 5 minutes
    - _Requirements: 6.2_

  - [~] 6.2 Implement semantic search with query processing
    - Implement search() method accepting query string and optional filters
    - Tokenize and normalize query (lowercase, remove punctuation)
    - Search across all content types (projects, blog posts, skills, services)
    - Rank results by relevance score (exact match > partial match > fuzzy match)
    - Apply content type filters when provided
    - Return results within 500ms with timeout protection
    - _Requirements: 6.1, 6.2, 6.3, 6.7_

  - [~] 6.3 Add search suggestions and auto-complete
    - Implement getSuggestions() for real-time search suggestions
    - Build suggestion list from indexed keywords and popular queries
    - Return suggestions as user types (after 2+ characters)
    - Limit suggestions to 5 items
    - Rank suggestions by frequency and recency
    - _Requirements: 6.5_

  - [~] 6.4 Create SmartSearch UI component
    - Create `src/components/search/SmartSearch.tsx` with search input and results dropdown
    - Add search icon and keyboard shortcut (Cmd/Ctrl + K)
    - Show real-time suggestions dropdown as user types
    - Display search results with highlighted matching terms
    - Add content type filter buttons (All, Projects, Blog, Music)
    - Show "No results found" with alternative suggestions
    - Implement keyboard navigation (arrow keys, enter to select)
    - _Requirements: 6.1, 6.4, 6.5, 6.7, 6.8_

  - [ ]* 6.5 Write unit tests for search service
    - Test content indexing with various content types
    - Test search query normalization and tokenization
    - Test result ranking by relevance
    - Test content type filtering
    - Test search timeout and error handling
    - Test suggestion generation with partial queries
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6_

- [ ] 7. Implement enhanced WhatsApp integration
  - [~] 7.1 Create WhatsApp service with availability detection
    - Create `src/lib/whatsapp/whatsapp-service.ts` with WhatsAppService class
    - Implement getAvailabilityStatus() using timezone-based logic
    - Define working hours (9 AM - 6 PM local time)
    - Return status: 'available', 'busy', or 'offline'
    - Implement generateMessage() to create pre-filled messages from templates
    - Include page context (current page title, URL) in messages
    - _Requirements: 7.5, 8.4_

  - [~] 7.2 Create message template system
    - Create `src/lib/whatsapp/templates.ts` with pre-defined message templates
    - Add templates: "Project Inquiry", "Collaboration", "Booking", "General Question"
    - Add context-specific templates for project pages, music section, design portfolio
    - Implement template variable replacement (name, page, service type)
    - Support up to 5 templates per page context
    - _Requirements: 7.3, 8.1, 8.2, 8.3, 8.5, 8.6_

  - [~] 7.3 Implement device detection and WhatsApp URL generation
    - Create device detection utility using user agent and screen size
    - Generate WhatsApp web URL (wa.me) for desktop
    - Generate WhatsApp app URL (whatsapp://) for mobile devices
    - Add phone number from environment variable (NEXT_PUBLIC_WHATSAPP_NUMBER)
    - URL-encode message text properly
    - _Requirements: 7.7_

  - [~] 7.4 Create WhatsAppWidget UI component
    - Create `src/components/contact/WhatsAppWidget.tsx` with floating action button
    - Position in bottom-right corner (above chatbot if present)
    - Show WhatsApp icon with availability indicator (green dot for available)
    - On click, open dialog with message template options
    - Display availability status text ("Available now", "Responds in 2 hours", "Offline")
    - Add "Schedule a Call" option for offline hours
    - Style with primary-gold color on hover, smooth animations
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [~] 7.5 Implement WhatsApp analytics tracking
    - Track WhatsApp button clicks with analytics service
    - Record click context (page, template selected, availability status)
    - Calculate click-through rate for analytics dashboard
    - Track successful message sends (opens WhatsApp app/web)
    - _Requirements: 7.8_

  - [ ]* 7.6 Write unit tests for WhatsApp service
    - Test availability status calculation across timezones
    - Test message template generation with various contexts
    - Test device detection and URL generation
    - Test template variable replacement
    - Test analytics tracking
    - _Requirements: 7.1, 7.3, 7.4, 7.5, 7.7, 7.8_

- [~] 8. Checkpoint - Ensure AI features tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement reusable UI component library
  - [-] 9.1 Create Button component with variants and states
    - Create `src/components/ui/Button.tsx` with TypeScript props
    - Implement variants: primary (gold), secondary (red), outline, ghost
    - Implement sizes: sm, md, lg with proper padding and text sizing
    - Add all interactive states: default, hover, focus, active, disabled
    - Use Tailwind color classes (primary-gold, accent-red) consistently
    - Add focus ring with primary-gold color and 2px width
    - Add smooth transitions (duration-200) for all state changes
    - _Requirements: 21.2, 21.3, 21.9_

  - [-] 9.2 Create Input component with validation states
    - Create `src/components/ui/Input.tsx` supporting text, email, tel, textarea
    - Implement base styling with .input-base utility class
    - Add validation states: default, error, success, disabled
    - Show error message below input with accent-red color
    - Add proper focus ring styling with primary-gold color
    - Ensure proper contrast ratios (4.5:1 minimum)
    - Add dark mode variants for all states
    - _Requirements: 21.3, 21.4, 21.9, 21.15_

  - [ ] 9.3 Create Card component with hover effects
    - Create `src/components/ui/Card.tsx` with .card utility class
    - Implement padding variants: sm, md, lg
    - Add elevation on hover (shadow-sm to shadow-md transition)
    - Support clickable cards with pointer cursor
    - Add dark mode variant with dark-surface background
    - Ensure smooth transitions (duration-200)
    - _Requirements: 21.9, 21.11_

  - [~] 9.4 Create Modal component with accessibility
    - Create `src/components/ui/Modal.tsx` with size variants (sm, md, lg, full)
    - Implement backdrop overlay with dark-bg/50 opacity
    - Add focus trap to keep keyboard navigation within modal
    - Support ESC key to close and click-outside to close
    - Add close button with proper ARIA label
    - Implement open/close animations (fade in/out, scale)
    - Prevent body scroll when modal is open
    - _Requirements: 15.4, 21.9, 21.11_

  - [~] 9.5 Create Loading and Skeleton components
    - Create `src/components/ui/Loading.tsx` with spinner animation
    - Create `src/components/ui/Skeleton.tsx` for content loading states
    - Add pulse animation for skeleton (animate-pulse)
    - Show loading spinner for actions >300ms
    - Style with neutral colors (gray-300 light, gray-700 dark)
    - _Requirements: 17.4_

- [ ] 10. Implement security features
  - [~] 10.1 Create rate limiter with LRU cache
    - Create `src/lib/security/rate-limiter.ts` with RateLimiter class
    - Use lru-cache package for token storage
    - Implement check() method with sliding window algorithm
    - Set 100 requests per minute per IP address limit
    - Return success status and remaining quota
    - Add automatic cleanup of expired entries
    - _Requirements: 18.5_

  - [ ]* 10.2 Write property tests for rate limiter
    - **Property 6: Rate Limit Enforcement** - Requests exceeding 100/min return HTTP 429
    - **Validates: Requirements 18.5**
    - Test with concurrent requests, various time windows, token expiry

  - [~] 10.3 Implement CSRF token generation and validation
    - Create `src/lib/security/csrf.ts` with CSRF protection utilities
    - Generate secure random tokens using crypto API
    - Store tokens in HTTP-only cookies with 24-hour expiry
    - Implement validateToken() for form submissions
    - Reject requests with missing or invalid tokens
    - _Requirements: 18.1, 18.7_

  - [ ]* 10.4 Write property tests for CSRF protection
    - **Property 7: CSRF Protection** - All form submissions require valid CSRF token
    - **Validates: Requirements 18.1, 18.7**
    - Test token expiry, token reuse, missing tokens

  - [~] 10.5 Create input sanitization utilities
    - Create `src/lib/security/sanitization.ts` with sanitize functions
    - Use DOMPurify for HTML sanitization
    - Implement sanitizeInput() for text inputs (escape HTML entities)
    - Implement sanitizeEmail() for email validation
    - Implement sanitizeUrl() for URL validation
    - Prevent SQL injection through parameterized queries
    - _Requirements: 1.7, 18.4_

  - [ ]* 10.6 Write property tests for input sanitization
    - **Property 8: Input Sanitization** - All user inputs are HTML-encoded
    - **Validates: Requirements 1.7, 18.4**
    - Test with XSS payloads, SQL injection attempts, script tags

  - [~] 10.7 Implement Content Security Policy middleware
    - Update `middleware.ts` to add CSP headers
    - Allow self, Google Analytics, OpenAI API, Sanity CMS
    - Block inline scripts except for essential ones (use nonce)
    - Set X-Frame-Options, X-Content-Type-Options, Referrer-Policy headers
    - Set Permissions-Policy to restrict camera, microphone, geolocation
    - _Requirements: 18.1, 18.3_

  - [~] 10.8 Add HTTPS enforcement and security headers
    - Redirect HTTP to HTTPS in middleware
    - Set Strict-Transport-Security header (max-age 31536000)
    - Implement Subresource Integrity (SRI) for external scripts
    - Configure secure cookie flags (HTTPOnly, Secure, SameSite=Lax)
    - _Requirements: 18.2, 18.3, 18.7_

- [ ] 11. Implement analytics system
  - [~] 11.1 Create AnalyticsTracker service
    - Create `src/lib/analytics/tracker.ts` with AnalyticsTracker class
    - Integrate Google Analytics 4 (gtag.js) with NEXT_PUBLIC_GA_ID
    - Integrate Vercel Analytics for Core Web Vitals
    - Implement trackPageView() to send page view events
    - Implement trackEvent() for custom events (category, action, label, value)
    - Implement trackConversion() for goal completions
    - Respect Do Not Track (DNT) browser preference
    - _Requirements: 13.1, 13.3, 13.5, 13.8_

  - [~] 11.2 Add session tracking and user journey
    - Create `src/lib/analytics/session.ts` with SessionTracker class
    - Generate unique session IDs using UUID
    - Track session start time, end time, duration
    - Track visitor source (direct, referral, search, social)
    - Track device type (desktop, mobile, tablet) and OS
    - Store session data in session storage
    - Implement trackUserJourney() to record page sequence
    - _Requirements: 13.1, 13.2, 13.4, 14.2_

  - [~] 11.3 Implement conversion tracking and funnel analysis
    - Create `src/lib/analytics/conversions.ts` with ConversionTracker class
    - Define conversion events: contact_form, whatsapp_click, resume_download, project_inquiry
    - Track complete user journey from landing to conversion
    - Calculate conversion rate per traffic source
    - Track time-to-conversion metrics
    - Identify drop-off points in funnels (page sequence analysis)
    - _Requirements: 13.7, 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 11.4 Write property tests for analytics session tracking
    - **Property 4: Session Consistency** - Sessions maintain message history until 30-min timeout
    - **Property 5: Analytics Data Integrity** - Page view timestamps are monotonically increasing
    - **Validates: Requirements 13.1, 13.2, 14.2**
    - Test concurrent sessions, timestamp ordering, journey preservation

  - [~] 11.5 Create useAnalytics React hook
    - Create `src/hooks/useAnalytics.ts` exporting useAnalytics hook
    - Provide analytics instance with track methods
    - Auto-track page views on route changes
    - Handle analytics loading state
    - Return null if analytics is disabled or DNT is set
    - _Requirements: 13.1, 13.5_

  - [~] 11.6 Add Google Analytics 4 script to root layout
    - Update `src/app/layout.tsx` to include GA4 script tag
    - Use next/script with strategy "afterInteractive"
    - Configure GA4 with page view tracking
    - Set custom dimensions for session tracking
    - _Requirements: 13.8_

- [ ] 12. Implement performance optimizations
  - [~] 12.1 Configure Next.js code splitting and bundle optimization
    - Update `next.config.js` with webpack optimization
    - Configure splitChunks for vendor and common bundles
    - Add package import optimization (react-icons, lucide-react)
    - Remove console.log in production build
    - Target initial bundle size below 200KB
    - _Requirements: 9.7_

  - [~] 12.2 Implement image optimization across all components
    - Use next/image for all image assets
    - Set width and height for all images
    - Add loading="lazy" for below-fold images
    - Generate blur placeholders (blurDataURL) for images
    - Convert images to WebP format where supported
    - _Requirements: 9.6_

  - [~] 12.3 Implement caching strategy with ISR and static generation
    - Configure Incremental Static Regeneration (ISR) for CMS pages with 60-second revalidation
    - Use static generation (SSG) for public pages (home, about, contact)
    - Set cache headers for static assets (max-age 30 days)
    - Implement prefetching for linked pages on hover
    - Use SWR for API response caching with configurable TTL
    - _Requirements: 9.8, 10.1, 10.2, 10.3, 10.4, 10.6_

  - [~] 12.4 Implement service worker for offline caching
    - Configure next-pwa plugin in next.config.js
    - Create service worker for critical page caching
    - Cache CSS, JS, fonts, and key images
    - Implement network-first strategy for API calls
    - Add offline fallback page
    - _Requirements: 10.5, 20.2, 20.3, 20.4_

  - [~] 12.5 Optimize Core Web Vitals
    - Reduce Largest Contentful Paint (LCP) to <2.5s on 3G
    - Optimize First Contentful Paint (FCP) to <1.5s on 3G
    - Achieve Time to Interactive (TTI) <3.5s on 3G
    - Minimize Cumulative Layout Shift (CLS) to <0.1
    - Add performance marks for critical rendering paths
    - _Requirements: 9.2, 9.3, 9.4, 9.5_

  - [ ]* 12.6 Write performance tests and monitoring
    - **Property 9: Response Time Bounds** - 95th percentile API response ≤500ms
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4**
    - Test with Lighthouse CI, measure Core Web Vitals
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 13. Implement SEO enhancements
  - [~] 13.1 Create SEO metadata generator
    - Create `src/lib/seo/metadata.ts` with generateMetadata() function
    - Generate Open Graph tags (og:title, og:description, og:image, og:url)
    - Generate Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
    - Ensure unique title tags (50-60 characters) for all pages
    - Ensure unique meta descriptions (150-160 characters) for all pages
    - Implement canonical URLs to prevent duplicate content
    - _Requirements: 11.1, 11.2, 11.6, 11.7, 11.8_

  - [~] 13.2 Implement structured data with JSON-LD
    - Create `src/lib/seo/structured-data.ts` with schema generators
    - Generate Person schema for portfolio owner (Charles Jasema)
    - Generate CreativeWork schemas for projects and blog posts
    - Generate WebSite schema with search action
    - Generate BreadcrumbList schemas for navigation
    - Add structured data to page metadata
    - _Requirements: 11.3, 12.3_

  - [~] 13.3 Generate XML sitemap and robots.txt
    - Create `src/app/sitemap.ts` for dynamic sitemap generation
    - Include all public pages with priority and change frequency
    - Set homepage priority to 1.0, main pages to 0.8, content pages to 0.6
    - Create `src/app/robots.txt` route to serve robots.txt
    - Allow all search engines, set crawl-delay to 1 second
    - Reference sitemap in robots.txt
    - _Requirements: 11.4, 11.5_

  - [~] 13.4 Optimize content for SEO
    - Ensure all images have descriptive alt text
    - Validate proper heading hierarchy (h1 → h2 → h3) on all pages
    - Add breadcrumb navigation with schema markup
    - Implement internal linking between related content
    - Track Core Web Vitals for SEO ranking signals
    - Validate mobile-friendliness for all pages
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [ ] 14. Implement accessibility features
  - [~] 14.1 Ensure keyboard navigation for all interactive elements
    - Add tabindex to all focusable elements in logical order
    - Implement keyboard shortcuts (Tab, Shift+Tab, Enter, Space, Escape)
    - Ensure all buttons and links are keyboard accessible
    - Add visible focus indicators with primary-gold ring
    - Implement focus trap in modals and dialogs
    - _Requirements: 15.1, 15.5_

  - [~] 14.2 Add ARIA attributes for accessibility
    - Add aria-label to icon-only buttons (WhatsApp, search, menu)
    - Add aria-live regions for dynamic content updates (chatbot, form submission)
    - Add aria-expanded for collapsible sections
    - Add aria-hidden for decorative elements
    - Add role attributes for custom components (dialog, alert, navigation)
    - Ensure proper ARIA landmark roles (main, nav, aside, footer)
    - _Requirements: 15.6, 15.7, 16.1, 16.2_

  - [~] 14.3 Implement skip navigation links
    - Add skip-to-main-content link at page top
    - Add skip-to-navigation and skip-to-footer links
    - Style skip links to be visible on focus
    - Position skip links at top of DOM for screen readers
    - _Requirements: 15.8, 16.5_

  - [~] 14.4 Ensure color contrast and visual accessibility
    - Validate all text meets WCAG 2.1 Level AA contrast ratios (4.5:1 normal, 3:1 large)
    - Test with color blindness simulators
    - Ensure information is not conveyed by color alone
    - Add text labels alongside color indicators
    - Test dark mode contrast ratios
    - _Requirements: 15.3, 21.4_

  - [~] 14.5 Optimize for screen readers
    - Add alt text to all images (descriptive for content, empty for decorative)
    - Ensure reading order matches visual order in DOM
    - Test with NVDA, JAWS, and VoiceOver screen readers
    - Add descriptive labels for form inputs
    - Ensure all forms have associated labels (not just placeholders)
    - _Requirements: 15.2, 15.4, 16.1, 16.3, 16.4, 16.6_

  - [ ]* 14.6 Write accessibility compliance tests
    - Test keyboard navigation on all pages
    - Test with screen reader (automated checks)
    - Test color contrast ratios programmatically
    - Test ARIA attributes validity
    - Validate against WCAG 2.1 Level AA checklist
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

- [~] 15. Checkpoint - Ensure optimization and accessibility tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Implement newsletter integration
  - [~] 16.1 Create newsletter subscription service
    - Create `src/lib/newsletter/newsletter-service.ts` with NewsletterService class
    - Integrate with Mailchimp API using @mailchimp/mailchimp_marketing
    - Implement subscribe() method with email validation
    - Implement sendWelcomeEmail() for new subscribers
    - Handle duplicate subscriptions gracefully
    - Implement unsubscribe() method with token validation
    - _Requirements: 19.3, 19.4, 19.8_

  - [~] 16.2 Implement double opt-in confirmation flow
    - Send confirmation email with unique token
    - Create confirmation endpoint: GET /api/newsletter/confirm?token={token}
    - Validate token and activate subscription
    - Redirect to success page after confirmation
    - Expire tokens after 24 hours
    - _Requirements: 19.7_

  - [~] 16.3 Create newsletter subscription form component
    - Create `src/components/newsletter/NewsletterForm.tsx`
    - Add to footer component on all pages
    - Include email input with validation (email format)
    - Add consent checkbox with GDPR compliance text
    - Link to privacy policy
    - Show success message: "Check your email to confirm subscription"
    - Show error messages for validation failures or API errors
    - _Requirements: 19.1, 19.2, 19.4, 19.5, 19.6_

  - [~] 16.4 Create newsletter API route
    - Create `src/app/api/newsletter/route.ts` for POST /api/newsletter
    - Validate email format using Zod schema
    - Check CSRF token and rate limiting
    - Call NewsletterService.subscribe()
    - Return success/error response
    - Log all subscription attempts
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

  - [ ]* 16.5 Write unit tests for newsletter service
    - Test email validation with valid/invalid formats
    - Test duplicate subscription handling
    - Test welcome email sending
    - Test double opt-in token generation and validation
    - Test unsubscribe functionality
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.7, 19.8_

- [ ] 17. Implement PWA features
  - [~] 17.1 Create web app manifest
    - Create `src/app/manifest.ts` with web app manifest
    - Set app name, short_name, description
    - Add icons (192x192, 512x512) with proper paths
    - Set theme_color to primary-gold (#D4AF37)
    - Set background_color to dark-bg (#0F172A)
    - Set display mode to "standalone"
    - Set start_url to "/"
    - _Requirements: 20.1, 20.7_

  - [~] 17.2 Configure service worker with next-pwa
    - Install and configure next-pwa plugin
    - Update next.config.js with pwa configuration
    - Set cache strategy for static assets
    - Implement runtime caching for API responses
    - Add offline fallback page
    - Configure service worker to auto-update
    - _Requirements: 20.2, 20.3, 20.8_

  - [~] 17.3 Create custom offline page
    - Create `src/app/offline/page.tsx` for offline fallback
    - Show cached content when available
    - Display message: "You're offline. Some features may be unavailable."
    - List available cached pages
    - Style with consistent branding
    - _Requirements: 20.4_

  - [~] 17.4 Implement install prompt for PWA
    - Create `src/components/pwa/InstallPrompt.tsx` component
    - Listen for beforeinstallprompt event
    - Show install banner after meaningful engagement (2+ page views)
    - Add "Add to Home Screen" button
    - Handle prompt acceptance/rejection
    - Track install events with analytics
    - _Requirements: 20.5, 20.6_

  - [ ]* 17.5 Write integration tests for PWA features
    - Test service worker registration
    - Test offline page rendering
    - Test manifest.json validity
    - Test install prompt display logic
    - Test caching behavior for static assets
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

- [ ] 18. Implement enhanced contact form with email integration
  - [~] 18.1 Update contact form with improved validation
    - Update existing ContactForm component in `src/app/contact/page.tsx`
    - Use react-hook-form with Zod validation schema
    - Add real-time validation with inline error messages
    - Implement field-level validation (name: 2-100 chars, email: valid format, subject: 5-200 chars, message: 10-2000 chars)
    - Add character counters for text areas
    - Ensure proper ARIA labels and error announcements
    - _Requirements: 1.1, 17.5_

  - [~] 18.2 Create contact API route with email service integration
    - Create `src/app/api/contact/route.ts` for POST /api/contact
    - Validate CSRF token before processing
    - Check rate limiting (5 submissions per minute per IP)
    - Sanitize all inputs before processing
    - Call EmailService.sendEmail() with submission data
    - Send confirmation email to submitter
    - Return success response with confirmation ID
    - Handle errors and return appropriate error messages
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8_

  - [~] 18.3 Add success and error user feedback
    - Show success message with confirmation number after submission
    - Display specific error messages with corrective actions
    - Show loading spinner during submission
    - Disable submit button while processing to prevent double submission
    - Clear form on successful submission
    - Offer alternative contact methods (WhatsApp, email) on failure
    - _Requirements: 17.1, 17.2, 17.4_

  - [~] 18.4 Implement network error handling
    - Detect offline status using navigator.onLine
    - Queue submissions when offline for retry
    - Display offline indicator banner
    - Auto-retry when connection restored
    - Show retry button for failed submissions
    - _Requirements: 17.3_

  - [~] 18.5 Add error boundary for unexpected errors
    - Create `src/components/ErrorBoundary.tsx` component
    - Catch and log React errors
    - Display user-friendly error message
    - Offer page reload option
    - Track errors with error logging service
    - _Requirements: 17.6, 17.7_

  - [ ]* 18.6 Write integration tests for contact form flow
    - Test complete submission flow with mock email service
    - Test validation with valid/invalid inputs
    - Test CSRF token validation
    - Test rate limiting enforcement
    - Test error handling and user feedback
    - Test offline queueing and retry
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 17.1, 17.2, 17.3_

- [ ] 19. Implement API monitoring and health checks
  - [~] 19.1 Create health check endpoint
    - Create `src/app/api/health/route.ts` for GET /api/health
    - Check email service configuration and provider availability
    - Check OpenAI API connectivity
    - Check Sanity CMS connectivity
    - Return JSON with status for each service
    - Return overall status: "healthy", "degraded", "unhealthy"
    - _Requirements: 3.4_

  - [~] 19.2 Add email delivery metrics tracking
    - Track email delivery success rate over 24-hour rolling window
    - Calculate average delivery time
    - Track failure reasons (provider errors, network errors, validation errors)
    - Expose metrics through health endpoint
    - Log warning when success rate falls below 90%
    - _Requirements: 3.3, 3.5_

  - [~] 19.3 Implement structured logging
    - Create `src/lib/logger.ts` with Logger utility
    - Define log levels: debug, info, warn, error
    - Structure logs as JSON with timestamp, level, message, context
    - Mask sensitive data (API keys, email addresses) in logs
    - Send logs to console in development, file in production
    - _Requirements: 2.4_

- [ ] 20. Fix CSS architecture and styling issues
  - [~] 20.1 Audit and fix component styling inconsistencies
    - Review all components for arbitrary color values
    - Replace hex colors with Tailwind color classes (primary-gold, accent-red, tech-teal)
    - Ensure consistent spacing using defined scale (4, 8, 12, 16, 24, 32, 48, 64)
    - Verify all hover/focus/active states use consistent colors and transitions
    - Remove !important declarations and fix specificity conflicts
    - _Requirements: 21.2, 21.3, 21.8, 21.9_

  - [~] 20.2 Fix responsive typography and layout issues
    - Ensure all text scales properly at breakpoints (mobile: base, tablet: lg, desktop: xl)
    - Fix any broken grid layouts or misaligned components
    - Test all pages at mobile (375px), tablet (768px), and desktop (1440px) viewports
    - Fix overlapping elements and z-index conflicts
    - Ensure proper text wrapping and overflow handling
    - _Requirements: 21.6, 21.10_

  - [~] 20.3 Implement consistent form input styling
    - Apply .input-base class to all form inputs
    - Ensure consistent borders, padding, focus rings across all inputs
    - Implement error state styling with accent-red color
    - Add disabled state styling with reduced opacity
    - Test dark mode variants for all input states
    - _Requirements: 21.15_

  - [~] 20.4 Fix animation and transition inconsistencies
    - Ensure all animations use defined durations (150ms, 200ms, 300ms)
    - Use ease-in-out timing function consistently
    - Add smooth transitions for hover effects (opacity, transform, background)
    - Fix any janky or abrupt animations
    - Test animations on low-end devices
    - _Requirements: 21.11_

  - [~] 20.5 Prevent Flash of Unstyled Content (FOUC)
    - Ensure CSS is loaded before page render
    - Add loading state for dynamic content
    - Use CSS-in-JS for critical above-the-fold styles if needed
    - Test on slow network connections (3G)
    - Verify no unstyled content flashes on page load
    - _Requirements: 21.12_

  - [~] 20.6 Remove unused CSS and optimize bundle size
    - Use PurgeCSS to remove unused Tailwind classes
    - Remove any unused custom CSS classes
    - Validate CSS naming conventions (component-name__element--modifier)
    - Minimize CSS bundle size
    - _Requirements: 21.13, 21.14_

- [ ] 21. Integrate all components and features
  - [~] 21.1 Add chatbot widget to root layout
    - Import ChatbotWidget in `src/app/layout.tsx`
    - Position widget to appear on all pages
    - Ensure widget doesn't block content or other floating elements
    - Test on mobile and desktop viewports
    - _Requirements: 4.1_

  - [~] 21.2 Add WhatsApp widget to root layout
    - Import WhatsAppWidget in `src/app/layout.tsx`
    - Position below chatbot widget with proper spacing
    - Ensure both widgets are accessible on mobile
    - Test on various screen sizes
    - _Requirements: 7.1_

  - [~] 21.3 Add smart search to header/navigation
    - Import SmartSearch in header component
    - Add search icon with keyboard shortcut indicator
    - Position search prominently in navigation
    - Ensure search works on all pages
    - _Requirements: 6.1_

  - [~] 21.4 Add content recommendations to relevant pages
    - Add ContentRecommendations to project detail pages
    - Add ContentRecommendations to blog post pages
    - Pass current page context for similarity matching
    - Position recommendations at bottom of content
    - _Requirements: 5.2, 5.6_

  - [~] 21.5 Add newsletter form to footer
    - Import NewsletterForm in footer component
    - Position prominently in footer section
    - Ensure form appears on all pages
    - Style consistently with site theme
    - _Requirements: 19.1_

  - [~] 21.6 Add PWA install prompt to appropriate pages
    - Import InstallPrompt component
    - Show after user engagement (2+ page views)
    - Allow dismissal with localStorage persistence
    - Track install conversions with analytics
    - _Requirements: 20.5_

  - [~] 21.7 Wire up analytics tracking throughout the app
    - Add useAnalytics hook to all key components
    - Track contact form submissions
    - Track WhatsApp widget clicks
    - Track chatbot interactions
    - Track search queries
    - Track project views and blog post views
    - Track resume downloads
    - _Requirements: 13.2, 13.7_

  - [~] 21.8 Connect all API routes with middleware
    - Ensure all API routes use rate limiting middleware
    - Ensure all API routes validate CSRF tokens
    - Ensure all API routes sanitize inputs
    - Add error handling to all routes
    - Log all API requests and responses
    - _Requirements: 18.4, 18.5, 18.7_

- [ ] 22. Final testing and validation
  - [ ]* 22.1 Run complete integration test suite
    - Test email delivery end-to-end with all providers
    - Test chatbot conversations and knowledge retrieval
    - Test WhatsApp widget on various devices
    - Test search across all content types
    - Test newsletter subscription flow
    - Test PWA installation on mobile devices
    - _Requirements: 1.1, 4.1, 6.1, 7.1, 19.1, 20.5_

  - [ ]* 22.2 Run Lighthouse audit on all pages
    - Verify performance score ≥90 on all pages
    - Verify accessibility score 100 (WCAG 2.1 Level AA)
    - Verify SEO score 100
    - Verify best practices score 100
    - Test on mobile and desktop
    - _Requirements: 9.1, 15.1, 11.1_

  - [ ]* 22.3 Test accessibility with screen readers
    - Test with NVDA on Windows
    - Test with VoiceOver on macOS/iOS
    - Verify all content is accessible
    - Verify all interactive elements are keyboard navigable
    - Verify all ARIA labels are correct
    - _Requirements: 15.1, 15.2, 16.1_

  - [ ]* 22.4 Test cross-browser compatibility
    - Test on Chrome, Firefox, Safari, Edge
    - Test on mobile browsers (Safari iOS, Chrome Android)
    - Verify all features work consistently
    - Fix any browser-specific issues
    - _Requirements: 9.1, 15.1_

  - [ ]* 22.5 Test security features
    - Verify rate limiting works correctly
    - Test CSRF protection on all forms
    - Test input sanitization with XSS payloads
    - Verify CSP headers are set correctly
    - Test HTTPS enforcement
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

  - [ ]* 22.6 Monitor Core Web Vitals in production
    - Set up Vercel Analytics monitoring
    - Track LCP, FCP, TTI, CLS metrics
    - Set up alerts for metric degradation
    - Monitor real user performance data
    - _Requirements: 9.2, 9.3, 9.4, 9.5, 12.5_

- [ ] 23. Documentation and deployment
  - [~] 23.1 Update .env.example with all required variables
    - Document all email provider keys
    - Document AI service keys
    - Document analytics IDs
    - Document newsletter service keys
    - Add comments explaining each variable
    - _Requirements: 2.1, 2.6_

  - [~] 23.2 Create deployment checklist
    - List all environment variables to set in Vercel
    - Document build configuration
    - Document performance optimization settings
    - Document monitoring setup
    - Create rollback plan
    - _Requirements: 2.6_

  - [~] 23.3 Update README with feature documentation
    - Document all new features (email, AI, WhatsApp, etc.)
    - Add setup instructions for each service
    - Document API endpoints
    - Add troubleshooting guide
    - Include testing instructions

  - [~] 23.4 Deploy to production
    - Set all environment variables in Vercel dashboard
    - Deploy to Vercel with production configuration
    - Verify all features work in production
    - Test email delivery with real providers
    - Monitor error logs and performance metrics
    - _Requirements: 1.1, 2.1, 2.6_

- [~] 24. Final checkpoint - Ensure all tests pass and deployment is successful
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- **Tasks marked with `*` are optional** and can be skipped for faster MVP delivery. These include all property-based tests, unit tests, integration tests, and comprehensive testing tasks.
- **Each task references specific requirements** for traceability back to requirements.md (format: _Requirements: X.Y, X.Z_).
- **Checkpoints ensure incremental validation** at reasonable breaks. Stop and verify all tests pass before proceeding to the next phase.
- **Property tests validate universal correctness properties** defined in the design document (Properties 1-10).
- **Unit tests validate specific examples and edge cases** for individual components and services.
- **Integration tests validate complete user flows** across multiple components.
- **The implementation is modular** with clear separation between infrastructure, services, UI components, and integrations.
- **TypeScript is used throughout** for type safety and better developer experience.
- **All components follow accessibility best practices** including keyboard navigation, ARIA labels, and WCAG 2.1 Level AA compliance.
- **Security is built-in from the start** with rate limiting, CSRF protection, input sanitization, and CSP headers.
- **Performance optimizations are implemented early** to ensure sub-2-second page loads and Lighthouse score 90+.
- **The CSS architecture uses Tailwind CSS** with centralized design tokens for consistent styling across all components.
- **Error handling is comprehensive** with user-friendly messages and proper logging for debugging.
- **Analytics tracking is privacy-focused** respecting DNT preferences and GDPR requirements.
- **The PWA features enable offline usage** and home screen installation for enhanced mobile experience.

## Implementation Strategy

1. **Phase 1: Infrastructure (Tasks 1-3)** - Set up dependencies, configuration, email system
2. **Phase 2: AI Features (Tasks 4-8)** - Implement chatbot, recommendations, search, WhatsApp
3. **Phase 3: UI Components (Tasks 9-15)** - Build reusable components, security, analytics, optimizations
4. **Phase 4: Integrations (Tasks 16-21)** - Newsletter, PWA, contact form, component integration
5. **Phase 5: Testing & Deployment (Tasks 22-24)** - Final validation, documentation, deployment

Each phase builds on the previous, ensuring a solid foundation before adding complexity.

## Task Dependency Graph

```json
{
  "waves": [
    { 
      "id": 0, 
      "tasks": ["1.1", "1.2", "1.3", "1.5"],
      "description": "Initial setup - dependencies, environment, types"
    },
    { 
      "id": 1, 
      "tasks": ["1.4", "2.1", "9.1", "9.2", "9.3"],
      "description": "Foundation - CSS, email base, UI components"
    },
    { 
      "id": 2, 
      "tasks": ["2.2", "2.3", "2.4", "9.4", "9.5", "10.1", "10.3", "10.5"],
      "description": "Core services - email providers, security utilities"
    },
    { 
      "id": 3, 
      "tasks": ["2.5", "2.6", "2.7", "10.2", "10.4", "10.6"],
      "description": "Email integration - templates, service, logging, property tests"
    },
    { 
      "id": 4, 
      "tasks": ["2.8", "2.9", "4.1", "7.1", "7.2", "7.3", "10.7", "10.8"],
      "description": "Email tests, AI/WhatsApp foundation, security middleware"
    },
    { 
      "id": 5, 
      "tasks": ["4.2", "4.3", "5.1", "5.2", "6.1", "6.2", "6.3", "11.1", "11.2"],
      "description": "AI services - chatbot, recommendations, search, analytics foundation"
    },
    { 
      "id": 6, 
      "tasks": ["4.4", "4.5", "5.3", "6.4", "7.4", "7.5", "11.3", "11.5"],
      "description": "AI UI components, WhatsApp widget, analytics hooks"
    },
    { 
      "id": 7, 
      "tasks": ["4.6", "5.4", "6.5", "7.6", "11.4", "11.6"],
      "description": "AI feature tests, analytics integration"
    },
    { 
      "id": 8, 
      "tasks": ["12.1", "12.2", "12.3", "13.1", "13.2", "13.3"],
      "description": "Performance optimization, SEO implementation"
    },
    { 
      "id": 9, 
      "tasks": ["12.4", "12.5", "13.4", "14.1", "14.2", "14.3"],
      "description": "PWA service worker, Core Web Vitals, accessibility foundation"
    },
    { 
      "id": 10, 
      "tasks": ["12.6", "14.4", "14.5", "16.1", "16.2", "17.1", "17.2"],
      "description": "Performance tests, accessibility features, newsletter service, PWA manifest"
    },
    { 
      "id": 11, 
      "tasks": ["14.6", "16.3", "16.4", "17.3", "17.4", "19.1", "19.2"],
      "description": "Accessibility tests, newsletter UI, PWA UI, monitoring"
    },
    { 
      "id": 12, 
      "tasks": ["16.5", "17.5", "19.3", "20.1", "20.2", "20.3"],
      "description": "Newsletter tests, PWA tests, logging, CSS fixes"
    },
    { 
      "id": 13, 
      "tasks": ["18.1", "20.4", "20.5", "20.6"],
      "description": "Contact form validation, CSS polish"
    },
    { 
      "id": 14, 
      "tasks": ["18.2", "18.3", "18.4", "18.5"],
      "description": "Contact API integration, error handling"
    },
    { 
      "id": 15, 
      "tasks": ["18.6", "21.1", "21.2", "21.3", "21.4", "21.5"],
      "description": "Contact tests, component integration"
    },
    { 
      "id": 16, 
      "tasks": ["21.6", "21.7", "21.8"],
      "description": "Final integration - analytics, middleware"
    },
    { 
      "id": 17, 
      "tasks": ["22.1", "22.2", "22.3", "22.4", "22.5", "22.6"],
      "description": "Comprehensive testing"
    },
    { 
      "id": 18, 
      "tasks": ["23.1", "23.2", "23.3"],
      "description": "Documentation"
    },
    { 
      "id": 19, 
      "tasks": ["23.4"],
      "description": "Production deployment"
    }
  ]
}
```

## Wave Execution Strategy

- **Wave 0**: Sets up the project foundation with dependencies, configuration, and type definitions
- **Waves 1-4**: Builds the email delivery system with multi-provider support and comprehensive testing
- **Waves 5-7**: Implements all AI features (chatbot, recommendations, search) and WhatsApp integration
- **Waves 8-9**: Adds performance optimizations, SEO, and PWA foundations
- **Waves 10-12**: Implements accessibility, newsletter, PWA UI, and monitoring
- **Waves 13-16**: Enhances contact form, fixes CSS, and integrates all components
- **Waves 17-19**: Final testing, documentation, and production deployment

Tasks within the same wave are independent and can be executed in parallel. Each wave depends on the completion of all previous waves.
