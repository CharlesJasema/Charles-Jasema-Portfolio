# How to Add Your 12 Songs to the Portfolio

## 📋 Your 12 Singles

Based on your profile, you have released **12 singles**. Here's how to add them all:

---

## 🎵 Currently Added (2/12)

### 1. Kuyeyeju ✅
- **Release Date**: 2015
- **Location**: Yei, South Sudan
- **Status**: First song
- **Mdundo**: https://mdundo.com/a/148492

### 2. I Am Alive in You ✅
- **Release Date**: 2024
- **Type**: Collaboration with Ugandan and Rwandan artists
- **Status**: Recent release
- **Mdundo**: https://mdundo.com/a/148492

---

## 📝 How to Add the Remaining 10 Songs

### Step 1: Get Song Information
For each of your remaining 10 songs, gather:
- Song title
- Release year
- Album name (if applicable)
- Song duration (in minutes:seconds format)
- Brief description
- Mdundo link (if available)
- YouTube link (if available)

### Step 2: Open the Music Config File
Edit: `src/config/music.ts`

### Step 3: Add Each Song
Find the `audioSongs` array and add your songs. Here's the template:

```typescript
{
  id: 'audio3',                    // Unique ID (audio3, audio4, etc.)
  title: 'Song Title Here',        // Your song title
  album: 'Singles',                // Album name
  duration: '4:30',                // Song duration
  releaseDate: '2023',             // Release year
  description: 'Brief description of the song',
  mdundoUrl: 'https://mdundo.com/a/148492',  // Mdundo link
  directUpload: null,              // Leave null for now
  featured: false,                 // Set to true for featured songs
  isCollaboration: false,          // Set to true if collaboration
},
```

### Step 4: Example - Adding Song 3

```typescript
{
  id: 'audio3',
  title: 'Your Third Song Title',
  album: 'Singles',
  duration: '4:15',
  releaseDate: '2023',
  description: 'Description of your third song',
  mdundoUrl: 'https://mdundo.com/a/148492',
  directUpload: null,
  featured: false,
  isCollaboration: false,
},
```

---

## 🎬 How to Add Your YouTube Videos

### For Music Videos (Full Production)

Edit the `musicVideos` array in `src/config/music.ts`:

```typescript
{
  id: 'mv2',                                    // Unique ID
  title: 'Your Video Title',                   // Video title
  description: 'Description of the video',     // Description
  youtubeUrl: 'https://youtu.be/VIDEO_ID',    // YouTube URL
  youtubeId: 'VIDEO_ID',                       // Extract from URL
  releaseDate: '2024',                         // Release date
  views: '1.2K+',                              // View count
  category: 'Music Video',                     // Category
  featured: false,                             // Featured status
},
```

### For Lyrical Videos (Lyrics on Screen)

Edit the `lyricalVideos` array in `src/config/music.ts`:

```typescript
{
  id: 'lv2',                                    // Unique ID
  title: 'Your Lyrical Video Title',           // Video title
  description: 'Description of the video',     // Description
  youtubeUrl: 'https://youtu.be/VIDEO_ID',    // YouTube URL
  youtubeId: 'VIDEO_ID',                       // Extract from URL
  releaseDate: '2024',                         // Release date
  views: '800+',                               // View count
  category: 'Lyrical Video',                   // Category
  featured: false,                             // Featured status
},
```

### How to Get YouTube Video ID

1. Go to your YouTube video
2. Copy the URL: `https://youtu.be/5LJ2kqwd5jM?si=6qsdFekF28FAZw-j`
3. Extract the ID: `5LJ2kqwd5jM`
4. Use in config: `youtubeId: '5LJ2kqwd5jM'`

---

## 📊 Complete Song List Template

Copy this template and fill in your song details:

