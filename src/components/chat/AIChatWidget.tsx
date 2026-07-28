/**
 * AI Chat Widget Component
 * 
 * Intelligent chat interface for Charles Jasema's portfolio
 * Provides context-aware assistance for portfolio and music ministry inquiries
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  RotateCcw,
  Loader2,
  Phone,
  Mail
} from 'lucide-react';
import { useBrandContext } from '@/components/ui/BrandContext';
import { EnhancedButton } from '@/components/ui/EnhancedButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  quickReplies?: string[];
  intent?: 'portfolio' | 'music' | 'contact' | 'general';
}

interface AIChatWidgetProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'embedded';
}

export function AIChatWidget({ 
  className = '', 
  position = 'bottom-right' 
}: AIChatWidgetProps) {
  const { currentBrand } = useBrandContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm Charles Jasema's AI assistant. I can help you learn about his ${
        currentBrand === 'ministry' 
          ? 'music ministry and worship services' 
          : currentBrand === 'professional'
          ? 'professional services and portfolio'
          : 'services, portfolio, and music ministry'
      }. What would you like to know?`,
      timestamp: Date.now(),
      quickReplies: currentBrand === 'ministry' 
        ? ['Music ministry services', 'Book for worship event', 'Listen to music', 'Contact Charles']
        : currentBrand === 'professional'
        ? ['View portfolio', 'Web development services', 'Graphics design', 'Get a quote']
        : ['Tell me about Charles', 'Show me his work', 'Music ministry', 'Contact info'],
    };

    setMessages([welcomeMessage]);
    
    // Generate CSRF token
    generateCsrfToken();
  }, [currentBrand]);

  // Generate CSRF token
  const generateCsrfToken = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    setCsrfToken(token);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to AI chat API
  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          message: messageContent.trim(),
          conversationHistory: messages.slice(-10), // Send last 10 messages for context
          userInfo: {
            interestedIn: currentBrand === 'ministry' ? 'music' : currentBrand === 'professional' ? 'portfolio' : 'general',
          },
          csrfToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: Date.now(),
          quickReplies: data.quickReplies,
          intent: data.intent,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Show error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message || 'Sorry, I encountered an error. Please try again or contact Charles directly.',
          timestamp: Date.now(),
          quickReplies: ['Contact Charles', 'Try again'],
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please contact Charles directly at +256 785 446 877 or brocharles001@gmail.com',
        timestamp: Date.now(),
        quickReplies: ['Contact via WhatsApp', 'Send Email'],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick reply selection
  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  // Reset conversation
  const resetChat = () => {
    setMessages(messages.slice(0, 1)); // Keep welcome message
    generateCsrfToken();
  };

  // Handle contact actions
  const handleContact = (type: 'whatsapp' | 'email') => {
    if (type === 'whatsapp') {
      window.open('https://wa.me/256785446877', '_blank');
    } else {
      window.open('mailto:brocharles001@gmail.com', '_blank');
    }
  };

  // Embedded version for pages
  if (position === 'embedded') {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg ${className}`}>
        <div className="h-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <p className="text-xs text-gray-500">Ask about Charles's work</p>
            </div>
            <EnhancedButton
              onClick={resetChat}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <RotateCcw className="w-4 h-4" />
            </EnhancedButton>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-3 h-3" />
                  ) : (
                    <Bot className="w-3 h-3" />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  {message.quickReplies && message.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-bl-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Charles's services..."
                className="flex-1 resize-none border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                maxLength={500}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <EnhancedButton
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </EnhancedButton>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Floating widget
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
  };

  return (
    <div className={`z-50 ${positionClasses[position]} ${className}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-80 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-96'
        }`}>
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Chat with Charles's AI</h3>
              <p className="text-xs opacity-90">Usually replies instantly</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={resetChat}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages (only when not minimized) */}
          {!isMinimized && (
            <>
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-3 h-3" />
                      ) : (
                        <Bot className="w-3 h-3" />
                      )}
                    </div>
                    <div className={`flex-1 max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-2 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                      {message.quickReplies && message.quickReplies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.quickReplies.slice(0, 3).map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 rounded-bl-sm">
                      <Loader2 className="w-3 h-3 animate-spin text-gray-500" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 resize-none border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={1}
                    maxLength={500}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>

              {/* Quick Contact Actions */}
              <div className="flex gap-2 p-3 pt-0">
                <button
                  onClick={() => handleContact('whatsapp')}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleContact('email')}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  Email
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        )}
      </button>
    </div>
  );
}

export type { AIChatWidgetProps };
export default AIChatWidget;