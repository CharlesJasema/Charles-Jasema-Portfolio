export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/.env*'],
    },
    sitemap: 'https://charlesjasema.com/sitemap.xml',
  };
}