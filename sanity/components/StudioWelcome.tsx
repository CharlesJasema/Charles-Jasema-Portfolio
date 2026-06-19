/**
 * Studio Welcome Component
 * Displays helpful information and quick tips for content editors
 */

import React from 'react'
import { Card, Text, Stack, Heading } from '@sanity/ui'

export function StudioWelcome() {
  return (
    <Card padding={4} radius={2} shadow={1} tone="primary">
      <Stack space={4}>
        <Heading as="h2" size={2}>
          Welcome to Charles Jasema Portfolio CMS 👋
        </Heading>
        
        <Stack space={3}>
          <Text size={2} weight="semibold">
            Quick Tips for Content Management:
          </Text>
          
          <Stack space={2}>
            <Text size={1}>
              🎵 <strong>Music Content:</strong> Add songs, music videos, and lyrics. Use the "Featured" flag to highlight top content.
            </Text>
            
            <Text size={1}>
              💼 <strong>Portfolio:</strong> Showcase your projects with detailed tech stacks, challenges, and solutions.
            </Text>
            
            <Text size={1}>
              📝 <strong>Blog Posts:</strong> Write articles with rich text formatting and SEO optimization.
            </Text>
            
            <Text size={1}>
              ⭐ <strong>Featured Content:</strong> Use quick access to view all featured items across content types.
            </Text>
            
            <Text size={1}>
              🔍 <strong>Search:</strong> Use the search bar (top) to quickly find any content by title, description, or tags.
            </Text>
            
            <Text size={1}>
              📸 <strong>Assets:</strong> Drag and drop images, audio (50MB max), and videos (500MB max) directly into fields.
            </Text>
          </Stack>
          
          <Text size={1} muted>
            💡 Tip: Check document badges to see content status (Featured, New, Draft age)
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}
