/**
 * Music Ministry Content Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update your music ministry content
 * Add songs, videos, albums, and ministry information here.
 */

export const musicConfig = {
  // Ministry Story
  story: {
    title: 'My Music Ministry',
    subtitle: 'Spreading Hope Through Worship Since 2015',
    description: `My music ministry journey began in February 2015, and it has been a calling to spread the message of hope, faith, and God's love through worship. 
    Each song is crafted with prayer and purpose, aiming to inspire hearts and draw people closer to God. 
    From intimate worship sessions to powerful anthems, my music reflects a journey of faith and devotion that spans over 9 years.
    
    Through composing, recording, and performing gospel music, I share messages of faith, hope, and resilience, using music as a powerful tool to uplift and transform lives.`,
    mission: 'To create music that inspires worship, encourages faith, and brings glory to God.',
  },

  // Songs/Singles
  songs: [
    {
      id: '1',
      title: 'Grace Abounds',
      album: 'Hope Rising',
      duration: '4:32',
      releaseDate: '2023',
      description: 'A powerful worship song about God\'s amazing grace and unconditional love.',
      streamingLinks: {
        youtube: 'https://www.youtube.com/@CharlesJasemaMusic',
        mdundo: 'https://mdundo.com/song/1377029',
        spotify: '#', // Update with actual link
        appleMusic: '#', // Update with actual link
      },
      featured: true,
    },
    {
      id: '2',
      title: 'Hope Rising',
      album: 'Hope Rising',
      duration: '5:15',
      releaseDate: '2023',
      description: 'An uplifting anthem of hope and faith in challenging times.',
      streamingLinks: {
        youtube: 'https://www.youtube.com/@CharlesJasemaMusic',
        mdundo: 'https://mdundo.com/song/1377029',
        spotify: '#',
        appleMusic: '#',
      },
      featured: true,
    },
    {
      id: '3',
      title: 'Faithful God',
      album: 'Hope Rising',
      duration: '4:18',
      releaseDate: '2023',
      description: 'A declaration of God\'s faithfulness through every season of life.',
      streamingLinks: {
        youtube: 'https://www.youtube.com/@CharlesJasemaMusic',
        mdundo: 'https://mdundo.com/song/1377029',
        spotify: '#',
        appleMusic: '#',
      },
      featured: false,
    },
    {
      id: '4',
      title: 'Worship Medley',
      album: 'Live Sessions',
      duration: '6:45',
      releaseDate: '2024',
      description: 'A live worship medley featuring popular hymns and original songs.',
      streamingLinks: {
        youtube: 'https://www.youtube.com/@CharlesJasemaMusic',
        mdundo: 'https://mdundo.com/song/1377029',
        spotify: '#',
        appleMusic: '#',
      },
      featured: false,
    },
  ],

  // Music Videos
  videos: [
    {
      id: '1',
      title: 'Grace Abounds - Official Music Video',
      description: 'Official music video for Grace Abounds featuring powerful visuals and worship moments.',
      youtubeId: '', // Update with actual YouTube video ID
      thumbnail: '/placeholder',
      views: '4.2K',
      releaseDate: '2023',
      featured: true,
    },
    {
      id: '2',
      title: 'Hope Rising - Lyric Video',
      description: 'Lyric video for Hope Rising with beautiful animations and scripture references.',
      youtubeId: '', // Update with actual YouTube video ID
      thumbnail: '/placeholder',
      views: '3.8K',
      releaseDate: '2023',
      featured: true,
    },
    {
      id: '3',
      title: 'Live Worship Session - Full Concert',
      description: 'Complete live worship session recorded at our annual worship night.',
      youtubeId: '', // Update with actual YouTube video ID
      thumbnail: '/placeholder',
      views: '5.1K',
      releaseDate: '2024',
      featured: false,
    },
  ],

  // Albums
  albums: [
    {
      id: '1',
      title: 'Hope Rising',
      releaseYear: '2023',
      trackCount: 10,
      description: 'Debut album featuring 10 original worship songs of hope, faith, and inspiration.',
      coverImage: '/placeholder',
      streamingLinks: {
        youtube: 'https://www.youtube.com/@CharlesJasemaMusic',
        mdundo: 'https://mdundo.com/song/1377029',
        spotify: '#',
        appleMusic: '#',
      },
    },
  ],

  // Streaming Platforms
  platforms: [
    {
      name: 'YouTube Music',
      icon: 'youtube',
      link: 'https://www.youtube.com/@CharlesJasemaMusic',
      color: 'accent-red',
    },
    {
      name: 'Mdundo',
      icon: 'music',
      link: 'https://mdundo.com/song/1377029',
      color: 'primary-gold',
    },
    {
      name: 'Spotify',
      icon: 'spotify',
      link: '#', // Update with actual link
      color: 'tech-teal',
    },
    {
      name: 'Apple Music',
      icon: 'apple',
      link: '#', // Update with actual link
      color: 'primary-gold',
    },
  ],

  // Ministry Stats
  stats: [
    {
      label: 'Songs Released',
      value: '15+',
      icon: 'music',
    },
    {
      label: 'Total Streams',
      value: '50K+',
      icon: 'play',
    },
    {
      label: 'Live Performances',
      value: '30+',
      icon: 'microphone',
    },
    {
      label: 'Years of Ministry',
      value: '9+',
      icon: 'calendar',
    },
  ],

  // Call to Action
  cta: {
    title: 'Book Me for Your Event',
    description: 'Available for worship nights, church services, conferences, and special events.',
    buttons: [
      {
        text: 'Book Now',
        link: '/contact',
        variant: 'primary' as const,
      },
      {
        text: 'View Portfolio',
        link: '/portfolio',
        variant: 'secondary' as const,
      },
    ],
  },
} as const;

export type MusicConfig = typeof musicConfig;
