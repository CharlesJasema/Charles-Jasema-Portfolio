/**
 * Migration Script: Blog Posts
 * 
 * This script migrates all blog posts from the blog.ts config file to Sanity CMS.
 * 
 * Usage:
 *   npx tsx scripts/migrate-blog.ts
 * 
 * Requirements:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID environment variable
 *   - NEXT_PUBLIC_SANITY_DATASET environment variable
 *   - SANITY_API_TOKEN environment variable (with write permissions)
 */

import { createClient } from '@sanity/client';
import { blogConfig } from '../src/config/blog';

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
 * Convert plain text to Portable Text format
 */
function textToPortableText(text: string) {
  if (!text || text.trim() === '') {
    return [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Content will be added soon. This is a placeholder for the full blog post content.',
            marks: [],
          },
        ],
      },
    ];
  }

  // Split by paragraphs
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return paragraphs.map(paragraph => ({
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: paragraph.trim(),
        marks: [],
      },
    ],
  }));
}

/**
 * Migrate all blog posts from config to Sanity
 */
async function migrateBlogPosts() {
  console.log('\n📝 Migrating Blog Posts...\n');
  
  for (const article of blogConfig.articles) {
    try {
      const sanityDoc = {
        _type: 'blogPost',
        title: article.title,
        slug: {
          _type: 'slug',
          current: article.slug,
        },
        category: article.category,
        excerpt: article.excerpt,
        content: textToPortableText(article.content),
        author: article.author,
        publishDate: new Date(article.publishDate).toISOString(),
        readTime: article.readTime,
        tags: article.tags,
        featured: article.featured || false,
      };

      const result = await client.create(sanityDoc);
      
      console.log(`✅ Migrated: ${article.title} (${article.category})`);
      results.push({
        success: true,
        title: article.title,
        id: result._id,
      });
    } catch (error) {
      console.error(`❌ Failed to migrate: ${article.title}`);
      console.error(error);
      results.push({
        success: false,
        title: article.title,
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

  console.log(`Total blog posts: ${results.length}`);
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}\n`);

  // Group by category
  const byCategory = blogConfig.articles.reduce((acc, article) => {
    if (!acc[article.category]) acc[article.category] = 0;
    acc[article.category]++;
    return acc;
  }, {} as Record<string, number>);

  console.log('By Category:');
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} posts`);
  });

  if (failed.length > 0) {
    console.log('\n❌ Failed Items:');
    failed.forEach(item => {
      console.log(`  - ${item.title}: ${item.error}`);
    });
  }

  console.log('\n⚠️  IMPORTANT: Complete these tasks in Sanity Studio:');
  console.log('   1. Upload featured images for each blog post');
  console.log('   2. Add full content to blog posts (currently placeholder text)');
  console.log('   3. Add SEO metadata (meta title, description, OG image)\n');

  console.log('='.repeat(60) + '\n');
}

/**
 * Main migration function
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SANITY CMS MIGRATION: BLOG POSTS');
  console.log('='.repeat(60) + '\n');

  // Verify environment
  verifyEnvironment();

  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

  try {
    // Run migration
    await migrateBlogPosts();

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
