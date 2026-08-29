import Link from 'next/link';
import { EnhancedButton, Card } from '@/components/ui';
import { HeroImage } from '@/components/HeroImage';
import { FaCode, FaPalette, FaMusic, FaArrowRight, FaTools } from 'react-icons/fa';

export const revalidate = 60;

export default function HomePage() {
  const personalInfo = {
    name: 'Charles Jada Sebit Emmanuel',
    title: 'Software Engineer | Full‑Stack Developer | IT Support Specialist | Graphics Designer',
    shortBio: 'Purpose‑driven professional with 4+ years of experience in project coordination, IT support, and technical solution delivery.',
    tc: '#333373'
  };

  return (
    <div className="min-h-screen">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background with Gradient Overlay */}
        <div className="absolute inset-0">
          <HeroImage
            src="/images/professional/Home Page HERO Image.png"
            alt="Charles Jasema Professional Work Environment"
            fallbackSrc="/images/banners/Brand Landscape.png"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-white">Hi, I'm </span>
                <span className="text-[#D4AF37] block lg:inline">
                  Charles Jada Sebit Emmanuel
                </span>
              </h1>
              
              <p className="text-xl text-[#D4AF37] font-semibold mb-2">
                TC {personalInfo.tc}
              </p>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-medium mb-6 leading-relaxed">
                {personalInfo.title}
              </h2>
              
              <p className="text-lg text-gray-200 mb-8 max-w-2xl leading-relaxed">
                {personalInfo.shortBio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/portfolio">
                  <EnhancedButton 
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    View My Work <FaArrowRight />
                  </EnhancedButton>
                </Link>
                <Link href="/contact">
                  <EnhancedButton 
                    className="border-2 border-[#800000] text-[#D4AF37] hover:bg-[#800000] hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto"
                  >
                    Get In Touch
                  </EnhancedButton>
                </Link>
              </div>

              {/* Professional Services Icons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
                  <FaCode className="text-[#D4AF37] text-xl" />
                  <span className="text-white font-medium">Software Engineering</span>
                </div>
                <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
                  <FaPalette className="text-[#D4AF37] text-xl" />
                  <span className="text-white font-medium">Graphics Design</span>
                </div>
                <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
                  <FaTools className="text-[#D4AF37] text-xl" />
                  <span className="text-white font-medium">IT Support</span>
                </div>
                <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
                  <FaMusic className="text-[#D4AF37] text-xl" />
                  <span className="text-white font-medium">Gospel Music</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B132B] mb-4">
              What I Do
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Bridging technology and creativity to deliver exceptional results across multiple domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Software Engineering */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D4AF37] bg-white p-8">
              <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCode className="text-[#D4AF37] text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-[#0B132B] mb-4">
                Software Engineering
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Building scalable web applications with React, Node.js, PostgreSQL, Docker, and modern CI/CD practices
              </p>
            </Card>

            {/* Graphics Design */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D4AF37] bg-white p-8">
              <div className="w-20 h-20 bg-[#800000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPalette className="text-[#800000] text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-[#0B132B] mb-4">
                Graphics Design
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Creating stunning visual identities, branding materials, and professional design solutions using Adobe Creative Suite
              </p>
            </Card>

            {/* IT Support */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D4AF37] bg-white p-8">
              <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTools className="text-[#D4AF37] text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-[#0B132B] mb-4">
                IT Support
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Providing technical support, system maintenance, and digital literacy training for organizations and communities
              </p>
            </Card>

            {/* Gospel Music */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D4AF37] bg-white p-8">
              <div className="w-20 h-20 bg-[#800000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMusic className="text-[#800000] text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-[#0B132B] mb-4">
                Gospel Music
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Contemporary worship leader and gospel artist spreading hope through music and community outreach
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Whether you need a developer for your project, a designer for your brand, or IT support for your organization, 
            I'm here to help bring your vision to life with professional excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <EnhancedButton className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                Get In Touch
              </EnhancedButton>
            </Link>
            <Link href="/portfolio">
              <EnhancedButton className="border-2 border-[#800000] text-[#D4AF37] hover:bg-[#800000] hover:text-white px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                View Portfolio
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}