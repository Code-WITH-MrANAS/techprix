import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Code2, Megaphone, Palette, LineChart, Smartphone, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const servicesData = {
  'web-development': {
    icon: Code2,
    title: 'Web Development',
    tag: 'Development',
    color: '#6366F1',
    lightBg: 'from-indigo-50 to-violet-50',
    darkBg: 'from-[#14142e] to-[#1a1640]',
    intro: 'Custom, high-performance websites & applications built with cutting-edge technologies. We create pixel-perfect, blazing-fast digital experiences that convert.',
    overview: 'Web development isn\'t just about building websites—it\'s about engineering digital solutions that work seamlessly across all devices and deliver results for your business.',
    highlights: [
      'Custom React & Next.js applications',
      'Full-stack development (frontend + backend)',
      'Database design & optimization',
      'API development & integration',
      'Responsive mobile-first design',
      'Performance optimization & SEO',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
    process: [
      {
        step: '01',
        title: 'Discovery & Strategy',
        desc: 'We understand your goals, audience, and competition to build a technical strategy that wins.',
      },
      {
        step: '02',
        title: 'Design & Prototyping',
        desc: 'High-fidelity designs and interactive prototypes to visualize the final product before development.',
      },
      {
        step: '03',
        title: 'Development & Testing',
        desc: 'Agile development with continuous testing ensures quality code and faster time-to-market.',
      },
      {
        step: '04',
        title: 'Launch & Optimization',
        desc: 'Smooth deployment, monitoring, and optimization to ensure peak performance post-launch.',
      },
    ],
    caseStudies: [
      { title: 'E-commerce Platform', desc: 'Built a scalable marketplace handling 100K+ daily visitors' },
      { title: 'SaaS Dashboard', desc: 'Real-time analytics platform with 50+ API integrations' },
      { title: 'Content Platform', desc: 'Headless CMS with custom admin interface and live collaboration' },
    ],
  },
  'mobile-apps': {
    icon: Smartphone,
    title: 'Mobile Apps',
    tag: 'Mobile',
    color: '#38BDF8',
    lightBg: 'from-sky-50 to-cyan-50',
    darkBg: 'from-[#0e1a2e] to-[#0f1f35]',
    intro: 'Cross-platform mobile experiences that feel native on both iOS and Android. Built with React Native and Expo for maximum efficiency.',
    overview: 'Mobile apps that users love to use. We build cross-platform applications with native-like performance that reach both iOS and Android users from a single codebase.',
    highlights: [
      'React Native & Expo development',
      'iOS & Android optimization',
      'Native modules integration',
      'Offline-first architecture',
      'Real-time synchronization',
      'App store deployment & optimization',
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase', 'Stripe Integration', 'Push Notifications'],
    process: [
      {
        step: '01',
        title: 'App Strategy',
        desc: 'Define user flows, features, and success metrics for maximum user engagement.',
      },
      {
        step: '02',
        title: 'UI/UX Design',
        desc: 'Native-feeling interfaces designed for touch, gestures, and mobile workflows.',
      },
      {
        step: '03',
        title: 'Cross-Platform Dev',
        desc: 'Shared codebase for iOS & Android with platform-specific optimizations.',
      },
      {
        step: '04',
        title: 'Store Launch',
        desc: 'App Store & Play Store submission with marketing strategy for visibility.',
      },
    ],
    caseStudies: [
      { title: 'Fitness Tracking App', desc: 'Health monitoring app with 50K+ downloads' },
      { title: 'Delivery Platform', desc: 'Real-time location tracking for 500+ merchants' },
      { title: 'Social Network', desc: 'Messaging app with 100K+ monthly active users' },
    ],
  },
  'digital-marketing': {
    icon: Megaphone,
    title: 'Digital Marketing',
    tag: 'Marketing',
    color: '#A78BFA',
    lightBg: 'from-violet-50 to-purple-50',
    darkBg: 'from-[#1a142e] to-[#1e1540]',
    intro: 'Data-driven marketing strategies across PPC, social media, and content that maximize your ROI and accelerate growth.',
    overview: 'Modern marketing requires more than ads—it requires a strategy. We combine data analysis, creative storytelling, and technical optimization to deliver measurable results.',
    highlights: [
      'PPC campaigns (Google, Facebook, LinkedIn)',
      'Social media marketing & management',
      'Content strategy & creation',
      'Email marketing automation',
      'Analytics & conversion tracking',
      'A/B testing & optimization',
    ],
    technologies: ['Google Ads', 'Meta Ads Manager', 'HubSpot', 'Mixpanel', 'Segment', 'Mailchimp', 'Google Analytics'],
    process: [
      {
        step: '01',
        title: 'Market Research',
        desc: 'Analyze competitors, audience behavior, and market trends to inform strategy.',
      },
      {
        step: '02',
        title: 'Campaign Strategy',
        desc: 'Develop targeted campaigns with clear KPIs and budget allocation.',
      },
      {
        step: '03',
        title: 'Execution & Optimization',
        desc: 'Launch campaigns and continuously optimize based on real-time performance data.',
      },
      {
        step: '04',
        title: 'Reporting & Growth',
        desc: 'Monthly reports with insights and strategies to improve ROI.',
      },
    ],
    caseStudies: [
      { title: 'SaaS Lead Generation', desc: 'Generated 500+ qualified leads in 6 months' },
      { title: 'E-commerce Growth', desc: 'Increased ROAS from 2x to 8x through optimization' },
      { title: 'Brand Awareness', desc: 'Grew social followers from 10K to 100K organically' },
    ],
  },
  'brand-design': {
    icon: Palette,
    title: 'Brand & Design',
    tag: 'Design',
    color: '#FDA4AF',
    lightBg: 'from-rose-50 to-pink-50',
    darkBg: 'from-[#1e1420] to-[#241528]',
    intro: 'Memorable brand identities and UI/UX systems that make your brand unforgettable and drive user engagement.',
    overview: 'Great design isn\'t just beautiful—it\'s strategic. We create visual languages, design systems, and experiences that communicate your brand\'s story and connect with your audience.',
    highlights: [
      'Logo & brand identity design',
      'Visual design systems',
      'UI/UX design & prototyping',
      'Brand guidelines & style guides',
      'Web & app interface design',
      'Motion design & animations',
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Framer', 'Protopie', 'Webflow'],
    process: [
      {
        step: '01',
        title: 'Brand Discovery',
        desc: 'Understand your vision, values, and market position.',
      },
      {
        step: '02',
        title: 'Creative Direction',
        desc: 'Develop visual concepts and brand directions.',
      },
      {
        step: '03',
        title: 'Design Systems',
        desc: 'Create comprehensive design systems for consistency across touchpoints.',
      },
      {
        step: '04',
        title: 'Implementation',
        desc: 'Guide implementation across all platforms and marketing materials.',
      },
    ],
    caseStudies: [
      { title: 'Tech Startup Rebrand', desc: 'Complete brand refresh increasing brand recognition 60%' },
      { title: 'E-commerce Design System', desc: 'Created system for 200+ product pages' },
      { title: 'Mobile App UI', desc: 'Designed intuitive interfaces improving retention 40%' },
    ],
  },
  'seo-optimization': {
    icon: LineChart,
    title: 'SEO Optimization',
    tag: 'SEO',
    color: '#6EE7B7',
    lightBg: 'from-emerald-50 to-teal-50',
    darkBg: 'from-[#0e1e1a] to-[#0f2420]',
    intro: 'Technical SEO, content strategy, and link building that drive sustainable organic growth and increase your visibility.',
    overview: 'SEO isn\'t a one-time fix—it\'s an ongoing strategy. We combine technical optimization, quality content, and authority building to help you rank for the keywords that matter.',
    highlights: [
      'Technical SEO audits',
      'On-page optimization',
      'Content strategy & creation',
      'Link building & outreach',
      'Local SEO optimization',
      'Performance tracking & reporting',
    ],
    technologies: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Lighthouse', 'Schema Markup'],
    process: [
      {
        step: '01',
        title: 'SEO Audit',
        desc: 'Comprehensive audit of technical, on-page, and off-page factors.',
      },
      {
        step: '02',
        title: 'Strategy Development',
        desc: 'Identify high-opportunity keywords and develop content roadmap.',
      },
      {
        step: '03',
        title: 'Implementation',
        desc: 'Technical fixes, content optimization, and authority building.',
      },
      {
        step: '04',
        title: 'Monitoring & Iteration',
        desc: 'Track rankings, analyze data, and continuously improve performance.',
      },
    ],
    caseStudies: [
      { title: 'Local Business Rankings', desc: 'Ranked #1 for 30+ local keywords in 4 months' },
      { title: 'E-commerce Growth', desc: 'Increased organic traffic 250% and revenue 180%' },
      { title: 'Content Strategy', desc: 'Built authority site attracting 100K monthly visitors' },
    ],
  },
  '3d-web-experiences': {
    icon: Globe,
    title: '3D Web Experiences',
    tag: '3D / WebGL',
    color: '#FCD34D',
    lightBg: 'from-amber-50 to-yellow-50',
    darkBg: 'from-[#1e1a0e] to-[#241f0f]',
    intro: 'Immersive Three.js and WebGL experiences that turn your website into an unforgettable visual journey.',
    overview: 'Stand out from the competition with interactive 3D experiences. We create stunning WebGL visualizations and interactive 3D models that captivate users and showcase your brand.',
    highlights: [
      'Three.js & Babylon.js development',
      'WebGL optimization',
      '3D model integration',
      'Interactive visualizations',
      'Real-time rendering',
      'Cross-browser compatibility',
    ],
    technologies: ['Three.js', 'Babylon.js', 'WebGL', 'GLSL', 'Blender', 'Cinema 4D'],
    process: [
      {
        step: '01',
        title: 'Concept Development',
        desc: 'Design interactive 3D concepts that align with your brand.',
      },
      {
        step: '02',
        title: '3D Asset Creation',
        desc: 'Model, texture, and optimize 3D assets for web performance.',
      },
      {
        step: '03',
        title: 'WebGL Development',
        desc: 'Bring 3D models to life with interactive controls and animations.',
      },
      {
        step: '04',
        title: 'Integration & Optimization',
        desc: 'Integrate into your website with performance optimization for all devices.',
      },
    ],
    caseStudies: [
      { title: 'Product Configurator', desc: 'Interactive 3D tool increasing conversion 35%' },
      { title: 'Brand Experience', desc: 'Immersive 3D environment showcasing product features' },
      { title: 'Data Visualization', desc: 'Real-time 3D analytics dashboard' },
    ],
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];
  const { dark } = useTheme();

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service not found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Hero Section */}
      <section className={`relative py-20 bg-gradient-to-br ${dark ? service.darkBg : service.lightBg} overflow-hidden`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: service.color, opacity: 0.1 }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-main transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: `${service.color}20` }}
              >
                <Icon size={32} style={{ color: service.color }} />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: `${service.color}25`, color: service.color }}>
                  {service.tag}
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black font-display text-text-main mb-6">{service.title}</h1>
            <p className="text-xl text-text-muted leading-relaxed max-w-2xl">{service.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-main mb-6">Overview</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">{service.overview}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {service.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: service.color, flexShrink: 0, marginTop: 2 }} />
                  <span className="text-text-muted">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-main mb-8">Technologies We Use</h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-main"
                  style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-main mb-12">Our Process</h2>
            <div className="space-y-8">
              {service.process.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div
                    className="text-3xl font-black flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg"
                    style={{ background: `${service.color}20`, color: service.color }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-main mb-2">{item.title}</h3>
                    <p className="text-text-muted">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-main mb-8">Case Studies</h2>
            <div className="grid gap-4">
              {service.caseStudies.map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-bg-secondary border border-border-light hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-bold text-text-main mb-2">{study.title}</h3>
                  <p className="text-text-muted text-sm">{study.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-text-main mb-4">Ready to get started?</h2>
            <p className="text-text-muted text-lg mb-8">Let's discuss how we can help elevate your {service.title.toLowerCase()}.</p>
            <Link
              to="/#contact"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
              style={{ background: service.color }}
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
