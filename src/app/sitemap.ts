import { MetadataRoute } from 'next';
import { lyricsConfig } from '@/config/lyrics';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://charlesjasema.com'; // Update with your actual domain

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/portfolio',
    '/music',
    '/lyrics',
    '/blog',
    '/contact',
    '/booking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Individual lyrics pages (for SEO)
  const lyricsPages = lyricsConfig.lyrics.map((song) => ({
    url: `${baseUrl}/lyrics#${song.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...lyricsPages];
}
