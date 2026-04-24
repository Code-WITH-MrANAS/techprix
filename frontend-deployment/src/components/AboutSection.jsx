import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Target, Lightbulb, Users, Trophy, Zap, Shield } from 'lucide-react';

const stats = [
  { label: 'Projects Delivered', value: '15+', icon: Trophy,    color: '#6366F1' },
  { label: 'Happy Clients',       value: '10+',  icon: Users,     color: '#38BDF8' },
  { label: 'Years Experience',    value: '1.5+',   icon: Lightbulb, color: '#FCD34D' },
  { label: 'Uptime Guaranteed',   value: '99.9%',icon: Shield,    color: '#6EE7B7' },
  { label: 'Faster Load Times',   value: '3×',   icon: Zap,       color: '#A78BFA' },
];

/* Animated counter */
const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref}>
      {inView ? value : '0'}
    </span>
  );
};

/* Stat card */
const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
      className="group bg-bg-main rounded-2xl p-6 text-center border border-border-light shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-400 cursor-default"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${stat.color}18` }}
      >
        <Icon size={22} style={{ color: stat.color }} />
      </div>
      <h4 className="text-3xl font-black font-display text-text-main mb-1">
        <Counter value={stat.value} />
      </h4>
      <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);

  return (
    <section id="about" className="py-28 bg-bg-tertiary relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0  w-[500px] h-[500px] rounded-full bg-sky-100/30 dark:bg-sky-900/10   blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">

          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-semibold tracking-widest uppercase text-xs mb-4"
            >
              Who We Are
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className="text-4xl md:text-5xl font-black font-display text-text-main leading-tight mb-6"
            >
              The Agency That{' '}
              <span className="gradient-text">Thinks in 3D</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-text-muted text-lg leading-relaxed mb-5"
            >
              Founded on the principle that great design is invisible and great
              code is bulletproof, <strong className="text-text-secondary">TechPrix</strong> is
              a full-service creative studio where engineering meets artistry.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-muted leading-relaxed mb-8"
            >
              We combine immersive 3D web technology, strategic marketing, and
              conversion-focused design to build digital ecosystems that don't
              just look beautiful — they <em>perform</em>. Our clients see average
              revenue uplifts of <strong className="text-primary">3× within 6 months</strong> of
              launching with us.
            </motion.p>

            {/* Core values strip */}
            {['Clean Code', 'Pixel Perfect', 'On-Time Delivery', 'Transparent Pricing'].map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.26 + i * 0.07 }}
                className="flex items-center gap-3 mb-3"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-text-secondary font-medium text-sm">{v}</span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="mt-8"
            >
              <a
                href="#contact"
                id="about-cta"
                className="btn-primary inline-block px-8 py-3.5 text-sm font-bold"
              >
                Partner With Us →
              </a>
            </motion.div>
          </div>

          {/* Right — floating 3D visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(99,102,241,0.15)] border border-indigo-100">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900"
                alt="TechPrix team collaborate"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-5 -left-6 glass rounded-2xl px-4 py-3 shadow-lg border border-white/80"
            >
              <p className="text-xs text-text-muted font-medium">Average rating</p>
              <p className="text-xl font-black text-text-main">★ 5.0</p>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-5 -right-6 glass rounded-2xl px-4 py-3 shadow-lg border border-white/80"
            >
              <p className="text-xs text-text-muted font-medium">Projects this year</p>
              <p className="text-xl font-black gradient-text">42 Launched 🚀</p>
            </motion.div>

            {/* Decorative geometry */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 opacity-25 float-slow rotate-12" />
            <div className="absolute -left-8 bottom-10 w-10 h-10 rounded-full bg-sky-400 opacity-20 float-medium" />
          </motion.div>
        </div>

        {/* Stats grid */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
