import { getBlogPosts } from '@/lib/sanity.queries';
import { blogConfig } from '@/config/blog';
import BlogClient from './BlogClient';
import { generateMetadata as generateSEOMetadata, generateKeywords } from '@/lib/seo';
import { siteConfig } from '@/config/site';

// Force dynamic rendering to prevent build-time API calls
export const dynamic = 'force-dynamic';
// Enable ISR with 60-second revalidation
export const revalidate = 60;

export const metadata = generateSEOMetadata({
  title: `${siteConfig.name} Blog - Tech Insights, Faith & Development Journey`,
  description: 'Read the latest blog posts from Charles Jasema covering software development, web technologies, faith in tech, programming tutorials, industry insights, and personal reflections on the intersection of technology and ministry. Stay updated with modern development practices, React, Next.js, TypeScript, and more.',
  keywords: generateKeywords([
    'Charles Jasema Blog',
    'Tech Blog',
    'Software Development Blog',
    'Programming Blog',
    'Web Development Articles',
    'React Tutorials',
    'Next.js Guides',
    'TypeScript Tips',
    'JavaScript Articles',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Web Technologies',
    'Programming Tutorials',
    'Code Examples',
    'Best Practices',
    'Software Engineering',
    'Development Tips',
    'Tech Insights',
    'Industry Trends',
    'Developer Experience',
    'Performance Optimization',
    'SEO Tips',
    'Accessibility',
    'User Experience',
    'Design Patterns',
    'Architecture',
    'Database Design',
    'API Development',
    'Cloud Computing',
    'DevOps',
    'Testing',
    'Code Quality',
    'Faith in Tech',
    'Christian Developer',
    'Ministry Through Technology',
    'Tech and Faith',
    'Purpose-driven Development',
    'Ethical Programming',
    'Developer Testimony',
    'Career Journey',
    'Learning Resources',
    'Professional Growth',
    'Mentorship',
    'Community Building',
    'Open Source',
    'Side Projects',
    'Freelancing Tips',
    'Remote Work',
    'Work-life Balance',
    'Continuous Learning',
  ]),
  url: '/blog',
  type: 'website',
  image: '/images/Code & Design Banner.jpeg',
});

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
