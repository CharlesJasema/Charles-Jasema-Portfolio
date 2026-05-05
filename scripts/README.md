# Content Migration Scripts

This directory contains scripts for migrating content from static config files to Sanity CMS.

## Prerequisites

Before running any migration scripts, ensure you have:

1. **Environment Variables Set Up**
   
   Create a `.env.local` file in the project root with:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token
   SANITY_REVALIDATION_SECRET=your_secret_key
   ```

2. **Sanity Write Token**
   
   Get a write token from your Sanity project:
   - Go to https://sanity.io/manage
   - Select your project
   - Go to API → Tokens
   - Create a new token with "Editor" permissions
   - Copy the token to `SANITY_API_TOKEN` in `.env.local`

3. **Dependencies Installed**
   
   ```bash
   npm install
   ```

## Available Migration Scripts

### 1. Migrate Music Content (Songs & Videos)

Migrates all 13 songs, music videos, and lyrical videos from `src/config/music.ts` to Sanity.

```bash
npm run migrate:music
```

**What it migrates:**
- ✅ 13 audio songs with metadata (title, description, duration, release date, album, Mdundo URL)
- ✅ 1 music video
- ✅ 5 lyrical videos
- ✅ Featured status, new release flags, collaboration flags

**Note:** Album art images need to be uploaded manually through Sanity Studio after migration.

### 2. Migrate All Content

Runs all migration scripts in sequence:

```bash
npm run migrate:all
```

## Migration Process

### Step 1: Backup Current Data (Optional)

If you have existing data in Sanity, export it first:

```bash
npx sanity dataset export production backup.tar.gz
```

### Step 2: Run Migration

```bash
npm run migrate:music
```

### Step 3: Verify in Sanity Studio

1. Open Sanity Studio: `http://localhost:3001/admin`
2. Check that all content was migrated correctly
3. Upload album art images for songs
4. Upload thumbnail images for videos

### Step 4: Test on Website

1. Start the dev server: `npm run dev`
2. Visit the music page: `http://localhost:3001/music`
3. Verify all songs and videos display correctly

## Troubleshooting

### Error: "Missing required environment variables"

Make sure your `.env.local` file contains all required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

### Error: "Insufficient permissions"

Your `SANITY_API_TOKEN` needs write permissions. Create a new token with "Editor" role.

### Error: "Document already exists"

If you run the migration twice, you'll get duplicate content. To fix:
1. Delete all documents in Sanity Studio
2. Or use the Sanity CLI to clear the dataset:
   ```bash
   npx sanity dataset delete production
   npx sanity dataset create production
   ```

### Migration Fails Partway Through

The script will show a summary of successful and failed items. You can:
1. Fix the errors in the source data
2. Delete successfully migrated items from Sanity
3. Re-run the migration

## Post-Migration Tasks

After successful migration:

1. **Upload Media Assets**
   - Add album art for all songs
   - Add thumbnails for videos

2. **Verify Data Integrity**
   - Check all songs have correct metadata
   - Verify YouTube URLs work
   - Test Mdundo links

3. **Configure Webhooks**
   - Set up revalidation webhook in Sanity project settings
   - Webhook URL: `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`

4. **Test Real-Time Updates**
   - Edit a song in Sanity Studio
   - Wait 60 seconds
   - Verify changes appear on the website

## Migration Script Details

### migrate-music.ts

**Source:** `src/config/music.ts`

**Target Schemas:**
- `song` - Audio songs
- `musicVideo` - Music videos and lyrical videos

**Features:**
- ✅ Preserves all metadata
- ✅ Handles featured/new/collaboration flags
- ✅ Error handling with detailed reporting
- ✅ Migration summary with statistics

**Limitations:**
- ❌ Does not migrate images (must be uploaded manually)
- ❌ Does not migrate audio files (links to Mdundo)

## Need Help?

If you encounter issues:
1. Check the error messages in the console
2. Verify your environment variables
3. Check Sanity project permissions
4. Review the migration summary for specific failures
