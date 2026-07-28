/**
 * WhatsApp Business API Integration
 * 
 * Provides comprehensive WhatsApp Business API functionality including:
 * - Message sending capabilities
 * - Template message support
 * - Media message handling
 * - Webhook processing
 * - Contact management
 */

interface WhatsAppConfig {
  accessToken: string;
  phoneNumberId: string;
  businessAccountId: string;
  webhookVerifyToken: string;
  webhookSecret: string;
}

interface WhatsAppTextMessage {
  messaging_product: "whatsapp";
  to: string;
  type: "text";
  text: {
    body: string;
  };
}

interface WhatsAppTemplateMessage {
  messaging_product: "whatsapp";
  to: string;
  type: "template";
  template: {
    name: string;
    language: {
      code: string;
    };
    components?: Array<{
      type: string;
      parameters: Array<{
        type: string;
        text?: string;
        image?: {
          link: string;
        };
      }>;
    }>;
  };
}

interface WhatsAppMediaMessage {
  messaging_product: "whatsapp";
  to: string;
  type: "document" | "image" | "video" | "audio";
  document?: {
    link: string;
    caption?: string;
    filename?: string;
  };
  image?: {
    link: string;
    caption?: string;
  };
  video?: {
    link: string;
    caption?: string;
  };
  audio?: {
    link: string;
  };
}

class WhatsAppBusinessAPI {
  private config: WhatsAppConfig;
  private baseUrl: string = 'https://graph.facebook.com/v19.0';

  constructor() {
    this.config = {
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
      businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
      webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '',
      webhookSecret: process.env.WHATSAPP_WEBHOOK_SECRET || '',
    };
  }

  /**
   * Check if WhatsApp Business API is properly configured
   */
  public isConfigured(): boolean {
    return !!(
      this.config.accessToken &&
      this.config.phoneNumberId &&
      this.config.businessAccountId
    );
  }

  /**
   * Send a text message via WhatsApp Business API
   */
  public async sendTextMessage(
    to: string,
    message: string,
    previewUrl: boolean = false
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      if (!this.isConfigured()) {
        return { success: false, error: 'WhatsApp Business API not configured' };
      }

      // Clean phone number (remove non-digits and add country code if needed)
      const cleanPhone = this.cleanPhoneNumber(to);
      
      const messageData: WhatsAppTextMessage = {
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "text",
        text: {
          body: message,
        },
      };

      const response = await fetch(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        }
      );

      const result = await response.json();

