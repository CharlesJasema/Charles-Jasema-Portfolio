/**
 * Migration Script: Portfolio Projects
 * 
 * This script migrates all portfolio projects from the portfolio.ts config file to Sanity CMS.
 * 
 * Usage:
 *   npx tsx scripts/migrate-projects.ts
 * 
 * Requirements:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID environment variable
 *   - NEXT_PUBLIC_SANITY_DATASET environment variable
 *   - SANITY_API_TOKEN environment variable (with write permissions)
 */

import { createClient } from '@sanity/client';
import { portfolioProjects } from '../src/config/portfolio';

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
  title: string;
  id?: string;
  error?: string;
}

const results: MigrationResult[] = [];

/**
 * Migrate all portfolio projects from config to Sanity
 */
async function migrateProjects() {
  console.log('\n💼 Migrating Portfolio Projects...\n');
  
  for (const [index, project] of portfolioProjects.entries()) {
    try {
      const sanityDoc = {
        _type: 'project',
        title: project.title,
        category: project.category,
        description: project.description,
        tags: project.tags,
        githubUrl: project.github && project.github !== '#' ? project.github : undefined,
        liveUrl: project.link && project.link !== '#' ? project.link : undefined,
        featured: project.featured || false,
        order: index, // Preserve original order
      };

      const result = await client.create(sanityDoc);
      
      console.log(`✅ Migrated: ${project.title} (${project.category})`);
      results.push({
        success: true,
        title: project.title,
        id: result._id,
      });
    } catch (error) {
      console.error(`❌ Failed to migrate: ${project.title}`);
      console.error(error);
      results.push({
        success: false,
        title: project.title,
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

  console.log(`Total projects: ${results.length}`);
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}\n`);

  // Group by category
  const byCategory = portfolioProjects.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = 0;
    acc[p.category]++;
    return acc;
  }, {} as Record<string, number>);

  console.log('By Category:');
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} projects`);
  });

  if (failed.length > 0) {
    console.log('\n❌ Failed Items:');
    failed.forEach(item => {
      console.log(`  - ${item.title}: ${item.error}`);
    });
  }

  console.log('\n⚠️  IMPORTANT: Images must be uploaded manually in Sanity Studio');
  console.log('   Go to /admin and add project images for each project\n');

  console.log('='.repeat(60) + '\n');
}

/**
 * Main migration function
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SANITY CMS MIGRATION: PORTFOLIO PROJECTS');
  console.log('='.repeat(60) + '\n');

  // Verify environment
  verifyEnvironment();

  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

  try {
    // Run migration
    await migrateProjects();

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
