'use client';

import { CTASection, CTABanner, CTAGrid } from './';
import { BookMeCTA, HireMeCTA, SubscribeCTA, ContactMeCTA } from './CTAPresets';

// Music Page CTAs
export function MusicPageCTAs() {
  return (
    <CTABanner
      title="Ready to Book Charles for Your Event?"
      description="From intimate acoustic sets to full band performances, Charles brings professional musicianship and engaging entertainment to every event."
      variant="gradient"
      size="lg"
    >
      <CTAGrid columns={2} gap="lg">
        <BookMeCTA 
          text="Book Performance"
          size="lg"
          variant="primary"
        />
        <ContactMeCTA 
          text="Discuss Your Event"
          size="lg"
          variant="outline"
        />
      </CTAGrid>
    </CTABanner>
  );
}

// Portfolio Page CTAs
export function PortfolioPageCTAs() {
  return (
    <CTABanner
      title="Let's Build Something Amazing Together"
      description="Ready to bring your vision to life? Charles combines technical expertise with creative problem-solving to deliver exceptional results."
      variant="gradient"
      size="lg"
    >
      <CTAGrid columns={2} gap="lg">
        <HireMeCTA 
          text="Start Your Project"
          size="lg"
          variant="secondary"
        />
        <ContactMeCTA 
          text="Get Free Consultation"
          size="lg"
          variant="outline"
        />
      </CTAGrid>
    </CTABanner>
  );
}

// Blog Page CTAs
export function BlogPageCTAs() {
  return (
    <CTASection
      title="Stay Connected"
      description="Get the latest updates on new music, projects, and insights delivered to your inbox."
      variant="centered"
      background="glass"
      padding="lg"
    >
      <CTAGrid columns={2} gap="md">
        <SubscribeCTA 
          text="Subscribe to Newsletter"
          size="md"
          variant="primary"
        />
        <ContactMeCTA 
          text="Send Feedback"
          size="md"
          variant="ghost"
        />
      </CTAGrid>
    </CTASection>
  );
}

// Home Page CTAs
export function HomePageCTAs() {
  return (
    <CTABanner
      title="Ready to Work Together?"
      description="Whether you need a performer for your event or a developer for your project, Charles is here to help bring your vision to life."
      variant="gradient"
      size="lg"
    >
      <CTAGrid columns={3} gap="lg">
        <BookMeCTA 
          text="Book Performance"
          size="lg"
          variant="primary"
        />
        <HireMeCTA 
          text="Hire for Project"
          size="lg"
          variant="secondary"
        />
        <ContactMeCTA 
          text="Get in Touch"
          size="lg"
          variant="outline"
        />
      </CTAGrid>
    </CTABanner>
  );
}

// About Page CTAs
export function AboutPageCTAs() {
  return (
    <CTASection
      title="Let's Connect"
      description="Interested in learning more or working together? Charles would love to hear from you."
      variant="split"
      background="default"
      padding="lg"
    >
      <CTAGrid columns={2} gap="md">
        <ContactMeCTA 
          text="Send Message"
          size="md"
          variant="primary"
        />
        <SubscribeCTA 
          text="Follow Journey"
          size="md"
          variant="outline"
        />
      </CTAGrid>
    </CTASection>
  );
}

// Contact Page CTAs (for after form submission)
export function ContactPageCTAs() {
  return (
    <CTASection
      title="Explore More"
      description="While you're here, check out Charles's latest work and updates."
      variant="centered"
      background="glass"
      padding="md"
    >
      <CTAGrid columns={3} gap="md">
        <BookMeCTA 
          text="View Music"
          href="/music"
          size="sm"
          variant="ghost"
        />
        <HireMeCTA 
          text="See Portfolio"
          href="/portfolio"
          size="sm"
          variant="ghost"
        />
        <SubscribeCTA 
          text="Subscribe"
          size="sm"
          variant="outline"
        />
      </CTAGrid>
    </CTASection>
  );
}

// Inline CTAs for content sections
export function InlineMusicCTA({ songTitle }: { songTitle?: string }) {
  return (
    <CTASection
      variant="split"
      background="none"
      padding="sm"
    >
      <BookMeCTA 
        text={songTitle ? `Book "${songTitle}" Performance` : "Book This Song"}
        size="sm"
        variant="outline"
      />
    </CTASection>
  );
}

export function InlinePortfolioCTA({ projectTitle }: { projectTitle?: string }) {
  return (
    <CTASection
      variant="split"
      background="none"
      padding="sm"
    >
      <HireMeCTA 
        text={projectTitle ? `Discuss Similar Project` : "Hire for Similar Work"}
        size="sm"
        variant="outline"
      />
    </CTASection>
  );
}

// Sticky/Fixed CTAs
export function StickyContactCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <ContactMeCTA 
        text="Contact"
        size="md"
        variant="primary"
        className="shadow-2xl"
      />
    </div>
  );
}

// Footer CTAs
export function FooterCTAs() {
  return (
    <CTASection
      title="Ready to Get Started?"
      variant="centered"
      background="gradient"
      padding="xl"
    >
      <CTAGrid columns={2} gap="lg">
        <BookMeCTA 
          text="Book Performance"
          size="lg"
          variant="primary"
        />
        <HireMeCTA 
          text="Start Project"
          size="lg"
          variant="secondary"
        />
      </CTAGrid>
    </CTASection>
  );
}