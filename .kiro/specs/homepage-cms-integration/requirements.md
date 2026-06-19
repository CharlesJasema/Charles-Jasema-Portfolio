# Requirements Document

## Introduction

This document specifies the requirements for integrating the Charles Jasema Portfolio homepage with Sanity CMS. The homepage currently displays hardcoded content from the `siteConfig` file. This integration will transform the homepage to dynamically fetch and display real content from Sanity CMS, including personal information, featured projects, songs, blog posts, and skills.

The integration follows the successful pattern established by the About page integration, ensuring consistency in data fetching patterns, type safety, and error handling across the application.

## Glossary

- **Homepage**: The main landing page located at `src/app/page.tsx`, serving as the entry point to the portfolio website
- **Sanity_CMS**: The headless content management system storing all portfolio content including projects, songs, blog posts, personal information, education, work experience, and skills
- **Featured_Content**: Content items marked as `featured: true` in Sanity CMS, intended for prominent display on the homepage
- **Personal_Info**: The personal information document in Sanity containing name, title, bio, professional photo, and social links
- **Hero_Section**: The prominent introductory section at the top of the homepage displaying personal information and primary call-to-action buttons
- **Dynamic_Content**: Content fetched from Sanity CMS at request time or build time, replacing hardcoded placeholder content
- **ISR**: Incremental Static Regeneration, Next.js feature enabling content updates without full site rebuilds
- **Server_Component**: Next.js Server Component that fetches data on the server side before rendering

## Requirements

### Requirement 1: Fetch Personal Information from Sanity

**User Story:** As a portfolio visitor, I want to see Charles Jasema's real name, title, and bio on the homepage, so that I understand who he is and what he does.

#### Acceptance Criteria

1. THE Homepage SHALL fetch personal information from Sanity CMS using the `getPersonalInfo()` query function
2. WHEN personal information is successfully fetched, THE Homepage SHALL display the name in the hero section heading
3. WHEN personal information is successfully fetched, THE Homepage SHALL display the title in the hero section subheading
4. WHEN personal information is successfully fetched, THE Homepage SHALL display the short bio or first paragraph of the bio in the hero section description
5. IF personal information cannot be fetched, THEN THE Homepage SHALL display a loading state or fallback message
6. THE Homepage SHALL use ISR with a 60-second revalidation period for personal information data

### Requirement 2: Display Featured Projects from Sanity

**User Story:** As a portfolio visitor, I want to see Charles Jasema's featured projects on the homepage, so that I can quickly view his best work.

#### Acceptance Criteria

1. THE Homepage SHALL fetch featured projects from Sanity CMS using the `getFeaturedContent()` query function
2. WHEN featured projects are successfully fetched, THE Homepage SHALL display up to 3 featured projects
3. WHEN displaying each featured project, THE Homepage SHALL show the project title, category, description excerpt, and primary image
4. WHEN displaying each featured project, THE Homepage SHALL render project images using Next.js Image component with proper optimization
5. WHEN a visitor clicks on a featured project, THE Homepage SHALL navigate to the project detail page or projects page
6. IF no featured projects exist, THEN THE Homepage SHALL display a message indicating no featured projects are available
7. THE Homepage SHALL display featured projects in order of their `order` field or creation date

### Requirement 3: Display Featured Songs from Sanity

**User Story:** As a portfolio visitor, I want to see Charles Jasema's featured songs on the homepage, so that I can discover his gospel music ministry.

#### Acceptance Criteria

1. THE Homepage SHALL fetch featured songs from Sanity CMS using the `getFeaturedContent()` query function
2. WHEN featured songs are successfully fetched, THE Homepage SHALL display up to 3 featured songs
3. WHEN displaying each featured song, THE Homepage SHALL show the song title, album, release date, and album art
4. WHEN displaying each featured song, THE Homepage SHALL render album art using Next.js Image component with proper optimization from Sanity CDN
5. WHEN a visitor clicks on a featured song, THE Homepage SHALL navigate to the music page or song detail page
6. IF no featured songs exist, THEN THE Homepage SHALL display a message indicating no featured songs are available
7. WHEN a song is marked as new (isNew: true), THE Homepage SHALL display a "New Release" badge

### Requirement 4: Display Featured Blog Posts from Sanity

**User Story:** As a portfolio visitor, I want to see Charles Jasema's featured blog posts on the homepage, so that I can read his latest technical insights and stories.

#### Acceptance Criteria

1. THE Homepage SHALL fetch featured blog posts from Sanity CMS using the `getFeaturedContent()` query function
2. WHEN featured blog posts are successfully fetched, THE Homepage SHALL display up to 3 featured blog posts
3. WHEN displaying each featured blog post, THE Homepage SHALL show the post title, excerpt, featured image, publish date, and read time
4. WHEN displaying each featured blog post, THE Homepage SHALL render featured images using Next.js Image component with proper optimization from Sanity CDN
5. WHEN a visitor clicks on a featured blog post, THE Homepage SHALL navigate to the individual blog post page using the post's slug
6. IF no featured blog posts exist, THEN THE Homepage SHALL display a message indicating no featured blog posts are available
7. THE Homepage SHALL display featured blog posts in reverse chronological order by publish date

