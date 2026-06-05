# Pre-Deployment Testing Checklist

**Project:** Charles Jasema Portfolio  
**Testing Date:** Before Deployment  
**Tester:** Development Team

---

## 1. Environment Setup Verification

### ✅ Check Environment Variables
```bash
# Verify .env.local exists and has correct values
cat .env.local | grep -E "SANITY|GA|TAWK"
```

**Required Variables:**
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` - Set and valid
- [ ] `NEXT_PUBLIC_SANITY_DATASET` - Set to "production"
- [ ] `SANITY_API_TOKEN` - Set with write permissions
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics ID (or placeholder)
- [ ] `NEXT_PUBLIC_TAWK_TO_PROPERTY_ID` - Tawk.to ID (or placeholder)

---

## 2. Build and Start Tests

### Test 1: Clean Build
```bash
# Remove old builds
rm -rf .next

# Run fresh build
npm run build
```

**Expected Result:** ✅ Build completes without errors

**Check for:**
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All pages compile successfully
- [ ] Build size is reasonable (<5MB)

### Test 2: Development Server
```bash
# Start development server
npm run dev
```

**Expected Result:** ✅ Server starts on http://localhost:3001

**Check for:**
- [ ] Server starts without errors
- [ ] No console errors in terminal
- [ ] Port 3001 is accessible

### Test 3: Production Build Test
```bash
# Build and start production server
npm run build && npm start
```

**Expected Result:** ✅ Production server runs smoothly

---

## 3. Configuration Files Testing

### Test Config Files Load Correctly

#### Test Site Configuration
```bash
# Check site config is valid
node -e "const config = require('./src/config/site.ts'); console.log('Site Config:', config.siteConfig.name);"
```

**Verify:**
- [ ] Personal information loads correctly
- [ ] Contact details are accurate
- [ ] Social media links are valid
- [ ] No undefined values

#### Test Images Configuration
**Verify:**
- [ ] All image paths are defined
- [ ] Image filenames match actual files
- [ ] No broken image references

#### Test Portfolio Configuration
**Verify:**
- [ ] 3 projects are defined (Karibu Groceries, CAM Connect, Portfolio)
- [ ] All project data is complete
- [ ] Client testimonial is present
- [ ] GitHub and live URLs are valid

#### Test Music Configuration
**Verify:**
- [ ] 7 songs are defined
- [ ] All song data is complete (lyrics, themes, links)
- [ ] YouTube and Mdundo links are valid
- [ ] Scripture references are present

---

## 4. Page-by-Page Testing

### Homepage (`/`)
**URL:** http://localhost:3001

**Visual Checks:**
- [ ] Hero section loads with professional photo
- [ ] Professional title displays correctly
- [ ] Call-to-action buttons are visible
- [ ] Navigation menu works
- [ ] Footer displays correctly

**Functional Checks:**
- [ ] All links are clickable
- [ ] No console errors
- [ ] Page loads in <2 seconds
- [ ] Images load properly

### About Page (`/about`)
**URL:** http://localhost:3001/about

**Visual Checks:**
- [ ] Professional photo displays
- [ ] Bio information is accurate
- [ ] Skills and expertise sections visible
- [ ] Education section present
- [ ] Timeline/achievements visible

**Functional Checks:**
- [ ] All sections are readable
- [ ] Links work correctly
- [ ] No console errors

### Portfolio Page (`/portfolio`)
**URL:** http://localhost:3001/portfolio

**Visual Checks:**
- [ ] 3 projects display correctly
- [ ] Project images load (or placeholders)
- [ ] Tech stack badges visible
- [ ] Project descriptions readable

**Functional Checks:**
- [ ] Filter buttons work (if present)
- [ ] Project details expand/open correctly
- [ ] GitHub links work
- [ ] Live demo links work
- [ ] Client testimonial displays

**Verify Each Project:**
- [ ] Karibu Groceries - Complete data
- [ ] CAM Connect - Complete data with testimonial
- [ ] Portfolio - Complete data

### Music Page (`/music`)
**URL:** http://localhost:3001/music

**Visual Checks:**
- [ ] 7 songs display in grid
- [ ] Song cards are well-aligned
- [ ] Album artwork visible (or placeholders)
- [ ] Song information readable

**Functional Checks:**
- [ ] Streaming links work (YouTube, Mdundo)
- [ ] Song details expand correctly
- [ ] Performance photos display
- [ ] No console errors

**Verify Each Song:**
- [ ] "A Call to Build for Restoration" (2025)
- [ ] "Jesus You Are Lord" (2015)
- [ ] "Mercy" (2024)
- [ ] "My Help Comes From You" (2025)
- [ ] "I Don't Belong Here" (2023)
- [ ] "Nyadru – Love" (2021)
- [ ] "Where Will You Be?" (2025)

### Lyrics Page (`/lyrics`)
**URL:** http://localhost:3001/lyrics

**Visual Checks:**
- [ ] Lyrics display correctly
- [ ] Songs are organized by title
- [ ] Formatting is readable

**Functional Checks:**
- [ ] Search/filter works (if present)
- [ ] No console errors

### Blog Page (`/blog`)
**URL:** http://localhost:3001/blog

**Visual Checks:**
- [ ] Blog posts display (or coming soon message)
- [ ] Layout is clean

**Functional Checks:**
- [ ] No errors if no content

### Contact Page (`/contact`)
**URL:** http://localhost:3001/contact

**Visual Checks:**
- [ ] Contact form displays
- [ ] Contact information visible
- [ ] Email: brocharles001@gmail.com
- [ ] Phone: +256785446877
- [ ] WhatsApp link present
- [ ] Social media links visible

**Functional Checks:**
- [ ] Form fields accept input
- [ ] Form validation works
- [ ] Submit button is functional
- [ ] Tawk.to chat widget loads (if configured)

### Admin Page (`/admin`)
**URL:** http://localhost:3001/admin

**Visual Checks:**
- [ ] Sanity Studio loads correctly
- [ ] Content sections are organized
- [ ] No errors on load

**Functional Checks:**
- [ ] Can navigate Sanity Studio
- [ ] Songs section accessible
- [ ] Projects section accessible
- [ ] Blog section accessible

---

## 5. Responsive Design Testing

### Desktop Testing (1920x1080)
**Test all pages at full desktop resolution**
- [ ] Homepage looks professional
- [ ] All pages scale properly
- [ ] Navigation is usable
- [ ] Images display correctly

### Tablet Testing (768x1024)
**Test key pages at tablet size**
- [ ] Homepage adapts correctly
- [ ] Portfolio grid adjusts
- [ ] Music page grid adjusts
- [ ] Navigation becomes mobile menu

### Mobile Testing (375x667)
**Test all pages at mobile size**
- [ ] Homepage is mobile-friendly
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Images scale properly
- [ ] Navigation menu works
- [ ] Forms are usable

**Test on actual devices (if possible):**
- [ ] iPhone/Safari
- [ ] Android/Chrome
- [ ] iPad/Safari

---

## 6. Performance Testing

### Lighthouse Audit
```bash
# Run Lighthouse audit (install globally if needed)
npm install -g lighthouse
lighthouse http://localhost:3001 --view
```

**Target Scores:**
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 95
- [ ] SEO: ≥ 95

### Core Web Vitals
**Check for:**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Page Load Times
**Test load speed for each page:**
- [ ] Homepage: < 2 seconds
- [ ] About: < 2 seconds
- [ ] Portfolio: < 2 seconds
- [ ] Music: < 2 seconds
- [ ] Contact: < 2 seconds

---

## 7. Functionality Testing

### Navigation Testing
- [ ] Logo links to homepage
- [ ] All menu items work
- [ ] Mobile menu opens/closes
- [ ] Footer links work
- [ ] Skip links work (accessibility)

### Links Testing
**External Links:**
- [ ] GitHub links open in new tab
- [ ] LinkedIn opens correctly
- [ ] YouTube links work
- [ ] Mdundo links work
- [ ] Twitter/X links work
- [ ] Instagram links work
- [ ] TikTok links work

**Internal Links:**
- [ ] All internal navigation works
- [ ] Back buttons work
- [ ] Breadcrumbs work (if present)

### Forms Testing
**Contact Form:**
- [ ] Name field accepts input
- [ ] Email field validates email format
- [ ] Message field accepts text
- [ ] Submit button triggers validation
- [ ] Success message displays
- [ ] Error messages display correctly

### Search Testing (if applicable)
- [ ] Search functionality works
- [ ] Results are relevant
- [ ] No results message displays

---

## 8. Browser Compatibility Testing

### Desktop Browsers
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Microsoft Edge (latest)
- [ ] Safari (Mac) (latest)

### Mobile Browsers
- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Samsung Internet

**Test for:**
- Layout consistency
- Font rendering
- Image display
- Functionality
- No console errors

---

## 9. SEO Testing

### Meta Tags
**Check each page has:**
- [ ] Title tag (unique per page)
- [ ] Meta description (unique per page)
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URL

### Structured Data
- [ ] Person schema for author
- [ ] MusicRecording schema for songs
- [ ] Project/CreativeWork schema for portfolio

### Sitemap & Robots
- [ ] Sitemap generates correctly
- [ ] robots.txt is accessible
- [ ] No disallowed critical pages

---

## 10. Security Testing

### Headers Check
```bash
curl -I http://localhost:3001
```

**Verify Headers:**
- [ ] Content-Security-Policy present
- [ ] X-Frame-Options: DENY or SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy present

### HTTPS Testing (after deployment)
- [ ] HTTPS redirect works
- [ ] SSL certificate valid
- [ ] Mixed content warnings absent

### Input Validation
- [ ] Contact form sanitizes input
- [ ] No XSS vulnerabilities
- [ ] CSRF protection active

---

## 11. Sanity CMS Integration Testing

### Sanity Studio Access
- [ ] Can access /admin
- [ ] Studio loads without errors
- [ ] Can navigate content sections

### Content Management
- [ ] Can view existing songs
- [ ] Can view existing projects
- [ ] Can create new content (test)
- [ ] Can edit existing content (test)
- [ ] Can delete content (test)

### Data Sync
```bash
# Run music sync script
npx ts-node scripts/sync-music-to-sanity.ts
```

**Verify:**
- [ ] Script runs without errors
- [ ] 7 songs sync to Sanity
- [ ] Data appears in Sanity Studio
- [ ] No duplicate entries

### Content Display
- [ ] Sanity content displays on frontend
- [ ] Images from Sanity load correctly
- [ ] Updates in Sanity reflect on site (with revalidation)

---

## 12. Analytics & Tracking Testing

### Google Analytics (if configured)
- [ ] GA tracking code loads
- [ ] Page views tracked
- [ ] Events tracked (button clicks, etc.)
- [ ] No console errors from GA

### Tawk.to Chat (if configured)
- [ ] Chat widget loads
- [ ] Widget is positioned correctly
- [ ] Can open chat window
- [ ] Can send test message
- [ ] Mobile responsive

---

## 13. Accessibility Testing

### Keyboard Navigation
- [ ] Tab order is logical
- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] Can navigate entire site with keyboard

### Screen Reader Testing
- [ ] Page titles are descriptive
- [ ] Headings are properly nested
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Form labels are associated

### Color Contrast
- [ ] Text meets 4.5:1 contrast ratio
- [ ] Interactive elements meet 3:1 ratio
- [ ] No color-only information

### ARIA Labels
- [ ] Navigation has aria-label
- [ ] Buttons have descriptive labels
- [ ] Dynamic content has aria-live

---

## 14. Error Handling Testing

### 404 Page
**Test:** Navigate to http://localhost:3001/nonexistent

- [ ] Custom 404 page displays
- [ ] Navigation still works
- [ ] Link back to homepage present

### 500 Error
- [ ] Error boundary catches errors
- [ ] Error page is user-friendly
- [ ] No sensitive information exposed

### Network Errors
- [ ] Graceful handling of failed API calls
- [ ] Retry mechanisms work
- [ ] User-friendly error messages

---

## 15. Content Accuracy Testing

### Personal Information
- [ ] Name: Charles Jada Sebit Emmanuel
- [ ] Professional title accurate
- [ ] Contact email: brocharles001@gmail.com
- [ ] Phone: +256785446877
- [ ] Location: Kampala, Uganda

### Project Information
- [ ] Karibu Groceries details accurate
- [ ] CAM Connect details accurate
- [ ] Portfolio details accurate
- [ ] No fictional projects present

### Music Information
- [ ] All 7 songs present
- [ ] Song titles correct
- [ ] Release years accurate
- [ ] Streaming links work
- [ ] Lyrics are complete

### Social Media Links
**Professional:**
- [ ] LinkedIn URL correct
- [ ] GitHub URL correct
- [ ] Twitter URL correct
- [ ] YouTube (Code & Design) URL correct

**Music:**
- [ ] Instagram URL correct
- [ ] TikTok URL correct
- [ ] YouTube (Music) URL correct
- [ ] Facebook URL correct
- [ ] Mdundo URL correct

---

## 16. Final Checks Before Deployment

### Code Quality
- [ ] No console.log statements in production code
- [ ] No TODO comments in critical code
- [ ] TypeScript errors: 0
- [ ] ESLint warnings: 0

### Dependencies
```bash
npm audit
```
- [ ] No critical vulnerabilities
- [ ] All dependencies up to date
- [ ] No unused dependencies

### Git Status
```bash
git status
```
- [ ] All changes committed
- [ ] No sensitive files in git
- [ ] .env.local not committed
- [ ] Clean working directory

### Documentation
- [ ] README.md is updated
- [ ] PORTFOLIO_UPDATE_SUMMARY.md complete
- [ ] NEXT_STEPS.md accurate
- [ ] All guides present

---

## 17. Deployment Preparation

### Environment Variables for Production
**Prepare these for Vercel/Netlify:**
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] `SANITY_API_TOKEN`
- [ ] `NEXT_PUBLIC_GA_ID`
- [ ] `NEXT_PUBLIC_TAWK_TO_PROPERTY_ID`
- [ ] `NEXT_PUBLIC_SITE_URL=https://charlesjasema.com`

