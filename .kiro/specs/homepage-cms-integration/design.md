# Design Document: Homepage CMS Integration

## Overview

This design document details the technical implementation for integrating the Charles Jasema Portfolio homepage with Sanity CMS. The homepage currently uses hardcoded content from the `siteConfig` file and will be transformed to dynamically fetch and display real content from Sanity CMS.

### Design Objectives

1. **Follow Established Patterns**: Replicate the successful About page integration pattern, including Server Component architecture, ISR caching strategy, and type-safe data fetching
2. **Dynamic Content Replacement**: Replace all hardcoded content with CMS-driven data including personal information, featured projects, songs, blog posts, and skills
3. **Performance Optimization**: Implement parallel data fetching, ISR caching, and optimized image loading to maintain fast page load times
4. **Type Safety**: Leverage existing TypeScript interfaces and add proper null checks for robust error handling
5. **Preserve UX**: Maintain the existing design system, layout structure, and user experience while adding new featured content sections

### Scope

**In Scope:**
- Fetching personal information from Sanity CMS using `getPersonalInfo()`
- Fetching featured content using `getFeaturedContent()` and `getFeaturedSkills()`
- Replacing hero section content with dynamic data from Sanity
- Adding three new featured content sections: Featured Projects, Latest Songs, and Recent Insights (blog posts)
- Enhancing the "What I Do" section with skills from Sanity CMS
- Implementing loading states and error handling patterns
- Optimizing performance with parallel data fetching and ISR

**Out of Scope:**
- Creating new Sanity schemas or modifying existing schemas
- Building new UI components (reuse existing components from UI library)
- Implementing client-side interactivity or animations beyond existing patterns
- Adding new features beyond CMS integration (e.g., filtering, search, pagination)
- Modifying the About page or other pages
- SEO metadata updates (will be handled in a separate initiative)

### Success Criteria

1. Homepage successfully fetches and displays all content from Sanity CMS
2. Page maintains sub-2-second initial load time
3. All TypeScript types are properly defined with no type errors
4. Graceful degradation with appropriate fallback UI for missing or failed content
5. Visual design and user experience remain unchanged from current implementation
6. Code follows the pattern established by the About page integration

---

## Architecture

### High-Level Architecture

The homepage follows Next.js 13+ App Router Server Component architecture with the following data flow:

```
┌─────────────────────────────────────────────────────────────┐
│                    Homepage (page.tsx)                      │
│                   Next.js Server Component                  │
└────────────────┬───────────────────────────────────────────┘
                 │
                 │ Parallel async data fetching
                 │
      ┌──────────┼──────────┬──────────────┬─────────────┐
      │          │           │              │             │
      ▼          ▼           ▼              ▼             ▼
┌──────────┐ ┌─────────┐ ┌────────┐ ┌────────────┐ ┌──────────┐
│Personal  │ │Featured │ │Featured│ │  Featured  │ │Featured  │
│   Info   │ │Projects │ │ Songs  │ │ Blog Posts │ │ Skills   │
└─────┬────┘ └────┬────┘ └───┬────┘ └──────┬─────┘ └────┬─────┘
      │           │           │             │            │
      │           └───────────┴─────────────┴────────────┘
      │                       │
      │                getFeaturedContent()
      │                       │
      ▼                       ▼
┌──────────────────────────────────────────────────────────────┐
│              Sanity Client (sanity.queries.ts)               │
│              - getPersonalInfo()                             │
│              - getFeaturedContent()                          │
│              - getFeaturedSkills()                           │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ GROQ queries with ISR revalidation
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                      Sanity CMS                              │
│              Content Lake + CDN                              │
└──────────────────────────────────────────────────────────────┘
```

### Component Structure

```
HomePage (Server Component)
├── Hero Section
│   ├── Personal Info (from Sanity)
│   ├── Gradient Background
│   └── CTA Buttons (static)
│
├── "What I Do" Section
│   ├── Category Cards (4 cards)
│   │   ├── Software Engineering (with featured skills)
│   │   ├── Graphics Design (with featured skills)
│   │   ├── Gospel Music (with featured skills)
│   │   └── Videography (with featured skills)
│
├── Featured Projects Section (NEW)
│   ├── Section Header with "View All" link
│   ├── Project Cards (up to 3)
│   └── Empty State (if no projects)
│
├── Latest Songs Section (NEW)
│   ├── Section Header with "View All" link
│   ├── Song Cards (up to 3)
│   └── Empty State (if no songs)
│
├── Recent Insights Section (NEW)
│   ├── Section Header with "View All" link
│   ├── Blog Post Cards (up to 3)
│   └── Empty State (if no posts)
│
└── Call-to-Action Section
    └── CTA Buttons (static)
```

### Data Flow Pattern

Following the About page pattern, the homepage will:

1. **Server-Side Data Fetching**: Use async/await at the component level to fetch data on the server
2. **Parallel Requests**: Execute all Sanity queries in parallel using `Promise.all()` to minimize latency
3. **ISR Caching**: Configure 60-second revalidation for featured content and personal info
4. **Null Handling**: Check for null/undefined responses and render appropriate fallback UI
5. **Type Safety**: Use TypeScript interfaces exported from `sanity.queries.ts`

