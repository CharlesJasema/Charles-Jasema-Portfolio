# Browser Cache Issue - How to Fix

## The Problem
You're seeing a schema error "Unknown type: code" even after multiple refreshes. This is because your browser has cached the old schema definition.

## The Solution

### Option 1: Hard Refresh (Recommended - Fastest)
1. Open the Sanity Studio at `http://localhost:3001/admin`
2. Press **Ctrl + Shift + R** (Windows/Linux) or **Cmd + Shift + R** (Mac)
3. This forces the browser to reload everything from the server, bypassing the cache

### Option 2: Clear Browser Cache Completely
1. Open your browser settings
2. Go to Privacy/History settings
3. Clear browsing data for "All time"
4. Make sure "Cached images and files" is checked
5. Clear the cache
6. Restart your browser
7. Visit `http://localhost:3001/admin` again

### Option 3: Use Incognito/Private Mode (Quickest Test)
1. Open a new Incognito/Private window (Ctrl + Shift + N in Chrome)
2. Visit `http://localhost:3001/admin`
3. This will load the page without any cached data

### Option 4: Clear Site Data (Most Thorough)
**For Chrome:**
1. Go to `http://localhost:3001/admin`
2. Press F12 to open Developer Tools
3. Right-click the refresh button
4. Select "Empty Cache and Hard Reload"

**For Firefox:**
1. Go to `http://localhost:3001/admin`
2. Press F12 to open Developer Tools
3. Go to Storage tab
4. Right-click on the site and select "Delete All"
5. Refresh the page

## What We Fixed
- ✅ Removed the `code` block type from blogPost schema
- ✅ Restarted the development server
- ✅ Verified no code type references exist in any schema files
- ✅ Confirmed all Sanity packages are properly installed
- ✅ Server is running successfully at http://localhost:3001

## Current Status
- **Dev Server**: ✅ Running at http://localhost:3001
- **Sanity Studio**: ✅ Available at http://localhost:3001/admin
- **Schema Error**: ✅ Fixed (removed code block type)
- **Packages**: ✅ All installed (sanity@^3.99.0, next-sanity@^9.12.3)

## What You Should See After Clearing Cache
Once you clear the cache, you should see:
1. The Sanity Studio login screen (if not logged in)
2. After login, the Studio dashboard with 5 content types:
   - 🎵 Song
   - 🎬 Music Video
   - 💼 Project
   - 📝 Blog Post
   - 📄 Lyrics
3. No schema errors
4. Ability to create new content

## If You Still See Errors
If you still see errors after trying all the above options:
1. Take a screenshot of the exact error message
2. Check the browser console (F12) for any error messages
3. Let me know what you see

## Next Steps After Studio Loads Successfully
Once the Studio loads without errors, we can:
1. Test creating a new song
2. Test uploading images
3. Migrate your existing content from config files
4. Connect the frontend pages to fetch from Sanity