### Domain Configuration
- [ ] Domain DNS configured
- [ ] SSL certificate ready
- [ ] Redirects configured (www to non-www)

### Backup
- [ ] Database/content backed up
- [ ] Code pushed to GitHub
- [ ] Environment variables documented

---

## Testing Summary

**Date Completed:** _______________  
**Tester:** _______________  
**Total Tests:** _______________  
**Passed:** _______________  
**Failed:** _______________  

### Critical Issues Found:
1. _________________
2. _________________
3. _________________

### Minor Issues Found:
1. _________________
2. _________________
3. _________________

### Deployment Readiness: ☐ READY  ☐ NOT READY

---

## Post-Deployment Testing

**After deploying to production, verify:**
- [ ] Production URL loads: https://charlesjasema.com
- [ ] HTTPS works correctly
- [ ] All pages load on production
- [ ] Sanity content displays correctly
- [ ] Forms submit successfully
- [ ] Analytics tracking works
- [ ] Chat widget works (if configured)
- [ ] Mobile performance acceptable
- [ ] No console errors on production

---

**Ready for Deployment:** Once all checks pass, proceed with deployment!

**Deployment Command:**
```bash
# For Vercel
vercel --prod

# Or push to main branch if auto-deploy is configured
git push origin main
```

🎉 **Good luck with your launch!**
