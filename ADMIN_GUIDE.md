# Admin Guide - Charles Jasema Portfolio

This guide explains how to update and manage your portfolio website content **without coding**.

## 📁 Configuration Files Location

All editable content is located in: `src/config/`

### Available Configuration Files:

1. **`site.ts`** - Site-wide settings (contact info, social media links)
2. **`home.ts`** - Homepage content (hero, services, featured work)
3. **`about.ts`** - About page content (bio, skills, timeline)
4. **`portfolio.ts`** - Portfolio projects (add/edit/remove projects)

---

## 🔧 How to Edit Configuration Files

### 1. Site Configuration (`src/config/site.ts`)

**What you can edit:**
- Personal information (name, title, description)
- Contact information (email, phone, location)
- Professional social media links (LinkedIn, Twitter, YouTube, GitHub)
- Music ministry social media links (Instagram, TikTok, Facebook, Mdundo)
- Website URL and SEO keywords

**Example:**
```typescript
contact: {
  email: 'your-email@example.com',  // ← Change this
  phone: '+254 123 456 789',         // ← Change this
  location: 'Your City, Country',    // ← Change this
},
```

---

### 2. Homepage Configuration (`src/config/home.ts`)

**What you can edit:**
- Hero section text and tagline
- Call-to-action button text and links
- "What I Do" section (services descriptions)
- Featured work section (project highlights)
- Bottom call-to-action section

**Example:**
```typescript
hero: {
  greeting: 'Hi, I\'m',
  tagline: 'Your custom tagline here...',  // ← Change this
},
```

---

### 3. About Page Configuration (`src/config/about.ts`)

**What you can edit:**
- Hero introduction text
- Skills & expertise (4 categories with skill lists)
- Career timeline (education, work experience, achievements)
- Call-to-action section

**Example - Adding a new skill:**
```typescript
skills: [
  {
    id: 'software',
    title: 'Software Engineering',
    items: [
      'Full-Stack Web Development',
      'Your New Skill Here',  // ← Add new skills
    ],
  },
],
```

**Example - Updating timeline:**
```typescript
timeline: [
  {
    id: '1',
    period: '2020 - 2024',           // ← Change dates
    title: 'Your Degree/Position',   // ← Change title
    organization: 'Your University', // ← Change organization
    description: 'Your description', // ← Change description
  },
],
```

---

### 4. Portfolio Configuration (`src/config/portfolio.ts`)

**What you can edit:**
- Add new projects
- Edit existing projects
- Remove projects
- Change project categories
- Update project descriptions, tags, and links

**Example - Adding a new project:**
```typescript
{
  id: '13',                          // ← Unique ID
  title: 'Your Project Name',        // ← Project title
  category: 'software',              // ← software | design | videography | music
  description: 'Project description',// ← Brief description
  image: '/placeholder',             // ← Image path (update later)
  tags: ['React', 'Node.js'],        // ← Technology tags
  link: 'https://project-url.com',   // ← Project link
  github: 'https://github.com/...',  // ← GitHub link (optional)
  featured: true,                    // ← Show as featured?
},
```

**Example - Removing a project:**
Simply delete the entire project object from the array.

---

## 📝 Step-by-Step: How to Update Content

### Method 1: Using VS Code (Recommended)

1. Open VS Code
2. Navigate to `src/config/` folder
3. Open the file you want to edit (e.g., `site.ts`)
4. Make your changes
5. Save the file (Ctrl+S or Cmd+S)
6. The website will automatically reload with your changes

### Method 2: Using Any Text Editor

1. Navigate to `charles-jasema-portfolio/src/config/`
2. Open the configuration file in any text editor
3. Make your changes
4. Save the file
5. Refresh your browser to see changes

---

## ⚠️ Important Notes

### DO:
✅ Update text content, descriptions, and links  
✅ Add or remove items from arrays (skills, timeline, projects)  
✅ Change dates, titles, and organizations  
✅ Update social media links and contact information

