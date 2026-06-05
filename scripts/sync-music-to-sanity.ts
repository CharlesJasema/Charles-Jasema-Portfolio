/**
 * Sync Script: Music Configuration to Sanity CMS
 * 
 * This script syncs all 7 songs from src/config/music.ts to Sanity CMS.
 * It creates or updates songs in Sanity based on the configuration.
 * 
 * Usage:
 *   npx ts-node scripts/sync-music-to-sanity.ts
 * 
 * Requirements:
 *   - SANITY_API_TOKEN environment variable must be set in .env.local
 *   - Sanity project must be properly configured
 */

import { createClient } from '@sanity/client';
import { musicConfig } from '../src/config/music';

// Initialize Sanity client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

interface SyncResult {
  success: boolean;
  action: 'created' | 'updated' | 'skipped';
  title: string;
  id?: string;
  error?: string;
}

const results: SyncResult[] = [];

/**
 * Extract release year from various formats
 */
function extractReleaseYear(song: any): string {
  return String(song.releaseYear);
}

/**
 * Sync all songs to Sanity
 */
async function syncSongs() {
  console.log('\n🎵 Syncing Songs to Sanity CMS...\n');
  
  for (const song of musicConfig.songs) {
    try {
      // Check if song already exists (by title and release year)
      const existingSongs = await client.fetch(
        `*[_type == "song" && title == $title && releaseDate match $year][0]`,
        { 
          title: song.title,
          year: `${extractReleaseYear(song)}*`
        }
      );

      const sanityDoc = {
        _type: 'song',
        title: song.title,
        description: song.description,
        duration: song.duration || '0:00', // Provide default if missing
        releaseDate: extractReleaseYear(song),
        album: 'Singles', // Default album
        mdundoUrl: song.links.mdundo || '',
        spotifyUrl: (song.links as any).spotify || '',
        appleMusicUrl: (song.links as any).appleMusic || '',
        
        // Enhanced fields from new structure
        songStory: `${song.description}\n\nThemes: ${song.themes.join(', ')}`,
        recordingDetails: `Released in ${song.releaseYear}. Genre: ${song.genre}`,
        collaborators: [], // Can be added manually in Sanity
        
        // Flags
        featured: song.featured || false,
        isNew: song.releaseYear >= 2024,
        isCollaboration: false,
        isFirstSong: song.id === 'jesus-you-are-lord', // First song from 2015
      };

      if (existingSongs) {
        // Update existing song
        const result = await client
          .patch(existingSongs._id)
          .set(sanityDoc)
          .commit();
        
        console.log(`🔄 Updated: ${song.title} (${song.releaseYear})`);
        results.push({
          success: true,
          action: 'updated',
          title: song.title,
          id: result._id,
        });
      } else {
        // Create new song
        const result = await client.create(sanityDoc);
        
        console.log(`✅ Created: ${song.title} (${song.releaseYear})`);
        results.push({
          success: true,
          action: 'created',
          title: song.title,
          id: result._id,
        });
      }
    } catch (error) {
      console.error(`❌ Failed to sync: ${song.title}`);
      console.error(error);
      results.push({
        success: false,
        action: 'skipped',
        title: song.title,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

/**
 * Verify sync results
 */
async function verifySync() {
  console.log('\n🔍 Verifying Sync...\n');
  
  try {
    const songsInSanity = await client.fetch(`*[_type == "song"] | order(releaseDate desc) {
      _id,
      title,
      releaseDate,
      mdundoUrl,
      featured
    }`);
    
    console.log(`📊 Total songs in Sanity: ${songsInSanity.length}`);
    console.log(`📊 Expected songs: ${musicConfig.songs.length}`);
    console.log('\nSongs in Sanity:');
    
    songsInSanity.forEach((song: any, index: number) => {
      const status = song.featured ? '⭐' : '  ';
      console.log(`${status} ${index + 1}. ${song.title} (${song.releaseDate})`);
    });
    
    if (songsInSanity.length >= musicConfig.songs.length) {
      console.log('\n✅ Sync verification PASSED!');
      return true;
    } else {
      console.log('\n⚠️  Sync verification WARNING - some songs may be missing');
      return false;
    }
  } catch (error) {
    console.error('\n❌ Verification failed:', error);
    return false;
  }
}

/**
 * Print sync summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(70));
  console.log('📋 SYNC SUMMARY');
  console.log('='.repeat(70) + '\n');
  
  const created = results.filter(r => r.action === 'created');
  const updated = results.filter(r => r.action === 'updated');
  const failed = results.filter(r => !r.success);
  
  console.log(`✨ Created: ${created.length}`);
  console.log(`🔄 Updated: ${updated.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`📊 Total: ${results.length}\n`);
  
  if (created.length > 0) {
    console.log('Created Songs:');
    created.forEach(item => {
      console.log(`  ✅ ${item.title}`);
    });
    console.log();
  }
  
  if (updated.length > 0) {
    console.log('Updated Songs:');
    updated.forEach(item => {
      console.log(`  🔄 ${item.title}`);
    });
    console.log();
  }
  
  if (failed.length > 0) {
    console.log('Failed Items:');
    failed.forEach(item => {
      console.log(`  ❌ ${item.title}`);
      console.log(`     Error: ${item.error}\n`);
    });
  }
  
  console.log('='.repeat(70) + '\n');
}

/**
 * Main sync function
 */
async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 SYNCING MUSIC CONFIGURATION TO SANITY CMS');
  console.log('='.repeat(70));
  
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('\n❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set');
    console.error('💡 Tip: Check your .env.local file\n');
    process.exit(1);
  }
  
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.error('\n❌ Error: NEXT_PUBLIC_SANITY_DATASET is not set');
    console.error('💡 Tip: Check your .env.local file\n');
    process.exit(1);
  }
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is not set');
    console.error('💡 Tip: Get your token from https://sanity.io/manage');
    console.error('💡 Then add it to your .env.local file\n');
    process.exit(1);
  }
  
  console.log(`\n📦 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`📦 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
  console.log(`🎵 Songs to sync: ${musicConfig.songs.length}\n`);
  
  try {
    // Run sync
    await syncSongs();
    
    // Verify results
    const verified = await verifySync();
    
    // Print summary
    printSummary();
    
    const allSuccessful = results.every(r => r.success);
    
    if (verified && allSuccessful) {
      console.log('🎉 Sync completed successfully!\n');
      console.log('💡 Next steps:');
      console.log('   1. Visit http://localhost:3001/admin to see your songs in Sanity');
      console.log('   2. Add album artwork and audio files if desired');
      console.log('   3. Update song stories and recording details\n');
      process.exit(0);
    } else if (allSuccessful) {
      console.log('✅ Sync completed successfully!\n');
      console.log('⚠️  Note: Some songs may already exist in Sanity\n');
      process.exit(0);
    } else {
      console.log('⚠️  Sync completed with errors. Please review the summary above.\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Sync failed:', error);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Ensure your Sanity project is running');
    console.error('   2. Check your API token has write permissions');
    console.error('   3. Verify your .env.local file is properly configured\n');
    process.exit(1);
  }
}

// Run sync
main();
