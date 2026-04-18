# Music Media Upload & Management Guide

## 📁 Media Folder Structure

Your media files are organized in `/public/media/`:

```
public/media/
├── audio/          # Audio files (.mp3, .wav, .m4a)
└── videos/         # Video files (.mp4, .webm, .mov)
```

---

## 🎵 How to Add Your Music

### Option 1: Link to External Platforms (Current Setup)
Your music is currently linked to:
- **YouTube**: https://www.youtube.com/@CharlesJasemaMusic
- **Mdundo**: https://mdundo.com/a/148492

These links are configured in `src/config/music.ts` and display directly on the Music page.

### Option 2: Upload Audio Files Directly

#### Step 1: Prepare Your Audio Files
- Format: MP3, WAV, or M4A
- Bitrate: 128-320 kbps (MP3)
- Sample Rate: 44.1 kHz or 48 kHz
- File Size: Keep under 10MB for optimal loading

#### Step 2: Upload to System
1. Place audio files in: `/public/media/audio/`
2. Name files descriptively: `song-title.mp3`

#### Step 3: Update Music Config
Edit `src/config/music.ts` and add the file path:

```typescript
{
  id: 'audio1',
  title: 'Your Song Title',
  album: 'Singles',
  duration: '4:15',
  releaseDate: '2024',
  description: 'Song description',
  mdundoUrl: 'https://mdundo.com/a/148492',
  directUpload: '/media/audio/your-song-title.mp3',  // ← Add this
  featured: true,
},
```

#### Step 4: Update Music Page
The music page will automatically display the audio player with:
- Play/Pause button
- Progress bar
- Volume control
- Download option

---

## 🎬 How to Add Music Videos

### Option 1: Link to YouTube (Current Setup)
Videos are linked directly to YouTube:
- **Music Videos**: Full production videos
- **Lyrical Videos**: Videos with lyrics on screen

Update in `src/config/music.ts`:

```typescript
musicVideos: [
  {
    id: 'mv1',
    title: 'Video Title',
    youtubeUrl: 'https://youtu.be/VIDEO_ID',
    youtubeId: 'VIDEO_ID',  // Extract from URL
    releaseDate: '2024',
    views: '1.2K+',
    featured: true,
  },
],
```

**How to get YouTube Video ID:**
- URL: `https://youtu.be/5LJ2kqwd5jM?si=6qsdFekF28FAZw-j`
- Video ID: `5LJ2kqwd5jM`

### Option 2: Upload Video Files Directly

#### Step 1: Prepare Video Files
- Format: MP4 (H.264 codec)
- Resolution: 1080p (1920x1080) recommended
- Frame Rate: 30fps or 60fps
- File Size: Keep under 100MB for optimal loading
- Bitrate: 5-8 Mbps

#### Step 2: Upload to System
1. Place video files in: `/public/media/videos/`
2. Name files descriptively: `video-title.mp4`

#### Step 3: Update Music Config
```typescript
musicVideos: [
  {
    id: 'mv1',
    title: 'Video Title',
    youtubeUrl: null,
    youtubeId: null,
    directUpload: '/media/videos/video-title.mp4',  // ← Add this
    releaseDate: '2024',
    views: '1.2K+',
    featured: true,
  },
],
```

---

## 📊 Current Music Configuration

### Real Songs (12 Singles)
All 12 songs are configured in `src/config/music.ts`:

1. **Kuyeyeju** (2015) - First song, released in Yei, South Sudan
2. **I Am Alive in You** (2024) - Collaboration with Ugandan and Rwandan artists
3-12. Additional singles (add details as needed)

### Real Videos
- **Music Videos**: Full production videos (2+)
  - "I Don't Belong Here" - https://youtu.be/5LJ2kqwd5jM
  - More videos to be added
  
- **Lyrical Videos**: Videos with lyrics on screen (2+)
  - "Worship Team - Charles Jasema" - https://youtu.be/lyewr3qkV1s
  - More videos to be added

