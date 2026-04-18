# How to Add Song Lyrics

This guide shows you how to add and update lyrics for your songs.

## 📍 Where to Add Lyrics

**File Location**: `src/config/lyrics.ts`

## 🎵 Adding Lyrics for a Song

### Step 1: Find the Song in lyrics.ts

Open `src/config/lyrics.ts` and find the song you want to add lyrics for.

### Step 2: Update the Verses Array

Each song has a `verses` array with sections like Verse 1, Chorus, Bridge, etc.

**Example Structure**:
```typescript
verses: [
  {
    type: 'Verse 1',
    lines: [
      'First line of verse 1',
      'Second line of verse 1',
      'Third line of verse 1',
    ],
  },
  {
    type: 'Chorus',
    lines: [
      'First line of chorus',
      'Second line of chorus',
      'Third line of chorus',
    ],
  },
  {
    type: 'Verse 2',
    lines: [
      'First line of verse 2',
      'Second line of verse 2',
    ],
  },
  {
    type: 'Chorus',
    lines: [
      'First line of chorus',
      'Second line of chorus',
      'Third line of chorus',
    ],
  },
  {
    type: 'Bridge',
    lines: [
      'First line of bridge',
      'Second line of bridge',
    ],
  },
  {
    type: 'Outro',
    lines: [
      'Final line',
    ],
  },
],
```

### Step 3: Common Section Types

Use these section types:
- `'Verse 1'`, `'Verse 2'`, `'Verse 3'`, etc.
- `'Chorus'`
- `'Pre-Chorus'`
- `'Bridge'`
- `'Intro'`
- `'Outro'`
- `'Interlude'`

### Step 4: Add Each Line

- Each line goes in the `lines` array
- Put each line in quotes
- Separate lines with commas
- Keep the original line breaks from your song

## 📝 Complete Example: "Kuyeyeju"

```typescript
{
  id: 'kuyeyeju',
  songTitle: 'Kuyeyeju',
  artist: 'Charles Jasema',
  album: 'Singles',
  releaseYear: '2015',
  language: 'Juba Arabic',
  featured: true,
  verses: [
    {
      type: 'Verse 1',
      lines: [
        'Kuyeyeju, kuyeyeju',
        'Ana ma bakhaf, ana ma bakhaf',
        'Yesu ma aya, Yesu ma aya',
        'Hu kwais, hu kwais',
      ],
    },
    {
      type: 'Chorus',
      lines: [
        'Kuyeyeju, kuyeyeju',
        'Yesu ma aya, Yesu ma aya',
        'Ana ma bakhaf, ana ma bakhaf',
        'Hu kwais, hu kwais',
      ],
    },
    {
      type: 'Verse 2',
      lines: [
        'Fi kul wakt, fi kul wakt',
        'Yesu ma aya, Yesu ma aya',
        'Ana ma bakhaf, ana ma bakhaf',
        'Hu kwais, hu kwais',
      ],
    },
    {
      type: 'Chorus',
      lines: [
        'Kuyeyeju, kuyeyeju',
        'Yesu ma aya, Yesu ma aya',
        'Ana ma bakhaf, ana ma bakhaf',
        'Hu kwais, hu kwais',
      ],
    },
  ],
  notes: 'My first song released in Yei, South Sudan. A worship anthem that started my music journey.',
  youtubeUrl: 'https://www.youtube.com/@CharlesJasemaMusic',
  mdundoUrl: 'https://mdundo.com/a/148492',
},
```

## 🎯 Quick Steps

1. **Open** `src/config/lyrics.ts`
2. **Find** your song in the `lyrics` array
3. **Replace** placeholder lyrics with real lyrics
4. **Add** each line in the `lines` array
5. **Save** the file
6. **Refresh** your browser to see changes

## 🌟 Tips

### Formatting
- Keep line breaks as they appear in your song
- Don't worry about rhyme alignment - the site handles that
- Use proper punctuation and capitalization

### Repeated Sections
- If the chorus repeats, copy the same chorus section multiple times
- Example: Verse 1 → Chorus → Verse 2 → Chorus → Bridge → Chorus

### Multiple Languages
- If your song has multiple languages, include all lyrics
- Update the `language` field to reflect this (e.g., "English/Juba Arabic")

### Notes Section
- Add background info about the song
- Explain the meaning or inspiration
- Share the story behind the song

## 📱 Features Your Fans Will Love

### Search
Fans can search for songs by:
- Song title
- Artist name
- Album name

### Read Lyrics
- Click any song card to open full lyrics
- Lyrics display in a beautiful modal
- Easy to read with clear sections

### Download
- Fans can download lyrics as .txt files
- Perfect for printing or offline reading
- One click download

### Links
- Direct links to YouTube videos
- Direct links to Mdundo for streaming
- Easy sharing with friends

## 🎵 Adding New Songs

To add a completely new song (not in the list yet):

1. **Copy** an existing song object
2. **Paste** it at the end of the `lyrics` array
3. **Update** all fields:
   - `id`: Use kebab-case (e.g., 'new-song-title')
   - `songTitle`: Full song title
   - `artist`: Your name or collaboration
   - `album`: Album name
   - `releaseYear`: Year released
   - `language`: Language(s) used
   - `featured`: true or false
   - `verses`: Add all lyrics
   - `notes`: Background info
   - `youtubeUrl`: YouTube link
   - `mdundoUrl`: Mdundo link

**Example**:
```typescript
{
  id: 'my-new-song',
  songTitle: 'My New Song',
  artist: 'Charles Jasema',
  album: 'Singles',
  releaseYear: '2026',
  language: 'English',
  featured: true,
  verses: [
    {
      type: 'Verse 1',
      lines: [
        'Add your lyrics here',
        'Line by line',
      ],
    },
    {
      type: 'Chorus',
      lines: [
        'Chorus lyrics here',
        'Line by line',
      ],
    },
  ],
  notes: 'Background story about this song.',
  youtubeUrl: 'https://www.youtube.com/@CharlesJasemaMusic',
  mdundoUrl: 'https://mdundo.com/a/148492',
},
```

## 🔧 Troubleshooting

### Lyrics Not Showing
- Check for syntax errors (missing commas, quotes)
- Make sure all brackets are closed
- Save the file and refresh browser

### Search Not Working
- Lyrics must be in the `lyrics` array
- Check the `songTitle`, `artist`, and `album` fields
- Make sure there are no typos

### Download Not Working
- Check that `verses` array has content
- Make sure each verse has `type` and `lines`
- Refresh the page and try again

## 📞 Need Help?

If you need help adding lyrics:
1. Check this guide again
2. Look at existing song examples in `lyrics.ts`
3. Make sure your syntax matches the examples
4. Test one song at a time

## 🎉 You're Ready!

Now you can:
- ✅ Add lyrics for all your songs
- ✅ Update existing lyrics
- ✅ Add new songs with lyrics
- ✅ Share lyrics with your fans

Your fans will love being able to read and download your song lyrics!

---

**File Location**: `src/config/lyrics.ts`  
**Lyrics Page**: http://localhost:3001/lyrics  
**Last Updated**: April 18, 2026
