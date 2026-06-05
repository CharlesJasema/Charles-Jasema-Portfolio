'use client';

import { useEffect, useState } from 'react';

export function DiagnosticTest() {
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Check for common issues
    const diagnosticErrors: string[] = [];
    
    // Check if React is working
    try {
      if (typeof window === 'undefined') {
        diagnosticErrors.push('Window object not available');
      }
      
      // Check if CSS is loading
      const testElement = document.createElement('div');
      testElement.className = 'animate-fadeIn';
      document.body.appendChild(testElement);
      const computedStyle = window.getComputedStyle(testElement);
      if (!computedStyle.animationName) {
        diagnosticErrors.push('CSS animations not loading properly');
      }
      document.body.removeChild(testElement);
      
      // Check for console errors
      const originalError = console.error;
      console.error = (...args) => {
        diagnosticErrors.push(`Console Error: ${args.join(' ')}`);
        originalError.apply(console, args);
      };
      
    } catch (error) {
      diagnosticErrors.push(`Diagnostic error: ${error}`);
    }
    
    setErrors(diagnosticErrors);
  }, []);

  if (!mounted) {
    return <div>Loading diagnostic...</div>;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'red',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999,
      maxWidth: '300px',
      fontSize: '12px'
    }}>
      <h4>🔍 Diagnostic Test</h4>
      <p>✅ React is mounted</p>
      <p>✅ JavaScript is executing</p>
      <p>✅ Component is rendering</p>
      {errors.length > 0 && (
        <div>
          <p>❌ Issues found:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {errors.length === 0 && <p>✅ No issues detected</p>}
    </div>
  );
}