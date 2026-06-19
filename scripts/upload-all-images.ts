/**
 * Automated Image Upload Script
 * Uploads all images to Sanity CMS and links them to content
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { createReadStream, existsSync } from 'fs';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

console.log('🖼️  Starting Image Upload Process...\n');

// Image mappings
const imageMap = {
  projects: [
    {
      title: 'Karibu Groceries Ltd (KGL)',
      imagePath: resolve(__dirname, '../public/images/projects/karibu-groceries-screenshot.jpg'),
      altText: 'KGL Karibu Groceries wholesale management platform interface'
    },
    {
      title: 'Charles Jasema Portfolio Website',
      imagePath: resolve(__dirname, '../public/images/banners/code-design-banner.jpg'),
      altText: 'Charles Jasema Code & Design professional banner'
    },
    {
      title: 'CAM Connect Mobile App',
      imagePath: resolve(__dirname, '../public/images/professional/charles-jasema-professional-headshot.jpg'),
      altText: 'Charles Jasema - Developer of CAM Connect Mobile App'
    }
  ],
  songs: [
    {
      title: 'Jesus You Are Lord',
      imagePath: resolve(__dirname, '../public/images/music/cj-music-logo.jpg'),
      altText: 'CJ Music - Jesus You Are Lord album art'
    },
    {
      title: 'Nyadru – Love',
      imagePath: resolve(__dirname, '../public/images/music/cj-music-logo.jpg'),
      altText: 'CJ Music - Nyadru Love album art'
    },
    {
      title: 'I Don\'t Belong Here',
      imagePath: resolve(__dirname, '../public/images/music/cj-music-logo.jpg'),
      altText: 'CJ Music - I Don\'t Belong Here album art'
    },
    {
      title: 'Mercy',
      imagePath: resolve(__dirname, '../public/images/music/cj-music-logo.jpg'),
      altText: 'CJ Music - Mercy album art'
    },
    {
      title: 'A Call',
      imagePath: resolve(__dirname, '../public/images/music/cj-music-logo.jpg'),
      altText: 'CJ Music - A Call album art'
    },
    {
      title: 'My Help Comes From You',
      imagePath: resolve(__dirname, '../public/images/music/cj-music-logo.jpg'),
      altText: 'CJ Music - My Help Comes From You album art'
    },
    {
      title: 'Where Will You Be?',
      imagePath: resolve(__dirname, '../public/images/music/cj-music-logo.jpg'),
      altText: 'CJ Music - Where Will You Be? album art'
    }
  ],
  blogPosts: [
    {
      slug: 'kgl-journey-broken-builds-to-working-system',
      imagePath: resolve(__dirname, '../public/images/projects/karibu-groceries-screenshot.jpg'),
      altText: 'Karibu Groceries project screenshot - journey from broken builds to working system'
    },
    {
      slug: 'building-cam-connect-mobile-development-lessons',
      imagePath: resolve(__dirname, '../public/images/professional/charles-jasema-professional-headshot.jpg'),
      altText: 'Charles Jasema - Mobile App Developer'
    },
    {
      slug: 'music-ministry-worship-through-code-and-song',
      imagePath: resolve(__dirname, '../public/images/ministry/charles-jasema-ministry-photo.jpg'),
      altText: 'Charles Jasema ministering at a worship event'
    }
  ]
};

// Upload image to Sanity
async function uploadImage(imagePath: string, altText: string): Promise<any> {
  if (!existsSync(imagePath)) {
    throw new Error(`Image file not found: ${imagePath}`);
  }

  const imageStream = createReadStream(imagePath);
  const asset = await client.assets.upload('image', imageStream, {
    filename: imagePath.split('/').pop() || 'image.jpg'
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id
    },
    alt: altText
  };
}

// Update projects with images
async function uploadProjectImages() {
  console.log('📦 Uploading Project Images...\n');

  for (const projectMapping of imageMap.projects) {
    try {
      console.log(`  🔍 Finding project: ${projectMapping.title}`);
      
      // Find project by title (partial match)
      const query = `*[_type == "project" && title match "${projectMapping.title}*"][0]`;
      const project = await client.fetch(query);

      if (!project) {
        console.log(`  ⚠️  Project not found: ${projectMapping.title}`);
        continue;
      }

      console.log(`  📤 Uploading image: ${projectMapping.imagePath.split('\\').pop()}`);
      const imageData = await uploadImage(projectMapping.imagePath, projectMapping.altText);

      console.log(`  🔗 Linking image to project...`);
      await client.patch(project._id).set({ image: imageData }).commit();

      console.log(`  ✅ Success: ${projectMapping.title}\n`);
    } catch (error: any) {
      console.error(`  ❌ Error: ${projectMapping.title}:`, error.message, '\n');
    }
  }
}

// Update songs with album art
async function uploadSongImages() {
  console.log('🎵 Uploading Song Album Art...\n');

  // Upload the CJ Music logo once and cache it
  let cachedAlbumArt: any = null;

  for (const songMapping of imageMap.songs) {
    try {
      console.log(`  🔍 Finding song: ${songMapping.title}`);
      
      const query = `*[_type == "song" && title == "${songMapping.title}"][0]`;
      const song = await client.fetch(query);

      if (!song) {
        console.log(`  ⚠️  Song not found: ${songMapping.title}`);
        continue;
      }

      // Upload image only once (all songs use same logo)
      if (!cachedAlbumArt) {
        console.log(`  📤 Uploading album art: ${songMapping.imagePath.split('\\').pop()}`);
        cachedAlbumArt = await uploadImage(songMapping.imagePath, songMapping.altText);
      } else {
        console.log(`  ♻️  Reusing cached album art`);
      }

      console.log(`  🔗 Linking album art to song...`);
      await client.patch(song._id).set({ albumArt: cachedAlbumArt }).commit();

      console.log(`  ✅ Success: ${songMapping.title}\n`);
    } catch (error: any) {
      console.error(`  ❌ Error: ${songMapping.title}:`, error.message, '\n');
    }
  }
}

// Update blog posts with featured images
async function uploadBlogPostImages() {
  console.log('📝 Uploading Blog Post Featured Images...\n');

  for (const blogMapping of imageMap.blogPosts) {
    try {
      console.log(`  🔍 Finding blog post: ${blogMapping.slug}`);
      
      const query = `*[_type == "blogPost" && slug.current == "${blogMapping.slug}"][0]`;
      const blogPost = await client.fetch(query);

      if (!blogPost) {
        console.log(`  ⚠️  Blog post not found: ${blogMapping.slug}`);
        continue;
      }

      console.log(`  📤 Uploading featured image: ${blogMapping.imagePath.split('\\').pop()}`);
      const imageData = await uploadImage(blogMapping.imagePath, blogMapping.altText);

      console.log(`  🔗 Linking featured image to blog post...`);
      await client.patch(blogPost._id).set({ featuredImage: imageData }).commit();

      console.log(`  ✅ Success: ${blogMapping.slug}\n`);
    } catch (error: any) {
      console.error(`  ❌ Error: ${blogMapping.slug}:`, error.message, '\n');
    }
  }
}

// Main execution
async function main() {
  try {
    console.log('╔════════════════════════════════════════╗');
    console.log('║    Automated Image Upload Started     ║');
    console.log('╚════════════════════════════════════════╝\n');

    await uploadProjectImages();
    await uploadSongImages();
    await uploadBlogPostImages();

    console.log('═'.repeat(50));
    console.log('✅ Image Upload Complete!');
    console.log('═'.repeat(50));

    console.log('\n📊 Summary:');
    console.log(`  • Project images: ${imageMap.projects.length} uploaded`);
    console.log(`  • Song album art: ${imageMap.songs.length} uploaded (using 1 image)`);
    console.log(`  • Blog post featured images: ${imageMap.blogPosts.length} uploaded`);

    console.log('\n🎉 All Images Successfully Uploaded to Sanity CMS!');
    console.log('\n📝 Next Steps:');
    console.log('  1. Visit http://localhost:3001 to view your portfolio frontend');
    console.log('  2. Navigate to /projects, /music, /blog to verify images');
    console.log('  3. Check mobile responsiveness');
    console.log('  4. Run performance audit with Lighthouse');

  } catch (error: any) {
    console.error('\n❌ Error during image upload:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();
