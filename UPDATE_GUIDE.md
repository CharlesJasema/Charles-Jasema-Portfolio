# 📝 Complete Information Update Guide

## 🎯 **Quick Update Checklist**

### **1. Personal Information** 
**File:** `src/config/site.ts`

```typescript
export const siteConfig = {
  // ✏️ UPDATE THESE:
  name: 'Your Full Name',                    // Shows in navigation, headers
  fullName: 'Your Complete Full Name',      // Used in about page
  musicName: 'Your Music Brand Name',       // Music-related pages
  title: 'Your Professional Title',         // Subtitle everywhere
  description: 'Your bio description',      // Meta descriptions, SEO
  
  // Personal Details
  personal: {
    gender: 'Your Gender',
    dateOfBirth: 'Your Birth Date',
    nationality: 'Your Nationality', 
    hometown: 'Your Hometown',
    currentLocation: 'Where You Live Now',
  },
  
  // ✏️ UPDATE CONTACT INFO:
  contact: {
    email: 'your-email@domain.com',
    phone: '+your-phone-number',
    alternatePhone: '+alternate-number',
    whatsapp: 'whatsapp-number',
    location: 'Your City, Country',
  },

  // ✏️ UPDATE SOCIAL MEDIA LINKS:
  professional: {
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourusername',
    youtube: 'https://youtube.com/@yourchannel',
    github: 'https://github.com/yourusername',
  },

  music: {
    instagram: 'https://instagram.com/yourmusicpage',
    twitter: 'https://twitter.com/yourmusichandle',
    tiktok: 'https://tiktok.com/@yourmusichandle',
    youtube: 'https://youtube.com/@yourmusicchannel',
    facebook: 'https://facebook.com/yourmusicpage',
    mdundo: 'https://mdundo.com/your-profile',
  },
}
```

### **2. Images Configuration**
**File:** `src/config/images.ts`

Replace image paths with your own images:

```typescript
export const imagesConfig = {
  logos: {
    musicLogo: '/images/your-music-logo.jpg',
    codeDesignLogo: '/images/your-brand-logo.jpg',
    codeDesignBanner: '/images/your-banner.jpg',
  },
  profile: {
    professional: '/images/your-professional-photo.jpg',
    ministry: '/images/your-ministry-photo.jpg',
  },
  // Add your project screenshots
  projects: {
    project1Screenshot: '/images/project1-screenshot.jpg',
  },
}
```

### **3. Portfolio Projects**
**File:** `src/config/portfolio.ts`

Update with your actual projects:

```typescript
export const portfolioProjects = [
  {
    title: 'Your Project Name',
    description: 'Project description',
    category: 'software', // or 'design', 'videography', 'music'
    technologies: ['React', 'Next.js', 'TypeScript'],
    featured: true,
    // ... add your project details
  }
]
```

### **4. Page-Specific Content**

#### **About Page:** `src/app/about/page.tsx`
- Update biography paragraphs
- Update skills lists
- Update education details
- Update career timeline

#### **Music/Lyrics:** `src/config/music.ts` (if exists)
- Update song lists
- Update lyrics content
- Update streaming links

#### **Contact Page:** `src/app/contact/page.tsx`
- Update contact form destination
- Update office hours
- Update location details

### **5. Environment Variables**
**File:** `.env.local`

Update these with your actual accounts:

```env
# Social Media URLs
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourpage
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourusername
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourpage
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@yourchannel
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername

# Contact Email
CONTACT_EMAIL=your-contact@email.com
SMTP_USER=your-smtp-email@gmail.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🔧 **How to Make Changes**

1. **Edit the files** using any text editor
2. **Save the changes**
3. **Refresh your browser** - changes appear automatically!

## 📁 **Where to Put Your Images**

Place all your images in: `public/images/`

Examples:
- `public/images/my-professional-photo.jpg`
- `public/images/my-music-logo.png`
- `public/images/project-screenshot.jpg`

Then update the paths in `src/config/images.ts`

## ⚡ **Quick Start Priority**

**Update these files first for immediate impact:**

1. ✅ `src/config/site.ts` - Personal info, contact, social links
2. ✅ `src/config/images.ts` - Image paths  
3. ✅ `.env.local` - Email and social URLs
4. ✅ Replace images in `public/images/` folder

**That's it!** These 4 steps will update 90% of your site content.

## 🎯 **Advanced Customization**

For deeper changes:
- **Colors/Styling:** `tailwind.config.ts`
- **Navigation Menu:** `src/components/navigation.tsx`
- **Footer Content:** `src/components/footer.tsx`
- **SEO Settings:** Each page's metadata section

---

**💡 Tip:** Start with the `site.ts` file - it controls most of the content across all pages!