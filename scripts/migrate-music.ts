/**
 * Migration Script: Songs and Videos
 * 
 * This script migrates all songs and videos from the music.ts config file to Sanity CMS.
 * 
 * Usage:
 *   npx tsx scripts/migrate-music.ts
 * 
 * Requirements:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID environment variable
 *   - NEXT_PUBLIC_SANITY_DATASET environment variable
 *   - SANITY_API_TOKEN environment variable (with write permissions)
 */

import { createClient } from '@sanity/client';
import { musicConfig } from '../src/config/music';

// Initialize Sanity client with write permissions
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
 * Migrate all songs from config to Sanity
 */
async function migrateSongs() {
  console.log('\n📀 Migrating Songs...\n');
  
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
 * Migrate all music videos from config to Sanity
 */
async function migrateMusicVideos() {
  console.log('\n🎬 Migrating Music Videos...\n');
  
  for (const video of musicConfig.musicVideos) {
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
        type: 'musicVideo',
        title: video.title,
        id: result._id,
      });
    } catch (error) {
      console.error(`❌ Failed to migrate: ${video.title}`);
      console.error(error);
      results.push({
        success: false,
        type: 'musicVideo',
        title: video.title,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

/**
 * Migrate all lyrical videos from config to Sanity
 */
async function migrateLyricalVideos() {
  console.log('\n🎵 Migrating Lyrical Videos...\n');
  
  for (const video of musicConfig.lyricalVideos) {
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
        type: 'lyricalVideo',
        title: video.title,
        id: result._id,
      });
    } catch (error) {
      console.error(`❌ Failed to migrate: ${video.title}`);
      console.error(error);
      results.push({
        success: false,
        type: 'lyricalVideo',
        title: video.title,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

/**
 * Verify environment variables
 */
function verifyEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    process.exit(1);
  }

  console.log('✅ Environment variables verified');
}

/**
 * Print migration summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`Total items: ${results.length}`);
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}\n`);

  // Group by type
  const byType = results.reduce((acc, r) => {
    if (!acc[r.type]) acc[r.type] = { success: 0, failed: 0 };
    if (r.success) acc[r.type].success++;
    else acc[r.type].failed++;
    return acc;
  }, {} as Record<string, { success: number; failed: number }>);

  console.log('By Type:');
  Object.entries(byType).forEach(([type, counts]) => {
    console.log(`  ${type}: ${counts.success} successful, ${counts.failed} failed`);
  });

  if (failed.length > 0) {
    console.log('\n❌ Failed Items:');
    failed.forEach(item => {
      console.log(`  - ${item.title} (${item.type}): ${item.error}`);
    });
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Main migration function
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SANITY CMS MIGRATION: MUSIC CONTENT');
  console.log('='.repeat(60) + '\n');

  // Verify environment
  verifyEnvironment();

  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

  try {
    // Run migrations
    await migrateSongs();
    await migrateMusicVideos();
    await migrateLyricalVideos();

    // Print summary
    printSummary();

    // Exit with appropriate code
    const hasFailures = results.some(r => !r.success);
    process.exit(hasFailures ? 1 : 0);
  } catch (error) {
    console.error('\n❌ Migration failed with error:');
    console.error(error);
    process.exit(1);
  }
}

// Run migration
main();
