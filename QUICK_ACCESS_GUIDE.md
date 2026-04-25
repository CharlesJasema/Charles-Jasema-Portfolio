# 🚀 Quick Access Guide - Charles Jasema Portfolio

**Server Status**: ✅ Running  
**Last Updated**: April 25, 2026

---

## 🌐 Website Links (Local Development)

### Main Website
**URL**: http://localhost:3001

**What you'll see**:
- Homepage with your introduction
- Navigation menu (About, Music, Lyrics, Portfolio, Blog, Booking, Contact, Support)
- Dark/light mode toggle
- Professional design

---

### Admin Dashboard
**URL**: http://localhost:3001/admin

**What you'll see**:
- Analytics overview (ready for Google Analytics data)
- Content statistics (songs, lyrics, videos)
- Quick actions section
- Links to external dashboards
- Content management instructions
- Documentation links

**Features**:
- View system status
- Access content editing guides
- Quick links to all configuration files
- Instructions for updating content

---

## 📱 All Pages You Can Visit

### Public Pages
1. **Homepage**: http://localhost:3001
2. **About**: http://localhost:3001/about
3. **Music**: http://localhost:3001/music
4. **Lyrics**: http://localhost:3001/lyrics
5. **Portfolio**: http://localhost:3001/portfolio
6. **Blog**: http://localhost:3001/blog
7. **Booking**: http://localhost:3001/booking
8. **Contact**: http://localhost:3001/contact
9. **Support (Donations)**: http://localhost:3001/support

### Admin Pages
10. **Admin Dashboard**: http://localhost:3001/admin

---

## 🎯 How to Update Content Without Code

### Method 1: Using the Admin Dashboard (Recommended)

1. **Open Admin Dashboard**: http://localhost:3001/admin
2. **Click on "Content Management" section**
3. **Follow the instructions** for what you want to update:
   - Add new song → See "Add New Song" instructions
   - Add new lyrics → See "Add New Lyrics" instructions
   - Update images → See "Update Images" instructions

### Method 2: Using Configuration Files

The admin dashboard will guide you to edit these files in VS Code:

#### To Add/Update Songs:
**File**: `src/config/music.ts`
1. Open file in VS Code
2. Find the `audioSongs` array
3. Copy an existing song object
4. Paste and update the details
5. Save file
6. Website updates automatically!

#### To Add/Update Lyrics:
**File**: `src/config/lyrics.ts`
1. Open file in VS Code
2. Find the `lyrics` array
3. Copy an existing lyrics object
4. Paste and update the verses
5. Save file
6. Website updates automatically!

#### To Update About Page:
**File**: `src/config/about.ts`
1. Open file in VS Code
2. Update your bio, education, experience
3. Save file
4. Website updates automatically!

#### To Update Contact Info:
**File**: `src/config/contact.ts`
1. Open file in VS Code
2. Update email, phone, social links
3. Save file
4. Website updates automatically!

---

## 🎨 Admin Dashboard Features

### What You Can Do:
1. **View Statistics**:
   - Total songs (13)
   - Total lyrics (10)
   - Total videos (6)
   - Pages available (9)

2. **Quick Actions**:
   - Add new song
   - Add new lyrics
   - Update images
   - Write blog post
   - View analytics

3. **External Dashboards** (when you add them):
   - Google Analytics (track visitors)
   - Flutterwave Dashboard (track donations)
   - PayPal Dashboard (track donations)

4. **Content Management**:
   - Step-by-step instructions
   - File locations
   - Examples
   - Best practices

5. **Documentation**:
   - Quick links to all guides
   - Setup instructions
   - Deployment guide

---

## 📝 Quick Content Updates

### Add a New Song (5 minutes)

1. Open `src/config/music.ts` in VS Code
2. Find the `audioSongs` array (around line 100)
3. Copy this template:
```typescript
{
  id: 'audio14',
  title: 'Your New Song Title',
  album: 'Singles',
  duration: '4:30',
  releaseDate: '2026',
  description: 'Description of your song',
  mdundoUrl: 'https://mdundo.com/a/148492',
  directUpload: null,
  featured: true,
  isNew: true,
},
```
4. Paste at the end of the array
5. Update the details
6. Save file
7. Check http://localhost:3001/music

### Add New Lyrics (10 minutes)

