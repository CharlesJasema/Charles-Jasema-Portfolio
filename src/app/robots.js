/**
 * Dynamic Robots.txt Generator for Next.js
 * Controls search engine crawling behavior
 */

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/.well-known/'],
    },
    sitemap: 'https://charles-jasema-portfolio.vercel.app/sitemap.xml',
  };
}