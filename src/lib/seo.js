// SEO utilities for Charles Jasema Portfolio

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Charles Jasema",
    "url": "https://charlesjasema.com",
    "image": "https://charlesjasema.com/images/charles-jasema-profile.jpg",
    "jobTitle": "Software Engineer & Gospel Artist",
    "worksFor": {
      "@type": "Organization",
      "name": "Charles Jasema Music & Technology"
    },
    "description": "Software engineer, graphics designer, and contemporary gospel artist from South Sudan, spreading hope through technology and worship music.",
    "birthPlace": "South Sudan",
    "nationality": "South Sudanese",
    "knowsLanguage": ["English", "Arabic"],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Software Engineer",
        "description": "Full-stack web development and software engineering"
      },
      {
        "@type": "Occupation", 
        "name": "Gospel Artist",
        "description": "Contemporary gospel music artist and worship leader"
      },
      {
        "@type": "Occupation",
        "name": "Graphics Designer",
        "description": "Visual design and brand identity creation"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/charlesjasema",
      "https://github.com/charlesjasema",
      "https://www.youtube.com/@CharlesJasemaMusic",
      "https://mdundo.com/a/148492"
    ]
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Charles Jasema - Software Engineer & Gospel Artist",
    "description": "Official portfolio and music website of Charles Jasema - Software engineer, graphics designer, and contemporary gospel artist",
    "url": "https://charlesjasema.com",
    "author": {
      "@type": "Person",
      "name": "Charles Jasema"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Person",
      "name": "Charles Jasema"
    }
  };
}

export function generateMusicSchema(song) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "name": song.title,
    "description": song.description,
    "duration": song.duration,
    "datePublished": song.releaseDate,
    "genre": "Contemporary Gospel",
    "byArtist": {
      "@type": "Person",
      "name": "Charles Jasema"
    },
    "recordingOf": {
      "@type": "MusicComposition",
      "name": song.title,
      "composer": {
        "@type": "Person", 
        "name": "Charles Jasema"
      }
    }
  };
}

export function generateProjectSchema(project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "creator": {
      "@type": "Person",
      "name": "Charles Jasema"
    },
    "dateCreated": project.publishedAt,
    "genre": project.category,
    "keywords": project.technologies?.join(", ") || ""
  };
}

// Generate SEO metadata for pages
export function generateMetadata(pageData) {
  const {
    title = 'Charles Jasema',
    description = 'Software engineer, graphics designer, and contemporary gospel artist from South Sudan',
    keywords = [],
    image = '/images/charles-jasema-profile.jpg',
    url = 'https://charlesjasema.com'
  } = pageData;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'Charles Jasema Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
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
  };
}

// Generate keywords for SEO
export function generateKeywords(category = 'general') {
  const baseKeywords = [
    'Charles Jasema',
    'Software Engineer',
    'Gospel Artist',
    'South Sudan',
    'Web Developer',
    'Graphics Designer'
  ];

  const categoryKeywords = {
    general: [...baseKeywords],
    portfolio: [...baseKeywords, 'Web Development', 'React', 'Next.js', 'Full Stack Developer'],
    music: [...baseKeywords, 'Contemporary Gospel', 'Worship Music', 'Christian Music', 'Gospel Singer'],
    about: [...baseKeywords, 'Biography', 'Professional Profile', 'Ministry'],
    contact: [...baseKeywords, 'Hire Developer', 'Book Artist', 'Contact Information'],
    blog: [...baseKeywords, 'Tech Blog', 'Development Insights', 'Christian Perspective']
  };

  return categoryKeywords[category] || categoryKeywords.general;
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  };
}