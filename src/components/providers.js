'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#f9fafb',
            border: '1px solid #D4AF37',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#f9fafb',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#f9fafb',
            },
          },
        }}
      />
    </ThemeProvider>
  );
}