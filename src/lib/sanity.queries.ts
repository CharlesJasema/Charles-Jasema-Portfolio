import { groq } from 'next-sanity'
import { client } from './sanity.client'

// Type definitions for content
export interface Song {
  _id: string
  title: string
  description: string
  duration: string
  releaseDate: string
  album: string
  mdundoUrl: string
  featured: boolean
  isNew: boolean
  isCollaboration?: boolean
  isFirstSong?: boolean
  albumArt?: string
}

export interface MusicVideo {
  _id: string
  title: string
  description: string
  youtubeUrl: string
  youtubeId: string
  releaseDate: string
  views: string
  category: string
  featured: boolean
  thumbnail?: string
}

// Check if we're in build time or if Sanity is not configured
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL
const hasValidSanityConfig = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== '' && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'dummy-project-id'

// Mock function for build time
const mockQuery = async (): Promise<any[]> => {
  console.log('Sanity CMS not configured or build time, returning empty data')
  return []
}

const mockSingleQuery = async (): Promise<any> => {
  console.log('Sanity CMS not configured or build time, returning null')
  return null
}

export interface Project {
  _id: string
  title: string
  category: string
  description: string
  images: Array<{ url: string; alt?: string }>
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  order?: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  category: string
  excerpt: string
  content: any[] // Portable Text
  featuredImage: { url: string; alt?: string }
  author: string
  publishDate: string
  readTime: number
  tags: string[]
  featured: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: { url: string }
  }
}

export interface Lyrics {
  _id: string
  songTitle: string
  artist: string
  album: string
  releaseYear: string
  language: string
  verses: Array<{
    type: string
    lines: string[]
  }>
  notes?: string
  youtubeUrl?: string
  mdundoUrl?: string
  featured: boolean
}

export interface PersonalInfo {
  _id: string
  name: string
  title: string
  bio: string[]
  shortBio: string
  location: string
  email: string
  phone?: string
  professionalPhoto: { url: string; alt?: string }
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    youtube?: string
    facebook?: string
  }
  cvDownloadUrl?: string
  yearsOfExperience?: number
  availability?: string
}

export interface Education {
  _id: string
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate?: string
  location?: string
  description?: string
  achievements?: string[]
  skills?: string[]
  logo?: { url: string; alt?: string }
  order: number
  featured: boolean
}

export interface WorkExperience {
  _id: string
  position: string
  company: string
  employmentType: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  location?: string
  description: string
  responsibilities?: string[]
  achievements?: string[]
  technologies?: string[]
  companyLogo?: { url: string; alt?: string }
  category: string
  order: number
  featured: boolean
}

export interface Skill {
  _id: string
  name: string
  category: string
  subcategory?: string
  proficiencyLevel?: string
  yearsOfExperience?: number
  description?: string
  relatedTools?: string[]
  icon?: string
  order: number
  featured: boolean
}

/**
 * Fetch all songs with ISR revalidation (60 seconds)
 */
export async function getSongs(): Promise<Song[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  return client.fetch(
    groq`*[_type == "song"] | order(releaseDate desc) {
      _id,
      title,
      description,
      duration,
      releaseDate,
      album,
      mdundoUrl,
      featured,
      isNew,
      isCollaboration,
      isFirstSong,
      "albumArt": albumArt.asset->url
    }`,
    {},
    {
      next: { revalidate: 60, tags: ['songs'] }
    }
  )
}

/**
 * Fetch all music videos and lyrical videos
 */
export async function getVideos(): Promise<MusicVideo[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  return client.fetch(
    groq`*[_type == "musicVideo"] | order(releaseDate desc) {
      _id,
      title,
      description,
      youtubeUrl,
      youtubeId,
      releaseDate,
      views,
      category,
      featured,
      "thumbnail": thumbnail.asset->url
    }`,
    {},
    {
      next: { revalidate: 60, tags: ['videos'] }
    }
  )
}

/**
 * Fetch all portfolio projects with optional category filtering
 */
export async function getProjects(category?: string): Promise<Project[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  const filter = category ? `*[_type == "project" && category == $category]` : `*[_type == "project"]`
  
  return client.fetch(
    groq`${filter} | order(order asc, _createdAt desc) {
      _id,
      title,
      category,
      description,
      "images": images[]{
        "url": asset->url,
        "alt": coalesce(alt, "Project screenshot")
      },
      tags,
      githubUrl,
      liveUrl,
      featured,
      order
    }`,
    { category },
    {
      next: { revalidate: 60, tags: ['projects'] }
    }
  )
}

/**
 * Fetch all blog posts with pagination support
 */
export async function getBlogPosts(limit?: number, offset: number = 0): Promise<BlogPost[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  const limitClause = limit ? `[${offset}...${offset + limit}]` : ''
  
  return client.fetch(
    groq`*[_type == "blogPost"] | order(publishDate desc) ${limitClause} {
      _id,
      title,
      slug,
      category,
      excerpt,
      content,
      "featuredImage": {
        "url": featuredImage.asset->url,
        "alt": featuredImage.alt
      },
      author,
      publishDate,
      readTime,
      tags,
      featured,
      seo {
        metaTitle,
        metaDescription,
        "ogImage": ogImage.asset->url
      }
    }`,
    {},
    {
      next: { revalidate: 60, tags: ['blog'] }
    }
  )
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasValidSanityConfig) {
    return null
  }
  
  return client.fetch(
    groq`*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      excerpt,
      content,
      "featuredImage": {
        "url": featuredImage.asset->url,
        "alt": featuredImage.alt
      },
      author,
      publishDate,
      readTime,
      tags,
      featured,
      seo {
        metaTitle,
        metaDescription,
        "ogImage": ogImage.asset->url
      }
    }`,
    { slug },
    {
      next: { revalidate: 60, tags: ['blog'] }
    }
  ) as Promise<BlogPost | null>
}

