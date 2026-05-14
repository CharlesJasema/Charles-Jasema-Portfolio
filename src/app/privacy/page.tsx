import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Charles Jasema',
  description: 'Privacy Policy for Charles Jasema Portfolio - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-text-secondary">
            Last Updated: May 7, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              Welcome to Charles Jasema's Portfolio ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
              <a href="https://charlesjasema.com" className="text-accent-red hover:underline">
                charlesjasema.com
              </a>{' '}
              (the "Site").
            </p>
            <p className="text-gray-700 dark:text-text-secondary">
              By accessing or using our Site, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.1 Personal Information
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Subscribe to our newsletter</li>
              <li>Fill out a contact form</li>
              <li>Request booking information</li>
              <li>Download content (lyrics, PDFs)</li>
              <li>Interact with our Sanity CMS admin panel</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              Personal information may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Message content</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              When you visit our Site, we may automatically collect certain information about your device and usage, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>Device information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2.3 Third-Party Services
            </h3>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We use third-party services that may collect information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li><strong>Sanity CMS:</strong> Content management and storage</li>
              <li><strong>Vercel/Netlify:</strong> Website hosting and analytics</li>
              <li><strong>YouTube:</strong> Embedded music videos</li>
              <li><strong>Mdundo:</strong> Music streaming links</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li><strong>Communication:</strong> To respond to your inquiries, send newsletters, and provide updates</li>
              <li><strong>Service Delivery:</strong> To provide and maintain our Site and services</li>
              <li><strong>Analytics:</strong> To understand how visitors use our Site and improve user experience</li>
              <li><strong>Content Management:</strong> To manage and deliver content through Sanity CMS</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              <li><strong>Marketing:</strong> To send promotional materials (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our Site. Cookies are small data files stored on your device.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Types of Cookies We Use:
            </h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the Site to function properly</li>
              <li><strong>Preference Cookies:</strong> Remember your settings (e.g., dark mode preference)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our Site</li>
              <li><strong>Marketing Cookies:</strong> Track your activity for advertising purposes (if applicable)</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              5. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our Site (e.g., Sanity CMS, hosting providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly consent to sharing your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              6. Data Security
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li>Secure HTTPS encryption</li>
              <li>Secure API tokens and authentication</li>
              <li>Regular security updates and monitoring</li>
              <li>Access controls and authentication for admin panels</li>
              <li>Data backup and recovery procedures</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              7. Data Retention
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your information is no longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              8. Your Rights and Choices
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-text-secondary space-y-2">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to the processing of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing (where applicable)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-gray-700 dark:text-text-secondary">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:brocharles001@gmail.com" className="text-accent-red hover:underline">
                brocharles001@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              Our Site may contain links to third-party websites and services (e.g., YouTube, Mdundo, GitHub, social media platforms). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              10. Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately, and we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              11. International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Site, you consent to the transfer of your information to these countries.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on this page with a new "Last Updated" date. Your continued use of the Site after such changes constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              13. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
              14. Consent
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              By using our Site, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-accent-red/10 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-text-secondary">
            <strong>Note:</strong> This Privacy Policy is effective as of May 7, 2026. We are committed to protecting your privacy and handling your data responsibly. If you have any questions or concerns, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
