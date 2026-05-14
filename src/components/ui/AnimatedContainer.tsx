'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideIn' | 'slideUp' | 'scaleIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  triggerOnce?: boolean;
}

export function AnimatedContainer({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className,
  triggerOnce = true,
}: AnimatedContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce, hasTriggered]);

  const animationClass = {
    fadeIn: 'animate-fadeIn',
    slideIn: 'animate-slide-in',
    slideUp: 'animate-slide-up',
    scaleIn: 'animate-scale-in',
  }[animation];

  return (
    <div
      ref={elementRef}
      className={clsx(
        'transition-opacity',
        isVisible ? `opacity-100 ${animationClass}` : 'opacity-0',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function StaggeredContainer({
  children,
  staggerDelay = 100,
  animation = 'fadeIn',
  className,
}: {
  children: ReactNode[];
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideIn' | 'slideUp' | 'scaleIn';
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedContainer
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedContainer>
      ))}
    </div>
  );
}