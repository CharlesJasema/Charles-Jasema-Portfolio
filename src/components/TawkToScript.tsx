'use client'

import { useEffect } from 'react'

/**
 * Tawk.to Live Chat Integration Component
 * 
 * Implements secure Tawk.to live chat widget with:
 * - Professional greeting messages
 * - Mobile responsiveness
 * - Analytics integration
 * - Security compliance
 */

declare global {
  interface Window {
    Tawk_LoadStart?: Date
  }
}

interface TawkToScriptProps {
  propertyId?: string
  widgetId?: string
}

export function TawkToScript({ 
  propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
  widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID 
}: TawkToScriptProps) {
  useEffect(() => {
    // Only load if we have the required IDs
    if (!propertyId || !widgetId) {
      console.warn('Tawk.to: Missing property ID or widget ID')
      return
    }

    // Initialize Tawk.to API
    window.Tawk_API = window.Tawk_API || ({} as any)
    window.Tawk_LoadStart = new Date()

    // Configure Tawk.to settings
    if (window.Tawk_API) {
      window.Tawk_API.onLoad = function() {
        console.log('Tawk.to: Widget loaded successfully')
        
        // Set custom greeting based on page
        const currentPath = window.location.pathname
        let greeting = "Hi! I'm Charles. How can I help you today?"
        
        if (currentPath.includes('/music')) {
          greeting = "Welcome to my music page! Interested in booking me for your event?"
        } else if (currentPath.includes('/portfolio')) {
          greeting = "Hi! Looking to hire me for your next project? Let's chat!"
        } else if (currentPath.includes('/about')) {
          greeting = "Hi there! Want to know more about my journey? I'm here to chat!"
        }
        
        // Set the greeting message
        if (window.Tawk_API) {
          window.Tawk_API.setAttributes({
            name: 'Charles Jasema',
            email: 'charles@charlesjasema.com',
            greeting: greeting
          })
        }
      }
    }

    // Track chat events for analytics
    if (window.Tawk_API) {
      window.Tawk_API.onChatStarted = function() {
        console.log('Tawk.to: Chat started')
        
        // Track with Google Analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_started', {
            event_category: 'engagement',
            event_label: 'tawk_to_chat',
            page_location: window.location.href
          })
        }
      }

      window.Tawk_API.onChatEnded = function() {
        console.log('Tawk.to: Chat ended')
        
        // Track with Google Analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'chat_ended', {
            event_category: 'engagement',
            event_label: 'tawk_to_chat',
            page_location: window.location.href
          })
        }
      }

      window.Tawk_API.onOfflineSubmit = function() {
        console.log('Tawk.to: Offline message submitted')
        
        // Track offline messages
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'offline_message', {
            event_category: 'engagement',
            event_label: 'tawk_to_offline',
            page_location: window.location.href
          })
        }
      }
    }

    // Create and load the Tawk.to script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    // Add error handling
    script.onerror = function() {
      console.error('Tawk.to: Failed to load chat widget')
    }
    
    script.onload = function() {
      console.log('Tawk.to: Script loaded successfully')
    }

    // Append script to head
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      try {
        // Remove the script
        const existingScript = document.querySelector(`script[src*="embed.tawk.to"]`)
        if (existingScript) {
          document.head.removeChild(existingScript)
        }

        // Clean up Tawk.to globals
        if (window.Tawk_API) {
          delete window.Tawk_API
        }
        if (window.Tawk_LoadStart) {
          delete window.Tawk_LoadStart
        }

        // Remove Tawk.to widget if it exists
        const tawkWidget = document.getElementById('tawk-widget')
        if (tawkWidget) {
          tawkWidget.remove()
        }
      } catch (error) {
        console.error('Tawk.to: Error during cleanup:', error)
      }
    }
  }, [propertyId, widgetId])

  // This component doesn't render anything visible
  return null
}

/**
 * Tawk.to Configuration Helper
 * 
 * Provides methods to interact with the Tawk.to widget programmatically
 */
export const TawkToAPI = {
  /**
   * Show the chat widget
   */
  showWidget: () => {
    if (window.Tawk_API?.showWidget) {
      window.Tawk_API.showWidget()
    }
  },

  /**
   * Hide the chat widget
   */
  hideWidget: () => {
    if (window.Tawk_API?.hideWidget) {
      window.Tawk_API.hideWidget()
    }
  },

  /**
   * Toggle the chat widget visibility
   */
  toggleWidget: () => {
    if (window.Tawk_API?.toggle) {
      window.Tawk_API.toggle()
    }
  },

  /**
   * Maximize the chat widget
   */
  maximize: () => {
    if (window.Tawk_API?.maximize) {
      window.Tawk_API.maximize()
    }
  },

  /**
   * Minimize the chat widget
   */
  minimize: () => {
    if (window.Tawk_API?.minimize) {
      window.Tawk_API.minimize()
    }
  },

  /**
   * Set visitor attributes
   */
  setAttributes: (attributes: { name?: string; email?: string; [key: string]: any }) => {
    if (window.Tawk_API?.setAttributes) {
      window.Tawk_API.setAttributes(attributes)
    }
  },

  /**
   * Add tags to the visitor
   */
  addTags: (tags: string[]) => {
    if (window.Tawk_API?.addTags) {
      window.Tawk_API.addTags(tags)
    }
  },

  /**
   * Remove tags from the visitor
   */
  removeTags: (tags: string[]) => {
    if (window.Tawk_API?.removeTags) {
      window.Tawk_API.removeTags(tags)
    }
  },

  /**
   * Check if chat is online
   */
  isChatOnline: (): boolean => {
    return window.Tawk_API?.isChatOnline?.() || false
  },

  /**
   * Check if chat is hidden
   */
  isChatHidden: (): boolean => {
    return window.Tawk_API?.isChatHidden?.() || false
  },

  /**
   * Check if chat is maximized
   */
  isChatMaximized: (): boolean => {
    return window.Tawk_API?.isChatMaximized?.() || false
  },

  /**
   * Get unread message count
   */
  getUnreadCount: (): number => {
    return window.Tawk_API?.getUnreadCount?.() || 0
  }
}

export default TawkToScript