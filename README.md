# Charles Jasema Portfolio

A modern, responsive portfolio website showcasing my work as a Software Engineer, Gospel Music Artist, and Graphics Designer.

## Features

### Music Ministry
- **13 Original Songs** - All available on Mdundo
- **Music Videos** - Full production and lyrical videos on YouTube
- **Lyrics Section** - Read, search, and download song lyrics (10 songs with complete lyrics)
- **NEW Content Badges** - Easily identify latest releases with animated badges
- **Streaming Links** - Direct links to YouTube, Mdundo, Spotify, and Apple Music
- **SEO Optimized** - Structured data for Google rich snippets and better discoverability
- **Download Lyrics** - One-click download of any song lyrics as .txt file

### Professional Portfolio
- **About Me** - Education, work experience, and journey
- **Portfolio** - Showcase of software and design projects
- **Blog** - Articles and insights
- **Contact** - Get in touch
- **Booking** - Book for events and performances

### Analytics & Monetization
- **Google Analytics 4** - Track visitors, downloads, and user behavior
- **Donation System** - Accept donations via Mobile Money (MTN, Airtel) and PayPal
- **Download Tracking** - Monitor lyrics and music downloads
- **Search Tracking** - Understand what fans are looking for
- **Event Tracking** - Track bookings, contact forms, and donations

### Design Features
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- **Fast Loading** - Optimized for performance
- **Accessibility** - WCAG compliant design

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Deployment**: Vercel (recommended)

## Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/CharlesJasema/Charles-Jasema-Portfolio.git
   cd Charles-Jasema-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3001
   ```

## Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Content Management

### Deployment
See **DEPLOYMENT_GUIDE.md** for:
- Quick deployment to Vercel
- Post-deployment setup
- Google Analytics setup (optional)
- PayPal setup (optional)

### SEO & Discoverability
See **SEO_GUIDE.md** for:
- Google Search Console setup
- Structured data implementation
- Meta tags and keywords

### Adding Music & Lyrics
See **ADD_YOUR_SONGS.md** and **ADD_YOUR_LYRICS.md** for:
- Adding new songs and lyrics
- Formatting content
- Managing media files

### Admin Dashboard
See **ADMIN_SYSTEM_GUIDE.md** for:
- Accessing the admin dashboard at `/admin`
- Managing content
- Viewing analytics

## Project Structure

```
charles-jasema-portfolio/
├── src/
│   ├── app/              # Next.js app directory (pages)
│   │   ├── about/        # About page
│   │   ├── admin/        # Admin dashboard
│   │   ├── blog/         # Blog page
│   │   ├── booking/      # Booking page
│   │   ├── contact/      # Contact page
│   │   ├── lyrics/       # Lyrics page
│   │   ├── music/        # Music page
│   │   ├── portfolio/    # Portfolio page
│   │   ├── support/      # Donation/Support page
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   │   ├── ui/           # UI components (Button, Card, etc.)
│   │   ├── DonationSection.tsx  # Donation component
│   │   ├── GoogleAnalytics.tsx  # Analytics component
│   │   ├── footer.tsx    # Footer component
│   │   ├── navigation.tsx # Navigation component
│   │   └── ...
│   ├── config/           # Configuration files
│   │   ├── about.ts      # About page content
│   │   ├── blog.ts       # Blog content
│   │   ├── booking.ts    # Booking content
│   │   ├── contact.ts    # Contact content
│   │   ├── home.ts       # Homepage content
│   │   ├── images.ts     # Image paths
│   │   ├── lyrics.ts     # Song lyrics
│   │   ├── music.ts      # Music content
│   │   ├── portfolio.ts  # Portfolio content
│   │   └── site.ts       # Site-wide settings
│   ├── lib/              # Utility libraries
│   │   └── analytics.ts  # Analytics functions
│   └── styles/           # Global styles
├── public/               # Static assets
│   ├── images/           # Images
│   └── media/            # Audio/video files
├── .env.local.example    # Environment variables template
├── ADMIN_GUIDE.md        # Admin documentation
├── ADMIN_SYSTEM_GUIDE.md # Admin dashboard guide
├── ADD_YOUR_LYRICS.md    # Lyrics guide
├── ADD_YOUR_SONGS.md     # Music guide
├── IMAGE_USAGE_GUIDE.md  # Image guide
├── MUSIC_MEDIA_GUIDE.md  # Media guide
├── SEO_GUIDE.md          # SEO & Google optimization guide
├── SETUP_ANALYTICS_DONATIONS.md  # Analytics & donations setup
├── ADMIN_CMS_ANALYTICS_MONETIZATION_PLAN.md  # Full implementation plan
├── PHASE_1_COMPLETE.md   # Phase 1 completion summary
├── MUSIC_SEO_ENHANCEMENT_SUMMARY.md  # Latest enhancements summary
└── README.md             # This file
```

## Music Links

- **YouTube**: [@CharlesJasemaMusic](https://www.youtube.com/@CharlesJasemaMusic)
- **Mdundo**: [Charles Jasema on Mdundo](https://mdundo.com/a/148492)

## Live Site

Visit the live site: [Coming Soon]

## Contact

- **Email**: brocharles001@gmail.com
- **Phone**: +256-785-446877
- **Location**: Koboko, Uganda

## 🤝 Contributing

This is a personal portfolio project. However, if you find any bugs or have suggestions, feel free to open an issue.

## 📄 License

© 2026 Charles Jasema. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Hosted on [Vercel](https://vercel.com/)

## Recent Updates (April 25, 2026)

### ✅ Production Ready - Zero Errors
- **Payment Details Updated**: Real Mobile Money and bank account details configured
- **Build Status**: Production build successful with zero errors
- **Deployment Ready**: Fully tested and ready for Vercel deployment
- **Documentation**: Consolidated into essential guides only

### ✅ Phase 1: Analytics & Donations (COMPLETED)
- **Google Analytics 4**: Integration ready (awaiting Measurement ID)
- **Donation System**: Manual Mobile Money (MTN, Airtel) and bank transfer details
- **Support Page**: Dedicated `/support` page for donations
- **Admin Dashboard**: Basic admin interface at `/admin`

### ✅ Music & SEO Enhancements
- **10 Complete Song Lyrics**: Including Jesus You Are Lord, Nyadru - Love, Where Will You Be
- **SEO Optimization**: Structured data (JSON-LD) for Google rich snippets
- **NEW Badges**: Animated badges to highlight latest releases
- **Download Feature**: One-click lyrics download as .txt files

### 🎯 Next Steps
1. **Deploy to Vercel**: Follow DEPLOYMENT_GUIDE.md (5 minutes)
2. **Add Google Analytics**: When ready (optional)
3. **Add PayPal**: When ready (optional)

See **DEPLOYMENT_GUIDE.md** for complete deployment instructions.

---

**Version**: 6.0.0  
**Last Updated**: April 25, 2026  
**Status**: ✅ Production Ready - Zero Errors

For deployment instructions, see **DEPLOYMENT_GUIDE.md**.
