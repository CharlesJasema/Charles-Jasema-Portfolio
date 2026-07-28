/**
 * WhatsApp Integration Component
 * 
 * Provides comprehensive WhatsApp contact functionality including:
 * - Direct WhatsApp messaging links
 * - Quick message templates
 * - Business hours display
 * - Professional contact interface
 */

'use client';

import React, { useState } from 'react';
import { Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { useBrandContext } from '@/components/ui/BrandContext';
import { EnhancedButton } from '@/components/ui/EnhancedButton';

interface WhatsAppIntegrationProps {
  className?: string;
  variant?: 'full' | 'compact' | 'floating';
  showTemplates?: boolean;
}

interface MessageTemplate {
  id: string;
  label: string;
  message: string;
  category: 'portfolio' | 'music' | 'general';
}

const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'portfolio-inquiry',
    label: 'Portfolio & Services Inquiry',
    message: `Hello Charles! I'm interested in your portfolio and would like to discuss a potential project. Could you please share more details about your services and availability?`,
    category: 'portfolio',
  },
  {
    id: 'web-development',
    label: 'Web Development Project',
    message: `Hi Charles! I have a web development project in mind and would love to discuss the requirements with you. When would be a good time to chat?`,
    category: 'portfolio',
  },
  {
    id: 'graphics-design',
    label: 'Graphics Design Services',
    message: `Hello! I'm looking for professional graphics design services for my brand. Could we discuss my design needs and your creative process?`,
    category: 'portfolio',
  },
  {
    id: 'music-booking',
    label: 'Music Ministry Booking',
    message: `Hi Charles! We would like to book you for our upcoming worship event. Could you share your availability and ministry package details?`,
    category: 'music',
  },
  {
    id: 'worship-leading',
    label: 'Worship Leading Services',
    message: `Hello Brother Charles! We're organizing a worship night and would love to have you lead worship. Are you available for ministry bookings?`,
    category: 'music',
  },
  {
    id: 'general-inquiry',
    label: 'General Inquiry',
    message: `Hello Charles! I came across your portfolio and would like to connect. Looking forward to hearing from you!`,
    category: 'general',
  },
];

export function WhatsAppIntegration({ 
  className = '', 
  variant = 'full', 
  showTemplates = true 
}: WhatsAppIntegrationProps) {
  const { currentBrand } = useBrandContext();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [showCustomMessage, setShowCustomMessage] = useState<boolean>(false);

  // WhatsApp business number from environment
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+256785446877';
  const displayNumber = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY_PHONE || '+256 785 446 877';

  // Business hours
  const businessHours = {
    weekdays: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Available for Ministry',
    timezone: 'EAT (UTC+3)',
  };

  const isBusinessHours = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    
    if (day === 0) return true; // Sunday - available for ministry
    if (day === 6) return hour >= 10 && hour < 16; // Saturday 10-4
    return hour >= 9 && hour < 18; // Weekdays 9-6
  };

  const generateWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSelectedTemplate(template.id);
    window.open(generateWhatsAppLink(template.message), '_blank');
  };

  const handleCustomMessage = () => {
    if (customMessage.trim()) {
      window.open(generateWhatsAppLink(customMessage), '_blank');
      setCustomMessage('');
      setShowCustomMessage(false);
    }
  };

  const filteredTemplates = MESSAGE_TEMPLATES.filter(template => {
    if (currentBrand === 'professional') return template.category !== 'music';
    if (currentBrand === 'ministry') return template.category !== 'portfolio' && template.category !== 'general';
    return true;
  });

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <a
          href={generateWhatsAppLink('Hello Charles! I found your portfolio and would like to connect.')}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </a>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{displayNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Clock className="w-3 h-3" />
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${isBusinessHours() ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            {isBusinessHours() ? 'Available now' : 'Will respond soon'}
          </span>
        </div>

        <EnhancedButton
          href={generateWhatsAppLink('Hello Charles! I found your portfolio and would like to connect.')}
          external
          size="sm"
          className="w-full"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Start Chat
        </EnhancedButton>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              WhatsApp Business
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{displayNumber}</p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Business Hours</span>
            <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
              isBusinessHours() 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {isBusinessHours() ? 'Available' : 'Will respond'}
            </span>
          </div>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Mon - Fri:</span>
              <span>{businessHours.weekdays}</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span>{businessHours.saturday}</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span>{businessHours.sunday}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 pt-1 border-t border-gray-200 dark:border-gray-600">
              Timezone: {businessHours.timezone}
            </div>
          </div>
        </div>

        {/* Quick Message Templates */}
        {showTemplates && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Quick Messages
            </h4>
            <div className="grid gap-2">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="flex items-center gap-3 p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 group"
                >
                  <Send className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {template.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Message */}
        <div className="space-y-3">
          {!showCustomMessage ? (
            <EnhancedButton
              onClick={() => setShowCustomMessage(true)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Write Custom Message
            </EnhancedButton>
          ) : (
            <div className="space-y-3">
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                maxLength={1000}
              />
              <div className="flex gap-2">
                <EnhancedButton
                  onClick={handleCustomMessage}
                  disabled={!customMessage.trim()}
                  size="sm"
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </EnhancedButton>
                <EnhancedButton
                  onClick={() => {
                    setShowCustomMessage(false);
                    setCustomMessage('');
                  }}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </EnhancedButton>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {customMessage.length}/1000 characters
              </p>
            </div>
          )}
        </div>

        {/* Direct WhatsApp Link */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <EnhancedButton
            href={generateWhatsAppLink('Hello Charles! I found your portfolio and would like to connect.')}
            external
            className="w-full"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Open WhatsApp Chat
          </EnhancedButton>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppIntegration;