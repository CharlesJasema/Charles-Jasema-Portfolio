/**
 * Custom Hook for AI Chat Management
 * 
 * Provides state management and utilities for AI chat interactions
 */

'use client';

import { useState, useCallback, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  quickReplies?: string[];
  intent?: 'portfolio' | 'music' | 'contact' | 'general';
}

interface ChatSession {
  id: string;
  messages: Message[];
  startTime: number;
  lastActivity: number;
}

interface UseAIChatProps {
  maxMessages?: number;
  sessionTimeout?: number; // in minutes
  persistSession?: boolean;
}

export function useAIChat({
  maxMessages = 50,
  sessionTimeout = 30,
  persistSession = true,
}: UseAIChatProps = {}) {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>('');

  // Generate CSRF token
  const generateCsrfToken = useCallback(() => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    setCsrfToken(token);
    return token;
  }, []);

  // Initialize or restore session
  const initializeSession = useCallback(() => {
    let session: ChatSession | null = null;

    if (persistSession) {
      // Try to restore session from localStorage
      try {
        const savedSession = localStorage.getItem('ai-chat-session');
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          const timeSinceLastActivity = Date.now() - parsed.lastActivity;
          
          // Check if session hasn't expired
          if (timeSinceLastActivity < sessionTimeout * 60 * 1000) {
            session = parsed;
          }
        }
      } catch (error) {
        console.warn('Failed to restore chat session:', error);
      }
    }

    // Create new session if none exists or expired
    if (!session) {
      session = {
        id: Date.now().toString(),
        messages: [],
        startTime: Date.now(),
        lastActivity: Date.now(),
      };
    }

    setCurrentSession(session);
    generateCsrfToken();
  }, [persistSession, sessionTimeout, generateCsrfToken]);

  // Save session to localStorage
  const saveSession = useCallback((session: ChatSession) => {
    if (persistSession) {
      try {
        localStorage.setItem('ai-chat-session', JSON.stringify(session));
      } catch (error) {
        console.warn('Failed to save chat session:', error);
      }
    }
  }, [persistSession]);

  // Add message to current session
  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!currentSession) return;

    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      ...message,
    };

    const updatedSession: ChatSession = {
      ...currentSession,
      messages: [...currentSession.messages, newMessage].slice(-maxMessages),
      lastActivity: Date.now(),
    };

    setCurrentSession(updatedSession);
    saveSession(updatedSession);
  }, [currentSession, maxMessages, saveSession]);

  // Send message to AI
  const sendMessage = useCallback(async (content: string, userInfo?: {
    name?: string;
    email?: string;
    interestedIn?: 'portfolio' | 'music' | 'general';
  }) => {
    if (!currentSession || !content.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    addMessage({
      role: 'user',
      content: content.trim(),
    });

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory: currentSession.messages.slice(-10), // Last 10 messages
          userInfo,
          csrfToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add assistant response
        addMessage({
          role: 'assistant',
          content: data.message,
          quickReplies: data.quickReplies,
          intent: data.intent,
        });
      } else {
        setError(data.message || 'Failed to get response');
        
        // Add error message
        addMessage({
          role: 'assistant',
          content: data.message || 'Sorry, I encountered an error. Please try again or contact Charles directly.',
          quickReplies: ['Contact Charles', 'Try again'],
        });
      }
    } catch (error) {
      const errorMessage = 'Connection error. Please check your internet and try again.';
      setError(errorMessage);
      
      addMessage({
        role: 'assistant',
        content: errorMessage,
        quickReplies: ['Retry', 'Contact Charles'],
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, csrfToken, addMessage]);

  // Clear current session
  const clearSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      messages: [],
      startTime: Date.now(),
      lastActivity: Date.now(),
    };

    setCurrentSession(newSession);
    saveSession(newSession);
    setError(null);
    generateCsrfToken();
  }, [saveSession, generateCsrfToken]);

  // Get chat statistics
  const getStats = useCallback(() => {
    if (!currentSession) return null;

    const totalMessages = currentSession.messages.length;
    const userMessages = currentSession.messages.filter(m => m.role === 'user').length;
    const assistantMessages = currentSession.messages.filter(m => m.role === 'assistant').length;
    const sessionDuration = Date.now() - currentSession.startTime;
    const lastActivity = currentSession.lastActivity;

    return {
      totalMessages,
      userMessages,
      assistantMessages,
      sessionDuration,
      lastActivity,
      sessionAge: Date.now() - currentSession.startTime,
    };
  }, [currentSession]);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // Auto-save session periodically
  useEffect(() => {
    if (!currentSession) return;

    const interval = setInterval(() => {
      saveSession(currentSession);
    }, 30000); // Save every 30 seconds

    return () => clearInterval(interval);
  }, [currentSession, saveSession]);

  return {
    // State
    session: currentSession,
    messages: currentSession?.messages || [],
    isLoading,
    error,
    csrfToken,
    
    // Actions
    sendMessage,
    addMessage,
    clearSession,
    initializeSession,
    
    // Utilities
    getStats,
    
    // Configuration
    maxMessages,
    sessionTimeout,
  };
}

export type { Message, ChatSession };
export default useAIChat;