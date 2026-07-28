/**
 * AI Chat System Integration
 * 
 * Provides intelligent chat responses using OpenAI GPT or Anthropic Claude
 * with context about Charles Jasema's portfolio and music ministry
 */

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
  tokensUsed?: number;
  model?: string;
}

interface ChatContext {
  userQuery: string;
  conversationHistory: AIMessage[];
  userInfo?: {
    name?: string;
    email?: string;
    interestedIn?: 'portfolio' | 'music' | 'general';
  };
}

class AIChatSystem {
  private openaiApiKey: string;
  private anthropicApiKey: string;
  private defaultModel: string;
  private maxTokens: number = 1000;
  private temperature: number = 0.7;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY || '';
    this.defaultModel = process.env.AI_CHAT_MODEL || 'gpt-4o-mini';
  }

  /**
   * Check if AI services are configured
   */
  public isConfigured(): boolean {
    return !!(this.openaiApiKey || this.anthropicApiKey);
  }

  /**
   * Get system prompt with Charles Jasema's context
   */
  private getSystemPrompt(): string {
    return `You are Charles Jasema's AI assistant, helping visitors learn about his work and services. Be friendly, professional, and helpful.

**About Charles Jasema:**
Charles is a multi-talented professional with expertise in:

**Professional Works:**
• Software Engineer: Full-stack web development, mobile apps, system architecture
• Graphics Designer: Brand identity, logos, marketing materials, digital design
• Videographer: Professional video production, editing, content creation
• IT Support: Technical consulting, system administration, troubleshooting

**Music Ministry:**
• Gospel Artist: Original songs, worship music, contemporary Christian music
• Worship Leader: Leading congregational worship, live performances
• Music Producer: Recording, mixing, arrangement of gospel music
• Ministry Services: Church events, conferences, worship nights, concerts

**Key Information:**
- Location: Uganda, East Africa
- Languages: English, Luganda
- Contact: +256 785 446 877 (WhatsApp Business)
- Email: brocharles001@gmail.com
- Website: https://charlesjasema.com

**Service Areas:**
- Web Development (React, Next.js, Node.js, databases)
- Mobile App Development (React Native, Flutter)
- Brand Design & Identity
- Video Production & Editing
- Music Ministry & Worship Leading
- IT Consulting & Support

**Response Guidelines:**
1. Be conversational and warm, reflecting Charles's approachable personality
2. Provide specific information when asked about services
3. Encourage visitors to contact Charles for detailed discussions
4. Mention relevant portfolio examples when discussing capabilities
5. For music ministry inquiries, emphasize the spiritual aspect and ministry heart
6. Always offer to connect them directly via WhatsApp or email
7. Keep responses concise but informative
8. If asked about pricing, suggest contacting Charles for custom quotes

**Sample Projects to Reference:**
- Church Management System (web application)
- CAM Connect App (mobile application)  
- KGL Screenshot (graphics design work)
- Various worship songs and ministry recordings

Remember: You're representing Charles professionally while maintaining his friendly, ministry-minded character.`;
  }

  /**
   * Generate AI response using OpenAI GPT
   */
  private async generateOpenAIResponse(context: ChatContext): Promise<ChatResponse> {
    try {
      if (!this.openaiApiKey) {
        return { success: false, error: 'OpenAI API key not configured' };
      }

      const messages: AIMessage[] = [
        { role: 'system', content: this.getSystemPrompt() },
        ...context.conversationHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: context.userQuery }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.defaultModel.includes('gpt') ? this.defaultModel : 'gpt-4o-mini',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          max_tokens: this.maxTokens,
          temperature: this.temperature,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { 
          success: false, 
          error: error.error?.message || 'OpenAI API request failed' 
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        message: data.choices[0]?.message?.content || 'No response generated',
        tokensUsed: data.usage?.total_tokens || 0,
        model: data.model || this.defaultModel,
      };

    } catch (error) {
      console.error('OpenAI API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown OpenAI error',
      };
    }
  }

  /**
   * Generate AI response using Anthropic Claude
   */
  private async generateAnthropicResponse(context: ChatContext): Promise<ChatResponse> {
    try {
      if (!this.anthropicApiKey) {
        return { success: false, error: 'Anthropic API key not configured' };
      }

      // Convert messages to Anthropic format
      const messages = context.conversationHistory
        .slice(-10)
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }));

      // Add current user query
      messages.push({
        role: 'user',
        content: context.userQuery
      });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.anthropicApiKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.defaultModel.includes('claude') ? this.defaultModel : 'claude-3-haiku-20240307',
          max_tokens: this.maxTokens,
          temperature: this.temperature,
          system: this.getSystemPrompt(),
          messages: messages,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { 
          success: false, 
          error: error.error?.message || 'Anthropic API request failed' 
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        message: data.content[0]?.text || 'No response generated',
        tokensUsed: data.usage?.input_tokens + data.usage?.output_tokens || 0,
        model: data.model || 'claude-3-haiku',
      };

    } catch (error) {
      console.error('Anthropic API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown Anthropic error',
      };
    }
  }

  /**
   * Generate AI chat response using available provider
   */
  public async generateResponse(context: ChatContext): Promise<ChatResponse> {
    // Validate input
    if (!context.userQuery?.trim()) {
      return { success: false, error: 'Empty user query' };
    }

    // Try OpenAI first if configured
    if (this.openaiApiKey && (this.defaultModel.includes('gpt') || !this.anthropicApiKey)) {
      const response = await this.generateOpenAIResponse(context);
      if (response.success) return response;
    }

    // Fallback to Anthropic if OpenAI fails or not configured
    if (this.anthropicApiKey) {
      return await this.generateAnthropicResponse(context);
    }

    return { success: false, error: 'No AI providers configured' };
  }

  /**
   * Generate quick response suggestions based on user intent
   */
  public generateQuickReplies(userQuery: string): string[] {
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('portfolio') || lowerQuery.includes('work') || lowerQuery.includes('project')) {
      return [
        "Tell me about web development services",
        "Show me graphics design examples",
        "What's your experience in software engineering?",
        "How can I hire Charles for a project?"
      ];
    }
    
    if (lowerQuery.includes('music') || lowerQuery.includes('worship') || lowerQuery.includes('ministry')) {
      return [
        "Book Charles for worship leading",
        "Listen to his music",
        "Music ministry services",
        "Church event booking"
      ];
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('hire') || lowerQuery.includes('book')) {
      return [
        "Get contact information",
        "Schedule a consultation",
        "Request a quote",
        "Connect on WhatsApp"
      ];
    }
    
    // Default quick replies
    return [
      "Tell me about Charles's services",
      "Show me his portfolio",
      "Music ministry information",
      "How to get in touch"
    ];
  }

  /**
   * Detect user intent from query
   */
  public detectIntent(userQuery: string): {
    primary: 'portfolio' | 'music' | 'contact' | 'general';
    confidence: number;
    keywords: string[];
  } {
    const lowerQuery = userQuery.toLowerCase();
    const words = lowerQuery.split(/\s+/);
    
    const portfolioKeywords = ['portfolio', 'web', 'development', 'design', 'graphics', 'software', 'programming', 'website', 'app', 'project', 'work', 'experience', 'skills'];
    const musicKeywords = ['music', 'worship', 'ministry', 'gospel', 'song', 'church', 'praise', 'booking', 'performance', 'concert'];
    const contactKeywords = ['contact', 'hire', 'book', 'email', 'phone', 'whatsapp', 'quote', 'price', 'cost', 'consultation'];
    
    const portfolioMatches = portfolioKeywords.filter(keyword => words.some(word => word.includes(keyword)));
    const musicMatches = musicKeywords.filter(keyword => words.some(word => word.includes(keyword)));
    const contactMatches = contactKeywords.filter(keyword => words.some(word => word.includes(keyword)));
    
    const portfolioScore = portfolioMatches.length;
    const musicScore = musicMatches.length;
    const contactScore = contactMatches.length;
    
    const maxScore = Math.max(portfolioScore, musicScore, contactScore);
    
    if (maxScore === 0) {
      return { primary: 'general', confidence: 0.5, keywords: [] };
    }
    
    const confidence = maxScore / words.length;
    
    if (portfolioScore === maxScore) {
      return { primary: 'portfolio', confidence, keywords: portfolioMatches };
    } else if (musicScore === maxScore) {
      return { primary: 'music', confidence, keywords: musicMatches };
    } else {
      return { primary: 'contact', confidence, keywords: contactMatches };
    }
  }

  /**
   * Get predefined responses for common questions
   */
  public static getPredefinedResponses(): Record<string, string> {
    return {
      greeting: "Hello! I'm Charles Jasema's AI assistant. I'm here to help you learn about his professional services and music ministry. What would you like to know?",
      
      portfolio_overview: "Charles is a skilled software engineer and designer with expertise in web development, mobile apps, graphics design, and videography. He's worked on various projects including church management systems, mobile applications, and brand identity designs. Would you like details about any specific service?",
      
      music_overview: "Charles is a passionate gospel artist and worship leader with a heart for ministry. He offers worship leading services, performs original gospel music, and is available for church events, conferences, and worship nights. His music combines contemporary sounds with powerful spiritual messages.",
      
      services_list: `Charles offers these professional services:

**Software Development:**
• Web applications (React, Next.js, Node.js)
• Mobile apps (React Native, Flutter)
• Database design and management
• System architecture and consulting

**Creative Services:**
• Graphics design and branding
• Logo design and brand identity
• Marketing materials and digital design
• Video production and editing

**Music Ministry:**
• Worship leading for churches and events
• Gospel music performances
• Music production and recording
• Ministry consultations

Would you like more details about any of these services?`,
      
      contact_info: `You can reach Charles Jasema through:

📱 **WhatsApp Business:** +256 785 446 877
📧 **Email:** brocharles001@gmail.com
🌐 **Website:** https://charlesjasema.com

**Business Hours:**
• Monday-Friday: 9:00 AM - 6:00 PM
• Saturday: 10:00 AM - 4:00 PM  
• Sunday: Available for Ministry
• Timezone: EAT (UTC+3)

I'd recommend contacting him via WhatsApp for the fastest response!`,
      
      pricing_inquiry: "Charles provides custom quotes based on project requirements, scope, and timeline. Each project is unique, so he prefers to discuss your specific needs to give you accurate pricing. Please contact him directly at +256 785 446 877 (WhatsApp) or brocharles001@gmail.com to discuss your project and get a detailed quote.",
      
      availability: "Charles is currently accepting new projects and ministry bookings. His availability depends on the project scope and timeline. For urgent requests or ministry bookings, I recommend reaching out via WhatsApp at +256 785 446 877 for the quickest response about his current availability.",
    };
  }
}

// Export singleton instance
export const aiChatSystem = new AIChatSystem();

// Export types and utility functions
export type { AIMessage, ChatResponse, ChatContext };
export { AIChatSystem };