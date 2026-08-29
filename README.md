# Charles Jasema Portfolio

A professional portfolio website for Charles Jada Sebit Emmanuel - Software Engineer, Graphics Designer, IT Support Specialist, and Contemporary Gospel Artist.

## 🚀 Live Demo

- **Development:** http://localhost:3003
- **Production:** [https://charlesjasema.com](https://charlesjasema.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)
- [Analytics & Monitoring](#analytics--monitoring)
- [Performance](#performance)
- [Contributing](#contributing)

## ✨ Features

### 🎨 **Professional Design**
- **Dual Brand Identity:** Professional (Gold/Maroon) and Music Ministry themes
- **Responsive Design:** Perfect experience on mobile, tablet, and desktop
- **Dark/Light Mode:** Seamless theme switching with user preference persistence
- **Accessibility:** WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation

### 🖼️ **Interactive Gallery**
- **Performance Gallery:** Auto-playing carousel with 5 ministry performance images
- **Project Showcases:** Interactive carousels for project portfolios (Karibu Groceries, CAM Connect)
- **Smooth Transitions:** 4-second auto-play with manual navigation controls
- **Touch-Friendly:** Optimized for mobile swipe gestures

### 📱 **Social Media Integration**
- **12+ Social Platforms:** LinkedIn, GitHub, YouTube, Instagram, TikTok, Facebook, Mdundo
- **Professional Links:** Career-focused platforms (LinkedIn, GitHub, Credly)
- **Music Ministry:** Dedicated music platform links (YouTube Music, Instagram Music, TikTok)
- **Direct Contact:** WhatsApp, Email with proper mailto/tel protocols

### 🎯 **Content Management**
- **CV-Accurate Data:** All project and experience data matches official CV
- **Environment-Driven:** No hardcoded URLs, fully configurable via environment variables
- **SEO Optimized:** Structured data, meta tags, and social media cards

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 14.2.4 (App Router)
- **Language:** JavaScript (ES6+) - TypeScript completely eliminated
- **Styling:** Tailwind CSS with custom design system
- **Icons:** React Icons (Font Awesome)
- **Components:** Custom UI component library

### **Performance & Security**
- **Image Optimization:** WebP/AVIF support with lazy loading
- **Security Headers:** CSP, frame options, HSTS
- **Bundle Optimization:** Tree shaking, code splitting
- **Caching:** Static generation with ISR

### **Development Tools**
- **Linting:** ESLint with Next.js configuration
- **Formatting:** Prettier with custom rules
- **Testing:** Jest configuration ready
- **Git Hooks:** Pre-commit quality checks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/CharlesJasema/charles-jasema-portfolio.git
cd charles-jasema-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Development Scripts

```bash
# Development
npm run dev          # Start dev server
npm run dev:debug    # Start with debugging enabled

# Production
npm run build        # Build for production
npm run start        # Start production server
npm run export       # Export static files

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript checking (if needed)

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run with coverage report
```

## 🔧 Environment Setup

### Required Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://charlesjasema.com
NEXT_PUBLIC_SITE_NAME=Charles Jasema Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=Professional software engineer, graphics designer, and contemporary gospel artist

# Social Media - Professional
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/charles-jada-sebit-emmanuel/
NEXT_PUBLIC_GITHUB_URL=https://github.com/charlesjasema
NEXT_PUBLIC_TWITTER_URL=https://x.com/Charlesjasema
NEXT_PUBLIC_YOUTUBE_CODE_URL=https://www.youtube.com/@CharlesJasema_Code_Design

# Social Media - Music Ministry
NEXT_PUBLIC_INSTAGRAM_MUSIC_URL=https://www.instagram.com/charlesjasemamusic
NEXT_PUBLIC_TIKTOK_MUSIC_URL=https://www.tiktok.com/@charlesjasemamusic
NEXT_PUBLIC_YOUTUBE_MUSIC_URL=https://www.youtube.com/@CharlesJasemaMusic
NEXT_PUBLIC_FACEBOOK_MUSIC_URL=https://www.facebook.com/share/1Aoqf2FLQ9/
NEXT_PUBLIC_MDUNDO_URL=https://mdundo.com/song/1377029

# Contact Information
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/256785446877
NEXT_PUBLIC_EMAIL=brocharles001@gmail.com
NEXT_PUBLIC_CREDLY_URL=https://www.credly.com/users/charles-jada-sebit-emmanuel

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Server-side only (no NEXT_PUBLIC prefix)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

### Environment Validation

The application includes built-in environment validation:

```javascript
import { validateEnvironment } from '@/lib/config';

// Validates required environment variables
const isValid = validateEnvironment();
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# Deploy to production
vercel --prod
```

**Vercel Environment Variables:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all variables from `.env.local.example`
3. Set `NEXT_PUBLIC_SITE_URL` to your domain
4. Deploy with `vercel --prod`

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
# Set in Netlify dashboard under Site settings → Environment variables
```

### Railway

```bash
# Connect GitHub repository
# Set environment variables in Railway dashboard
# Auto-deploy on git push
```

### Docker (Optional)

```dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

## 📊 Analytics & Monitoring

### Google Analytics 4

```javascript
// Set in environment variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

// Automatic page view tracking
// Event tracking for social media clicks
// Performance monitoring
```

### Vercel Analytics (Built-in)

```javascript
// Automatic performance monitoring
// Real user metrics
// Core Web Vitals tracking
```

### Error Monitoring (Sentry - Optional)

```javascript
// Add to environment variables
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_PROJECT=charles-jasema-portfolio
```

### Performance Monitoring

The application includes:
- **Core Web Vitals** monitoring
- **Image loading** performance tracking
- **Social media click** analytics
- **Carousel interaction** metrics

## ⚡ Performance

### Lighthouse Scores (Target)
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Optimization Features
- **Image Optimization:** WebP/AVIF with lazy loading
- **Code Splitting:** Dynamic imports for optimal bundle size
- **Static Generation:** ISR for fast page loads
- **Caching:** Aggressive caching strategies
- **Compression:** Gzip/Brotli compression

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Check bundle composition
npx @next/bundle-analyzer .next
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--gold: #D4AF37;           /* Primary gold */
--maroon: #800000;         /* Accent red/maroon */
--navy: #0B132B;           /* Dark navy */
--white: #FFFFFF;          /* Pure white */

/* Extended Palette */
--gold-light: #E4BF47;
--gold-dark: #B8991F;
--gray-50: #F9FAFB;
--gray-900: #111827;
```

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Fallback:** system-ui, -apple-system, sans-serif
- **Headings:** Bold weights (600-700)
- **Body:** Regular weight (400)

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: 640px    /* Small tablets */
md: 768px    /* Large tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Large laptops */
2xl: 1536px  /* Desktops */
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Code Standards

- **ESLint:** Follow Next.js configuration
- **Prettier:** Automatic code formatting
- **Commit Messages:** Conventional commits format
- **Testing:** Jest for unit/integration tests

### Pull Request Guidelines

- Include screenshots for UI changes
- Update documentation for new features
- Ensure all tests pass
- Maintain 90%+ test coverage

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Charles Jada Sebit Emmanuel**
- **Portfolio:** [https://charlesjasema.com](https://charlesjasema.com)
- **LinkedIn:** [charles-jada-sebit-emmanuel](https://www.linkedin.com/in/charles-jada-sebit-emmanuel/)
- **GitHub:** [@charlesjasema](https://github.com/charlesjasema)
- **Email:** brocharles001@gmail.com

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **React Icons** for comprehensive icon library

## 📈 Project Stats

- **Lines of Code:** ~15,000+
- **Components:** 25+ reusable components
- **Pages:** 6 main pages (Home, Portfolio, Music, About, Contact, Blog)
- **Images:** 25+ optimized images
- **Social Links:** 12+ integrated platforms
- **Performance Score:** 95+ Lighthouse

---

**Built with ❤️ by Charles Jasema**