// @ts-nocheck
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card } from '@/components/ui';
import { FaCode, FaPalette, FaMusic, FaVideo, FaArrowRight, FaImage } from 'react-icons/fa';
import { getPersonalInfo, getFeaturedContent, getFeaturedSkills } from '@/lib/sanity.queries';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function HomePage() {
  // Parallel data fetching
  const [personalInfo, featuredContent, featuredSkills] = await Promise.all([
    getPersonalInfo(),
    getFeaturedContent(),
    getFeaturedSkills()
  ]);

  // Handle null personal info
  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading personal information...</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-text-tertiary">
            If this persists, please refresh the page
          </p>
        </div>
      </div>
    );
  }

  // Destructure featured content with defaults
  const { songs = [], projects = [], blogPosts = [] } = featuredContent || {};

  // Group skills by category
  const skillsByCategory = featuredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof featuredSkills>);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-background-dark dark:via-slate-900 dark:to-background-dark opacity-50" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold">
              <span className="text-gray-900 dark:text-white">Hi, I'm </span>
              <span className="text-primary-gold">{personalInfo.name}</span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
              {personalInfo.title}
            </p>
            
            <p className="text-lg text-gray-600 dark:text-text-tertiary max-w-2xl mx-auto">
              {personalInfo.shortBio || personalInfo.bio[0]}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/portfolio">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  View My Work
                  <FaArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
              Bridging technology and creativity to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Software Engineering */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-primary-gold text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Software Engineering
              </h3>
              {skillsByCategory.software && skillsByCategory.software.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.software.slice(0, 5).map((skill: any) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Building scalable web applications with modern technologies and best practices
                </p>
              )}
            </Card>

            {/* Graphics Design */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-tech-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPalette className="text-tech-teal text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Graphics Design
              </h3>
              {skillsByCategory.design && skillsByCategory.design.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.design.slice(0, 5).map((skill: any) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Creating stunning visual identities and user interfaces that captivate
                </p>
              )}
            </Card>

            {/* Gospel Music */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMusic className="text-accent-red text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Gospel Music
              </h3>
              {skillsByCategory.music && skillsByCategory.music.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.music.slice(0, 5).map((skill: any) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Worship leader and gospel artist spreading hope through music
                </p>
              )}
            </Card>

            {/* Videography */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaVideo className="text-primary-gold text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Videography
              </h3>
              {skillsByCategory.videography && skillsByCategory.videography.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.videography.slice(0, 5).map((skill: any) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Capturing moments and telling stories through compelling video content
                </p>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
                Featured Projects
              </h2>
              <Link href="/portfolio" className="text-primary-gold hover:text-primary-gold/80 font-semibold">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project: any) => (
                <Link key={project._id} href="/portfolio">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                    {project.images?.[0]?.url ? (
                      <div className="relative w-full h-48">
                        <Image
                          src={project.images[0].url}
                          alt={project.images[0].alt || project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <FaImage className="text-slate-400 text-4xl" />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-3 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary mb-4">
                        {project.description.substring(0, 150)}{project.description.length > 150 && '...'}
                      </p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag: any, index: any) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-tech-teal/10 text-tech-teal rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Songs Section */}
      {songs.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
                Latest Songs
              </h2>
              <Link href="/music" className="text-primary-gold hover:text-primary-gold/80 font-semibold">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {songs.slice(0, 3).map((song: any) => (
                <Link key={song._id} href="/music">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative">
                      {song.albumArt ? (
                        <div className="relative w-full aspect-square">
                          <Image
                            src={song.albumArt}
                            alt={`${song.title} album art`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-square bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <FaMusic className="text-slate-400 text-4xl" />
                        </div>
                      )}
                      {song.isNew && (
                        <span className="absolute top-2 right-2 px-3 py-1 bg-accent-red text-white text-xs rounded-full">
                          New Release
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-1">
                        {song.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary mb-1">{song.album}</p>
                      <p className="text-xs text-gray-500 dark:text-text-tertiary">
                        {new Date(song.releaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Insights Section */}
      {blogPosts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
                Recent Insights
              </h2>
              <Link href="/blog" className="text-primary-gold hover:text-primary-gold/80 font-semibold">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post: any) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                    {post.featuredImage?.url ? (
                      <div className="relative w-full h-48">
                        <Image
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <FaImage className="text-slate-400 text-4xl" />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs px-3 py-1 bg-tech-teal/10 text-tech-teal rounded-full">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-3 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary mb-4">
                        {post.excerpt.substring(0, 120)}{post.excerpt.length > 120 && '...'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-text-tertiary">
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Whether you need a performer for your event or a developer for your project, Charles is here to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get In Touch
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="secondary" size="lg">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
