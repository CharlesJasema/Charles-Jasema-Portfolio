import { MetadataRoute } from 'next';
import { getSongs, getVideos, getProjects, getBlogPosts } from '@/lib/sanity.queries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://charlesjasema.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/music`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/lyrics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  try {
    // Dynamic pages from Sanity
    const [songs, , projects, blogPosts] = await Promise.all([
      getSongs().catch(() => []),
      getVideos().catch(() => []),
      getProjects().catch(() => []),
      getBlogPosts().catch(() => []),
    ]);

    // Helper function to safely create dates
    const safeDate = (dateString: string | undefined) => {
      if (!dateString) return new Date();
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    };

    // Song pages (if you have individual song pages)
    const songPages = songs.map((song: any) => ({
      url: `${SITE_URL}/music/${song.slug?.current || song._id}`,
      lastModified: safeDate(song._updatedAt || song._createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Project pages (if you have individual project pages)
    const projectPages = projects.map((project: any) => ({
      url: `${SITE_URL}/portfolio/${project.slug?.current || project._id}`,
      lastModified: safeDate(project._updatedAt || project._createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Blog post pages (if you have individual blog post pages)
    const blogPages = blogPosts.map((post: any) => ({
      url: `${SITE_URL}/blog/${post.slug?.current || post._id}`,
      lastModified: safeDate(post._updatedAt || post._createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [
      ...staticPages,
      ...songPages,
      ...projectPages,
      ...blogPages,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages only if dynamic content fails
    return staticPages;
  }
}