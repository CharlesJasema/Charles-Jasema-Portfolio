/**
 * Migration Script: Music Content (Songs and Videos)
 * 
 * This script migrates all songs and videos from the music.ts config file to Sanity CMS.
 * 
 * Usage:
 *   npx ts-node scripts/migrate-music-content.ts
 * 
 * Requirements:
 *   - SANITY_API_TOKEN environment variable must be set
 *   - Sanity project must be configured
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

interface MigrationResult {
  success: boolean;
  type: string;
  title: string;
  id?: string;
  error?: string;
}

const results: MigrationResult[] = [];

/**
 * Migrate all audio songs to Sanity
 */
async function migrateSongs() {
  console.log('\n📀 Migrating Audio Songs...\n');
  
  for (const song of musicConfig.audioSongs) {
    try {
      const sanityDoc = {
        _type: 'song',
        title: song.title,
        description: song.description,
        duration: song.duration,
        releaseDate: song.releaseDate,
        album: song.album,
        mdundoUrl: song.mdundoUrl,
        featured: song.featured || false,
        isNew: (song as any).isNew || false,
        isCollaboration: (song as any).isCollaboration || false,
        isFirstSong: (song as any).isFirstSong || false,
      };

      const result = await client.create(sanityDoc);
      
      console.log(`✅ Migrated: ${song.title} (${song.releaseDate})`);
      results.push({
        success: true,
        type: 'song',
        title: song.title,
        id: result._id,
      });
    } catch (error) {
      console.error(`❌ Failed to migrate: ${song.title}`);
      console.error(error);
      results.push({
        success: false,
        type: 'song',
        title: song.title,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

/**
 * Migrate all music videos to Sanity
 */
async function migrateVideos() {
  console.log('\n🎬 Migrating Music Videos and Lyrical Videos...\n');
  
  const allVideos = [...musicConfig.musicVideos, ...musicConfig.lyricalVideos];
  
  for (const video of allVideos) {
    try {
      const sanityDoc = {
        _type: 'musicVideo',
        title: video.title,
        description: video.description,
        youtubeUrl: video.youtubeUrl,
        youtubeId: video.youtubeId,
        releaseDate: video.releaseDate,
        views: video.views,
        category: video.category,
        featured: video.featured || false,
      };

      const result = await client.create(sanityDoc);
      
      console.log(`✅ Migrated: ${video.title} (${video.category})`);
      results.push({
        success: true,
        type: 'video',
        title: video.title,
        id: result._id,
      });
    } catch (error) {
      console.error(`❌ Failed to migrate: ${video.title}`);
      console.error(error);
      results.push({
        success: false,
        type: 'video',
        title: video.title,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

/**
 * Verify migration results
 */
async function verifyMigration() {
  console.log('\n🔍 Verifying Migration...\n');
  
  try {
    // Count songs in Sanity
    const songs = await client.fetch(`count(*[_type == "song"])`);
    console.log(`📊 Total songs in Sanity: ${songs}`);
    console.log(`📊 Expected songs: ${musicConfig.audioSongs.length}`);
    
    // Count videos in Sanity
    const videos = await client.fetch(`count(*[_type == "musicVideo"])`);
    const expectedVideos = musicConfig.musicVideos.length + musicConfig.lyricalVideos.length;
    console.log(`📊 Total videos in Sanity: ${videos}`);
    console.log(`📊 Expected videos: ${expectedVideos}`);
    
    if (songs === musicConfig.audioSongs.length && videos === expectedVideos) {
      console.log('\n✅ Migration verification PASSED!');
      return true;
    } else {
      console.log('\n⚠️  Migration verification FAILED - counts do not match');
      return false;
    }
  } catch (error) {
    console.error('\n❌ Verification failed:', error);
    return false;
  }
}

/**
 * Print migration summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📋 MIGRATION SUMMARY');
  console.log('='.repeat(60) + '\n');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`📊 Total: ${results.length}\n`);
  
  if (failed.length > 0) {
    console.log('Failed Items:');
    failed.forEach(item => {
      console.log(`  - ${item.type}: ${item.title}`);
      console.log(`    Error: ${item.error}\n`);
    });
  }
  
  console.log('='.repeat(60) + '\n');
}

/**
 * Main migration function
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 STARTING MUSIC CONTENT MIGRATION');
  console.log('='.repeat(60));
  
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set');
    process.exit(1);
  }
  
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.error('❌ Error: NEXT_PUBLIC_SANITY_DATASET is not set');
    process.exit(1);
  }
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is not set');
    console.error('💡 Tip: Get your token from https://sanity.io/manage');
    process.exit(1);
  }
  
  console.log(`\n📦 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`📦 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);
  
  try {
    // Run migrations
    await migrateSongs();
    await migrateVideos();
    
    // Verify results
    const verified = await verifyMigration();
    
    // Print summary
    printSummary();
    
    if (verified && results.every(r => r.success)) {
      console.log('🎉 Migration completed successfully!\n');
      process.exit(0);
    } else {
      console.log('⚠️  Migration completed with errors. Please review the summary above.\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
main();
