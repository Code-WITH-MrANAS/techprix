import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { fetchProjects } from '../services/api';
import { ExternalLink, GitFork } from 'lucide-react';

const fallbackProjects = [
  {
    _id: '1',
    title: 'Luminary E-Commerce',
    description: 'A high-conversion e-commerce storefront with 3D product previews, frictionless checkout, and real-time inventory.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    techStack: ['React', 'Node.js', 'MongoDB', 'Three.js'],
    category: 'Web App',
    color: '#6366F1',
  },
  {
    _id: '2',
    title: 'Apex Fintech Dashboard',
    description: 'Financial analytics platform with real-time data visualisation, AI-powered insights, and dark/light theming.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    techStack: ['Vue', 'Express', 'PostgreSQL', 'D3.js'],
    category: 'Dashboard',
    color: '#38BDF8',
  },
  {
    _id: '4',
    title: 'Pulse Health App',
    description: 'Mobile-first health tracking application with custom charts, coach messaging, and wearable device sync.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    techStack: ['React Native', 'Firebase', 'HealthKit'],
    category: 'Mobile',
    color: '#6EE7B7',
  },
];

/* ── 3D tilt card using cursor position ── */
const TiltCard = ({ project, index }) => {
  const ref   = useRef(null);
  const rotX  = useMotionValue(0);
  const rotY  = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 25 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 25 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * -18;
    const ry = ((e.clientX - rect.left) / rect.width  - 0.5) *  18;
    rotX.set(rx);
    rotY.set(ry);
  };
  const resetTilt = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformPerspective: 900,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-bg-main rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-border-light hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-end p-4 gap-2">
          <a
            href="#"
            aria-label="Live preview"
            className="p-2.5 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
          >
            <ExternalLink size={16} className="text-text-main" />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="p-2.5 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
          >
            <GitFork size={16} className="text-text-main" />
          </a>
        </div>
        {/* Category badge */}
        <span
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow"
          style={{ background: project.color }}
        >
          {project.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-bg-tertiary text-text-secondary border border-border-light"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-28 bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-50/80 dark:bg-indigo-900/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-sky-50/60 dark:bg-sky-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-widest uppercase text-xs mb-3"
          >
            Featured Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-black font-display text-text-main mb-5"
          >
            Work That{' '}
            <span className="gradient-text">Defies Gravity</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-text-muted max-w-2xl mx-auto text-lg"
          >
            Hover each card for a 3D tilt effect — a taste of the immersive
            experiences we build for our clients.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <TiltCard key={p._id} project={p} index={i} />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            id="portfolio-cta"
            className="btn-primary inline-block px-10 py-4 text-base font-bold"
          >
            Start Your Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
