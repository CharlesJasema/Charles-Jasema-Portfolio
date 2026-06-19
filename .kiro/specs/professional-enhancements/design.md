# Technical Design Document: Professional Portfolio Enhancements

## Overview

This document details the technical design for comprehensive professional enhancements to the Charles Jasema portfolio website. The enhancements include implementing a robust email delivery system, AI-powered features (chatbot, content recommendations, smart search), enhanced WhatsApp integration, CSS architecture fixes, and professional improvements (performance, SEO, analytics, accessibility, security, newsletter, PWA).

### Design Goals

1. **Reliability**: Email delivery with 99.9% success rate through multi-provider fallback
2. **Intelligence**: AI-powered interactions that enhance user engagement and content discovery
3. **Performance**: Sub-2-second page loads with Lighthouse score 90+
4. **Accessibility**: WCAG 2.1 Level AA compliance for inclusive user experience
5. **Security**: Enterprise-grade protection against common web attacks
6. **Maintainability**: Clean architecture with separation of concerns and consistent styling

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x with custom configuration
- **CMS**: Sanity CMS (existing)
- **Email Providers**: SendGrid, Resend, AWS SES (multi-provider support)
- **AI/ML**: OpenAI GPT-4 API for chatbot, Vercel AI SDK
- **Analytics**: Google Analytics 4, Vercel Analytics
- **Deployment**: Vercel Edge Network
- **State Management**: React Context API, SWR for data fetching
- **Form Handling**: React Hook Form with Zod validation

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Browser │  │  Mobile  │  │  Tablet  │  │    PWA   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Next.js App Router + Middleware + Edge Functions        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Application Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Pages  │  │   API    │  │ Components│  │  Services│       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Service Layer                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Email  │  │    AI    │  │ WhatsApp │  │Analytics │       │
│  │  Service │  │  Engine  │  │  Service │  │  Service │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ SendGrid │  │  OpenAI  │  │  Sanity  │  │    GA4   │       │
│  │  Resend  │  │   API    │  │   CMS    │  │  Vercel  │       │
│  │  AWS SES │  │          │  │          │  │Analytics │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── contact/
│   │   │   └── route.ts         # Contact form handler
│   │   ├── chatbot/
│   │   │   └── route.ts         # AI chatbot endpoint
│   │   ├── search/
│   │   │   └── route.ts         # Smart search endpoint
│   │   ├── newsletter/
│   │   │   └── route.ts         # Newsletter subscription
│   │   └── health/
│   │       └── route.ts         # Health check endpoint
│   ├── page.tsx                 # Homepage
│   ├── contact/page.tsx         # Contact page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ai/
│   │   ├── ChatbotWidget.tsx    # AI chatbot UI
│   │   └── ContentRecommendations.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx      # Enhanced contact form
│   │   └── WhatsAppWidget.tsx   # WhatsApp integration
│   ├── search/
│   │   └── SmartSearch.tsx      # AI-powered search
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Navigation.tsx
├── lib/
│   ├── email/
│   │   ├── providers/
│   │   │   ├── sendgrid.ts
│   │   │   ├── resend.ts
│   │   │   └── aws-ses.ts
│   │   ├── templates/
│   │   │   ├── contact-notification.tsx
│   │   │   └── confirmation.tsx
│   │   ├── email-service.ts     # Main email service
│   │   ├── config.ts            # Email configuration
│   │   └── logger.ts            # Email logging
│   ├── ai/
│   │   ├── chatbot.ts           # Chatbot logic
│   │   ├── recommendations.ts   # Content recommendations
│   │   └── search.ts            # Smart search
│   ├── analytics/
│   │   ├── tracker.ts           # Event tracking
│   │   └── conversions.ts       # Conversion tracking
│   ├── security/
│   │   ├── csrf.ts              # CSRF protection
│   │   ├── rate-limiter.ts      # Rate limiting
│   │   └── sanitization.ts      # Input sanitization
│   └── utils/
│       ├── validation.ts        # Form validation
│       └── errors.ts            # Error handling
├── styles/
│   ├── globals.css              # Global styles
│   └── themes/
│       ├── colors.ts            # Color tokens
│       └── typography.ts        # Typography tokens
├── config/
│   ├── site.ts                  # Site configuration
│   ├── seo.ts                   # SEO configuration
│   └── analytics.ts             # Analytics configuration
└── types/
    ├── email.ts                 # Email types
    ├── ai.ts                    # AI types
    └── analytics.ts             # Analytics types