### Streaming Platforms
- YouTube Music: https://www.youtube.com/@CharlesJasemaMusic
- Mdundo: https://mdundo.com/a/148492
- Spotify: (Add when available)
- Apple Music: (Add when available)

---

## ⚡ Performance Optimization

### Image Optimization
- ✅ Automatic WebP/AVIF conversion
- ✅ Responsive image sizing
- ✅ Lazy loading enabled
- ✅ 1-year cache for static images

### Audio Optimization
- ✅ Streaming from CDN
- ✅ Browser caching enabled
- ✅ Compressed audio formats
- ✅ Progressive loading

### Video Optimization
- ✅ YouTube embedding (no local storage needed)
- ✅ Lazy loading for video players
- ✅ Responsive video sizing
- ✅ Fallback thumbnails

### Site-Wide Performance
- ✅ Code splitting by route
- ✅ Minified CSS/JavaScript
- ✅ Gzip compression enabled
- ✅ Browser caching headers
- ✅ CDN-ready configuration

### Loading Speed Targets
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s

---

## 🎯 Best Practices

### For Audio Files
1. **Use MP3 format** - Best compatibility and file size
2. **Bitrate**: 192-256 kbps for good quality
3. **Metadata**: Include ID3 tags (title, artist, album)
4. **File naming**: Use lowercase, hyphens (e.g., `my-song-title.mp3`)

### For Video Files
1. **Use MP4 format** - Best compatibility
2. **Resolution**: 1080p for YouTube, 720p for web
3. **Codec**: H.264 video, AAC audio
4. **Thumbnails**: Create custom thumbnails for better engagement

### For YouTube Links
1. **Use short URLs**: `https://youtu.be/VIDEO_ID`
2. **Add timestamps**: `https://youtu.be/VIDEO_ID?t=120` (starts at 2:00)
3. **Create playlists**: Group related videos together

---

## 📝 Configuration Examples

### Adding a New Song
```typescript
{
  id: 'audio13',
  title: 'New Song Title',
  album: 'Singles',
  duration: '4:30',
  releaseDate: '2024',
  description: 'Description of the song',
  mdundoUrl: 'https://mdundo.com/song/SONG_ID',
  directUpload: '/media/audio/new-song-title.mp3',
  featured: true,
  isCollaboration: false,
},
```

### Adding a New Music Video
```typescript
{
  id: 'mv3',
  title: 'New Music Video',
  description: 'Description of the video',
  youtubeUrl: 'https://youtu.be/NEW_VIDEO_ID',
  youtubeId: 'NEW_VIDEO_ID',
  releaseDate: '2024',
  views: '0',
  category: 'Music Video',
  featured: true,
},
```

### Adding a New Lyrical Video
```typescript
{
  id: 'lv2',
  title: 'New Lyrical Video',
  description: 'Lyrical video with worship lyrics',
  youtubeUrl: 'https://youtu.be/NEW_VIDEO_ID',
  youtubeId: 'NEW_VIDEO_ID',
  releaseDate: '2024',
  views: '0',
  category: 'Lyrical Video',
  featured: false,
},
```

---

## 🚀 Next Steps

1. **Add All 12 Songs**: Update `src/config/music.ts` with all song details
2. **Add YouTube Links**: Get video IDs from your YouTube channel
3. **Upload Direct Files**: Place audio/video files in `/public/media/` folders
4. **Test Performance**: Check loading times on different devices
5. **Monitor Analytics**: Track which songs/videos get the most plays

---

## 📞 Support

For questions about:
- **Audio formats**: Check audio codec compatibility
- **Video formats**: Ensure H.264 codec for best compatibility
- **YouTube integration**: Visit https://www.youtube.com/
- **Mdundo integration**: Visit https://mdundo.com/

---

**Last Updated**: April 18, 2026  
**Version**: 1.0.0  
**Status**: ✅ Ready for media uploads