Example data fetching pattern:
```typescript
export default async function HomePage() {
  // Parallel data fetching
  const [personalInfo, featuredContent, featuredSkills] = await Promise.all([
    getPersonalInfo(),
    getFeaturedContent(),
    getFeaturedSkills()
  ]);

  // Handle null responses
  if (!personalInfo) {
    return <LoadingState />;
  }

  // Destructure featured content safely
  const { songs = [], projects = [], blogPosts = [] } = featuredContent || {};

  // Render with fetched data
  return (
    <div>
      <HeroSection personalInfo={personalInfo} />
      {/* ... */}
    </div>
  );
}
```

---

## Components and Interfaces

### 1. HomePage Component (Server Component)

**File**: `src/app/page.tsx`

**Type**: Next.js Server Component (async)

**Responsibilities**:
- Fetch data from Sanity CMS in parallel
- Handle null/undefined responses gracefully
- Pass data to UI sections
- Manage loading and error states

**Props**: None (page component)

**Data Dependencies**:
- `getPersonalInfo()` - Returns `PersonalInfo | null`
- `getFeaturedContent()` - Returns `{ songs: Song[], projects: Project[], blogPosts: BlogPost[] }`
- `getFeaturedSkills()` - Returns `Skill[]`

### 2. Hero Section

**Location**: Inline JSX within HomePage component

**Data**: 
- `personalInfo: PersonalInfo`
  - `name: string`
  - `title: string`
  - `shortBio: string` or `bio[0]: string`

**UI Elements**:
- Gradient background (preserved from current design)
- Main heading with name highlighted in gold
- Subtitle with professional title
- Bio paragraph
- Two CTA buttons: "View My Work" and "Get In Touch"

### 3. "What I Do" Section

**Location**: Inline JSX within HomePage component

**Data**:
- `featuredSkills: Skill[]` grouped by category
- Categories: `software`, `design`, `music`, `videography`

**UI Elements**:
- Four category cards using existing `Card` component
- Category icon and name
- Top 3-4 featured skills per category
- Hover effects and animations (preserved)

**Skill Grouping Logic**:
```typescript
// Group skills by category
const skillsByCategory = featuredSkills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);
```

### 4. Featured Projects Section (NEW)

**Location**: Inline JSX within HomePage component

**Data**:
- `projects: Project[]` (up to 3 items)

**UI Elements**:
- Section heading: "Featured Projects"
- "View All" link to `/portfolio`
- Project cards in 3-column grid (responsive)
- Each card displays:
  - Project image (first image from `images` array)
  - Project title
  - Category badge
  - Short description (truncated to ~150 characters)
  - Tags (up to 4 tags)

**Card Structure**:
```typescript
{project.images[0] && (
  <Image
    src={project.images[0].url}
    alt={project.images[0].alt || project.title}
    width={400}
    height={300}
    className="w-full h-48 object-cover rounded-t-lg"
  />
)}
<div className="p-6">
  <span className="text-xs px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full">
    {project.category}
  </span>
  <h3 className="text-xl font-heading font-bold mt-3">{project.title}</h3>
  <p className="text-sm text-gray-600 dark:text-text-tertiary mt-2">
    {project.description.substring(0, 150)}...
  </p>
  <div className="flex flex-wrap gap-2 mt-4">
    {project.tags.slice(0, 4).map(tag => (
      <span className="text-xs px-2 py-1 bg-tech-teal/10 text-tech-teal rounded">
        {tag}
      </span>
    ))}
  </div>
</div>
```

### 5. Latest Songs Section (NEW)

**Location**: Inline JSX within HomePage component

**Data**:
- `songs: Song[]` (up to 3 items)

**UI Elements**:
- Section heading: "Latest Songs"
- "View All" link to `/music`
- Song cards in 3-column grid (responsive)
- Each card displays:
  - Album art image
  - Song title
  - Album name
  - Release date
  - "New Release" badge (if `isNew: true`)
  - Play button link to Mdundo

**Card Structure**:
```typescript
<div className="relative">
  {song.albumArt && (
    <Image
      src={song.albumArt}
      alt={`${song.title} album art`}
      width={300}
      height={300}
      className="w-full aspect-square object-cover rounded-lg"
    />
  )}
  {song.isNew && (
    <span className="absolute top-2 right-2 px-3 py-1 bg-accent-red text-white text-xs rounded-full">
      New Release
    </span>
  )}
</div>
<div className="mt-4">
  <h3 className="text-lg font-heading font-bold">{song.title}</h3>
  <p className="text-sm text-gray-600 dark:text-text-tertiary">{song.album}</p>
  <p className="text-xs text-gray-500 dark:text-text-tertiary mt-1">
    {new Date(song.releaseDate).toLocaleDateString()}
  </p>
</div>
```

### 6. Recent Insights Section (NEW)

**Location**: Inline JSX within HomePage component

**Data**:
- `blogPosts: BlogPost[]` (up to 3 items)

**UI Elements**:
- Section heading: "Recent Insights"
- "View All" link to `/blog`
- Blog post cards in 3-column grid (responsive)
- Each card displays:
  - Featured image
  - Category badge
  - Post title
  - Excerpt (truncated to ~120 characters)
  - Publish date and read time
  - Author name

