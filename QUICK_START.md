# 🚀 Quick Start Guide: Sanity CMS Integration

This guide will help you get started with your new Sanity CMS integration in under 10 minutes.

## ✅ Prerequisites Checklist

Before you begin, make sure you have:
- [ ] Node.js installed (v18 or higher)
- [ ] A Sanity account (free at https://sanity.io)
- [ ] Your Sanity project ID and dataset name
- [ ] A Sanity API token with write permissions

---

## 📦 Step 1: Install Dependencies (2 minutes)

```bash
cd charles-jasema-portfolio
npm install
```

This installs all required packages including:
- `sanity` - Sanity Studio
- `next-sanity` - Next.js integration
- `@sanity/image-url` - Image optimization
- `@sanity/client` - API client for migrations
- `tsx` - TypeScript execution for migration scripts

---

## 🔑 Step 2: Configure Environment Variables (1 minute)

Create or update `.env.local` in the project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token_here
SANITY_REVALIDATION_SECRET=your_random_secret_key
```

### How to Get These Values:

1. **Project ID & Dataset**:
   - Go to https://sanity.io/manage
   - Select your project
   - Copy the Project ID from the dashboard
   - Dataset is usually `production`

2. **API Token**:
   - In your Sanity project, go to **API** → **Tokens**
   - Click **Add API Token**
   - Name it "Migration Token" or "Write Token"
   - Select **Editor** permissions
   - Copy the token immediately (you won't see it again!)

3. **Revalidation Secret**:
   - Generate a random string (e.g., use a password generator)
   - This is used to secure your webhook endpoint

---

## 🎨 Step 3: Access Sanity Studio (1 minute)

Start the development server:

```bash
npm run dev
```

Then open your browser to:
```
http://localhost:3001/admin
```

You should see the Sanity Studio interface with:
- 📀 Songs
- 🎬 Music Videos
- 💼 Portfolio Projects
- 📝 Blog Posts
- 🎵 Lyrics

**Note**: The Studio is currently empty. We'll populate it in the next step!

---

## 📊 Step 4: Migrate Your Content (3 minutes)

Run the migration script to transfer all your songs and videos from the config file to Sanity:

```bash
npm run migrate:music
```

You should see output like:

```
🚀 SANITY CMS MIGRATION: MUSIC CONTENT
============================================================

✅ Environment variables verified
Project ID: abc123xyz
Dataset: production

📀 Migrating Songs...

✅ Migrated: Kuyeyeju (2015)
✅ Migrated: Jesus You Are Lord (2015)
✅ Migrated: Happiness Is Killing Me Jesus (2015)
... (10 more songs)

🎬 Migrating Music Videos...

✅ Migrated: I Don't Belong Here (Music Video)

🎵 Migrating Lyrical Videos...

✅ Migrated: Where Will You Be (Lyrical Video)
✅ Migrated: Mercy (Lyrical Video)
... (3 more videos)

============================================================
📊 MIGRATION SUMMARY
============================================================

Total items: 19
✅ Successful: 19
❌ Failed: 0

By Type:
  song: 13 successful, 0 failed
  musicVideo: 1 successful, 0 failed
  lyricalVideo: 5 successful, 0 failed

============================================================
```

---

## 🖼️ Step 5: Add Images (2 minutes)

The migration script doesn't upload images (they need to be added manually). Let's add them now:

1. **Go back to Sanity Studio**: `http://localhost:3001/admin`

2. **Click on "Songs"** in the sidebar

3. **Open any song** (e.g., "Kuyeyeju")

4. **Scroll to "Album Art"** field

5. **Click "Upload"** and select an image file

6. **Add alt text** (e.g., "Kuyeyeju album art")

7. **Click "Publish"**

8. **Repeat for other songs and videos**

**Tip**: You can bulk upload images later. For now, just add 1-2 to test!

---

## 🎵 Step 6: View Your Music Page (1 minute)

With the dev server still running, open:

```
http://localhost:3001/music
```

You should now see:
- ✅ All 13 songs from Sanity
- ✅ All 6 videos from Sanity
- ✅ Album art for songs you uploaded
- ✅ Video thumbnails (if uploaded)

**Try this**: Edit a song in Sanity Studio, wait 60 seconds, then refresh the music page. Your changes should appear!

---

## 🎉 Success! What's Next?

You now have a fully functional CMS! Here's what you can do:

### Immediate Actions:
1. **Add more images** - Upload album art for all songs
2. **Create new content** - Add a new song or video in Studio
3. **Test updates** - Edit content and see it update on the site

### Next Steps:
1. **Migrate other pages** - Portfolio, Blog, Home
2. **Configure webhook** - For instant updates (instead of 60s delay)
3. **Deploy to production** - Push your changes live

---

## 🔧 Common Issues & Solutions

### Issue: "Missing environment variables"
**Solution**: Check that `.env.local` exists and has all 4 variables

### Issue: "Migration fails with 401 error"
**Solution**: Your API token doesn't have write permissions. Create a new token with "Editor" role

### Issue: "Content not updating on website"
**Solution**: Wait 60 seconds after publishing in Studio (ISR revalidation time)

### Issue: "Images not displaying"
**Solution**: Make sure you uploaded images in Sanity Studio and clicked "Publish"

### Issue: "Studio shows 'Project not found'"
**Solution**: Double-check your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`

---

## 📚 Learn More

- **Migration Details**: See `scripts/README.md`
- **Implementation Status**: See `IMPLEMENTATION_STATUS.md`
- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js ISR**: https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration

---

## 🆘 Need Help?

If you're stuck:
1. Check the error message carefully
2. Review the troubleshooting section above
3. Check the detailed docs in `scripts/README.md`
4. Verify your environment variables

---

**Congratulations!** 🎊 You've successfully set up Sanity CMS for your portfolio. Your music content is now managed through a professional CMS interface!

**Next**: Run `npm run migrate:music` if you haven't already, then start adding images in Sanity Studio.
