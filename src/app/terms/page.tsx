import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Charles Jasema',
  description: 'Terms of Service for Charles Jasema Portfolio - Read our terms and conditions for using our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-text-secondary">
            Last Updated: May 7, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              Welcome to Charles Jasema's Portfolio. By accessing or using our website{' '}
              <a href="https://charlesjasema.com" className="text-accent-red hover:underline">
                charlesjasema.com
              </a>{' '}
              (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site.
            </p>
            <p className="text-gray-700 dark:text-text-secondary">
              These Terms constitute a legally binding agreement between you and Charles Jasema ("we," "our," or "us"). We reserve the right to modify these Terms at any time, and your continued use of the Site constitutes acceptance of any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              2. Use of the Site
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.1 Permitted Use
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              You may use the Site for lawful purposes only. You agree to use the Site in accordance with these Terms and all applicable laws and regulations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.2 Prohibited Activities
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              You agree NOT to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Use the Site for any illegal or unauthorized purpose</li>
              <li>Violate any local, state, national, or international law</li>
              <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
              <li>Transmit any viruses, malware, or other malicious code</li>
              <li>Attempt to gain unauthorized access to the Site or its systems</li>
              <li>Interfere with or disrupt the Site or servers</li>
              <li>Collect or harvest personal information from other users</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in any activity that could harm the Site or its users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              3. Intellectual Property Rights
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.1 Ownership
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              All content on the Site, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Music compositions and recordings</li>
              <li>Song lyrics</li>
              <li>Videos and audio files</li>
              <li>Software code and projects</li>
              <li>Design work and graphics</li>
              <li>Text, images, and multimedia content</li>
              <li>Trademarks, logos, and branding</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              is the exclusive property of Charles Jasema and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.2 Limited License
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We grant you a limited, non-exclusive, non-transferable, revocable license to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Access and view the Site for personal, non-commercial use</li>
              <li>Download song lyrics for personal use only</li>
              <li>Stream music and videos through authorized platforms</li>
              <li>Share links to our content on social media</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3.3 Restrictions
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              You may NOT:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Reproduce, distribute, or publicly display our content without permission</li>
              <li>Modify, adapt, or create derivative works</li>
              <li>Use our content for commercial purposes without authorization</li>
              <li>Remove copyright notices or attributions</li>
              <li>Claim ownership of our content</li>
              <li>Use our music or lyrics in your own projects without a license</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              4. Music and Lyrics
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.1 Copyright Protection
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              All music compositions, recordings, and lyrics are original works by Charles Jasema and are protected by copyright law. Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.2 Personal Use
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              You may download lyrics for personal, non-commercial use only. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Reading and singing along for personal worship</li>
              <li>Printing for personal reference</li>
              <li>Sharing with friends and family for non-commercial purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4.3 Commercial Use and Licensing
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              If you wish to use our music or lyrics for commercial purposes, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Church services or worship events</li>
              <li>Recordings or covers</li>
              <li>Public performances</li>
              <li>Broadcasting or streaming</li>
              <li>Synchronization with video or other media</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              You must obtain written permission and a license from us. Please contact us at{' '}
              <a href="mailto:brocharles001@gmail.com" className="text-accent-red hover:underline">
                brocharles001@gmail.com
              </a>{' '}
              to discuss licensing arrangements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              5. User Content and Communications
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.1 Submissions
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              If you submit content to us (e.g., through contact forms, comments, or messages), you grant us a non-exclusive, royalty-free, perpetual, worldwide license to use, reproduce, modify, and display such content for the purposes of operating and improving the Site.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5.2 Responsibility
            </h3>
            <p className="text-gray-700 dark:text-text-secondary">
              You are solely responsible for any content you submit. You represent and warrant that you own or have the necessary rights to submit such content and that it does not violate any third-party rights or applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              6. Third-Party Links and Services
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              The Site may contain links to third-party websites and services, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>YouTube (music videos)</li>
              <li>Mdundo (music streaming)</li>
              <li>Spotify and Apple Music</li>
              <li>GitHub (code repositories)</li>
              <li>Social media platforms</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              We are not responsible for the content, privacy practices, or terms of service of these third-party sites. Your use of third-party services is at your own risk and subject to their respective terms and policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
              <li>Warranties that the Site will be uninterrupted, error-free, or secure</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              We do not warrant that the Site will meet your requirements or that any errors will be corrected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, CHARLES JASEMA SHALL NOT BE LIABLE FOR ANY:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Damages arising from your use or inability to use the Site</li>
              <li>Damages resulting from unauthorized access to your data</li>
              <li>Damages arising from third-party content or services</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              Our total liability to you for any claims arising from your use of the Site shall not exceed the amount you paid to us (if any) in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              9. Indemnification
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              You agree to indemnify, defend, and hold harmless Charles Jasema and our affiliates, officers, agents, and employees from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Your use of the Site</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you submit to the Site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              10. Booking and Services
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              If you request booking or services through the Site:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>All bookings are subject to availability and confirmation</li>
              <li>Pricing and terms will be discussed and agreed upon separately</li>
              <li>Payment terms and cancellation policies will be specified in separate agreements</li>
              <li>We reserve the right to decline any booking request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              11. Privacy
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              Your use of the Site is also governed by our{' '}
              <a href="/privacy" className="text-accent-red hover:underline">
                Privacy Policy
              </a>
              , which is incorporated into these Terms by reference. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              12. Termination
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Terminate or suspend your access to the Site at any time, with or without notice</li>
              <li>Remove or disable any content that violates these Terms</li>
              <li>Take legal action against users who violate these Terms</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              Upon termination, your right to use the Site will immediately cease. Provisions that by their nature should survive termination (including intellectual property rights, disclaimers, and limitations of liability) will remain in effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              13. Governing Law and Dispute Resolution
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              13.1 Governing Law
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Uganda, without regard to its conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              13.2 Dispute Resolution
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              Any disputes arising from these Terms or your use of the Site shall be resolved through:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Good faith negotiation between the parties</li>
              <li>Mediation, if negotiation fails</li>
              <li>Binding arbitration or litigation in the courts of Uganda, if mediation fails</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              14. Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page with a new "Last Updated" date. Your continued use of the Site after such changes constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              15. Severability
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              16. Entire Agreement
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Charles Jasema regarding your use of the Site and supersede all prior agreements and understandings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              17. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              If you have any questions, concerns, or requests regarding these Terms, please contact us:
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">Charles Jasema</p>
              <p className="text-gray-700 dark:text-text-secondary mb-1">
                <strong>Email:</strong>{' '}
                <a href="mailto:brocharles001@gmail.com" className="text-accent-red hover:underline">
                  brocharles001@gmail.com
                </a>
              </p>
              <p className="text-gray-700 dark:text-text-secondary mb-1">
                <strong>Phone:</strong> +256-785-446877
              </p>
              <p className="text-gray-700 dark:text-text-secondary">
                <strong>Location:</strong> Koboko, Uganda
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              18. Acknowledgment
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              BY USING THE SITE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-accent-red/10 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-text-secondary">
            <strong>Note:</strong> These Terms of Service are effective as of May 7, 2026. By using our Site, you agree to these terms. If you have any questions or need clarification, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
