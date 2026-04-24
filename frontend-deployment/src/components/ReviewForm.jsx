import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star } from 'lucide-react';
import { submitReview as submitReviewAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const ReviewForm = () => {
  const { dark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    rating: 5,
    review: '',
    service: 'Other',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitReviewAPI(formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        rating: 5,
        review: '',
        service: 'Other',
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <section className="py-28 bg-bg-main relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-80 h-80 rounded-full bg-sky-100/40 dark:bg-sky-900/15 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-widest uppercase text-xs mb-3"
          >
            Share Your Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-black font-display text-text-main mb-5"
          >
            Your Review Matters
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-text-muted max-w-2xl mx-auto text-lg"
          >
            Help other clients discover why we're the best choice for their digital transformation. Share your experience working with us.
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-8 md:p-12 border ${
            dark
              ? 'bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] border-indigo-500/10'
              : 'bg-gradient-to-br from-white to-indigo-50 border-indigo-200'
          } shadow-[0_8px_32px_rgba(99,102,241,0.1)]`}
        >
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Row 1: Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all ${
                    dark
                      ? 'bg-[#1a1a2e] border-border-light text-text-main placeholder-text-muted focus:border-primary'
                      : 'bg-white border-indigo-200 text-text-main placeholder-text-muted focus:border-primary'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all ${
                    dark
                      ? 'bg-[#1a1a2e] border-border-light text-text-main placeholder-text-muted focus:border-primary'
                      : 'bg-white border-indigo-200 text-text-main placeholder-text-muted focus:border-primary'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Row 2: Company & Role */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={onChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all ${
                    dark
                      ? 'bg-[#1a1a2e] border-border-light text-text-main placeholder-text-muted focus:border-primary'
                      : 'bg-white border-indigo-200 text-text-main placeholder-text-muted focus:border-primary'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={onChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all ${
                    dark
                      ? 'bg-[#1a1a2e] border-border-light text-text-main placeholder-text-muted focus:border-primary'
                      : 'bg-white border-indigo-200 text-text-main placeholder-text-muted focus:border-primary'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  placeholder="CEO, Founder, etc."
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Service We Provided *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  dark
                    ? 'bg-[#1a1a2e] border-border-light text-text-main focus:border-primary'
                    : 'bg-white border-indigo-200 text-text-main focus:border-primary'
                } focus:outline-none focus:ring-2 focus:ring-primary/20`}
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Brand & Design">Brand & Design</option>
                <option value="SEO Optimization">SEO Optimization</option>
                <option value="3D Web Experiences">3D Web Experiences</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-3">
                Your Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={`transition-all ${
                        star <= formData.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-text-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Your Review *
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={onChange}
                required
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                  dark
                    ? 'bg-[#1a1a2e] border-border-light text-text-main placeholder-text-muted focus:border-primary'
                    : 'bg-white border-indigo-200 text-text-main placeholder-text-muted focus:border-primary'
                } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                placeholder="Tell us about your experience working with TechPrix..."
              />
              <p className="text-xs text-text-muted mt-1">
                {formData.review.length}/1000 characters
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Review
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-sm"
              >
                ✓ Thank you! Your review has been submitted and will be published after moderation.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 text-sm"
              >
                ✕ {errMsg}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewForm;
