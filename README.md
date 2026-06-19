# 🚀 Charles Jasema Portfolio

> **Premium Digital Portfolio** - Software Engineer | Graphics Designer | Gospel Artist

[![Deployment Status](https://img.shields.io/badge/Deployment-Ready-brightgreen)](https://charlesjasema.com)
[![Security Rating](https://img.shields.io/badge/Security-A+-brightgreen)](./SECURITY_PERFORMANCE_AUDIT_REPORT.md)
[![Performance](https://img.shields.io/badge/Bundle_Size-87.7kB-brightgreen)](./SECURITY_PERFORMANCE_AUDIT_REPORT.md)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

**Live Website:** [charlesjasema.com](https://charlesjasema.com)

---

## 📋 Overview

Professional portfolio showcasing Charles Jasema's expertise across multiple disciplines:
- **Software Engineering** - Full-stack development with modern technologies
- **Graphics Design** - Visual identity and digital design solutions
- **Gospel Music Ministry** - Worship leadership and music production
- **Videography** - Creative video content and editing

## 🏗️ Architecture

### Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript for type safety
- **Styling:** Tailwind CSS with custom design system
- **CMS:** Sanity.io for content management
- **Database:** Sanity Studio for content editing
- **Deployment:** Vercel (recommended) or Netlify
- **Analytics:** Google Analytics 4
- **Email:** SendGrid integration
- **Live Chat:** Tawk.to integration

### Key Features
- 🔒 **A+ Security** - Comprehensive OWASP protection
- ⚡ **Optimized Performance** - 87.7kB bundle size
- 📱 **Mobile-First Design** - Responsive across all devices
- 🎨 **Dark/Light Mode** - User preference support
- 🔍 **SEO Optimized** - Rich metadata and structured data
- ♿ **Accessibility Compliant** - WCAG guidelines
- 🌐 **Multi-Language Ready** - Internationalization support
- 📊 **Analytics Ready** - Comprehensive tracking
- 💬 **Live Chat** - Real-time customer support
- 📧 **Contact Forms** - Secure email integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/username/charles-jasema-portfolio.git
cd charles-jasema-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run format       # Format code with Prettier
```

## 📁 Project Structure

```
charles-jasema-portfolio/
├── public/                    # Static assets
│   ├── images/               # Optimized images
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (pages)/          # Route groups
│   │   ├── api/              # API routes
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable components
│   │   ├── ui/               # UI components
│   │   └── providers/        # Context providers
│   ├── config/               # Configuration files
│   ├── lib/                  # Utility functions
│   ├── hooks/                # Custom React hooks
│   └── styles/               # Styling files
├── sanity/                   # Sanity CMS configuration
├── .env.example              # Environment variables template
├── .env.production.template  # Production env template
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## ⚙️ Configuration

### Environment Variables
Copy `.env.production.template` and configure:

**Essential Variables:**
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://charlesjasema.com
NODE_ENV=production

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
SANITY_API_TOKEN=your-api-token

# Email Service
SENDGRID_API_KEY=your-sendgrid-key

# Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Live Chat
NEXT_PUBLIC_TAWK_TO_PROPERTY_ID=your-tawk-id
```

### Sanity CMS Setup
1. **Create Sanity Project:** Visit [sanity.io](https://sanity.io)
2. **Configure Schema:** Pre-configured schemas included
3. **Add Content:** Use Sanity Studio at `/admin`
4. **Set API Token:** Required for content fetching

## 🔒 Security Features

### Implemented Protections
- **Content Security Policy (CSP)** - Prevents XSS attacks
- **Input Validation** - Comprehensive sanitization
- **Rate Limiting** - API endpoint protection
- **CSRF Protection** - Cross-site request forgery prevention
- **Secure Headers** - OWASP recommended headers
- **Environment Security** - Proper secret management

### Security Audit Report
See [SECURITY_PERFORMANCE_AUDIT_REPORT.md](./SECURITY_PERFORMANCE_AUDIT_REPORT.md) for detailed security analysis.

## 📊 Performance

### Optimization Features
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Modern formats (AVIF, WebP)
- **Bundle Optimization** - Tree shaking and compression
- **Caching Strategy** - Multi-layer caching implementation
- **Static Generation** - Pre-rendered pages where possible
- **CDN Ready** - Optimized for global delivery

### Performance Metrics
- **Bundle Size:** 87.7kB shared JS (Excellent)
- **First Load JS:** Under 100kB for most pages
- **Build Time:** ~45 seconds for 22 routes
- **Lighthouse Score:** 90+ across all metrics

## 🚀 Deployment

### Quick Deploy Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI  
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Custom Domain Setup
1. Configure DNS records
2. Add domain in deployment platform
3. SSL certificates are automatic

**Detailed Instructions:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📝 Content Management

### Sanity Studio Access
- **Local:** [localhost:3001/admin](http://localhost:3001/admin)
- **Production:** [charlesjasema.com/admin](https://charlesjasema.com/admin)

### Content Types
- **Personal Info** - Bio, contact details, skills
- **Projects** - Portfolio showcase items
- **Blog Posts** - Articles and insights  
- **Music** - Songs, albums, videos
- **Work Experience** - Career timeline
- **Education** - Academic background

### Content Editing
1. Access Sanity Studio
2. Edit content in intuitive interface
3. Publish changes
4. Automatic revalidation triggers

## 🔧 Customization

### Branding
- **Colors:** Edit `tailwind.config.ts`
- **Typography:** Update font imports in `globals.css`
- **Logo:** Replace files in `public/images/`
- **Content:** Update `src/config/site.ts`

### Adding Features
- **New Pages:** Add to `src/app/`
- **Components:** Create in `src/components/`
- **API Routes:** Add to `src/app/api/`
- **Styling:** Extend Tailwind configuration

### Configuration Files
- **Site Config:** `src/config/site.ts`
- **Images:** `src/config/images.ts`
- **Portfolio:** `src/config/portfolio.ts`
- **Music:** `src/config/music.ts`

## 📧 Contact Integration

### Email Services
- **Primary:** SendGrid (professional email delivery)
- **Backup:** Resend (alternative provider)
- **Fallback:** AWS SES (enterprise option)

### Form Features
- **Security:** CSRF protection, rate limiting
- **Validation:** Comprehensive input sanitization
- **Spam Protection:** Multiple validation layers
- **Delivery:** Automatic email confirmation

## 🎵 Music Integration

### Jasema Worship Team
Integration for gospel music ministry featuring:
- **Song Catalog** - Complete discography
- **Video Gallery** - Music videos and performances
- **Booking System** - Event scheduling
- **Streaming Links** - Multi-platform availability

## 🤝 Contributing

### Development Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for clear history

## 📄 License

This project is proprietary software owned by Charles Jasema. All rights reserved.

**Copyright © 2026 Charles Jasema. All rights reserved.**

## 📞 Support & Contact

### Technical Support
- **Email:** [brocharles001@gmail.com](mailto:brocharles001@gmail.com)
- **Phone:** +256785446877
- **LinkedIn:** [Charles Jada Sebit Emmanuel](https://www.linkedin.com/in/charles-jada-sebit-emmanuel-0a7b24210)

### Professional Services
- **Web Development** - Custom applications and websites
- **Graphics Design** - Branding and visual identity
- **Music Ministry** - Worship leading and music production
- **IT Consulting** - Technical strategy and implementation

---

## 🎯 About Charles Jasema

**Full Name:** Charles Jada Sebit Emmanuel  
**Professional Title:** Software Engineer | Graphics Designer | Gospel Artist  
**Location:** Kampala, Uganda  
**Nationality:** South Sudanese  

### Professional Expertise
- **4+ Years** IT Support & Digital Training
- **Full-Stack Development** with modern technologies
- **UI/UX Design** with focus on user experience
- **Graphics Design** for branding and marketing
- **Music Ministry** with worship leadership
- **Video Production** and content creation

### Mission Statement
*"To use technology and creativity as tools for positive impact, building solutions that serve people and glorify God while maintaining the highest standards of excellence and integrity."*

---

**🌟 Built with excellence by Charles Jasema | Powered by Next.js & Sanity**