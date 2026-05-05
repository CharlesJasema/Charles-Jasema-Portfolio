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

/**
 * Fetch all songs with ISR revalidation (60 seconds)
 */
export async function getSongs(): Promise<Song[]> {
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
  const filter = category ? `*[_type == "project" && category == $category]` : `*[_type == "project"]`
  
  return client.fetch(
    groq`${filter} | order(order asc, _createdAt desc) {
      _id,
      title,
      category,
      description,
      "images": images[]{
        "url": asset->url,
        "alt": alt
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
  )
}

/**
 * Fetch all song lyrics
 */
export async function getLyrics(): Promise<Lyrics[]> {
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
          "alt": alt
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