```

## Data Models

### Email Service Data Models

```typescript
// Contact Form Submission
interface ContactSubmission {
  id: string;                    // UUID
  name: string;                  // 2-100 characters
  email: string;                 // Valid email format
  subject: string;               // 5-200 characters
  service?: string;              // Optional service type
  message: string;               // 10-2000 characters
  csrfToken: string;             // CSRF token
  timestamp: Date;               // Submission timestamp
  userAgent: string;             // Browser user agent
  ipAddress?: string;            // Optional IP (hashed)
  status: 'pending' | 'sent' | 'failed';
  provider?: 'sendgrid' | 'resend' | 'aws-ses';
  attempts: number;              // Retry count
  lastAttempt?: Date;
  error?: string;                // Error message if failed
}

// Email Provider Configuration
interface EmailProviderConfig {
  provider: 'sendgrid' | 'resend' | 'aws-ses';
  enabled: boolean;
  priority: number;              // 1 = highest
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
}

// Email Delivery Log
interface EmailDeliveryLog {
  id: string;
  submissionId: string;
  provider: string;
  timestamp: Date;
  status: 'success' | 'failure';
  deliveryTime: number;          // Milliseconds
  errorCode?: string;
  errorMessage?: string;
}
```

### AI Chatbot Data Models

```typescript
// Chat Message
interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokens?: number;               // Token count
}

// Chat Session
interface ChatSession {
  id: string;
  startTime: Date;
  lastActivity: Date;
  messageCount: number;
  context: {
    currentPage: string;
    referrer?: string;
    userAgent: string;
  };
  history: ChatMessage[];
}

// Portfolio Knowledge Base
interface PortfolioKnowledge {
  projects: Array<{
    title: string;
    category: string;
    technologies: string[];
    description: string;
    url?: string;
  }>;
  skills: string[];
  services: string[];
  blogPosts: Array<{
    title: string;
    excerpt: string;
    category: string;
    url: string;
  }>;
}
```

### Analytics Data Models

```typescript
// Page View Event
interface PageViewEvent {
  id: string;
  sessionId: string;
  timestamp: Date;
  page: string;
  referrer?: string;
  duration?: number;              // Time on page (seconds)
}

// Custom Event
interface CustomEvent {
  id: string;
  sessionId: string;
  timestamp: Date;
  category: 'contact' | 'whatsapp' | 'download' | 'project';
  action: string;
  label?: string;
  value?: number;
}

// Conversion Event
interface ConversionEvent {
  id: string;
  sessionId: string;
  timestamp: Date;
  type: 'contact_form' | 'whatsapp_click' | 'resume_download' | 'project_inquiry';
  source: string;
  journey: string[];             // Page sequence
  timeToConversion: number;      // Seconds from landing to conversion
}

// Session
interface AnalyticsSession {
  id: string;
  userId?: string;               // Optional for unique visitor tracking
  startTime: Date;
  endTime?: Date;
  source: 'direct' | 'referral' | 'search' | 'social' | 'unknown';
  device: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  country?: string;
  city?: string;
}
```

## API Specifications

### Contact Form API

**Endpoint**: `POST /api/contact`

**Request Headers**:
```
Content-Type: application/json
X-CSRF-Token: <token>
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "service": "software",
  "message": "I'm interested in your services...",
  "csrfToken": "abc123xyz",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "confirmationId": "uuid-v4",
  "timestamp": "2024-01-15T10:30:05Z"
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**Response (Error - 429)**:
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "retryAfter": 900
}
```

### AI Chatbot API

**Endpoint**: `POST /api/chatbot`

**Request Body**:
```json
{
  "message": "What services do you offer?",
  "sessionId": "session-uuid",
  "context": {
    "currentPage": "/portfolio",
    "referrer": "https://google.com"
  }
}
```

**Response (Success - 200)**:
```json
{
  "response": "I offer software development, graphics design...",
  "sessionId": "session-uuid",
  "quickActions": [
    {
      "label": "View Projects",
      "action": "navigate",
      "url": "/portfolio"
    }
  ],
  "tokens": 150
}
```

### Smart Search API

**Endpoint**: `GET /api/search?q={query}&type={contentType}`

**Query Parameters**:
- `q` (required): Search query (1-500 characters)
- `type` (optional): Filter by content type (projects, blog, music)
- `limit` (optional): Results limit (default: 20)

**Response (Success - 200)**:
```json
{
  "results": [
    {
      "id": "uuid",
      "type": "project",
      "title": "E-commerce Platform",
      "snippet": "Built a scalable e-commerce platform...",
      "url": "/portfolio/ecommerce-platform",
      "relevance": 0.95
    }
  ],
  "total": 15,
  "query": "e-commerce",
  "suggestions": ["ecommerce", "online store", "shopping cart"]
}
```

### Newsletter Subscription API

**Endpoint**: `POST /api/newsletter`

**Request Body**:
```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "consent": true
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Subscription pending confirmation",
  "confirmationSent": true
}
```

## Email Service Implementation

### Multi-Provider Architecture

```typescript
// lib/email/email-service.ts
import { SendGridProvider } from './providers/sendgrid';
import { ResendProvider } from './providers/resend';
import { AWSSESProvider } from './providers/aws-ses';