**Card Structure**:
```typescript
{post.featuredImage && (
  <Image
    src={post.featuredImage.url}
    alt={post.featuredImage.alt || post.title}
    width={400}
    height={250}
    className="w-full h-48 object-cover rounded-t-lg"
  />
)}
<div className="p-6">
  <span className="text-xs px-3 py-1 bg-tech-teal/10 text-tech-teal rounded-full">
    {post.category}
  </span>
  <h3 className="text-xl font-heading font-bold mt-3">{post.title}</h3>
  <p className="text-sm text-gray-600 dark:text-text-tertiary mt-2">
    {post.excerpt.substring(0, 120)}...
  </p>
  <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 dark:text-text-tertiary">
    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
    <span>•</span>
    <span>{post.readTime} min read</span>
  </div>
</div>
```

### 7. Empty State Component

**Purpose**: Display when no featured content is available

**UI**:
```typescript
<div className="text-center py-12">
  <p className="text-gray-600 dark:text-text-tertiary">
    No featured {contentType} available at the moment. Check back soon!
  </p>
</div>
```

### 8. Loading State Component

**Purpose**: Display while data is being fetched (edge case for initial load)

**UI**:
```typescript
<div className="min-h-screen flex items-center justify-center">
  <LoadingSpinner />
  <p className="ml-4 text-gray-600 dark:text-text-tertiary">
    Loading homepage content...
  </p>
</div>
```

---

## Data Models

### PersonalInfo (from Sanity)

```typescript
interface PersonalInfo {
  _id: string
  name: string                    // e.g., "Charles Jasema"
  title: string                   // e.g., "Software Engineer | Graphics Designer..."
  bio: string[]                   // Array of bio paragraphs
  shortBio: string                // Short bio for hero section
  location: string                // e.g., "Kampala, Uganda"
  email: string
  phone?: string
  professionalPhoto: {
    url: string
    alt?: string
  }
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
```

### FeaturedContent (from Sanity)

```typescript
interface FeaturedContentResponse {
  songs: Song[]
  projects: Project[]
  blogPosts: BlogPost[]
}
```

### Project (from Sanity)

```typescript
interface Project {
  _id: string
  title: string
  category: string                // e.g., "Web Development", "Mobile App"
  description: string
  images: Array<{
    url: string
    alt?: string
  }>
  tags: string[]                  // e.g., ["React", "TypeScript", "Tailwind"]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  order?: number
}
```

### Song (from Sanity)

```typescript
interface Song {
  _id: string
  title: string
  description: string
  duration: string                // e.g., "3:45"
  releaseDate: string             // ISO date string
  album: string
  mdundoUrl: string               // Link to play on Mdundo
  featured: boolean
  isNew: boolean                  // Flag for new releases
  isCollaboration?: boolean
  isFirstSong?: boolean
  albumArt?: string               // Sanity CDN URL
}
```

### BlogPost (from Sanity)

```typescript
interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string               // e.g., "building-scalable-apis"
  }
  category: string                // e.g., "Technical", "Faith", "Music"
  excerpt: string                 // Short summary for cards
  content: any[]                  // Portable Text (not rendered on homepage)
  featuredImage: {
    url: string
    alt?: string
  }
  author: string
  publishDate: string             // ISO date string
  readTime: number                // Estimated minutes
  tags: string[]
  featured: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: { url: string }
  }
}
```

### Skill (from Sanity)

```typescript
interface Skill {
  _id: string
  name: string                    // e.g., "React", "Next.js"
  category: string                // "software", "design", "music", "videography"
  subcategory?: string
  proficiencyLevel?: string       // e.g., "Expert", "Advanced"
  yearsOfExperience?: number
  description?: string
  relatedTools?: string[]
  icon?: string
  order: number
  featured: boolean
}
```

### Data Validation

All data fetched from Sanity should be validated before use:

1. **Null Checks**: Check if query returns null before accessing properties
2. **Array Checks**: Verify arrays exist and have length before mapping
3. **Image Checks**: Verify image URL exists before rendering Image component
4. **Default Values**: Use default values or empty states for optional fields

