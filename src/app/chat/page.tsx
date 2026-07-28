/**
 * AI Chat Page
 * 
 * Full-page AI chat interface for detailed conversations
 * about Charles Jasema's portfolio and services
 */

import React from 'react';
import { Metadata } from 'next';
import { Bot, MessageCircle, Star, Users, Clock } from 'lucide-react';
import AIChatWidget from '@/components/chat/AIChatWidget';
import { EnhancedButton } from '@/components/ui/EnhancedButton';

export const metadata: Metadata = {
  title: 'AI Chat Assistant | Charles Jasema',
  description: 'Chat with Charles Jasema\'s AI assistant to learn about his professional services, portfolio, and music ministry. Get instant answers to your questions.',
  keywords: 'Charles Jasema, AI chat, portfolio assistance, music ministry, web development, graphics design',
};

const features = [
  {
    icon: Bot,
    title: 'Intelligent Responses',
    description: 'AI-powered responses trained on Charles\'s portfolio and expertise',
  },
  {
    icon: MessageCircle,
    title: 'Instant Availability',
    description: '24/7 availability for questions about services and projects',
  },
  {
    icon: Star,
    title: 'Context-Aware',
    description: 'Understands your needs whether portfolio or music ministry related',
  },
  {
    icon: Users,
    title: 'Personal Touch',
    description: 'Reflects Charles\'s friendly, professional communication style',
  },
  {
    icon: Clock,
    title: 'Quick Answers',
    description: 'Get immediate responses to common questions about services and pricing',
  },
];

const sampleQuestions = [
  {
    category: 'Portfolio & Services',
    questions: [
      'What web development services do you offer?',
      'Can you show me examples of your design work?',
      'What technologies do you specialize in?',
      'How much do you charge for a website?',
      'Do you offer ongoing maintenance?',
    ],
  },
  {
    category: 'Music Ministry',
    questions: [
      'Are you available for worship leading?',
      'What kind of music do you perform?',
      'Can you play at our church event?',
      'Do you have original songs?',
      'What are your ministry rates?',
    ],
  },
  {
    category: 'General',
    questions: [
      'Tell me about your background',
      'How can I contact you directly?',
      'What sets you apart from others?',
      'Do you work with international clients?',
      'What is your typical project timeline?',
    ],
  },
];

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Chat with Charles's
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}AI Assistant
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get instant answers about Charles Jasema's professional services, portfolio projects, 
            and music ministry. Ask anything about web development, design, or worship services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <AIChatWidget 
              position="embedded" 
              className="h-[600px]"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                AI Assistant Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Questions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sample Questions
              </h3>
              <div className="space-y-4">
                {sampleQuestions.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">
                      {category.category}
                    </h4>
                    <div className="space-y-1">
                      {category.questions.slice(0, 3).map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => {
                            // This would trigger sending the question to the chat
                            const event = new CustomEvent('send-chat-message', { detail: question });
                            window.dispatchEvent(event);
                          }}
                          className="block w-full text-left text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          "{question}"
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-3">Need Direct Contact?</h3>
              <p className="text-blue-100 text-sm mb-4">
                For complex projects or immediate assistance, reach Charles directly.
              </p>
              <div className="space-y-2">
                <EnhancedButton
                  href="https://wa.me/256785446877"
                  external
                  variant="secondary"
                  size="sm"
                  className="w-full bg-white/10 hover:bg-white/20 border-white/20"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Business
                </EnhancedButton>
                <EnhancedButton
                  href="mailto:brocharles001@gmail.com"
                  external
                  variant="secondary"
                  size="sm"
                  className="w-full bg-white/10 hover:bg-white/20 border-white/20"
                >
                  Send Email
                </EnhancedButton>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> This AI assistant provides information about Charles's services. 
                For project quotes and bookings, please contact Charles directly for personalized assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Whether you need professional development services or music ministry, 
              Charles is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton href="/contact" size="lg">
                Get Started Today
              </EnhancedButton>
              <EnhancedButton href="/portfolio" variant="outline" size="lg">
                View Portfolio
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}