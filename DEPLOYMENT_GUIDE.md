# Production Deployment Guide

## Overview
This guide covers deploying your Charles Jasema Portfolio to production with optimal performance, security, and reliability.

## Pre-Deployment Checklist

### 1. Environment Variables Setup
Create production environment variables:

```bash
# Required for Production
NEXT_PUBLIC_SANITY_PROJECT_ID=6omuzt9o
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-production-token
SANITY_REVALIDATION_SECRET=your-webhook-secret

# Analytics (Get from Google Analytics)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Live Chat (Get from Tawk.to)
NEXT_PUBLIC_TAWK_TO_PROPERTY_ID=your-property-id
NEXT_PUBLIC_TAWK_TO_WIDGET_ID=your-widget-id

# Production Site Configuration
NEXT_PUBLIC_SITE_URL=https://charlesjasema.com
NODE_ENV=production
```

### 2. Build Verification
```bash
# Test production build locally
npm run build
npm run start

# Verify all pages load correctly
# Check console for errors
# Test all functionality
```

## Deployment Platforms

### Option 1: Vercel (Recommended)
Vercel is optimized for Next.js applications.

#### Setup Steps:
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Navigate to Settings → Environment Variables
   - Add all production environment variables

#### Vercel Configuration (vercel.json)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Option 2: Netlify
Alternative deployment platform with excellent performance.

#### Setup Steps:
1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and Deploy**
   ```bash
   netlify login
   netlify deploy --prod --dir=.next
   ```

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18.x

#### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200
```

### Option 3: Custom Server (VPS/Cloud)
For full control over the deployment environment.

#### Requirements:
- Node.js 18+
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate

#### Setup Steps:
1. **Server Setup**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   npm install -g pm2

   # Install Nginx
   sudo apt update
   sudo apt install nginx
   ```

2. **Application Deployment**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/charles-jasema-portfolio.git
   cd charles-jasema-portfolio

   # Install dependencies
   npm install

   # Build application
   npm run build

   # Start with PM2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name charlesjasema.com www.charlesjasema.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name charlesjasema.com www.charlesjasema.com;

       ssl_certificate /path/to/certificate.crt;
       ssl_certificate_key /path/to/private.key;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Domain Configuration

### 1. DNS Setup
Configure your domain to point to your hosting provider:

```
# For Vercel
CNAME: www.charlesjasema.com → cname.vercel-dns.com
A: charlesjasema.com → 76.76.19.61

# For Netlify
CNAME: www.charlesjasema.com → your-site.netlify.app
A: charlesjasema.com → 75.2.60.5
```

### 2. SSL Certificate
- Vercel/Netlify: Automatic SSL
- Custom server: Use Let's Encrypt or commercial certificate

## Performance Optimization

### 1. CDN Configuration
- Enable CDN for static assets
- Configure proper cache headers
- Optimize image delivery

### 2. Monitoring Setup
```bash
# Install monitoring tools
npm install @sentry/nextjs

# Configure error tracking
# Set up uptime monitoring
# Enable performance monitoring
```

### 3. Analytics Setup
1. **Google Analytics 4**
   - Create GA4 property
   - Get measurement ID
   - Add to environment variables

2. **Google Search Console**
   - Verify domain ownership
   - Submit sitemap
   - Monitor search performance

## Security Configuration

### 1. Environment Security
- Never commit secrets to Git
- Use secure environment variable storage
- Rotate API keys regularly

### 2. Content Security Policy
Already configured in `next.config.js`:
```javascript
{
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.tawk.to;
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    img-src 'self' blob: data: *.sanity.io *.googletagmanager.com;
    font-src 'self' fonts.gstatic.com;
    connect-src 'self' *.sanity.io *.google-analytics.com *.analytics.google.com *.googletagmanager.com wss://*.tawk.to;
    media-src 'self' *.sanity.io;
  `
}
```

### 3. Rate Limiting
Configured for API routes to prevent abuse.

## Post-Deployment Tasks

### 1. Verification Checklist
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Images display properly
- [ ] Analytics tracking works
- [ ] Admin panel accessible
- [ ] Mobile responsiveness verified
- [ ] SSL certificate valid
- [ ] Performance scores > 90

### 2. SEO Setup
```bash
# Submit sitemap to Google
https://charlesjasema.com/sitemap.xml

# Verify in Google Search Console
# Set up Google My Business
# Configure social media links
```

### 3. Monitoring Setup
- Set up uptime monitoring
- Configure error alerts
- Monitor performance metrics
- Track user analytics

## Maintenance

### 1. Regular Updates
```bash
# Update dependencies monthly
npm update

# Security updates immediately
npm audit fix

# Rebuild and redeploy
npm run build
```

### 2. Content Backup
- Regular Sanity content exports
- Database backups
- Media file backups

### 3. Performance Monitoring
- Monthly Lighthouse audits
- Core Web Vitals tracking
- User experience monitoring

## Troubleshooting

### Common Issues
1. **Build Failures**: Check environment variables
2. **404 Errors**: Verify routing configuration
3. **Slow Loading**: Optimize images and code splitting
4. **SSL Issues**: Check certificate configuration

### Support Resources
- Next.js Documentation
- Vercel/Netlify Support
- Sanity Documentation
- Community Forums

## Rollback Plan

### Emergency Rollback
```bash
# Vercel
vercel --prod --force

# Netlify
netlify deploy --prod --dir=.next

# Custom Server
pm2 restart portfolio
```

### Version Control
- Tag releases in Git
- Keep previous builds available
- Document deployment changes

## Cost Optimization

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month
- **Netlify**: 100GB bandwidth/month
- **Sanity**: 10GB assets, 100k API requests

### Scaling Considerations
- Monitor usage metrics
- Upgrade plans as needed
- Optimize for cost efficiency