# Image Setup Guide

## Overview
This guide helps you save all photos and screenshots to the correct locations in the `public/images/` directory.

---

## 1. Professional Photos (6 images)

Save your professional photos with these exact filenames:

### Primary Professional Photos
1. **charles-jasema-professional-headshot.jpg**
   - Source: Formal tuxedo photo
   - Use: Homepage hero, About page header, Contact page
   - Recommended size: 1200x1200px (square)
   - Format: JPEG, 85% quality

2. **charles-jasema-music-ministry.jpg**
   - Source: Keyboard performance photo
   - Use: Music page header, ministry section
   - Recommended size: 1920x1080px (16:9)
   - Format: JPEG, 85% quality

3. **charles-jasema-business-professional.jpg**
   - Source: Grey suit photo
   - Use: Portfolio page, professional section
   - Recommended size: 1200x1600px (3:4 portrait)
   - Format: JPEG, 85% quality

4. **charles-jasema-creative-portrait.jpg**
   - Source: Colorful lighting photo
   - Use: About page, creative section
   - Recommended size: 1200x1600px (3:4 portrait)
   - Format: JPEG, 85% quality

5. **charles-jasema-casual-professional.jpg**
   - Source: Yellow shirt photo
   - Use: Blog author bio, casual sections
   - Recommended size: 800x800px (square)
   - Format: JPEG, 85% quality

6. **charles-jasema-full-body-professional.jpg**
   - Source: Grey suit full body photo
   - Use: About page, professional showcase
   - Recommended size: 1200x1600px (3:4 portrait)
   - Format: JPEG, 85% quality

---

## 2. Brand Assets (3 existing + 2 new)

### Already Present:
- ✅ CJ Music Logo.jpeg
- ✅ Code & Design Logo.jpeg
- ✅ Code & Design Banner.jpeg

### To Add:
7. **charles-jasema-code-design-logo.jpg**
   - Source: Professional brand logo
   - Use: Footer, header, branding
   - Recommended size: 500x500px (square)
   - Format: PNG with transparency preferred

8. **charles-jasema-music-logo.jpg**
   - Source: Music ministry logo
   - Use: Music page branding
   - Recommended size: 500x500px (square)
   - Format: PNG with transparency preferred

---

## 3. Project Screenshots (3 images)

### Project 1: CAM Connect
9. **cam-connect-app-screenshot.jpg**
   - Source: Combine login screen + dashboard screenshots
   - Use: Portfolio card, project detail page
   - Recommended: Create a composite showing 2-3 screens
   - Size: 1920x1080px (16:9)
   - Format: JPEG, 85% quality

### Project 2: Karibu Groceries (KGL)
10. **karibu-groceries-screenshot.jpg**
    - Source: Use one of the KGL branding images or create composite
    - Suggested: Main warehouse/distribution hub image
    - Use: Portfolio card, project detail page
    - Size: 1920x1080px (16:9)
    - Format: JPEG, 85% quality

### Project 3: Portfolio Website
11. **portfolio-website-screenshot.jpg**
    - Source: Homepage screenshot
    - Use: Portfolio card, project detail page
    - Take screenshot at 1920x1080 resolution
    - Format: JPEG, 85% quality

---

## 4. Music Performance Photos (5 images)

12. **charles-jasema-live-worship-performance.jpg**
    - Source: Band setup, outdoor performance photo
    - Use: Music page gallery, performance section
    - Size: 1920x1080px (16:9)
    - Format: JPEG, 85% quality

13. **charles-jasema-youth-ministry.jpg**
    - Source: Speaking to seated youth audience
    - Use: About page, ministry section
    - Size: 1920x1080px (16:9)
    - Format: JPEG, 85% quality

14. **charles-jasema-community-outreach.jpg**
    - Source: Large outdoor youth gathering
    - Use: About page, community engagement section
    - Size: 1920x1080px (16:9)
    - Format: JPEG, 85% quality

15. **charles-jasema-graduation-ceremony.jpg**
    - Source: Graduation ceremony speaking photo
    - Use: About page, achievements section
    - Size: 1920x1080px (16:9)
    - Format: JPEG, 85% quality

16. **charles-jasema-church-service.jpg**
    - Source: Indoor church service photo
    - Use: Music page, worship section
    - Size: 1920x1080px (16:9)
    - Format: JPEG, 85% quality

---

## Image Optimization Tips

### Before Saving:
1. **Resize images** to recommended dimensions
2. **Compress** to keep file size under 500KB per image
3. **Crop** to focus on subject (you!)
4. **Adjust brightness/contrast** if needed

### Recommended Tools:
- **Online:** Squoosh.app, TinyPNG.com
- **Desktop:** GIMP (free), Photoshop, Preview (Mac)
- **Mobile:** Snapseed, Lightroom Mobile

### File Naming Rules:
- ✅ Use lowercase letters
- ✅ Use hyphens (not underscores or spaces)
- ✅ Keep names descriptive
- ❌ No special characters
- ❌ No spaces in filenames

---

## Quick Checklist

Save these 16 images to `public/images/`:

### Professional Photos (6):
- [ ] charles-jasema-professional-headshot.jpg
- [ ] charles-jasema-music-ministry.jpg
- [ ] charles-jasema-business-professional.jpg
- [ ] charles-jasema-creative-portrait.jpg
- [ ] charles-jasema-casual-professional.jpg
- [ ] charles-jasema-full-body-professional.jpg

### Brand Assets (2 new):
- [ ] charles-jasema-code-design-logo.jpg
- [ ] charles-jasema-music-logo.jpg

### Project Screenshots (3):
- [ ] cam-connect-app-screenshot.jpg
- [ ] karibu-groceries-screenshot.jpg
- [ ] portfolio-website-screenshot.jpg

### Performance Photos (5):
- [ ] charles-jasema-live-worship-performance.jpg
- [ ] charles-jasema-youth-ministry.jpg
- [ ] charles-jasema-community-outreach.jpg
- [ ] charles-jasema-graduation-ceremony.jpg
- [ ] charles-jasema-church-service.jpg

---

## Verification

After saving all images, run this command to verify:

```bash
cd public/images
ls -la charles-jasema-*.jpg
```

You should see 16 image files listed.

---

## Next Steps

Once all images are in place:
1. ✅ Test the website locally: `npm run dev`
2. ✅ Check that all images load correctly
3. ✅ Verify responsive display on mobile
4. ✅ Run Lighthouse audit for performance
5. ✅ Commit and push to GitHub
6. ✅ Deploy to production

---

**Need Help?**
If any image path doesn't work, check:
- Exact filename (case-sensitive)
- File is in `public/images/` directory
- File extension is `.jpg` not `.jpeg` or `.JPG`
- No extra spaces in filename
