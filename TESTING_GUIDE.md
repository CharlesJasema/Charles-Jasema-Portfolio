# Testing Guide - Charles Jasema Portfolio

**Date**: April 24, 2026  
**Version**: 5.0.0  
**Server**: http://localhost:3001

---

## 🎯 What to Test

This guide will help you test all the new features and enhancements that were just implemented.

---

## 🚀 Quick Start

1. **Open your browser**
2. **Navigate to**: http://localhost:3001
3. **Follow the test steps below**

---

## ✅ Test Checklist

### 1. Homepage Test
**URL**: http://localhost:3001

**What to check**:
- [ ] Page loads without errors
- [ ] Dark/light mode toggle works
- [ ] Navigation menu works
- [ ] All links are clickable
- [ ] Images load correctly
- [ ] Responsive design (resize browser window)

**Expected**: Homepage displays with hero section, services, and featured work

---

### 2. Music Page Test
**URL**: http://localhost:3001/music

**What to check**:
- [ ] Page loads without errors
- [ ] Music videos section displays
- [ ] Lyrical videos section displays
- [ ] Audio songs section displays (12 songs)
- [ ] **NEW badges** appear on latest songs (animated gold badges)
- [ ] FEATURED badges appear on popular songs
- [ ] FIRST badge appears on Kuyeyeju
- [ ] COLLAB badge appears on "I Am Alive in You"
- [ ] Streaming platform links work
- [ ] YouTube links open in new tab
- [ ] Mdundo links open in new tab

**Expected**: 
- 1 music video (I Don't Belong Here)
- 5 lyrical videos
- 12 audio songs
- NEW badges on "I Am Alive in You" (2024)
- All badges display correctly

**Test NEW Badges**:
Look for the animated gold "NEW" badge on:
- I Am Alive in You (2024)

---

### 3. Lyrics Page Test ⭐ (MOST IMPORTANT)
**URL**: http://localhost:3001/lyrics

**What to check**:
- [ ] Page loads without errors
- [ ] Search bar is visible
- [ ] 10 song cards display
- [ ] **NEW badges** appear on latest songs (Nyadru - Love, Where Will You Be)
- [ ] FEATURED badges appear
- [ ] Search functionality works (try searching "Mercy")
- [ ] Click on a song card opens lyrics modal
- [ ] Lyrics display correctly in modal
- [ ] "Watch on YouTube" button works
- [ ] "Listen on Mdundo" button works
- [ ] **"Download Lyrics" button works** (downloads .txt file)
- [ ] Close modal button (×) works
- [ ] Click outside modal closes it

**Expected Songs (10 total)**:
1. Kuyeyeju (2015) - FEATURED + FIRST
2. I Am Alive in You (2024) - NEW + FEATURED + COLLAB
3. Where Will You Be (2023) - NEW + FEATURED
4. Mercy (2023) - FEATURED
5. A Call to Build for Restoration (2022) - FEATURED
6. My Help Comes From You (2022) - FEATURED
7. I Don't Belong Here (2024) - FEATURED
8. Jesus You Are Lord (2023) - FEATURED
9. Nyadru - Love (2024) - NEW + FEATURED
10. Where Will You Be (Full) (2023) - NEW + FEATURED

**Test NEW Badges**:
Look for the animated gold "NEW" badge on:
- Nyadru - Love (2024)
- Where Will You Be (Full) (2023)
- I Am Alive in You (2024)

**Test Search**:
1. Type "Mercy" → Should show only Mercy song
2. Type "Love" → Should show Nyadru - Love
3. Type "2024" → Should show 2024 releases
4. Clear search → Should show all songs

**Test Download**:
1. Click on "Mercy" song card
2. Modal opens with full lyrics
3. Click "Download Lyrics" button
4. File "Mercy - Lyrics.txt" should download
5. Open the file → Should contain formatted lyrics

---

### 4. About Page Test
**URL**: http://localhost:3001/about

**What to check**:
- [ ] Page loads without errors
- [ ] Biography section displays
- [ ] Skills section displays (4 categories)
- [ ] Timeline displays (5 milestones)
- [ ] All content is readable
- [ ] Dark/light mode works

**Expected**: Complete about page with bio, skills, and timeline

---

### 5. Portfolio Page Test
**URL**: http://localhost:3001/portfolio

**What to check**:
- [ ] Page loads without errors
- [ ] Project cards display
- [ ] Filter buttons work
- [ ] Projects are clickable

**Expected**: Portfolio page with project showcase

---

### 6. Contact Page Test
**URL**: http://localhost:3001/contact

**What to check**:
- [ ] Page loads without errors
- [ ] Contact form displays
- [ ] Contact methods display
- [ ] Social media links work
- [ ] FAQ section displays

**Expected**: Contact page with form and information

---

### 7. Booking Page Test
**URL**: http://localhost:3001/booking

**What to check**:
- [ ] Page loads without errors
- [ ] Service selection works
- [ ] Booking form displays
- [ ] All fields are functional

**Expected**: Booking page with service options and form

---

### 8. Navigation Test

**What to check**:
- [ ] Click "Home" → Goes to homepage
- [ ] Click "About" → Goes to about page
- [ ] Click "Portfolio" → Goes to portfolio page
- [ ] Click "Music" → Goes to music page
- [ ] Click "Lyrics" → Goes to lyrics page
- [ ] Click "Blog" → Goes to blog page
- [ ] Click "Contact" → Goes to contact page
- [ ] Click "Booking" → Goes to booking page
- [ ] Mobile menu works (resize browser to mobile size)

**Expected**: All navigation links work correctly

---

### 9. Footer Test

**What to check**:
- [ ] Footer displays on all pages
- [ ] Professional social links work (LinkedIn, Twitter, YouTube, GitHub)
- [ ] Music ministry social links work (Instagram, Twitter, YouTube, Facebook, TikTok, Mdundo)
- [ ] Newsletter form displays
- [ ] Developer credit displays
- [ ] Links open in new tabs

**Expected**: Footer with all social links and information

---

### 10. Dark/Light Mode Test

**What to check**:
- [ ] Toggle button is visible (top right)
- [ ] Click toggle → Switches to dark mode
- [ ] Click toggle again → Switches to light mode
- [ ] Mode persists on page refresh
- [ ] All pages respect the mode
- [ ] Text is readable in both modes
- [ ] Colors look good in both modes

**Expected**: Smooth transition between light and dark modes

---

### 11. Responsive Design Test

**What to check**:
- [ ] Resize browser to mobile size (375px width)
- [ ] All pages are readable
- [ ] Navigation becomes hamburger menu
- [ ] Images scale correctly
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] No horizontal scrolling

