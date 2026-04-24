import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fetchReviews } from '../services/api';

const fallbackTestimonials = [
  {
    name: 'Ali',
    role: 'CEO, Luminary Tech',
    avatar: 'AL',
    color: '#6366F1',
    rating: 5,
    review: 'TechPrix completely transformed our digital presence. The 3D hero section they built for us drove a 340% increase in time-on-site. Absolutely world-class team.',
  },
  {
    name: 'James Okafor',
    role: 'Founder, Apex Capital',
    avatar: 'JO',
    color: '#38BDF8',
    rating: 5,
    review: 'We needed a fintech dashboard that felt premium and was lightning fast. They delivered in 3 weeks — under budget and above expectation. Best agency we\'ve worked with.',
  },
  {
    name: 'Priya Sharma',
    role: 'CMO, Nova SaaS',
    avatar: 'PS',
    color: '#A78BFA',
    rating: 5,
    review: 'The SEO work alone was worth every penny — we went from page 4 to position 1 in 90 days. Their full-stack capability means one agency handles everything seamlessly.',
  }
];

const colors = ['#6366F1', '#38BDF8', '#A78BFA', '#EC4899', '#F59E0B', '#10B981', '#8B5CF6'];

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
};

const getColorForReview = (index) => colors[index % colors.length];

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading]           = useState(true);
  const [active, setActive]             = useState(0);
  const [direction, setDir]             = useState(1);
  const intervalRef                     = useRef(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        console.log('📥 Fetching reviews from database...');
        const reviews = await fetchReviews();
        
        console.log('✅ Reviews fetched:', reviews);
        
        if (reviews && Array.isArray(reviews) && reviews.length > 0) {
          console.log(`📊 Found ${reviews.length} reviews, transforming...`);
          
          // Transform reviews to match testimonial format
          const transformedReviews = reviews.map((review, index) => ({
            name: review.name,
            role: review.company && review.role ? `${review.role}, ${review.company}` : review.company || review.role || 'Client',
            avatar: getInitials(review.name),
            color: getColorForReview(index),
            rating: review.rating,
            review: review.review,
            _id: review._id,
          }));
          
          console.log('✨ Transformed reviews:', transformedReviews);
          setTestimonials(transformedReviews);
        } else {
          console.warn('⚠️ No reviews found in database, using fallback testimonials');
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error('❌ Failed to fetch reviews:', error.message || error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const total = testimonials.length;

  const go = (dir) => {
    setDir(dir);
    setActive((prev) => (prev + dir + total) % total);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => go(1), 5500);
    return () => clearInterval(intervalRef.current);
  }, [total]);

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ?  60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 :  60, scale: 0.96 }),
  };

  const t = testimonials[active];

  return (
    <section id="testimonials" className="py-28 bg-bg-main relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 left-0  w-[500px] h-[500px] rounded-full bg-violet-50/60 dark:bg-violet-900/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sky-50/50 dark:bg-sky-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-widest uppercase text-xs mb-3"
          >
            Client Voices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-black font-display text-text-main mb-5"
          >
            Stories That{' '}
            <span className="gradient-text">Speak Volumes</span>
          </motion.h2>
        </div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="bg-bg-main rounded-3xl p-8 md:p-12 border border-border-light shadow-[0_8px_60px_rgba(0,0,0,0.08)] relative overflow-hidden"
            >
              {/* Big quote mark */}
              <Quote
                size={80}
                className="absolute top-6 right-8 opacity-5 text-primary"
                strokeWidth={1}
              />

              <Stars count={t.rating} />

              <blockquote className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium mb-8 max-w-3xl">
                "{t.review}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-text-main">{t.name}</p>
                  <p className="text-text-muted text-sm">{t.role}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div
                    className="px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: `${t.color}15`, color: t.color }}
                  >
                    Verified Client
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex items-center justify-between mt-8">
            <button
              id="testimonial-prev"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-border-light bg-bg-main hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-200 text-text-secondary hover:text-primary shadow-sm transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 h-2.5 bg-primary'
                      : 'w-2.5 h-2.5 bg-silver hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>

            <button
              id="testimonial-next"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-border-light bg-bg-main hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-200 text-text-secondary hover:text-primary shadow-sm transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