### DON'T:
❌ Change the structure of the configuration objects  
❌ Remove required fields (id, title, category, etc.)  
❌ Change file names or move files to different locations  
❌ Modify the `as const` or type definitions at the end of files

---

## 🎨 Customization Examples

### Example 1: Update Your Email
**File:** `src/config/site.ts`
```typescript
contact: {
  email: 'charles@example.com',  // ← Change to your email
}
```

### Example 2: Add a New Timeline Event
**File:** `src/config/about.ts`
```typescript
timeline: [
  // ... existing events
  {
    id: '5',
    period: '2024',
    type: 'Achievement',
    icon: 'award',
    color: 'primary-gold',
    title: 'Won Design Award',
    organization: 'Design Awards 2024',
    location: 'Nairobi, Kenya',
    description: 'Received recognition for outstanding design work.',
  },
],
```

### Example 3: Update Homepage Tagline
**File:** `src/config/home.ts`
```typescript
hero: {
  greeting: 'Hi, I\'m',
  tagline: 'Your new custom tagline that describes what you do.',
},
```

---

## 📱 Social Media Links - Current Setup

### Professional Links (Gold Hover Color)
| Platform | Current Link |
|----------|-------------|
| **LinkedIn** | [charles-jasema-0a7b24210](https://www.linkedin.com/in/charles-jasema-0a7b24210) |
| **Twitter/X** | [@Charlesjasema](https://x.com/Charlesjasema) |
| **YouTube** | [CharlesJasema_Code_Design](https://www.youtube.com/@CharlesJasema_Code_Design) |
| **GitHub** | [charlesjasema](https://github.com/charlesjasema) |

### Music Ministry Links (Red Hover Color)
| Platform | Current Link |
|----------|-------------|
| **Instagram** | [@charlesjasemamusic](https://www.instagram.com/charlesjasemamusic) |
| **Twitter/X** | [@JasemaMusic](https://x.com/JasemaMusic) |
| **YouTube** | [CharlesJasemaMusic](https://www.youtube.com/@CharlesJasemaMusic) |
| **Facebook** | [Profile](https://www.facebook.com/share/1Aoqf2FLQ9/) |
| **TikTok** | [@charlesjasemamusic](https://www.tiktok.com/@charlesjasemamusic) |
| **Mdundo** | [Song 1377029](https://mdundo.com/song/1377029) |

---

## 🔄 After Making Changes

1. **Save the file** - Changes are automatically detected
2. **Check the browser** - The dev server will reload automatically
3. **Verify changes** - Navigate to the relevant page to see your updates
4. **No restart needed** - The development server handles updates automatically

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check for syntax errors** - Make sure all quotes and commas are in place
2. **Verify file location** - Ensure you're editing files in `src/config/`
3. **Check the console** - Open browser developer tools (F12) to see any errors
4. **Restart dev server** - If changes don't appear, restart with `npm run dev`

---

## 📚 Quick Reference

| What to Update | File to Edit | Section |
|----------------|--------------|---------|
| Contact Info | `site.ts` | `contact` |
| Social Media | `site.ts` | `professional` or `music` |
| Homepage Hero | `home.ts` | `hero` |
| Services | `home.ts` | `services` |
| About Bio | `about.ts` | `hero` |
| Skills | `about.ts` | `skills` |
| Timeline | `about.ts` | `timeline` |
| Projects | `portfolio.ts` | `portfolioProjects` array |

---

## 🚀 Next Steps

After updating your content:

1. ✅ Review all pages to ensure information is accurate
2. ✅ Update placeholder images with actual project images
3. ✅ Test all external links to ensure they work
4. ✅ Update CV download link when ready
5. ✅ Deploy to production when satisfied with changes

---

**Last Updated:** April 17, 2026  
**Version:** 2.0.0  
**Status:** ✅ All configuration files created and documented
