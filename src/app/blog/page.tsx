import { getBlogPosts } from '@/lib/sanity.queries';
import { blogConfig } from '@/config/blog';
import BlogClient from './BlogClient';

// Enable ISR with 60-second revalidation
export const revalidate = 60;

export default async function BlogPage() {
  // Fetch data from Sanity with error handling
  let articles = [];
  let error = null;

  try {
    articles = await getBlogPosts();
  } catch (err) {
    console.error('Error fetching blog posts from Sanity:', err);
    error = err;
    // Fallback to config data if Sanity fails
    articles = blogConfig.articles.map((article, index) => ({
      _id: `fallback-article-${index}`,
      ...article,
      slug: { current: article.slug },
      content: [],
      featuredImage: { url: '', alt: '' },
      tags: [...article.tags], // Convert readonly array to mutable array
    }));
  }

  return <BlogClient articles={articles as any} error={error} />;
}
