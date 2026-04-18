# Image Usage Guide - Charles Jasema Portfolio

## ✅ Images Now Displaying

Your images are now properly integrated and displaying across the website!

### Current Image Locations

All images are stored in: `/charles-jasema-portfolio/public/images/`

1. **CJ Music Logo.jpeg** - Music ministry branding
2. **Code & Design Logo.jpeg** - Professional branding (used in navigation)
3. **Code & Design Banner.jpeg** - Banner/header image
4. **Professional image.JPG** - Your professional photo (About page)
5. **Ministry Image 1.jpg** - Music ministry photo (Music page)
6. **KGL Screenshot.jpg** - Project screenshot

---

## 📍 Where Images Appear

### Navigation Bar
- **Logo**: Code & Design Logo appears in the top-left corner
- Displays on all pages
- Clickable link to homepage

### About Page (`/about`)
- **Professional Photo**: Your professional image displays prominently in the hero section
- Full-size image with decorative elements
- Responsive on all devices

### Music Page (`/music`)
- **Ministry Photo**: Ministry Image 1 displays in the hero section
- Shows your music ministry presence
- Responsive layout with decorative elements

### Portfolio Page (`/portfolio`)
- **KGL Screenshot**: Available for project showcase
- Can be added to individual project cards

---

## 🎨 Image Configuration

All image paths are centrally managed in:
**File**: `src/config/images.ts`

```typescript
export const imagesConfig = {
  logos: {
    musicLogo: '/images/CJ Music Logo.jpeg',
    codeDesignLogo: '/images/Code & Design Logo.jpeg',
    codeDesignBanner: '/images/Code & Design Banner.jpeg',
  },
  profile: {
    professional: '/images/professional image.JPG',
    ministry: '/images/Ministry Image 1.jpg',
  },
  projects: {
    kglScreenshot: '/images/KGL Screenshot.jpg',
  },
};
```

---

## 📝 How to Add More Images

### Step 1: Add Image to Public Folder
1. Place your image in `/charles-jasema-portfolio/public/images/`
2. Use descriptive filenames (e.g., `project-name.jpg`)

### Step 2: Update images.ts Configuration
```typescript
// Add to the appropriate section
projects: {
  kglScreenshot: '/images/KGL Screenshot.jpg',
  newProject: '/images/your-new-image.jpg',  // ← Add here
},
```

### Step 3: Use in Your Pages
```typescript
import { imagesConfig } from '@/config/images';
import Image from 'next/image';

<Image
  src={imagesConfig.projects.newProject}
  alt="Project Description"
  fill
  className="object-cover"
/>
```

---

## 🔄 Future: Cloudinary Migration

When you're ready to migrate to Cloudinary:

### Benefits:
- ✅ Automatic image optimization
- ✅ WebP format conversion
- ✅ Responsive image generation
- ✅ Global CDN delivery (faster loading)
- ✅ Video and audio hosting
- ✅ Admin upload functionality

### Migration Process:
1. Upload images to Cloudinary
2. Update `images.ts` with Cloudinary URLs
3. Keep originals in public folder as backup

### Example Cloudinary URL:
```typescript
codeDesignLogo: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/code-design-logo.jpg'
```

---

## 🚀 Next Steps for Images

### Immediate (Optional):
- [ ] Add more project screenshots to portfolio
- [ ] Add album covers for music section
- [ ] Add blog post featured images

### Future (When Implementing Cloudinary):
- [ ] Set up Cloudinary account
- [ ] Upload all images to Cloudinary
- [ ] Update image URLs in `images.ts`
- [ ] Implement image upload in admin dashboard

---

## 📊 Image Optimization Tips

### Current Setup (Next.js Image Component):
- ✅ Automatic lazy loading
- ✅ Responsive image sizing
- ✅ WebP format support (when available)
- ✅ Blur placeholder support

### Best Practices:
1. **Use descriptive alt text** for accessibility
2. **Optimize image sizes** before uploading (max 2MB recommended)
3. **Use appropriate formats**: JPG for photos, PNG for logos/graphics
4. **Provide multiple sizes** for responsive design

---

## 🎯 Summary

**Status**: ✅ All images properly integrated and displaying

**Locations**:
- Navigation: Code & Design Logo
- About Page: Professional Photo
- Music Page: Ministry Photo
- Portfolio: KGL Screenshot (ready to use)

**Configuration**: Centralized in `src/config/images.ts`

**Next Priority**: Continue with CMS integration, dynamic routing, or form backend

---

**Last Updated**: April 18, 2026  
**Version**: 1.0.0
