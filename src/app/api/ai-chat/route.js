import { NextResponse } from 'next/server';

// AI Chat responses about Charles Jasema - Updated for intelligent responses
const aiKnowledgeBase = {
  personal: {
    name: "Charles Jada Sebit Emmanuel (Charles Jasema)",
    profession: "Software Engineer, Graphics Designer, and Contemporary Gospel Artist",
    location: "South Sudan / Uganda",
    contact: {
      email: "brocharles001@gmail.com",
      phone: "+211 927 889594",
      whatsapp: "https://wa.me/256785446877"
    }
  },
  skills: {
    software: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Python", "Java"],
    design: ["UI/UX Design", "Graphics Design", "Adobe Creative Suite", "Figma"],
    music: ["Contemporary Gospel", "Worship Leading", "Music Production", "Live Performance"]
  },
  projects: [
    {
      name: "Karibu Groceries E-commerce System",
      description: "Scalable inventory and sales management system with role-based access control",
      tech: ["React", "Node.js", "PostgreSQL", "Docker"]
    },
    {
      name: "CAM Connect Mobile App",
      description: "Comprehensive platform connecting Cameroonians worldwide",
      tech: ["React Native", "Firebase", "Real-time Chat"]
    }
  ],
  ministry: {
    experience: "6+ years in worship leading and gospel ministry",
    music_style: "Contemporary Gospel",
    platform: "Various churches and events"
  }
};

