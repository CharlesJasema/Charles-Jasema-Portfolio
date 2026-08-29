'use client';

'use client';

import { EnhancedMusicShowcase } from '@/components/music';
import { PerformanceGallery } from '@/components/music/PerformanceGallery';
import { Card } from '@/components/ui';
import { HeroImage } from '@/components/HeroImage';
import { LogoImage } from '@/components/ui/LogoImage';

export default function MusicPage() {
  const featuredSongs = [
    {
      id: 1,
      title: 'Grace Unending',
      description: 'A powerful contemporary gospel song about God\'s endless grace and mercy, inspiring believers to trust in His unfailing love.',
      duration: '4:32',
      genre: 'Contemporary Gospel',
      year: '2024',
      image: '/images/logos/charles-jasema-music-logo.jpg',
      videoUrl: 'https://youtu.be/93aDMyV9cxs?si=2eVLNCPZYyFompCt',
      streamingLinks: {
        mdundo: 'https://mdundo.com/song/1377029',
        youtube: 'https://youtu.be/93aDMyV9cxs?si=2eVLNCPZYyFompCt',
      }
    },
    {
      id: 2,
      title: 'Worship in Spirit',
      description: 'An uplifting worship anthem that calls believers to worship in spirit and truth, creating an atmosphere of genuine praise.',
      duration: '5:18',
      genre: 'Worship',
      year: '2023',
      image: '/images/logos/charles-jasema-music-logo.jpg',
      videoUrl: 'https://youtu.be/h92v-RDVJds?si=OoCFoCH8Rzr2m1G2',
      streamingLinks: {
        mdundo: 'https://mdundo.com/song/1377029',
        youtube: 'https://youtu.be/h92v-RDVJds?si=OoCFoCH8Rzr2m1G2',
      }
    },
    {
      id: 3,
      title: 'Hope Rising',
      description: 'A message of hope and restoration for those going through difficult times, reminding us that God\'s plans are for our good.',
      duration: '3:45',
      genre: 'Inspirational',
      year: '2023',
      image: '/images/logos/charles-jasema-music-logo.jpg',
      videoUrl: 'https://youtu.be/hGJjMPXc544?si=GUuVslINSLtP9Adw',
      streamingLinks: {
        mdundo: 'https://mdundo.com/song/1377029',
        youtube: 'https://youtu.be/hGJjMPXc544?si=GUuVslINSLtP9Adw',
      }
    },
    {
      id: 4,
      title: 'Ministry Highlights',
      description: 'A compilation of live ministry moments and community outreach through gospel music and worship leadership.',
      duration: '6:20',
      genre: 'Ministry Documentary',
      year: '2024',
      image: '/images/professional/Performance 1.png',
      videoUrl: 'https://youtu.be/5LJ2kqwd5jM?si=Tl1_MD8HE36fmT8N',
      streamingLinks: {
        mdundo: 'https://mdundo.com/song/1377029',
        youtube: 'https://youtu.be/5LJ2kqwd5jM?si=Tl1_MD8HE36fmT8N',
      }
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <LogoImage
              src="/images/logos/charles-jasema-music-logo.jpg"
              alt="Charles Jasema Music"
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Charles Jasema
            <span className="block text-2xl md:text-3xl text-primary-gold font-normal mt-2">
              Music Ministry
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Spreading hope, faith, and love through contemporary gospel music. 
            Inspiring worship and building community through the power of song.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mdundo.com/song/1377029"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary-gold hover:bg-primary-gold-dark text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Listen on Mdundo
            </a>
            <a
              href="https://www.youtube.com/@CharlesJasemaMusic"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Featured Songs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Songs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSongs.map((song) => (
              <Card key={song.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <HeroImage
                  src={song.image}
                  alt={song.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {song.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {song.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {song.duration} • {song.genre}
                    </span>
                    <span className="text-sm text-primary-gold font-semibold">
                      {song.year}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={song.streamingLinks.mdundo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-primary-gold text-white text-center rounded-md hover:bg-primary-gold-dark transition-colors duration-200 text-sm font-medium"
                    >
                      Listen
                    </a>
                    <a
                      href={song.videoUrl || song.streamingLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-center rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200 text-sm font-medium"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Gallery */}
      <PerformanceGallery className="bg-white dark:bg-slate-800" />

      {/* Community Outreach Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Music Ministry & Community Outreach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Church Service */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <HeroImage
                src="/images/ministry/charles-jasema-ministry-photo.jpg"
                alt="Charles Jasema leading worship at church service"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Church Worship Leadership
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Leading worship services and inspiring congregations through contemporary gospel music and heartfelt worship.
                </p>
              </div>
            </Card>

            {/* Community Outreach */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <HeroImage
                src="/images/professional/charles-jasema-professional.jpg"
                alt="Charles Jasema at community outreach event"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Community Outreach
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Reaching out to communities through music ministry, sharing hope and building relationships across cultural boundaries.
                </p>
              </div>
            </Card>

            {/* Youth Ministry */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <LogoImage
                src="/images/logos/charles-jasema-music-logo.jpg"
                alt="Charles Jasema ministering to youth"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Youth Ministry
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Mentoring and inspiring young people through music, helping them discover their purpose and develop their talents.
                </p>
              </div>
            </Card>
          </div>

          {/* Ministry Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">8+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years in Ministry</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Church Services Led</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Original Songs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Music Ministry
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Since 2015, I've been blessed to serve in music ministry, leading worship 
                and inspiring faith through contemporary gospel music. My mission is to 
                create music that touches hearts and draws people closer to God.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>
                  Worship Leader & Songwriter
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>
                  Contemporary Gospel Artist
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>
                  Community Outreach Through Music
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-gold rounded-full mr-3"></span>
                  Youth & Adult Choir Direction
                </li>
              </ul>
            </Card>
            
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Connect With My Music
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay connected with my latest releases, live performances, and ministry updates 
                through various platforms.
              </p>
              <div className="space-y-3">
                <a
                  href="https://www.youtube.com/@CharlesJasemaMusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">Y</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">YouTube Channel</span>
                </a>
                <a
                  href="https://mdundo.com/song/1377029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">Mdundo Music</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}