```typescript
// AUDIO SONGS - All 12 Singles
audioSongs: [
  {
    id: 'audio1',
    title: 'Kuyeyeju',
    album: 'Singles',
    duration: '4:15',
    releaseDate: '2015',
    description: 'My first song released in Yei, South Sudan. A worship anthem that started my music journey.',
    mdundoUrl: 'https://mdundo.com/a/148492',
    directUpload: null,
    featured: true,
    isFirstSong: true,
  },
  {
    id: 'audio2',
    title: 'I Am Alive in You',
    album: 'Collaborations',
    duration: '4:45',
    releaseDate: '2024',
    description: 'Collaboration with Ugandan and Rwandan artists - A powerful declaration of life in Christ.',
    mdundoUrl: 'https://mdundo.com/a/148492',
    directUpload: null,
    featured: true,
    isCollaboration: true,
  },
  // ADD YOUR REMAINING 10 SONGS HERE
  {
    id: 'audio3',
    title: 'Song Title 3',
    album: 'Singles',
    duration: '0:00',
    releaseDate: '2023',
    description: 'Description of song 3',
    mdundoUrl: 'https://mdundo.com/a/148492',
    directUpload: null,
    featured: false,
  },
  // ... Continue for audio4 through audio12
],
```

---

## 🎯 Quick Checklist

For each song, make sure you have:
- [ ] Song title
- [ ] Release year
- [ ] Song duration
- [ ] Brief description
- [ ] Mdundo link (or YouTube link)
- [ ] Album name
- [ ] Is it featured? (true/false)
- [ ] Is it a collaboration? (true/false)

---

## 💡 Tips

### For Mdundo Links
- All your songs should have Mdundo links
- Use the same Mdundo profile link for all songs
- Or get individual song links from Mdundo

### For YouTube Videos
- Get video IDs from your YouTube channel
- Use short URLs: `https://youtu.be/VIDEO_ID`
- Add timestamps if needed: `https://youtu.be/VIDEO_ID?t=120`

### For Descriptions
- Keep descriptions brief (1-2 sentences)
- Mention key themes (worship, faith, hope, etc.)
- Include collaboration info if applicable

### For Featured Songs
- Set `featured: true` for your best songs
- These will appear at the top of the list
- Recommended: 2-3 featured songs

---

## 🚀 After Adding Songs

1. **Save the file**: `src/config/music.ts`
2. **Check for errors**: Look at the terminal for any errors
3. **Refresh browser**: Go to http://localhost:3001/music
4. **Verify display**: Check that all songs appear correctly
5. **Test links**: Click on Mdundo links to verify they work

---

## 📞 Need Help?

### Common Issues

**Songs not appearing?**
- Check for syntax errors (missing commas, quotes)
- Verify all required fields are filled
- Check browser console (F12) for errors

**Links not working?**
- Verify Mdundo/YouTube URLs are correct
- Check that URLs are complete
- Test links in a new tab

**Styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Try different browser

---

## 📝 Example: Adding All 12 Songs

Here's a complete example with all 12 songs:

```typescript
audioSongs: [
  {
    id: 'audio1',
    title: 'Kuyeyeju',
    album: 'Singles',
    duration: '4:15',
    releaseDate: '2015',
    description: 'First song released in Yei, South Sudan.',
    mdundoUrl: 'https://mdundo.com/a/148492',
    directUpload: null,
    featured: true,
    isFirstSong: true,
  },
  {
    id: 'audio2',
    title: 'I Am Alive in You',
    album: 'Collaborations',
    duration: '4:45',
    releaseDate: '2024',
    description: 'Collaboration with Ugandan and Rwandan artists.',
    mdundoUrl: 'https://mdundo.com/a/148492',
    directUpload: null,
    featured: true,
    isCollaboration: true,
  },
  {
    id: 'audio3',
    title: 'Song 3 Title',
    album: 'Singles',
    duration: '4:30',
    releaseDate: '2023',
    description: 'Description here',
    mdundoUrl: 'https://mdundo.com/a/148492',
    directUpload: null,
    featured: false,
  },
  // ... Continue for audio4 through audio12
],
```

---

## ✅ Completion Checklist

- [ ] Added all 12 song titles
- [ ] Added all release dates
- [ ] Added all song durations
- [ ] Added all descriptions
- [ ] Added all Mdundo links
- [ ] Marked featured songs
- [ ] Marked collaboration songs
- [ ] Marked first song
- [ ] Tested all links
- [ ] Verified display on music page

---

**Ready to add your songs?**

1. Open `src/config/music.ts`
2. Find the `audioSongs` array
3. Add your remaining 10 songs
4. Save and refresh browser
5. Check http://localhost:3001/music

---

**Last Updated**: April 18, 2026  
**Version**: 1.0.0  
**Status**: ✅ Ready for song additions
