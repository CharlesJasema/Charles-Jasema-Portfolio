export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Charles Jada Sebit Emmanuel",
    "alternateName": "Charles Jasema",
    "description": "Software Engineer, Graphics Designer, IT Support Specialist, and Contemporary Gospel Artist",
    "url": "https://charlesjasema.com",
    "image": "https://charlesjasema.com/images/charles-jasema-professional-portrait.jpg",
    "sameAs": [
      "https://linkedin.com/in/charles-jada-sebit-emmanuel",
      "https://github.com/charlesjasema",
      "https://youtube.com/@CharlesJasemaMusic",
      "https://instagram.com/charlesjasemamusic",
      "https://tiktok.com/@charlesjasemamusic"
    ],
    "jobTitle": [
      "Software Engineer",
      "Full-Stack Developer", 
      "Graphics Designer",
      "Gospel Artist",
      "IT Support Specialist"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UG",
      "addressLocality": "Kampala",
      "addressRegion": "Uganda"
    },
    "email": "brocharles001@gmail.com",
    "telephone": "+256785446877",
    "knowsAbout": [
      "Software Development",
      "Web Development", 
      "Mobile App Development",
      "React.js",
      "Node.js",
      "JavaScript",
      "Python",
      "Graphics Design",
      "Adobe Creative Suite",
      "IT Support",
      "Project Management",
      "Gospel Music",
      "Worship Leadership",
      "Digital Literacy Training"
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Software Engineer",
        "description": "Full-stack web and mobile application development"
      },
      {
        "@type": "Occupation", 
        "name": "Graphics Designer",
        "description": "Visual identity design and brand development"
      },
      {
        "@type": "Occupation",
        "name": "Gospel Artist",
        "description": "Contemporary gospel music and worship leadership"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Charles Jasema Portfolio",
    "description": "Professional portfolio of Charles Jada Sebit Emmanuel - Software Engineer, Graphics Designer, and Gospel Artist",
    "url": "https://charlesjasema.com",
    "author": {
      "@type": "Person",
      "name": "Charles Jada Sebit Emmanuel"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Person",
      "name": "Charles Jada Sebit Emmanuel"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://charlesjasema.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Charles Jasema - Code & Design",
    "description": "Professional software development, graphics design, and IT support services",
    "url": "https://charlesjasema.com",
    "logo": "https://charlesjasema.com/images/charles-jasema-code-design-logo.jpg",
    "image": "https://charlesjasema.com/images/charles-jasema-business-banner.jpg",
    "founder": {
      "@type": "Person",
      "name": "Charles Jada Sebit Emmanuel"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UG",
      "addressLocality": "Kampala",
      "addressRegion": "Uganda"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+256785446877",
      "email": "brocharles001@gmail.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"]
    },
    "serviceType": [
      "Software Development",
      "Web Development",
      "Mobile App Development", 
      "Graphics Design",
      "IT Support",
      "Project Management",
      "Digital Literacy Training"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Uganda"
      },
      {
        "@type": "Country", 
        "name": "South Sudan"
      },
      {
        "@type": "Place",
        "name": "Worldwide (Remote)"
      }
    ]
  };

  const musicSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Charles Jasema Music",
    "description": "Contemporary gospel music ministry spreading hope and faith through worship",
    "url": "https://charlesjasema.com/music",
    "image": "https://charlesjasema.com/images/charles-jasema-music-logo.jpg",
    "genre": ["Gospel", "Contemporary Christian", "Worship"],
    "member": {
      "@type": "Person",
      "name": "Charles Jada Sebit Emmanuel",
      "roleName": "Lead Vocalist, Songwriter, Worship Leader"
    },
    "sameAs": [
      "https://youtube.com/@CharlesJasemaMusic",
      "https://mdundo.com/song/1377029",
      "https://instagram.com/charlesjasemamusic"
    ],
    "foundingDate": "2015",
    "foundingLocation": {
      "@type": "Place",
      "name": "South Sudan"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(musicSchema),
        }}
      />
    </>
  );
}