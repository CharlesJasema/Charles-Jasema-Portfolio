import Link from 'next/link';
import Image from 'next/image';
import { FaPlay, FaMusic, FaYoutube, FaExternalLinkAlt, FaDrum, FaGuitar, FaMicrophone, FaHeart, FaRecordVinyl, FaVideo, FaUsers } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';
import { Button, Card, AnimatedContainer, StaggeredContainer } from '@/components/ui';
import { SocialShare, SocialFollow, SocialProof } from '@/components/social';
import { MusicPageCTAs } from '@/components/cta';
import { siteConfig } from '@/config/site';
import { musicConfig } from '@/config/music';
import { imagesConfig } from '@/config/images';
import { getSongs, getVideos } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.image';
import { MusicClient } from './MusicClient';
import { generateMetadata as generateSEOMetadata, generateKeywords } from '@/lib/seo';

// Enable ISR with 60-second revalidation
export const revalidate = 60;

export const metadata = generateSEOMetadata({
  title: `${siteConfig.name} Music - Gospel Songs, Worship Music & Music Videos`,
  description: 'Explore the inspiring gospel music collection of Charles Jasema featuring original worship songs, music videos, and lyrical videos. Listen to faith-filled music including "Grace Abounds", "Faithful God", and more. Stream on Spotify, Apple Music, and Mdundo.',
  keywords: generateKeywords([
    'Charles Jasema Music',
    'Gospel Music',
    'Worship Songs',
    'Christian Music',
    'Gospel Artist',
    'Worship Leader',
    'Faith Music',
    'Inspirational Songs',
    'Gospel Music Videos',
    'Lyrical Videos',
    'Worship Music',
    'Contemporary Gospel',
    'African Gospel Music',
    'Uganda Gospel Music',
    'South Sudan Gospel',
    'Grace Abounds',
    'Faithful God',
    'Gospel Streaming',
    'Spotify Gospel',
    'Apple Music Gospel',
    'Mdundo Gospel',
    'YouTube Gospel',
    'Music Ministry',
    'Worship Ministry',
    'Gospel Song Production',
    'Christian Songwriter',
    'Gospel Music Producer',
    'Jasema Worship Team',
    'Worship Team Ministry',
    'Gospel Outreach',
    'Music Evangelism',
    'Contemporary Worship',
    'Praise and Worship',
    'Gospel Performance',
    'Live Worship',
    'Studio Recording',
    'Gospel Album',
    'Christian Singles',
  ]),
  url: '/music',
  type: 'website',
  image: '/images/CJ Music Logo.jpeg',
});