      if (response.ok && result.messages) {
        return {
          success: true,
          messageId: result.messages[0].id,
        };
      } else {
        return {
          success: false,
          error: result.error?.message || 'Failed to send message',
        };
      }
    } catch (error) {
      console.error('WhatsApp send message error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send a template message (pre-approved templates only)
   */
  public async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string = 'en',
    parameters: Array<{ type: string; text?: string; image?: { link: string } }> = []
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      if (!this.isConfigured()) {
        return { success: false, error: 'WhatsApp Business API not configured' };
      }

      const cleanPhone = this.cleanPhoneNumber(to);

      const messageData: WhatsAppTemplateMessage = {
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
        },
      };

      if (parameters.length > 0) {
        messageData.template.components = [
          {
            type: "body",
            parameters: parameters,
          },
        ];
      }

      const response = await fetch(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        }
      );

      const result = await response.json();

      if (response.ok && result.messages) {
        return {
          success: true,
          messageId: result.messages[0].id,
        };
      } else {
        return {
          success: false,
          error: result.error?.message || 'Failed to send template message',
        };
      }
    } catch (error) {
      console.error('WhatsApp send template error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send a document via WhatsApp Business API
   */
  public async sendDocument(
    to: string,
    documentUrl: string,
    filename?: string,
    caption?: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      if (!this.isConfigured()) {
        return { success: false, error: 'WhatsApp Business API not configured' };
      }

      const cleanPhone = this.cleanPhoneNumber(to);

      const messageData: WhatsAppMediaMessage = {
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "document",
        document: {
          link: documentUrl,
          filename: filename,
          caption: caption,
        },
      };

      const response = await fetch(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        }
      );

      const result = await response.json();

      if (response.ok && result.messages) {
        return {
          success: true,
          messageId: result.messages[0].id,
        };
      } else {
        return {
          success: false,
          error: result.error?.message || 'Failed to send document',
        };
      }
    } catch (error) {
      console.error('WhatsApp send document error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Clean and format phone number for WhatsApp API
   */
  private cleanPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present (assuming Uganda +256)
    if (cleaned.length === 9 && cleaned.startsWith('7')) {
      cleaned = '256' + cleaned;
    } else if (cleaned.length === 10 && cleaned.startsWith('07')) {
      cleaned = '256' + cleaned.substring(1);
    } else if (cleaned.startsWith('256') && cleaned.length === 12) {
      // Already has country code
    } else if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    
    return cleaned;
  }

  /**
   * Verify webhook signature
   */
  public verifyWebhookSignature(
    payload: string,
    signature: string
  ): boolean {
    try {
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', this.config.webhookSecret)
        .update(payload)
        .digest('hex');
      
      return signature === `sha256=${expectedSignature}`;
    } catch (error) {
      console.error('Webhook signature verification error:', error);
      return false;
    }
  }

  /**
   * Process incoming webhook message
   */
  public processWebhookMessage(webhookData: any): {
    messageType: string;
    from: string;
    message?: string;
    mediaId?: string;
    timestamp: number;
  } | null {
    try {
      if (
        !webhookData.entry ||
        !webhookData.entry[0] ||
        !webhookData.entry[0].changes ||
        !webhookData.entry[0].changes[0] ||
        !webhookData.entry[0].changes[0].value ||
        !webhookData.entry[0].changes[0].value.messages
      ) {
        return null;
      }

      const message = webhookData.entry[0].changes[0].value.messages[0];
      const contact = webhookData.entry[0].changes[0].value.contacts[0];

      return {
        messageType: message.type,
        from: message.from,
        message: message.text?.body || message.document?.caption || '',
        mediaId: message.document?.id || message.image?.id || message.video?.id,
        timestamp: parseInt(message.timestamp),
      };
    } catch (error) {
      console.error('Webhook message processing error:', error);
      return null;
    }
  }

  /**
   * Generate WhatsApp direct message link
   */
  public static generateWhatsAppLink(
    phoneNumber: string,
    message?: string,
    web: boolean = false
  ): string {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const encodedMessage = message ? encodeURIComponent(message) : '';
    const baseUrl = web ? 'https://web.whatsapp.com' : 'https://wa.me';
    
    return `${baseUrl}/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  }

  /**
   * Predefined message templates for common scenarios
   */
  public static getMessageTemplates() {
    return {
      portfolioInquiry: (name: string) => `Hello ${name}! 👋

Thank you for reaching out about my portfolio work. I'd be happy to discuss your project requirements.

I offer the following services:
• 💻 Software Development (Web & Mobile)
• 🎨 Graphics Design & Branding
• 🎥 Videography & Content Creation
• 🎵 Music Ministry & Worship Leading

What type of project are you interested in? I'll provide you with a detailed proposal and timeline.

Best regards,
Charles Jasema
Software Engineer | Designer | Gospel Artist`,

      musicMinistryBooking: (name: string, eventType?: string) => `Hello ${name}! 🙏

Thank you for your interest in booking me for ${eventType || 'your event'}. I'm honored to be considered for your worship gathering.

I offer:
• 🎤 Worship Leading
• 🎹 Live Music Performance
• 🎵 Original Gospel Songs
• 🎶 Sound & Technical Support

Please share:
• Event date and time
• Location and expected attendance
• Type of service (worship night, concert, conference, etc.)
• Budget range

I'll send you my ministry package and availability.

Blessings,
Charles Jasema
Gospel Artist & Worship Leader`,

      generalThankYou: (name: string) => `Hello ${name}! 

Thank you for contacting me through my portfolio website. I have received your message and will get back to you within 24 hours.

If this is urgent, feel free to call me directly at +256 785 446 877.

Best regards,
Charles Jasema`,

      downloadReady: (name: string, fileName: string) => `Hello ${name}! 📁

Your requested file "${fileName}" is ready for download. I'll send it to you shortly.

This download link will be active for 7 days. Please save the file to your device once downloaded.

Best regards,
Charles Jasema`,
    };
  }
}

// Export singleton instance
export const whatsappAPI = new WhatsAppBusinessAPI();

// Export utility functions
export const WhatsAppUtils = {
  generateLink: WhatsAppBusinessAPI.generateWhatsAppLink,
  getTemplates: WhatsAppBusinessAPI.getMessageTemplates,
  formatPhoneForDisplay: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('256') && cleaned.length === 12) {
      return `+${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 9)} ${cleaned.substring(9)}`;
    }
    return phone;
  },
};

export type { WhatsAppConfig, WhatsAppTextMessage, WhatsAppTemplateMessage, WhatsAppMediaMessage };