export class EmailService {
  private providers: EmailProvider[];
  
  constructor() {
    this.providers = this.initializeProviders();
  }
  
  private initializeProviders(): EmailProvider[] {
    const configs = [
      { 
        provider: new SendGridProvider(), 
        priority: 1,
        enabled: !!process.env.SENDGRID_API_KEY 
      },
      { 
        provider: new ResendProvider(), 
        priority: 2,
        enabled: !!process.env.RESEND_API_KEY 
      },
      { 
        provider: new AWSSESProvider(), 
        priority: 3,
        enabled: !!process.env.AWS_SES_ACCESS_KEY 
      },
    ];
    
    return configs
      .filter(c => c.enabled)
      .sort((a, b) => a.priority - b.priority)
      .map(c => c.provider);
  }
  
  async sendEmail(submission: ContactSubmission): Promise<EmailResult> {
    for (const provider of this.providers) {
      try {
        const result = await this.attemptSend(provider, submission);
        if (result.success) {
          await this.logSuccess(provider, submission, result);
          return result;
        }
      } catch (error) {
        await this.logFailure(provider, submission, error);
        continue; // Try next provider
      }
    }
    
    // All providers failed
    await this.storeForManualRetrieval(submission);
    throw new Error('All email providers failed');
  }
  
  private async attemptSend(
    provider: EmailProvider,
    submission: ContactSubmission
  ): Promise<EmailResult> {
    const maxRetries = 3;
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await provider.send({
          to: process.env.CONTACT_EMAIL!,
          from: process.env.FROM_EMAIL!,
          subject: submission.subject,
          html: await this.renderTemplate('contact-notification', submission),
        });
      } catch (error) {
        lastError = error;
        const backoff = Math.pow(2, attempt) * 1000; // Exponential backoff
        await this.delay(backoff);
      }
    }
    
    throw lastError!;
  }
}
```

### Email Provider Interface

```typescript
// lib/email/providers/base.ts
export interface EmailProvider {
  name: string;
  send(message: EmailMessage): Promise<EmailResult>;
  validateConfig(): boolean;
}

export interface EmailMessage {
  to: string | string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Attachment[];
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  provider: string;
  timestamp: Date;
  deliveryTime: number;
  error?: string;
}
```

## AI Chatbot Implementation

### OpenAI Integration

```typescript
// lib/ai/chatbot.ts
import { OpenAI } from 'openai';
import { getPortfolioKnowledge } from './knowledge-base';

