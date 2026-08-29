'use client';

import { Card } from '@/components/ui';
import { HeroImage } from '@/components/HeroImage';
import { LogoImage } from '@/components/ui/LogoImage';

export default function AboutPage() {
  const skills = [
    {
      category: 'Project Management',
      items: ['Agile/Scrum', 'Risk Management', 'Proposal Writing', 'Stakeholder Communication', 'MS Project', 'Trello', 'Jira']
    },
    {
      category: 'Technical Skills',
      items: ['React', 'Node.js', 'Django', 'PostgreSQL', 'Docker', 'Git/GitHub', 'CI/CD', 'HTML', 'CSS', 'JavaScript (ES6+)', 'Python']
    },
    {
      category: 'Design & Media',
      items: ['Adobe Photoshop', 'Illustrator', 'CorelDRAW', 'Branding', 'Videography', 'Digital Content Creation']
    },
    {
      category: 'IT & Support',
      items: ['Hardware/Software Troubleshooting', 'Network Setup', 'System Maintenance', 'Digital Literacy Training']
    }
  ];

  const education = [
    {
      degree: 'Diploma in Theology',
      school: 'Global Theological Seminary',
      location: 'Jinja, Uganda',
      period: '2022 – 2026',
      status: 'Completed'
    },
    {
      degree: 'Certificate in Software Engineering (JavaScript)',
      school: 'Refactory Academy',
      location: 'Kampala, Uganda',
      period: '2025 – 2026',
      status: 'Completed'
    },
    {
      degree: 'Certificate in Computer Applications User',
      school: 'Purenita Vocational Skills Center',
      location: 'Koboko, Uganda',
      period: '2024',
      status: 'Completed'
    },
    {
      degree: 'Uganda Advanced Certificate of Education (UACE)',
      school: 'Standard High School',
      location: 'Zzana, Kampala, Uganda',
      period: '2019 – 2020',
      status: 'Completed'
    }
  ];

  const experience = [
    {
      title: 'Graphics Designer',
      company: 'Authentic Impressions Graphics Ltd',
      location: 'Uganda',
      period: 'June 2025 – Feb 2026',
      duties: [
        'Designed high-quality branding materials including logos, posters, flyers, banners, and social media content',
        'Developed consistent visual identities for clients across multiple industries',
        'Translated client ideas into professional, market-ready design concepts',
        'Prepared print-ready files and coordinated with printing teams for production accuracy',
        'Improved brand engagement through creative and modern design solutions'
      ]
    },
    {
      title: 'IT Officer & Computer Literacy Facilitator',
      company: 'Agape Heart International Organization',
      location: 'Uganda',
      period: 'March 2022 – October 2024',
      duties: [
        'Provided technical support for hardware, software, and network systems within the organization',
        'Installed and configured operating systems, applications, and office productivity tools',
        'Conducted computer literacy training sessions for youth and community members',
        'Developed beginner-friendly ICT training materials and guides',
        'Supported digital inclusion initiatives for refugees and host communities',
        'Maintained IT equipment and ensured system uptime and reliability'
      ]
    },
    {
      title: 'Project Officer',
      company: 'Agape Heart International Organization',
      location: 'Uganda',
      period: 'April 2022 – December 2023',
      duties: [
        'Coordinated project planning, implementation, and monitoring for community ICT initiatives',
        'Supported proposal writing and documentation for new projects',
        'Conducted regular field visits, ensuring smooth implementation and timely reporting',
        'Delivered ICT training workshops, building digital literacy among refugees and host communities',
        'Provided IT support, troubleshooting hardware/software issues, and maintaining system uptime'
      ]
    }
  ];

  const languages = [
    { language: 'English', level: 'Fluent' },
    { language: 'Arabic', level: 'Conversational' },
    { language: 'Italian', level: 'Basic' },
    { language: 'French', level: 'Basic' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <HeroImage
            src="/images/professional/ABOUT PAGE HERO IMAGE.png"
            alt="Charles Jada Sebit Emmanuel - About"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#0B132B]/70 to-[#0B132B]/90"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <LogoImage
              src="/images/logos/code-design-logo.jpg"
              alt="Charles Jada Sebit Emmanuel"
              className="w-40 h-40 rounded-full mx-auto mb-6 shadow-lg border-4 border-[#D4AF37]"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Charles Jada Sebit Emmanuel
            </h1>
            <p className="text-xl text-[#D4AF37] font-semibold mb-2">
              TC #333373
            </p>
            <p className="text-lg text-gray-200 mb-6">
              Software Engineer | Full-Stack Developer | IT Support Specialist | Graphics Designer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/downloads/Charles-Jasema-CV.txt"
                download="Charles-Jasema-CV.txt"
                className="px-8 py-3 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-lg font-semibold transition-colors duration-200"
              >
                Download CV
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border-2 border-[#800000] text-[#D4AF37] hover:bg-[#800000] hover:text-white rounded-lg font-semibold transition-colors duration-200"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Name Identity & Biography Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B132B]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">
              Who I Am — The Story Behind My Names
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Name Identity Content */}
            <div className="text-white">
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-6">Name Identity</h3>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  <strong className="text-[#D4AF37]">Charles Jada Sebit Emmanuel</strong> is my official name, 
                  reflecting my complete identity and heritage.
                </p>
                <p>
                  <strong className="text-[#D4AF37]">Charles Jasema</strong> is my artistic name, thoughtfully 
                  derived from my official names: <span className="text-[#D4AF37]">JA</span> from Jada, 
                  <span className="text-[#D4AF37]"> SE</span> from Sebit, and 
                  <span className="text-[#D4AF37]"> MA</span> from Emmanuel.
                </p>
                <p>
                  Musically, I use <strong className="text-[#D4AF37]">Charles Jasema</strong>, 
                  as it represents my full identity while being more accessible for artistic expression 
                  and community connection.
                </p>
              </div>

              {/* Biography Subsection */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-6">Biography</h3>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Born on <strong className="text-[#D4AF37]">March 30, 1998</strong> in 
                    <strong className="text-[#D4AF37]"> Mundu, Kupera, Central Equatoria State, South Sudan</strong>.
                  </p>
                  <p>
                    My mother, <strong className="text-[#D4AF37]">Mary Poni</strong>, is from 
                    <strong className="text-[#D4AF37]"> Sindiru, Lo'bonok, Bari, South Sudan</strong>. 
                    My father hails from <strong className="text-[#D4AF37]">Mitika, Mundu, Kupera, South Sudan</strong>.
                  </p>
                  <p>
                    I lived in <strong className="text-[#D4AF37]">Juba</strong> and 
                    <strong className="text-[#D4AF37]"> Yei</strong> until 2016, experiencing the rich cultural 
                    heritage of South Sudan during my formative years.
                  </p>
                  <p>
                    On <strong className="text-[#D4AF37]">October 9, 2016</strong>, during the civil war, 
                    I resettled in <strong className="text-[#D4AF37]">Zone 3, Bidibidi Refugee Settlement, 
                    Yumbe District – Uganda</strong>. This transition marked a pivotal moment that shaped 
                    my commitment to community empowerment and technological inclusion.
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Photo */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <HeroImage
                  src="/images/ministry/charles-jasema-ministry-photo.jpg"
                  alt="Charles Jada Sebit Emmanuel - Personal Portrait"
                  className="w-full h-auto rounded-2xl shadow-2xl border-4 border-[#D4AF37]"
                />
                {/* Birth Info Badge */}
                <div className="absolute -top-6 -right-6 bg-[#800000] text-white px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#D4AF37]">Born</div>
                    <div className="text-xs text-white">March 30, 1998</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Professional Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillCategory, index) => (
              <Card key={index}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {skillCategory.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-sm bg-primary-gold bg-opacity-10 text-primary-gold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-primary-gold font-medium">
                      {edu.school}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.location}
                    </p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {edu.period}
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      edu.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {edu.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <Card key={index}>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-primary-gold font-medium">
                    {job.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {job.location} • {job.period}
                  </p>
                </div>
                <ul className="space-y-2">
                  {job.duties.map((duty, dutyIndex) => (
                    <li key={dutyIndex} className="flex items-start text-gray-600 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 bg-primary-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {duty}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Languages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((lang, index) => (
              <Card key={index} className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {lang.language}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {lang.level}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Interests
          </h2>
          <Card>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-primary-gold bg-opacity-10 text-primary-gold rounded-full">
                Gospel Music & Worship Leadership
              </span>
              <span className="px-4 py-2 bg-primary-gold bg-opacity-10 text-primary-gold rounded-full">
                Videography & Storytelling
              </span>
              <span className="px-4 py-2 bg-primary-gold bg-opacity-10 text-primary-gold rounded-full">
                Community ICT Empowerment
              </span>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}