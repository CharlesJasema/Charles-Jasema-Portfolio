import DonationSection from '@/components/DonationSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support My Ministry - Charles Jasema',
  description: 'Support Charles Jasema\'s music ministry through donations. Your generous support helps create more worship music and spread the gospel through song.',
  keywords: ['donate', 'support', 'Charles Jasema', 'music ministry', 'gospel music', 'worship music', 'mobile money', 'MTN', 'Airtel', 'PayPal'],
};

export default function SupportPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <DonationSection />
    </div>
  );
}
