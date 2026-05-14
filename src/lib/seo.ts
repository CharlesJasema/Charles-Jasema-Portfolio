/**
 * SEO Utilities
 * 
 * Comprehensive SEO metadata generation for all pages
 */

import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'music.song' | 'music.album' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const SITE_NAME = 'Charles Jasema';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://charlesjasema.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/professional image.JPG`;
const TWITTER_HANDLE = '@charlesjasema';

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = DEFAULT_IMAGE,
    url = SITE_URL,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'Charles Jasema',
    section,
    tags = [],
  } = config;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_NAME,
    
    // Open Graph
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: TWITTER_HANDLE,
      images: [imageUrl],
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification
    verification: {
      google: 'your-google-verification-code', // Add your Google Search Console verification code
    },

    // Alternate languages (if you add translations)
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Generate JSON-LD structured data for a person (Charles Jasema)
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Charles Jasema',
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    sameAs: [
      'https://www.youtube.com/@charlesjasema',
      'https://www.mdundo.com/artist/charles-jasema',
      'https://github.com/charlesjasema',
      'https://www.linkedin.com/in/charlesjasema',
    ],
    jobTitle: 'Software Engineer, Gospel Artist & Worship Leader',
    description: 'Software engineer, gospel artist, and worship leader creating technology and music that inspires.',
    knowsAbout: [
      'Software Engineering',
      'Web Development',
      'Gospel Music',
      'Worship Leading',
      'Graphics Design',
      'Videography',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Your University', // Add your university
    },
  };
}

/**
 * Generate JSON-LD structured data for a music recording
 */
export function generateMusicRecordingSchema(song: {
  title: string;
  description: string;
  releaseDate: string;
  duration?: string;
  mdundoUrl?: string;
  youtubeUrl?: string;
  albumArt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: song.title,
    description: song.description,
    datePublished: song.releaseDate,
    duration: song.duration,
    url: song.mdundoUrl || song.youtubeUrl,
    image: song.albumArt,
    byArtist: {
      '@type': 'Person',
      name: 'Charles Jasema',
      url: SITE_URL,
    },
    inAlbum: {
      '@type': 'MusicAlbum',
      name: 'Charles Jasema Singles',
      byArtist: {
        '@type': 'Person',
        name: 'Charles Jasema',
      },
    },
    genre: 'Gospel',
    recordingOf: {
      '@type': 'MusicComposition',
      name: song.title,
      composer: {
        '@type': 'Person',
        name: 'Charles Jasema',
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
  category: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image || DEFAULT_IMAGE,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: 'Charles Jasema',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Charles Jasema',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/Code & Design Logo.jpeg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    articleSection: article.category,
    keywords: article.tags?.join(', '),
  };
}

/**
 * Generate JSON-LD structured data for a software project
 */
export function generateSoftwareSchema(project: {
  title: string;
  description: string;
  url?: string;
  githubUrl?: string;
  image?: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: project.url,
    image: project.image,
    applicationCategory: project.category,
    author: {
      '@type': 'Person',
      name: 'Charles Jasema',
      url: SITE_URL,
    },
    ...(project.githubUrl && {
      codeRepository: project.githubUrl,
    }),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate website structured data
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Software engineer, gospel artist, and worship leader creating technology and music that inspires.',
    author: {
      '@type': 'Person',
      name: 'Charles Jasema',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Default keywords for the site
 */
export const DEFAULT_KEYWORDS = [
  'Charles Jasema',
  'Software Engineer',
  'Gospel Artist',
  'Worship Leader',
  'Web Developer',
  'Next.js Developer',
  'React Developer',
  'TypeScript Developer',
  'Gospel Music',
  'Worship Music',
  'Christian Music',
  'Uganda Gospel Artist',
  'South Sudan Gospel Music',
  'Graphics Designer',
  'Videographer',
  'Full Stack Developer',
];

/**
 * Generate keywords for a specific page
 */
export function generateKeywords(pageKeywords: string[]): string[] {
  return [...new Set([...DEFAULT_KEYWORDS, ...pageKeywords])];
}

/**
 * Enhanced Open Graph image generation for social sharing
 */
export function generateOpenGraphImage(
  _title: string,
  category?: string,
  customImage?: string
): string {
  if (customImage) {
    return customImage.startsWith('http') ? customImage : `${SITE_URL}${customImage}`;
  }

  // Category-specific default images
  const categoryImages = {
    music: '/images/CJ Music Logo.jpeg',
    portfolio: '/images/Code & Design Banner.jpeg',
    blog: '/images/Code & Design Banner.jpeg',
    about: '/images/professional image.JPG',
    default: '/images/professional image.JPG'
  };

  const imageKey = category && categoryImages[category as keyof typeof categoryImages] 
    ? category as keyof typeof categoryImages 
    : 'default';
  
  return `${SITE_URL}${categoryImages[imageKey]}`;
}

/**
 * Generate social media optimized metadata
 */
export function generateSocialMetadata(config: {
  title: string;
  description: string;
  url?: string;
  image?: string;
  category?: string;
  type?: 'website' | 'article' | 'music.song' | 'music.album';
  publishedTime?: string;
  tags?: string[];
}) {
  const {
    title,
    description,
    url = SITE_URL,
    image,
    category,
    type = 'website',
    publishedTime,
    tags = []
  } = config;

  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const ogImage = generateOpenGraphImage(title, category, image);

  return {
    title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      type,
      title,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: TWITTER_HANDLE,
      images: [ogImage],
    },
  };
}

/**
 * Generate social sharing URLs for different platforms
 */
export function generateSocialShareUrls(
  url: string,
  title: string,
  description?: string
) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
  };
}

/**
 * Validate and optimize meta description length
 */
export function optimizeMetaDescription(description: string): string {
  const maxLength = 160;
  if (description.length <= maxLength) {
    return description;
  }
  
  // Truncate at word boundary
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}