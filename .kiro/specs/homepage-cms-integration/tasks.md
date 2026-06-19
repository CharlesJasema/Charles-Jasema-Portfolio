# Implementation Plan: Homepage CMS Integration

## Overview

This implementation plan transforms the homepage from hardcoded content to dynamic CMS-driven content by integrating with Sanity CMS. Following the successful pattern established by the About page integration, we'll implement parallel data fetching, ISR caching, and three new featured content sections while preserving the existing design and user experience.

## Tasks

- [ ] 1. Setup and data fetching infrastructure
  - [ ] 1.1 Convert page.tsx to async Server Component
    - Update `src/app/page.tsx` to be an async function
    - Import required Sanity query functions: `getPersonalInfo()`, `getFeaturedContent()`, `getFeaturedSkills()`
    - Import Next.js Image component and existing UI components (Button, Card)
    - Import React Icons (FaCode, FaPalette, FaMusic, FaVideo, FaImage, FaArrowRight)
    - _Requirements: 1.1, 7.5, 8.1_
  
  - [ ] 1.2 Implement parallel data fetching with Promise.all()
    - Add try-catch block around data fetching
    - Fetch personalInfo, featuredContent, and featuredSkills in parallel using Promise.all()
    - Destructure featuredContent into songs, projects, and blogPosts arrays with default empty arrays
    - Add TypeScript types for all fetched data
    - _Requirements: 1.1, 8.5, 7.1_
  
  - [ ] 1.3 Implement error handling and loading states
    - Add null check for personalInfo with loading state UI
    - Create error boundary UI for failed data fetching
    - Add console.error logging with timestamp and error details
    - Implement graceful degradation for partial failures
    - _Requirements: 7.2, 7.3, 7.4_

- [ ] 2. Integrate hero section with CMS data
  - [ ] 2.1 Replace hardcoded content with Sanity personal info
    - Replace `siteConfig.name` with `personalInfo.name` in hero heading
    - Replace `siteConfig.title` with `personalInfo.title` in hero subheading
    - Add bio rendering logic: use `personalInfo.shortBio` or fall back to `personalInfo.bio[0]`
    - Remove `siteConfig` import for content (keep only if needed for configuration)
    - _Requirements: 1.1, 1.2, 1.3, 6.1, 6.2_
  
  - [ ] 2.2 Preserve existing hero section design
    - Maintain gradient background classes
    - Preserve all existing Tailwind utility classes
    - Keep CTA buttons ("View My Work", "Get In Touch") unchanged
    - Verify responsive design breakpoints work correctly
    - _Requirements: 9.1, 9.4, 9.5_
  
  - [ ]* 2.3 Write unit tests for hero section
    - Test rendering of name, title, and bio from Sanity data
    - Test fallback from shortBio to bio[0]
    - Test loading state when personalInfo is null
    - Test that siteConfig is not used for content display
    - _Requirements: 1.2, 1.3, 1.5_

- [ ] 3. Checkpoint - Verify basic CMS integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Enhance "What I Do" section with featured skills
  - [ ] 4.1 Implement skills grouping logic
    - Create `groupSkillsByCategory()` helper function to group skills by category
    - Handle empty featuredSkills array gracefully
    - Maintain skill ordering by `order` field
    - Define categoryIcons mapping (software: FaCode, design: FaPalette, music: FaMusic, videography: FaVideo)
    - Define categoryColors mapping (software: primary-gold, design: tech-teal, music: accent-red, videography: primary-gold)
    - _Requirements: 5.2, 5.5_
  
  - [ ] 4.2 Update category cards to display skills
    - For each category (Software Engineering, Graphics Design, Gospel Music, Videography), render skills if available
    - Display top 5 featured skills per category as bullet list
    - Fall back to static descriptions if no skills available
    - Preserve existing card styling and hover effects
    - _Requirements: 5.1, 5.3, 5.4, 5.6, 6.3, 9.2, 9.6_
  
  - [ ]* 4.3 Write unit tests for skills showcase
    - Test skills grouping by category correctly
    - Test each skill appears in exactly one category group
    - Test fallback to static descriptions when no skills
    - Test skill ordering is maintained
    - Test skills display with associated icons
    - _Requirements: 5.2, 5.5, 5.7_