/**
 * Fetch all song lyrics
 */
export async function getLyrics(): Promise<Lyrics[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  return client.fetch(
    groq`*[_type == "lyrics"] | order(releaseYear desc) {
      _id,
      songTitle,
      artist,
      album,
      releaseYear,
      language,
      verses,
      notes,
      youtubeUrl,
      mdundoUrl,
      featured
    }`,
    {},
    {
      next: { revalidate: 60, tags: ['lyrics'] }
    }
  )
}

/**
 * Fetch featured content for home page
 */
export async function getFeaturedContent() {
  if (!hasValidSanityConfig) {
    return {
      songs: [],
      projects: [],
      blogPosts: []
    }
  }
  
  const [songs, projects, blogPosts] = await Promise.all([
    client.fetch(
      groq`*[_type == "song" && featured == true] | order(releaseDate desc) [0...3] {
        _id,
        title,
        description,
        duration,
        releaseDate,
        album,
        mdundoUrl,
        featured,
        isNew,
        "albumArt": albumArt.asset->url
      }`,
      {},
      { next: { revalidate: 60, tags: ['songs'] } }
    ),
    client.fetch(
      groq`*[_type == "project" && featured == true] | order(order asc) [0...3] {
        _id,
        title,
        category,
        description,
        "images": images[]{
          "url": asset->url,
          "alt": coalesce(alt, "Project screenshot")
        },
        tags,
        githubUrl,
        liveUrl,
        featured
      }`,
      {},
      { next: { revalidate: 60, tags: ['projects'] } }
    ),
    client.fetch(
      groq`*[_type == "blogPost" && featured == true] | order(publishDate desc) [0...3] {
        _id,
        title,
        slug,
        category,
        excerpt,
        "featuredImage": {
          "url": featuredImage.asset->url,
          "alt": featuredImage.alt
        },
        author,
        publishDate,
        readTime,
        tags,
        featured
      }`,
      {},
      { next: { revalidate: 60, tags: ['blog'] } }
    )
  ])

  return { songs, projects, blogPosts }
}

/**
 * Fetch personal information
 */
export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  if (!hasValidSanityConfig) {
    return null
  }
  
  return client.fetch(
    groq`*[_type == "personalInfo"][0] {
      _id,
      name,
      title,
      bio,
      shortBio,
      location,
      email,
      phone,
      "professionalPhoto": {
        "url": professionalPhoto.asset->url,
        "alt": professionalPhoto.alt
      },
      socialLinks,
      cvDownloadUrl,
      yearsOfExperience,
      availability
    }`,
    {},
    {
      next: { revalidate: 3600, tags: ['personal-info'] }
    }
  ) as Promise<PersonalInfo | null>
}

/**
 * Fetch all education entries
 */
export async function getEducation(): Promise<Education[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  return client.fetch(
    groq`*[_type == "education"] | order(order asc, startDate desc) {
      _id,
      institution,
      degree,
      field,
      startDate,
      endDate,
      location,
      description,
      achievements,
      skills,
      "logo": logo.asset->url,
      order,
      featured
    }`,
    {},
    {
      next: { revalidate: 3600, tags: ['education'] }
    }
  )
}

/**
 * Fetch all work experience entries
 */
export async function getWorkExperience(): Promise<WorkExperience[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  return client.fetch(
    groq`*[_type == "workExperience"] | order(order asc, startDate desc) {
      _id,
      position,
      company,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      location,
      description,
      responsibilities,
      achievements,
      technologies,
      "companyLogo": companyLogo.asset->url,
      category,
      order,
      featured
    }`,
    {},
    {
      next: { revalidate: 3600, tags: ['work-experience'] }
    }
  )
}

/**
 * Fetch all skills grouped by category
 */
export async function getSkills(): Promise<Skill[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  return client.fetch(
    groq`*[_type == "skill"] | order(category asc, order asc) {
      _id,
      name,
      category,
      subcategory,
      proficiencyLevel,
      yearsOfExperience,
      description,
      relatedTools,
      icon,
      order,
      featured
    }`,
    {},
    {
      next: { revalidate: 3600, tags: ['skills'] }
    }
  )
}

/**
 * Fetch featured skills for homepage
 */
export async function getFeaturedSkills(): Promise<Skill[]> {
  if (!hasValidSanityConfig) {
    return mockQuery()
  }
  
  return client.fetch(
    groq`*[_type == "skill" && featured == true] | order(order asc) {
      _id,
      name,
      category,
      subcategory,
      proficiencyLevel,
      relatedTools,
      icon,
      order
    }`,
    {},
    {
      next: { revalidate: 3600, tags: ['skills'] }
    }
  )
}
