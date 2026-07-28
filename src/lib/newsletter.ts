/**
 * Newsletter Service Integration
 * 
 * Provides comprehensive newsletter functionality with multiple providers:
 * - SendGrid for primary email marketing
 * - Resend as backup provider
 * - Mailchimp integration for advanced features
 * - Subscriber management and segmentation
 */

interface NewsletterConfig {
  sendgridApiKey: string;
  sendgridAudienceId: string;
  sendgridTemplateId: string;
  resendApiKey: string;
  mailchimpApiKey: string;
  mailchimpListId: string;
}

interface Subscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
  source?: 'portfolio' | 'music' | 'blog' | 'contact';
  tags?: string[];
  customFields?: Record<string, string>;
}

interface NewsletterResponse {
  success: boolean;
  message?: string;
  error?: string;
  subscriberId?: string;
  provider?: string;
}

interface EmailCampaign {
  to: string[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateId?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

class NewsletterService {
  private config: NewsletterConfig;
  private primaryProvider: 'sendgrid' | 'resend' | 'mailchimp';

  constructor() {
    this.config = {
      sendgridApiKey: process.env.SENDGRID_API_KEY || '',
      sendgridAudienceId: process.env.NEWSLETTER_AUDIENCE_ID || '',
      sendgridTemplateId: process.env.NEWSLETTER_TEMPLATE_ID || '',
      resendApiKey: process.env.RESEND_API_KEY || '',
      mailchimpApiKey: process.env.MAILCHIMP_API_KEY || '',
      mailchimpListId: process.env.MAILCHIMP_LIST_ID || '',
    };

    // Determine primary provider based on available configuration
    if (this.config.sendgridApiKey) {
      this.primaryProvider = 'sendgrid';
    } else if (this.config.resendApiKey) {
      this.primaryProvider = 'resend';
    } else if (this.config.mailchimpApiKey) {
      this.primaryProvider = 'mailchimp';
    } else {
      this.primaryProvider = 'sendgrid'; // Default fallback
    }
  }

  /**
   * Check if newsletter services are configured
   */
  public isConfigured(): boolean {
    return !!(
      this.config.sendgridApiKey ||
      this.config.resendApiKey ||
      this.config.mailchimpApiKey
    );
  }

  /**
   * Subscribe user using SendGrid
   */
  private async subscribeWithSendGrid(subscriber: Subscriber): Promise<NewsletterResponse> {
    try {
      if (!this.config.sendgridApiKey) {
        return { success: false, error: 'SendGrid not configured' };
      }

      const sgMail = require('@sendgrid/mail');
      const sgClient = require('@sendgrid/client');
      sgClient.setApiKey(this.config.sendgridApiKey);

      // Prepare contact data
      const contactData = {
        email: subscriber.email,
        first_name: subscriber.firstName || '',
        last_name: subscriber.lastName || '',
        custom_fields: {
          interests: (subscriber.interests || []).join(', '),
          source: subscriber.source || 'unknown',
          signup_date: new Date().toISOString(),
          ...subscriber.customFields,
        },
      };

      // Add tags if provided
      if (subscriber.tags && subscriber.tags.length > 0) {
        contactData.custom_fields.tags = subscriber.tags.join(', ');
      }

      // Add contact to SendGrid
      const request = {
        url: '/v3/marketing/contacts',
        method: 'PUT' as const,
        body: {
          contacts: [contactData],
        },
      };

      const [response] = await sgClient.request(request);

      if (response.statusCode === 202) {
        // Send welcome email if template is configured
        if (this.config.sendgridTemplateId) {
          await this.sendWelcomeEmail(subscriber, 'sendgrid');
        }

        return {
          success: true,
          message: 'Successfully subscribed to newsletter',
          subscriberId: response.body?.job_id,
          provider: 'sendgrid',
        };
      } else {
        return {
          success: false,
          error: `SendGrid error: ${response.statusCode}`,
        };
      }
    } catch (error) {
      console.error('SendGrid subscription error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown SendGrid error',
      };
    }
  }

  /**
   * Subscribe user using Resend
   */
  private async subscribeWithResend(subscriber: Subscriber): Promise<NewsletterResponse> {
    try {
      if (!this.config.resendApiKey) {
        return { success: false, error: 'Resend not configured' };
      }

      // Resend doesn't have built-in audience management, so we'll use it for sending emails
      // For now, we'll log the subscription and send a welcome email
      console.log('Resend subscription (logged):', {
        email: subscriber.email,
        name: `${subscriber.firstName || ''} ${subscriber.lastName || ''}`.trim(),
        interests: subscriber.interests,
        source: subscriber.source,
        timestamp: new Date().toISOString(),
      });

      // Send welcome email
      await this.sendWelcomeEmail(subscriber, 'resend');

      return {
        success: true,
        message: 'Successfully subscribed to newsletter',
        subscriberId: `resend_${Date.now()}`,
        provider: 'resend',
      };
    } catch (error) {
      console.error('Resend subscription error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown Resend error',
      };
    }
  }

  /**
   * Subscribe user using Mailchimp
   */
  private async subscribeWithMailchimp(subscriber: Subscriber): Promise<NewsletterResponse> {
    try {
      if (!this.config.mailchimpApiKey || !this.config.mailchimpListId) {
        return { success: false, error: 'Mailchimp not configured' };
      }

      // Extract server prefix from API key
      const serverPrefix = this.config.mailchimpApiKey.split('-')[1];
      if (!serverPrefix) {
        return { success: false, error: 'Invalid Mailchimp API key format' };
      }

      const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${this.config.mailchimpListId}/members`;

      const memberData = {
        email_address: subscriber.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscriber.firstName || '',
          LNAME: subscriber.lastName || '',
          INTERESTS: (subscriber.interests || []).join(', '),
          SOURCE: subscriber.source || 'unknown',
        },
        tags: subscriber.tags || [],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.mailchimpApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully subscribed to newsletter',
          subscriberId: data.id,
          provider: 'mailchimp',
        };
      } else {
        return {
          success: false,
          error: data.detail || 'Mailchimp subscription failed',
        };
      }
    } catch (error) {
      console.error('Mailchimp subscription error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown Mailchimp error',
      };
    }
  }

  /**
   * Subscribe user with automatic provider fallback
   */
  public async subscribe(subscriber: Subscriber): Promise<NewsletterResponse> {
    // Validate email
    if (!subscriber.email || !this.isValidEmail(subscriber.email)) {
      return { success: false, error: 'Invalid email address' };
    }

    // Try primary provider first
    let result = await this.subscribeWithProvider(subscriber, this.primaryProvider);
    
    if (result.success) {
      return result;
    }

    // Try fallback providers
    const providers: ('sendgrid' | 'resend' | 'mailchimp')[] = ['sendgrid', 'resend', 'mailchimp'];
    
    for (const provider of providers) {
      if (provider === this.primaryProvider) continue; // Skip already tried provider
      
      result = await this.subscribeWithProvider(subscriber, provider);
      if (result.success) {
        return result;
      }
    }

    return { success: false, error: 'All newsletter providers failed' };
  }

  /**
   * Subscribe with specific provider
   */
  private async subscribeWithProvider(
    subscriber: Subscriber, 
    provider: 'sendgrid' | 'resend' | 'mailchimp'
  ): Promise<NewsletterResponse> {
    switch (provider) {
      case 'sendgrid':
        return await this.subscribeWithSendGrid(subscriber);
      case 'resend':
        return await this.subscribeWithResend(subscriber);
      case 'mailchimp':
        return await this.subscribeWithMailchimp(subscriber);
      default:
        return { success: false, error: 'Invalid provider' };
    }
  }

  /**
   * Send welcome email to new subscriber
   */
  private async sendWelcomeEmail(
    subscriber: Subscriber, 
    provider: 'sendgrid' | 'resend' | 'mailchimp'
  ): Promise<void> {
    try {
      const welcomeContent = this.generateWelcomeEmailContent(subscriber);
      
      if (provider === 'sendgrid' && this.config.sendgridApiKey) {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(this.config.sendgridApiKey);

        const email = {
          to: subscriber.email,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@charlesjasema.com',
          subject: 'Welcome to Charles Jasema\'s Newsletter!',
          html: welcomeContent.html,
          text: welcomeContent.text,
        };

        await sgMail.send(email);
      } else if (provider === 'resend' && this.config.resendApiKey) {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@charlesjasema.com',
            to: subscriber.email,
            subject: 'Welcome to Charles Jasema\'s Newsletter!',
            html: welcomeContent.html,
            text: welcomeContent.text,
          }),
        });

        if (!response.ok) {
          console.error('Resend welcome email failed:', await response.text());
        }
      }
    } catch (error) {
      console.error('Welcome email error:', error);
    }
  }

  /**
   * Generate welcome email content
   */
  private generateWelcomeEmailContent(subscriber: Subscriber): { html: string; text: string } {
    const name = subscriber.firstName || 'Friend';
    const interests = subscriber.interests || [];
    
    const isPortfolioInterested = interests.includes('portfolio') || subscriber.source === 'portfolio';
    const isMusicInterested = interests.includes('music') || subscriber.source === 'music';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 10px;">Welcome ${name}! 🎉</h1>
          <p style="color: #6b7280; font-size: 16px;">Thank you for joining Charles Jasema's newsletter</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">What to Expect</h2>
          
          ${isPortfolioInterested ? `
            <div style="margin-bottom: 15px;">
              <h3 style="color: #2563eb; font-size: 16px; margin-bottom: 5px;">💻 Professional Updates</h3>
              <p style="color: #4b5563; font-size: 14px; margin: 0;">Latest web development projects, design work, and tech insights</p>
            </div>
          ` : ''}
          
          ${isMusicInterested ? `
            <div style="margin-bottom: 15px;">
              <h3 style="color: #7c3aed; font-size: 16px; margin-bottom: 5px;">🎵 Music Ministry Updates</h3>
              <p style="color: #4b5563; font-size: 14px; margin: 0;">New songs, ministry events, and worship resources</p>
            </div>
          ` : ''}
          
          <div style="margin-bottom: 15px;">
            <h3 style="color: #059669; font-size: 16px; margin-bottom: 5px;">📝 Exclusive Content</h3>
            <p style="color: #4b5563; font-size: 14px; margin: 0;">Behind-the-scenes insights, tutorials, and personal updates</p>
          </div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <h3 style="color: #1f2937; margin-bottom: 15px;">Connect with Charles</h3>
          <div style="display: inline-block;">
            <a href="https://wa.me/256785446877" style="display: inline-block; background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px; font-size: 14px;">💬 WhatsApp</a>
            <a href="mailto:brocharles001@gmail.com" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px; font-size: 14px;">✉️ Email</a>
          </div>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            You're receiving this because you subscribed to Charles Jasema's newsletter.<br>
            <a href="{unsubscribe_url}" style="color: #2563eb;">Unsubscribe</a> | 
            <a href="https://charlesjasema.com" style="color: #2563eb;">Visit Website</a>
          </p>
        </div>
      </div>
    `;

    const text = `
Welcome ${name}! 🎉

Thank you for joining Charles Jasema's newsletter.

What to Expect:
${isPortfolioInterested ? '💻 Professional Updates - Latest web development projects, design work, and tech insights\n' : ''}${isMusicInterested ? '🎵 Music Ministry Updates - New songs, ministry events, and worship resources\n' : ''}📝 Exclusive Content - Behind-the-scenes insights, tutorials, and personal updates

Connect with Charles:
💬 WhatsApp: https://wa.me/256785446877
✉️ Email: brocharles001@gmail.com
🌐 Website: https://charlesjasema.com

---
You're receiving this because you subscribed to Charles Jasema's newsletter.
To unsubscribe, visit: {unsubscribe_url}
    `;

    return { html, text };
  }

  /**
   * Send newsletter campaign
   */
  public async sendCampaign(campaign: EmailCampaign): Promise<NewsletterResponse> {
    try {
      if (!this.isConfigured()) {
        return { success: false, error: 'Newsletter service not configured' };
      }

      // Use primary provider for campaigns
      if (this.primaryProvider === 'sendgrid' && this.config.sendgridApiKey) {
        return await this.sendCampaignWithSendGrid(campaign);
      } else if (this.primaryProvider === 'resend' && this.config.resendApiKey) {
        return await this.sendCampaignWithResend(campaign);
      }

      return { success: false, error: 'No suitable provider for campaign sending' };
    } catch (error) {
      console.error('Campaign sending error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown campaign error',
      };
    }
  }

  /**
   * Send campaign via SendGrid
   */
  private async sendCampaignWithSendGrid(campaign: EmailCampaign): Promise<NewsletterResponse> {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(this.config.sendgridApiKey);

    const emails = campaign.to.map(email => ({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@charlesjasema.com',
      subject: campaign.subject,
      html: campaign.htmlContent,
      text: campaign.textContent || this.stripHtml(campaign.htmlContent),
    }));

    await sgMail.send(emails);
    
    return {
      success: true,
      message: `Campaign sent to ${campaign.to.length} subscribers`,
      provider: 'sendgrid',
    };
  }

  /**
   * Send campaign via Resend
   */
  private async sendCampaignWithResend(campaign: EmailCampaign): Promise<NewsletterResponse> {
    const responses = await Promise.all(
      campaign.to.map(email =>
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@charlesjasema.com',
            to: email,
            subject: campaign.subject,
            html: campaign.htmlContent,
            text: campaign.textContent || this.stripHtml(campaign.htmlContent),
          }),
        })
      )
    );

    const failedCount = responses.filter(r => !r.ok).length;
    
    return {
      success: failedCount === 0,
      message: `Campaign sent to ${campaign.to.length - failedCount} subscribers${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
      provider: 'resend',
    };
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Strip HTML tags for text content
   */
  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }

  /**
   * Get newsletter templates
   */
  public static getNewsletterTemplates() {
    return {
      portfolioUpdate: {
        subject: "🚀 New Project Alert: {project_name}",
        preview: "Check out Charles's latest work and behind-the-scenes insights",
      },
      musicRelease: {
        subject: "🎵 New Song Released: {song_title}",
        preview: "Listen to Charles's newest worship song and get exclusive access",
      },
      blogPost: {
        subject: "📝 New Article: {blog_title}",
        preview: "Read Charles's latest insights on technology and ministry",
      },
      monthlyUpdate: {
        subject: "📊 Monthly Update from Charles Jasema",
        preview: "Portfolio highlights, music ministry news, and what's coming next",
      },
    };
  }
}

// Export singleton instance
export const newsletterService = new NewsletterService();

// Export types
export type { 
  Subscriber, 
  NewsletterResponse, 
  EmailCampaign, 
  NewsletterConfig 
};

export { NewsletterService };