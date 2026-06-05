# Performance Photos Required

**Status:** 5 ministry performance photos needed for Music page  
**Current:** Only 1 photo exists (`Ministry Image 1.jpg`)

---

## 📸 Required Photos

The music configuration (`src/config/music.ts`) references these 5 performance photos:

### 1. Live Worship Performance
**Filename:** `charles-jasema-live-worship-performance.jpg`  
**Description:** Charles leading worship with congregation  
**Suggested:** Photo from church service, worship leading, with audience visible

### 2. Youth Ministry
**Filename:** `charles-jasema-youth-ministry.jpg`  
**Description:** Ministry with youth/young people  
**Suggested:** Photo from youth event, youth conference, or young adults gathering

### 3. Graduation Ceremony
**Filename:** `charles-jasema-graduation-ceremony.jpg`  
**Description:** Performance at graduation event  
**Suggested:** Photo from university graduation, academic ceremony, or formal event

### 4. Community Outreach
**Filename:** `charles-jasema-community-outreach.jpg`  
**Description:** Ministry in community setting  
**Suggested:** Photo from community event, outreach program, or public ministry

### 5. Church Service
**Filename:** `charles-jasema-church-service.jpg`  
**Description:** Regular church service performance  
**Suggested:** Photo from Sunday service, church event, or worship session

---

## ✅ Photo Specifications

### Technical Requirements:
- **Format:** JPG or JPEG
- **Size:** <500KB per photo (compressed)
- **Dimensions:** 1200x800px minimum (3:2 aspect ratio)
- **Orientation:** Landscape (horizontal)
- **Quality:** High-resolution, well-lit, in-focus

### Content Requirements:
- **Subject:** Charles clearly visible
- **Setting:** Professional ministry context
- **Audience:** Congregation/participants visible (if applicable)
- **Instruments:** Guitar/keyboard visible (if applicable)
- **Lighting:** Good lighting, not too dark
- **Composition:** Professional framing

---

## 📋 How to Add Photos

### Option 1: Copy from Existing Sources

**If you have ministry photos on:**
- Phone camera roll
- Social media posts (Facebook, Instagram)
- Church website or materials
- Event photographer collections
- Previous event documentation

**Steps:**
1. Locate the best 5 photos matching descriptions above
2. Download/export in highest quality
3. Rename files to match exact filenames above
4. Compress using Squoosh.app or TinyPNG if over 500KB
5. Copy to `public/images/` folder
6. Verify they display on Music page

### Option 2: Use Existing Photo as Placeholder

**If photos not available yet:**

You can duplicate `Ministry Image 1.jpg` as temporary placeholder:

```bash
# Navigate to images folder
cd public/images/

# Create copies with required filenames
cp "Ministry Image 1.jpg" charles-jasema-live-worship-performance.jpg
cp "Ministry Image 1.jpg" charles-jasema-youth-ministry.jpg
cp "Ministry Image 1.jpg" charles-jasema-graduation-ceremony.jpg
cp "Ministry Image 1.jpg" charles-jasema-community-outreach.jpg
cp "Ministry Image 1.jpg" charles-jasema-church-service.jpg
```

**Then replace with actual photos later.**

### Option 3: Request Photos from Others

**Ask for photos from:**
- Church media team
- Event photographers
- Fellow ministry members
- Church social media admin
- Previous event organizers

**Sample Request:**
> "Hi! I'm updating my portfolio website and need 5 professional photos of my ministry performances. Do you have any high-quality photos from [event name] on [date] that I could use? Looking for landscape orientation, 1200x800px minimum. Thank you!"

---

## 🖼️ Where Photos Are Used

These photos appear in the **Music page** (`/music`):

1. **Ministry Stats Section:**
   - Background image showcase
   - Visual storytelling of ministry journey

2. **Photo Gallery:**
   - Interactive carousel of performance photos
   - Hover effects and captions

3. **About Artist Section:**
   - Visual representation of ministry work
   - Professional branding

**Impact:** Photos enhance credibility and visual appeal of music ministry presentation.

---

## 🔧 Technical Implementation

Photos are configured in `src/config/music.ts`:

```typescript
// Ministry Performance Images
performances: {
  liveWorship: '/images/charles-jasema-live-worship-performance.jpg',
  youthMinistry: '/images/charles-jasema-youth-ministry.jpg',
  graduationCeremony: '/images/charles-jasema-graduation-ceremony.jpg',
  communityOutreach: '/images/charles-jasema-community-outreach.jpg',
  churchService: '/images/charles-jasema-church-service.jpg'
},
```

**No code changes needed** - just add the image files with correct names!

---

## ⚠️ Current Status

**Existing Photos in `/public/images/`:**
- ✅ `Ministry Image 1.jpg` (1 photo only)
- ✅ `professional image.JPG` (professional headshot)
- ✅ `CJ Music Logo.jpeg` (branding)

**Missing Photos:**
- ❌ `charles-jasema-live-worship-performance.jpg`
- ❌ `charles-jasema-youth-ministry.jpg`
- ❌ `charles-jasema-graduation-ceremony.jpg`
- ❌ `charles-jasema-community-outreach.jpg`
- ❌ `charles-jasema-church-service.jpg`

---

## 📷 Photo Compression Tools

**Recommended Tools:**
1. **Squoosh.app** (https://squoosh.app)
   - Drag and drop interface
   - Compare before/after
   - MozJPEG compression
   - Target: 70-80% quality, <500KB

2. **TinyPNG** (https://tinypng.com)
   - Batch upload up to 20 images
   - Smart lossy compression
   - Maintains good quality

3. **Image Optim** (Mac) or **ImageMagick** (Command line)
   ```bash
   # Using ImageMagick
   convert input.jpg -quality 80 -resize 1200x800 output.jpg
   ```

---

## ✅ Checklist

**Photo Collection:**
- [ ] Found 5 suitable performance photos
- [ ] Photos match descriptions above
- [ ] Photos are professional quality
- [ ] Charles is clearly visible in each
- [ ] Photos show different ministry contexts

**Photo Preparation:**
- [ ] Renamed files to exact filenames required
- [ ] Compressed photos to <500KB each
- [ ] Verified dimensions (1200x800px minimum)
- [ ] Converted to JPG format if needed
- [ ] Checked photo quality and clarity

**Adding to Portfolio:**
- [ ] Copied photos to `public/images/` folder
- [ ] Verified filenames match exactly
- [ ] Tested Music page displays photos
- [ ] Checked mobile responsiveness
- [ ] Verified load times acceptable

---

## 🚀 Deployment Note

**Can Deploy Without These Photos?** YES ✅

The Music page has fallback handling for missing images. However:
- **With photos:** Professional, credible, visually engaging
- **Without photos:** Functional but less impactful

**Recommendation:** Add photos before deployment for best first impression, OR deploy with placeholder and update later.

---

## 📞 Quick Reference

**Photo Locations:**
```
Source:       Your phone, social media, church archives
Destination:  public/images/
Format:       JPG/JPEG
Size:         <500KB
Dimensions:   1200x800px minimum
```

**Filenames Required:**
```
charles-jasema-live-worship-performance.jpg
charles-jasema-youth-ministry.jpg
charles-jasema-graduation-ceremony.jpg
charles-jasema-community-outreach.jpg
charles-jasema-church-service.jpg
```

**Configuration File:**
```
src/config/music.ts (lines 288-294)
```

---

**Created:** January 2025  
**Priority:** Medium (Can deploy without, but recommended)  
**Estimated Time:** 1 hour (find + prepare + add photos)