Example validation pattern:
```typescript
// Validate personal info
if (!personalInfo) {
  return <LoadingState message="Loading personal information..." />;
}

// Validate featured content with defaults
const { songs = [], projects = [], blogPosts = [] } = featuredContent || {};

// Validate images before rendering
{project.images?.[0]?.url && (
  <Image src={project.images[0].url} alt={project.images[0].alt || project.title} />
)}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified the following patterns:

**Testable as Properties:**
1. **Field Rendering Completeness**: For any valid content object (Project, Song, BlogPost), all required fields should be present in the rendered output
2. **Skills Grouping**: For any set of skills with categories, they should be correctly grouped with each skill appearing in exactly one category
3. **Conditional Badge Display**: For any song with isNew=true, a "New Release" badge should appear; for isNew=false/undefined, it should not

**Redundancy Analysis:**
- Requirements 2.3, 3.3, and 4.3 all test the same pattern: "for any valid content object, all required fields are rendered." These can be combined into a single comprehensive property about field rendering.
- Multiple requirements test the same edge case pattern (empty arrays, null responses) - these are important but are edge cases, not universal properties
- Many requirements are about infrastructure setup (SMOKE tests) or specific examples, not universal properties

**Unique Properties to Test:**
1. Content rendering completeness (combines 2.3, 3.3, 4.3)
2. Skills grouping correctness (5.2)
3. Conditional badge rendering (3.7)

These three properties provide unique validation value and are truly universal across different inputs.

### Property 1: Content Field Rendering Completeness

*For any* valid content object (Project, Song, or BlogPost) with all required fields populated, when the object is rendered in the homepage, then all required fields SHALL be present in the rendered output markup.

- **Projects** must render: title, category, description, and primary image
- **Songs** must render: title, album, releaseDate, and albumArt
- **Blog Posts** must render: title, excerpt, featuredImage, publishDate, and readTime

**Validates: Requirements 2.3, 3.3, 4.3**

### Property 2: Skills Category Grouping

*For any* set of skills with category assignments, when the skills are grouped by category for display, then each skill SHALL appear in exactly one category group matching its assigned category value, and no skills SHALL be lost or duplicated in the grouping process.

**Validates: Requirement 5.2**

### Property 3: Conditional New Release Badge Display

*For any* song object, when the song has `isNew: true`, then a "New Release" badge SHALL be present in the rendered output; when the song has `isNew: false` or `isNew` is undefined, then no "New Release" badge SHALL be present in the rendered output.

**Validates: Requirement 3.7**

---

## Error Handling

### Error Scenarios and Handling Strategy

#### 1. Null Personal Info Response

**Scenario**: `getPersonalInfo()` returns `null` due to network error or missing data in CMS

**Handling**:
```typescript
if (!personalInfo) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-text-tertiary">
          Loading personal information...
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-text-tertiary">
          If this persists, please refresh the page
        </p>
      </div>
    </div>
  );
}
```

**User Impact**: Entire page shows loading state with helpful message

#### 2. Empty Featured Content Arrays

**Scenario**: `getFeaturedContent()` returns empty arrays for songs, projects, or blogPosts

**Handling**:
```typescript
{projects.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-gray-600 dark:text-text-tertiary">
      No featured projects available at the moment. Check back soon!
    </p>
  </div>
) : (
  // Render project cards
)}
```

**User Impact**: Section displays empty state message instead of cards

**Alternative**: Hide the entire section if no content is available
```typescript
{projects.length > 0 && (
  <section>
    {/* Featured Projects Section */}
  </section>
)}
```

#### 3. Missing Image URLs

**Scenario**: Content object has no images or image URL is undefined

**Handling**:
```typescript
{project.images?.[0]?.url ? (
  <Image
    src={project.images[0].url}
    alt={project.images[0].alt || project.title}
    width={400}
    height={300}
    className="w-full h-48 object-cover rounded-t-lg"
  />
) : (
  <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded-t-lg">
    <FaImage className="text-slate-400 text-4xl" />
  </div>
)}
```

**User Impact**: Placeholder image with icon displays instead of broken image

#### 4. Query Timeout or Network Error

**Scenario**: Sanity query times out or network request fails

**Handling**: Rely on Next.js error boundary and ISR cache
```typescript
// Next.js will catch errors and serve cached content if available
// For first-time failures, implement try-catch

try {
  const [personalInfo, featuredContent, featuredSkills] = await Promise.all([
    getPersonalInfo(),
    getFeaturedContent(),
    getFeaturedSkills()
  ]);
} catch (error) {
  console.error('Error fetching homepage data:', error);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Unable to load content
        </p>
        <p className="text-gray-600 dark:text-text-tertiary">
          Please try refreshing the page
        </p>
      </div>
    </div>
  );
}
```

**User Impact**: Error message with refresh instruction

#### 5. Malformed Data from CMS

**Scenario**: Content object exists but has unexpected structure or missing required fields

**Handling**: Use optional chaining and default values throughout
```typescript
// Safe access with defaults
const displayTitle = project?.title || 'Untitled Project';
const displayCategory = project?.category || 'Uncategorized';
const displayTags = project?.tags || [];

// Null coalescing for nested objects
const imageUrl = project?.images?.[0]?.url;
const imageAlt = project?.images?.[0]?.alt || project?.title || 'Project image';
```

**User Impact**: Content renders with fallback values, no crashes

#### 6. No Featured Skills Available

**Scenario**: `getFeaturedSkills()` returns empty array

**Handling**: Fall back to displaying static category descriptions
```typescript
const skillsByCategory = featuredSkills.length > 0
  ? groupSkillsByCategory(featuredSkills)
  : null;

