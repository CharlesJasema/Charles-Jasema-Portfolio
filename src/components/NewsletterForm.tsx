'use client';

import { useState, FormEvent } from 'react';
import { Input, Button } from '@/components/ui';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement newsletter subscription API call
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading'}
          className="flex-1"
          aria-label="Email address for newsletter"
        />
        <Button
          type="submit"
          variant="primary"
          isLoading={status === 'loading'}
          disabled={status === 'loading'}
          className="sm:w-auto"
        >
          Subscribe
        </Button>
      </div>
      {message && (
        <p
          className={`text-sm ${
            status === 'success' ? 'text-tech-teal' : 'text-accent-red'
          }`}
          role={status === 'success' ? 'status' : 'alert'}
        >
          {message}
        </p>
      )}
    </form>
  );
}
