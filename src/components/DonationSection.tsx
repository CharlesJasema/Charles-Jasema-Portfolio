'use client';

import { FaHeart, FaPaypal, FaMobileAlt } from 'react-icons/fa';
import { Button, Card } from '@/components/ui';
import { trackDonation } from '@/lib/analytics';

/**
 * Donation Section Component
 * 
 * Setup Instructions:
 * 1. Create Flutterwave account: https://flutterwave.com/ug
 * 2. Get your payment link
 * 3. Add to .env.local as NEXT_PUBLIC_FLUTTERWAVE_LINK
 * 4. Create PayPal donate button: https://www.paypal.com/donate/buttons
 * 5. Add to .env.local as NEXT_PUBLIC_PAYPAL_LINK
 */

const donationConfig = {
  flutterwaveLink: process.env.NEXT_PUBLIC_FLUTTERWAVE_LINK || '#',
  paypalLink: process.env.NEXT_PUBLIC_PAYPAL_LINK || '#',
  
  // Mobile Money Details (for manual donations)
  mobileMoneyDetails: {
    mtn: {
      name: 'MTN Mobile Money',
      number: '+256-785-446877',
      accountName: 'Charles Jasema',
    },
    airtel: {
      name: 'Airtel Money',
      number: '+256-745-063600',
      accountName: 'Charles Jasema',
    },
  },
  
  // Bank Details (for manual donations)
  bankDetails: {
    bankName: 'Your Bank Name',
    accountNumber: 'Your Account Number',
    accountName: 'Charles Jasema',
    swiftCode: 'Your SWIFT Code',
  },
};

export default function DonationSection() {
  const handleDonationClick = (method: string, link: string) => {
    trackDonation(0, method); // Amount will be tracked on payment completion
    if (link !== '#') {
      window.open(link, '_blank');
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-accent-red/5 via-primary-gold/5 to-tech-teal/5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-red/10 rounded-full mb-4">
            <FaHeart className="text-3xl text-accent-red" />
          </div>
          <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Support My Music Ministry
          </h2>
          <p className="text-lg text-gray-700 dark:text-text-secondary max-w-2xl mx-auto">
            Your generous support helps me create more worship music and spread the gospel through song. 
            Every donation, no matter the size, makes a difference in this ministry.
          </p>
        </div>

        {/* Donation Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Flutterwave (Mobile Money) */}
          <Card variant="elevated" padding="lg" className="hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-gold/10 rounded-full mb-4">
                <FaMobileAlt className="text-3xl text-primary-gold" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Mobile Money
              </h3>
              <p className="text-sm text-gray-600 dark:text-text-tertiary mb-4">
                MTN, Airtel, Bank Transfer
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => handleDonationClick('Mobile Money', donationConfig.flutterwaveLink)}
              >
                Donate via Mobile Money
              </Button>
              
              {/* Manual Mobile Money Details */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 text-left">
                <p className="text-xs text-gray-500 dark:text-text-tertiary mb-3 text-center">
                  Or send directly to:
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {donationConfig.mobileMoneyDetails.mtn.name}
                    </p>
                    <p className="text-gray-600 dark:text-text-secondary">
                      {donationConfig.mobileMoneyDetails.mtn.number}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-text-tertiary">
                      {donationConfig.mobileMoneyDetails.mtn.accountName}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {donationConfig.mobileMoneyDetails.airtel.name}
                    </p>
                    <p className="text-gray-600 dark:text-text-secondary">
                      {donationConfig.mobileMoneyDetails.airtel.number}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-text-tertiary">
                      {donationConfig.mobileMoneyDetails.airtel.accountName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* PayPal (International) */}
          <Card variant="elevated" padding="lg" className="hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-tech-teal/10 rounded-full mb-4">
                <FaPaypal className="text-3xl text-tech-teal" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                International Donations
              </h3>
              <p className="text-sm text-gray-600 dark:text-text-tertiary mb-4">
                Credit Card, Debit Card, PayPal
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => handleDonationClick('PayPal', donationConfig.paypalLink)}
              >
                Donate via PayPal
              </Button>
              
              {/* Bank Details */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 text-left">
                <p className="text-xs text-gray-500 dark:text-text-tertiary mb-3 text-center">
                  Or bank transfer:
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-text-tertiary">Bank:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {donationConfig.bankDetails.bankName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-text-tertiary">Account:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {donationConfig.bankDetails.accountNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-text-tertiary">Name:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {donationConfig.bankDetails.accountName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Impact Message */}
        <Card variant="elevated" padding="lg" className="bg-gradient-to-r from-accent-red/10 to-primary-gold/10">
          <div className="text-center">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              How Your Support Helps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">🎵 Create New Music</p>
                <p className="text-gray-600 dark:text-text-secondary">
                  Studio time, production, and recording costs
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">📹 Produce Videos</p>
                <p className="text-gray-600 dark:text-text-secondary">
                  Music videos and lyrical videos for worship
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">🌍 Spread the Gospel</p>
                <p className="text-gray-600 dark:text-text-secondary">
                  Reach more people with the message of Christ
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Thank You Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-text-secondary italic">
            "Thank you for your generous support. May God bless you abundantly!"
          </p>
          <p className="text-sm text-gray-500 dark:text-text-tertiary mt-2">
            - Charles Jasema
          </p>
        </div>
      </div>
    </section>
  );
}