- [ ] 5. Add Featured Projects section
  - [ ] 5.1 Create Featured Projects section structure
    - Add new section between "What I Do" section and CTA section
    - Create section heading "Featured Projects" with "View All" link to `/portfolio`
    - Implement 3-column responsive grid (1 column mobile, 2 tablet, 3 desktop)
    - Use existing Card component for project cards
    - _Requirements: 10.1, 10.6_
  
  - [ ] 5.2 Implement project card rendering
    - Render up to 3 featured projects from `projects` array
    - For each project, display: image (first from images array), title, category badge, description (truncated to 150 chars), tags (limit to 4)
    - Use Next.js Image component with proper sizing and optimization
    - Add image fallback with FaImage icon for missing images
    - Add link to project detail page or portfolio page
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.3_
  
  - [ ] 5.3 Add empty state for projects
    - Display empty state message when `projects.length === 0`
    - Use message: "No featured projects available at the moment. Check back soon!"
    - _Requirements: 2.6, 10.5_
  
  - [ ]* 5.4 Write unit tests for Featured Projects section
    - Test rendering up to 3 projects with all required fields
    - Test empty state when projects array is empty
    - Test image placeholder for missing images
    - Test description truncation
    - Test tags limit to 4
    - Test links navigate to correct URLs
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ] 6. Add Latest Songs section
  - [ ] 6.1 Create Latest Songs section structure
    - Add new section after Featured Projects section
    - Create section heading "Latest Songs" with "View All" link to `/music`
    - Implement 3-column responsive grid (1 column mobile, 2 tablet, 3 desktop)
    - Use existing Card component for song cards
    - _Requirements: 10.2, 10.6_
  
  - [ ] 6.2 Implement song card rendering
    - Render up to 3 featured songs from `songs` array
    - For each song, display: album art, title, album name, release date
    - Add conditional "New Release" badge when `song.isNew === true`
    - Use Next.js Image component for album art with aspect-square sizing
    - Add image fallback with FaMusic icon for missing album art
    - Format release date using `new Date(song.releaseDate).toLocaleDateString()`
    - Add link to music page or song detail page
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.7, 8.3_
  
  - [ ] 6.3 Add empty state for songs
    - Display empty state message when `songs.length === 0`
    - Use message: "No featured songs available at the moment. Check back soon!"
    - _Requirements: 3.6, 10.5_
  
  - [ ]* 6.4 Write unit tests for Latest Songs section
    - Test rendering up to 3 songs with all required fields
    - Test "New Release" badge appears when isNew is true
    - Test "New Release" badge does NOT appear when isNew is false or undefined
    - Test empty state when songs array is empty
    - Test album art placeholder for missing images
    - Test date formatting
    - Test links navigate to correct URLs
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 7. Add Recent Insights (Blog Posts) section
  - [ ] 7.1 Create Recent Insights section structure
    - Add new section after Latest Songs section
    - Create section heading "Recent Insights" with "View All" link to `/blog`
    - Implement 3-column responsive grid (1 column mobile, 2 tablet, 3 desktop)
    - Use existing Card component for blog post cards
    - _Requirements: 10.3, 10.6_
  
  - [ ] 7.2 Implement blog post card rendering
    - Render up to 3 featured blog posts from `blogPosts` array
    - For each post, display: featured image, category badge, title, excerpt (truncated to 120 chars), publish date, read time
    - Use Next.js Image component for featured image with proper sizing
    - Add image fallback with FaImage icon for missing images
    - Format publish date using `new Date(post.publishDate).toLocaleDateString()`
    - Add link to individual blog post page using post slug: `/blog/${post.slug.current}`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 8.3_
  
  - [ ] 7.3 Add empty state for blog posts
    - Display empty state message when `blogPosts.length === 0`
    - Use message: "No featured blog posts available at the moment. Check back soon!"
    - _Requirements: 4.6, 10.5_
  
  - [ ]* 7.4 Write unit tests for Recent Insights section
    - Test rendering up to 3 blog posts with all required fields
    - Test empty state when blogPosts array is empty
    - Test featured image placeholder for missing images
    - Test excerpt truncation to 120 characters
    - Test date formatting
    - Test links navigate to correct blog post URLs using slug
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ] 8. Checkpoint - Verify all sections integrated
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Preserve existing sections and design
  - [ ] 9.1 Verify Call-to-Action section preserved
    - Ensure CTA section remains at bottom of page
    - Verify CTA buttons and links work correctly
    - Confirm styling matches existing design
    - _Requirements: 9.3_
  
  - [ ] 9.2 Verify responsive design across breakpoints
    - Test mobile layout (< 768px): single column for all sections
    - Test tablet layout (768px - 1024px): 2 columns for featured content
    - Test desktop layout (> 1024px): 3 columns for featured content
    - Verify all animations and hover effects work
    - _Requirements: 9.5, 9.6_
  
  - [ ] 9.3 Verify design system consistency
    - Confirm color palette matches: primary-gold (#D4AF37), tech-teal, accent-red
    - Verify typography uses correct font families (font-heading for headings)
    - Check spacing and padding match design system
    - Test dark mode across all sections
    - _Requirements: 9.4, 9.7_

- [ ] 10. Performance optimization and validation
  - [ ] 10.1 Implement ISR caching configuration
    - Add `export const revalidate = 60` to page.tsx for 60-second ISR
    - Verify cache tags are set for Sanity queries
    - _Requirements: 1.6, 8.2_
  
  - [ ] 10.2 Optimize image loading
    - Verify all Next.js Image components use proper `sizes` attribute
    - Confirm below-the-fold images use lazy loading (default behavior)
    - Ensure hero section images do NOT use lazy loading if critical
    - Test images load from Sanity CDN correctly
    - _Requirements: 8.3, 8.4_
  
  - [ ] 10.3 Validate performance metrics
    - Run Lighthouse audit and verify performance score > 90
    - Check First Contentful Paint (FCP) < 1.5s
    - Check Largest Contentful Paint (LCP) < 2.5s
    - Check Cumulative Layout Shift (CLS) < 0.1
    - Verify parallel data fetching reduces total fetch time
    - _Requirements: 8.5_
  
  - [ ]* 10.4 Write integration tests for performance
    - Test ISR revalidation works after 60 seconds
    - Test parallel data fetching completes faster than sequential
    - Test images lazy-load below the fold
    - Test page loads successfully with real Sanity data

- [ ] 11. Final validation and error handling
  - [ ] 11.1 Validate type safety
    - Run TypeScript compiler: `npm run type-check`
    - Verify no type errors in component
    - Confirm all Sanity types are correctly imported
    - Ensure no `any` types used
    - _Requirements: 7.1, 7.5_
  
  - [ ] 11.2 Validate error handling
    - Test null personalInfo response shows loading state
    - Test empty featured content arrays show empty states
    - Test missing image URLs display placeholders
    - Test malformed data doesn't crash page
    - Verify error logging works correctly
    - _Requirements: 1.5, 7.2, 7.3, 7.4, 7.6_
  
  - [ ] 11.3 Manual QA checklist
    - Test with real Sanity data on localhost
    - Verify all links navigate correctly
    - Test loading states appear appropriately
    - Confirm no console errors or warnings
    - Test all content sections render in correct order
    - _Requirements: 10.7_

- [ ] 12. Final checkpoint and deployment readiness
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test-related sub-tasks and can be skipped for faster MVP
- All implementation tasks reference specific requirements for traceability
- The implementation follows the 8-phase plan from the design document
- TypeScript is the implementation language (as used in the design)
- Checkpoints ensure incremental validation at key milestones
- ISR caching strategy (60-second revalidation) optimizes performance while maintaining fresh content
- Error handling ensures graceful degradation for all edge cases
- Design system consistency is maintained throughout all new sections
- All images use Next.js Image component for automatic optimization
- Parallel data fetching minimizes page load time
- The About page integration pattern serves as the reference implementation

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1.1"]
    },
    {
      "id": 1,
      "tasks": ["1.2", "1.3"]
    },
    {
      "id": 2,
      "tasks": ["2.1", "4.1"]
    },
    {
      "id": 3,
      "tasks": ["2.2", "2.3", "4.2"]
    },
    {
      "id": 4,
      "tasks": ["4.3", "5.1", "6.1", "7.1"]
    },
    {
      "id": 5,
      "tasks": ["5.2", "6.2", "7.2"]
    },
    {
      "id": 6,
      "tasks": ["5.3", "5.4", "6.3", "6.4", "7.3", "7.4"]
    },
    {
      "id": 7,
      "tasks": ["9.1", "9.2", "9.3"]
    },
    {
      "id": 8,
      "tasks": ["10.1", "10.2"]
    },
    {
      "id": 9,
      "tasks": ["10.3", "10.4"]
    },
    {
      "id": 10,
      "tasks": ["11.1", "11.2", "11.3"]
    }
  ]
}
```