export class ChatbotService {
  private openai: OpenAI;
  private systemPrompt: string;
  
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.systemPrompt = this.buildSystemPrompt();
  }
  
  private buildSystemPrompt(): string {
    const knowledge = getPortfolioKnowledge();
    
    return `You are Charles Jasema's AI assistant. You help visitors learn about Charles's work and services.

Portfolio Information:
${JSON.stringify(knowledge, null, 2)}

Guidelines:
- Be friendly, professional, and concise
- Answer questions about Charles's projects, skills, and services
- If you don't know something, offer to connect them via contact form or WhatsApp
- Suggest relevant quick actions (view projects, schedule call, download resume)
- Keep responses under 200 words
`;
  }
  
  async chat(
    message: string,
    sessionId: string,
    history: ChatMessage[]
  ): Promise<ChatbotResponse> {
    const messages = [
      { role: 'system', content: this.systemPrompt },
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });
    
    const aiResponse = response.choices[0].message.content;
    const quickActions = this.extractQuickActions(aiResponse);
    
    return {
      response: aiResponse,
      sessionId,
      quickActions,
      tokens: response.usage?.total_tokens || 0,
    };
  }
}
```

## CSS Architecture & Styling System

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'primary-gold': {
          DEFAULT: '#D4AF37',
          light: '#E4BF47',
          dark: '#B8991F',
        },
        'accent-red': {
          DEFAULT: '#B22222',
          light: '#C23232',
          dark: '#921212',
        },
        'tech-teal': {
          DEFAULT: '#008080',
          light: '#109090',
          dark: '#006060',
        },
        // Neutral Colors
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'light-bg': '#FFFFFF',
        'light-surface': '#F5F5DC',
        // Text Colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#D1D5DB',
        'text-tertiary': '#9CA3AF',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        nav: ['Raleway', 'sans-serif'],
        quote: ['Playfair Display', 'serif'],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### Component Styling Patterns

```typescript
// Component Button Example with Consistent Styling
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  children,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'font-heading font-semibold',
        'rounded-lg transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Variant styles
        {
          'bg-primary-gold text-dark-bg hover:bg-primary-gold-light': variant === 'primary',
          'bg-accent-red text-white hover:bg-accent-red-light': variant === 'secondary',
          'border-2 border-primary-gold text-primary-gold hover:bg-primary-gold/10': variant === 'outline',
          'text-text-secondary hover:text-primary-gold hover:bg-primary-gold/10': variant === 'ghost',
        },
        
        // Size styles
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Global CSS Reset and Base Styles

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Typography */
  html {
    @apply text-base antialiased;
  }
  
  body {
    @apply font-body bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-text-primary;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-bold;
  }
  
  h1 {
    @apply text-4xl sm:text-5xl lg:text-6xl;
  }
  
  h2 {
    @apply text-3xl sm:text-4xl lg:text-5xl;
  }
  
  h3 {
    @apply text-2xl sm:text-3xl lg:text-4xl;
  }
  
  /* Links */
  a {
    @apply transition-colors duration-200;
  }
  
  a:hover {
    @apply text-primary-gold;
  }
  
  /* Focus Visible */
  *:focus-visible {
    @apply outline-none ring-2 ring-primary-gold ring-offset-2 ring-offset-dark-bg;
  }
}