1. Open `src/config/lyrics.ts` in VS Code
2. Find the `lyrics` array (around line 20)
3. Copy an existing lyrics object
4. Update:
   - `id`: unique identifier (e.g., 'my-new-song')
   - `songTitle`: Your song title
   - `releaseYear`: Year released
   - `verses`: Array of verse objects
5. Save file
6. Check http://localhost:3001/lyrics

### Update Your Bio (2 minutes)

1. Open `src/config/about.ts` in VS Code
2. Find the `bio` section
3. Update your story
4. Save file
5. Check http://localhost:3001/about

---

## 🔧 How to Start/Stop the Server

### Start the Server:
```bash
cd charles-jasema-portfolio
npm run dev
```
**Result**: Server runs at http://localhost:3001

### Stop the Server:
Press `Ctrl + C` in the terminal

### Check if Server is Running:
Open http://localhost:3001 in your browser
- If it loads → Server is running ✅
- If it doesn't load → Server is stopped ❌

---

## 🎯 Common Tasks

### Task 1: View Your Website
1. Make sure server is running
2. Open browser
3. Go to http://localhost:3001
4. Explore all pages!

### Task 2: Access Admin Dashboard
1. Make sure server is running
2. Open browser
3. Go to http://localhost:3001/admin
4. Follow the instructions there

### Task 3: Test Donation Page
1. Make sure server is running
2. Go to http://localhost:3001/support
3. Verify your Mobile Money numbers are correct
4. Verify your bank details are correct

### Task 4: Test Music Page
1. Go to http://localhost:3001/music
2. Check all 13 songs are listed
3. Check NEW badges appear on latest songs
4. Click streaming links to verify they work

### Task 5: Test Lyrics Page
1. Go to http://localhost:3001/lyrics
2. Check all 10 lyrics are listed
3. Try the search feature
4. Try downloading a lyrics file

---

## 📱 Mobile Testing

### Test on Your Phone:
1. Make sure your phone is on the same WiFi as your computer
2. Find your computer's IP address:
   - Windows: Open Command Prompt, type `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)
3. On your phone, open browser
4. Go to `http://YOUR-IP-ADDRESS:3001`
   - Example: http://192.168.1.100:3001
5. Test all features on mobile!

---

## 🎨 Customization Without Code

### Change Colors (Advanced):
**File**: `tailwind.config.ts`
- Update color values
- Save file
- Website updates automatically

### Change Site Name:
**File**: `src/config/site.ts`
- Update `name` field
- Save file
- Website updates automatically

### Change Social Links:
**File**: `src/config/site.ts`
- Update `social` section
- Save file
- Website updates automatically

---

## 📞 Need Help?

### Documentation Files:
- **DEPLOYMENT_GUIDE.md** - How to deploy
- **ADD_YOUR_SONGS.md** - How to add songs
- **ADD_YOUR_LYRICS.md** - How to add lyrics
- **ADMIN_SYSTEM_GUIDE.md** - Admin dashboard guide
- **SEO_GUIDE.md** - Google optimization

### In the Admin Dashboard:
- Go to http://localhost:3001/admin
- Scroll to "Documentation" section
- Click on any guide for detailed instructions

---

## ✅ Quick Checklist

### Before Exploring:
- [x] Server is running (http://localhost:3001)
- [ ] Opened homepage in browser
- [ ] Opened admin dashboard (http://localhost:3001/admin)
- [ ] Tested all pages
- [ ] Verified donation details
- [ ] Checked music page
- [ ] Checked lyrics page

### After Exploring:
- [ ] Understand how to add songs
- [ ] Understand how to add lyrics
- [ ] Understand how to update content
- [ ] Ready to deploy!

---

## 🚀 Next Steps

1. **Explore Now**:
   - Open http://localhost:3001
   - Visit all pages
   - Check admin dashboard
   - Test all features

2. **Make Updates**:
   - Try adding a new song
   - Try updating your bio
   - See changes instantly!

3. **Deploy**:
   - When ready, follow DEPLOYMENT_GUIDE.md
   - Deploy to Vercel (5 minutes)
   - Share your live URL!

---

## 🎉 You're All Set!

**Your Website**: http://localhost:3001  
**Admin Dashboard**: http://localhost:3001/admin  
**Server Status**: ✅ Running

**Start exploring your website now!** 🚀

---

**Pro Tip**: Keep this guide open while exploring. It has all the links and instructions you need!
