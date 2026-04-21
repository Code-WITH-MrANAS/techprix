import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Code2, Megaphone, Palette, LineChart, Smartphone, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    slug: 'web-development',
    desc: 'Custom, high-performance websites & apps using React, Next.js, and Node.js — pixel-perfect and blazing fast.',
    color: '#6366F1',
    lightBg: 'from-indigo-50 to-violet-50',
    darkBg: 'from-[#14142e] to-[#1a1640]',
    darkBorder: 'border-indigo-500/15 hover:border-indigo-400/40',
    lightBorder: 'hover:border-indigo-200',
    tag: 'Development',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    slug: 'mobile-apps',
    desc: 'Cross-platform mobile experiences that feel native. React Native + Expo for iOS & Android.',
    color: '#38BDF8',
    lightBg: 'from-sky-50 to-cyan-50',
    darkBg: 'from-[#0e1a2e] to-[#0f1f35]',
    darkBorder: 'border-sky-500/15 hover:border-sky-400/40',
    lightBorder: 'hover:border-sky-200',
    tag: 'Mobile',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    desc: 'Data-driven strategies across PPC, social, and content — engineered to maximise your ROI.',
    color: '#A78BFA',
    lightBg: 'from-violet-50 to-purple-50',
    darkBg: 'from-[#1a142e] to-[#1e1540]',
    darkBorder: 'border-violet-500/15 hover:border-violet-400/40',
    lightBorder: 'hover:border-violet-200',
    tag: 'Marketing',
  },
  {
    icon: Palette,
    title: 'Brand & Design',
    slug: 'brand-design',
    desc: 'Memorable identities, UI/UX systems and visual language that make your brand unforgettable.',
    color: '#FDA4AF',
    lightBg: 'from-rose-50 to-pink-50',
    darkBg: 'from-[#1e1420] to-[#241528]',
    darkBorder: 'border-rose-500/15 hover:border-rose-400/40',
    lightBorder: 'hover:border-rose-200',
    tag: 'Design',
  },
  {
    icon: LineChart,
    title: 'SEO Optimization',
    slug: 'seo-optimization',
    desc: 'Technical SEO, content strategy and link building that drive sustainable organic growth.',
    color: '#6EE7B7',
    lightBg: 'from-emerald-50 to-teal-50',
    darkBg: 'from-[#0e1e1a] to-[#0f2420]',
    darkBorder: 'border-emerald-500/15 hover:border-emerald-400/40',
    lightBorder: 'hover:border-emerald-200',
    tag: 'SEO',
  },
  {
    icon: Globe,
    title: '3D Web Experiences',
    slug: '3d-web-experiences',
    desc: 'Immersive Three.js and WebGL scenes that turn your website into an unforgettable journey.',
    color: '#FCD34D',
    lightBg: 'from-amber-50 to-yellow-50',
    darkBg: 'from-[#1e1a0e] to-[#241f0f]',
    darkBorder: 'border-amber-500/15 hover:border-amber-400/40',
    lightBorder: 'hover:border-amber-200',
    tag: '3D / WebGL',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show:   (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ServicesSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { dark } = useTheme();

  return (
    <section
      id="services"
      className="py-28 bg-bg-secondary relative overflow-hidden"
    >
      {/* BG accent blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0  w-80 h-80 rounded-full bg-sky-100/40 dark:bg-sky-900/15   blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-widest uppercase text-xs mb-3"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-black font-display text-text-main mb-5"
          >
            Services Built to{' '}
            <span className="gradient-text">Elevate</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A full-spectrum digital studio that pairs creative vision with
            engineering precision — every service designed to float your brand
            to the top.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={i}
                to={`/service/${s.slug}`}
                className="no-underline"
              >
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  whileHover={{
                    y: -14,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className={`group relative bg-gradient-to-br ${dark ? s.darkBg : s.lightBg} rounded-3xl p-8 border ${dark ? s.darkBorder : `border-border-light ${s.lightBorder}`} shadow-[0_4px_24px_rgba(0,0,0,0.04)] card-lift cursor-pointer overflow-hidden h-full`}
              >
                {/* Subtle accent glow in dark mode */}
                {dark && (
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
                    style={{ background: s.color }}
                  />
                )}
                {/* Shimmer on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${dark ? 'via-white/5' : 'via-white/40'} to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out`} />

                {/* Tag */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-5"
                  style={{
                    background: dark ? `${s.color}25` : `${s.color}18`,
                    color: s.color,
                  }}
                >
                  {s.tag}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300"
                  style={{ background: dark ? `${s.color}20` : `${s.color}18` }}
                >
                  <Icon size={26} style={{ color: s.color }} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-text-main mb-3">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>

                {/* Arrow */}
                <div
                  className="mt-6 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: s.color }}
                >
                  Learn more
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