function generateAIResponse(message, conversationContext = [], hasGreeted = false) {
  const lowerMessage = message.toLowerCase().trim();
  
  // Greeting responses
  if (lowerMessage.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)$/i)) {
    return `Hello there! 👋 I'm Charles Jasema's AI assistant. I'm here to help you learn about Charles - his work as a software engineer, graphics designer, and contemporary gospel artist. Feel free to ask me anything about his skills, projects, music, or how to get in touch with him!`;
  }
  
  // Contact information - Multiple variations
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch') || 
      lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call') ||
      lowerMessage.includes('hire') || lowerMessage.includes('work with') || lowerMessage.includes('collaborate')) {
    return `Great! Here's how you can contact Charles Jasema:

📧 **Email:** brocharles001@gmail.com
📞 **Phone (South Sudan):** +211 927 889594  
📞 **Phone (Uganda):** +256 785 446 877
💬 **WhatsApp:** +256 785 446 877

You can also use the contact form on this website. Charles is available for software development projects, graphics design work, and music ministry bookings. He typically responds within 24 hours!`;
  }
  
  // Music and ministry - Enhanced responses
  if (lowerMessage.includes('music') || lowerMessage.includes('song') || lowerMessage.includes('gospel') || 
      lowerMessage.includes('ministry') || lowerMessage.includes('worship') || lowerMessage.includes('perform') ||
      lowerMessage.includes('listen') || lowerMessage.includes('streaming') || lowerMessage.includes('album')) {
    return `🎵 Charles is passionate about Contemporary Gospel music! Here's what you should know:

**🎤 Music Career:**
• 6+ years of worship leading and gospel ministry
• Contemporary Gospel style with modern arrangements
• Performs at churches, conferences, and special events

**🎧 Where to Find His Music:**
• Mdundo: https://mdundo.com/song/1377029
• YouTube Music: Search "Charles Jasema Music"  
• Facebook: Charles Jasema Music Page
• Instagram & TikTok: @charlesjasemamusic

**📅 Bookings Available For:**
• Church services and conferences
• Worship nights and special events  
• Studio recordings and collaborations
• Music ministry consulting

Would you like me to help you book Charles for an event?`;
  }
  
  // Skills and technical expertise
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('programming') ||
      lowerMessage.includes('develop') || lowerMessage.includes('code') || lowerMessage.includes('software') ||
      lowerMessage.includes('what can he do') || lowerMessage.includes('expertise') || lowerMessage.includes('experience')) {
    return `💻 Charles is a highly skilled professional with expertise across multiple domains:

**🔧 Software Development:**
• Frontend: React, Next.js, TypeScript, HTML5, CSS3
• Backend: Node.js, Python, Java, PostgreSQL
• Mobile: React Native, Flutter
• DevOps: Docker, Git, CI/CD pipelines

**🎨 Graphics Design:**
• UI/UX Design & Prototyping
• Adobe Creative Suite (Photoshop, Illustrator, InDesign)
• Figma, Sketch, and modern design tools
• Brand identity and visual communication

**🎵 Music & Ministry:**
• Contemporary Gospel composition and arrangement
• Worship leading and live performance
• Music production and audio engineering
• Event planning and ministry coordination

Charles combines technical expertise with creative flair to deliver exceptional results!`;
  }
  
  // Projects and portfolio
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work') ||
      lowerMessage.includes('example') || lowerMessage.includes('built') || lowerMessage.includes('created') ||
      lowerMessage.includes('app') || lowerMessage.includes('website') || lowerMessage.includes('system')) {
    return `🚀 Charles has worked on several impressive projects! Here are some highlights:

**🛒 Karibu Groceries E-commerce System**
• Comprehensive inventory and sales management platform
• Built with React, Node.js, and PostgreSQL
• Features role-based access control and real-time analytics
• Scalable architecture supporting multiple locations

**📱 CAM Connect Mobile App**  
• Social networking platform for Cameroonians worldwide
• React Native with Firebase backend
• Real-time messaging and community features
• Cross-platform iOS and Android support

**🎵 Music Ministry Platform**
• Digital presence across multiple streaming platforms
• Professional music production and distribution
• Live event coordination and booking system

**🌐 This Portfolio Website**
• Modern Next.js application with AI chat integration
• Responsive design and SEO optimization
• Google Analytics and performance monitoring

Want to see more details about any specific project?`;
  }
  
  // Services offered
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('help') ||
      lowerMessage.includes('available') || lowerMessage.includes('can you') || lowerMessage.includes('do you') ||
      lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
    return `✨ Charles offers comprehensive professional services:

**💻 Software Development Services:**
• Custom web application development
• Mobile app development (iOS & Android)
• E-commerce platform creation
• Database design and optimization
• API development and integration

**🎨 Graphics Design Services:**
• Brand identity and logo design
• UI/UX design and prototyping  
• Marketing materials and social media graphics
• Print design and digital artwork
• Website design and visual content

**🎵 Music Ministry Services:**
• Worship leading for churches and events
• Contemporary gospel music performance
• Music production and recording
• Event planning and coordination
• Ministry consulting and training

**💰 Investment:** Charles offers competitive rates and flexible payment options. Contact him for a custom quote based on your project requirements!`;
  }
  
  // About Charles - Personal information
  if (lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('charles') ||
      lowerMessage.includes('tell me') || lowerMessage.includes('background') || lowerMessage.includes('story')) {
    return `👨‍💻 Meet Charles Jada Sebit Emmanuel (Charles Jasema)!

**🌍 Background:**
Charles is a versatile professional from South Sudan, currently based between South Sudan and Uganda. He's built a remarkable career spanning technology, design, and music ministry.

**💼 Professional Journey:**
• Software Engineer specializing in modern web technologies
• Creative Graphics Designer with an eye for compelling visuals  
• Contemporary Gospel Artist with 6+ years in ministry
• Entrepreneur and project management expert

**🎯 Mission:**
Charles is passionate about using technology to solve real-world problems while spreading hope and inspiration through music. He believes in creating digital solutions that make a positive impact on communities.

**🌟 What Sets Him Apart:**
• Unique combination of technical skills and creative artistry
• Strong commitment to quality and client satisfaction
• Deep understanding of both African and international markets
• Bilingual communication (English and Arabic)

Charles is always excited to take on new challenges and collaborate with forward-thinking individuals and organizations!`;
  }
  
  // Location and availability
  if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('based') ||
      lowerMessage.includes('available') || lowerMessage.includes('remote') || lowerMessage.includes('travel')) {
    return `📍 **Charles's Location & Availability:**

**🏠 Based In:** South Sudan / Uganda (East Africa)
**🌐 Work Style:** Remote-first with flexible arrangements
**🕐 Time Zone:** EAT (UTC+3)
**✈️ Travel:** Available for on-site projects and events

**💼 Availability:**
• Remote software development projects worldwide
• Local and regional graphics design services  
• Music ministry events across East Africa
• Virtual consultations and meetings via video call

**🌍 International Clients Welcome:**
Charles has experience working with clients from different time zones and cultures. He's fluent in English and can adapt to various working styles and communication preferences.

Ready to start your project? Let's discuss how Charles can help bring your vision to life!`;
  }
  
  // Thank you and appreciation
  if (lowerMessage.includes('thank') || lowerMessage.includes('appreciate') || lowerMessage.includes('great') ||
      lowerMessage.includes('awesome') || lowerMessage.includes('helpful') || lowerMessage.includes('good job')) {
    return `🙏 You're very welcome! I'm glad I could help you learn more about Charles Jasema. 

Charles truly appreciates your interest in his work! Whether you're looking for software development, graphics design, or music ministry services, he's always excited to connect with new people and explore potential collaborations.

Is there anything else you'd like to know about Charles's work or services? I'm here to help! 😊`;
  }
  
  // Goodbye and closing
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you') ||
      lowerMessage.includes('talk later') || lowerMessage.includes('thanks') || lowerMessage.includes('that\'s all')) {
    return `👋 It was great chatting with you! Thank you for your interest in Charles Jasema's work.

Don't forget to:
📧 Reach out to Charles at brocharles001@gmail.com
🌐 Explore more of his work on this website
🎵 Check out his music on various streaming platforms
📱 Connect with him on social media

Have a wonderful day, and feel free to come back anytime if you have more questions! 🌟`;
  }
  
  // Default response for unmatched queries - More conversational
  return `That's an interesting question! 🤔 I'd love to help you learn more about Charles Jasema. 

Here are some things I can tell you about:
• 👨‍💻 **His technical skills** and software development expertise
• 🎨 **Graphics design** capabilities and creative work
• 🎵 **Music ministry** and contemporary gospel career  
• 📞 **Contact information** and how to reach him
• 🚀 **Recent projects** and portfolio highlights
• 💼 **Services offered** and collaboration opportunities

What would you like to know more about? Feel free to ask me anything - I'm here to help! 😊`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, conversation = [] } = body;
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Check conversation context for more intelligent responses
    const conversationContext = conversation.slice(-3); // Last 3 messages for context
    const hasGreeted = conversationContext.some(msg => 
      msg.role === 'assistant' && msg.content.includes("I'm Charles Jasema's AI assistant")
    );
    
    // Generate AI response based on the message and context
    let aiResponse = generateAIResponse(message.trim(), conversationContext, hasGreeted);
    
    // Add conversational elements for follow-up questions
    const lowerMessage = message.toLowerCase().trim();
    if (lowerMessage.length < 10 && !lowerMessage.match(/^(hi|hello|hey|yes|no|ok|thanks)$/i)) {
      aiResponse += `\n\nFeel free to ask me more specific questions about Charles's work! 😊`;
    }
    
    const response = {
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString(),
      type: 'ai-assistant'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { success: false, error: 'I apologize, but I\'m experiencing technical difficulties right now. Please try again in a moment, or contact Charles directly at brocharles001@gmail.com.' },
      { status: 500 }
    );
  }
}