**Expected**: Website works perfectly on all screen sizes

---

### 12. Performance Test

**What to check**:
- [ ] Pages load quickly (< 3 seconds)
- [ ] No console errors (press F12 → Console tab)
- [ ] Images load smoothly
- [ ] Animations are smooth
- [ ] No layout shifts

**Expected**: Fast, smooth performance

---

## 🐛 Common Issues & Solutions

### Issue: Page doesn't load
**Solution**: 
1. Check if dev server is running
2. Refresh the page (Ctrl+R or Cmd+R)
3. Clear browser cache (Ctrl+Shift+Delete)

### Issue: NEW badges don't show
**Solution**:
1. Check if you're looking at the right songs (2024 releases)
2. Refresh the page
3. Clear browser cache

### Issue: Download doesn't work
**Solution**:
1. Check browser allows downloads
2. Try different browser (Chrome, Firefox, Edge)
3. Check browser download settings

### Issue: Search doesn't work
**Solution**:
1. Type in the search box
2. Wait for results to filter
3. Try different search terms
4. Refresh the page

### Issue: Dark mode doesn't work
**Solution**:
1. Click the toggle button (top right)
2. Wait for transition
3. Refresh the page
4. Clear browser cache

---

## 📊 Browser Testing

Test on multiple browsers:
- [ ] **Chrome** (recommended)
- [ ] **Firefox**
- [ ] **Edge**
- [ ] **Safari** (if on Mac)

**Expected**: Works on all modern browsers

---

## 📱 Mobile Testing

Test on mobile devices:
- [ ] **iPhone** (Safari)
- [ ] **Android** (Chrome)
- [ ] **Tablet** (iPad/Android)

**Expected**: Responsive and functional on all devices

---

## ✅ Final Checklist

Before committing to Git:
- [ ] All pages load without errors
- [ ] NEW badges display correctly
- [ ] Lyrics download works
- [ ] Search functionality works
- [ ] Dark/light mode works
- [ ] Navigation works
- [ ] Footer links work
- [ ] Responsive design works
- [ ] No console errors
- [ ] Performance is good

---

## 🎯 Priority Tests

If you're short on time, test these first:

### High Priority
1. **Lyrics Page** (http://localhost:3001/lyrics)
   - NEW badges
   - Download functionality
   - Search functionality

2. **Music Page** (http://localhost:3001/music)
   - NEW badges
   - All songs display

3. **Homepage** (http://localhost:3001)
   - Basic functionality

### Medium Priority
4. About Page
5. Portfolio Page
6. Contact Page

### Low Priority
7. Blog Page
8. Booking Page

---

## 📝 Test Results Template

Use this template to record your test results:

```
Date: April 24, 2026
Tester: [Your Name]
Browser: [Chrome/Firefox/Edge/Safari]
Device: [Desktop/Mobile/Tablet]

✅ PASSED:
- Homepage loads
- Music page displays
- Lyrics page works
- NEW badges show
- Download works
- Search works

❌ FAILED:
- [List any issues found]

🐛 BUGS FOUND:
- [List any bugs]

💡 SUGGESTIONS:
- [List any improvements]
```

---

## 🚀 Next Steps After Testing

1. **If all tests pass**:
   - Commit changes to Git
   - Push to GitHub
   - Deploy to live domain

2. **If issues found**:
   - Document the issues
   - Report to developer
   - Retest after fixes

---

## 📞 Need Help?

If you encounter any issues:
1. Check the console for errors (F12 → Console)
2. Check the MUSIC_SEO_ENHANCEMENT_SUMMARY.md
3. Check the SEO_GUIDE.md
4. Review the code comments

---

## 🎉 What to Look For

### Success Indicators
✅ 10 songs with complete lyrics  
✅ Animated NEW badges on latest songs  
✅ Download button works perfectly  
✅ Search filters songs in real-time  
✅ All streaming links work  
✅ Dark/light mode transitions smoothly  
✅ Responsive on all devices  
✅ Fast loading times  
✅ No console errors  

### Quality Indicators
✅ Professional appearance  
✅ Easy to navigate  
✅ Clear visual hierarchy  
✅ Consistent design  
✅ Accessible to all users  
✅ SEO optimized  
✅ Mobile-friendly  

---

**Status**: 🟢 Ready for Testing  
**Server**: http://localhost:3001  
**Expected Duration**: 15-30 minutes for complete testing

---

**Start Testing Now!** Open http://localhost:3001 in your browser and follow the checklist above.