export default async function MusicPage() {
  // Fetch data from Sanity with error handling
  let songs = [];
  let videos = [];
  let error = null;

  try {
    // Set a shorter timeout for Sanity requests
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Sanity request timeout')), 5000)
    );
    
    [songs, videos] = await Promise.race([
      Promise.all([getSongs(), getVideos()]),
      timeoutPromise
    ]) as [any[], any[]];
  } catch (err) {
    console.error('Error fetching music data from Sanity:', err);
    error = err;
    // Fallback to config data if Sanity fails
    songs = musicConfig.songs.map((song, index) => ({
      _id: `fallback-song-${index}`,
      title: song.title,
      description: song.description,
      duration: song.duration,
      releaseDate: song.releaseYear?.toString() || '2025',
      album: (song as any).album || 'Singles',
      mdundoUrl: song.links?.mdundo || '',
      featured: (song as any).featured || false,
      isNew: (song as any).isNew || false,
      isCollaboration: (song as any).isCollaboration || false,
      isFirstSong: (song as any).isFirstSong || false,
      albumArt: null,
      songStory: song.description,
      recordingDetails: `Recorded in ${song.releaseYear}`,
      collaborators: (song as any).isCollaboration ? ['Charles Jasema', 'Worship Team'] : ['Charles Jasema']
    }));
    // Create videos from song links if available
    videos = musicConfig.songs
      .filter(song => song.links?.youtube)
      .map((song, index) => ({
        _id: `fallback-video-${index}`,
        title: song.title,
        description: song.description,
        youtubeUrl: song.links.youtube || '',
        youtubeId: song.links.youtube?.split('/').pop() || '',
        releaseDate: song.releaseYear?.toString() || '2025',
        views: 0,
        category: 'Music Video',
        featured: (song as any).featured || false,
        thumbnail: null
      }));
  }

  // Separate videos by category
  const musicVideos = videos.filter(v => v.category === 'Music Video');
  const lyricalVideos = videos.filter(v => v.category === 'Lyrical Video');

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'Charles Jasema',
    genre: ['Contemporary Gospel', 'Worship', 'Christian Music'],
    description: musicConfig.artist.description,
    foundingDate: '2015',
    foundingLocation: {
      '@type': 'Place',
      name: 'Yei, South Sudan',
    },
    member: {
      '@type': 'Person',
      name: 'Charles Jasema',
      alternateName: 'Bro Charles',
      jobTitle: 'Gospel Artist, Vocalist, Multi-Instrumentalist',
    },
    album: songs.map((song) => ({
      '@type': 'MusicAlbum',
      name: song.title,
      datePublished: song.releaseDate,
      byArtist: {
        '@type': 'Person',
        name: 'Charles Jasema',
      },
    })),
    track: songs.map((song) => ({
      '@type': 'MusicRecording',
      name: song.title,
      duration: song.duration,
      datePublished: song.releaseDate,
      description: song.description,
      url: song.mdundoUrl,
    })),
    sameAs: [
      'https://www.youtube.com/@CharlesJasemaMusic',
      'https://mdundo.com/a/148492',
      'https://www.instagram.com/charlesjasemamusic',
      'https://x.com/JasemaMusic',
      'https://www.facebook.com/share/1Aoqf2FLQ9/',
      'https://www.tiktok.com/@charlesjasemamusic',
    ],
  };

  return (
    <>
      {/* Add structured data script in head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        suppressHydrationWarning
      />
      
      <div className="min-h-screen pt-24 pb-20">
      {(error as any) && (
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded">
            <p className="text-sm">
              <strong>Note:</strong> Displaying cached content. Some information may not be up to date.
            </p>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Ministry Image */}
            <AnimatedContainer delay={0.2}>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto relative rounded-lg overflow-hidden shadow-2xl shadow-accent-red/20 hover:shadow-accent-red/30 transition-shadow duration-500">
                  <Image
                    src={imagesConfig.profile.ministry}
                    alt={`${siteConfig.name} - Music Ministry`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-red/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-gold/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </AnimatedContainer>

            {/* Text Content */}
            <AnimatedContainer>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
                  <span className="text-gray-900 dark:text-white">{musicConfig.story.title}</span>
                </h1>
                <p className="text-2xl text-accent-red font-semibold mb-6">
                  {musicConfig.story.subtitle}
                </p>
                <p className="text-lg text-gray-700 dark:text-text-secondary mb-6 leading-relaxed">
                  {musicConfig.story.description}
                </p>
                <div className="bg-gradient-to-r from-accent-red/10 to-primary-gold/10 rounded-lg p-6 mb-6 hover:from-accent-red/15 hover:to-primary-gold/15 transition-colors duration-300">
                  <p className="text-gray-800 dark:text-text-primary font-semibold">
                    <span className="text-accent-red">Mission:</span> {musicConfig.story.mission}
                  </p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300">
                  <p className="text-sm text-gray-700 dark:text-text-secondary italic">
                    "{musicConfig.story.philosophy}"
                  </p>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Ministry Stats */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {musicConfig.stats.map((stat, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                className="text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-4xl font-bold text-accent-red mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-text-tertiary">
                  {stat.label}
                </div>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Musical Skills */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-slate-100 dark:bg-slate-900 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedContainer>
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              Musical Skills & Influences
            </h2>
          </AnimatedContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Instruments */}
            <AnimatedContainer delay={0.2}>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-heading font-bold text-accent-red mb-4">Instruments</h3>
                <div className="space-y-3">
                  {musicConfig.instruments.map((instrument, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-text-secondary hover:text-accent-red dark:hover:text-accent-red transition-colors duration-200">
                      {instrument.includes('Drum') && <FaDrum className="text-accent-red" />}
                      {instrument.includes('Guitar') && <FaGuitar className="text-accent-red" />}
                      {instrument.includes('Vocal') && <FaMicrophone className="text-accent-red" />}
                      {instrument.includes('Keyboard') && <FaMusic className="text-accent-red" />}
                      <span>{instrument}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>

            {/* Influences */}
            <AnimatedContainer delay={0.4}>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-heading font-bold text-accent-red mb-4">Musical Influences</h3>
                <div className="space-y-3">
                  {musicConfig.influences.map((influence, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-text-secondary hover:text-primary-gold dark:hover:text-primary-gold transition-colors duration-200">
                      <FaMusic className="text-primary-gold" />
                      <span>{influence}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Jasema Worship Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-accent-red/5 via-primary-gold/5 to-tech-teal/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Team Logo & Visual */}
              <AnimatedContainer delay={0.2}>
                <div className="relative bg-gradient-to-br from-background-dark via-slate-900 to-background-dark p-12 flex items-center justify-center min-h-[500px]">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-gold rounded-full animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-accent-red rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-tech-teal rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  </div>
                  
                  {/* Logo */}
                  <div className="relative z-10 text-center">
                    <div className="w-64 h-64 mx-auto mb-6 relative group">
                      <div className="w-full h-full bg-gradient-to-br from-primary-gold/20 to-accent-red/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <div className="text-center">
                          <FaUsers className="text-6xl text-primary-gold mb-4 mx-auto" />
                          <div className="text-2xl font-heading font-bold text-white">
                            Jasema
                          </div>
                          <div className="text-lg text-primary-gold">
                            Worship Team
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-primary-gold/20 rounded-full blur-3xl group-hover:bg-primary-gold/30 transition-colors duration-500"></div>
                    </div>
                    
                    {/* Established Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-gold/20 backdrop-blur-sm border border-primary-gold/30 rounded-full text-primary-gold font-semibold text-sm">
                      <FaHeart className="text-accent-red" />
                      <span>Established September 2025</span>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>

              {/* Team Information */}
              <AnimatedContainer>
                <div className="p-12 bg-white dark:bg-slate-800">
                  <div className="mb-6">
                    <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                      <span className="text-primary-gold">Jasema</span> Worship Team
                    </h2>
                    <p className="text-xl text-accent-red font-semibold mb-4">
                      Expanding the Gospel Through Music & Worship
                    </p>
                    <p className="text-gray-700 dark:text-text-secondary leading-relaxed mb-6">
                      A dedicated group of worshippers established by Charles Jasema in September 2025, 
                      united by a shared passion for drawing hearts to worship and spreading the Gospel 
                      through the powerful ministry of music.
                    </p>
                  </div>

                  {/* Mission Statement */}
                  <div className="bg-gradient-to-r from-accent-red/10 to-primary-gold/10 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <FaHeart className="text-accent-red" />
                      Our Mission
                    </h3>
                    <p className="text-gray-800 dark:text-text-primary font-medium italic">
                      "To evangelize the Gospel through music, drawing hearts to worship and creating 
                      transformative worship experiences that bring people closer to God."
                    </p>
                  </div>

                  {/* Ministry Activities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <FaRecordVinyl className="text-primary-gold text-xl" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Song Production</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        Creating original worship songs and contemporary gospel music
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <FaMicrophone className="text-accent-red text-xl" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Live Performances</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        Leading worship at churches, conferences, and special events
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <FaVideo className="text-tech-teal text-xl" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Video Production</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        Producing worship videos and visual content for ministry
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <FaUsers className="text-primary-gold text-xl" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Community Outreach</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        School outreaches, community events, and evangelistic concerts
                      </p>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center">
                    <p className="text-gray-700 dark:text-text-secondary mb-4">
                      Join us in this ministry of worship and evangelism
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/contact">
                        <Button variant="primary" size="md" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                          Book the Team
                        </Button>
                      </Link>
                      <Link href="/music">
                        <Button variant="secondary" size="md" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                          Listen to Our Music
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Music Videos Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Music Videos
              </h2>
              <p className="text-gray-700 dark:text-text-secondary text-lg">
                Watch official music videos with full production and cinematic storytelling
              </p>
            </div>
          </AnimatedContainer>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicVideos.map((video) => (
              <Card
                key={video._id}
                variant="elevated"
                padding="none"
                className="overflow-hidden group cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
              >
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col">
                  {/* Video Thumbnail - Fixed aspect ratio */}
                  <div className="aspect-video bg-gradient-to-br from-accent-red/20 to-primary-gold/20 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    {video.thumbnail ? (
                      <Image
                        src={urlFor(video.thumbnail).width(640).height(360).url()}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <FaPlay className="text-6xl text-accent-red/50 group-hover:scale-110 transition-transform duration-300" />
                    )}
                    {video.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-accent-red text-white text-xs font-bold rounded-full z-10 animate-pulse">
                        FEATURED
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-background-dark/80 text-white text-xs rounded z-10">
                      {video.views} views
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  {/* Video Info - Flexible content area */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <span className="text-xs text-accent-red font-semibold uppercase tracking-wide">
                        {video.category}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 mt-1 group-hover:text-accent-red transition-colors duration-300 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-text-secondary mb-4 line-clamp-3">
                        {video.description}
                      </p>
                    </div>
                    
                    {/* Footer - Always at bottom */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-text-tertiary">
                        {video.releaseDate}
                      </span>
                      <div className="flex items-center gap-2">
                        <SocialShare
                          url={video.youtubeUrl}
                          title={`${video.title} - Charles Jasema`}
                          description={video.description}
                          variant="compact"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75"
                        />
                        <span className="inline-flex items-center gap-2 text-accent-red hover:text-accent-red/80 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                          Watch on YouTube
                          <FaExternalLinkAlt className="text-xs" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Lyrical Videos Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-slate-100 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Lyrical Videos
              </h2>
              <p className="text-gray-700 dark:text-text-secondary text-lg">
                Worship along with lyrics on screen - perfect for personal devotion and group worship
              </p>
            </div>
          </AnimatedContainer>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lyricalVideos.map((video) => (
              <Card
                key={video._id}
                variant="elevated"
                padding="none"
                className="overflow-hidden group cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
              >
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col">
                  {/* Video Thumbnail - Fixed aspect ratio */}
                  <div className="aspect-video bg-gradient-to-br from-primary-gold/20 to-tech-teal/20 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    {video.thumbnail ? (
                      <Image
                        src={urlFor(video.thumbnail).width(640).height(360).url()}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <FaPlay className="text-6xl text-primary-gold/50 group-hover:scale-110 transition-transform duration-300" />
                    )}
                    {video.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full z-10 animate-pulse">
                        FEATURED
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-background-dark/80 text-white text-xs rounded z-10">
                      {video.views} views
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  {/* Video Info - Flexible content area */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <span className="text-xs text-primary-gold font-semibold uppercase tracking-wide">
                        {video.category}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 mt-1 group-hover:text-primary-gold transition-colors duration-300 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-text-secondary mb-4 line-clamp-3">
                        {video.description}
                      </p>
                    </div>
                    
                    {/* Footer - Always at bottom */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-text-tertiary">
                        {video.releaseDate}
                      </span>
                      <div className="flex items-center gap-2">
                        <SocialShare
                          url={video.youtubeUrl}
                          title={`${video.title} - Charles Jasema`}
                          description={video.description}
                          variant="compact"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75"
                        />
                        <span className="inline-flex items-center gap-2 text-primary-gold hover:text-primary-gold/80 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                          Watch on YouTube
                          <FaExternalLinkAlt className="text-xs" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Audio Songs Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Audio Songs
              </h2>
              <p className="text-gray-700 dark:text-text-secondary text-lg">
                Listen to all {songs.length} singles with stories, recording details, and streaming links
              </p>
            </div>
          </AnimatedContainer>

          <MusicClient songs={songs} />
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-gradient-to-r from-accent-red/10 via-primary-gold/10 to-tech-teal/10 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedContainer>
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Listen on Your Favorite Platform
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg mb-12">
              Stream my music on all major platforms and discover new releases first
            </p>
          </AnimatedContainer>

          <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {musicConfig.platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group"
              >
                <div className="flex flex-col items-center gap-3">
                  {platform.icon === 'youtube' && <FaYoutube className="text-5xl text-accent-red group-hover:scale-110 transition-transform duration-300" />}
                  {platform.icon === 'music' && <FaMusic className="text-5xl text-primary-gold group-hover:scale-110 transition-transform duration-300" />}
                  {platform.icon === 'spotify' && <SiSpotify className="text-5xl text-tech-teal group-hover:scale-110 transition-transform duration-300" />}
                  {platform.icon === 'apple' && <SiApplemusic className="text-5xl text-primary-gold group-hover:scale-110 transition-transform duration-300" />}
                  <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent-red transition-colors duration-300">
                    {platform.name}
                  </span>
                </div>
              </a>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <MusicPageCTAs />
        </div>
      </section>

      {/* Social Follow Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedContainer>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Follow Charles Jasema Music
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-8">
              Stay connected for new releases, behind-the-scenes content, and worship moments.
            </p>
            <SocialFollow variant="grid" showLabels={true} showUsernames={true} />
          </AnimatedContainer>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <div className="max-w-4xl mx-auto">
          <SocialProof variant="grid" animated={true} />
        </div>
      </section>
      </div>
    </>
  );
}