// In "What I Do" section
{skillsByCategory ? (
  // Render skills from CMS
  <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary">
    {skillsByCategory[category]?.slice(0, 5).map(skill => (
      <li key={skill._id}>• {skill.name}</li>
    ))}
  </ul>
) : (
  // Render static description
  <p className="text-sm text-gray-600 dark:text-text-tertiary">
    {categoryDescriptions[category]}
  </p>
)}
```

**User Impact**: Category cards show static descriptions instead of dynamic skills list

### Error Logging Strategy

All errors should be logged for debugging:
```typescript
try {
  // Data fetching
} catch (error) {
  console.error('[Homepage] Error fetching data:', {
    error: error instanceof Error ? error.message : 'Unknown error',
    timestamp: new Date().toISOString(),
    errorType: error instanceof Error ? error.constructor.name : typeof error
  });
}
```

### Graceful Degradation Hierarchy

1. **Best Case**: All data loads successfully, full dynamic content displayed
2. **Partial Failure**: Some content sections load, others show empty states
3. **Complete Failure**: Show error message with retry option
4. **Cached Content**: If ISR cache exists, serve stale content with revalidation in background

---

## Testing Strategy

This feature integrates the homepage with Sanity CMS, which is primarily an **integration task** involving UI rendering, external API calls, and infrastructure configuration. The testing strategy focuses on **example-based unit tests** and **integration tests** rather than property-based testing.

### Why Property-Based Testing Is Not Appropriate Here

This feature does NOT benefit from property-based testing because:

1. **Integration-Heavy**: Most functionality involves calling external Sanity APIs, which is infrastructure testing
2. **UI Rendering**: Primary concern is correct rendering of specific UI elements and layouts
3. **Configuration Validation**: Many requirements are about correct setup (ISR, caching, Image component usage)
4. **No Complex Business Logic**: The component primarily fetches data and renders it - minimal transformation logic
5. **Limited Input Variation**: Content structure is defined by Sanity schemas, not infinite input spaces

Property-based testing works best for pure functions with universal properties across wide input spaces (parsers, algorithms, data transformations). This homepage integration is better suited to example-based tests and integration tests.

### Testing Approach

#### 1. Unit Tests (Example-Based)

**Tool**: Jest + React Testing Library

**Test Cases**:

##### Hero Section Rendering
- ✓ Renders personal name from Sanity data
- ✓ Renders professional title from Sanity data  
- ✓ Renders shortBio when available
- ✓ Falls back to first bio paragraph when shortBio is undefined
- ✓ Shows loading state when personalInfo is null

##### Featured Projects Section
- ✓ Renders up to 3 featured projects when available
- ✓ Displays project title, category, description, and image for each project
- ✓ Renders empty state when projects array is empty
- ✓ Handles missing images with placeholder
- ✓ Truncates long descriptions appropriately
- ✓ Links to correct project URLs

##### Featured Songs Section
- ✓ Renders up to 3 featured songs when available
- ✓ Displays song title, album, release date, and album art
- ✓ Shows "New Release" badge when isNew is true
- ✓ Hides "New Release" badge when isNew is false/undefined
- ✓ Renders empty state when songs array is empty
- ✓ Handles missing album art with placeholder

##### Featured Blog Posts Section
- ✓ Renders up to 3 featured blog posts when available
- ✓ Displays post title, excerpt, image, publish date, and read time
- ✓ Renders empty state when blogPosts array is empty
- ✓ Links to correct blog post URLs using slug
- ✓ Formats dates correctly
- ✓ Handles missing featured images with placeholder

##### Skills Showcase Section
- ✓ Groups skills by category correctly
- ✓ Displays skills in correct category sections
- ✓ Renders category icons and names
- ✓ Falls back to static descriptions when no featured skills
- ✓ Maintains order of skills as provided

##### Error Handling
- ✓ Handles null personal info gracefully
- ✓ Handles empty featured content arrays
- ✓ Handles missing nested properties without crashing
- ✓ Displays error UI when data fetching fails
- ✓ Validates image URLs before rendering

**Example Test Structure**:
```typescript
describe('HomePage', () => {
  describe('Hero Section', () => {
    it('renders personal name and title from Sanity data', async () => {
      const mockPersonalInfo = {
        name: 'Charles Jasema',
        title: 'Software Engineer | Graphics Designer',
        shortBio: 'Purpose-driven professional...'
      };
      
      render(<HomePage personalInfo={mockPersonalInfo} />);
      
      expect(screen.getByText('Charles Jasema')).toBeInTheDocument();
      expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    });

    it('shows loading state when personalInfo is null', () => {
      render(<HomePage personalInfo={null} />);
      
      expect(screen.getByText(/Loading personal information/)).toBeInTheDocument();
    });
  });

  describe('Featured Projects Section', () => {
    it('renders up to 3 projects with all required fields', () => {
      const mockProjects = [
        { 
          _id: '1', 
          title: 'Project One', 
          category: 'Web Dev',
          description: 'Description here...',
          images: [{ url: '/img1.jpg', alt: 'Project 1' }],
          tags: ['React', 'TypeScript']
        },
        // ... 2 more projects
      ];
      
      render(<HomePage projects={mockProjects} />);
      
      expect(screen.getByText('Project One')).toBeInTheDocument();
      expect(screen.getByText('Web Dev')).toBeInTheDocument();
    });

    it('displays empty state when no projects available', () => {
      render(<HomePage projects={[]} />);
      
      expect(screen.getByText(/No featured projects available/)).toBeInTheDocument();
    });
  });

  describe('Skills Grouping', () => {
    it('groups skills by category correctly', () => {
      const mockSkills = [
        { _id: '1', name: 'React', category: 'software', order: 1 },
        { _id: '2', name: 'Photoshop', category: 'design', order: 1 },
        { _id: '3', name: 'Next.js', category: 'software', order: 2 },
      ];
      
      const grouped = groupSkillsByCategory(mockSkills);
      
      expect(grouped.software).toHaveLength(2);
      expect(grouped.design).toHaveLength(1);
      expect(grouped.software[0].name).toBe('React');
    });
  });
});
```

#### 2. Integration Tests

**Tool**: Playwright or Cypress

**Test Cases**:
- ✓ Homepage loads successfully in browser
- ✓ All sections render in correct order
- ✓ Images load from Sanity CDN
- ✓ Navigation links work correctly
- ✓ Responsive layout works on mobile, tablet, desktop
- ✓ Dark mode toggle works
- ✓ Loading states appear during slow connections
- ✓ ISR revalidation works after content updates

#### 3. Manual QA Checklist

**Visual Verification**:
- [ ] Hero section matches design mockups
- [ ] Featured content sections use consistent card styling
- [ ] Spacing and alignment match design system
- [ ] Colors match brand palette (gold, teal, red)
- [ ] Typography uses correct font families
- [ ] Hover effects work smoothly
- [ ] Animations are smooth and performant

**Content Verification**:
- [ ] Personal info displays correctly from Sanity
- [ ] Featured projects show correct images and details
- [ ] Songs display album art and metadata
- [ ] Blog posts show correct excerpts and dates
- [ ] Skills are grouped correctly by category
- [ ] All links navigate to correct pages

**Performance Verification**:
- [ ] Page loads in under 2 seconds
- [ ] Images are optimized and lazy-loaded
- [ ] No layout shift during content load
- [ ] Lighthouse score > 90 for performance

**Error Handling Verification**:
- [ ] Loading state appears when needed
- [ ] Empty states display when no content
- [ ] Error UI shows on fetch failure
- [ ] Page doesn't crash on malformed data

#### 4. TypeScript Compilation Tests

**Tool**: TypeScript compiler

**Verification**:
- ✓ All Sanity types are imported correctly
- ✓ No type errors in component props
- ✓ Image component props are correctly typed
- ✓ Optional chaining is used appropriately
- ✓ No `any` types used

### Test Execution

**Unit Tests**: Run with `npm test` or `jest`
```bash
npm run test:unit
```

**Integration Tests**: Run with Playwright
```bash
npm run test:e2e
```

**Type Checking**: Run TypeScript compiler
```bash
npm run type-check
```

### Test Coverage Goals

- **Unit Tests**: 80% code coverage for rendering logic
- **Integration Tests**: Cover all critical user paths
- **Manual QA**: Complete checklist before release

---

## Implementation Plan

### Phase 1: Setup and Data Fetching (30 minutes)

1. **Update HomePage Component Structure**
   - Convert `page.tsx` to async Server Component
   - Add parallel data fetching with `Promise.all()`
   - Import required Sanity query functions
   - Import UI components and icons

2. **Implement Error Handling**
   - Add try-catch around data fetching
   - Create loading state UI
   - Create error state UI
   - Add null checks for personal info

### Phase 2: Hero Section Integration (20 minutes)

1. **Replace Hardcoded Content**
   - Replace `siteConfig.name` with `personalInfo.name`
   - Replace `siteConfig.title` with `personalInfo.title`
   - Add bio rendering logic (shortBio or bio[0])
   - Test with various personal info structures

2. **Maintain Existing Design**
   - Keep gradient background
   - Preserve typography and spacing
   - Keep CTA buttons unchanged

### Phase 3: "What I Do" Section Enhancement (30 minutes)

1. **Integrate Featured Skills**
   - Fetch featured skills with `getFeaturedSkills()`
   - Implement skills grouping function
   - Update category cards to display skills
   - Add fallback to static descriptions

2. **Test Skills Display**
   - Verify skills group correctly
   - Test with empty skills array
   - Check ordering is maintained

### Phase 4: Featured Projects Section (45 minutes)

1. **Create Projects Section**
   - Add section between "What I Do" and CTA
   - Create section header with "View All" link
   - Implement project card layout
   - Add 3-column responsive grid

2. **Implement Project Cards**
   - Render project image with Next.js Image
   - Display title, category, description
   - Add tags display (limit to 4)
   - Add link to project detail/portfolio page
   - Handle missing images with placeholder

3. **Add Empty State**
   - Create empty state component
   - Test with 0 projects

### Phase 5: Latest Songs Section (45 minutes)

1. **Create Songs Section**
   - Add section after projects
   - Create section header with "View All" link
   - Implement song card layout
   - Add 3-column responsive grid

2. **Implement Song Cards**
   - Render album art with Next.js Image
   - Display title, album, release date
   - Add "New Release" badge conditionally
   - Add link to music page
   - Handle missing album art with placeholder

3. **Add Empty State**
   - Create empty state for songs
   - Test with 0 songs

### Phase 6: Recent Insights Section (45 minutes)

1. **Create Blog Posts Section**
   - Add section after songs
   - Create section header with "View All" link
   - Implement blog post card layout
   - Add 3-column responsive grid

2. **Implement Blog Post Cards**
   - Render featured image with Next.js Image
   - Display title, excerpt, category
   - Add publish date and read time
   - Add link to blog post using slug
   - Handle missing images with placeholder

3. **Add Empty State**
   - Create empty state for blog posts
   - Test with 0 posts

### Phase 7: Testing and Refinement (60 minutes)

1. **Unit Testing**
   - Write tests for all sections
   - Test error handling paths
   - Test empty states
   - Verify skills grouping logic

2. **Manual Testing**
   - Test on localhost with real Sanity data
   - Verify responsive design on mobile/tablet/desktop
   - Test dark mode
   - Check loading states
   - Verify all links work

3. **Performance Optimization**
   - Verify ISR is working (check Network tab)
   - Ensure images use proper `sizes` attribute
   - Check lazy loading for below-fold images
   - Run Lighthouse audit

4. **Code Review**
   - Remove any remaining siteConfig usage for content
   - Verify TypeScript types are correct
   - Check for console errors
   - Ensure code follows patterns from About page

### Phase 8: Deployment (15 minutes)

1. **Pre-deployment Checks**
   - Run type check: `npm run type-check`
   - Run build: `npm run build`
   - Test production build locally: `npm run start`
   - Verify no console errors or warnings

2. **Deploy to Production**
   - Deploy to Vercel/Netlify
   - Verify deployment succeeds
   - Test live site with real data
   - Monitor for errors in production logs

### Total Estimated Time: 4.5 hours

---

## Dependencies

### External Dependencies

- **Sanity CMS**: Must be running and accessible
  - Required schemas: `personalInfo`, `project`, `song`, `blogPost`, `skill`
  - Required queries already implemented in `sanity.queries.ts`
  
- **Sanity CDN**: For image optimization and delivery
  - Images must be uploaded to Sanity
  - CDN URLs must be whitelisted in Next.js config

### Internal Dependencies

- **Existing UI Components**: Reuse from component library
  - `Button` component
  - `Card` component
  - `LoadingSpinner` and `LoadingSkeleton`
  - `AnimatedContainer`

- **Sanity Query Functions**: Already implemented
  - `getPersonalInfo()`
  - `getFeaturedContent()`
  - `getFeaturedSkills()`

- **Type Definitions**: Already defined in `sanity.queries.ts`
  - `PersonalInfo` interface
  - `Project` interface
  - `Song` interface
  - `BlogPost` interface
  - `Skill` interface

- **Image Utilities**: Already implemented
  - `urlForImage()` for Sanity image URLs

### Configuration Dependencies

- **Next.js Config**: Image domains must include Sanity CDN
  ```javascript
  images: {
    domains: ['cdn.sanity.io']
  }
  ```

- **Sanity Client Config**: Must have correct project ID and dataset
  ```typescript
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
  ```

---

## Performance Considerations

### Data Fetching Optimization

1. **Parallel Queries**: Use `Promise.all()` to fetch all data simultaneously
   - Personal info, featured content, and featured skills fetch in parallel
   - Reduces total fetch time to the slowest query (not sum of all queries)
   - Expected improvement: ~200ms vs ~600ms for sequential queries

2. **ISR Caching**: 60-second revalidation period
   - First visitor after revalidation triggers background regeneration
   - Subsequent visitors get cached version immediately
   - Balances freshness with performance

3. **Limit Query Results**: Fetch only what's needed
   - Featured projects: limit to 3
   - Featured songs: limit to 3
   - Featured blog posts: limit to 3
   - Featured skills: no limit needed (small dataset)

### Image Optimization

1. **Next.js Image Component**: Automatic optimization
   - WebP format served when supported
   - Responsive image sizes based on viewport
   - Lazy loading for below-the-fold images

2. **Sizes Attribute**: Proper responsive sizes
   ```typescript
   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
   ```

3. **Priority Loading**: Hero section only
   - Personal photo uses `priority` prop
   - Featured content images use default lazy loading

### Rendering Performance

1. **Server Components**: All rendering happens on server
   - No hydration cost for content sections
   - Smaller JavaScript bundle size
   - Faster Time to Interactive (TTI)

2. **Code Splitting**: Automatic with Next.js App Router
   - Only homepage code loads initially
   - Other routes load on demand

3. **CSS Optimization**: Tailwind JIT
   - Only used utility classes included in bundle
   - Purged unused styles

### Performance Budgets

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms

### Monitoring

- **Vercel Analytics**: Track Core Web Vitals in production
- **Lighthouse CI**: Run performance tests on each deployment
- **Real User Monitoring**: Track actual user experience metrics

---

## Security Considerations

### Data Validation

1. **Sanitize Content from Sanity**: While Sanity is trusted, validate data structure
   - Check for null/undefined before accessing nested properties
   - Validate URLs before using in links or images
   - Escape any user-generated content (though minimal on homepage)

2. **Type Safety**: TypeScript provides compile-time validation
   - All Sanity data typed with interfaces
   - Prevents runtime type errors
   - Catches missing properties at build time

### Image Security

1. **Next.js Image Domains**: Whitelist only Sanity CDN
   ```javascript
   images: {
     domains: ['cdn.sanity.io'] // Only allow Sanity images
   }
   ```

2. **Image Loading**: Use Next.js Image component for security
   - Prevents loading from unauthorized domains
   - Provides automatic image optimization
   - Protects against image-based attacks

### API Security

1. **Environment Variables**: Sanity credentials in environment variables
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (if using private dataset)

2. **Read-Only Access**: Homepage only reads data
   - No write operations to Sanity
   - No user input sent to Sanity
   - Public dataset read access only

### Link Security

1. **External Links**: Add security attributes
   ```typescript
   <a href={externalUrl} target="_blank" rel="noopener noreferrer">
   ```

2. **URL Validation**: Validate URLs before using
   ```typescript
   const isValidUrl = (url: string) => {
     try {
       new URL(url);
       return true;
     } catch {
       return false;
     }
   };
   ```

---

## Accessibility Considerations

### Semantic HTML

1. **Proper Heading Hierarchy**: H1 → H2 → H3
   ```html
   <h1>Hi, I'm Charles Jasema</h1>
   <h2>Featured Projects</h2>
   <h3>Project Title</h3>
   ```

2. **Section Landmarks**: Use semantic sectioning
   ```html
   <main>
     <section aria-labelledby="hero-heading">
     <section aria-labelledby="what-i-do">
     <section aria-labelledby="featured-projects">
   </main>
   ```

### Image Accessibility

1. **Alt Text**: Descriptive alt text for all images
   ```typescript
   alt={project.images[0].alt || `${project.title} project screenshot`}
   ```

2. **Decorative Images**: Empty alt for decorative elements
   ```typescript
   <div aria-hidden="true" className="decorative-gradient" />
   ```

### Keyboard Navigation

1. **Focusable Elements**: All interactive elements keyboard accessible
   - Links have visible focus states
   - Cards are clickable via keyboard
   - CTA buttons are keyboard accessible

2. **Skip Links**: Consider adding skip to main content
   ```html
   <a href="#main-content" className="sr-only focus:not-sr-only">
     Skip to main content
   </a>
   ```

### Screen Reader Support

1. **ARIA Labels**: Add labels where needed
   ```html
   <section aria-labelledby="featured-projects-heading">
     <h2 id="featured-projects-heading">Featured Projects</h2>
   </section>
   ```

2. **Loading States**: Announce to screen readers
   ```html
   <div role="status" aria-live="polite">
     Loading personal information...
   </div>
   ```

### Color Contrast

1. **WCAG AA Compliance**: All text meets 4.5:1 ratio
   - Gold (#D4AF37) on white: ✓
   - White text on dark (#0F172A): ✓
   - Gray text (#6B7280) on white: ✓

2. **Dark Mode**: Ensure contrast in both themes
   - Test all text colors in dark mode
   - Verify link colors are distinguishable

---

## Maintenance and Future Enhancements

### Content Updates

- **No Code Changes Required**: All content managed through Sanity CMS
- **Real-time Updates**: Content updates visible after 60-second ISR revalidation
- **Cache Invalidation**: Can trigger immediate revalidation via Sanity webhook (future enhancement)

### Potential Future Enhancements

1. **On-Demand Revalidation**: Add Sanity webhook to trigger immediate updates
   ```typescript
   // /api/revalidate route
   export async function POST(request: Request) {
     const { path } = await request.json();
     await revalidatePath(path);
     return Response.json({ revalidated: true });
   }
   ```

2. **Pagination for Featured Content**: Show more than 3 items
   - Add "Load More" button
   - Implement client-side pagination
   - Or link directly to category pages

3. **Content Filtering**: Filter by category or tags
   - Add filter UI above content sections
   - Implement client-side filtering
   - Or use search params for server-side filtering

4. **Analytics Integration**: Track content engagement
   - Track which projects/songs/posts get clicked
   - Use data to optimize featured content selection
   - Implement view counters

5. **Animations**: Enhanced animations for content cards
   - Stagger animation for card grids
   - Parallax effects for backgrounds
   - Smooth scroll animations

6. **SEO Enhancements**: Add structured data
   - Organization schema
   - Person schema
   - CreativeWork schema for projects and songs

### Monitoring and Alerts

1. **Error Tracking**: Implement error monitoring
   - Track Sanity query failures
   - Monitor image loading errors
   - Alert on high error rates

2. **Performance Monitoring**: Track Core Web Vitals
   - Monitor LCP, FCP, CLS
   - Alert on performance degradation
   - Track query response times

3. **Content Auditing**: Regular content checks
   - Ensure featured content is up to date
   - Verify images are loading correctly
   - Check for broken links

---

## Conclusion

This design provides a comprehensive plan for integrating the Charles Jasema Portfolio homepage with Sanity CMS. By following the established patterns from the About page integration and implementing proper error handling, type safety, and performance optimizations, the homepage will deliver a fast, reliable, and maintainable user experience.

The implementation maintains the existing visual design while adding dynamic content sections that showcase Charles's work across software development, music, and blogging. The parallel data fetching strategy and ISR caching ensure optimal performance, while the comprehensive error handling provides graceful degradation for edge cases.

All content updates can now be managed through the Sanity CMS interface without requiring code changes, providing a scalable and maintainable solution for the portfolio homepage.
