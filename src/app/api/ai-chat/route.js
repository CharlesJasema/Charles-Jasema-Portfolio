import { NextResponse } from 'next/server';

// AI Chat responses about Charles Jasema
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

function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm Charles Jasema's AI assistant. I can help you learn about Charles - his work as a software engineer, graphics designer, and gospel artist. What would you like to know?`;
  }
  
  // About Charles
  if (lowerMessage.includes('who') && (lowerMessage.includes('charles') || lowerMessage.includes('you'))) {
    return `Charles Jada Sebit Emmanuel, known as Charles Jasema, is a versatile professional from South Sudan. He's a Software Engineer specializing in React and Next.js, a Graphics Designer, and a Contemporary Gospel Artist with 6+ years in ministry. You can reach him at brocharles001@gmail.com or +211 927 889594.`;
  }
  
  // Skills and expertise
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('programming')) {
    return `Charles is skilled in: 
    💻 Software: React, Next.js, Node.js, TypeScript, PostgreSQL, Docker, Python, Java
    🎨 Design: UI/UX Design, Graphics Design, Adobe Creative Suite, Figma  
    🎵 Music: Contemporary Gospel, Worship Leading, Music Production, Live Performance`;
  }
  
  // Projects
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
    return `Charles has worked on several notable projects including:
    
    🛒 Karibu Groceries E-commerce System - A scalable inventory and sales management platform
    📱 CAM Connect Mobile App - Connecting Cameroonians worldwide
    🎵 Multiple gospel music releases available on various platforms
    
    You can explore more projects on his portfolio section!`;
  }
  
  // Contact information
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
    return `You can contact Charles Jasema:
    📧 Email: brocharles001@gmail.com
    📞 Phone: +211 927 889594  
    💬 WhatsApp: Available through the contact form
    💼 LinkedIn: Check the professional links section
    
    He's available for software development projects, design work, and music ministry!`;
  }
  
  // Music and ministry
  if (lowerMessage.includes('music') || lowerMessage.includes('gospel') || lowerMessage.includes('ministry') || lowerMessage.includes('worship')) {
    return `Charles is passionate about Contemporary Gospel music and has 6+ years of experience in worship leading and ministry. He performs at various churches and events, and his music is available on platforms like Mdundo, YouTube, and other streaming services. Check out the Music section to hear his work!`;
  }
  
  // Services
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('help')) {
    return `Charles offers:
    💻 Software Development - Web applications, mobile apps, full-stack solutions
    🎨 Graphics Design - UI/UX design, branding, visual content
    🎵 Music Ministry - Worship leading, live performances, music production
    
    Interested in working together? Contact him through the form below!`;
  }
  
  // Default response
  return `Thank you for your message! I can help you learn about Charles Jasema's work in software engineering, graphics design, and gospel music ministry. 

You can ask me about:
• His skills and experience
• Recent projects and portfolio  
• Music and ministry work
• Contact information
• Available services

What would you like to know?`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Generate AI response based on the message
    const aiResponse = generateAIResponse(message.trim());
    
    const response = {
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
      type: 'ai-assistant'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { success: false, error: 'Chat service temporarily unavailable' },
      { status: 500 }
    );
  }
}