@layer components {
  /* Card Component */
  .card {
    @apply rounded-lg border border-gray-200 dark:border-gray-700;
    @apply bg-white dark:bg-dark-surface;
    @apply shadow-sm hover:shadow-md transition-shadow duration-200;
  }
  
  /* Input Base */
  .input-base {
    @apply w-full px-4 py-2 rounded-lg;
    @apply border border-gray-300 dark:border-gray-600;
    @apply bg-white dark:bg-dark-surface;
    @apply text-gray-900 dark:text-text-primary;
    @apply placeholder:text-gray-500 dark:placeholder:text-gray-400;
    @apply focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20;
    @apply transition-all duration-200;
  }
  
  /* Container */
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

## Performance Optimization Strategy

### Code Splitting Configuration

```typescript
// next.config.js
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};
```

### Image Optimization

```typescript
// Component with optimized images
import Image from 'next/image';

export function ProjectCard({ project }) {
  return (
    <div className="card">
      <Image
        src={project.image}
        alt={project.title}
        width={800}
        height={600}
        className="rounded-t-lg"
        loading="lazy"
        placeholder="blur"
        blurDataURL={project.blurDataURL}
      />
    </div>
  );
}
```

## Security Implementation

### Rate Limiting Middleware

```typescript
// lib/security/rate-limiter.ts
import { LRUCache } from 'lru-cache';

type RateLimitOptions = {
  interval: number;  // Time window in ms
  uniqueTokenPerInterval: number; // Max unique tokens
};

export class RateLimiter {
  private cache: LRUCache<string, number[]>;
  private interval: number;
  
  constructor(options: RateLimitOptions) {
    this.interval = options.interval;
    this.cache = new LRUCache({
      max: options.uniqueTokenPerInterval,
      ttl: options.interval,
    });
  }
  
  check(limit: number, token: string): { success: boolean; remaining: number } {
    const now = Date.now();
    const timestamps = this.cache.get(token) || [];
    
    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(
      t => now - t < this.interval
    );
    
    if (validTimestamps.length >= limit) {
      return { success: false, remaining: 0 };
    }
    
    validTimestamps.push(now);
    this.cache.set(token, validTimestamps);
    
    return {
      success: true,
      remaining: limit - validTimestamps.length,
    };
  }
}

// Usage in API route
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = new RateLimiter({ interval: 60000, uniqueTokenPerInterval: 500 });
  
  const { success, remaining } = limiter.check(5, ip);
  
  if (!success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Date.now() + 60000,
        },
      }
    );
  }
  
  // Process request...
}
```

### Content Security Policy

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // CSP Header
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: blob:;
      font-src 'self' data:;
      connect-src 'self' https://api.openai.com https://*.sanity.io;
      frame-src 'self' https://www.youtube.com;
    `.replace(/\s+/g, ' ').trim()
  );
  
  // Other security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}
```

## Analytics Implementation

### Event Tracking Service

```typescript
// lib/analytics/tracker.ts
export class AnalyticsTracker {
  track(event: CustomEvent) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
    
    // Vercel Analytics
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', event.action, {
        category: event.category,
        label: event.label,
      });
    }
  }
  
  trackPageView(url: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: url,
      });
    }
  }
  
  trackConversion(type: string, value?: number) {
    this.track({
      category: 'conversion',
      action: type,
      value,
    });
  }
}

// Usage in components
import { useAnalytics } from '@/hooks/useAnalytics';

export function ContactForm() {
  const analytics = useAnalytics();
  
  const handleSubmit = async (data) => {
    // Submit form...
    analytics.trackConversion('contact_form', 1);
  };
}
```

## Testing Strategy

### Unit Tests
- Email service provider fallback logic
- Rate limiter functionality
- Input sanitization functions
- Validation schemas

### Integration Tests  
- Contact form submission flow
- AI chatbot conversation flow
- Newsletter subscription flow
- WhatsApp widget interactions

### E2E Tests
- Complete user journeys
- Form validation and error handling
- Mobile responsiveness
- Accessibility compliance

### Performance Tests
- Lighthouse CI for each page
- Core Web Vitals monitoring
- Bundle size limits
- API response times

## Deployment Strategy

### Environment Configuration

```bash
# .env.example
# Email Providers
SENDGRID_API_KEY=
RESEND_API_KEY=
AWS_SES_ACCESS_KEY=
AWS_SES_SECRET_KEY=
CONTACT_EMAIL=contact@charlesjasema.com
FROM_EMAIL=noreply@charlesjasema.com

# AI Services
OPENAI_API_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=
VERCEL_ANALYTICS_ID=

# Newsletter
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=

# CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

### Vercel Deployment Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## Monitoring and Observability

### Error Tracking
- Sentry integration for error monitoring
- Custom error boundaries for graceful degradation
- Structured logging with log levels

### Performance Monitoring
- Vercel Analytics for Core Web Vitals
- Google Analytics for user behavior
- Custom performance marks for critical paths

### Uptime Monitoring
- Health check endpoint (`/api/health`)
- Email delivery success rate tracking
- Third-party uptime monitoring (UptimeRobot, Pingdom)

---

This technical design provides a comprehensive blueprint for implementing all 21 requirements with production-ready architecture, security, performance, and maintainability.

## Components and Interfaces

### Core Components

#### EmailService
**Purpose**: Manages multi-provider email delivery with fallback and retry logic

**Interface**:
```typescript
interface IEmailService {
  sendEmail(submission: ContactSubmission): Promise<EmailResult>;
  sendConfirmation(email: string, name: string): Promise<EmailResult>;
  validateConfig(): boolean;
  getHealthStatus(): EmailServiceHealth;
}
```

**Dependencies**:
- EmailProvider implementations (SendGrid, Resend, AWS SES)
- EmailTemplateEngine for HTML email generation
- EmailLogger for delivery tracking

#### ChatbotService
**Purpose**: Provides AI-powered conversational interface for visitor questions

**Interface**:
```typescript
interface IChatbotService {
  chat(message: string, sessionId: string, history: ChatMessage[]): Promise<ChatbotResponse>;
  initializeSession(context: SessionContext): string;
  endSession(sessionId: string): void;
  getKnowledgeBase(): PortfolioKnowledge;
}
```

**Dependencies**:
- OpenAI API client
- Portfolio knowledge base
- Session storage (Redis or in-memory)

#### WhatsAppWidget
**Purpose**: Enhanced WhatsApp integration with pre-filled messages and availability status

**Interface**:
```typescript
interface IWhatsAppWidget {
  getAvailabilityStatus(timezone: string): AvailabilityStatus;
  generateMessage(template: MessageTemplate, context: PageContext): string;
  trackClick(action: string): void;
  openWhatsApp(message: string, device: DeviceType): void;
}
```

**Dependencies**:
- Analytics tracker
- Device detection utility

#### SmartSearchService
**Purpose**: AI-enhanced search with semantic understanding and natural language queries

**Interface**:
```typescript
interface ISmartSearchService {
  search(query: string, filters?: SearchFilters): Promise<SearchResults>;
  getSuggestions(partial: string): Promise<string[]>;
  indexContent(content: ContentItem): Promise<void>;
}
```

**Dependencies**:
- Sanity CMS client
- Search index (Algolia or custom)
- Content similarity algorithm

#### AnalyticsTracker
**Purpose**: Comprehensive event and conversion tracking

**Interface**:
```typescript
interface IAnalyticsTracker {
  trackPageView(url: string): void;
  trackEvent(event: CustomEvent): void;
  trackConversion(type: ConversionType, value?: number): void;
  trackUserJourney(journey: PageView[]): void;
}
```

**Dependencies**:
- Google Analytics 4 (gtag.js)
- Vercel Analytics
- Session storage

### UI Components

#### Button
- Variants: primary, secondary, outline, ghost
- Sizes: sm, md, lg
- States: default, hover, focus, active, disabled

#### Input
- Types: text, email, tel, textarea, select
- States: default, focus, error, disabled
- Validation: real-time with error messages

#### Card
- Variants: default, elevated, bordered
- Padding: sm, md, lg
- Interactive: hover effects, clickable

#### Modal
- Sizes: sm, md, lg, full
- Features: backdrop, close button, keyboard navigation
- Accessibility: focus trap, ARIA labels

## Correctness Properties

### Email Delivery Guarantees

**Property 1: At-Most-Once Delivery**
- Each contact submission SHALL result in at most one successful email delivery
- Duplicate prevention through submission ID tracking
- Idempotency keys for provider API calls

**Property 2: Provider Fallback**
- IF primary provider fails, THEN secondary provider SHALL be attempted within 5 seconds
- IF all providers fail, THEN submission SHALL be stored for manual retrieval
- Fallback chain SHALL complete within 90 seconds total

**Property 3: Retry Invariant**
- Exponential backoff: retry_n = 2^n seconds (1s, 2s, 4s)
- Maximum 3 retries per provider
- Total maximum attempts across all providers: 9 (3 providers × 3 retries)

### Data Consistency

**Property 4: Session Consistency**
- Chat sessions SHALL maintain message history until 30-minute timeout
- Session expiry SHALL trigger automatic cleanup
- Concurrent requests for same session SHALL be serialized

**Property 5: Analytics Data Integrity**
- Page view timestamps SHALL be monotonically increasing within a session
- Conversion events SHALL reference valid session IDs
- Journey tracking SHALL preserve page sequence order

### Security Properties

**Property 6: Rate Limit Enforcement**
- API requests exceeding 100/minute per IP SHALL return HTTP 429
- Rate limit SHALL reset exactly 60 seconds after first request in window
- Distributed rate limiting SHALL use shared cache (Redis)

**Property 7: CSRF Protection**
- All form submissions SHALL include valid CSRF token
- Tokens SHALL expire after 24 hours
- Token validation SHALL occur before any data processing

**Property 8: Input Sanitization**
- All user inputs SHALL be HTML-encoded before storage or display
- SQL injection protection through parameterized queries
- XSS prevention through Content Security Policy headers

### Performance Properties

**Property 9: Response Time Bounds**
- 95th percentile API response time ≤ 500ms
- Email delivery acknowledgment ≤ 30 seconds
- Chatbot response ≤ 3 seconds
- Search results ≤ 500ms

**Property 10: Resource Limits**
- Email attachments ≤ 10MB
- Chat message length ≤ 2000 characters
- Search query length ≤ 500 characters
- Session history ≤ 50 messages

## Error Handling

### Email Service Errors

**Error Type**: Provider API Failure
- **Detection**: API returns non-200 status or network timeout
- **Recovery**: Automatic fallback to next provider in priority list
- **Logging**: Log provider name, error code, error message, timestamp
- **User Impact**: Transparent - user sees success if any provider succeeds

**Error Type**: All Providers Failed
- **Detection**: All 3 providers exhaust retry attempts
- **Recovery**: Store submission in database with 'failed' status
- **Logging**: Log full submission details, all provider errors
- **User Impact**: Display error message with alternative contact methods (WhatsApp, email)

**Error Type**: Invalid Email Configuration
- **Detection**: Missing environment variables at application startup
- **Recovery**: Application starts in degraded mode, logs submissions to file
- **Logging**: Log specific missing configuration keys
- **User Impact**: Users see message that contact form is temporarily unavailable

### AI Chatbot Errors

**Error Type**: OpenAI API Rate Limit
- **Detection**: HTTP 429 response from OpenAI
- **Recovery**: Queue message for retry with exponential backoff
- **Logging**: Log session ID, message, retry attempt
- **User Impact**: Display "High demand, please wait..." message

**Error Type**: Context Length Exceeded
- **Detection**: Token count exceeds model limit
- **Recovery**: Truncate conversation history to last 10 messages
- **Logging**: Log session ID, original token count, truncated count
- **User Impact**: Transparent - conversation continues with reduced history

**Error Type**: Inappropriate Content Detected
- **Detection**: OpenAI moderation API flags content
- **Recovery**: Reject message, do not send to model
- **Logging**: Log session ID, flagged content categories
- **User Impact**: Display "Message violates content policy" error

### Search Service Errors

**Error Type**: Search Index Unavailable
- **Detection**: Connection timeout or service error
- **Recovery**: Fall back to Sanity CMS direct query (slower)
- **Logging**: Log error details, fallback usage
- **User Impact**: Slightly slower search, but still functional

**Error Type**: Malformed Query
- **Detection**: Query parsing fails or contains invalid characters
- **Recovery**: Sanitize query, retry with cleaned version
- **Logging**: Log original query, sanitized query
- **User Impact**: Results may differ from expected but no error shown

### Analytics Tracking Errors

**Error Type**: GA4 Tracking Failure
- **Detection**: gtag.js not loaded or network error
- **Recovery**: Queue events in local storage, retry on next page
- **Logging**: Log failed events for manual analysis
- **User Impact**: None - tracking is non-blocking

**Error Type**: Session Storage Full
- **Detection**: QuotaExceededError when writing to session storage
- **Recovery**: Clear oldest session data, retry write
- **Logging**: Log storage size, cleared data size
- **User Impact**: Some behavioral data may be lost

### Network Errors

**Error Type**: Client Offline
- **Detection**: navigator.onLine === false or fetch network error
- **Recovery**: Queue actions in service worker, display offline indicator
- **Logging**: Log queued action type and timestamp
- **User Impact**: Display "You're offline" message, retry when back online

**Error Type**: Request Timeout
- **Detection**: Request exceeds 30-second timeout
- **Recovery**: Retry once, then fail gracefully
- **Logging**: Log endpoint, timeout duration
- **User Impact**: Display timeout error with retry button

### Database/CMS Errors

**Error Type**: Sanity CMS Unavailable
- **Detection**: API returns 503 or connection fails
- **Recovery**: Use stale cached data if available
- **Logging**: Log outage start time, affected queries
- **User Impact**: Display cached content with staleness indicator

**Error Type**: Data Validation Failure
- **Detection**: CMS returns data that doesn't match schema
- **Recovery**: Use default/fallback values for invalid fields
- **Logging**: Log validation errors, affected document IDs
- **User Impact**: Some content may show placeholders

---

**Design Document Complete**: This comprehensive technical design covers all 21 requirements with detailed architecture, data models, APIs, implementation patterns, correctness properties, and error handling strategies.