### Requirement 5: Display Skills Showcase from Sanity

**User Story:** As a portfolio visitor, I want to see Charles Jasema's key skills on the homepage, so that I can quickly understand his technical and creative expertise.

#### Acceptance Criteria

1. THE Homepage SHALL fetch featured skills from Sanity CMS using the `getFeaturedSkills()` query function
2. WHEN featured skills are successfully fetched, THE Homepage SHALL display skills grouped by category (Software Engineering, Graphics Design, Gospel Music, Videography)
3. WHEN displaying each skill category, THE Homepage SHALL show the category icon and category name
4. WHEN displaying skills within a category, THE Homepage SHALL show the skill name
5. THE Homepage SHALL display skills in the order specified by their `order` field
6. IF no featured skills exist, THEN THE Homepage SHALL fall back to displaying the category descriptions from the "What I Do" section
7. WHERE the skill has an associated icon, THE Homepage SHALL display the icon alongside the skill name

### Requirement 6: Remove Hardcoded Content from siteConfig

**User Story:** As a content manager, I want all homepage content to come from Sanity CMS, so that I can manage content through the CMS interface without code changes.

#### Acceptance Criteria

1. THE Homepage SHALL NOT use `siteConfig.name` for the hero section name display
2. THE Homepage SHALL NOT use `siteConfig.title` for the hero section title display
3. THE Homepage SHALL NOT use hardcoded descriptions in the "What I Do" section cards
4. THE Homepage SHALL fetch all dynamic content from Sanity CMS
5. WHERE content cannot be fetched from Sanity, THE Homepage SHALL display appropriate loading states or error messages
6. THE Homepage SHALL maintain the `siteConfig` import only for non-content configuration values (if any remain necessary)

### Requirement 7: Maintain Type Safety and Error Handling

**User Story:** As a developer, I want the homepage to have proper TypeScript types and error handling, so that the application is maintainable and robust.

#### Acceptance Criteria

1. THE Homepage SHALL use TypeScript interfaces from `sanity.queries.ts` for all Sanity content types
2. WHEN fetching data from Sanity, THE Homepage SHALL handle null or undefined responses gracefully
3. WHEN an error occurs during data fetching, THE Homepage SHALL log the error and display a user-friendly fallback UI
4. THE Homepage SHALL implement proper null checks before accessing nested properties of fetched content
5. THE Homepage SHALL use Next.js Server Component patterns for data fetching (async/await at component level)
6. THE Homepage SHALL validate that required image fields exist before attempting to render images

### Requirement 8: Optimize Performance and Caching

**User Story:** As a portfolio visitor, I want the homepage to load quickly, so that I can access content without delays.

#### Acceptance Criteria

1. THE Homepage SHALL use Next.js Server Components for server-side data fetching
2. THE Homepage SHALL implement ISR with 60-second revalidation for featured content queries
3. WHEN rendering images from Sanity CDN, THE Homepage SHALL use Next.js Image component with proper `sizes` attributes
4. THE Homepage SHALL implement lazy loading for below-the-fold images
5. THE Homepage SHALL fetch featured content in parallel using `Promise.all()` where possible
6. THE Homepage SHALL set appropriate cache tags for Sanity queries to enable cache invalidation

### Requirement 9: Preserve Existing Layout and Design

**User Story:** As a portfolio visitor, I want the homepage to maintain its current visual design and layout, so that the user experience remains consistent.

#### Acceptance Criteria

1. THE Homepage SHALL maintain the existing hero section layout with gradient background
2. THE Homepage SHALL maintain the existing "What I Do" section with four category cards
3. THE Homepage SHALL maintain the existing call-to-action section at the bottom
4. THE Homepage SHALL preserve all existing CSS classes and Tailwind utility classes
5. THE Homepage SHALL maintain responsive design breakpoints for mobile, tablet, and desktop views
6. THE Homepage SHALL preserve all existing animations and hover effects
7. WHERE new sections are added for featured content, THE Homepage SHALL follow the established design system (colors, spacing, typography)

### Requirement 10: Add Featured Content Sections

**User Story:** As a portfolio visitor, I want to see featured projects, songs, and blog posts on the homepage, so that I can quickly access the most important content.

#### Acceptance Criteria

1. THE Homepage SHALL add a "Featured Projects" section between the "What I Do" section and the call-to-action section
2. THE Homepage SHALL add a "Latest Songs" section displaying featured songs from Sanity
3. THE Homepage SHALL add a "Recent Insights" section displaying featured blog posts from Sanity
4. WHEN displaying featured content sections, THE Homepage SHALL use consistent card layouts with images, titles, and descriptions
5. WHEN a featured content section has no items, THE Homepage SHALL either hide the section or display a "Coming Soon" message
6. THE Homepage SHALL add "View All" links to each featured content section that navigate to the respective content pages (Projects, Music, Blog)
7. THE Homepage SHALL display featured content sections in a logical order that guides visitors through the portfolio
