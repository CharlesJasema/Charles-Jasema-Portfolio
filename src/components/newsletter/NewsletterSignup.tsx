/**
 * Newsletter Signup Component
 * 
 * Professional newsletter subscription form with interest selection,
 * brand-aware design, and comprehensive validation
 */

'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  User,
  Heart,
  Code,
  Music,
  BookOpen,
  Palette
} from 'lucide-react';
import { useBrandContext } from '@/components/ui/BrandContext';
import { EnhancedButton } from '@/components/ui/EnhancedButton';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'inline' | 'modal' | 'sidebar' | 'footer';
  source?: 'portfolio' | 'music' | 'blog' | 'contact';
  showInterests?: boolean;
  title?: string;
  description?: string;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  interests: string[];
}

const interestOptions = [
  { 
    id: 'portfolio', 
    label: 'Portfolio Updates', 
    icon: Code,
    description: 'Latest projects and professional work',
    color: 'text-blue-600 dark:text-blue-400'
  },
  { 
    id: 'music', 
    label: 'Music Ministry', 
    icon: Music,
    description: 'New songs and worship events',
    color: 'text-purple-600 dark:text-purple-400'
  },
  { 
    id: 'blog', 
    label: 'Blog Posts', 
    icon: BookOpen,
    description: 'Tech insights and ministry thoughts',
    color: 'text-green-600 dark:text-green-400'
  },
  { 
    id: 'design', 
    label: 'Design Work', 
    icon: Palette,
    description: 'Graphics design and creative projects',
    color: 'text-orange-600 dark:text-orange-400'
  },
];

export function NewsletterSignup({
  className = '',
  variant = 'inline',
  source = 'portfolio',
  showInterests = true,
  title,
  description,
}: NewsletterSignupProps) {
  const { currentBrand } = useBrandContext();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    interests: source === 'music' ? ['music'] : source === 'portfolio' ? ['portfolio'] : [],
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Generate CSRF token on component mount
  React.useEffect(() => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    setCsrfToken(token);
  }, []);

  // Get default title and description based on brand and variant
  const getContent = () => {
    const defaultTitle = currentBrand === 'ministry' 
      ? 'Stay Connected with Charles\'s Ministry'
      : currentBrand === 'professional'
      ? 'Get Professional Updates'
      : 'Join Charles\'s Newsletter';
    
    const defaultDescription = currentBrand === 'ministry'
      ? 'Receive updates on new worship songs, ministry events, and spiritual insights.'
      : currentBrand === 'professional' 
      ? 'Stay updated with the latest projects, tech insights, and professional work.'
      : 'Get the latest updates on portfolio work, music ministry, and exclusive content.';

    return {
      title: title || defaultTitle,
      description: description || defaultDescription,
    };
  };

  const content = getContent();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle interest toggle
  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          firstName: formData.firstName.trim() || undefined,
          lastName: formData.lastName.trim() || undefined,
          interests: formData.interests,
          source,
          csrfToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! Check your email for confirmation.');
        
        // Reset form
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          interests: source === 'music' ? ['music'] : source === 'portfolio' ? ['portfolio'] : [],
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'modal':
        return 'max-w-md mx-auto';
      case 'sidebar':
        return 'max-w-xs';
      case 'footer':
        return 'max-w-sm';
      default:
        return 'max-w-lg';
    }
  };

  const isCompact = variant === 'sidebar' || variant === 'footer';

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            currentBrand === 'ministry' 
              ? 'bg-purple-100 dark:bg-purple-900'
              : 'bg-blue-100 dark:bg-blue-900'
          }`}>
            <Mail className={`w-6 h-6 ${
              currentBrand === 'ministry'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-blue-600 dark:text-blue-400'
            }`} />
          </div>
        </div>
        <h3 className={`font-bold text-gray-900 dark:text-white mb-2 ${
          isCompact ? 'text-lg' : 'text-xl'
        }`}>
          {content.title}
        </h3>
        <p className={`text-gray-600 dark:text-gray-300 ${
          isCompact ? 'text-sm' : 'text-base'
        }`}>
          {content.description}
        </p>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800 dark:text-green-200">{message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 dark:text-red-200">{message}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields (if not compact) */}
        {!isCompact && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Interests Selection */}
        {showInterests && !isCompact && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What interests you? (Optional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((interest) => {
                const IconComponent = interest.icon;
                const isSelected = formData.interests.includes(interest.id);
                
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    disabled={isLoading}
                  >
                    <div className="flex items-start gap-2">
                      <IconComponent className={`w-4 h-4 mt-0.5 ${interest.color}`} />
                      <div>
                        <div className={`text-sm font-medium ${
                          isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                        }`}>
                          {interest.label}
                        </div>
                        <div className={`text-xs ${
                          isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {interest.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <EnhancedButton
          type="submit"
          disabled={isLoading || !formData.email.trim()}
          className="w-full"
          size={isCompact ? 'sm' : 'md'}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </>
          )}
        </EnhancedButton>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>

      {/* Benefits (if not compact) */}
      {!isCompact && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            What you'll get:
          </h4>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-red-500" />
              <span>Exclusive content and behind-the-scenes updates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Early access to new projects and releases</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-blue-500" />
              <span>Personal insights and professional tips</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export type { NewsletterSignupProps };
export default NewsletterSignup;