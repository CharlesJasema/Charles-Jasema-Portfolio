'use client';

import { useEffect } from 'react';

interface SocialSEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'music.song' | 'music.album' | 'profile';
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  twitterHandle?: string;
}

export function SocialSEO({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName = 'Charles Jasema',
  author = 'Charles Jasema',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  twitterHandle = '@charlesjasema'
}: SocialSEOProps) {
  useEffect(() => {
    // Update document title if needed
    if (title && !document.title.includes(title)) {
      document.title = title.includes(siteName) ? title : `${title} | ${siteName}`;
    }

    // Update meta description if needed
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // Update Twitter Card meta tags
    const updateTwitterTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', siteName);

    if (url) {
      updateMetaTag('og:url', url);
    }

    if (image) {
      updateMetaTag('og:image', image);
      updateMetaTag('og:image:alt', title);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
    }

    if (author) {
      updateMetaTag('article:author', author);
    }

    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime);
    }

    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime);
    }

    if (section) {
      updateMetaTag('article:section', section);
    }

    if (tags.length > 0) {
      tags.forEach(tag => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }

    // Twitter Card tags
    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:creator', twitterHandle);
    updateTwitterTag('twitter:site', twitterHandle);

    if (image) {
      updateTwitterTag('twitter:image', image);
      updateTwitterTag('twitter:image:alt', title);
    }

    // Music-specific Open Graph tags
    if (type === 'music.song') {
      updateMetaTag('music:duration', '180'); // Default 3 minutes, update as needed
      updateMetaTag('music:musician', author);
    }

    if (type === 'music.album') {
      updateMetaTag('music:musician', author);
      updateMetaTag('music:release_date', publishedTime || '');
    }

  }, [title, description, image, url, type, siteName, author, publishedTime, modifiedTime, section, tags, twitterHandle]);

  return null; // This component doesn't render anything visible
}

// Helper function to generate structured data for social sharing
export function generateSocialStructuredData(props: SocialSEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://charlesjasema.com';
  
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': getSchemaType(props.type),
    name: props.title,
    description: props.description,
    url: props.url || baseUrl,
    image: props.image,
    author: {
      '@type': 'Person',
      name: props.author || 'Charles Jasema',
      url: baseUrl,
    },
  };

  // Add type-specific properties
  if (props.type === 'article') {
    structuredData['@type'] = 'BlogPosting';
    structuredData.headline = props.title;
    structuredData.datePublished = props.publishedTime;
    structuredData.dateModified = props.modifiedTime || props.publishedTime;
    structuredData.articleSection = props.section;
    structuredData.keywords = props.tags?.join(', ');
    structuredData.publisher = {
      '@type': 'Person',
      name: props.siteName || 'Charles Jasema',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/Code & Design Logo.jpeg`,
      },
    };
  }

  if (props.type === 'music.song') {
    structuredData['@type'] = 'MusicRecording';
    structuredData.byArtist = {
      '@type': 'Person',
      name: props.author || 'Charles Jasema',
    };
    structuredData.genre = 'Gospel';
    structuredData.recordingOf = {
      '@type': 'MusicComposition',
      name: props.title,
      composer: props.author || 'Charles Jasema',
    };
  }

  return structuredData;
}

function getSchemaType(ogType?: string): string {
  switch (ogType) {
    case 'article':
      return 'BlogPosting';
    case 'music.song':
      return 'MusicRecording';
    case 'music.album':
      return 'MusicAlbum';
    case 'profile':
      return 'Person';
    default:
      return 'WebPage';
  }
}

// Hook for easy social SEO management
export function useSocialSEO(props: SocialSEOProps) {
  useEffect(() => {
    // Generate and inject structured data
    const structuredData = generateSocialStructuredData(props);
    
    // Remove existing structured data script if it exists
    const existingScript = document.querySelector('script[data-social-seo]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-social-seo', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[data-social-seo]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [props]);

  return null;
}