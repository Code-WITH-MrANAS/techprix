import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ─── Typing badge ──────────────────────────────────── */
const Badge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
    className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-dark border border-indigo-200/60 text-sm font-semibold text-primary shadow-md mb-8"
  >
    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    Now accepting new projects for Q3 2025
  </motion.div>
);

/* ─── Animated floating shapes (pure CSS) ────────────── */
const FloatingShapes = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Large gradient orbs */}
    <div className="hero-shape hero-shape-1" />
    <div className="hero-shape hero-shape-2" />
    <div className="hero-shape hero-shape-3" />
    <div className="hero-shape hero-shape-4" />
    <div className="hero-shape hero-shape-5" />
    <div className="hero-shape hero-shape-6" />

    {/* Geometric accents */}
    <div className="hero-geo hero-geo-1" />
    <div className="hero-geo hero-geo-2" />
    <div className="hero-geo hero-geo-3" />
    <div className="hero-geo hero-geo-4" />
  </div>
);

/* ─── Hero Section ───────────────────────────────────── */
const HeroSection = () => {
  const springX = useMotionValue(0);
  const springY = useMotionValue(0);
  const sx = useSpring(springX, { stiffness: 60, damping: 20 });
  const sy = useSpring(springY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * -2;
      springX.set(nx * 8);
      springY.set(ny * 8);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [springX, springY]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-main via-bg-secondary to-indigo-50/40 dark:to-indigo-950/20"
    >
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 w-[600px] h-[600px] rounded-full bg-sky-100/60 dark:bg-sky-900/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-100/40 dark:bg-violet-900/15 blur-2xl" />
      </div>

      {/* Animated floating shapes (CSS-only, no Three.js) */}
      <FloatingShapes />

      {/* Parallax layer driven by cursor */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-24 left-16  w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-300 to-violet-300 opacity-30 float-slow  rotate-12 blur-sm" />
        <div className="absolute top-40 right-20 w-10 h-10 rounded-full bg-sky-300 opacity-30 float-medium blur-sm" />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 rounded-xl bg-violet-300 opacity-25 float-fast blur-sm" />
        <div className="absolute bottom-20 right-1/3 w-8  h-8  rounded-full bg-indigo-300 opacity-30 float-slow  blur-sm" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28">
        <Badge />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl xl:text-8xl font-black font-display tracking-tight text-text-main leading-[1.05] mb-6"
          >
            We Build{' '}
            <span className="gradient-text">Digital Gravity</span>
            <br />
            <span className="text-text-secondary font-light italic text-4xl md:text-5xl xl:text-6xl">
              that pulls people in.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-10"
          >
            TechPrix is a premium digital agency crafting{' '}
            <strong className="text-text-secondary font-semibold">immersive web experiences</strong>,
            strategic marketing, and conversion-focused design — for brands that
            want to <em>float above the rest</em>.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              id="hero-cta-primary"
              href="#projects"
              className="btn-primary px-9 py-4 text-base font-bold w-full sm:w-auto"
            >
              View Our Work →
            </a>
            <a
              id="hero-cta-secondary"
              href="#contact"
              className="btn-outline px-9 py-4 text-base font-semibold w-full sm:w-auto"
            >
              Start a Project
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={item}
            className="mt-14 flex flex-col sm:flex-row items-center gap-6 text-sm text-text-muted"
          >
            <span>
              Trusted by{' '}
              <strong className="text-text-secondary font-semibold">5+ happy clients</strong>{' '}
              worldwide
            </span>
            <span className="hidden sm:block w-px h-5 bg-border-light" />
            <span>★★★★ 4.5 rated agency</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
